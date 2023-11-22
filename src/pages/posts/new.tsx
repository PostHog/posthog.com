import React, { useEffect, useState } from 'react'
import { Listbox } from '@headlessui/react'
import Layout from 'components/Layout'
import { fetchCategories } from 'components/Edition/lib'
import { useFormik } from 'formik'
import { IconChevronDown } from '@posthog/icons'
import { Post } from 'components/Edition/ClientPost'
import RichText from 'components/Squeak/components/RichText'
import { communityMenu } from '../../navs'
import qs from 'qs'
import Slider from 'components/Slider'
import { CallToAction } from 'components/CallToAction'
import { useUser } from 'hooks/useUser'
import transformValues from 'components/Squeak/util/transformValues'
import { navigate } from 'gatsby'
import * as Yup from 'yup'
import SEO from 'components/seo'

const CategoryDropdown = ({ category, categories, setFieldValue }) => {
    return (
        <div className="relative">
            <Listbox value={category} onChange={(category) => setFieldValue('category', category)}>
                <Listbox.Button className="font-bold flex justify-between space-x-2 items-center px-4 py-2 rounded-md border border-light dark:border-dark w-full text-left bg-white dark:bg-accent-dark">
                    <span>{category?.attributes?.label || 'Select a category'}</span>
                    <IconChevronDown className="w-7" />
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 z-10 bg-white dark:bg-accent-dark list-none m-0 p-0 w-full border border-light dark:border-dark rounded-md divide-y divide-border dark:divide-border-dark">
                    {categories.map((category) => (
                        <Listbox.Option key={category.id} value={category}>
                            {({ active }) => {
                                return (
                                    <span
                                        className={`inline-block w-full px-4 py-2 cursor-pointer text-sm hover:bg-accent/50 dark:hover:bg-gray-dark/30 ${
                                            active ? 'bg-accent/80 dark:bg-dark/80' : ''
                                        }`}
                                    >
                                        {category.attributes.label}
                                    </span>
                                )
                            }}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    )
}

const ValidationSchema = Yup.object().shape({
    title: Yup.string().required('Please enter a post title'),
    body: Yup.string().required('Post body cannot be empty'),
    tags: Yup.array().required('Please select a tag').min(1, 'Please select a tag'),
    category: Yup.object().required().typeError('Please select a category'),
})

const ErrorMessage = ({ children }) => {
    return <p className="mt-2 mb-1 text-red px-4 text-sm">{children}</p>
}

export default function New() {
    const [categories, setCategories] = useState([])
    const { getJwt, user } = useUser()

    useEffect(() => {
        fetchCategories(
            qs.stringify(
                {
                    populate: {
                        post_tags: true,
                    },
                },
                { encodeValuesOnly: true }
            )
        ).then((categories) => setCategories(categories))
    }, [])

    const { handleSubmit, values, setFieldValue, initialValues, errors, touched } = useFormik({
        validateOnMount: false,
        validationSchema: ValidationSchema,
        initialValues: {
            category: null,
            title: 'Your new post',
            body: '![banner](https://posthog.com/banner.png)\n\n### Your post...\nstarts here.',
            cta: null,
            images: [],
            tags: [],
            excerpt: '',
        },
        onSubmit: async ({ title, category, body, cta, images, tags, excerpt }) => {
            try {
                const jwt = await getJwt()
                const profileID = user?.profile?.id
                if (!profileID || !jwt) return
                const transformedValues = await transformValues({ body, images: images ?? [] }, profileID, jwt)
                const uploadedFeaturedImage = transformedValues?.uploadedImages?.[0]
                const data = JSON.stringify({
                    data: {
                        title,
                        body: transformedValues?.body,
                        post_category: {
                            connect: [category],
                        },
                        excerpt,
                        date: new Date(),
                        ...(uploadedFeaturedImage
                            ? {
                                  featuredImage: {
                                      image: uploadedFeaturedImage?.id,
                                  },
                              }
                            : null),
                        ...(tags?.length > 0 ? { post_tags: { connect: tags.map(({ id }) => id) } } : null),
                        authors: {
                            connect: [profileID],
                        },
                    },
                })
                const { data: post } = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/posts`, {
                    body: data,
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        Authorization: `Bearer ${await getJwt()}`,
                    },
                }).then((res) => res.json())
                navigate(post?.attributes?.slug)
            } catch (err) {
                console.error(err)
            }
        },
    })

    useEffect(() => {
        setFieldValue('tags', [])
    }, [values.category])

    useEffect(() => {
        getJwt().then((jwt) => {
            if (!jwt) navigate('/posts')
        })
    }, [])

    const postTags = values.category?.attributes?.post_tags?.data

    return (
        <Layout parent={communityMenu} activeInternalMenu={communityMenu.children[0]}>
            <SEO title="New post - PostHog" noindex />
            <section className="py-12 px-5 max-w-screen-2xl mx-auto flex items-start">
                <form onSubmit={handleSubmit} className="max-w-md w-full sticky top-32">
                    <CategoryDropdown
                        categories={categories}
                        category={values.category}
                        setFieldValue={setFieldValue}
                    />
                    {errors.category && touched.category && <ErrorMessage>{errors.category}</ErrorMessage>}

                    <input
                        onChange={(e) => setFieldValue('title', e.target.value)}
                        placeholder="Title"
                        value={values.title}
                        className="px-4 py-2 border border-border dark:border-dark rounded-md w-full mt-2 dark:bg-accent-dark"
                    />
                    {errors.title && touched.title && <ErrorMessage>{errors.title}</ErrorMessage>}

                    <div className="bg-white dark:bg-accent-dark mt-2 border border-border dark:border-dark rounded-md overflow-hidden">
                        <RichText
                            preview={false}
                            initialValue={initialValues.body}
                            setFieldValue={setFieldValue}
                            values={values}
                            maxLength={524288}
                            excerptDisabled
                        />
                    </div>
                    {errors.body && touched.body && <ErrorMessage>{errors.body}</ErrorMessage>}
                    {postTags?.length > 0 ? (
                        <div className="mt-4">
                            <Slider>
                                {postTags?.map((tag) => {
                                    const active = values.tags.some((selectedTag) => selectedTag.id === tag.id)
                                    return (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newTags = active
                                                    ? values.tags.filter((selectedTag) => selectedTag.id !== tag.id)
                                                    : [...values.tags, tag]
                                                setFieldValue('tags', newTags)
                                            }}
                                            className={`rounded-full p-2 border border-border dark:border-dark whitespace-nowrap text-sm ${
                                                active ? 'bg-white dark:bg-black  font-bold' : ''
                                            }`}
                                            key={tag.id}
                                        >
                                            {tag.attributes.label}
                                        </button>
                                    )
                                })}
                            </Slider>
                        </div>
                    ) : null}
                    {postTags?.length > 0 && errors.tags && touched.tags && <ErrorMessage>{errors.tags}</ErrorMessage>}
                    <CallToAction onClick={handleSubmit} className="mt-4" width="full">
                        Post
                    </CallToAction>
                </form>
                <div className="pl-8 ml-8 border-l border-border dark:border-dark border-dashed">
                    <Post
                        transformImageUri={(fakeImagePath) => {
                            const objectURL = values.images.find(
                                (image) => image.fakeImagePath === fakeImagePath
                            )?.objectURL
                            return objectURL || fakeImagePath
                        }}
                        title={values.title}
                        body={values.body}
                        cta={values.cta}
                        date={new Date()}
                        imageURL={null}
                    />
                </div>
            </section>
        </Layout>
    )
}
