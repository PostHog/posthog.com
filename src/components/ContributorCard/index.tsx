import React from 'react'
import { Card, Col, Progress, Tag, Tooltip } from 'antd'
import { Link } from 'gatsby'
import './style.scss'
import { emojiKey } from './emojiKey'

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
    return (
        <Col sm={12} md={12} lg={8} xl={6} style={{ marginBottom: 20 }}>
            <Card
                style={{ height: 450, display: 'flex', marginBottom: 20 }}
                bodyStyle={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
                className="card-elevated"
            >
                {mvpWins > 0 ? (
                    <Tag color="transparent" style={{ maxWidth: '30%', position: 'absolute', right: 15, top: 15 }}>
                        <Tooltip title={`Community MVP ${mvpWins}x`}>
                            <h4>{Array.from({ length: mvpWins }).map(() => `🏆`)}</h4>
                        </Tooltip>
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
                <p style={{ color: 'rgb(231 184 250)', marginBottom: 5 }}>lvl {contributorLevel}</p>
                <Progress
                    strokeColor={{
                        '0%': '#220f3f',
                        '100%': '#ab75ff',
                    }}
                    percent={contributorLevel >= 5 ? 100 : (100 * contributorLevel) / 5}
                    className="progress-bar"
                    showInfo={false}
                />
                <p style={{ color: 'rgb(231 184 250)', fontSize: 20, marginTop: 40 }}>Powers</p>
                <h2>
                    {contributions.map((key) => (
                        <Tooltip key={key} title={emojiKey[key].description}>
                            {emojiKey[key].symbol}{' '}
                        </Tooltip>
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
