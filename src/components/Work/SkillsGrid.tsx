import React from 'react'

interface SkillCardProps {
    title: string
    tagline: string
    description: string
    icon: React.ReactNode
    iconBg?: string
}

function SkillCard({ title, tagline, description, icon, iconBg = 'bg-accent' }: SkillCardProps) {
    return (
        <div className="h-[160px] relative group [perspective:1000px] text-center">
            <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front face */}
                <div className="absolute h-full w-full [backface-visibility:hidden] flex flex-col justify-center items-center gap-2 border border-primary rounded-sm bg-primary p-4">
                    <div className={`w-10 h-10 ${iconBg} rounded-sm flex items-center justify-center`}>{icon}</div>
                    <div>
                        <p className="text-sm font-bold m-0 leading-tight">{title}</p>
                        <p className="text-[11px] text-secondary m-0 leading-tight">{tagline}</p>
                    </div>
                </div>
                {/* Back face */}
                <div className="absolute h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-accent border border-primary rounded-sm p-4 flex flex-col justify-center items-center gap-2">
                    <p className="text-sm font-bold m-0">{title}</p>
                    <p className="text-xs text-secondary m-0 leading-snug">{description}</p>
                    <span className="text-xs font-medium text-secondary border border-primary rounded-sm px-2 py-0.5 mt-1 cursor-default">
                        Coming soon
                    </span>
                </div>
            </div>
        </div>
    )
}

interface SkillsGridProps {
    className?: string
}

const skills: SkillCardProps[] = [
    {
        title: 'Weekly Metrics Digest',
        tagline: 'Pull, compare, narrate.',
        description: 'Fetches key product metrics every week, compares to prior week, flags anomalies, posts to Slack.',
        icon: (
            <svg className="size-5 text-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
        ),
        iconBg: 'bg-blue/10',
    },
    {
        title: 'Competitor Pricing Monitor',
        tagline: 'Track 5 competitors.',
        description: 'Checks competitor pricing pages weekly. Diffs against last week. Alerts you to changes.',
        icon: (
            <svg className="size-5 text-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
        ),
        iconBg: 'bg-red/10',
    },
    {
        title: 'Release Notes Generator',
        tagline: 'PRs → changelog.',
        description: 'Reads merged PRs, groups by type, drafts external-facing release notes, posts to your channel.',
        icon: (
            <svg className="size-5 text-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
            </svg>
        ),
        iconBg: 'bg-green/10',
    },
    {
        title: 'Support Triage',
        tagline: 'Categorize + draft.',
        description:
            'Reads overnight tickets, categorizes by urgency and type, drafts first responses for the top five.',
        icon: (
            <svg className="size-5 text-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
        iconBg: 'bg-orange/10',
    },
    {
        title: 'NPS Analysis',
        tagline: 'Themes, not spreadsheets.',
        description: 'Reads survey responses, identifies themes, segments by score, writes the executive summary.',
        icon: (
            <svg className="size-5 text-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
        ),
        iconBg: 'bg-yellow/10',
    },
    {
        title: 'Feature Usage Report',
        tagline: 'Who uses what.',
        description: 'Queries PostHog for feature adoption by cohort. Flags unused features in your active users.',
        icon: (
            <svg className="size-5 text-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
        ),
        iconBg: 'bg-purple/10',
    },
    {
        title: 'Financial Anomaly Detector',
        tagline: 'Flag the unexpected.',
        description:
            'Pulls Stripe revenue, MRR, and churn data. Identifies anomalies vs. rolling average. Explains possible causes.',
        icon: (
            <svg className="size-5 text-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        ),
        iconBg: 'bg-teal/10',
    },
    {
        title: 'Customer Feedback Synthesis',
        tagline: 'Patterns, not noise.',
        description:
            'Aggregates Intercom, Zendesk, and review data. Surfaces recurring themes. Ranks by frequency and sentiment.',
        icon: (
            <svg className="size-5 text-salmon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="18" r="3" />
                <circle cx="6" cy="6" r="3" />
                <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                <line x1="6" y1="9" x2="6" y2="21" />
            </svg>
        ),
        iconBg: 'bg-salmon/10',
    },
]

export function SkillsGrid({ className = '' }: SkillsGridProps) {
    return (
        <div className={`grid grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4 gap-3 ${className}`}>
            {skills.map((skill) => (
                <SkillCard key={skill.title} {...skill} />
            ))}
        </div>
    )
}
