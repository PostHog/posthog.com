import { Form, Formik, useFormikContext } from 'formik'
import React, { createContext, InputHTMLAttributes, RefObject, useContext, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { button } from 'components/CallToAction'
import { useLocation } from '@reach/router'
import Confetti from 'react-confetti'
import usePostHog from 'hooks/usePostHog'

interface CustomFieldOption {
    label: string
    value: string | number
}

interface IProps {
    formID: string
    validationSchema?: any
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
    }
}

export interface Form {
    portalId: number
    guid: string
    name: string
    action: string
    method: string
    cssClass: string
    redirect: string
    submitText: string
    followUpId: string
    notifyRecipients: string
    leadNurturingCampaignId: string
    formFieldGroups: FormFieldGroup[]
    createdAt: number
    updatedAt: number
    performableHtml: string
    migratedFrom: string
    ignoreCurrentValues: boolean
    metaData: MetaDatum[]
    deletable: boolean
    inlineMessage: string
    tmsId: string
    captchaEnabled: boolean
    campaignGuid: string
    cloneable: boolean
    editable: boolean
    formType: string
    deletedAt: number
    themeName: string
    parentId: number
    style: string
    isPublished: boolean
    publishAt: number
    unpublishAt: number
    publishedAt: number
    customUid: string
    createMarketableContact: boolean
    editVersion: number
    thankYouMessageJson: string
    themeColor: string
    alwaysCreateNewCompany: boolean
    internalUpdatedAt: number
    businessUnitId: number
    portableKey: string
    paymentSessionTemplateIds: any[]
    selectedExternalOptions: any[]
    embedVersion: string
}

export interface FormFieldGroup {
    fields: Field[]
    default: boolean
    isSmartGroup: boolean
    richText: RichText
    isPageBreak: boolean
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
    validation: Validation
    enabled: boolean
    hidden: boolean
    defaultValue: string
    isSmartField: boolean
    unselectedLabel: string
    placeholder: string
    dependentFieldFilters: any[]
    labelHidden: boolean
    propertyObjectType: string
    metaData: MetaDatum[]
    objectTypeId: string
}

export interface MetaDatum {
    name: string
    value: string
}

export interface Validation {
    name: string
    message: string
    data: string
    useDefaultBlockList: boolean
    blockedEmailAddresses: any[]
}

export interface RichText {
    content: string
    type: string
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

function RadioGroup({
    options,
    name,
    placeholder,
    cols = 2,
}: {
    options: CustomFieldOption[]
    name: string
    placeholder: string
    cols?: 1 | 2
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
                        setFieldValue(name, options[0]?.value)
                    }
                }
            }}
            className={`${inputContainerClasses} ${error ? 'pb-8' : ''} cursor-pointer`}
        >
            <p className={`m-0 ${open ? 'text-sm opacity-100' : 'opacity-50'} transition-all`} id={`group-${name}`}>
                {placeholder}
            </p>
            <motion.div className="overflow-hidden" animate={{ height: open ? 'auto' : 0 }} initial={{ height: 0 }}>
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
                <div
                    role="radiogroup"
                    aria-labelledby={`group-${name}`}
                    className={`mt-2 grid grid-cols-${cols} gap-x-2 gap-y-2 ${
                        open ? 'opacity-100' : 'opacity-0 absolute'
                    }`}
                >
                    {options?.map((option, index) => {
                        const { value, label } = option
                        return (
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

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
    const { name, placeholder } = props
    if (!name) return null
    const [type, setType] = useState('text')
    const { errors, validateField, setFieldValue } = useFormikContext()
    const error = errors[name]
    return (
        <label className={`${inputContainerClasses} ${error ? 'pb-8' : ''}`} htmlFor={props.id}>
            <input
                onChange={(e) => setFieldValue(name, e.target.value)}
                onBlur={() => {
                    validateField(name)
                    setType('text')
                }}
                className={`bg-transparent w-full outline-none absolute left-0 px-4 ${
                    error ? 'bottom-6 placeholder-shown:bottom-8' : 'bottom-2 placeholder-shown:bottom-4'
                } peer placeholder-shown:placeholder-transparent transition-all border-0 py-0 shadow-none ring-0 focus:ring-0`}
                {...props}
                onFocus={() => setType(props.type ?? 'text')}
                type={type}
            />
            <span className="relative -top-3 peer-placeholder-shown:top-0 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:opacity-50 transition-all">
                {placeholder}
            </span>
            {error && <p className="text-red dark:text-yellow font-semibold m-0 text-sm absolute bottom-1">{error}</p>}
        </label>
    )
}

export default function HubSpotForm({
    formID,
    customFields,
    customMessage,
    validationSchema,
    onSubmit,
    buttonOptions,
    formOptions,
}: IProps) {
    const posthog = usePostHog()
    const { href } = useLocation()
    const [openOptions, setOpenOptions] = useState<string[]>([])
    const [form, setForm] = useState<{ fields: Field[]; buttonText: string; message: string; name: string }>({
        fields: [],
        buttonText: '',
        message: '',
    })
    const [submitted, setSubmitted] = useState(false)
    const [confetti, setConfetti] = useState(true)

    const handleSubmit = async (values) => {
        const distinctId = posthog?.get_distinct_id()
        posthog?.identify(distinctId, {
            email: values.email,
        })
        posthog?.capture('form submission', {
            form_name: form.name,
        })
        const submission = {
            pageUri: href,
            fields: form.fields.map(({ name, objectTypeId }) => {
                const value = values[name]
                return {
                    objectTypeId,
                    name,
                    value,
                }
            }),
        }

        const res = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/6958578/${formID}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(submission),
        }).catch((err) => {
            console.log(err)
            return err
        })
        if (res.status === 200) {
            setSubmitted(true)
            scroll.scrollToTop()
            onSubmit && onSubmit(values)
        }
    }

    useEffect(() => {
        fetch(`/api/hubspot-form?formID=${formID}`)
            .then((res) => res.json())
            .then((form: Form) => {
                const fields = form.formFieldGroups
                    .map((group) => {
                        return group.fields.filter((field) => !field?.hidden)
                    })
                    .flat()
                setForm({
                    fields,
                    buttonText: form.submitText,
                    message: form.inlineMessage,
                    name: form.name,
                })
            })
    }, [])

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
                    validateOnChange={false}
                    validationSchema={validationSchema}
                    initialValues={Object.fromEntries(form.fields.map(({ name }) => [name, '']))}
                    onSubmit={handleSubmit}
                >
                    <Form className={formOptions?.className}>
                        <div className="grid divide-y divide-border border border-border dark:divide-border-dark dark:border-dark">
                            {form.fields.map(({ name, label, type, required, options }, index) => {
                                if (customFields && customFields[name])
                                    return {
                                        radioGroup: (
                                            <RadioGroup
                                                options={customFields[name].options || options}
                                                name={name}
                                                placeholder={label}
                                                cols={customFields[name].cols}
                                            />
                                        ),
                                    }[customFields[name]?.type]

                                if (type === 'enumeration')
                                    return <RadioGroup options={options} name={name} placeholder={label} />

                                return (
                                    <Input
                                        key={`${name}-${index}`}
                                        type={type === 'string' ? 'text' : type}
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
                            {form.buttonText}
                        </button>
                    </Form>
                </Formik>
            </FormContext.Provider>
        )
    ) : null
}
