import React from 'react'
import { Link } from 'gatsby'
import { BlogCategories, CategoryInterface } from '../constants/categories'

const linkClassList =
    'block text-gray-900 dark:text-gray-100 my-2 text-sm hover:underline hover:text-gray-900 dark:hover:text-gray-100'

export const BlogSidebar = () => {
    const blogCategoryLinks = BlogCategories.map((category: CategoryInterface) => {
        return (
            <Link to={category.link} key={category.slug} className={linkClassList}>
                {category.title}
            </Link>
        )
    })

    return (
        <div className="w-full">
            <header className="text-xs text-gray-400 uppercase">Categories</header>
            {blogCategoryLinks}

            <header className="mt-12 text-xs text-gray-400 uppercase">More Reads</header>
            <a href="/tutorials" className={linkClassList}>
                Tutorials
            </a>
            <a href="/release-notes" className={linkClassList}>
                Release notes
            </a>

            <header className="mt-12 text-xs text-gray-400 uppercase">Follow Us</header>
            <a href="/twitter" className={linkClassList}>
                Twitter
            </a>
            <a href="/linked-in" className={linkClassList}>
                LinkedIn
            </a>
            <a href="/youtube" className={linkClassList}>
                YouTube
            </a>
        </div>
    )
}
