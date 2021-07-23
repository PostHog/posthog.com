import React from 'react'
import { Link } from 'gatsby'
import { BlogCategories, CategoryInterface } from '../constants/categories'

const linkClassList =
    'block text-gray-900 dark:text-gray-100 my-2 text-sm hover:underline hover:text-gray-900 dark:hover:text-gray-100'

export function BlogSidebar(): JSX.Element {
    const blogCategoryLinks = BlogCategories.filter((cat) => !cat.hideFromNavigation).map(
        (category: CategoryInterface) => {
            return (
                <Link to={category.link} key={category.slug} className={linkClassList}>
                    {category.title}
                </Link>
            )
        }
    )

    return (
        <div className="w-full">
            <header className="text-xs text-gray-400 uppercase">Categories</header>
            {blogCategoryLinks}

            <header className="mt-12 text-xs text-gray-400 uppercase">More Reads</header>
            <Link to="/docs/tutorials/overview" className={linkClassList}>
                Tutorials
            </Link>
            <header className="mt-12 text-xs text-gray-400 uppercase">Follow Us</header>
            <a href="https://twitter.com/PostHogHQ" className={linkClassList} target="_blank" rel="noreferrer">
                Twitter
            </a>
            <a
                href="https://www.linkedin.com/company/posthog/"
                className={linkClassList}
                target="_blank"
                rel="noreferrer"
            >
                LinkedIn
            </a>
            <a
                href="https://www.youtube.com/channel/UCn4mJ4kK5KVSvozJre645LA"
                className={linkClassList}
                target="_blank"
                rel="noreferrer"
            >
                YouTube
            </a>
        </div>
    )
}
