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
        value: '/teams',
        label: 'Teams',
        content: null,
    },
    {
        value: '/careers',
        label: 'Careers',
        content: null,
    },
    {
        value: '/chapters',
        label: 'Handbook',
        content: null,
    },
    {
        value: '/brand',
        label: 'Brand',
        content: null,
    },
]

const tabContainerClassName = 'flex justify-center bg-accent sticky top-0 z-30 border-b border-primary'
const className =
    '-mx-4 -mt-4 [&_div[role=tablist]]:pt-0.5 [&_div[role=tablist]]:w-full [&_div[role=tablist]]:pl-1.5 [&_div[role=tablist]]:flex [&_div[role=tablist]]:justify-center'

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
