import React, { useState } from 'react'
import { Col, Row, Button } from 'antd'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'
import { useValues } from 'kea'

export const DocsPageSurvey = () => {
    const [submittedResponse, setSubmittedResponse] = useState(false)
    const { posthog } = useValues(posthogAnalyticsLogic)

    const submitResponse = (wasHelpful) => {
        if (posthog) {
            posthog.capture('docs_page_review', {
                wasHelpful: wasHelpful,
            })
        }
        setSubmittedResponse(true)
    }

    return (
        <>
            <br />
            <hr />
            <Col>
                <Row justify="center">
                    <div className="centered">
                        <h4 style={{ color: '#0a0a0a' }}>Was this page helpful?</h4>
                        {submittedResponse ? (
                            <p>Thank you for your feedback!</p>
                        ) : (
                            <>
                                <Button
                                    style={{ background: '#1D4AFF', color: '#fff', border: 'none' }}
                                    onClick={() => submitResponse(true)}
                                >
                                    Yes
                                </Button>{' '}
                                <Button
                                    style={{ background: '#F54E00', color: '#fff', border: 'none' }}
                                    onClick={() => submitResponse(false)}
                                >
                                    No
                                </Button>
                            </>
                        )}
                    </div>
                </Row>
            </Col>
        </>
    )
}
