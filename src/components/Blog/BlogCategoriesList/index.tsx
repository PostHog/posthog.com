import React from 'react'
import { Link } from 'gatsby'
import { BlogCategories, CategoryInterface } from '../constants/categories'

const linkClassList =
    'inline-block leading-loose border-2 rounded-lg px-2 mx-1 my-1 text-sm hover:bg-white hover:bg-opacity-50 transition-colors'

export function BlogCategoriesList({ activeSlug = 'blog' }: { activeSlug?: string }): JSX.Element {
    const listObjects = [
        ...BlogCategories,
        {
            title: 'Tutorials',
            slug: 'tutorials',
            link: '/docs/tutorials',
        },
    ]

    return (
        <div className="text-center mb-4">
            {listObjects
                .filter((cat) => !cat.hideFromNavigation)
                .map((category: CategoryInterface) => {
                    const isActive = category.slug === activeSlug
                    const statefulClasses = isActive
                        ? 'bg-white hover:bg-opacity-100 text-black dark:text-black'
                        : 'opacity-75 text-white dark:text-white'
                    return (
                        <Link to={category.link} key={category.slug} className={`${linkClassList} ${statefulClasses}`}>
                            {category.title}
                        </Link>
                    )
                })}
        </div>
    )
}
