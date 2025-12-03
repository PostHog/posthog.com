import React from 'react'
import List from 'components/List'

const UploadSourceMapPlatforms = () => {
    const platforms = [
        {
            label: 'Web',
            url: '/docs/error-tracking/upload-symbols/web',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/js.svg',
        },
        {
            label: 'Next.js',
            url: '/docs/error-tracking/upload-symbols/nextjs',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/frameworks/nextjs.svg',
        },
        {
            label: 'Node.js',
            url: '/docs/error-tracking/upload-symbols/node',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/nodejs.svg',
        },
        {
            label: 'React',
            url: '/docs/error-tracking/upload-symbols/react',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/react.svg',
        },
        {
            label: 'Angular',
            url: '/docs/error-tracking/upload-symbols/angular',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/docs/integrate/frameworks/angular.svg',
        },
        {
            label: 'Nuxt',
            url: '/docs/error-tracking/upload-symbols/nuxt',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/frameworks/nuxt.svg',
        },
        {
            label: 'React Native',
            url: '/docs/error-tracking/upload-symbols/react-native',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/react.svg',
        },
        {
            label: 'Android',
            url: '/docs/error-tracking/upload-symbols/android',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Android_robot_bec2fb7318.svg',
        },
        {
            label: 'CLI',
            url: '/docs/error-tracking/upload-symbols/cli',
            icon: 'IconCode',
        },
        {
            label: 'GitHub Action',
            url: '/docs/error-tracking/upload-symbols/github-actions',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/github_mark_903e35d471.svg',
        },
    ]

    return <List className="grid sm:grid-cols-2 mb-4" items={platforms} />
}
export default UploadSourceMapPlatforms
