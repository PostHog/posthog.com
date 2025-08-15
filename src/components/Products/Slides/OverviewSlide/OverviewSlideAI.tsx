import React from 'react'
import { OverviewSlideProps } from './types'
import { IconSparkles } from '@posthog/icons'
import { AppIcon } from 'components/OSIcons/AppIcon'

export default function OverviewSlideOverlay({
    productName,
    overview,
    screenshots,
    color,
    Icon,
    hog,
}: OverviewSlideProps) {
    const assistants = [
        { name: 'Max', role: 'Helpful chatbot', icon: 'aiMax' },
        { name: 'Raquel', role: 'Data Analyst', icon: 'aiRaquel' },
        { name: 'Annika', role: 'Product Manager', icon: 'aiAnnika' },
        { name: 'Marius', role: '10x Engineer', icon: 'aiMarius' },
    ] as const

    const skills = [
        { name: 'Answers product questions', percent: 95 },
        { name: 'Writes SQL queries', percent: 95 },
        { name: 'PostHog product expert', percent: 90 },
        { name: 'Builds data transformations', percent: 95 },
        { name: 'Analytics industry knowledge', percent: 80 },
    ] as const
    return (
        <div className={`h-full grid grid-cols-4 relative text-primary`}>
            <aside className="p-4 bg-accent">
                <div className="flex items-center justify-center gap-2 pb-4">
                    <IconSparkles className="size-10" />
                    <h3 className="text-2xl font-bold">PostHog AI</h3>
                </div>

                <div className="mt-4 grid gap-3">
                    {assistants.map((assistant) => (
                        <div
                            key={assistant.name}
                            className={`flex gap-2 p-2 rounded-md ${
                                assistant.name === productName ? 'bg-accent' : 'opacity-50'
                            }`}
                            {...(assistant.name === productName ? { 'data-scheme': 'secondary' } : {})}
                        >
                            <div>
                                <AppIcon name={assistant.icon} className="size-10" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold mb-0">{assistant.name}</p>
                                <p className="text-lg mb-0">{assistant.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>
            <div className="col-span-3 p-12">
                <p className="text-2xl font-medium text-secondary">{productName}</p>
                <h1 className="text-5xl font-bold mb-8 ">{overview?.title}</h1>
                <h2 className="text-2xl font-normal mb-8">{overview?.description}</h2>

                <h3 className="text-2xl font-bold mb-4">Skills</h3>
                <div className="grid grid-cols-2 gap-8">
                    {skills.map((skill) => (
                        <div key={skill.name} className="mb-4">
                            <div className="text-2xl font-semibold mb-3">{skill.name}</div>
                            <div className="w-full h-4 bg-input rounded">
                                <div className={`h-4 rounded bg-${color}`} style={{ width: `${skill.percent}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
