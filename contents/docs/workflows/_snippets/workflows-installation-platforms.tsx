import React from 'react'
import List from 'components/List'
import { getLogo } from 'constants/logos'

const PLATFORMS = [
    { label: 'Android', logo: 'android', url: '/docs/product-analytics/installation/android' },
    { label: 'API', logo: null, icon: 'IconCode', url: '/docs/product-analytics/installation/api' },
    { label: 'Elixir', logo: 'elixir', url: '/docs/product-analytics/installation/elixir' },
    { label: 'Flutter', logo: 'flutter', url: '/docs/product-analytics/installation/flutter' },
    { label: 'Go', logo: 'go', url: '/docs/product-analytics/installation/go' },
    { label: 'iOS', logo: 'ios', url: '/docs/product-analytics/installation/ios' },
    { label: 'Node.js', logo: 'nodejs', url: '/docs/product-analytics/installation/nodejs' },
    { label: 'PHP', logo: 'php', url: '/docs/product-analytics/installation/php' },
    { label: 'Python', logo: 'python', url: '/docs/product-analytics/installation/python' },
    { label: 'React', logo: 'react', url: '/docs/product-analytics/installation/react' },
    { label: 'React Native', logo: 'reactNative', url: '/docs/product-analytics/installation/react-native' },
    { label: 'Ruby', logo: 'ruby', url: '/docs/product-analytics/installation/ruby' },
    { label: 'Web', logo: 'javascript', url: '/docs/product-analytics/installation/web' },
]

const FRAMEWORKS = [
    { label: 'Angular', logo: 'angular', url: '/docs/libraries/angular' },
    { label: 'Astro', logo: 'astro', url: '/docs/libraries/astro' },
    { label: 'Django', logo: 'django', url: '/docs/libraries/django' },
    { label: 'Laravel', logo: 'laravel', url: '/docs/libraries/laravel' },
    { label: 'Next.js', logo: 'nextjs', url: '/docs/libraries/next-js' },
    { label: 'Nuxt.js', logo: 'nuxt', url: '/docs/libraries/nuxt-js' },
    { label: 'Remix', logo: 'remix', url: '/docs/libraries/remix' },
    { label: 'Svelte', logo: 'svelte', url: '/docs/libraries/svelte' },
    { label: 'Vue', logo: 'vue', url: '/docs/libraries/vue-js' },
]

const toListItems = (items: typeof PLATFORMS) =>
    items.map(({ label, logo, icon, url }) => ({
        label,
        url,
        ...(logo ? { image: getLogo(logo) } : {}),
        ...(icon ? { icon } : {}),
    }))

export const WorkflowsInstallationPlatforms = () => (
    <List className="grid gap-4 grid-cols-2 @md:grid-cols-3 not-prose" items={toListItems(PLATFORMS)} />
)

export const WorkflowsInstallationFrameworks = () => (
    <List className="grid gap-4 grid-cols-2 @md:grid-cols-3 not-prose" items={toListItems(FRAMEWORKS)} />
)
