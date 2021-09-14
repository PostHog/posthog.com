import React from 'react'
import Link from '../Link'

export default function SubmenuItemFooter({ links }) {
    return (
        <div
            style={{ borderLeft: 0 }}
            className="flex flex-wrap space-x-10 px-5 pt-5 lg:pb-5 col-span-1 lg:col-span-2 border-t"
        >
            {links.map((link, index) => {
                return (
                    <Link className="text-light-yellow hover:text-light-yellow" key={index} to={link.url}>
                        {link.title}
                    </Link>
                )
            })}
        </div>
    )
}
