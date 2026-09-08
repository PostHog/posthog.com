import { navigate } from 'gatsby'

export const customerDataInfrastructureNav = {
    name: 'PostHog context warehouse',
    url: '/context-warehouse',
    children: [
        {
            name: 'PostHog context warehouse',
        },
        {
            name: 'Overview',
            url: '/context-warehouse',
        },
        {
            name: 'Start here',
            url: '/context-warehouse/use-cases',
        },
        {
            name: 'Is PostHog warehouse native?',
            url: '/context-warehouse/warehouse-native',
        },
        {
            name: 'The context gap report',
            url: '/the-context-gap-report',
        },
        {
            name: 'Data tools',
        },
        {
            name: 'Managed DuckDB warehouse',
            url: '/context-warehouse/managed-warehouse',
        },
        {
            name: 'PostHog AI',
            url: '/context-warehouse/posthog-ai',
        },
        {
            name: 'Data sources & import (ELT)',
            url: '/context-warehouse/sources',
        },
        {
            name: 'CDP',
            url: '/cdp',
        },
        {
            name: 'Data modeling',
            url: '/context-warehouse/data-modeling',
        },
        {
            name: 'SQL editor',
            url: '/context-warehouse/sql-editor',
        },
        {
            name: 'Business intelligence (BI)',
            url: '/context-warehouse/business-intelligence',
        },
        {
            name: 'Reverse ETL & export',
            url: '/context-warehouse/reverse-etl-export',
        },
        {
            name: 'Integrations',
        },
        {
            name: 'Integration library',
            url: '/context-warehouse/integrations-library',
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
