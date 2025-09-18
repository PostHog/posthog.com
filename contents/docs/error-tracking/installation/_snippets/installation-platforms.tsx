import React from 'react'
import List from 'components/List'

interface InstallationPlatformsProps {
    columns?: 2 | 3 | 4
}

const InstallationPlatforms = ({ columns = 2 }: InstallationPlatformsProps) => {
    const platforms = [
        {
            label: 'Web',
            url: '/docs/error-tracking/installation/web',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/js.svg',
        },
        {
            label: 'Next.js',
            url: '/docs/error-tracking/installation/nextjs',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/frameworks/nextjs.svg',
        },
        {
            label: 'Python',
            url: '/docs/error-tracking/installation/python',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/python.svg',
        },
        {
            label: 'Node.js',
            url: '/docs/error-tracking/installation/node',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/nodejs.svg',
        },
        {
            label: 'React',
            url: '/docs/error-tracking/installation/react',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/react.svg',
        },
        {
            label: 'Angular',
            url: '/docs/error-tracking/installation/angular',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/docs/integrate/frameworks/angular.svg',
        },
        {
            label: 'Nuxt',
            url: '/docs/error-tracking/installation/nuxt',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/frameworks/nuxt.svg',
        },
        {
            label: 'SvelteKit',
            url: '/docs/error-tracking/installation/svelte',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/docs/integrate/frameworks/svelte.svg',
        },
        {
            label: 'Hono',
            url: '/docs/error-tracking/installation/hono',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hono_9d80c0611c.svg',
        },
        {
            label: 'Manual/API',
            url: '/docs/error-tracking/installation/manual',
            icon: 'IconCode',
        },
    ]

    return <List className={`grid gap-4 grid-cols-2 @md:grid-cols-${columns} not-prose`} items={platforms} />
}
export default InstallationPlatforms
