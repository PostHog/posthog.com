import React from 'react'
import Avatar from './Avatar'
import Link from 'components/Link'

const Reply = ({ avatar, name, body, authorData }) => {
    return (
        <div className="bg-gray-accent-light dark:bg-gray-accent-dark p-4 rounded-md w-full mt-3">
            <div className="flex space-x-2 items-center">
                <Avatar image={authorData?.image || avatar} />
                <p className="m-0 text-[14px] font-semibold">
                    {authorData?.link_url ? (
                        <Link to={authorData.link_url}>{authorData.name}</Link>
                    ) : (
                        <span>{name}</span>
                    )}

                    <span className="opacity-50">, {authorData?.role || 'Contributor'}</span>
                </p>
            </div>
            <p className="my-3">{body}</p>
        </div>
    )
}

export default function Question({ question }) {
    const { avatar, body, name, replies } = question
    return (
        <div className="flex items-start space-x-4 w-full">
            <Avatar image={avatar} />
            <div className="flex-grow">
                <p className="mb-0">{body}</p>
                <p className="text-[14px] font-semibold opacity-50 mb-3">by {name}</p>
                {replies.length > 0 && replies.map((reply, index) => <Reply key={index} {...reply} />)}
            </div>
        </div>
    )
}
