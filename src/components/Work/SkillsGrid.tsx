import React from 'react'

interface SkillCardProps {
    title: string
    tagline: string
    description: string
    sideEffect?: string
    icon: React.ReactNode
    iconBg?: string
    type?: string
}

function SkillCard({ title, tagline, description, sideEffect, icon, iconBg = 'bg-accent', type }: SkillCardProps) {
    return (
        <div className="h-[190px] relative group [perspective:1000px] text-center">
            <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front face */}
                <div className="absolute h-full w-full [backface-visibility:hidden] flex flex-col justify-center items-center gap-2 border border-primary rounded-sm bg-primary p-3">
                    {type && (
                        <span className="absolute top-2 left-2 text-[9px] uppercase tracking-widest font-bold text-secondary border border-primary rounded-sm px-1 py-px">
                            {type}
                        </span>
                    )}
                    <div className={`w-10 h-10 ${iconBg} rounded-sm flex items-center justify-center`}>{icon}</div>
                    <div>
                        <p className="text-sm font-bold m-0 leading-tight">{title}</p>
                        <p className="text-[11px] text-secondary m-0 leading-snug mt-1 px-1">{tagline}</p>
                    </div>
                </div>
                {/* Back face */}
                <div className="absolute h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-accent border border-primary rounded-sm p-3 flex flex-col justify-start items-start gap-1.5 text-left overflow-hidden">
                    <p className="text-xs font-bold m-0 leading-tight">{title}</p>
                    <p className="text-[11px] text-secondary m-0 leading-snug">{description}</p>
                    {sideEffect && (
                        <p className="text-[10px] italic text-muted m-0 leading-snug border-t border-primary pt-1.5 mt-auto">
                            <strong className="not-italic font-semibold text-secondary">Side effect:</strong>{' '}
                            {sideEffect}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

interface SkillsGridProps {
    className?: string
    limit?: number
}

const skills: SkillCardProps[] = [
    {
        title: 'PMF Tracker',
        type: 'Product',
        tagline: 'Are users very disappointed?',
        description:
            'Sets up the Superhuman PMF survey, builds the retention dashboard, and finds the users worth interviewing.',
        sideEffect: 'You will find out whether you have PMF. The answer may not be the one you wanted.',
        icon: (
            <svg className="size-5 text-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
        iconBg: 'bg-red/10',
    },
    {
        title: 'Power User Discovery',
        type: 'Product',
        tagline: 'Who is actually addicted to your product?',
        description:
            'Scores users on frequency, time in app, value actions, and feature breadth. Saves them as a PostHog cohort. Optionally invites the top ten to a user interview.',
        sideEffect: 'You will discover your power users are not who you assumed they were.',
        icon: (
            <svg className="size-5 text-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55.47.98.97 1.21C12.15 18.75 13 20.24 13 22" />
                <path d="M14 14.66V17c0 .55-.47.98-.97 1.21C11.85 18.75 11 20.24 11 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            </svg>
        ),
        iconBg: 'bg-yellow/10',
    },
    {
        title: 'Important Slack Threads',
        type: 'Reporting',
        tagline: 'What you missed this week, in two minutes.',
        description:
            'Scans the last 7 days of Slack for the threads that mattered — long, controversial, or unresolved — and flags disagreement and no-decision endings. Skips the GIF chains.',
        sideEffect: 'You will realize how many decisions were quietly happening without you.',
        icon: (
            <svg className="size-5 text-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <line x1="8" y1="9" x2="16" y2="9" />
                <line x1="8" y1="13" x2="13" y2="13" />
            </svg>
        ),
        iconBg: 'bg-blue/10',
    },
    {
        title: 'Competitor Changelog Tracker',
        type: 'Growth',
        tagline: 'Watches them, so you don’t have to.',
        description:
            'Checks 4–8 competitors across blog, jobs, social, and GitHub. Tags every finding as direct, inferred, or corroborated. Hands you a Slack-ready summary.',
        sideEffect: 'You will feel mildly smug on sales calls.',
        icon: (
            <svg className="size-5 text-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
        ),
        iconBg: 'bg-orange/10',
    },
    {
        title: 'Weekly Metrics Digest',
        type: 'Reporting',
        tagline: 'You are not, in fact, writing this by hand again.',
        description:
            'Pulls product metrics from PostHog every week, compares to prior week, flags anomalies, posts to Slack.',
        sideEffect: 'Reclaims about 38 minutes per week. You will spend 12 of them wondering what to do.',
        icon: (
            <svg className="size-5 text-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
        ),
        iconBg: 'bg-green/10',
    },
    {
        title: 'Release Notes Generator',
        type: 'Product',
        tagline: 'PRs in, prose out.',
        description: 'Reads merged PRs, groups by type, drafts external-facing release notes, posts to your channel.',
        sideEffect: 'Three people will compliment you on the changelog. You will accept the compliments.',
        icon: (
            <svg className="size-5 text-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
        ),
        iconBg: 'bg-green/10',
    },
    {
        title: 'Support Triage',
        type: 'Customer',
        tagline: 'Reads tickets faster than you’d like to admit.',
        description:
            'Reads overnight tickets, categorizes by urgency and type, drafts first responses for the top five.',
        sideEffect: 'First response times drop ~60%. CSAT improves. CS leads get raises. You do not. Yet.',
        icon: (
            <svg className="size-5 text-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
        iconBg: 'bg-purple/10',
    },
    {
        title: 'Feature Usage Report',
        type: 'Product',
        tagline: 'Tells you which features people actually use.',
        description:
            'Queries PostHog for feature adoption by cohort. Flags features your ICP isn’t touching. Compares against your roadmap.',
        sideEffect: 'You will have to have a conversation about feature number twelve.',
        icon: (
            <svg className="size-5 text-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
        ),
        iconBg: 'bg-yellow/10',
    },
    {
        title: 'Financial Anomaly Detector',
        type: 'Finance',
        tagline: 'Catches the spike before your CFO does.',
        description:
            'Pulls Stripe revenue, MRR, and churn. Identifies anomalies vs. rolling average. Suggests possible causes in plain English.',
        sideEffect: 'Your CFO will be unsettled by your sudden composure on numbers.',
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
        type: 'Customer',
        tagline: 'Stops being 400 quotes. Starts being three themes.',
        description:
            'Aggregates Intercom, Zendesk, and review data. Surfaces recurring themes. Ranks by frequency and sentiment.',
        sideEffect: 'You will discover that everyone has been saying the same thing for six months.',
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

export function SkillsGrid({ className = '', limit }: SkillsGridProps) {
    const visible = typeof limit === 'number' ? skills.slice(0, limit) : skills
    return (
        <div className={`grid grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4 gap-3 ${className}`}>
            {visible.map((skill) => (
                <SkillCard key={skill.title} {...skill} />
            ))}
        </div>
    )
}
