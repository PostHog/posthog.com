import React from 'react'
import List from 'components/List'

const UploadSymbolSetsPlatforms = () => {
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
            label: 'React Native',
            url: '/docs/error-tracking/upload-source-maps/react-native',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/react.svg',
        },
        {
            label: 'Android',
            url: '/docs/error-tracking/upload-mappings/android',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Android_robot_bec2fb7318.svg',
        },
        {
            label: 'Flutter',
            url: '/docs/error-tracking/upload-source-maps/flutter',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Android_robot_bec2fb7318.svg',
        },
        {
            label: 'Rollup',
            url: '/docs/error-tracking/upload-source-maps/rollup',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Rollup_js_c306a2fde3.svg',
        },
        {
            label: 'Webpack',
            url: '/docs/error-tracking/upload-source-maps/webpack',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/webpack_3fc774b5a5.svg',
        },
        {
            label: 'Vite',
            url: '/docs/error-tracking/upload-source-maps/vite',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Vitejs_logo_98ffe5d5ee.svg',
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

    return <List className="grid @2xl:grid-cols-2 @3xl:grid-cols-3 mb-4" items={platforms} />
}
export default UploadSymbolSetsPlatforms
