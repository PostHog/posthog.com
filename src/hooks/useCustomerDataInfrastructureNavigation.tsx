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
            name: 'Data integrations',
            url: '/cdp',
            icon: 'IconPlug',
        },
        {
            name: 'Data flow',
        },
        {
            name: 'Get data IN',
            url: '/customer-data-infrastructure/sources',
        },
        {
            name: 'Transform data',
            url: '/customer-data-infrastructure/transformations',
        },
        {
            name: 'SQL editor: Query & visualize data',
            url: '/data-warehouse',
        },
        {
            name: 'Send data OUT',
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
