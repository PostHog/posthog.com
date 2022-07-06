import { Spacer } from 'components/Spacer'
import { Link } from 'gatsby'
import React from 'react'
import Tooltip from '../Tooltip'
import { emojiKey } from './emojiKey'
import tooltipIcon from './images/tooltip.svg'

interface ContributorCardStructureMeta {
    name: string
    imageSrc: string
    contributions: string[]
    mvpWins: number
    contributorLevel: number
}

interface ContributorCardMeta extends ContributorCardStructureMeta {
    link: string
    onClick?: () => void | undefined
}

const ContributorCardStructure = ({
    name,
    imageSrc,
    contributions,
    mvpWins,
    contributorLevel,
}: ContributorCardStructureMeta) => {
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
        <Tooltip title={title}>
            <span onClick={(e) => handleTooltipContentClick(e, pageKey)} className="tooltip-content">
                {children}
            </span>
        </Tooltip>
    )

    return (
        <div className="relative bg-white shadow-xl py-8 px-4 rounded">
            {mvpWins > 0 ? (
                <div className="absolute right-4 top-4 w-6 h-6">
                    <h4>
                        <ContributorCardTooltip title={`Community MVP ${mvpWins}x`} pageKey="community-mvps">
                            {Array.from({ length: mvpWins }).map((_: any, i: number) => (
                                <span key={`trophy_${i}`}>🏆</span>
                            ))}
                        </ContributorCardTooltip>
                    </h4>
                </div>
            ) : null}

            <img src={imageSrc} className="w-12 h-12 center rounded-full overflow-hidden" alt="contributor image" />

            <h4 className="centered mt-2 text-black">{name}</h4>

            <h6 className="mt-4">
                Level {contributorLevel}
                <ContributorCardTooltip title="Number of PRs merged" pageKey="level">
                    <img
                        src={tooltipIcon}
                        width="18"
                        height="18"
                        alt="More info"
                        className="inline-block opacity-25 hover:opacity-50 ml-1"
                    />
                </ContributorCardTooltip>
            </h6>

            <div className="my-8 text-lg">
                {contributions.map((key) => (
                    <span key={key}>
                        <ContributorCardTooltip title={emojiKey[key].description} pageKey="powers">
                            {emojiKey[key].symbol}
                        </ContributorCardTooltip>{' '}
                    </span>
                ))}
            </div>
        </div>
    )
}

export const ContributorCard = ({
    name,
    link,
    imageSrc,
    onClick,
    contributions,
    mvpWins,
    contributorLevel,
}: ContributorCardMeta) => {
    const ContributorDetails = () => (
        <ContributorCardStructure
            name={name}
            imageSrc={imageSrc}
            contributions={contributions}
            mvpWins={mvpWins}
            contributorLevel={contributorLevel}
        />
    )

    return (
        <div className="contributor-card-wrapper">
            {onClick ? (
                <span onClick={onClick}>
                    <ContributorDetails />
                </span>
            ) : link.includes('.') ? (
                <a href={link}>
                    <ContributorDetails />
                </a>
            ) : (
                <Link to={link}>
                    <ContributorDetails />
                </Link>
            )}
        </div>
    )
}
