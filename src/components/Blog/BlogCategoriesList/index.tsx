import React from 'react'
import { Link } from 'gatsby'
import { BlogCategories, CategoryInterface } from '../constants/categories'

const linkClassList =
    'inline-block leading-loose border-2 border-black dark:border-white rounded-lg px-2 mx-1 my-1 text-sm hover:bg-black dark:hover:bg-white dark:hover:bg-opacity-50 hover:bg-opacity-20 transition-colors hover:text-black dark:hover:text-white'

export function BlogCategoriesList({ activeSlug = 'blog' }: { activeSlug?: string }): JSX.Element {
    return (
        <div className="text-center mb-4">
            {BlogCategories.filter((cat) => !cat.hideFromNavigation).map((category: CategoryInterface) => {
                const isActive = category.slug === activeSlug
                const statefulClasses = isActive
                    ? 'bg-black text-white dark:bg-white dark:text-black hover:bg-opacity-50'
                    : 'text-black dark:text-white opacity-75'
                return (
                    <Link to={category.link} key={category.slug} className={`${linkClassList} ${statefulClasses}`}>
                        {category.title}
                    </Link>
                )
            })}
        </div>
    )
}
