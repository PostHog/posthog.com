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
            {reactions ? (
                <ul className="list-none m-0 p-0 flex items-center space-x-2 text-sm font-semibold mt-2 mb-2">
                    {reactions.heart > 0 && (
                        <li className="flex space-x-1 items-center">
                            <>
                                <span>❤️</span>
                                <span className="text-black/60">{reactions.heart}</span>
                            </>
                        </li>
                    )}
                    {reactions.eyes > 0 && (
                        <li className="flex space-x-1 items-center">
                            <>
                                <span>👀</span>
                                <span className="text-black/60">{reactions.eyes}</span>
                            </>
                        </li>
                    )}
                    {reactions.hooray > 0 && (
                        <li className="flex space-x-1 items-center">
                            <>
                                <span>🎉</span>
                                <span className="text-black/60">{reactions.hooray}</span>
                            </>
                        </li>
                    )}
                    {reactions._1 > 0 && (
                        <li className="flex space-x-1 items-center">
                            <>
                                <span>👍</span>
                                <span className="text-black/60">{reactions._1}</span>
                            </>
                        </li>
                    )}
                </ul>
            ) : null}
            <Link
                to={html_url}
                className="text-[15px] active:top-[0.5px] active:scale-[.98] inline-flex items-center space-x-2 py-2 px-4 rounded-sm bg-gray-accent-light text-black hover:text-black font-bold"
            >
                <GitHub className="w-[24px]" />
                <span>Vote on GitHub</span>
            </Link>
        </li>
    )
}
