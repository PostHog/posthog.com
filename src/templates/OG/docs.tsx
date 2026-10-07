import React from 'react'

export type DocsCrumb = {
    name: string
}

export type DocsContributor = {
    username: string
    avatar?: string
}

type DocsOgProps = {
    title: string
    timeToRead: number
    excerpt: string
    lastUpdated: string
    breadcrumbs: DocsCrumb[]
    contributors: DocsContributor[]
}

export const DOCS_WORDMARK = 'docs-wordmark'

const OthersIcon = () => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <path
            d="M1 32C1 49.1208 14.8792 63 32 63C49.1208 63 63 49.1208 63 32C63 14.8792 49.1208 1 32 1C14.8792 1 1 14.8792 1 32Z"
            fill="#E5E7E0"
            stroke="#EEEFE9"
            strokeWidth="2"
        />
        <g opacity="0.3">
            <path
                d="M21.9907 30.776V35H26.2787V30.776H21.9907ZM29.8582 30.776V35H34.1462V30.776H29.8582ZM37.7257 30.776V35H42.0137V30.776H37.7257Z"
                fill="black"
            />
        </g>
    </svg>
)

const shownContributors = 3
const fadeBands = 40
const fadeHeight = 250

const ExcerptFade = () => (
    <div style={{ position: 'absolute', left: 0, bottom: 0, width: 856, height: fadeHeight }}>
        {Array.from({ length: fadeBands }, (_, index) => (
            <div
                key={index}
                style={{
                    position: 'absolute',
                    left: 0,
                    bottom: ((fadeBands - 1 - index) * fadeHeight) / fadeBands,
                    width: '100%',
                    height: fadeHeight / fadeBands,
                    backgroundColor: `rgba(238, 239, 233, ${index / (fadeBands - 1)})`,
                }}
            />
        ))}
    </div>
)

export const DocsOg = ({ title, timeToRead, excerpt, lastUpdated, breadcrumbs, contributors }: DocsOgProps) => {
    const shown = contributors.slice(0, shownContributors)
    const others = contributors.length - shown.length

    return (
        <div
            style={{
                width: 1200,
                height: 630,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                backgroundColor: '#eeefe9',
                color: 'black',
                fontFamily: 'MatterVF',
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    paddingTop: 21,
                    paddingRight: 63,
                    paddingBottom: 25,
                    paddingLeft: 63,
                    borderBottom: '2px dashed rgba(169, 169, 169, 0.5)',
                }}
            >
                <img src={DOCS_WORDMARK} width={251} height={48} />
            </div>
            <div style={{ display: 'flex', flexGrow: 1 }}>
                <div
                    style={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        paddingTop: 30,
                        paddingRight: 30,
                        paddingBottom: 30,
                        paddingLeft: 63,
                        borderRight: '2px dashed rgba(169, 169, 169, 0.5)',
                    }}
                >
                    <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: 28, fontWeight: 600 }}>
                        {breadcrumbs.flatMap((crumb, index) => {
                            const words = crumb.name.split(' ')
                            const tokens = [
                                ...(index > 0 ? [{ text: ' / ', faded: true }] : []),
                                ...words.map((word, wordIndex) => ({
                                    text: wordIndex === words.length - 1 ? word : `${word} `,
                                    faded: false,
                                })),
                            ]
                            return tokens.map((token, tokenIndex) => (
                                <span
                                    key={`${index}-${tokenIndex}`}
                                    style={{ color: token.faded ? 'black' : '#f54e00', opacity: token.faded ? 0.3 : 1 }}
                                >
                                    {token.text}
                                </span>
                            ))
                        })}
                    </div>
                    <div style={{ marginTop: 25, fontSize: 64, fontWeight: 700 }}>{title}</div>
                    <div style={{ marginTop: 14, fontSize: 32, fontWeight: 700, opacity: 0.5 }}>
                        {timeToRead} min read
                    </div>
                    <div
                        style={{ marginTop: 34, fontSize: 36, fontWeight: 400, lineHeight: '50.4px', color: '#2c2c2c' }}
                    >
                        {excerpt}
                    </div>
                </div>
                <div style={{ width: 340, flexShrink: 0, display: 'flex' }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: 30,
                            marginRight: 40,
                            marginLeft: 40,
                            width: 260,
                        }}
                    >
                        <div style={{ fontSize: 30, fontWeight: 600, opacity: 0.3, lineHeight: '42px' }}>
                            Last updated
                        </div>
                        <div
                            style={{ marginTop: 8, fontSize: 36, fontWeight: 600, opacity: 0.5, lineHeight: '50.4px' }}
                        >
                            {lastUpdated}
                        </div>
                        {shown.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div
                                    style={{
                                        marginTop: 42,
                                        fontSize: 30,
                                        fontWeight: 600,
                                        opacity: 0.3,
                                        lineHeight: '42px',
                                    }}
                                >
                                    Contributors
                                </div>
                                {shown.map((contributor) => (
                                    <div
                                        key={contributor.username}
                                        style={{ display: 'flex', alignItems: 'center', marginTop: 15 }}
                                    >
                                        {contributor.avatar ? (
                                            <div
                                                style={{
                                                    width: 60,
                                                    height: 60,
                                                    borderRadius: 30,
                                                    overflow: 'hidden',
                                                    flexShrink: 0,
                                                    display: 'flex',
                                                }}
                                            >
                                                <img
                                                    src={contributor.avatar}
                                                    width={60}
                                                    height={60}
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>
                                        ) : null}
                                        <div
                                            style={{
                                                marginLeft: 13,
                                                fontSize: 32,
                                                fontWeight: 600,
                                                opacity: 0.5,
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {contributor.username}
                                        </div>
                                    </div>
                                ))}
                                {others > 0 ? (
                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: 15 }}>
                                        <OthersIcon />
                                        <div style={{ marginLeft: 13, fontSize: 32, fontWeight: 600, opacity: 0.5 }}>
                                            {others} others
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            <ExcerptFade />
        </div>
    )
}
