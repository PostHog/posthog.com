import { navigate } from 'gatsby'

export const customerDataInfrastructureNav = {
    name: 'PostHog data stack',
    url: '/data-stack',
    children: [
        {
            name: 'PostHog data stack',
        },
        {
            name: 'Overview',
            url: '/data-stack',
        },
        {
            name: 'Data tools',
        },
        {
            name: 'Managed DuckDB warehouse',
            url: '/data-stack/managed-warehouse',
        },
        {
            name: 'Is PostHog warehouse native?',
            url: '/warehouse-native',
        },
        {
            name: 'PostHog AI',
            url: '/data-stack/posthog-ai',
        },
        {
            name: 'Data sources & import (ELT)',
            url: '/data-stack/sources',
        },
        {
            name: 'CDP',
            url: '/cdp',
        },
        {
            name: 'Data modeling',
            url: '/data-stack/data-modeling',
        },
        {
            name: 'SQL editor',
            url: '/data-stack/sql-editor',
        },
        {
            name: 'Business intelligence (BI)',
            url: '/data-stack/business-intelligence',
        },
        {
            name: 'Reverse ETL & export',
            url: '/data-stack/reverse-etl-export',
        },
        {
            name: 'Integrations',
        },
        {
            name: 'Integration library',
            url: '/data-stack/integrations-library',
        },
    ],
}

export function useCustomerDataInfrastructureNavigation() {
    return {
        navigation: customerDataInfrastructureNav,
        handleNavigate: (url: string) => {
            navigate(url)
        },
    }
}
