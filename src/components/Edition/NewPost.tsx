import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import RichText from 'components/Squeak/components/RichText'
import { CallToAction } from 'components/CallToAction'
import { Chevron, Minus, Plus } from 'components/Icons'
import { Listbox } from '@headlessui/react'
import { fetchCategories } from './lib'
import { useUser } from 'hooks/useUser'
import slugify from 'slugify'

const Categories = ({ value, setFieldValue }) => {
    const [categories, setCategories] = useState([])
    const handleChange = (value) => {
        setFieldValue('category', value)
    }

    useEffect(() => {
        fetchCategories().then((categories) =>
            setCategories(categories.filter((category) => ['Repost'].includes(category?.attributes?.label)))
        )
    }, [])

    return (
        <div className="relative h-full">
            <Listbox value={value || {}} onChange={handleChange}>
                <Listbox.Button
                    className={`text-sm font-bold w-full py-3 px-4 h-full outline-none rounded-none text-left flex items-center justify-between ${
                        !value?.attributes?.label ? 'opacity-60' : ''
                    }`}
                >
                    <span>{value?.attributes?.label || 'Category'}</span>
                    <Chevron className="w-2.5 mr-[.3rem]" />
                </Listbox.Button>
                {categories?.length > 0 && (
                    <Listbox.Options className="list-none p-0 m-0 absolute left-[-1px] bottom-0 translate-y-full z-20 bg-white dark:bg-gray-accent-dark-hover w-full max-h-[247px] overflow-auto shadow-md rounded-br-md rounded-bl-md border divide-y border-border divide-border">
                        {categories.map((category) => {
                            return (
                                <Listbox.Option key={category.id} value={category}>
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
            <div className={`border-t border-border ${open ? '' : 'hidden'}`}>{children}</div>
        </>
    )
}

export default function NewPost({ onSubmit }) {
    const { getJwt } = useUser()
    const [ctaOpen, setCtaOpen] = useState(false)
    const { handleSubmit, values, handleChange, setFieldValue, errors, validateField } = useFormik({
        initialValues: { title: '', body: '', images: [], ctaLabel: '', ctaURL: '', category: undefined },
        onSubmit: async ({ title, body, images, ctaLabel, ctaURL, category }) => {
            const data = JSON.stringify({
                data: {
                    title,
                    body,
                    slug: `/posts/${slugify(title, { lower: true })}`,
                    CTA: {
                        label: ctaLabel,
                        url: ctaURL,
                    },
                    post_category: {
                        connect: [category.id],
                    },
                },
            })
            await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/posts`, {
                body: data,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${await getJwt()}`,
                },
            })

            onSubmit?.()
        },
    })

    return (
        <div className="max-w-[450px] mx-auto relative rounded-md bg-white mt-12 p-4">
            <form className="m-0 flex flex-col" onSubmit={handleSubmit}>
                <div className="rounded-md border border-border overflow-hidden">
                    <div className="grid grid-cols-1 divide-y divide-border border-border w-full items-center">
                        <input
                            required
                            onChange={(e) => setFieldValue('title', e.target.value)}
                            placeholder="Title"
                            className="px-4 py-3"
                            name="title"
                            value={values.title}
                        />
                        <Accordion initialOpen label="Body">
                            <RichText setFieldValue={setFieldValue} values={values} />
                        </Accordion>
                        <Categories setFieldValue={setFieldValue} value={values.category} />
                        <Accordion active={values.ctaURL && values.ctaLabel} label="Call to action">
                            <div className="grid grid-cols-2 divide-x divide-border border-border">
                                <input
                                    onChange={(e) => setFieldValue('ctaLabel', e.target.value)}
                                    placeholder="Label"
                                    className="px-4 py-2 border-border w-full"
                                    name="cta-label"
                                    value={values.ctaLabel}
                                />
                                <input
                                    onChange={(e) => setFieldValue('ctaURL', e.target.value)}
                                    placeholder="URL"
                                    className="px-4 py-2 border-border w-full"
                                    name="cta-url"
                                    value={values.ctaURL}
                                />
                            </div>
                        </Accordion>
                    </div>
                </div>
                <CallToAction className="ml-auto mt-4 w-full" size="sm" onClick={() => undefined}>
                    Post
                </CallToAction>
            </form>
        </div>
    )
}
