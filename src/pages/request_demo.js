import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Col, Form, Input, Button } from 'antd'

const layout = {
    labelCol: { offset: 4, span: 6 },
    wrapperCol: { span: 6 },
}

const RequestDemoForm = ({ title, subtitle }) => {
    const [wasFormSubmitted, setWasFormSubmitted] = useState(false)
    const [formErrored, setFormErrored] = useState(false)

    const handleFormSubmission = (e) => {
        e.preventDefault()
        const formElement = e.target
        const inputs = formElement.getElementsByTagName('input')
        let valuesMap = {}
        for (let input of inputs) {
            if (input.id) valuesMap[input.id] = input.value
        }
        if (window.posthog) {
            window.posthog.capture('demo_requested', { ...valuesMap })
        }
        let formData = new FormData(formElement)
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString(),
        })
            .then(() => {})
            .catch(() => setFormErrored(true))
        setWasFormSubmitted(true)
    }

    return [
        <Col className="header-row" align="middle" key="startup-form-1">
            <h2 id="apply_section">{title}</h2>
            {subtitle && (
                <p className="subtitle" style={{ maxWidth: '70vw' }}>
                    {subtitle}
                </p>
            )}
        </Col>,
        <Col align="middle" key="startup-form-2">
            {!wasFormSubmitted ? (
                <Form
                    {...layout}
                    name="demo-request"
                    id="demo-request"
                    method="POST"
                    style={{ maxWidth: '80vw' }}
                    data-netlify="true"
                    onSubmit={(e) => handleFormSubmission(e)}
                >
                    <input type="hidden" name="demo-request" value="demo-request" />
                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                    >
                        <Input id="firstName" name="firstName" required />
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: 'Please input your last name!' }]}
                    >
                        <Input id="lastName" name="lastName" required />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input id="email" name="email" required type="email" />
                    </Form.Item>
                    <Form.Item
                        label="Company"
                        name="company"
                        rules={[{ required: true, message: 'Please input your company!' }]}
                    >
                        <Input id="company" name="company" required />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>
            ) : (
                <div className="centered" style={{ maxWidth: '80vw' }}>
                    {formErrored ? (
                        <p>
                            Oops, there was an error when submitting your form. Please try again or contact
                            _hey@posthog.com_ to schedule a demo.
                        </p>
                    ) : (
                        <p>Form submitted successfully. We'll get back to you soon!</p>
                    )}
                </div>
            )}
            <br />
            <br />
        </Col>,
    ]
}

const RequestDemoPage = () => {
    return (
        <Layout>
            <RequestDemoForm
                title="Request Demo"
                subtitle="Request a demo to get on a call with one of us! We will do a quick product tour to help you get an in deptch review of the product. Afterwards, we'll anwer any questions you might have and help you get started!"
            />
        </Layout>
    )
}

export default RequestDemoPage
