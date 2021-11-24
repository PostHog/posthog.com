import { Card, Col, Progress, Tag } from 'antd'
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
        <Col sm={12} md={12} lg={8} xl={6} style={{ marginBottom: 20 }}>
            <Card
                style={{ height: 450, display: 'flex', marginBottom: 20 }}
                bodyStyle={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
                className="card-elevated hover:shadow-none"
            >
                {mvpWins > 0 ? (
                    <Tag color="transparent" style={{ maxWidth: '30%', position: 'absolute', right: 15, top: 15 }}>
                        <h4>
                            <ContributorCardTooltip title={`Community MVP ${mvpWins}x`} pageKey="community-mvps">
                                {Array.from({ length: mvpWins }).map((_: any, i: number) => (
                                    <span key={`trophy_${i}`}>🏆</span>
                                ))}
                            </ContributorCardTooltip>
                        </h4>
                    </Tag>
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
                <Progress
                    strokeColor={{
                        '0%': '#F1A82C',
                        '100%': '#F54E00',
                    }}
                    percent={contributorLevel >= 50 ? 50 : (100 * contributorLevel) / 50}
                    className="progress-bar rounded-full overflow-hidden bg-gray-accent-light"
                    showInfo={false}
                />
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
            </Card>
        </Col>
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
