import { useActions, useValues } from 'kea'
import { signupLogic } from 'logic/signupLogic'
import React, { ChangeEvent, useState } from 'react'
import './ContactForm.scss'

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
    placeholder?: string
    children: JSX.Element
    validation?: string | false
}

const Field = ({ name, label, placeholder, children, validation }: FieldProps) => {
    const [hasBlurred, setHasBlurred] = useState(false)
    const isRequired = validation !== undefined
    const showValidationError = validation && hasBlurred
    return (
        <div className="form-input-container">
            <label className="primary-label" htmlFor={name}>
                {label}
                {isRequired && <span className="required-text">Required</span>}
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
                required: isRequired || undefined,
                placeholder: placeholder || label?.toString(),
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

export const ContactForm = (): JSX.Element => {
    const {
        contactForm: formValues,
        contactFormValidation: validations,
        contactFormResponseLoading: loading,
        contactFormResponse: response,
    } = useValues(signupLogic)
    const { setFormField, submitContactForm } = useActions(signupLogic)
    const showPostSubmitState = loading || response.status

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const {
            target: { value, name },
        } = event
        if (isValidKey(name)) setFormField(name, value)
    }

    return (
        <div className="form-wrapper max-w-xl">
            {showPostSubmitState ? (
                <div className="center">
                    {loading && (
                        <>
                            <h4 className="mt-3 mb-0 font-normal opacity-50">Sending your message...</h4>
                        </>
                    )}
                    {response.status === 'success' && (
                        <>
                            <h4 className="mt-3 mb-0 font-normal opacity-50">Thank you for reaching out!</h4>
                            <p>We'll get back to you soon.</p>
                        </>
                    )}
                    {response.status === 'error' && (
                        <>
                            <h4 className="mt-3 mb-0 font-normal opacity-50">Something went wrong</h4>
                            <p>
                                Looks like there was a problem submitting your message. That's on us! Please reach out
                                to <a href="mailto:hey@posthog.com">hey@posthog.com</a> or{' '}
                                <a href="/slack">join us on Slack</a> to get in touch.
                            </p>
                        </>
                    )}
                </div>
            ) : (
                <form
                    name="contactForm"
                    onSubmit={(e) => {
                        e.preventDefault()
                        window.scrollTo(0, 0)
                        submitContactForm()
                    }}
                >
                    <Field name="email" label="Email" validation={validations.email}>
                        <input type="email" value={formValues.email} onChange={handleChange} />
                    </Field>
                    <Field name="firstname" label="First name" validation={validations.firstname}>
                        <input value={formValues.firstname} onChange={handleChange} />
                    </Field>
                    <Field name="lastname" label="Last name">
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
                    <Field
                        name="hosting_provider"
                        label="Who is your current hosting provider?"
                        placeholder="e.g. AWS, GCP, Azure"
                    >
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
                    <Field
                        name="reason_for_self_host"
                        label="What is your main reason for wanting to self-host?"
                        placeholder="Start typing..."
                    >
                        <textarea value={formValues.reason_for_self_host} onChange={handleChange} />
                    </Field>
                    <input type="submit" className="block w-full mt-4 button button-primary mx-auto cursor-pointer" />
                </form>
            )}
        </div>
    )
}
