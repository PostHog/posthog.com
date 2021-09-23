import { Button, Form, Input, Radio, Select } from 'antd'
import React from 'react'

export const ContactForm = ({ action }: { action?: string }): JSX.Element => {
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            // initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email.' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="First name"
                name="firstname"
                rules={[{ required: true, message: 'Please input your first name.' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Last name"
                name="lastname"
                rules={[{ required: true, message: 'Please input your last name.' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Company name"
                name="company"
                rules={[{ required: true, message: 'Please input your company name.' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Roughly how many monthly active users do you have?"
                name="maus"
                // rules={[{ required: true, message: 'Please input your company name.' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Roughly how many monthly events do you want to track?"
                name="monthly_events"
                // rules={[{ required: true, message: 'Please input your company name.' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Do you have a data warehouse?"
                name="data_warehouse_" // sic
            >
                <Radio.Group>
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                label="Who is your current hosting provider?"
                name="hosting_provider"
                rules={[{ required: true, message: 'Please input your hosting provider.' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Do you/your team have helm chart/k8s experience?"
                name="helm_charts" // sic
            >
                <Radio.Group>
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                label="Which product are you interested in?"
                name="which_product_are_you_interested_in_"
                rules={[
                    { required: true, message: 'Please select a product option. You can always change your mind.' },
                ]}
            >
                <Select
                    placeholder="Please select"
                    // onChange={onChange}
                >
                    <Select.Option value="PostHog Free (Ideal for start-ups)">
                        PostHog Open Source (Ideal for start-ups)
                    </Select.Option>
                    <Select.Option value="PostHog Scale (For large userbases or volumes)">
                        PostHog Scale (For large userbases or event volumes)
                    </Select.Option>
                    <Select.Option value="PostHog Enterprise (Expanded feature set for large teams)">
                        PostHog Enterprise (Expanded feature set for large teams)
                    </Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="What is your main reason for wanting to self-host?"
                name="reason_for_self_host"
                rules={[{ required: true, message: 'Please provide some brief context.' }]}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
