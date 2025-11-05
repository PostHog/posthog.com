import React from 'react'
import SEO from 'components/seo'
import { Script } from 'gatsby'
import ScrollArea from 'components/RadixUI/ScrollArea'
import SalesforceForm from 'components/SalesforceForm'

interface ContactSalesProps {
    location?: any
    formConfig?: {
        type: 'lead' | 'contact'
        formOptions?: {
            className?: string
            cols?: 1 | 2
            ctaLocation?: 'top' | 'bottom'
        }
        form: {
            fields: {
                label: string
                placeholder?: string
                type: 'string' | 'enumeration'
                name: string
                required?: boolean
                options?: { label: string; value: string | number }[]
                fieldType?: string
                cols?: 1 | 2
            }[]
            ctaButton: {
                label?: string
                width?: 'full' | 'auto'
                icon?: React.ReactNode | null
                size?: 'sm' | 'md' | 'lg' | 'absurd'
                type?: 'primary' | 'secondary' | 'outline'
            }
            message?: string
            name: string
        }
        customMessage?: React.ReactNode
        onSubmit?: (values: any) => void
        customFields?: {
            [key: string]: {
                type: 'radioGroup'
                options?: { label: string; value: string | number }[]
                cols?: 1 | 2
            }
        }
        autoValidate?: boolean
        source?: string
    }
    defaultFormId?: string
}

export default function ContactSales({ formConfig, defaultFormId = '509041' }: ContactSalesProps) {
    if (!formConfig) {
        return null
    }

    return (
        <>
            <Script id="default-form-script" src="/scripts/default-form-script.js" />
            <SEO
                title="Talk to a human – Book a PostHog demo"
                description="PostHog is self-serve, but our team is here if you need us. Book a demo to get setup help, discuss your technical requirements, or see features in action."
                image={`/images/og/talk-to-a-human.png`}
            />
            <ScrollArea>
                <div
                    data-scheme="primary"
                    className="bg-accent text-primary h-full"
                    data-default-form-id={defaultFormId}
                >
                    <SalesforceForm {...formConfig} />
                </div>
            </ScrollArea>
        </>
    )
}
