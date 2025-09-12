import React from 'react'
import List from 'components/List'

const UploadSourceMapPlatforms = () => {
    const platforms = [
        {
            label: 'Web',
            url: '/docs/error-tracking/upload-source-maps/web',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/js.svg',
        },
        {
            label: 'Next.js',
            url: '/docs/error-tracking/upload-source-maps/nextjs',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/frameworks/nextjs.svg',
        },
        {
            label: 'Node.js',
            url: '/docs/error-tracking/upload-source-maps/node',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/nodejs.svg',
        },
        {
            label: 'React',
            url: '/docs/error-tracking/upload-source-maps/react',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/react.svg',
        },
        {
            label: 'Angular',
            url: '/docs/error-tracking/upload-source-maps/angular',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/docs/integrate/frameworks/angular.svg',
        },
        {
            label: 'Nuxt',
            url: '/docs/error-tracking/upload-source-maps/nuxt',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/frameworks/nuxt.svg',
        },
        {
            label: 'CLI',
            url: '/docs/error-tracking/upload-source-maps/cli',
            icon: 'IconCode',
        },
        {
            label: 'GitHub Action',
            url: '/docs/error-tracking/upload-source-maps/github-actions',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/github_mark_903e35d471.svg',
        },
    ]

    return <List className="grid sm:grid-cols-2" items={platforms} />
}
export default UploadSourceMapPlatforms
