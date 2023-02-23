import { FormikErrors } from 'formik'
import React, { InputHTMLAttributes, Ref, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { button } from 'components/CallToAction'
import * as Yup from 'yup'
import { useLocation } from '@reach/router'
import Link from 'components/Link'
import { animateScroll as scroll } from 'react-scroll'

const inputContainerClasses = `p-4 bg-tan group active:bg-white focus-within:bg-white relative text-left`

interface IInputProps {
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => Promise<void> | Promise<FormikErrors<{ [k: string]: string }>>
    values: {
        [k: string]: string | undefined
    }
    name: string
    reference?: Ref<HTMLInputElement>
    options?: { value: string; hubspotValue?: string }[]
    errors: FormikErrors<{
        [k: string]: string
    }>
    validateField: (name: string) => Promise<void> | Promise<string | undefined>
}

function Input(props: InputHTMLAttributes<HTMLInputElement> & IInputProps) {
    const { setFieldValue, values, reference, options, errors, validateField, ...other } = props
    const error = errors[props.name]
    return (
        <label className={`${inputContainerClasses} ${error ? 'pb-8' : ''}`} htmlFor={other.name}>
            <input
                onBlur={() => validateField(props.name)}
                {...(other.type === 'number' ? { min: 0 } : {})}
                className={`bg-transparent w-full outline-none absolute left-0 px-4 ${
                    error ? 'bottom-6 placeholder-shown:bottom-8' : 'bottom-2 placeholder-shown:bottom-4'
                } peer placeholder-shown:placeholder-transparent transition-all border-0 py-0 shadow-none ring-0 focus:ring-0`}
                id={other.name}
                {...other}
            />
            <span className="relative -top-3 peer-placeholder-shown:top-0 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:opacity-70 transition-all">
                {other.placeholder}
            </span>
            {error && <p className="text-red font-semibold m-0 text-sm absolute bottom-1">{error}</p>}
        </label>
    )
}

function Radio(props: InputHTMLAttributes<HTMLInputElement> & IInputProps) {
    const { setFieldValue, values, reference, errors, validateField, options, ...other } = props
    const handleChange = async (e: React.FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget
        other.name && value && (await setFieldValue(other.name, value))
    }

    return (
        <label className="relative w-full text-center cursor-pointer" htmlFor={`${other.name}-${other.value}`}>
            <input
                checked={values[other.name] === other.value}
                className="absolute opacity-0 peer inset-0"
                {...other}
                type="radio"
                value={props.value}
                onChange={handleChange}
                id={`${other.name}-${other.value}`}
                ref={reference}
            />
            <span className="block py-2 w-full rounded-md border-[2px] border-black/10  peer-focus:border-black/40 peer-checked:!border-black/80 text-sm">
                {other.value}
            </span>
        </label>
    )
}

function RadioGroup(props: InputHTMLAttributes<HTMLInputElement> & IInputProps) {
    const [open, setOpen] = useState(false)
    const { options, errors, validateField, ...other } = props
    const error = errors[props.name]

    useEffect(() => {
        if (!open) {
            setOpen(!!errors[props.name])
        }
    }, [errors])

    return (
        <div
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    validateField(other.name)
                }
            }}
            onFocus={() => {
                setOpen(true)
            }}
            onClick={() => {
                setOpen(true)
            }}
            className={`${inputContainerClasses} ${error ? 'pb-8' : ''}`}
        >
            <p
                className={`m-0 ${open ? 'text-xs opacity-100' : 'opacity-70'} transition-all`}
                id={`group-${props.name}`}
            >
                {props.placeholder}
            </p>
            <div
                role="radiogroup"
                aria-labelledby={`group-${props.name}`}
                className={`mt-2 grid grid-cols-2 gap-x-2 gap-y-2 ${open ? 'opacity-100' : 'opacity-0 absolute'}`}
            >
                {options?.map((option) => {
                    const { value } = option
                    return <Radio key={value} {...props} value={value} />
                })}
            </div>
            {error && <p className="text-red font-semibold m-0 text-sm absolute bottom-1">{error}</p>}
        </div>
    )
}

const ValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('Please enter your first name'),
    lastName: Yup.string(),
    workEmail: Yup.string().email().required('Please enter a valid email address'),
    companyName: Yup.string().required('Please enter your company name'),
    role: Yup.string().required('Please select your role'),
    monthlyActiveUsers: Yup.number()
        .min(0, 'Please enter a value greater than 0')
        .required('Please enter a value greater than 0'),
    monthlyEvents: Yup.number()
        .min(0, 'Please enter a value greater than 0')
        .required('Please enter a value greater than 0'),
    product: Yup.string().required("Please select the product you're interested in"),
    personalizedDemo: Yup.string().required('Please select an option'),
    details: Yup.string().nullable(),
})

