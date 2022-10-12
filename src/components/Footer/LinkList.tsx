import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import React from 'react'

export interface IProps {
    title: string
    url: string
    items?: {
        title: string
        url: string
    }[]
}

export const LinkListItem = ({ title, url, items }: IProps) => {
    return (
        <>
            {items && (
                <ul className="px-2 pt-8 lg:pt-16 pb-4 lg:pb-12 m-0 space-y-[1px] border-l border-b lg:border-b-0 border-dashed border-gray-accent-light dark:border-gray-accent-dark last:border-r">
                    <li className="list-none">
                        <h4 className="text-[17px] mb-0">
                            <Link
                                to={url}
                                className="flex hover:text-red rounded hover:bg-gray-accent-light hover:dark:bg-gray-accent-dark dark:opacity-80 hover:opacity-100 px-3 py-1.5 box-border relative active:top-[.5px] active:scale-[.99] transition-all"
                            >
                                {title}
                            </Link>
                        </h4>
                    </li>
                    {items.map(({ title, url }) => {
                        return (
                            <li key={title} className="list-none text-[15px]">
                                <Link
                                    to={url}
                                    className="flex font-medium rounded hover:bg-gray-accent-light hover:dark:bg-gray-accent-dark dark:opacity-80 hover:opacity-100 px-3 py-1.5 box-border relative active:top-[.5px] active:scale-[.99] transition-all"
                                >
                                    {title}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            )}
        </>
    )
}
