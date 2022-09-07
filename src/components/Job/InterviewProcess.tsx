import React from 'react'

const interviewProcess = [
    {
        title: 'Application',
        description:
            'Our talent team will review your application to see how your skills and experience align with our needs.',
        badge: 'You are here',
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
        title: 'PostHog SuperDay',
        description: `You’ll join a standup, meet the team, and work on a task related to your role, offering a realistic view of what it’s like working at PostHog.`,
        badge: 'Paid day of work',
    },
    {
        title: 'Offer',
        description: `If everyone’s happy, we’ll make you an offer to join us - YAY!`,
        badge: 'Pop the champagne (after you sign)',
    },
]

export default function InterviewProcess() {
    return (
        <>
            <p>We do 2-3 short interviews, then pay you to do some real-life (or close to real-life) work.</p>
            <ul className="list-none m-0 p-0 grid gap-y-6">
                {interviewProcess.map(({ title, description, badge }, index) => {
                    return (
                        <li className="flex items-start space-x-4" key={title}>
                            <div className="w-12 h-12 bg-gray-accent-light rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                                <span>{index + 1}</span>
                            </div>
                            <div>
                                <h5 className="m-0 flex items-center flex-wrap">
                                    <span className="mr-2">{title}</span>
                                    <span className="text-base opacity-50">{badge}</span>
                                </h5>
                                <p className="m-0">{description}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
