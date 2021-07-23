import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import { useValues } from 'kea'

import Layout from '../Layout'
import { BasicHedgehogImage } from '../BasicHedgehogImage'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'

import './NotFoundPage.scss'

export default function NotFoundPage() {
    const { posthog } = useValues(posthogAnalyticsLogic)

    useEffect(() => {
        if (posthog) {
            // Allows us to identify which pages are triggering 404s
            posthog.capture('page_404')
        }
    }, [])

    return (
        <Layout className="not-found-page-container">
            <span className="centered">
                <h2>Oops, there's nothing here</h2>

                <p>
                    Think this a mistake? Email <a href="mailto:hey@posthog.com">hey@posthog.com</a> and we'll fix it!
                </p>

                <div className="hedgehog">
                    <BasicHedgehogImage />
                </div>

                <p className="home-link">
                    <Link to="/">Take me back to the homepage</Link>
                </p>
            </span>
        </Layout>
    )
}
