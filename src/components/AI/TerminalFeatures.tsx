import React from 'react'
import TerminalTabs from './TerminalTabs'

interface Skill {
    name: string
    description: string
    percent: number
}

interface Feature {
    title: string
    description: string
    color: string
    skills: Skill[]
}

interface TerminalFeaturesProps {
    features: Feature[]
    categoryLabels?: string[]
}

function ProgressBar({ percent, width = 20 }: { percent: number; width?: number }): string {
    const filled = Math.floor((percent / 100) * width)
    const empty = width - filled
    return '█'.repeat(filled) + '░'.repeat(empty)
}

function FeatureContent({ feature }: { feature: Feature }): JSX.Element {
    const colorMap: Record<string, string> = {
        green: '#00FF00',
        blue: '#1D4AFF',
        purple: '#B62AD9',
        yellow: '#F1A82C',
        orange: '#F54E00',
        salmon: '#FF6B6B',
    }

    const accentColor = colorMap[feature.color] || '#F1A82C'

    return (
        <div className="space-y-4">
            {/* Description */}
            <div className="pl-4 border-l-2 text-sm leading-relaxed" style={{ borderColor: accentColor }}>
                {feature.description}
            </div>

            {/* Skills */}
            {feature.skills && feature.skills.length > 0 && (
                <div className="space-y-3">
                    <div className="text-[#F1A82C] text-sm font-bold">SKILLS:</div>
                    {feature.skills.map((skill, idx) => (
                        <div key={idx} className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                                <span style={{ color: accentColor }}>•</span>
                                <span className="text-[rgba(238,239,233,0.9)] font-bold">{skill.name}</span>
                            </div>
                            <div className="pl-4 text-[14px] text-[rgba(238,239,233,0.7)] leading-snug">
                                {skill.description}
                            </div>
                            <div className="pl-4 flex items-center gap-2">
                                <div className="text-[12px] font-mono">
                                    <span style={{ color: accentColor }}>
                                        {ProgressBar({ percent: skill.percent })}
                                    </span>
                                </div>
                                <span className="text-[#666] text-[12px]">{skill.percent}% CONFIDENCE</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default function TerminalFeatures({ features, categoryLabels = [] }: TerminalFeaturesProps): JSX.Element {
    // Create tabs for all features
    const tabs = features
        .filter((f) => f.title)
        .map((feature) => ({
            id: feature.title.toLowerCase().replace(/\s+/g, '-'),
            label: feature.title,
        }))

    return (
        <div>
            {/* Feature Tabs */}
            <TerminalTabs tabs={tabs} vertical>
                {(activeTab) => {
                    const feature = features.find(
                        (f) => f.title && f.title.toLowerCase().replace(/\s+/g, '-') === activeTab
                    )
                    return feature ? <FeatureContent feature={feature} /> : null
                }}
            </TerminalTabs>
        </div>
    )
}
