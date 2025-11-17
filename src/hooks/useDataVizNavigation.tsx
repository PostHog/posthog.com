import { navigate } from 'gatsby'
import React from 'react'
import useProduct from './useProduct'
import { TreeMenu } from 'components/TreeMenu'

// Define the navigation structure with handles
// Section headers are strings without handles, product items are handles
const dataVizStructure = [
    'Data visualization', // Section header
    { name: 'Overview', url: '/trends' }, // Manual entry
    'Insights', // Section header
    'trends',
    'funnels',
    'user_paths',
    'correlation_analysis',
    'retention',
    'stickiness',
    'lifecycle',
    'Advanced', // Section header
    'sql',
    'bi',
]

// Build navigation items from structure and products
const buildNavigationItems = (structure: any[], products: any[]) => {
    return structure.map(item => {
        // Handle manual entries with name and url
        if (typeof item === 'object' && item.name) {
            return item
        }
        
        // Handle section headers (plain strings that aren't product handles)
        if (typeof item === 'string') {
            const product = products.find(p => p.handle === item)
            
            if (!product) {
                // It's a section header
                return { name: item }
            }
            
            // It's a product handle - build the nav item
            const { Icon, color, name, slug } = product
            return {
                name,
                url: `/${slug}`,
                icon: Icon ? <Icon className={`size-4 text-${color}`} /> : undefined,
            }
        }
        
        return null
    }).filter(Boolean)
}

// Component that renders the data viz navigation
export const DataVizNav = () => {
    const products = useProduct()
    
    const navigationItems = React.useMemo(() => {
        if (Array.isArray(products)) {
            return buildNavigationItems(dataVizStructure, products)
        }
        return []
    }, [products])

    return <TreeMenu items={navigationItems} />
}

// Hook for programmatic navigation
export function useDataVizNavigation() {
    const products = useProduct()
    
    const navigation = React.useMemo(() => {
        const children = Array.isArray(products) 
            ? buildNavigationItems(dataVizStructure, products)
            : []
            
        return {
            name: 'Data visualization',
            url: '/trends',
            children,
        }
    }, [products])

    return {
        navigation,
        handleNavigate: (url: string) => {
            navigate(url)
        },
    }
}