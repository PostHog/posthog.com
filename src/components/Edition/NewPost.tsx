import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import RichText from 'components/Squeak/components/RichText'
import { child, container } from 'components/CallToAction'
import { Chevron, Close, Close2, Minus, Plus } from 'components/Icons'
import { Listbox } from '@headlessui/react'
import { fetchCategories } from './lib'
import { useUser } from 'hooks/useUser'
import slugify from 'slugify'
import { useDropzone } from 'react-dropzone'
import { Upload } from '@posthog/icons'
import uploadImage from 'components/Squeak/util/uploadImage'
import transformValues from 'components/Squeak/util/transformValues'
import Spinner from 'components/Spinner'
import { PostsContext } from './Posts'

const Categories = ({ value, setFieldValue }) => {
    const [categories, setCategories] = useState([])
    const handleChange = (value) => {
        setFieldValue('category', value)
    }

    useEffect(() => {
        fetchCategories().then((categories) =>
            setCategories(
                categories.filter(
                    (category) =>
                        !['Changelog entry', 'Customer story', 'Guide', 'PostHog news', 'Spotlight'].includes(
                            category?.attributes?.label
                        )
                )
            )
        )
    }, [])

    return (
        <div className="relative h-full">
            <Listbox value={value} onChange={handleChange}>
                <Listbox.Button
                    className={`text-sm font-bold w-full py-3 px-4 h-full outline-none rounded-none text-left flex items-center justify-between ${
                        !value ? 'opacity-60' : ''
                    }`}
                >
                    <span>{value ? categories.find(({ id }) => id === value)?.attributes.label : 'Category'}</span>
                    <Chevron className="w-2.5 mr-[.3rem]" />
                </Listbox.Button>
                {categories?.length > 0 && (
                    <Listbox.Options className="list-none p-0 m-0 absolute left-[-1px] bottom-0 translate-y-full z-20 bg-white dark:bg-gray-accent-dark-hover w-full max-h-[247px] overflow-auto shadow-md rounded-br-md rounded-bl-md border divide-y border-border dark:border-dark divide-border dark:divide-border-dark">
                        {categories.map((category) => {
                            return (
                                <Listbox.Option key={category.id} value={category.id}>
                                    {({ selected }) => (
                                        <div
                                            className={`${
                                                selected
                                                    ? 'bg-gray-accent-light text-black dark:bg-gray-accent-dark dark:text-primary-dark'
                                                    : 'bg-white text-black hover:bg-gray-accent-light/30 dark:bg-gray-accent-dark-hover dark:hover:bg-gray-accent-dark/30 dark:text-primary-dark'
                                            } py-2 px-4 cursor-pointer transition-all text-sm`}
                                        >
                                            {category.attributes.label}
                                        </div>
                                    )}
                                </Listbox.Option>
                            )
                        })}
                    </Listbox.Options>
                )}
            </Listbox>
        </div>
    )
}

const Accordion = ({ children, label, active, initialOpen = false, className = '' }) => {
    const [open, setOpen] = useState(initialOpen)
    return (
        <>
            <button onClick={() => setOpen(!open)} type="button" className={`py-3 px-4 w-full ${className}`}>
                <div className={`${active ? '' : 'opacity-60'} flex justify-between items-center`}>
                    <p className="m-0 font-bold text-sm">{label}</p>
                    {open ? <Minus /> : <Plus />}
                </div>
            </button>
            <div className={`border-t border-border dark:border-dark ${open ? '' : 'hidden'}`}>{children}</div>
        </>
    )
}

const Image = ({ setFieldValue, featuredImage }) => {
    const [image, setImage] = useState<null | string>(featuredImage)
    const onDrop = async (acceptedFiles) => {
        const file = acceptedFiles[0]
        const objectURL = URL.createObjectURL(file)
        setImage(objectURL)
        setFieldValue('featuredImage', {
            file,
            objectURL,
        })
    }

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        noClick: true,
        noKeyboard: true,
        multiple: false,
        accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] },
    })

    return image ? (
        <div className="h-[250px] flex bg-accent/20 relative justify-center">
            <img className="object-contain object-center" src={image} />
            <button
                onClick={() => {
                    setImage(null)
                    setFieldValue('featuredImage', null)
                }}
                className="absolute top-2 right-2 bg-white rounded-full shadow-md w-6 h-6 flex items-center justify-center"
            >
                <Close2 className="w-4 h-4 !text-black" fill="black" />
            </button>
        </div>
    ) : (
        <div className="relative flex justify-center items-center p-4 h-[250px]" {...getRootProps()}>
            <input className="hidden" {...getInputProps()} />
            <div className="w-7 h-7 opacity-60">
                <Upload />
            </div>
            <button type="button" onClick={open} className="absolute w-full h-full inset-0" />
        </div>
    )
}

