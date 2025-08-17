import React from 'react'
import { OverviewSlideProps } from './types'
import { IconSparkles } from '@posthog/icons'
import { AppIcon } from 'components/OSIcons/AppIcon'
import CloudinaryImage from 'components/CloudinaryImage'

export default function OverviewSlideAI({ productName, overview, screenshots, color, Icon, hog }: OverviewSlideProps) {
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
        <div className={`h-full @2xl:grid grid-cols-4 relative text-primary`}>
            <aside className="@2xl:p-4 bg-accent col-span-1">
                <div className="flex items-center justify-center gap-2 @2xl:pb-4">
                    <IconSparkles className="size-10" />
                    <h3 className="text-2xl font-bold">PostHog AI</h3>
                </div>

                <div className="flex justify-between @2xl:justify-normal @2xl:grid @2xl:gap-3 p-4 @2xl:px-0 @2xl:pb-0">
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
                                <p className="text-xl @2xl:text-2xl font-bold mb-0">{assistant.name}</p>
                                <p className="text-base @2xl:text-lg mb-0">{assistant.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>
            <div className="col-span-3">
                <div className="@2xl:grid grid-cols-5 items-start">
                    {hog && (
                        <div className="float-right @2xl:float-none max-w-xs @2xl:max-w-none @2xl:order-2 relative col-span-2 -mt-4">
                            <CloudinaryImage src={hog.src} alt={hog.alt} className={`${hog.classes}`} />
                            <span className="absolute top-[calc(100%-5rem)] @2xl:top-[calc(100%-5.5rem)] left-0 right-4 text-center text-3xl font-bold font-squeak uppercase rotate-[3.5deg] text-orange">
                                Hi, I'm {productName}!
                            </span>
                        </div>
                    )}
                    <div
                        className={`@2xl:order-1 pt-12 pl-12 ${
                            hog ? 'col-span-3 pr-12 @2xl:pr-0' : 'col-span-full pr-12'
                        }`}
                    >
                        <h1 className="text-5xl @2xl:text-4xl font-bold mb-8">
                            {productName}: {overview?.title}
                        </h1>
                        <h2 className="text-3xl @2xl:text-2xl font-normal mb-0">{overview?.description}</h2>
                    </div>
                </div>

                <div className="mt-12 @2xl:-mt-8">
                    <h3 className="text-2xl text-secondary mb-4 px-12">Skills</h3>
                    <div className="grid @2xl:grid-cols-2 gap-x-8 gap-y-2 px-12">
                        {skills.map((skill) => (
                            <div key={skill.name} className="mb-4">
                                <div className="text-xl font-medium mb-3">{skill.name}</div>
                                <div className="w-full h-2 bg-input rounded-full">
                                    <div
                                        className={`h-2 rounded-full bg-red dark:bg-yellow`}
                                        style={{ width: `${skill.percent}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
