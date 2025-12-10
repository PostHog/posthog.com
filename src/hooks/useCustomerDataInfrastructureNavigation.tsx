import { navigate } from 'gatsby'

export const customerDataInfrastructureNav = {
    name: 'Customer data infrastructure',
    url: '/customer-data-infrastructure',
    children: [
        {
            name: 'Customer data infrastructure',
        },
        {
            name: 'Overview',
            url: '/customer-data-infrastructure',
        },
        {
            name: 'Data tools',
        },
        {
            name: 'Managed DuckDB warehouse',
            url: '/customer-data-infrastructure/managed-warehouse',
        },
        {
            name: 'Data sources & import (ELT)',
            url: '/customer-data-infrastructure/sources',
        },
        {
            name: 'CDP',
            url: '/cdp',
        },
        {
            name: 'Data modeling',
            url: '/customer-data-infrastructure/data-modeling',
        },
        {
            name: 'SQL editor',
            url: '/data-warehouse',
        },
        {
            name: 'Business intelligence (BI)',
            url: '/customer-data-infrastructure/business-intelligence',
        },
        {
            name: 'Export & reverse ETL',
            url: '/customer-data-infrastructure/export-reverse-etl',
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