export default function NewPost({ onSubmit, initialValues, postID }) {
    const { mutate } = useContext(PostsContext)
    const { getJwt, user } = useUser()

    const { handleSubmit, values, handleChange, setFieldValue, errors, validateField, isSubmitting } = useFormik({
        initialValues: initialValues || {
            title: '',
            body: '',
            images: [],
            featuredImage: undefined,
            ctaLabel: '',
            ctaURL: '',
            category: undefined,
            excerpt: '',
        },
        onSubmit: async ({ title, body, images, ctaLabel, ctaURL, category, featuredImage, excerpt }) => {
            try {
                const jwt = await getJwt()
                const profileID = user?.profile?.id
                if (!profileID || !jwt) return
                const uploadedFeaturedImage =
                    featuredImage?.file &&
                    (await uploadImage(featuredImage.file, jwt, {
                        field: 'images',
                        id: profileID,
                        type: 'api::profile.profile',
                    }))
                const transformedBody = await transformValues({ body, images: images ?? [] }, profileID, jwt)

                const data = JSON.stringify({
                    data: {
                        title,
                        body: transformedBody?.body,
                        ...(postID ? null : { slug: `/posts/${slugify(title, { lower: true, strict: true })}` }),
                        CTA: {
                            label: ctaLabel,
                            url: ctaURL,
                        },
                        post_category: {
                            connect: [category],
                        },
                        excerpt,
                        ...(uploadedFeaturedImage || featuredImage === null
                            ? {
                                  featuredImage: {
                                      image: uploadedFeaturedImage?.id,
                                  },
                              }
                            : null),
                    },
                })
                await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/posts/${postID || ''}`, {
                    body: data,
                    method: postID ? 'PUT' : 'POST',
                    headers: {
                        'content-type': 'application/json',
                        Authorization: `Bearer ${await getJwt()}`,
                    },
                })
                mutate?.()
                onSubmit?.()
            } catch (err) {
                console.error(err)
            }
        },
    })

    return (
        <div className="max-w-[450px] h-full ml-auto relative bg-white dark:bg-accent-dark overflow-auto border-l border-border dark:border-dark">
            <form className="m-0 flex flex-col h-full" onSubmit={handleSubmit}>
                <div className="border-b border-border dark:border-dark overflow-hidden">
                    <div className="grid grid-cols-1 divide-y divide-border dark:divide-border-dark border-border dark:border-dark w-full items-center">
                        <input
                            required
                            onChange={(e) => setFieldValue('title', e.target.value)}
                            placeholder="Title"
                            className="px-4 py-3 dark:bg-accent-dark"
                            name="title"
                            value={values.title}
                        />
                        <Accordion initialOpen label="Body" active={!!values.body}>
                            <RichText
                                initialValue={initialValues?.body}
                                setFieldValue={setFieldValue}
                                values={values}
                            />
                        </Accordion>
                        <Accordion initialOpen label="Excerpt" active={!!values.excerpt}>
                            <textarea
                                rows={5}
                                name="excerpt"
                                onChange={(e) => setFieldValue('excerpt', e.target.value)}
                                placeholder="Excerpt"
                                className="px-4 py-2 border-none w-full dark:bg-accent-dark resize-none"
                            />
                        </Accordion>
                        <Categories setFieldValue={setFieldValue} value={values.category} />
                        <Accordion active={values.ctaURL && values.ctaLabel} label="Call to action">
                            <div className="grid grid-cols-2 divide-x divide-border dark:divide-border-dark border-border dark:border-dark">
                                <input
                                    onChange={(e) => setFieldValue('ctaLabel', e.target.value)}
                                    placeholder="Label"
                                    className="px-4 py-2 border-border dark:border-dark w-full dark:bg-accent-dark"
                                    name="cta-label"
                                    value={values.ctaLabel}
                                />
                                <input
                                    onChange={(e) => setFieldValue('ctaURL', e.target.value)}
                                    placeholder="URL"
                                    className="px-4 py-2 border-border dark:border-dark w-full dark:bg-accent-dark"
                                    name="cta-url"
                                    value={values.ctaURL}
                                />
                            </div>
                        </Accordion>
                        <Accordion active={!!values.featuredImage} label="Featured image">
                            <Image setFieldValue={setFieldValue} featuredImage={values.featuredImage} />
                        </Accordion>
                    </div>
                </div>
                <div className="px-4 mb-4 mt-auto">
                    <button disabled={isSubmitting} className={`${container()} ml-auto w-full`}>
                        <span className={`${child()}`}>
                            {isSubmitting ? (
                                <Spinner className="!w-6 !h-6 mx-auto text-white" />
                            ) : postID ? (
                                'Update'
                            ) : (
                                'Post'
                            )}
                        </span>
                    </button>
                </div>
            </form>
        </div>
    )
}
