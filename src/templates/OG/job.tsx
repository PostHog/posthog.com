import React from 'react'

type JobOgProps = {
    role: string
    timezone?: string
}

const metaStyle = {
    marginLeft: 28,
    fontWeight: 600,
    fontSize: 36,
    lineHeight: '64px',
}

export const JobOg = ({ role, timezone }: JobOgProps) => (
    <div
        style={{
            width: 1200,
            height: 630,
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#eeefe9',
            color: '#000',
            fontFamily: 'MatterVF, sans-serif',
        }}
    >
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                padding: '0 45px',
                boxSizing: 'border-box',
            }}
        >
            <div style={{ marginTop: 41 }}>
                <img src="wordmark" width={251} height={48} />
                <h1
                    style={{
                        fontSize: 36,
                        fontWeight: 700,
                        margin: '51px 0 10px',
                        lineHeight: '64px',
                        opacity: 0.5,
                    }}
                >
                    We're looking for a
                </h1>
                <h2
                    style={{
                        fontSize: 84,
                        fontWeight: 700,
                        lineHeight: '84px',
                        margin: 0,
                        maxWidth: 730,
                    }}
                >
                    {role}
                </h2>
            </div>
            <div style={{ marginBottom: 41 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="pin" width={64} height={90} style={{ opacity: 0.5 }} />
                    <div style={metaStyle}>Remote</div>
                </div>
                {timezone ? (
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: 30 }}>
                        <img src="clock" width={64} height={64} style={{ opacity: 0.5 }} />
                        <div style={metaStyle}>{timezone}</div>
                    </div>
                ) : null}
            </div>
        </div>
        <img src="detective-hog" width={499} height={515} style={{ position: 'absolute', right: 30, bottom: 13 }} />
    </div>
)
