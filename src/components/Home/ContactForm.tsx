import { FormikErrors } from 'formik'
import React, { Dispatch, InputHTMLAttributes, SetStateAction, useRef, useState } from 'react'
import { useFormik } from 'formik'
import { button } from 'components/CallToAction'
import * as Yup from 'yup'
import { useLocation } from '@reach/router'
import Link from 'components/Link'
import { animateScroll as scroll } from 'react-scroll'
import { motion } from 'framer-motion'
import TextareaAutosize from 'react-textarea-autosize'
import Confetti from 'react-confetti'
import KeyboardShortcut from 'components/KeyboardShortcut'
import usePostHog from '../../hooks/usePostHog'

const inputContainerClasses = `text-sm`

const fields: {
    name: string
    placeHolder: string
    Component: (props: InputHTMLAttributes<HTMLInputElement> & IInputProps) => JSX.Element
    hubspotField: string
    options?: { value?: string; hubspotValue: string | number; label?: string }[]
    type?: string
}[] = [
    {
        name: 'email',
        placeHolder: 'Email',
        Component: Input,
        hubspotField: 'email',
    },
    {
        name: 'company',
        placeHolder: 'Company',
        Component: Input,
        hubspotField: 'company',
    },
    {
        name: 'role',
        placeHolder: 'Role',
        Component: RadioGroup,
        options: [
            { value: 'Engineering', hubspotValue: 'Engineering' },
            { value: 'Founder', hubspotValue: 'Founder' },
            { value: 'Leadership', hubspotValue: 'Leadership' },
            { value: 'Marketing', hubspotValue: 'Marketing' },
            { value: 'Product', hubspotValue: 'Product' },
            { value: 'Sales', hubspotValue: 'Sales' },
            { value: 'Other', hubspotValue: 'Other' },
        ],
        hubspotField: 'role',
    },
    {
        name: 'monthly_active_users',
        placeHolder: 'Monthly active users',
        Component: Input,
        hubspotField: 'monthly_active_users',
        type: 'number',
    },
    {
        name: 'talk_about',
        placeHolder: 'What do you want to talk about on the call?',
        Component: TextArea,
        hubspotField: 'talk_about',
    },
    {
        name: 'where_did_you_hear_about_us',
        placeHolder: 'Where did you hear about us?',
        Component: Input,
        hubspotField: 'where_did_you_hear_about_us',
    },
]

interface IInputProps {
    setFieldValue: (
        field: string,
        value: string | number,
        shouldValidate?: boolean | undefined
    ) => Promise<void> | Promise<FormikErrors<{ [k: string]: string }>>
    values: {
        [k: string]: string | undefined
    }
    name: string
    reference?: any
    options?: { value?: string; hubspotValue: string | number; label?: string }[]
    errors: FormikErrors<{
        [k: string]: string
    }>
    validateField: (name: string) => Promise<void> | Promise<string | undefined>
    openOptions: string[]
    setOpenOptions: Dispatch<SetStateAction<string[]>>
    placeholder?: string
}

function TextArea(props: React.RefAttributes<HTMLTextAreaElement> & IInputProps) {
    const { setFieldValue, values, reference, options, errors, validateField, openOptions, setOpenOptions, ...other } =
        props
    const error = errors[props.name]
    const [height, setHeight] = useState<string | number>('auto')
    return (
        <div>
            <div className="flex flex-col gap-1 justify-between items-start">
                <label className={`${inputContainerClasses} ${error ? '' : ''}`} htmlFor={other.name}>
                    {other.placeholder}
                </label>
                {error && <p className="text-red font-medium m-0 pb-1 text-xs">{error}</p>}
            </div>

            <TextareaAutosize
                onHeightChange={(height) => setHeight(height + 32)}
                onBlur={() => validateField(props.name)}
                className={`outline-none ${error ? '!border-red' : ''}  `}
                id={other.name}
                {...other}
            />
        </div>
    )
}

