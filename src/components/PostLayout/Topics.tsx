import { ITopic } from './types'
import React from 'react'
import Link from 'components/Link'

export default function Topics({ topics }: { topics: ITopic[] }) {
    const buttonClasses = `px-4 py-2 inline-block bg-gray-accent-light border-black/80 rounded-sm font-semibold text-sm leading-none`
    return (
        <ul className="list-none p-0 flex items-start flex-wrap -m-1">
            {topics.map(({ name, url, state }: ITopic) => {
                return (
                    <li className="m-1" key={name}>
                        {url ? (
                            <Link className={`${buttonClasses} text-red dark:text-red`} to={url} state={state}>
                                {name}
                            </Link>
                        ) : (
                            <span className={`${buttonClasses} dark:text-black`}>{name}</span>
                        )}
                    </li>
                )
            })}
        </ul>
    )
}
