import React, { version } from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import Link from 'components/Link'

const skills = [
    'Put on a data analyst hat and explore your PostHog data in depth',
    'Create dashboards and generate PostHog data visualizations, such as insights',
    'Interact natively with the PostHog UI, for example by editing filters',
    'Generate complex PostHog SQL queries',
    "Answer questions from PostHog's documentation",
    'Create surveys using natural language',
    'Write Hog functions to power your realtime destinations',
]

export default function OverviewSlideMax() {
    return (
        <div className="h-full p-8 flex flex-col justify-center bg-ai">
            <div className="bg-white/80 backdrop-blur-lg h-full rounded-lg shadow-2xl flex flex-col @2xl:flex-row gap-8 @2xl:gap-12 p-8">
                <aside className="text-center">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/max_aeaeca84a3.png"
                        alt="Max AI"
                        className="max-w-[469px]"
                    />
                </aside>
                <div className="flex-1 prose">
                    <h2 className="text-5xl font-bold text-primary mb-4">Meet Max, your AI product assistant.</h2>
                    <p className="text-2xl text-secondary mx-auto">
                        Max is deeply connected with your data, and lives inside of the PostHog app.
                    </p>
                    <h3 className="text-2xl mt-4">Unlike other agents, Max can:</h3>
                    <ul>
                        {skills.map((skill: string) => (
                            <li key={skills.indexOf(skill)} className="text-xl">
                                {skill}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
