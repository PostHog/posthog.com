import React from 'react'
import SEO from 'components/seo'
import { Script } from 'gatsby'
import ScrollArea from 'components/RadixUI/ScrollArea'
import SalesforceForm from 'components/SalesforceForm'

interface ContactSalesProps {
    formConfig?: {
        type: 'lead' | 'contact'
        formOptions?: {
            className?: string
            cols?: 1 | 2
            ctaLocation?: 'top' | 'bottom'
            showToField?: boolean | undefined
            rowPadding?: string
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
}

export default function ContactSales({ formConfig }: ContactSalesProps) {
    if (!formConfig) {
        return null
    }

    return (
        <>
            <Script id="default-form-script" src="/scripts/default-form-script.js" />
            <SalesforceForm {...formConfig} />
        </>
    )
}
