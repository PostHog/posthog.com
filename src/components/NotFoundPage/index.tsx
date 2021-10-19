import React, { useEffect, useState } from 'react'
import { CallToAction } from '../CallToAction'
import { useValues } from 'kea'

import Layout from '../Layout'
import { BasicHedgehogImage } from '../BasicHedgehogImage'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'

import './NotFoundPage.scss'
import { Button, Col, Row } from 'antd'

export default function NotFoundPage(): JSX.Element {
    const { posthog } = useValues(posthogAnalyticsLogic)
    const [submittedPreference, setSubmittedPreference] = useState(false)

    useEffect(() => {
        if (posthog) {
            // Allows us to identify which pages are triggering 404s
            posthog.capture('page_404')
        }
    }, [])

    const capturePineapplePreference = (userLikesPineappleOnPizzaAkaTheyreWrong = false) => {
        setSubmittedPreference(true)
        if (posthog) {
            posthog.capture('pineapple_on_pizza_survey', {
                does_pineapple_go_on_pizza: userLikesPineappleOnPizzaAkaTheyreWrong,
            })
        }
    }

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

                {submittedPreference ? (
                    <p>Thanks for letting us know!</p>
                ) : (
                    <Row gutter={[12, 4]}>
                        <Col span={12}>
                            <Button style={{ float: 'right' }} onClick={() => capturePineapplePreference(true)}>
                                Yes
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button style={{ float: 'left' }} onClick={() => capturePineapplePreference(false)}>
                                No
                            </Button>
                        </Col>
                    </Row>
                )}

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
