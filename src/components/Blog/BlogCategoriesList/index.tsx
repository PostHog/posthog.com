import React from 'react'
import { Link } from 'gatsby'
import { BlogCategories, CategoryInterface } from '../constants/categories'

const linkClassList =
    'leading-loose border-2 dark:border-white rounded-lg px-2 mx-1 my-1 text-sm transition-colors select-none'

export function BlogCategoriesList({ activeSlug = 'blog' }: { activeSlug?: string }): JSX.Element {
    return (
        <div className="flex justify-center mb-4">
            <div className="flex flex-nowrap overflow-x-auto pb-1 px-2 default-scrollbar">
                {BlogCategories.filter((cat) => !cat.hideFromNavigation).map((category: CategoryInterface) => {
                    const isActive = category.slug === activeSlug
                    const statefulClasses = isActive
                        ? 'bg-black text-white border-black hover:text-white dark:bg-white dark:text-black'
                        : 'text-black text-opacity-50 hover:text-opacity-100 border-gray border-opacity-75 hover:border-opacity-100 dark:text-white'
                    return (
                        <Link
                            to={category.link}
                            key={category.slug}
                            className={`${linkClassList} ${statefulClasses}`}
                            style={{ flex: '0 0 auto' }}
                        >
                            {category.title}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
