import { navigate } from 'gatsby'

const tabs = [
    {
        value: '/about',
        label: 'About',
        content: null,
    },
    {
        value: '/roadmap',
        label: 'Roadmap',
        content: null,
    },
    {
        value: '/changelog/2025',
        label: 'Changelog',
        content: null,
    },
    {
        value: '/people',
        label: 'People',
        content: null,
    },
    {
        value: '/small-teams',
        label: 'Teams',
        content: null,
    },
    {
        value: '/chapters',
        label: 'Handbook',
        content: null,
    },
    {
        value: '/blog',
        label: 'Blog',
        content: null,
    },
    {
        value: '/media',
        label: 'Media',
        content: null,
    },
    {
        value: '/careers',
        label: 'Careers',
        content: null,
    },
]

const tabContainerClassName = 'flex justify-center sticky top-0 z-30'
const className = 'h-full bg-accent'

export function useCompanyNavigation({ value, content }: { value: string; content: React.ReactNode }) {
    return {
        tabs: tabs.map((tab) => ({
            ...tab,
            content: tab.value === value ? content : null,
        })),
        handleTabChange: (value: string, orderedTabs: any) => {
            navigate(value, { state: { orderedTabs } })
        },
        tabContainerClassName,
        className,
    }
}
