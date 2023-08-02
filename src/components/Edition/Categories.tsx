import { Menu } from '@headlessui/react'
import { Check, ChevronDown } from '@posthog/icons'
import React, { useEffect, useRef, useState } from 'react'
import { fetchCategories } from './lib'

export default function Categories({ setSelectedCategories, selectedCategories, setParams, root }) {
    const containerEl = useRef(null)
    const [categories, setCategories] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        fetchCategories().then((categories) => {
            const selectedCategory = categories.find((category) => category.attributes?.folder === root)
            if (selectedCategory) {
                setSelectedCategories([selectedCategory])
            }
            setCategories(categories)
        })
    }, [])

    const handleClick = (newCategory) => {
        const newCategories = selectedCategories.some((selectedCategory) => selectedCategory.id === newCategory.id)
            ? selectedCategories.filter((selectedCategory) => selectedCategory.id !== newCategory.id)
            : [...selectedCategories, newCategory]
        setSelectedCategories(newCategories)
        setParams({
            filters: {
                post_category: {
                    id: {
                        $in: newCategories.map((category) => category.id),
                    },
                },
            },
        })
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

    return categories?.length > 0 ? (
        <div ref={containerEl} className="relative z-10">
            <Menu>
                <Menu.Button
                    onClick={() => setOpen(!open)}
                    className={`text-left text-sm flex space-x-2 justify-between items-end relative px-4 py-1 rounded border border-b-3 hover:border-light dark:hover:border-dark bg-accent dark:bg-accent-dark border-light dark:border-dark hover:top-[0px] hover:scale-[1]`}
                >
                    <span>Filters</span>
                    <ChevronDown className="w-5 mb-[-1px]" />
                </Menu.Button>
                {open && (
                    <Menu.Items
                        static
                        className="absolute grid gap-y-2 right-0 bg-accent dark:bg-accent-dark p-2 border border-border dark:border-dark rounded mt-1"
                    >
                        {categories.map((category) => {
                            const active = selectedCategories.some(
                                (selectedCategory) => selectedCategory.id === category.id
                            )
                            return (
                                <Menu.Item key={category.id}>
                                    <button
                                        onClick={() => handleClick(category)}
                                        className="text-left whitespace-nowrap flex items-center space-x-2"
                                    >
                                        <span
                                            className={`w-4 h-4 rounded-sm border text-white ${
                                                active ? 'bg-red border-red' : 'border-border dark:border-dark'
                                            }`}
                                        >
                                            {active && <Check />}
                                        </span>
                                        <span className="text-sm">{category?.attributes?.label}</span>
                                    </button>
                                </Menu.Item>
                            )
                        })}
                    </Menu.Items>
                )}
            </Menu>
        </div>
    ) : null
}
