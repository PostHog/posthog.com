import { GitHub } from 'components/Icons/Icons'
import Link from 'components/Link'
import React from 'react'
import { IRoadmap } from '.'

export const Reactions = ({ reactions, className = '' }) => {
    return (
        <ul className={`list-none m-0 p-0 flex items-center space-x-4 text-sm font-semibold mt-1 ${className}`}>
            {reactions?.heart > 0 && (
                <li className="flex space-x-1 items-center">
                    <>
                        <span>❤️</span>
                        <span className="text-black/60 dark:text-white/60">{reactions.heart}</span>
                    </>
                </li>
            )}
            {reactions?.eyes > 0 && (
                <li className="flex space-x-1 items-center">
                    <>
                        <span>👀</span>
                        <span className="text-black/60 dark:text-white/60">{reactions.eyes}</span>
                    </>
                </li>
            )}
            {reactions?.hooray > 0 && (
                <li className="flex space-x-1 items-center">
                    <>
                        <span>🎉</span>
                        <span className="text-black/60 dark:text-white/60">{reactions.hooray}</span>
                    </>
                </li>
            )}
            {reactions?.plus1 > 0 && (
                <li className="flex space-x-1 items-center">
                    <>
                        <span>👍</span>
                        <span className="text-black/60 dark:text-white/60">{reactions.plus1}</span>
                    </>
                </li>
            )}
        </ul>
    )
}

export function UnderConsideration(props: IRoadmap) {
    const { title, html_url, number, reactions } = props.githubPages[0]
    return (
        <li className="sm:flex xl:flex-col space-y-2 sm:space-y-0 px-4 py-4 sm:py-2 xl:pb-4 bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded-sm relative">
            <div className="flex-1 sm:mt-2">
                <Link to={html_url} className="text-red flex-1 space-x-1 items-center">
                    <span>{title}</span>
                    <span className="text-sm text-black dark:text-white opacity-50">#{number}</span>
                </Link>
                <Reactions className="sm:pb-2" reactions={reactions} />
            </div>
            <div className="grow-0 shrink-0">
                <Link
                    to={html_url}
                    className="text-[15px] active:top-[0.5px] active:scale-[.98] inline-flex items-center space-x-2 py-2 px-4 rounded-sm bg-border dark:bg-border-dark !text-black hover:!text-black dark:!text-white dark:hover:!text-white font-bold"
                    data-attr={`vote-on-github:${title}`}
                >
                    <GitHub className="w-[24px]" />
                    <span>Vote on GitHub</span>
                </Link>
            </div>
        </li>
    )
}
