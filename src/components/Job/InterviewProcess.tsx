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
            'Our talent team will review your application to see how your skills and experience align with our needs.',
        badge: '(You are here)',
    },
    {
        title: 'Culture interview',
        description:
            'You'll meet a member of our talent team. Our goal is to explore your motivations to join our team, learn why you’d be a great fit, and answer any questions you have.',
        badge: '30-min video call',
    },
    {
        title: 'Technical interview',
        description: `You'll meet the Team Lead who will evaluate skills needed to be successful in your role. No live coding. If you are applying for an engineering role, this is usually followed by a 30min call with our CTO, Tim.`,
        badge: '60-min video call, varies by role',
    },
    {
        title: 'PostHog SuperDay',
        description: `You’ll have a kickoff meeting, meet the team, and work on a task related to your role, offering a realistic view of what it’s like to work at PostHog.`,
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

export default function InterviewProcess({ role }: { role?: string }) {
    return (
        <>
            <p>We do 2-3 short interviews, then pay you to do some real-life (or close to real-life) work.</p>
            <ul className="list-none m-0 p-0 grid gap-y-6">
                {((role && roleInterviewProcess[role.trim()]) || defaultInterviewProcess).map(
                    ({ title, description, badge }, index) => {
                        return (
                            <li
                                className="flex items-start space-x-4 first:border first:border-dashed first:border-gray-accent-light dark:first:border-gray-accent-dark first:pt-3 first:pb-2 first:px-3 first:-mx-3 first:rounded-md first:bg-white dark:first:bg-gray-accent-dark-hover"
                                key={title}
                            >
                                <div className="w-12 h-12 bg-gray-accent-light dark:bg-gray-accent-dark rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                                    <span>{index + 1}</span>
                                </div>
                                <div>
                                    <h5 className="m-0 flex items-baseline flex-wrap">
                                        <span className="mr-2">{title}</span>
                                        <span className="text-sm font-normal opacity-50">{badge}</span>
                                    </h5>
                                    <p className="m-0">{description}</p>
                                </div>
                            </li>
                        )
                    }
                )}
            </ul>
        </>
    )
}
