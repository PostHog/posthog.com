import { Auth, Button, Typography } from '@supabase/ui'
import { useValues } from 'kea'
import { supabase } from 'lib/supabase'
import React, { useEffect } from 'react'
import { GetStartedModal } from '../../components/GetStartedModal'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { PosthogAnnouncement } from '../PosthogAnnouncement/PosthogAnnouncement'
import './DarkMode.scss'
import './Layout.scss'
import './SkeletonLoading.css'

const Container = (props) => {
    const { user } = Auth.useUser()
    if (user)
        return (
            <>
                <Typography.Text>Signed in: {user.email}</Typography.Text>
                <Button block onClick={() => props.supabaseClient.auth.signOut()}>
                    Sign out
                </Button>
            </>
        )
    return props.children
}

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const { posthog } = useValues(posthogAnalyticsLogic)

    useEffect(() => {
        if (window && posthog) {
            posthog.people.set({ preferred_theme: (window as any).__theme })
        }
    }, [])

    return (
        <>
            <Auth.UserContextProvider supabaseClient={supabase}>
                <Header />
                <main>{children}</main>
                <Footer />
                <PosthogAnnouncement />
                <GetStartedModal />
            </Auth.UserContextProvider>
        </>
    )
}

export default Layout
export { Layout }
