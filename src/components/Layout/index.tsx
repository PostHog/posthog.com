import React, { useEffect } from 'react'
import usePostHog from '../../hooks/usePostHog'
import './Fonts.css'
import './SkeletonLoading.css'
import { IProps } from './context'
import ScrollArea from 'components/RadixUI/ScrollArea'

const Layout = ({
    children,
    parent,
    activeInternalMenu,
    className = '',
    headerBlur = true,
}: IProps & { className?: string; headerBlur?: boolean }): JSX.Element => {
    const posthog = usePostHog()

    useEffect(() => {
        posthog?.register_once({
            utm_source: null,
            utm_medium: null,
            utm_campaign: null,
            utm_content: null,
            utm_term: null,
        })
    }, [])

    return (
        <ScrollArea>
            <div data-scheme="secondary" className="bg-primary text-primary rounded">
                {children}
            </div>
        </ScrollArea>
    )
}

export default Layout
export { Layout }
