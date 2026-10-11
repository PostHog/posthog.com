import React from 'react'
import { WindowOg } from './window'

export type DocsContributor = {
    username: string
    avatar?: string
}

type DocsOgProps = {
    title: string
    titleFontSize?: number
    timeToRead: number
    excerpt: string
    lastUpdated: string
    contributors: DocsContributor[]
    hog?: string
}

// Still used by the customer card.
export const DOCS_WORDMARK = 'docs-wordmark'

const textPrimary = '#111629'
const textSecondary = '#4D4F46'
const excerptColor = '#6E7168'
const fadeColor = '211, 215, 190'
const contributorColors = ['#2F80FA', '#F54E00', '#9B5DE5']

const shownContributors = 3
const fadeBands = 28
const fadeHeight = 120

const initials = (username: string) => {
    const parts = username.split(/[\s._-]+/).filter(Boolean)
    const letters = parts.length > 1 ? parts[0][0] + parts[1][0] : username.slice(0, 2)
    return letters.toUpperCase()
}

const ExcerptFade = () => (
    <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: fadeHeight }}>
        {Array.from({ length: fadeBands }, (_, index) => (
            <div
                key={index}
                style={{
                    position: 'absolute',
                    left: 0,
                    bottom: ((fadeBands - 1 - index) * fadeHeight) / fadeBands,
                    width: '100%',
                    height: fadeHeight / fadeBands + 1,
                    backgroundColor: `rgba(${fadeColor}, ${index / (fadeBands - 1)})`,
                }}
            />
        ))}
    </div>
)

const markSize = 42
const markOverlap = 14

const ContributorMark = ({ contributor, index }: { contributor: DocsContributor; index: number }) => (
    <div
        style={{
            marginLeft: index === 0 ? 0 : -markOverlap,
            width: markSize,
            height: markSize,
            borderRadius: markSize / 2,
            backgroundColor: '#D3D7BE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: index,
        }}
    >
        <div
            style={{
                width: markSize - 4,
                height: markSize - 4,
                borderRadius: (markSize - 4) / 2,
                overflow: 'hidden',
                backgroundColor: contributorColors[index % contributorColors.length],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 16,
                fontWeight: 800,
            }}
        >
            {contributor.avatar ? (
                <img
                    src={contributor.avatar}
                    width={markSize - 4}
                    height={markSize - 4}
                    style={{ objectFit: 'cover' }}
                />
            ) : (
                initials(contributor.username)
            )}
        </div>
    </div>
)

const columnWidth = 640

export const DocsOg = ({
    title,
    titleFontSize = 92,
    timeToRead,
    excerpt,
    lastUpdated,
    contributors,
    hog = 'wizard-hog',
}: DocsOgProps) => {
    const shown = contributors.slice(0, shownContributors)
    const others = contributors.length - shown.length

    return (
        <WindowOg>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: columnWidth,
                    maxWidth: columnWidth,
                    minWidth: 0,
                    height: '100%',
                }}
            >
                <div
                    style={{
                        width: columnWidth,
                        flexShrink: 0,
                        fontSize: titleFontSize,
                        fontWeight: 800,
                        lineHeight: `${Math.round(titleFontSize * 0.94)}px`,
                        color: textPrimary,
                    }}
                >
                    {title}
                </div>
                <div
                    style={{
                        position: 'relative',
                        width: columnWidth,
                        flexGrow: 1,
                        flexShrink: 1,
                        minHeight: 0,
                        marginTop: 18,
                        overflow: 'hidden',
                    }}
                >
                    <div
                        style={{
                            width: columnWidth,
                            fontSize: 28,
                            fontWeight: 600,
                            lineHeight: '38px',
                            color: excerptColor,
                        }}
                    >
                        {excerpt}
                    </div>
                    <ExcerptFade />
                </div>
                <div style={{ width: columnWidth, flexShrink: 0, marginTop: 16, display: 'flex', gap: 32 }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontSize: 26, fontWeight: 600, color: textSecondary }}>Read time</div>
                        <div style={{ marginTop: 6, fontSize: 32, fontWeight: 800, lineHeight: '38px' }}>
                            {timeToRead} min
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontSize: 26, fontWeight: 600, color: textSecondary }}>Last updated</div>
                        <div style={{ marginTop: 6, fontSize: 32, fontWeight: 800, lineHeight: '38px' }}>
                            {lastUpdated}
                        </div>
                    </div>
                    {shown.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontSize: 26, fontWeight: 600, color: textSecondary }}>Contributors</div>
                            <div style={{ marginTop: 6, display: 'flex', alignItems: 'center' }}>
                                {shown.map((contributor, index) => (
                                    <ContributorMark
                                        key={contributor.username}
                                        contributor={contributor}
                                        index={index}
                                    />
                                ))}
                                {others > 0 ? (
                                    <div style={{ marginLeft: 10, fontSize: 32, fontWeight: 800, lineHeight: '38px' }}>
                                        +{others}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
            <img
                src={hog}
                width={368}
                height={368}
                style={{ position: 'absolute', right: 12, bottom: 12, objectFit: 'contain' }}
            />
        </WindowOg>
    )
}
