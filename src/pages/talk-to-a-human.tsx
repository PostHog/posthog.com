import ContactSales from 'components/ContactSales'
import { IconSend } from '@posthog/icons'
import React from 'react'

const formConfig = {
    type: 'lead' as const,
    formOptions: {
        className: 'pb-4 flex flex-col',
        ctaLocation: 'bottom' as const,
        showToField: true,
    },
    form: {
        fields: [
            {
                label: 'From',
                placeholder: 'Your email',
                type: 'string' as const,
                name: 'email',
                required: true,
                fieldType: 'email',
            },
            {
                label: 'Company',
                type: 'string' as const,
                name: 'company',
                required: true,
            },
            {
                label: 'Role',
                name: 'role',
                type: 'enumeration' as const,
                options: [
                    {
                        label: 'Engineering',
                        value: 'Engineering',
                    },
                    {
                        label: 'Founder',
                        value: 'Founder',
                    },
                    {
                        label: 'Leadership',
                        value: 'Leadership',
                    },
                    {
                        label: 'Marketing',
                        value: 'Marketing',
                    },
                    {
                        label: 'Product',
                        value: 'Product',
                    },
                    {
                        label: 'Sales',
                        value: 'Sales',
                    },
                    {
                        label: 'Other',
                        value: 'Other',
                    },
                ],
                required: true,
            },
            {
                label: 'Monthly active users',
                name: 'monthly_active_users',
                type: 'string' as const,
                fieldType: 'number',
                required: true,
            },
            {
                label: 'What do you want to talk about on the call?',
                name: 'talk_about',
                type: 'string' as const,
                required: true,
                fieldType: 'textarea',
            },
            {
                label: 'Where did you hear about us?',
                type: 'string' as const,
                name: 'where_did_you_hear_about_us',
                required: false,
            },
        ],
        ctaButton: {
            label: 'Send',
            size: 'md',
            type: 'primary',
            width: 'auto',
            icon: <IconSend />,
        },
        message: "Message received! We'll be in touch.",
        name: 'Contact sales',
    },
}

export default function TalkToAHuman() {
    return <ContactSales formConfig={formConfig} />
}
