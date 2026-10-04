import React, { useEffect } from 'react'
import SEO from 'components/seo'
import ScrollArea from 'components/RadixUI/ScrollArea'
import SalesforceForm from 'components/SalesforceForm'
import { useWindow } from '../../context/Window'

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
    const { appWindow } = useWindow()

    // Loads the form script once, after hydration.
    useEffect(() => {
        if (!formConfig || document.getElementById('default-form-script')) return
        const script = document.createElement('script')
        script.id = 'default-form-script'
        script.src = '/scripts/default-form-script.js'
        document.body.appendChild(script)
    }, [formConfig])

    if (!formConfig) {
        return null
    }

    const initialValues = appWindow?.location?.state?.initialValues ?? undefined

    return <SalesforceForm {...formConfig} initialValues={initialValues} />
}
