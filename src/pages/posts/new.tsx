import React, { useEffect, useState } from 'react'
import { Listbox, Menu } from '@headlessui/react'
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

const CategoryDropdown = ({ category, categories, setFieldValue }) => {
    return (
        <div className="relative">
            <Listbox value={category} onChange={(category) => setFieldValue('category', category)}>
                <Listbox.Button className="font-bold flex justify-between space-x-2 items-center px-4 py-2 rounded-md border border-light dark:border-dark w-full text-left bg-accent dark:bg-accent-dark">
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

export default function New() {
    const [categories, setCategories] = useState([])

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

    const { handleSubmit, values, setFieldValue, initialValues } = useFormik({
        initialValues: {
            category: null,
            title: 'Your new post',
            body: '![banner](https://posthog.com/banner.png)\n\n### Your post...\nstarts here.',
            cta: null,
            images: [],
            tags: [],
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2))
        },
    })

    useEffect(() => {
        setFieldValue('tags', [])
    }, [values.category])

    const postTags = values.category?.attributes?.post_tags?.data

    return (
        <Layout parent={communityMenu} activeInternalMenu={communityMenu.children[0]}>
            <section className="py-12 px-5 max-w-screen-2xl mx-auto flex items-start">
                <div className="max-w-md w-full sticky top-32">
                    <CategoryDropdown
                        categories={categories}
                        category={values.category}
                        setFieldValue={setFieldValue}
                    />
                    <input
                        onChange={(e) => setFieldValue('title', e.target.value)}
                        placeholder="Title"
                        value={values.title}
                        className="px-4 py-2 border border-border dark:border-dark rounded-md w-full mt-2 dark:bg-accent-dark"
                    />
                    <div className="bg-white dark:bg-accent-dark mt-2 border border-border dark:border-dark rounded-md overflow-hidden">
                        <RichText
                            preview={false}
                            initialValue={initialValues.body}
                            setFieldValue={setFieldValue}
                            values={values}
                            maxLength={524288}
                        />
                    </div>
                    {postTags?.length > 0 ? (
                        <div className="mt-4">
                            <Slider>
                                {postTags?.map((tag) => {
                                    const active = values.tags.some((selectedTag) => selectedTag.id === tag.id)
                                    return (
                                        <button
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
                    <CallToAction className="mt-4" width="full">
                        Post
                    </CallToAction>
                </div>
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
