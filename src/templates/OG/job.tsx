import React from 'react'

type JobOgProps = {
    role: string
    roleFontSize?: number
    timezone?: string
    salary?: string
}

const navItems = ['Products', 'Pricing', 'Docs', 'Community', 'Company']

// Light tertiary scheme, the same values AppWindow resolves from data-scheme="tertiary".
const textPrimary = '#23251D'
const textSecondary = '#4D4F46'
const border = '#9EA096'
const frost = 'rgba(229, 231, 224, 0.75)'
const buttonFace = '#F7A501'
const buttonBorder = '#B17816'
const buttonShadow = '#CD8407'

const WindowControls = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 18, opacity: 0.4 }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="1.5" y="1.5" width="15" height="15" rx="2" stroke={textPrimary} strokeWidth="1.6" />
        </svg>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 4L14 14M14 4L4 14" stroke={textPrimary} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    </div>
)

export const JobOg = ({ role, roleFontSize = 72, timezone, salary }: JobOgProps) => (
    <div
        style={{
            width: 1200,
            height: 630,
            position: 'relative',
            color: textPrimary,
            fontFamily: 'RoundHog, sans-serif',
            display: 'flex',
            flexDirection: 'column',
        }}
    >
        <img
            src="grass"
            width={1200}
            height={630}
            style={{ position: 'absolute', top: 0, left: 0, objectFit: 'cover' }}
        />
        <div
            style={{
                position: 'relative',
                height: 64,
                backgroundColor: frost,
                backdropFilter: 'blur(64px)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 28px',
                gap: 32,
            }}
        >
            <img src="wordmark" width={160} height={28} />
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 26,
                    fontSize: 20,
                    fontWeight: 600,
                    color: textPrimary,
                    opacity: 0.7,
                }}
            >
                {navItems.map((item) => (
                    <span key={item}>{item}</span>
                ))}
            </div>
        </div>
        <div
            style={{
                position: 'relative',
                margin: '48px 100px 56px',
                flexGrow: 1,
                backgroundColor: frost,
                backdropFilter: 'blur(64px)',
                borderRadius: 16,
                border: `1px solid ${border}`,
                boxShadow: '0 18px 40px rgba(0, 0, 0, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    height: 58,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 22px',
                    borderBottom: `1px solid ${border}`,
                    fontSize: 25,
                    fontWeight: 600,
                }}
            >
                <span>Careers</span>
                <WindowControls />
            </div>
            <div
                style={{
                    padding: '36px 44px 48px',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    position: 'relative',
                }}
            >
                <img src="remote-hog" width={308} height={308} style={{ position: 'absolute', right: 28, bottom: 0 }} />
                <div
                    style={{
                        fontSize: roleFontSize,
                        fontWeight: 800,
                        lineHeight: `${Math.round(roleFontSize * (76 / 72))}px`,
                        whiteSpace: 'nowrap',
                    }}
                >
                    {role}
                </div>
                <div style={{ marginTop: 12, fontSize: 32, fontWeight: 500, color: textSecondary }}>
                    Remote{timezone ? ` · ${timezone}` : ''}
                </div>
                {salary ? (
                    <div
                        style={{
                            marginTop: 16,
                            fontSize: 46,
                            fontWeight: 800,
                            lineHeight: '54px',
                            textShadow: `0.8px 0 ${textPrimary}, -0.8px 0 ${textPrimary}`,
                        }}
                    >
                        {salary} + equity
                    </div>
                ) : null}
                <div style={{ position: 'relative', alignSelf: 'flex-start', marginTop: 'auto' }}>
                    <div
                        style={{
                            backgroundColor: buttonShadow,
                            borderRadius: 8,
                            paddingBottom: 7,
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: buttonFace,
                                color: '#000',
                                fontSize: 26,
                                fontWeight: 800,
                                lineHeight: '32px',
                                padding: '14px 28px',
                                borderRadius: 8,
                                border: `2px solid ${buttonBorder}`,
                            }}
                        >
                            Apply now
                        </div>
                    </div>
                    <svg
                        width="80"
                        height="80"
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{
                            position: 'absolute',
                            right: -22,
                            bottom: -40,
                            filter: 'drop-shadow(2px 3px 2px rgba(0, 0, 0, 0.28))',
                        }}
                    >
                        <path
                            d="M5.2 2.4L5.2 18.6L9.4 14.7L12.7 21.4L15.6 20L12.3 13.4L18.2 13.2L5.2 2.4Z"
                            fill="#111"
                            stroke="#fff"
                            strokeWidth="1.2"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
        </div>
    </div>
)
