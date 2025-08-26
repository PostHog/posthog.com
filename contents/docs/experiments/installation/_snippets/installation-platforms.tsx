import React from 'react'
import List from 'components/List'

interface InstallationPlatformsProps {
    urlFragment?: string
}

const InstallationPlatforms = ({ urlFragment = '' }: InstallationPlatformsProps) => {
    const platforms = [
        {
            label: 'Web',
            url: `/docs/experiments/installation/web${urlFragment}`,
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/js.svg',
        },
        {
            label: 'React',
            url: `/docs/experiments/installation/react${urlFragment}`,
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/react.svg',
        },
        {
            label: 'Node.js',
            url: `/docs/experiments/installation/nodejs${urlFragment}`,
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/nodejs.svg',
        },
        {
            label: 'Python',
            url: `/docs/experiments/installation/python${urlFragment}`,
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/python.svg',
        },
        {
            label: 'PHP',
            url: `/docs/experiments/installation/php${urlFragment}`,
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/php.svg',
        },
        {
            label: 'Ruby',
            url: `/docs/experiments/installation/ruby${urlFragment}`,
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/ruby.svg',
        },
        {
            label: 'Go',
            url: `/docs/experiments/installation/go${urlFragment}`,
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/go.svg',
        },
        {
            label: 'React Native',
            url: `/docs/experiments/installation/react-native${urlFragment}`,
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/react.svg',
        },
        {
            label: 'Android',
            url: `/docs/experiments/installation/android${urlFragment}`,
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/android.svg',
        },
        {
            label: 'iOS',
            url: `/docs/experiments/installation/ios${urlFragment}`,
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/ios.svg',
        },
        {
            label: 'Java',
            url: `/docs/experiments/installation/java${urlFragment}`,
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/java.svg',
        },
        {
            label: 'Rust',
            url: `/docs/experiments/installation/rust${urlFragment}`,
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/rust.svg',
        },
        {
            label: 'Elixir',
            url: `/docs/experiments/installation/elixir${urlFragment}`,
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/elixir.svg',
        },
        {
            label: '.NET',
            url: `/docs/experiments/installation/dotnet${urlFragment}`,
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/dotnet_logo_7e446176f2.svg',
        },
    ]

    return <List className="grid sm:grid-cols-2" items={platforms} />
}
export default InstallationPlatforms
