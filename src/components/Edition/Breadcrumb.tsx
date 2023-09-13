import Link from 'components/Link'
import React from 'react'

export default function Breadcrumb({ title }) {
    return (
        <div>
            <ul className="m-0 p-0 list-none flex space-x-1 font-semibold mb-6">
                <li>
                    <Link className="!text-inherit" to="/posts">
                        Posts
                    </Link>
                </li>
                <li>&rarr;</li>
                <li>{title}</li>
            </ul>
        </div>
    )
}
