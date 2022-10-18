import { GitHub } from 'components/Icons/Icons'
import Link from 'components/Link'
import React from 'react'
import { IRoadmap } from '.'

export function UnderConsideration(props: IRoadmap) {
    const { title, html_url, number, reactions } = props.githubPages[0]
    return (
        <li>
            <Link to={html_url} className="text-lg text-red flex space-x-1 items-center">
                <span>{title}</span>
                <span className="text-sm text-black opacity-50">#{number}</span>
            </Link>
            <ul className="list-none m-0 p-0 flex items-center space-x-2 text-sm font-semibold mt-2 mb-2">
                <li className="flex space-x-1 items-center">
                    {reactions.heart > 0 && (
                        <>
                            <span>❤️</span>
                            <span className="text-black/60">{reactions.heart}</span>
                        </>
                    )}
                </li>
                <li className="flex space-x-1 items-center">
                    {reactions.eyes > 0 && (
                        <>
                            <span>👀</span>
                            <span className="text-black/60">{reactions.eyes}</span>
                        </>
                    )}
                </li>
                <li className="flex space-x-1 items-center">
                    {reactions.hooray > 0 && (
                        <>
                            <span>🎉</span>
                            <span className="text-black/60">{reactions.hooray}</span>
                        </>
                    )}
                </li>
            </ul>
            <Link
                to={html_url}
                className="text-[15px] inline-flex items-center space-x-2 py-2 px-4 rounded-sm bg-gray-accent-light text-black hover:text-black font-bold"
            >
                <GitHub className="w-[24px]" />
                <span>Vote on GitHub</span>
            </Link>
        </li>
    )
}