function Input(props: InputHTMLAttributes<HTMLInputElement> & IInputProps) {
    const { setFieldValue, values, reference, options, errors, validateField, openOptions, setOpenOptions, ...other } =
        props
    const error = errors[props.name]
    return (
        <div>
            <div className="flex justify-between items-center pb-1">
                <label className={`${inputContainerClasses} ${error ? '' : ''}`} htmlFor={other.name}>
                    {other.placeholder}
                </label>
                {error && <p className="text-red font-medium m-0 pb-1 text-xs">{error}</p>}
            </div>

            <input
                onBlur={() => validateField(props.name)}
                className={`outline-none ${error ? '!border-red' : ''} `}
                id={other.name}
                {...other}
            />
        </div>
    )
}

function Radio(props: InputHTMLAttributes<HTMLInputElement> & IInputProps & { label?: string }) {
    const {
        setFieldValue,
        values,
        reference,
        errors,
        validateField,
        options,
        label,
        openOptions,
        setOpenOptions,
        ...other
    } = props

    const handleChange = async (e: React.FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget
        other.name && value && (await setFieldValue(other.name, value))
    }

    const handleClick = () => {
        const nextIndex = fields.findIndex((field) => field.name === other.name) + 1
        const nextField = fields[nextIndex]
        if (nextField && typeof window !== 'undefined') {
            const nextName = nextField?.name
            const nextValue =
                nextField?.options && (nextField?.options[0]?.value || nextField?.options[0]?.hubspotValue)
            const nextID = `${nextName}${nextValue ? '-' + nextValue : ''}`
            !openOptions.includes(nextName) && setOpenOptions([...openOptions, nextName])
            const nextEl = document.getElementById(nextID)
            if (!values[nextName]) {
                setTimeout(() => {
                    nextEl?.focus()
                    setFieldValue(nextName, nextValue || '')
                }, 0)
            }
        }
    }

    return (
        <div className="flex gap-1 items-center">
            <input
                checked={values[other.name] == other.value}
                className=""
                {...other}
                type="radio"
                value={props.value}
                onChange={handleChange}
                id={`${other.name}-${other.value}`}
                ref={reference || null}
            />
            <label
                onMouseUp={handleClick}
                className="relative flex-1 cursor-pointer"
                htmlFor={`${other.name}-${other.value}`}
            >
                <span className="text-sm">{label || other.value}</span>
            </label>
        </div>
    )
}

function RadioGroup(props: InputHTMLAttributes<HTMLInputElement> & IInputProps) {
    const { options, errors, validateField, openOptions, setOpenOptions, values, setFieldValue, ...other } = props
    const error = errors[props.name]
    const open = openOptions.includes(props.name)
    const radioRef = useRef<HTMLInputElement>(null)

    return (
        <div
            onFocus={() => {
                !openOptions.includes(other.name) && setOpenOptions([...openOptions, other.name])
            }}
            onClick={() => {
                if (options && !openOptions.includes(other.name)) {
                    setOpenOptions([...openOptions, other.name])
                    if (!values[other.name]) {
                        radioRef.current?.focus()
                        setFieldValue(other.name, options[0]?.value || options[0]?.hubspotValue)
                    }
                }
            }}
            className={`${inputContainerClasses} ${error ? '' : ''} cursor-pointer`}
        >
            <fieldset id={`group-${props.name}`}>
                <legend>{props.placeholder}</legend>
                {error && <p className="text-red font-medium m-0 text-xs -mt-1 mb-1">{error}</p>}
                <div role="radiogroup" aria-labelledby={`group-${props.name}`} className="flex flex-col gap-1">
                    {options?.map((option, index) => {
                        const { value, hubspotValue, label } = option
                        return (
                            <Radio
                                reference={index === 0 ? radioRef : undefined}
                                key={value || hubspotValue}
                                {...props}
                                value={value || hubspotValue}
                                label={label || value}
                            />
                        )
                    })}
                </div>
            </fieldset>
        </div>
    )
}

const ValidationSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email address').required('Please enter a valid email address'),
    company: Yup.string().required('Please enter your company name'),
    role: Yup.string().required('Please select your role'),
    monthly_active_users: Yup.string().required('Please enter your monthly active users'),
    talk_about: Yup.string().required('Sorry for being annoying, but mind filling this out?'),
    where_did_you_hear_about_us: Yup.string().nullable(),
})

export default function ContactForm({
    initialValues = {},
    onSubmit,
    hideSubmitButton = false,
    buttonText = 'Submit',
    successMessage = "Message received. We'll be in touch!",
}: {
    initialValues?: {
        [k: string]: any
    }
    onSubmit?: () => void
    hideSubmitButton?: boolean
    buttonText?: string
    successMessage?: string
}) {
    const posthog = usePostHog()
    const { href } = useLocation()
    const [submitted, setSubmitted] = useState(false)
    const [openOptions, setOpenOptions] = useState<string[]>([])
    const [confetti, setConfetti] = useState(true)
    const { handleSubmit, values, handleChange, setFieldValue, errors, validateField, submitForm } = useFormik({
        initialValues: Object.fromEntries(fields.map((field) => [field.name, initialValues[field.name]])),
        onSubmit: async (values) => {
            const distinctId = posthog?.get_distinct_id?.()
            posthog?.identify?.(distinctId, {
                email: values.email,
            })
            posthog?.capture?.('form submission', {
                form_name: 'Contact sales',
            })

            // Format data for Salesforce lead
            const formData = {
                type: 'lead',
                email: values.email,
                company: values.company,
                role: values.role,
                monthly_active_users: values.monthly_active_users,
                talk_about: values.talk_about,
                where_did_you_hear_about_us: values.where_did_you_hear_about_us,
                source: 'website',
                page: 'Contact sales',
                pageUri: href,
            }

            try {
                // Use the Salesforce endpoint
                const res = await fetch('/api/submit-salesforce-form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })

                if (res.ok) {
                    setSubmitted(true)
                    scroll.scrollToTop()
                    onSubmit?.()
                } else {
                    console.error('Form submission failed:', await res.text())
                }
            } catch (err) {
                console.error('Form submission error:', err)
            }
        },
        validationSchema: ValidationSchema,
        validateOnChange: false,
    })

    // Expose submit function for parent components
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            window.submitContactForm = submitForm
        }

        return () => {
            if (typeof window !== 'undefined') {
                delete window.submitContactForm
            }
        }
    }, [submitForm])

    return submitted ? (
        <>
            {confetti && (
                <div className="fixed inset-0">
                    <Confetti onConfettiComplete={() => setConfetti(false)} recycle={false} numberOfPieces={1000} />
                </div>
            )}
            <div className="bg-light dark:bg-dark border border-primary px-6 py-8 rounded-md mt-4">
                <h4>
                    ✅ <strong>{successMessage}</strong>
                </h4>
                <p>
                    A member of the PostHog team will get back to you as soon as we've had a chance to review your
                    information.&nbsp;
                </p>
                <p className="mb-0">
                    If you have any questions in the meantime, <Link to="/questions">let us know</Link>!
                </p>
            </div>
        </>
    ) : (
        <form onSubmit={handleSubmit} id="contact-form">
            <div className="space-y-2">
                {fields.map(({ Component, name, placeHolder, type = 'text', options = [] }, index) => {
                    return (
                        <Component
                            autoFocus={index === 0}
                            key={name}
                            onChange={handleChange}
                            value={values[name]}
                            name={name}
                            placeholder={placeHolder}
                            setFieldValue={setFieldValue}
                            values={values}
                            type={type}
                            options={options}
                            errors={errors}
                            validateField={validateField}
                            openOptions={openOptions}
                            setOpenOptions={setOpenOptions}
                        />
                    )
                })}
            </div>
            {!hideSubmitButton && (
                <button className={button(undefined, 'full', 'mt-4', 'md')} type="submit">
                    {buttonText}
                </button>
            )}
        </form>
    )
}

// Add global typescript interface
declare global {
    interface Window {
        submitContactForm?: () => Promise<any>
    }
}
