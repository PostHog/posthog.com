import React, { ChangeEvent, useState } from 'react'
import './ContactForm.scss'
import { isValidEmailAddress } from 'lib/utils'

interface ContactFormType {
    email: string
    firstname: string
    lastname: string
    company: string
    maus: number
    monthly_events: number
    data_warehouse_: string
    hosting_provider: string
    helm_charts: string
    which_product_are_you_interested_in_: string
    reason_for_self_host: string
}

interface FieldProps {
    name: string
    label: React.ReactNode
    children: JSX.Element
    validation?: string | false
}

const Field = ({ name, label, children, validation }: FieldProps) => {
    const [hasBlurred, setHasBlurred] = useState(false)
    const showRequiredMessage = validation !== undefined
    const showValidationError = validation && hasBlurred
    return (
        <div className="form-input-container">
            <label className="primary-label" htmlFor={name}>
                {label}
                {showRequiredMessage && <span className="required-text">Required</span>}
            </label>
            {showValidationError && (
                <label className="validation-error" htmlFor={name}>
                    {validation}
                </label>
            )}
            {React.cloneElement(children, {
                name,
                id: name,
                onBlur: () => setHasBlurred(true),
                style: showValidationError
                    ? {
                          borderColor: 'var(--danger)',
                      }
                    : undefined,
            })}
        </div>
    )
}

const defaultFormState = {
    email: '',
    firstname: '',
    lastname: '',
    company: '',
    maus: 0,
    monthly_events: 0,
    data_warehouse_: '',
    hosting_provider: '',
    helm_charts: '',
    which_product_are_you_interested_in_: '',
    reason_for_self_host: '',
} as ContactFormType

const formKeys = Object.keys(defaultFormState)

function isValidKey(key: string): key is keyof ContactFormType {
    return formKeys.includes(key)
}

export const ContactForm = ({ action }: { action?: string }): JSX.Element => {
    const [formValues, setFormValues] = useState(defaultFormState)

    // Validations data structure inspired by kea-forms
    const validations = {
        email: !formValues.email
            ? 'Please enter an email'
            : !isValidEmailAddress(formValues.email)
            ? 'Please enter a valid email'
            : (false as const),
        firstname: !formValues.firstname && 'Please enter your first name',
        lastname: !formValues.lastname && 'Please enter your last name',
        company: !formValues.company && 'Please enter your company name',
    }

    function setField<T extends keyof ContactFormType>(field: T, value: ContactFormType[T]): void {
        setFormValues((state) => ({
            ...state,
            [field]: value,
        }))
    }

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const {
            target: { value, name },
        } = event
        if (isValidKey(name)) setField(name, value)
    }

    return (
        <div className="form-wrapper max-w-xl">
            <form name="contactForm">
                <Field name="email" label="Email" validation={validations.email}>
                    <input type="email" value={formValues.email} onChange={handleChange} />
                </Field>
                <Field name="firstname" label="First name" validation={validations.firstname}>
                    <input value={formValues.firstname} onChange={handleChange} />
                </Field>
                <Field name="lastname" label="Last name" validation={validations.lastname}>
                    <input value={formValues.lastname} onChange={handleChange} />
                </Field>
                <Field name="company" label="Company" validation={validations.company}>
                    <input value={formValues.company} onChange={handleChange} />
                </Field>
                <Field name="maus" label="Roughly how many monthly active users do you have?">
                    <input type="number" value={formValues.maus} onChange={handleChange} />
                </Field>
                <Field name="monthly_events" label="Roughly how many monthly events do you want to track?">
                    <input type="number" value={formValues.monthly_events} onChange={handleChange} />
                </Field>
                <Field name="data_warehouse_" label="Do you have a data warehouse?">
                    <select value={formValues.data_warehouse_} onChange={handleChange}>
                        <option disabled value="">
                            Please select
                        </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </Field>
                <Field name="hosting_provider" label="Who is your current hosting provider?">
                    <input value={formValues.hosting_provider} onChange={handleChange} />
                </Field>
                <Field name="helm_charts" label="Do you/your team have helm chart/k8s experience?">
                    <select value={formValues.helm_charts} onChange={handleChange}>
                        <option disabled value="">
                            Please select
                        </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="No, but we can figure it out">No, but we can figure it out</option>
                    </select>
                </Field>
                <Field name="which_product_are_you_interested_in_" label="Which product are you interested in?">
                    <select value={formValues.which_product_are_you_interested_in_} onChange={handleChange}>
                        <option disabled value="">
                            Please select
                        </option>
                        <option value="PostHog Free (Ideal for start-ups)">
                            PostHog Open Source (Ideal for start-ups)
                        </option>
                        <option value="PostHog Scale (For large userbases or volumes)">
                            PostHog Scale (For large userbases or event volumes)
                        </option>
                        <option value="PostHog Enterprise (Expanded feature set for large teams)">
                            PostHog Enterprise (Expanded feature set for large teams)
                        </option>
                    </select>
                </Field>
                <Field name="reason_for_self_host" label="What is your main reason for wanting to self-host?">
                    <textarea value={formValues.reason_for_self_host} onChange={handleChange} />
                </Field>
            </form>
        </div>
    )
}
