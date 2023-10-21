import React from 'react'
import Link from 'components/Link'

export const Card = ({ question, url }) => {
    return (
        <>
            {url ? (
                <li className="text-2xl font-bold">
                    <Link to={url} className="block text-red dark:text-yellow font-bold py-1">
                        {question}
                    </Link>
                </li>
            ) : (
                <li className="text-2xl font-bold py-1">{question}</li>
            )}
        </>
    )
}
