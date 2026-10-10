import React from 'react'

type WindowOgProps = {
    children: React.ReactNode
}

// Sampled from the reference card, not the site theme.
const textPrimary = '#111629'
const control = '#85856B'
const border = '#9EA096'
const frost = 'rgba(229, 228, 215, 0.75)'

const WindowControls = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
            <rect x="1.5" y="1.5" width="15" height="15" rx="2" stroke={control} strokeWidth="2.4" />
        </svg>
        <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
            <path d="M3 3L15 15M15 3L3 15" stroke={control} strokeWidth="2.4" strokeLinecap="round" />
        </svg>
    </div>
)

// Desktop frame shared by Open Graph cards: grass and a frosted window.
// The body fills the area under the title bar.
export const WindowOg = ({ children }: WindowOgProps) => (
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
                <img src="logo" width={183} height={32} />
                <WindowControls />
            </div>
            <div
                style={{
                    padding: '52px 48px 56px',
                    display: 'flex',
                    flexGrow: 1,
                    position: 'relative',
                }}
            >
                {children}
            </div>
        </div>
    </div>
)
