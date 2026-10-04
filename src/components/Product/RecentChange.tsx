import React from 'react'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import Markdown from 'components/Squeak/components/Markdown'
import latestChangeByTeamJson from '@data/roadmap-latest-change-by-team.json'
import type { LatestChangeByTeam } from '~/data-layer/queries/roadmap'

const latestChangeByTeam = latestChangeByTeamJson as LatestChangeByTeam

export default function RecentChange({ team }: { team: string }) {
    const latest = latestChangeByTeam[team]
    if (!latest) return null

    const { title, date, description, cta } = latest
    return (
        <div>
            <h4 className="opacity-60 text-base">Latest update</h4>
            <p className="text-sm opacity-60 m-0">{date}</p>
            <h4 className="text-primary dark:text-primary-dark hover:text-red dark:hover:text-yellow">{title}</h4>
            <div>
                <Markdown>{description ?? ''}</Markdown>
            </div>

            <div className="flex gap-2">
                {cta?.url && (
                    <CallToAction to={cta.url} type="secondary" size="sm" className="mt-2" state={{ newWindow: true }}>
                        {cta.label}
                    </CallToAction>
                )}
                <CallToAction to="/changelog" type="secondary" size="sm" className="mt-2" state={{ newWindow: true }}>
                    Visit changelog
                </CallToAction>
            </div>
        </div>
    )
}
