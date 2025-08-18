import { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import { useLocation } from '@reach/router'
import { companyMenu } from '../navs'

// Map URL segments to tab values
export const TAB_MAP: Record<string, string> = {
    about: 'about',
    roadmap: 'roadmap',
    changelog: 'changelog',
    people: 'people',
    teams: 'teams',
    careers: 'careers',
    handbook: 'handbook',
    brand: 'brand',
}

// Map tab values to navigation paths
export const PATH_MAP: Record<string, string> = {
    about: '/about',
    roadmap: '/roadmap',
    changelog: '/changelog/2025',
    people: '/people',
    teams: '/teams',
    careers: '/careers',
    handbook: '/handbook',
    brand: '/brand',
}

export function useCompanyNavigation() {
    const location = useLocation()
    const [activeTab, setActiveTab] = useState('about')

    // Extract tab name from URL path
    useEffect(() => {
        const pathSegments = location.pathname.split('/').filter(Boolean)
        const currentSection = pathSegments[0] || 'about'

        if (TAB_MAP[currentSection]) {
            setActiveTab(TAB_MAP[currentSection])
        }
    }, [location.pathname])

    const handleTabChange = (value: string) => {
        if (PATH_MAP[value]) {
            navigate(PATH_MAP[value])
        }
    }

    // Create tabs from companyMenu
    const createTabs = (renderContent: (tabValue: string, item: any) => React.ReactNode) => {
        return companyMenu.children.map((item: any) => {
            const tabValue = item.url.split('/').filter(Boolean)[0] || 'about'

            return {
                value: tabValue,
                label: item.name,
                content: renderContent(tabValue, item),
            }
        })
    }

    return {
        activeTab,
        setActiveTab,
        handleTabChange,
        createTabs,
        companyMenu,
    }
}
