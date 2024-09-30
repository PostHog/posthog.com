import React from 'react'

interface IInterviewProcess {
    title: string
    description: string
    badge: string
}

const defaultInterviewProcess: IInterviewProcess[] = [
    {
        title: 'Application',
        description:
            "We're looking to see how your skills and experience align with our needs.",
        badge: 'Our talent team will review your application',
    },
    {
        title: 'Culture interview',
        description:
            'Our goal is to explore your motivations to join our team, learn why you’d be a great fit, and answer questions about us.',
        badge: '30-min video call',
    },
    {
        title: 'Technical interview',
        description: `You'll meet the hiring team who will evaluate skills needed to be successful in your role. No live coding.`,
        badge: '45 minutes, varies by role',
    },
    {
        title: 'Founder interview',
        description: `You have reached the final boss. It's time to chat with James or Tim.`,
        badge: '30 minutes',
    },
    {
        title: 'PostHog SuperDay',
        description: `You’ll meet a few more members of the team and work on a independent project. It's challenging, but most people say it's fun!`,
        badge: 'Paid day of work',
    },
    {
        title: 'Offer',
        description: `If everyone’s happy, we’ll make you an offer to join us - YAY!`,
        badge: 'Pop the champagne (after you sign)',
    },
]

const roleInterviewProcess: Record<string, IInterviewProcess[]> = {
    'Site Reliability Engineer - Kubernetes': [
        defaultInterviewProcess[0],
        defaultInterviewProcess[1],
        {
            title: 'Technical interview',
            description: `You'll meet with an Engineer who will evaluate skills needed to be successful in your role.`,
            badge: '1 hour',
        },
        defaultInterviewProcess[3],
        defaultInterviewProcess[4],
    ],
}

export default function InterviewProcess({ role, inApplicationProcess }: { role?: string, inApplicationProcess?: boolean }) {
    return (
        <>
            <ul className="list-none m-0 p-0 grid">
                {((role && roleInterviewProcess[role.trim()]) || defaultInterviewProcess).map(
                    ({ title, description, badge }, index) => {
                        return (
                            <li
                                className={`flex items-start py-3 space-x-4 relative before:absolute before:w-px before:top-0 before:bottom-0 before:left-6 before:bg-border dark:before:bg-border-dark last:before:bottom-12 ${inApplicationProcess ? 'first:bg-white dark:first:bg-accent-dark first:border first:border-b-3 first:border-light dark:first:border-dark first:pt-3 first:pb-2 first:px-3 first:-mx-3 first:rounded-md first:before:hidden' : 'first:before:top-6'}`}
                                key={title}
                            >
                                <div className="w-12 h-12 bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded-full flex items-center justify-center flex-shrink-0 font-semibold relative">
                                    <span>{index + 1}</span>
                                </div>
                                <div>
                                    <h5 className="m-0 text-[17px]">
                                        {title}
                                        {inApplicationProcess && index === 0 && (
                                            <span className="text-sm opacity-70 font-normal"> (You are here)</span>
                                        )}
                                    </h5>
                                    <strong className="text-[15px] font-semibold">{badge}</strong>
                                    <p className="m-0 text-sm opacity-70">{description}</p>
                                </div>
                            </li>
                        )
                    }
                )}
            </ul >
        </>
    )
}
