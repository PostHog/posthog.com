import { Form, Formik, useFormikContext } from 'formik'
import React, { createContext, InputHTMLAttributes, RefObject, useContext, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { button } from 'components/CallToAction'
import Confetti from 'react-confetti'
import usePostHog from 'hooks/usePostHog'
import { IconCheck } from '@posthog/icons'
import * as Yup from 'yup'

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
    const { setFieldValue, values } = useFormikContext()

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
        <label
            onMouseUp={handleClick}
            className="relative w-full text-center cursor-pointer"
            htmlFor={`${name}-${value}`}
        >
            <input
                checked={values[name] == value}
                className="absolute opacity-0 peer inset-0"
                type="radio"
                value={value}
                onChange={handleChange}
                id={`${name}-${value}`}
                {...(reference ? { ref: reference } : {})}
            />
            <span
                className="block py-2 w-full rounded-md border-[2px] border-black/10  peer-focus:border-black/40 peer-checked:!border-black/80 dark:border-white/10  dark:peer-focus:border-white/40 dark:peer-checked:!border-white/80
            text-sm"
            >
                {label}
            </span>
        </label>
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
    const { setFieldValue, values } = useFormikContext()

    const handleChange = async (e: React.FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget
        const newValues = values[name].includes(value)
            ? values[name].filter((v) => v !== value)
            : [...values[name], value]
        name && value && (await setFieldValue(name, newValues))
    }

    const checked = values[name].includes(value)

    return (
        <label
            role="option"
            className="relative w-full text-center cursor-pointer"
            htmlFor={`${name}-${value}`}
            aria-selected={checked}
        >
            <input
                checked={checked}
                className="absolute opacity-0 peer inset-0"
                type="checkbox"
                value={value}
                onChange={handleChange}
                id={`${name}-${value}`}
                {...(reference ? { ref: reference } : {})}
            />

            <span
                className="flex space-x-2 items-center p-2 w-full rounded-md border-[2px] border-black/10  peer-focus:border-black/40 peer-checked:!border-black/80 dark:border-white/10  dark:peer-focus:border-white/40 dark:peer-checked:!border-white/80
            text-sm"
            >
                <span>
                    <IconCheck className={`w-4 ${checked ? '' : 'opacity-40'}`} />
                </span>
                <span>{label}</span>
            </span>
        </label>
    )
}

function RadioGroup({
    options,
    name,
    placeholder,
    cols = 2,
    type,
}: {
    options: CustomFieldOption[]
    name: string
    placeholder: string
    cols?: 1 | 2
    type: string
}) {
    if (!name) return null
    const { openOptions, setOpenOptions } = useContext(FormContext)
    const { errors, values, setFieldValue } = useFormikContext()
    const error = errors[name]
    const open = openOptions.includes(name)
    const ref = useRef<HTMLInputElement>(null)
    return (
        <div
            onFocus={() => {
                !openOptions.includes(name) && setOpenOptions([...openOptions, name])
            }}
            onClick={() => {
                if (options && !openOptions.includes(name)) {
                    setOpenOptions([...openOptions, name])
                    if (!values[name]) {
                        ref.current?.focus()
                    }
                }
            }}
            className={`${inputContainerClasses} ${error ? 'pb-8' : ''} cursor-pointer`}
        >
            <p className={`m-0 ${open ? 'text-sm opacity-100' : 'opacity-50'} transition-all`} id={`group-${name}`}>
                {placeholder}
            </p>
            <motion.div className="overflow-hidden" animate={{ height: open ? 'auto' : 0 }} initial={{ height: 0 }}>
                {type !== 'checkbox' && (
                    <p className="m-0 mt-1 mb-4 text-xs">
                        <strong>Tip:</strong> Use{' '}
                        <kbd
                            className="text-xs border border-b-2 border-border dark:border-dark rounded-sm px-1.5 py-0.5 text-black/40 dark:text-white/40 font-sans mr-1"
                            style={{ fontSize: '10px' }}
                        >
                            ←
                        </kbd>
                        <kbd
                            className="text-xs border border-b-2 border-border dark:border-dark rounded-sm px-1.5 py-0.5 text-black/40 dark:text-white/40 font-sans"
                            style={{ fontSize: '10px' }}
                        >
                            →
                        </kbd>{' '}
                        to advance through options
                    </p>
                )}

                <div
                    role={type === 'checkbox' ? 'listbox' : 'radiogroup'}
                    aria-labelledby={`group-${name}`}
                    className={`mt-2 grid grid-cols-${cols} gap-x-2 gap-y-2 ${
                        open ? 'opacity-100' : 'opacity-0 absolute'
                    }`}
                    {...(type === 'checkbox'
                        ? {
                              'aria-multiselectable': true,
                          }
                        : {})}
                >
                    {options?.map((option, index) => {
                        const { value, label } = option
                        return type === 'checkbox' ? (
                            <Checkbox
                                {...(index === 0 && ref ? { reference: ref } : {})}
                                key={value}
                                value={value}
                                label={label}
                                name={name}
                            />
                        ) : (
                            <Radio
                                {...(index === 0 && ref ? { reference: ref } : {})}
                                key={value}
                                value={value}
                                label={label}
                                name={name}
                            />
                        )
                    })}
                </div>
            </motion.div>
            {error && <p className="text-red dark:text-yellow font-semibold m-0 text-sm absolute bottom-1">{error}</p>}
        </div>
    )
}

