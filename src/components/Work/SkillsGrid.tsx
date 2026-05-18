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
        title: 'Board Metrics Pack',
        type: 'Finance',
        tagline: 'MRR, ARR, NRR — and the customers who pay but don’t use it.',
        description:
            'Builds a board-ready monthly pack from Stripe and PostHog, plus the "quiet revenue" overlay that flags paying customers with no product usage.',
        sideEffect: 'Your CFO stops asking for the spreadsheet on the 28th.',
        icon: (
            <svg className="size-5 text-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
        ),
        iconBg: 'bg-teal/10',
    },
    {
        title: 'Churn Risk',
        type: 'Customer',
        tagline: 'Find the accounts going quiet before they go.',
        description:
            'Flags paying customers whose product usage has dropped, scores each one out of 100, and estimates revenue at risk.',
        sideEffect: 'Your renewal calls get a lot less surprising.',
        icon: (
            <svg className="size-5 text-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
        ),
        iconBg: 'bg-red/10',
    },
    {
        title: 'Customer Review',
        type: 'Customer',
        tagline: 'A 360 on one account, before the call.',
        description:
            'Pulls identity, top events, support and sales touches, MRR, recent session summaries, and ICP fit into a paste-ready brief.',
        sideEffect: 'You will sound briefed. Because you are.',
        icon: (
            <svg className="size-5 text-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M4 21v-2a4 4 0 0 1 4-4h4" />
                <circle cx="10" cy="7" r="4" />
                <polyline points="17 11 19 13 23 9" />
            </svg>
        ),
        iconBg: 'bg-purple/10',
    },
    {
        title: 'Define ICP',
        type: 'Growth',
        tagline: 'Stops re-explaining who your customer is, forever.',
        description:
            'Captures your ideal customer profile and saves it so every other skill — customer reviews, PMF tracking, power users — uses the same definition.',
        sideEffect: 'Two skills later, the receipts pay off.',
        icon: (
            <svg className="size-5 text-salmon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
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
