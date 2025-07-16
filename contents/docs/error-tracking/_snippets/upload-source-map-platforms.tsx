import React from 'react'
import List from 'components/List'

const InstallationPlatforms = () => {
    const platforms = [
        {
            label: 'Web',
            url: '/docs/error-tracking/installation/web#source-maps',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/js.svg',
        },
        {
            label: 'Next.js',
            url: '/docs/error-tracking/installation/nextjs#source-maps',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/frameworks/nextjs.svg',
        },
        {
            label: 'Python',
            url: '/docs/error-tracking/installation/python#source-maps',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/python.svg',
        },
        {
            label: 'Node.js',
            url: '/docs/error-tracking/installation/node#source-maps',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/nodejs.svg',
        },
        {
            label: 'React',
            url: '/docs/error-tracking/installation/react#source-maps',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/react.svg',
        },
        {
            label: 'Angular',
            url: '/docs/error-tracking/installation/angular#source-maps',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/docs/integrate/frameworks/angular.svg',
        },
        {
            label: 'Nuxt',
            url: '/docs/error-tracking/installation/nuxt#source-maps',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/frameworks/nuxt.svg',
        },
        {
            label: 'SvelteKit',
            url: '/docs/error-tracking/installation/svelte#source-maps',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/docs/integrate/frameworks/svelte.svg',
        },
        {
            label: 'Hono',
            url: '/docs/error-tracking/installation/hono#source-maps',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hono_9d80c0611c.svg',
        },
        {
            label: 'Sentry',
            url: '/docs/error-tracking/installation/sentry#source-maps',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/frameworks/sentry.svg',
        },
        {
            label: 'Manual/API',
            url: '/docs/error-tracking/installation/manual#source-maps',
            icon: 'IconCode',
        },
    ]

    return <List className="grid sm:grid-cols-2 md:grid-cols-3" items={platforms} />
}
export default InstallationPlatforms
