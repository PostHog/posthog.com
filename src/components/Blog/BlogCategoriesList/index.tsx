import React from 'react'
import { Link } from 'gatsby'
import { BlogCategories, CategoryInterface } from '../constants/categories'

const linkClassList =
    'border-2 rounded-lg text-gray-900 dark:text-white px-2 py-1 mx-1 my-2 text-sm hover:bg-white hover:bg-opacity-50'

export function BlogCategoriesList(): JSX.Element {
    const blogCategoryLinks = BlogCategories.filter((cat) => !cat.hideFromNavigation).map(
        (category: CategoryInterface) => (
            <Link to={category.link} key={category.slug} className={linkClassList}>
                {category.title}
            </Link>
        )
    )

    return (
        <div className="text-center mb-2">
            {blogCategoryLinks}
            <Link to="/docs/tutorials/overview" className={linkClassList}>
                Tutorials
            </Link>
        </div>
    )
}
