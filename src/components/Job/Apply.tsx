import { button } from 'components/CallToAction'
import React, { useRef, useState } from 'react'
import Confetti from 'react-confetti'
import { createPortal } from 'react-dom'

const allowedFileTypes = ['application/pdf']

interface IResumeComponentProps {
    title: string
    required: boolean
    path: string
    placeholder: string
}

const components = {
    string: ({ title, required, path, placeholder }: IResumeComponentProps) => (
        <input
            data-path={path}
            required={required}
            className="w-full block !bg-white box-border px-3 py-2 rounded-sm focus:shadow-xl border border-black/20 text-[17px] font-medium dark:bg-white box-border/10 dark:text-white"
            placeholder={placeholder || title}
            name={title}
        />
    ),
    email: ({ title, required, path, placeholder }: IResumeComponentProps) => (
        <input
            data-path={path}
            required={required}
            className="w-full block !bg-white box-border px-3 py-2 rounded-sm focus:shadow-xl border border-black/20 text-[17px] font-medium dark:bg-white box-border/10 dark:text-white"
            type="email"
            placeholder={placeholder || title}
            name={title}
        />
    ),
    longtext: ({ title, required, path, placeholder }: IResumeComponentProps) => (
        <textarea
            rows={5}
            data-path={path}
            required={required}
            className="w-full block !bg-white box-border px-3 py-2 rounded-sm focus:shadow-xl border border-black/20 text-[17px] font-medium dark:bg-white/10 dark:text-white"
            placeholder={placeholder || title}
            name={title}
        />
    ),
    file: ({ title, required, path, placeholder }: IResumeComponentProps) => {
        const [fileName, setFileName] = useState()
        const inputRef = useRef(null)

        const handleDrop = (e) => {
            setFileName(e.target.files.item(0).name)
        }

        return (
            <div className="relative h-24 w-full border border-gray-accent-light dark:border-gray-accent-dark border-dashed rounded-md flex justify-center items-center text-black/50 dark:text-white/50">
                <input
                    ref={inputRef}
                    onChange={handleDrop}
                    data-path={path}
                    required={required}
                    className="opacity-0 absolute w-full h-full inset-0 cursor-pointer"
                    placeholder={placeholder || title}
                    name={title}
                    type="file"
                    accept={allowedFileTypes.join(',')}
                />
                <div className="absolute">
                    {fileName ? (
                        <p className="m-0">{fileName}</p>
                    ) : (
                        <p className="flex space-x-3 items-center !m-0">
                            <button
                                onClick={() => inputRef?.current.click()}
                                type="button"
                                className={button('primary', undefined, 'cursor-pointer', 'sm')}
                            >
                                Upload file
                            </button>
                            <span className="text-sm">or drag and drop here</span>
                        </p>
                    )}
                </div>
            </div>
        )
    },
}

const Form = ({ setSubmitted, info, id }) => {
    const [error, setError] = useState(null)
    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        const data = new FormData(e.target)
        const form = new FormData()
        let error = null
        for (const [name, value] of data) {
            const el = e.target.querySelector(`[name="${name}"]`)
            const path = el.dataset.path
            if (el.type === 'file') {
                if (!allowedFileTypes.includes(value.type)) {
                    error = `Allowed file types: ${allowedFileTypes.join(', ')}`
                    break
                }
                form.append(name, value)
                form.append(path, name)
            } else {
                form.append(path, value)
            }
        }
        setError(error)
        form.append('jobPostingId', id)

        fetch('/.netlify/functions/apply', {
            method: 'POST',
            body: form,
        })
            .then((res) => res.json())
            .then(() => {
                setSubmitted(true)
            })
    }
    return (
        <div>
            <h4 className="!text-lg mb-0">(Now for the fun part...)</h4>
            <p>Just fill out this painless form and we'll get back to you within a few days. Thanks in advance!</p>
            <p className="opacity-50 text-sm">
                <span className="font-bold">Bolded fields</span> are required
            </p>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-y-3 ">
                    {info?.applicationFormDefinition?.sections?.map(({ fields }) => {
                        return fields.map(({ field, isRequired, descriptionPlain }) => {
                            const required = isRequired
                            return (
                                <div key={field?.path}>
                                    <label
                                        className={`opacity-70 mb-1 inline-block ${required ? 'font-bold' : ''}`}
                                        htmlFor={field?.title}
                                    >
                                        {field?.title}
                                    </label>
                                    {components[field?.type?.toLowerCase()] &&
                                        components[field?.type?.toLowerCase()]({
                                            title: field?.title,
                                            required,
                                            path: field?.path,
                                            placeholder: descriptionPlain,
                                        })}
                                </div>
                            )
                        })
                    })}
                </div>
                {error && <p className="font-bold text-red m-0 mt-4">{error}</p>}
                <button className={`${button()} mt-6 shadow-none`}>Submit</button>
            </form>
        </div>
    )
}

export default function Apply({ id, info }) {
    const [submitted, setSubmitted] = useState(false)

    return submitted ? (
        <>
            <div className="fixed inset-0">
                <Confetti />
            </div>
            <h3>Thanks for your interest in joining PostHog!</h3>
            <p>We will review your application as soon as possible and get back to you.</p>
        </>
    ) : (
        <Form info={info} id={id} setSubmitted={setSubmitted} />
    )
}
