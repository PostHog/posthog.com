import { ClosedIssue, OpenIssue } from 'components/Icons/Icons'
import Link from 'components/Link'
import React, { useState } from 'react'
import { IRoadmap } from '.'

export function InProgress(props: IRoadmap) {
    const [more, setMore] = useState(false)
    const { title, githubPages, description } = props
    const completedIssues = githubPages && githubPages?.filter((page) => page.closed_at)
    const percentageComplete = githubPages && Math.round((completedIssues.length / githubPages?.length) * 100)
    return (
        <li>
            <h4 className="text-lg flex space-x-1 items-center m-0">{title}</h4>
            <p className="m-0 text-[15px] text-black/80 inline">
                {more ? description : description.substring(0, 130) + (description?.length > 130 ? '...' : '')}
            </p>
            {!more && (description || githubPages?.length > 0) && (
                <button onClick={() => setMore(true)} className="font-semibold text-red inline ml-1">
                    more
                </button>
            )}
            {githubPages && (
                <div className="mt-4">
                    <div className="h-2 flex-grow bg-gray-accent-light rounded-md relative overflow-hidden">
                        <div
                            style={{ width: `${percentageComplete}%` }}
                            className={`bg-[#3FB950] absolute inset-0 h-full`}
                        />
                    </div>
                </div>
            )}
            {githubPages && more && (
                <ul className="list-none m-0 p-0 grid gap-y-2 mt-4">
                    {githubPages.map((page) => {
                        return (
                            <li key={page.title}>
                                <Link
                                    to={page.html_url}
                                    className="text-[14px] flex items-center font-semibold space-x-1 text-black"
                                >
                                    <span>{page.closed_at ? <ClosedIssue /> : <OpenIssue />}</span>
                                    <span>{page.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            )}
        </li>
    )
}
