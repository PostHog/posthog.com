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
    console.log(contributorLevel >= 50 ? 50 : (100 * contributorLevel) / 50)
    return (
        <div className="flex flex-col justify-center relative p-5 bg-white rounded-md">
            {mvpWins > 0 ? (
                <span style={{ maxWidth: '30%', position: 'absolute', right: 15, top: 15 }}>
                    <h4>
                        <ContributorCardTooltip title={`Community MVP ${mvpWins}x`} pageKey="community-mvps">
                            {Array.from({ length: mvpWins }).map((_: any, i: number) => (
                                <span key={`trophy_${i}`}>🏆</span>
                            ))}
                        </ContributorCardTooltip>
                    </h4>
                </span>
            ) : null}

            <img
                src={imageSrc}
                style={{ maxWidth: 60, maxHeight: 60, marginBottom: 0 }}
                className="center rounded-full overflow-hidden"
                alt="contributor image"
            />

            <h4 className="centered">{name}</h4>

            <h6>
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
            <div className="w-full bg-gray-accent-light h-[8px] rounded-full relative overflow-hidden">
                <div
                    className="absolute left-0 bg-gradient-to-r from-yellow to-red h-full"
                    style={{ width: `${contributorLevel >= 50 ? 50 : (100 * contributorLevel) / 50}%` }}
                />
            </div>
            <Spacer height={40} />

            <h6>
                Powers
                <ContributorCardTooltip title="Types of contributions made" pageKey="powers">
                    <img
                        src={tooltipIcon}
                        width="18"
                        height="18"
                        alt="More info"
                        className="inline-block opacity-25 hover:opacity-50 ml-1"
                    />
                </ContributorCardTooltip>
            </h6>

            <Spacer height={20} />
            <h2>
                {contributions.map((key) => (
                    <span key={key}>
                        <ContributorCardTooltip title={emojiKey[key].description} pageKey="powers">
                            {emojiKey[key].symbol}
                        </ContributorCardTooltip>{' '}
                    </span>
                ))}
            </h2>
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
