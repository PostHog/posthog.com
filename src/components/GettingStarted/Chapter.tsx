import React from 'react'

type ChapterProps = {
    num: number
    title: string
    description: string
    headings: {
        title: string
        link: string
    }[]
    children: React.ReactNode
}

const Chapter: React.FC<ChapterProps> = ({ num, title, description, headings, children }) => {
    return (
        <div className="grid grid-cols-3 gap-x-6 pb-6 mb-6 border-b border-gray/20">
            <div className="w-full bg-gray-accent-light"></div>
            <div className="col-span-2 py-6 space-y-8">
                <div className="space-y-3">
                    <h1 className="flex items-center my-0">
                        <span className="w-8 text-black/20 text-[24px] mt-1">{num}.</span> <span>{title}</span>
                    </h1>
                    <p className="ml-8 !text-sm text-gray">{description}</p>
                </div>

                <ol className="list-decimal list-inside marker:text-black/20">
                    {headings.map((heading) => (
                        <li key={heading.link} className="px-3 py-2 hover:bg-gray-accent-light">
                            <a href={heading.link}>{heading.title}</a>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export const DeployChapter: React.FC = () => {
    return (
        <Chapter
            num={1}
            title="Deploy"
            description="Get PostHog up and running in seconds with Cloud, or deploy your own open-source Hobby instance to play around."
            headings={[
                { title: 'Get started with PostHog Cloud', link: '/docs/getting-started/deploy#posthog-cloud' },
                { title: 'Get started with Docker Compose', link: '/docs/getting-started/deploy#docker-compose' },
            ]}
        >
            <p>Deploy your app</p>
        </Chapter>
    )
}

export const InstallChapter: React.FC = () => {
    return (
        <Chapter
            num={2}
            title="Install PostHog"
            description="Add PostHog to your site with our plug-and-play snippet. Or use our custom SDKs for your favorite language."
            headings={[
                { title: 'Snippet', link: '/docs/getting-started/install?tab=snippet' },
                { title: 'SDKs', link: '/docs/getting-started/install?tab=sdks' },
                { title: 'Integrations', link: '/docs/getting-started/install?tab=integrations' },
                { title: 'API', link: '/docs/getting-started/install?tab=api' },
            ]}
        >
            <p>Install PostHog</p>
        </Chapter>
    )
}

export const SendEventsChapter: React.FC = () => {
    return (
        <Chapter
            num={3}
            title="Send events"
            description="Send events to PostHog from your app, website, or server. We'll automatically capture pageviews, clicks, and more."
            headings={[
                { title: 'Initialize PostHog', link: '/docs/getting-started/send-events#initialize-posthog' },
                { title: 'Setup autocapture', link: '/docs/getting-started/send-events#setup-autocapture' },
                { title: 'Capture custom events', link: '/docs/getting-started/send-events#capture-custom-events' },
                { title: 'Capture backend events', link: '/docs/getting-started/send-events#capture-backend-events' },
            ]}
        >
            <p>Send events</p>
        </Chapter>
    )
}