const inputContainerClasses = `p-4 bg-accent dark:bg-accent-dark group active:bg-light focus-within:bg-light dark:active:bg-dark dark:focus-within:bg-dark relative text-left`

const Textarea = (props: InputHTMLAttributes<HTMLTextAreaElement>) => {
    const { name, placeholder } = props
    if (!name) return null
    const { errors, validateField, setFieldValue } = useFormikContext()
    const error = errors[name]

    return (
        <label className={`${inputContainerClasses} ${error ? 'pb-8' : ''}`} htmlFor={props.id}>
            <textarea
                rows={8}
                onChange={(e) => setFieldValue(name, e.target.value)}
                onBlur={() => {
                    validateField(name)
                }}
                className={`bg-transparent w-full outline-none left-0 p-0 pt-3 placeholder-shown:pt-0 peer placeholder-shown:placeholder-transparent transition-all border-0 py-0 shadow-none ring-0 focus:ring-0 resize-none`}
                {...props}
                {...(props.type === 'number' ? { min: 0 } : {})}
            />
            <span className="absolute left-4 top-3 w-full peer-placeholder-shown:top-4 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:opacity-50 transition-all">
                {placeholder}
            </span>
            {error && <p className="text-red dark:text-yellow font-semibold m-0 text-sm absolute bottom-1">{error}</p>}
        </label>
    )
}

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
    const { name, placeholder } = props
    if (!name) return null
    const type = props.type
    const { errors, validateField, setFieldValue } = useFormikContext()
    const error = errors[name]
    return (
        <label className={`${inputContainerClasses} ${error ? 'pb-8' : ''}`} htmlFor={props.id}>
            <input
                onChange={(e) => setFieldValue(name, e.target.value)}
                onBlur={() => {
                    validateField(name)
                }}
                className={`bg-transparent w-full outline-none absolute left-0 px-4 ${
                    error ? 'bottom-6 placeholder-shown:bottom-8' : 'bottom-2 placeholder-shown:bottom-4'
                } peer placeholder-shown:placeholder-transparent transition-all border-0 py-0 shadow-none ring-0 focus:ring-0`}
                {...props}
                {...(props.type === 'number' ? { min: 0 } : {})}
                type={props.type === 'date' ? 'date' : type}
            />
            <span className="relative -top-3 peer-placeholder-shown:top-0 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:opacity-50 transition-all">
                {placeholder}
            </span>
            {error && <p className="text-red dark:text-yellow font-semibold m-0 text-sm absolute bottom-1">{error}</p>}
        </label>
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

    const handleSubmit = async (values) => {
        const distinctId = posthog?.get_distinct_id?.()
        posthog?.identify?.(distinctId, {
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
                <div className="bg-accent dark:bg-accent-dark border border-border dark:border-dark px-6 py-8 rounded-md mt-4">
                    {customMessage || <div dangerouslySetInnerHTML={{ __html: form?.message }} />}
                </div>
            </>
        ) : (
            <FormContext.Provider value={{ fields: form.fields, openOptions, setOpenOptions }}>
                <Formik
                    validationSchema={Yup.object().shape(
                        Object.fromEntries(
                            form.fields.map((field) => [
                                field.name,
                                field.required
                                    ? field.fieldType === 'checkbox'
                                        ? Yup.array()
                                              .of(Yup.string())
                                              .min(1, `${field.label} is a required field`)
                                              .required(`${field.label} is a required field`)
                                        : Yup.string().required(`${field.label} is a required field`)
                                    : field.fieldType === 'checkbox'
                                    ? Yup.array().of(Yup.string())
                                    : Yup.string(),
                            ])
                        )
                    )}
                    validateOnChange={false}
                    initialValues={Object.fromEntries(
                        form.fields.map(({ name, fieldType }) => [name, fieldType === 'checkbox' ? [] : ''])
                    )}
                    onSubmit={handleSubmit}
                >
                    <Form className={formOptions?.className}>
                        <div className="grid divide-y divide-border border border-border dark:divide-border-dark dark:border-dark">
                            {form.fields.map(({ name, label, type, required, options, fieldType, cols }, index) => {
                                if (customFields && customFields[name])
                                    return {
                                        radioGroup: (
                                            <RadioGroup
                                                type={fieldType}
                                                options={customFields[name].options || options}
                                                name={name}
                                                placeholder={label}
                                                cols={customFields[name].cols ?? formOptions?.cols}
                                            />
                                        ),
                                    }[customFields[name]?.type]

                                if (type === 'enumeration')
                                    return (
                                        <RadioGroup
                                            type={fieldType}
                                            options={options}
                                            name={name}
                                            placeholder={label}
                                            cols={cols || formOptions?.cols}
                                        />
                                    )

                                if (fieldType === 'textarea')
                                    return (
                                        <Textarea
                                            key={`${name}-${index}`}
                                            name={name}
                                            placeholder={label}
                                            required={required}
                                        />
                                    )

                                return (
                                    <Input
                                        key={`${name}-${index}`}
                                        type={fieldType}
                                        name={name}
                                        placeholder={label}
                                        required={required}
                                    />
                                )
                            })}
                        </div>
                        <button
                            className={button(
                                buttonOptions?.type,
                                'full',
                                buttonOptions?.className ?? 'mt-4',
                                buttonOptions?.size ?? 'sm'
                            )}
                            type="submit"
                        >
                            {form.buttonText ?? 'Submit'}
                        </button>
                    </Form>
                </Formik>
            </FormContext.Provider>
        )
    ) : null
}
