import React from 'react'
import { Link } from 'gatsby'

export const BlogSidebar = () => {
    return (
        <div className="w-full">
            <header className="text-xs text-gray-400 uppercase">Categories</header>
            <Link to="/blog" className="block text-gray-900 my-2 text-sm hover:underline hover:text-gray-900">
                All posts
            </Link>
            <Link
                to="/blog/categories/general"
                className="block text-gray-900 my-2 text-sm hover:underline hover:text-gray-900"
            >
                General
            </Link>
            <Link
                to="/blog/categories/company-and-culture"
                className="block text-gray-900 my-2 text-sm hover:underline hover:text-gray-900"
            >
                Company & culture
            </Link>
            <Link
                to="/blog/categories/engineering"
                className="block text-gray-900 my-2 text-sm hover:underline hover:text-gray-900"
            >
                Engineering
            </Link>

            <header className="mt-12 text-xs text-gray-400 uppercase">More Reads</header>
            <a href="/tutorials" className="block text-gray-900 my-2 text-sm hover:underline hover:text-gray-900">
                Tutorials
            </a>
            <a href="/release-notes" className="block text-gray-900 my-2 text-sm hover:underline hover:text-gray-900">
                Release notes
            </a>

            <header className="mt-12 text-xs text-gray-400 uppercase">Follow Us</header>
            <a href="/twitter" className="block text-gray-900 my-2 text-sm hover:underline hover:text-gray-900">
                Twitter
            </a>
            <a href="/linked-in" className="block text-gray-900 my-2 text-sm hover:underline hover:text-gray-900">
                LinkedIn
            </a>
            <a href="/youtube" className="block text-gray-900 my-2 text-sm hover:underline hover:text-gray-900">
                YouTube
            </a>
        </div>
    )
}
