import { IconSend } from '@posthog/icons'
import ContactSales from 'components/ContactSales'
import React from 'react'
import ScrollArea from 'components/RadixUI/ScrollArea'
import TeamMembers from './TeamMembers'
import { Accordion } from 'components/RadixUI/Accordion'

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
                label: 'What do you want to chat about?',
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
                <div className="prose prose-sm dark:prose-invert mb-4">
                    <h3 className="text-xl mb-1">Get a demo</h3>
                    <p className="text-sm">
                        Fear not, our "sales calls" are more like nerdy chats with an old friend. We're here to be
                        helpful, not to force our products on you.
                    </p>
                    <Accordion
                        items={[
                            {
                                trigger: '30-min call agenda',
                                content: (
                                    <>
                                        <ol className="my-0">
                                            <li>
                                                Intro <span className="text-muted">(10 min)</span>
                                                <ul className="pl-2 mt-0 text-[13px]">
                                                    <li>Friendly banter (but not too much)</li>
                                                    <li>Understand your needs</li>
                                                    <li>Explain our vision</li>
                                                </ul>
                                            </li>
                                            <li>
                                                Demo <span className="text-muted">(15 min)</span>
                                                <ul className="pl-2 mt-0 text-[13px]">
                                                    <li>Tailored product demo</li>
                                                    <li>Docs and resources</li>
                                                </ul>
                                            </li>
                                            <li>
                                                Wrap-up <span className="text-muted">(5 min)</span>
                                                <ul className="pl-2 mt-0 text-[13px]">
                                                    <li>Answer questions</li>
                                                    <li>
                                                        <s>Pressure tactics</s>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ol>
                                    </>
                                ),
                            },
                        ]}
                    />
                </div>

                <TeamMembers teamSlug={teamSlug} salesRep={salesRep} />

                <ContactSales formConfig={formConfig as any} />
            </div>
        </ScrollArea>
    )
}
