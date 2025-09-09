import { Form, Formik, useFormikContext } from 'formik'
import React, { createContext, InputHTMLAttributes, RefObject, useContext, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { button } from 'components/CallToAction'
import Confetti from 'react-confetti'
import usePostHog from 'hooks/usePostHog'
import { IconCheck, IconSend } from '@posthog/icons'
import * as Yup from 'yup'
import Editor from 'components/Editor'
import { Select } from 'components/RadixUI/Select'
import OSButton from 'components/OSButton'
import ScrollArea from 'components/RadixUI/ScrollArea'
interface CustomFieldOption {
    label: string
    value: string | number
}

interface IProps {
    customMessage?: React.ReactNode
    onSubmit?: (values: any) => void
    customFields?: {
        [key: string]: {
            type: 'radioGroup'
            options?: CustomFieldOption[]
            cols?: 1 | 2
        }
    }
    buttonOptions?: {
        className?: string
        size?: 'sm' | 'md' | 'lg' | 'absurd'
        type?: 'primary' | 'secondary' | 'outline'
    }
    formOptions?: {
        className?: string
        cols?: 1 | 2
    }
    autoValidate?: boolean
    form: {
        fields: {
            label: string
            placeholder?: string
            type: 'string' | 'enumeration'
            name: string
            required?: boolean
            options?: CustomFieldOption[]
            fieldType?: string
            cols?: 1 | 2
        }[]
        buttonText?: string
        message?: string
        name: string
    }
    type: 'lead' | 'contact'
    source?: string
}

export interface Field {
    name: string
    label: string
    type: string
    fieldType: string
    description: string
    groupName: string
    displayOrder: number
    required: boolean
    selectedOptions: any[]
    options: any[]
    enabled: boolean
    hidden: boolean
    defaultValue: string
    isSmartField: boolean
    unselectedLabel: string
    placeholder: string
    dependentFieldFilters: any[]
    labelHidden: boolean
    propertyObjectType: string
    objectTypeId: string
}

const FormContext = createContext<{
    fields: Field[]
    openOptions: string[]
    setOpenOptions: React.Dispatch<React.SetStateAction<string[]>>
}>({
    fields: [],
    openOptions: [],
    setOpenOptions: () => null,
})

function Radio({
    value,
    label,
    name,
    reference,
}: {
    value: string | number
    label: string
    name: string
    reference?: RefObject<HTMLInputElement>
}) {
    const { fields, openOptions, setOpenOptions } = useContext(FormContext)
    const { setFieldValue, values } = useFormikContext<Record<string, any>>()

    const handleChange = async (e: React.FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget
        name && value && (await setFieldValue(name, value))
    }

    const handleClick = () => {
        const nextIndex = fields.findIndex((field) => field.name === name) + 1
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
        <>
            <label
                onMouseUp={handleClick}
                className="relative w-full text-center cursor-pointer"
                htmlFor={`${name}-${value}`}
            >
                {label}
            </label>
            <input
                checked={values[name] == value}
                className=""
                type="radio"
                value={value}
                onChange={handleChange}
                id={`${name}-${value}`}
                {...(reference ? { ref: reference } : {})}
            />
        </>
    )
}

function Checkbox({
    value,
    label,
    name,
    reference,
}: {
    value: string | number
    label: string
    name: string
    reference?: RefObject<HTMLInputElement>
}) {
    const { setFieldValue, values } = useFormikContext<Record<string, any>>()

    const handleChange = async (e: React.FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget
        const currentValues = Array.isArray(values[name]) ? values[name] : []
        const newValues = currentValues.includes(value)
            ? currentValues.filter((v: any) => v !== value)
            : [...currentValues, value]
        name && value && (await setFieldValue(name, newValues))
    }

    const currentValues = Array.isArray(values[name]) ? values[name] : []
    const checked = currentValues.includes(value)

    return (
        <>
            <label
                role="option"
                className="relative w-full text-center cursor-pointer"
                htmlFor={`${name}-${value}`}
                aria-selected={checked}
            >
                <span>
                    <IconCheck className={`w-4 ${checked ? '' : 'opacity-40'}`} />
                </span>
                <span>{label}</span>
            </label>
            <input
                checked={checked}
                className=""
                type="checkbox"
                value={value}
                onChange={handleChange}
                id={`${name}-${value}`}
                {...(reference ? { ref: reference } : {})}
            />
        </>
    )
}

function RadioGroup({
    options,
    name,
    placeholder,
    cols = 2,
    type,
    required,
}: {
    options: CustomFieldOption[]
    name: string
    placeholder: string
    cols?: 1 | 2
    type: string
    required?: boolean
}) {
    if (!name) return null
    const { errors, values, setFieldValue } = useFormikContext<Record<string, any>>()
    const error = (errors as any)[name]
    const formValues = values as any

    // Convert options to Select format
    const selectGroups = [
        {
            label: placeholder,
            items:
                options?.map((option) => ({
                    value: String(option.value),
                    label: option.label,
                })) || [],
        },
    ]

    const handleValueChange = (value: string) => {
        setFieldValue(name, value)
    }

    return (
        <>
            <div className={`${inputContainerClasses} ${error ? '' : ''}`}>
                <p className={`m-0`} id={`group-${name}`}>
                    <span>
                        {placeholder}
                        {required && <span className="text-red dark:text-yellow ml-0.5">*</span>}
                    </span>
                </p>
            </div>
            <div className="col-span-full @lg:col-span-10">
                <Select
                    value={String(formValues[name] || '')}
                    onValueChange={handleValueChange}
                    placeholder={`Select ${placeholder.toLowerCase()}`}
                    groups={selectGroups}
                    className="w-full"
                />
                {error && <p className="text-red dark:text-yellow font-semibold m-0 text-sm">{error}</p>}
            </div>
        </>
    )
}

const inputContainerClasses = `relative text-left text-sm col-span-full @lg:col-span-2 font-semibold flex items-center`

const Textarea = (props: InputHTMLAttributes<HTMLTextAreaElement>) => {
    const { name, placeholder, required } = props
    if (!name) return null
    const { errors, validateField, setFieldValue } = useFormikContext<Record<string, any>>()
    const error = (errors as any)[name]

    return (
        <>
            <label className={`sr-only ${inputContainerClasses}`} htmlFor={props.id}>
                <span>
                    {placeholder}
                    {required && <span className="text-red dark:text-yellow ml-0.5">*</span>}
                </span>
            </label>
            <div className="col-span-full @lg:col-span-10">
                <textarea
                    rows={8}
                    onChange={(e) => setFieldValue(name, e.target.value)}
                    onBlur={() => {
                        validateField(name)
                    }}
                    className={`outline-none text-sm rounded border bg-primary ring-0 focus:ring-0 w-full resize-none ${
                        error ? 'border-red' : 'border-primary'
                    }`}
                    {...props}
                    {...(props.type === 'number' ? { min: 0 } : {})}
                />
                {error && <p className="text-red dark:text-yellow font-semibold m-0 text-sm">{error}</p>}
            </div>
        </>
    )
}

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
    const { name, placeholder, required } = props
    if (!name) return null
    const type = props.type
    const { errors, validateField, setFieldValue } = useFormikContext<Record<string, any>>()
    const error = (errors as any)[name]
    return (
        <>
            <label className={`${inputContainerClasses} ${error ? '' : ''}`} htmlFor={props.id}>
                <span>
                    {placeholder}
                    {required && <span className="text-red dark:text-yellow ml-0.5">*</span>}
                </span>
            </label>
            <div className="col-span-full @lg:col-span-10">
                <input
                    onChange={(e) => setFieldValue(name, e.target.value)}
                    onBlur={() => {
                        validateField(name)
                    }}
                    className={`outline-none text-sm rounded border bg-primary ring-0 focus:ring-0 w-full ${
                        error ? 'border-red' : 'border-primary'
                    }`}
                    {...props}
                    {...(props.type === 'number' ? { min: 0 } : {})}
                    type={props.type === 'date' ? 'date' : type || 'text'}
                />
                {error && <p className="text-red dark:text-yellow font-semibold m-0 text-sm">{error}</p>}
            </div>
        </>
    )
}