const fields: {
    name: string
    placeHolder: string
    Component: (props: InputHTMLAttributes<HTMLInputElement> & IInputProps) => JSX.Element
    hubspotField: string
    options?: { value: string; hubspotValue: string }[]
    type?: string
}[] = [
    {
        name: 'firstName',
        placeHolder: 'First name',
        Component: Input,
        hubspotField: 'firstname',
    },
    {
        name: 'lastName',
        placeHolder: 'Last name',
        Component: Input,
        hubspotField: 'lastname',
    },
    {
        name: 'workEmail',
        placeHolder: 'Work email',
        Component: Input,
        hubspotField: 'email',
    },
    {
        name: 'companyName',
        placeHolder: 'Company name',
        Component: Input,
        hubspotField: 'company',
    },
    {
        name: 'role',
        placeHolder: 'Role',
        Component: RadioGroup,
        options: [
            { value: 'Product Management', hubspotValue: 'product' },
            { value: 'Engineering', hubspotValue: 'engineering' },
            { value: 'Executive', hubspotValue: 'leadership' },
            { value: 'Marketing', hubspotValue: 'marketing' },
            { value: 'Sales', hubspotValue: 'sales' },
        ],
        hubspotField: 'icp___role_list',
    },
    {
        name: 'monthlyActiveUsers',
        placeHolder: 'How many monthly active users do you have?',
        Component: Input,
        type: 'number',
        hubspotField: 'maus',
    },
    {
        name: 'monthlyEvents',
        placeHolder: 'How many events do you want to track (monthly)?',
        Component: Input,
        type: 'number',
        hubspotField: 'monthly_events',
    },
    {
        name: 'product',
        placeHolder: 'Which product are you interested in?',
        Component: RadioGroup,
        options: [
            {
                value: 'PostHog Cloud',
                hubspotValue: 'PostHog Cloud',
            },
            { value: 'PostHog Cloud Enterprise', hubspotValue: 'PostHog Cloud Enterprise' },
            { value: 'PostHog Open Source', hubspotValue: 'PostHog Free (Ideal for start-ups)' },
        ],
        hubspotField: 'which_product_are_you_interested_in_',
    },
    {
        name: 'personalizedDemo',
        placeHolder: 'Would you like a personalized demo of PostHog?',
        Component: RadioGroup,
        options: [
            { value: 'Yes', hubspotValue: 'Yes' },
            { value: 'No', hubspotValue: 'No' },
        ],
        hubspotField: 'personalizedDemo',
    },
    {
        name: 'details',
        placeHolder: 'Details',
        Component: Input,
        hubspotField: 'message',
    },
]

export default function Contact() {
    const { href } = useLocation()
    const [submitted, setSubmitted] = useState(false)
    const { handleSubmit, values, handleChange, setFieldValue, errors, validateField } = useFormik({
        initialValues: Object.fromEntries(fields.map((field) => [field.name, undefined])),
        onSubmit: async (values) => {
            const submission = {
                pageUri: href,
                pageName: 'Contact sales',
                fields: fields.map((field) => {
                    const value = values[field.name]
                    const option = field.options?.find((option) => value === option.value)?.hubspotValue
                    return {
                        objectTypeId: '0-1',
                        name: field.hubspotField,
                        value: option || value,
                    }
                }),
            }

            const res = await fetch(
                `https://api.hsforms.com/submissions/v3/integration/submit/6958578/21de475a-af2c-47c2-ae02-414aefdfdeb4`,
                {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(submission),
                }
            ).catch((err) => {
                console.log(err)
                return err
            })
            if (res.status === 200) {
                setSubmitted(true)
                scroll.scrollToTop()
            }
        },
        validationSchema: ValidationSchema,
        validateOnChange: false,
    })

    return submitted ? (
        <div className="bg-gray-accent-light p-4 rounded-md">
            <p>
                Thanks for getting in touch! A member of the PostHog team will get back to you as soon as we've had a
                chance to review your information.&nbsp;
            </p>
            <p className="mb-0">
                In the mean time, why not join <Link to="/slack">our Slack community</Link>?
            </p>
        </div>
    ) : (
        <form onSubmit={handleSubmit}>
            <div className="grid divide-y divide-dashed divide-gray-accent-light border border-gray-accent-light border-dashed">
                {fields.map(({ Component, name, placeHolder, type = 'text', options = [] }) => {
                    return (
                        <Component
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
                        />
                    )
                })}
            </div>
            <button className={button(undefined, 'full', 'mt-4', 'sm')} type="submit">
                Send message
            </button>
        </form>
    )
}
