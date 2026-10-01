import React from 'react'

type JobOgProps = {
    role: string
    roleFontSize?: number
    timezone?: string
    salary?: string
}

const navItems = ['Products', 'Pricing', 'Docs', 'Community', 'Company']

const WindowControls = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="1.5" y="1.5" width="15" height="15" rx="2" stroke="#939390" strokeWidth="1.6" />
        </svg>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 4L14 14M14 4L4 14" stroke="#939390" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    </div>
)

export const JobOg = ({ role, roleFontSize = 72, timezone, salary }: JobOgProps) => (
    <div
        style={{
            width: 1200,
            height: 630,
            backgroundImage: 'linear-gradient(to bottom right, #ced8b3, #a1b97d)',
            color: '#111',
            fontFamily: 'RoundHog, sans-serif',
            display: 'flex',
            flexDirection: 'column',
        }}
    >
        <div
            style={{
                height: 64,
                backgroundColor: '#eceee3',
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
                    color: '#3c3d38',
                }}
            >
                {navItems.map((item) => (
                    <span key={item}>{item}</span>
                ))}
            </div>
        </div>
        <div
            style={{
                margin: '48px 100px 56px',
                flexGrow: 1,
                backgroundColor: '#eeefe9',
                borderRadius: 16,
                border: '1px solid #d8d9d2',
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
                    borderBottom: '1px solid #e0e1da',
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
                <img
                    src="remote-hog"
                    width={308}
                    height={308}
                    style={{ position: 'absolute', right: 28, bottom: 0 }}
                />
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
                <div style={{ marginTop: 12, fontSize: 32, fontWeight: 500, color: '#6a6b65' }}>
                    Remote{timezone ? ` · ${timezone}` : ''}
                </div>
                {salary ? (
                    <div
                        style={{
                            marginTop: 16,
                            fontSize: 46,
                            fontWeight: 800,
                            lineHeight: '54px',
                            textShadow: '0.8px 0 #111, -0.8px 0 #111',
                        }}
                    >
                        {salary} + equity
                    </div>
                ) : null}
                <div style={{ position: 'relative', alignSelf: 'flex-start', marginTop: 'auto' }}>
                    <div
                        style={{
                            backgroundColor: '#CD8407',
                            borderRadius: 8,
                            paddingBottom: 7,
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: '#F7A501',
                                color: '#000',
                                fontSize: 26,
                                fontWeight: 800,
                                lineHeight: '32px',
                                padding: '14px 28px',
                                borderRadius: 8,
                                border: '2px solid #B17816',
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
