import React from 'react'
import { WindowOg } from './window'

type JobOgProps = {
    role: string
    roleFontSize?: number
    timezone?: string
    salary?: string
}

const textSecondary = '#4D4F46'

export const JobOg = ({ role, roleFontSize = 120, timezone, salary }: JobOgProps) => {
    const facts = [
        { label: 'Location', value: 'Remote' },
        timezone ? { label: 'Timezone(s)', value: timezone } : null,
        salary ? { label: 'Salary', value: salary } : null,
    ].filter((fact): fact is { label: string; value: string } => fact !== null)

    return (
        <WindowOg title="Careers">
            <img src="laptop-hog" width={340} height={340} style={{ position: 'absolute', right: 8, bottom: 28 }} />
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
        </WindowOg>
    )
}
