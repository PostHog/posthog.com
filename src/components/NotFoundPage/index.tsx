import React, { useEffect } from 'react'
import { CallToAction } from '../CallToAction'
import { Link } from 'gatsby'
import { useValues } from 'kea'

import Layout from '../Layout'
import { BasicHedgehogImage } from '../BasicHedgehogImage'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'

import './NotFoundPage.scss'

export default function NotFoundPage(): JSX.Element {
    const { posthog } = useValues(posthogAnalyticsLogic)

    useEffect(() => {
        if (posthog) {
            // Allows us to identify which pages are triggering 404s
            posthog.capture('page_404')
        }
    }, [])

    return (
        <Layout className="not-found-page-container">
            <div className="centered py-12">
                <h2>Oops, there's nothing here</h2>

                <p>
                    Think this a mistake? Email <a href="mailto:hey@posthog.com">hey@posthog.com</a> and we'll fix it!
                </p>

                <div className="bg-gray h-[1px] leading-[0px] max-w-xs mx-auto mt-6 mb-8"></div>

                <p>
                    <strong>But while you're here,</strong> we have an important question...
                </p>

                <h4>Does pineapple belong on pizza?</h4>

                <p>
                    We look forward to hearing your response on{' '}
                    <a href="//twitter.com/posthog" target="_blank" rel="noreferrer">
                        Twitter
                    </a>
                    .
                </p>

                <div className="hedgehog mb-8">
                    <BasicHedgehogImage />
                </div>

                <CallToAction type="primary" width="84" to="/">
                    Take me back to the homepage
                </CallToAction>
            </div>
        </Layout>
    )
}
