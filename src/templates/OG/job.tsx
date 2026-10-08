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
// Primary OSButton: orange face, button border, button shadow.
const buttonFace = '#EB9D2A'
const buttonBorder = '#B17816'
const buttonShadow = '#CD8407'

const WindowControls = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, opacity: 0.4 }}>
        <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
            <rect x="1.5" y="1.5" width="15" height="15" rx="2" stroke={textPrimary} strokeWidth="2.4" />
        </svg>
        <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
            <path d="M3 3L15 15M15 3L3 15" stroke={textPrimary} strokeWidth="2.4" strokeLinecap="round" />
        </svg>
    </div>
)

export const JobOg = ({ role, roleFontSize = 120, timezone, salary }: JobOgProps) => {
    const facts = [
        { label: 'Location', value: 'Remote' },
        timezone ? { label: 'Timezone(s)', value: timezone } : null,
        salary ? { label: 'Salary', value: salary } : null,
    ].filter((fact): fact is { label: string; value: string } => fact !== null)

    return (
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
                <div style={{ marginLeft: 'auto' }}>
                    <div
                        style={{
                            backgroundColor: buttonShadow,
                            borderRadius: 10,
                            paddingBottom: 4,
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: buttonFace,
                                color: '#000000',
                                borderTop: `1px solid ${buttonBorder}`,
                                borderLeft: `1px solid ${buttonBorder}`,
                                borderRight: `1px solid ${buttonBorder}`,
                                borderBottom: `2px solid ${buttonBorder}`,
                                borderRadius: 8,
                                fontSize: 20,
                                fontWeight: 700,
                                lineHeight: '24px',
                                padding: '8px 16px',
                            }}
                        >
                            Get started - free
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    position: 'relative',
                    margin: '18px 24px 20px',
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
                        height: 68,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 26px',
                        borderBottom: `1px solid ${border}`,
                        fontSize: 32,
                        fontWeight: 600,
                    }}
                >
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                            color: textSecondary,
                            fontWeight: 600,
                        }}
                    >
                        Careers
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7.47 9.47a.75.75 0 0 1 1.06 0L12 12.94l3.47-3.47a.75.75 0 1 1 1.06 1.06l-3.646 3.647a1.25 1.25 0 0 1-1.768 0L7.47 10.53a.75.75 0 0 1 0-1.06Z"
                                fill={textSecondary}
                            />
                        </svg>
                    </span>
                    <WindowControls />
                </div>
                <div
                    style={{
                        padding: '36px 28px 40px',
                        display: 'flex',
                        flexGrow: 1,
                        position: 'relative',
                    }}
                >
                    <img
                        src="laptop-hog"
                        width={340}
                        height={340}
                        style={{ position: 'absolute', right: 8, bottom: 28 }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', width: 780 }}>
                        <div
                            style={{
                                width: 720,
                                fontSize: roleFontSize,
                                fontWeight: 800,
                                lineHeight: `${Math.round(roleFontSize * 0.94)}px`,
                            }}
                        >
                            {role}
                        </div>
                        <div style={{ marginTop: 'auto', display: 'flex', gap: 36 }}>
                            {facts.map((fact) => (
                                <div key={fact.label} style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div
                                        style={{
                                            fontSize: 22,
                                            fontWeight: 600,
                                            color: textSecondary,
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {fact.label}
                                    </div>
                                    <div
                                        style={{
                                            marginTop: 6,
                                            fontSize: 36,
                                            fontWeight: 800,
                                            lineHeight: '42px',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {fact.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
