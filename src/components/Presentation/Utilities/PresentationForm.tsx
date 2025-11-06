import { IconSend } from '@posthog/icons'
import ContactSales from 'components/ContactSales'
import React from 'react'
import ScrollArea from 'components/RadixUI/ScrollArea'
import TeamMembers from './TeamMembers'

interface SalesRep {
    name: string
    title: string
    email: string
    photo: string
    color: string
}

interface PresentationFormProps {
    teamSlug?: string
    salesRep?: SalesRep | null
}

const formConfig = {
    type: 'lead' as const,
    formOptions: {
        className: 'flex flex-col',
        ctaLocation: 'bottom' as const,
        showToField: false,
        rowPadding: '',
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
            label: 'Send message',
            size: 'md',
            type: 'primary',
            width: 'full',
        },
        message: "Message received! We'll be in touch.",
        name: 'Contact sales',
    },
}

export default function PresentationForm({ teamSlug, salesRep }: PresentationFormProps) {
    return (
        <ScrollArea viewportClasses="[&>div]:h-full">
            <div data-scheme="primary" className="bg-accent text-primary h-full p-4" data-default-form-id="509041">
                <div className="mb-4">
                    <h3 className="text-xl mb-1">Get a demo</h3>
                    <p className="text-sm">We'll get in touch if you'd like to chat.</p>
                </div>

                <TeamMembers teamSlug={teamSlug} salesRep={salesRep} />

                <ContactSales formConfig={formConfig as any} />
            </div>
        </ScrollArea>
    )
}
