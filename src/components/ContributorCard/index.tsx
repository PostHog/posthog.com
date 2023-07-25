import React from 'react'
import { emojiKey } from './emojiKey'
import Tooltip from 'components/Tooltip'
import Link from 'components/Link'
import tooltipIcon from './images/tooltip.svg'

type ContributorCardProps = {
    name: string
    link: string
    imageSrc: string
    contributions: string[]
    mvpWins: number
    contributorLevel: number
}

export const ContributorCard = ({
    name,
    link,
    imageSrc,
    contributions,
    mvpWins,
    contributorLevel,
}: ContributorCardProps) => {
    const handleTooltipContentClick = (e: React.MouseEvent, pageKey = '') => {
        if (window) {
            e.preventDefault()
            e.stopPropagation()
            window.open(
                `${window.location.protocol}//${window.location.host}/docs/contribute/recognizing-contributions#${pageKey}`,
                '_blank'
            )
        }
    }

    const ContributorCardTooltip = ({
        title,
        children,
        pageKey,
    }: {
        title: string
        children: React.ReactNode
        pageKey: string
    }) => (
        <Tooltip content={title}>
            <span onClick={(e) => handleTooltipContentClick(e, pageKey)}>{children}</span>
        </Tooltip>
    )

    return (
        <Link to={link} className="relative">
            {mvpWins > 0 ? (
                <div className="absolute top-4 right-4 text-xl">
                    <ContributorCardTooltip title={`Community MVP ${mvpWins}x`} pageKey="community-mvps">
                        {Array.from({ length: mvpWins }).map((_: any, i: number) => (
                            <span key={`trophy_${i}`}>🏆</span>
                        ))}
                    </ContributorCardTooltip>
                </div>
            ) : null}
            <div className="bg-accent dark:bg-accent-dark border border-light dark:border-dark text-primary dark:text-primary-dark rounded flex flex-col items-center pt-6 pb-12 px-6 space-y-6">
                <div className="space-y-1">
                    <img
                        src={imageSrc}
                        className="mx-auto w-12 h-12 rounded-full overflow-hidden"
                        alt="contributor image"
                    />

                    <h4 className="text-opacity-80">{name}</h4>
                </div>

                <div className="w-full space-y-1.5">
                    <div className="text-opacity-80">
                        Level {contributorLevel}
                        <ContributorCardTooltip title="Number of PRs merged" pageKey="level">
                            <img
                                src={tooltipIcon}
                                alt="More info"
                                className="w-3.5 h-3.5 inline-block opacity-25 hover:opacity-50 ml-1"
                            />
                        </ContributorCardTooltip>
                    </div>

                    <div className="relative w-full rounded-full overflow-hidden bg-white dark:bg-accent/25 h-1.5">
                        <div
                            style={{ width: `${contributorLevel >= 50 ? 50 : (100 * contributorLevel) / 50}%` }}
                            className="absolute left-0 inset-y-0 h-full bg-gradient-to-r from-[#F1A82C] to-orange"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <div className="text-opacity-80">
                        Powers
                        <ContributorCardTooltip title="Types of contributions made" pageKey="powers">
                            <img
                                src={tooltipIcon}
                                alt="More info"
                                className="w-3.5 h-3.5 inline-block opacity-25 hover:opacity-50 ml-1"
                            />
                        </ContributorCardTooltip>
                    </div>

                    <div className="text-xl">
                        {contributions.map((key) => (
                            <span key={key}>
                                <ContributorCardTooltip title={emojiKey[key].description} pageKey="powers">
                                    {emojiKey[key].symbol}
                                </ContributorCardTooltip>{' '}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ContributorCard
