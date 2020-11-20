import React, { useState } from 'react'
import { Col, Row, Button } from 'antd'

export const DocsPageSurvey = () => {
    const [submittedResponse, setSubmittedResponse] = useState(false)

    const submitResponse = (wasHelpful: boolean) => {
        const surveyForm = document.getElementById('helpful-page-survey')
        let formData = new FormData(surveyForm as HTMLFormElement)
        formData.set('wasPageHelpful', String(wasHelpful))
        formData.set('page-url', window.location.pathname)
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData as any).toString(),
        })
            .then(() => setSubmittedResponse(true))
            .catch(() => setSubmittedResponse(true))
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
            <form
                id="helpful-page-survey"
                name="helpful-page-survey"
                style={{ display: 'none' }}
                method="POST"
                data-netlify="true"
            >
                <input type="text" name="page-url" value="/docs" />
                <input type="text" name="was-page-helpful" value="false" />
            </form>
        </>
    )
}
