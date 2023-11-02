import { Menu } from '@headlessui/react'
import { IconCheck, IconChevronDown } from '@posthog/icons'
import React, { useEffect, useRef, useState } from 'react'
import { fetchCategories } from './lib'
import qs from 'qs'

const query = qs.stringify(
    {
        filters: {
            posts: {
                id: {
                    $notNull: true,
                },
            },
        },
        populate: ['post_tags.posts'],
    },
    {
        encodeValuesOnly: true,
    }
)

export default function Categories({ setSelectedCategories, selectedCategories, root }) {
    const containerEl = useRef(null)
    const [categories, setCategories] = useState([])
    const [open, setOpen] = useState(false)

    const getTags = (label) =>
        categories
            .find((category) => category?.attributes?.label === label)
            ?.attributes?.post_tags?.data.map((tag) => tag?.attributes?.label)

    useEffect(() => {
        fetchCategories(query).then((categories) => {
            const selectedCategory = categories.find((category) => category.attributes?.folder === root)
            if (selectedCategory) {
                setSelectedCategories({
                    [selectedCategory.attributes?.label]: selectedCategory.attributes?.post_tags?.data.map(
                        (tag) => tag?.attributes?.label
                    ),
                })
            }
            setCategories(categories)
        })
    }, [])

    const handleCategoryClick = (newCategory) => {
        let newCategories
        if (selectedCategories[newCategory]) {
            const { [newCategory]: _tags, ...rest } = selectedCategories
            newCategories = rest
        } else {
            newCategories = { ...selectedCategories, [newCategory]: getTags(newCategory) }
        }
        setSelectedCategories(newCategories)
    }

    const handleTagClick = (category, tag, active) => {
        let newCategories = { ...selectedCategories }
        if (active) {
            newCategories[category] = newCategories[category].filter((selectedTag) => selectedTag !== tag)
        } else {
            newCategories[category] = [...(newCategories[category] ?? []), tag]
        }
        if (newCategories[category].length <= 0) {
            const { [category]: _tags, ...rest } = newCategories
            newCategories = rest
        }
        setSelectedCategories(newCategories)
    }

    useEffect(() => {
        function handleClick(e) {
            if (containerEl?.current && !containerEl?.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [containerEl])

    return (
        <div ref={containerEl} className="relative z-10">
            <Menu>
                <Menu.Button
                    onClick={() => setOpen(!open)}
                    className={`text-left text-sm flex space-x-2 justify-between items-end relative px-4 py-1 rounded border border-b-3 hover:border-light dark:hover:border-dark bg-accent dark:bg-accent-dark border-light dark:border-dark hover:top-[0px] hover:scale-[1]`}
                >
                    <span>Categories</span>
                    <IconChevronDown className="w-5 mb-[-1px]" />
                </Menu.Button>
                {open && categories?.length > 0 && (
                    <Menu.Items
                        static
                        className="absolute grid gap-y-2 right-0 bg-accent dark:bg-accent-dark p-2 border border-border dark:border-dark rounded mt-1"
                    >
                        {categories.map((category) => {
                            const active = Object.keys(selectedCategories).some(
                                (selectedCategory) => selectedCategory === category.attributes.label
                            )
                            const tags = category.attributes.post_tags?.data
                            return (
                                <Menu.Item as="span" key={category.id}>
                                    <button
                                        onClick={() => handleCategoryClick(category.attributes.label, active)}
                                        className="text-left whitespace-nowrap flex items-center space-x-2"
                                    >
                                        <span
                                            className={`w-4 h-4 rounded-sm border text-white ${
                                                active ? 'bg-red border-red' : 'border-border dark:border-dark'
                                            }`}
                                        >
                                            {active && <IconCheck />}
                                        </span>
                                        <span className="text-sm">{category.attributes.label}</span>
                                    </button>
                                    {tags?.length > 0 && (
                                        <div className="ml-2 mt-2 grid gap-y-2">
                                            {tags?.map((tag) => {
                                                if (tag.attributes?.posts?.data?.length <= 0) return null
                                                const active = selectedCategories[category.attributes.label]?.some(
                                                    (selectedTag) => selectedTag === tag.attributes.label
                                                )
                                                return (
                                                    <Menu.Item as="span" key={tag.id}>
                                                        <button
                                                            onClick={() =>
                                                                handleTagClick(
                                                                    category.attributes.label,
                                                                    tag.attributes.label,
                                                                    active
                                                                )
                                                            }
                                                            className="text-left whitespace-nowrap flex items-center space-x-2"
                                                        >
                                                            <span
                                                                className={`w-4 h-4 rounded-sm border text-white ${
                                                                    active
                                                                        ? 'bg-red border-red'
                                                                        : 'border-border dark:border-dark'
                                                                }`}
                                                            >
                                                                {active && <IconCheck />}
                                                            </span>
                                                            <span className="text-sm">{tag.attributes.label}</span>
                                                        </button>
                                                    </Menu.Item>
                                                )
                                            })}
                                        </div>
                                    )}
                                </Menu.Item>
                            )
                        })}
                    </Menu.Items>
                )}
            </Menu>
        </div>
    )
}