export default function SalesforceForm({
    customFields,
    customMessage,
    onSubmit,
    buttonOptions,
    formOptions,
    form,
    type = 'lead',
    source,
}: IProps) {
    const posthog = usePostHog()
    const [openOptions, setOpenOptions] = useState<string[]>([])
    const [submitted, setSubmitted] = useState(false)
    const [confetti, setConfetti] = useState(true)

    const handleSubmit = async (values: any) => {
        const distinctId = posthog?.get_distinct_id?.()
        posthog?.setPersonProperties?.({
            email: values.email,
        })
        await fetch(`/api/contact-event`, {
            method: 'POST',
            body: JSON.stringify({ ...values, type, source, distinctId, formName: form.name }),
        })
        await fetch('https://hooks.zapier.com/hooks/catch/8898847/222z130/', {
            method: 'POST',
            body: JSON.stringify({ ...values, type, source }),
        })
        setSubmitted(true)
    }

    return form.fields.length > 0 ? (
        submitted ? (
            <>
                {confetti && (
                    <div className="fixed inset-0">
                        <Confetti onConfettiComplete={() => setConfetti(false)} recycle={false} numberOfPieces={1000} />
                    </div>
                )}
                <div className="bg-accent border border-input px-6 py-16 rounded-md flex justify-center items-center">
                    {customMessage || <div dangerouslySetInnerHTML={{ __html: form?.message || '' }} />}
                </div>
            </>
        ) : (
            <Formik
                validationSchema={Yup.object().shape(
                    Object.fromEntries(
                        form.fields.map((field) => {
                            const fieldLabel = field.placeholder || field.label
                            return [
                                field.name,
                                field.required
                                    ? field.fieldType === 'checkbox'
                                        ? Yup.array()
                                              .of(Yup.string())
                                              .min(1, `${fieldLabel} is required`)
                                              .required(`${fieldLabel} is required`)
                                        : field.fieldType === 'email'
                                        ? Yup.string()
                                              .email('Please enter a valid email address')
                                              .required(`${fieldLabel} is required`)
                                        : Yup.string().required(`${fieldLabel} is required`)
                                    : field.fieldType === 'checkbox'
                                    ? Yup.array().of(Yup.string())
                                    : field.fieldType === 'email'
                                    ? Yup.string().email('Please enter a valid email address')
                                    : Yup.string(),
                            ]
                        })
                    )
                )}
                validateOnChange={false}
                initialValues={Object.fromEntries(
                    form.fields.map(({ name, fieldType }) => [name, fieldType === 'checkbox' ? [] : ''])
                )}
                onSubmit={handleSubmit}
            >
                <Form className={formOptions?.className}>
                    <div className="px-4 pt-2 pb-1 border-b border-primary flex-[0_0_auto]">
                        <OSButton size="md" variant="primary" icon={<IconSend />} type="submit">
                            {form.buttonText ?? 'Submit'}
                        </OSButton>
                    </div>
                    <div className="flex-1">
                        <ScrollArea className="min-h-0">
                            <div className="@container p-4">
                                <div className="grid grid-cols-12 gap-2">
                                    <span className="relative text-left text-sm col-span-full @lg:col-span-2 font-semibold flex items-center">
                                        To
                                    </span>
                                    <div className="col-span-full @lg:col-span-10 text-sm">sales@posthog.com</div>
                                    {form.fields.map(
                                        (
                                            { name, label, placeholder, type, required, options, fieldType, cols },
                                            index
                                        ) => {
                                            if (customFields && customFields[name])
                                                return {
                                                    radioGroup: (
                                                        <RadioGroup
                                                            type={fieldType || 'radio'}
                                                            options={customFields[name].options || options || []}
                                                            name={name}
                                                            placeholder={label}
                                                            cols={customFields[name].cols ?? formOptions?.cols}
                                                            required={required}
                                                        />
                                                    ),
                                                }[customFields[name]?.type]

                                            if (type === 'enumeration')
                                                return (
                                                    <RadioGroup
                                                        key={`${name}-${index}`}
                                                        type={fieldType || 'radio'}
                                                        options={options || []}
                                                        name={name}
                                                        placeholder={label}
                                                        cols={cols || formOptions?.cols}
                                                        required={required}
                                                    />
                                                )

                                            if (fieldType === 'textarea') return null

                                            return (
                                                <Input
                                                    key={`${name}-${index}`}
                                                    type={fieldType}
                                                    name={name}
                                                    placeholder={placeholder || label}
                                                    required={required}
                                                />
                                            )
                                        }
                                    )}
                                </div>
                            </div>
                            <div className="px-4">
                                {form.fields.map(({ name, label, fieldType, required }, index) => {
                                    if (fieldType === 'textarea') {
                                        return (
                                            <Textarea
                                                key={`${name}-${index}`}
                                                name={name}
                                                placeholder={label}
                                                required={required}
                                            />
                                        )
                                    }
                                    return null
                                })}
                            </div>
                        </ScrollArea>
                    </div>
                </Form>
            </Formik>
        )
    ) : null
}
