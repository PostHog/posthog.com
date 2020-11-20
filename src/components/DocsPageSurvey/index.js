import React, { useState } from 'react'
import { Col, Row, Button } from 'antd'

export const DocsPageSurvey = () => {
    const [submittedResponse, setSubmittedResponse] = useState(false)

    const submitResponse = (wasHelpful) => {
        if (window.posthog) {
            window.posthog.capture('docs_page_review', {
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
                <Row>
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
