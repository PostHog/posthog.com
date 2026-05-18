import React from 'react'
import Link from 'components/Link'
import ScrollArea from 'components/RadixUI/ScrollArea'
import SEO from 'components/seo'
import LevelBadge from 'components/Squeak/components/LevelBadge'
import { LEVELS } from 'components/Squeak/util/getLevel'

export default function Reputation() {
    return (
        <div data-scheme="secondary" className="h-full bg-primary text-primary">
            <SEO title="Reputation - PostHog" />
            <ScrollArea>
                <div className="p-4 space-y-4">
                    <div>
                        <p className="text-sm text-secondary m-0">
                            Reputation is earned by participating in{' '}
                            <Link
                                to="/questions"
                                className="font-bold text-red dark:text-yellow"
                                state={{ newWindow: true }}
                            >
                                community discussions
                            </Link>
                            . The more you help others, the higher your reputation.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-base font-bold m-0 mb-3">Badge tiers</h3>
                        <ul className="m-0 p-0 list-none divide-y divide-primary/30">
                            {LEVELS.map(({ threshold, label }) => (
                                <li
                                    key={label}
                                    className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
                                >
                                    <div className="flex items-center gap-2">
                                        <LevelBadge points={threshold} tooltip={false} />
                                    </div>
                                    <span className="text-sm text-secondary">{threshold}+ reputation</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}
