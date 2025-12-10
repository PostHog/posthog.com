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
            name: 'Data sources & import (ELT)',
            url: '/customer-data-infrastructure/sources',
        },
        {
            name: 'Data modeling',
            url: '/customer-data-infrastructure/transformations',
        },
        {
            name: 'SQL data exploration - TODO',
            url: '/data-warehouse',
        },
        {
            name: 'Business intelligence (BI) - TODO',
            url: '/data-warehouse',
        },
        {
            name: 'Export & reverse ETL',
            url: '/customer-data-infrastructure/destinations',
        },
        {
            name: 'All integrations',
        },
        {
            name: 'CDP integrations library',
            url: '/cdp',
            icon: 'IconPlug',
        },
        {
            name: 'Warehouse source library',
            url: '/docs/data-warehouse/sources',
            icon: 'IconPlug',
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
