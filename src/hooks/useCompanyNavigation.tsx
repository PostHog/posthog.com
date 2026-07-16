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
        value: '/wip',
        label: 'WIP',
        content: null,
    },
    {
        value: '/changelog',
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
const className = 'h-full bg-accent p-2'

export function useCompanyNavigation({ value, content }: { value: string; content: React.ReactNode }): {
    tabs: { value: string; label: string; content: React.ReactNode }[]
    handleTabChange: (value: string, orderedTabs: unknown) => void
    tabContainerClassName: string
    className: string
} {
    return {
        tabs: tabs.map((tab) => ({
            ...tab,
            content: tab.value === value ? content : null,
        })),
        handleTabChange: (value: string, orderedTabs: unknown) => {
            navigate(value, { state: { orderedTabs } })
        },
        tabContainerClassName,
        className,
    }
}
