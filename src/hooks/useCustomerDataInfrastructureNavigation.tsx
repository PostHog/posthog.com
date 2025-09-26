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
            name: 'Integrations library',
            url: '/cdp',
            icon: 'IconPlug',
        },
        {
            name: 'Data flow',
        },
        {
            name: 'Get data into PostHog',
            url: '/customer-data-infrastructure/sources',
        },
        {
            name: 'Transform data',
            url: '/customer-data-infrastructure/transformations',
        },
        {
            name: 'Query & visualize data',
            url: '/data-warehouse',
        },
        {
            name: 'Send data out of PostHog',
            url: '/customer-data-infrastructure/destinations',
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
