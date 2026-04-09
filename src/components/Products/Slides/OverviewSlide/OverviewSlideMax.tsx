import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'

export const skills = [
    'Understand and explore your product data in depth',
    'Synthesize context across multiple sources',
    'Create dashboards and data visualizations in PostHog',
    'Interact natively with the PostHog UI, for example by editing filters',
    'Generate and edit complex SQL queries',
    "Answer questions from PostHog's product documentation",
]

export const skillTitle = `Unlike other agents, PostHog AI can:`

export default function OverviewSlideMax() {
    return (
        <div className="h-full bg-[#b8e0d8]">
            <div className="size-full bg-ai p-8 flex flex-col justify-center">
                <div className="bg-white/80 dark:bg-black/80 backdrop-blur-lg h-full rounded-md shadow-2xl flex flex-col @2xl:flex-row gap-8 @2xl:gap-12 p-8">
                    <aside className="text-center">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog_ai_hogs_d4c45b4550.png"
                            alt="PostHog AI"
                            className="max-w-[469px]"
                        />
                    </aside>
                    <div className="flex-1 prose">
                        <h2 className="text-5xl font-bold text-primary mt-4 mb-4">
                            PostHog AI is deeply connected with your data
                        </h2>
                        <p className="text-2xl text-secondary mx-auto">
                            Ask it to build insights, write PostHog SQL queries, summarize session recordings, create
                            surveys, set up feature flags – basically handle the grunt work that would normally take 20
                            minutes of clicking around.
                        </p>
                        <h3 className="text-2xl mt-4 text-primary">{skillTitle}</h3>
                        <ul>
                            {skills.map((skill: string) => (
                                <li key={skills.indexOf(skill)} className="text-xl text-primary">
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
