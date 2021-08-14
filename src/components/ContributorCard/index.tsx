import React from 'react'
import { Card, Col, Progress, Tag, Tooltip } from 'antd'
import { Link } from 'gatsby'
import './style.scss'
import { emojiKey } from './emojiKey'
import { Spacer } from 'components/Spacer'

interface ContributorCardStructureMeta {
    name: string
    imageSrc: string
    contributions: string[]
    mvpWins: number
    contributorLevel: number
    link: string
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
    link,
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
        <Tooltip title={title} overlayClassName="contributor-card-tooltip">
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
                className="card-elevated"
            >
                <a href={link}>
                    {mvpWins > 0 ? (
                        <Tag color="transparent" style={{ maxWidth: '30%', position: 'absolute', right: 15, top: 15 }}>
                            <ContributorCardTooltip title={`Community MVP ${mvpWins}x`} pageKey="community-mvps">
                                <h4>
                                    {Array.from({ length: mvpWins }).map((_: any, i: number) => (
                                        <span key={`trophy_${i}`}>🏆</span>
                                    ))}
                                </h4>
                            </ContributorCardTooltip>
                        </Tag>
                    ) : null}

                    <img
                        src={imageSrc}
                        style={{ maxWidth: 60, maxHeight: 60, marginBottom: 0, borderRadius: 10 }}
                        className="center"
                        alt="contributor image"
                    />

                    <br />

                    <h5 className="centered" style={{ color: '#fff' }}>
                        {name}
                    </h5>
                    <ContributorCardTooltip title="Number of PRs merged" pageKey="level">
                        <p style={{ color: 'rgb(231 184 250)', marginBottom: 5 }}>lvl {contributorLevel}</p>
                        <Progress
                            strokeColor={{
                                '0%': '#220f3f',
                                '100%': '#ab75ff',
                            }}
                            percent={contributorLevel >= 50 ? 50 : (100 * contributorLevel) / 50}
                            className="progress-bar"
                            showInfo={false}
                        />
                    </ContributorCardTooltip>
                    <Spacer height={40} />
                    <ContributorCardTooltip title="Types of contributions made" pageKey="powers">
                        <p style={{ color: 'rgb(231 184 250)', fontSize: 20, marginBottom: 0 }}>Powers</p>
                    </ContributorCardTooltip>
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
                </a>
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
    const ContributorDetails = ({ link }) => (
        <ContributorCardStructure
            link={link}
            name={name}
            imageSrc={imageSrc}
            contributions={contributions}
            mvpWins={mvpWins}
            contributorLevel={contributorLevel}
        />
    )

    return <ContributorDetails link={link} />
}
