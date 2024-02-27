import { button, CallToAction, child, container, TrackedCTA } from 'components/CallToAction'
import { Check2 } from 'components/Icons/Icons'
import Link from 'components/Link'
import Modal from 'components/Modal'
import { AnimatePresence, motion } from 'framer-motion'
import { StaticImage } from 'gatsby-plugin-image'
import React, { useRef, useState } from 'react'
import Confetti from 'react-confetti'
import GitHubButton from 'react-github-btn'
import { NewsletterForm } from 'components/NewsletterForm'
import { Close } from 'components/NotProductIcons'
import usePostHog from '../../hooks/usePostHog'
import { RenderInClient } from 'components/RenderInClient'
import { IconExternal } from '@posthog/icons'
const allowedFileTypes = ['application/pdf']

interface IResumeComponentProps {
    title: string
    required: boolean
    path: string
    placeholder: string
}

const components = {
    valueselect: ({ title, required, path, options }) => (
        <select
            name={title}
            data-path={path}
            required={required}
            className="flex-grow w-full block !bg-white dark:!bg-white/10 box-border px-3 py-2 rounded-sm focus:shadow-xl border border-black/20 text-[17px] font-medium dark:bg-white box-border/10 dark:text-white"
        >
            <option disabled selected value="">
                Select an option
            </option>
            {options.map(({ label, value }) => {
                return (
                    <option key={value} value={value}>
                        {label}
                    </option>
                )
            })}
        </select>
    ),
    string: ({ title, required, path, placeholder }: IResumeComponentProps) => (
        <input
            data-path={path}
            required={required}
            className="flex-grow w-full block !bg-white dark:!bg-white/10 box-border px-3 py-2 rounded-sm focus:shadow-xl border border-black/20 text-[17px] font-medium dark:bg-white box-border/10 dark:text-white"
            placeholder={typeof placeholder === 'string' ? placeholder : title}
            name={title}
        />
    ),
    email: ({ title, required, path, placeholder }: IResumeComponentProps) => (
        <input
            data-path={path}
            required={required}
            className="flex-grow w-full block !bg-white dark:!bg-white/10 box-border px-3 py-2 rounded-sm focus:shadow-xl border border-black/20 text-[17px] font-medium dark:bg-white box-border/10 dark:text-white"
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
            className="w-full block !bg-white dark:!bg-white/10 box-border px-3 py-2 rounded-sm focus:shadow-xl border border-black/20 text-[17px] font-medium dark:bg-white/10 dark:text-white"
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
            <div className="relative h-24 w-full border border-light dark:border-dark bg-accent dark:bg-accent-dark rounded-md flex justify-center items-center text-black/50 dark:text-white/50">
                <div className="absolute">
                    {fileName ? (
                        <p className="!m-0">{fileName}</p>
                    ) : (
                        <p className="flex space-x-3 items-center !m-0">
                            <button
                                onClick={() => inputRef?.current.click()}
                                type="button"
                                className={container('primary', 'sm')}
                            >
                                <span className={child('primary', undefined, undefined, 'sm')}>Upload file</span>
                            </button>
                            <span className="text-sm">or drag and drop here</span>
                        </p>
                    )}
                </div>
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
            </div>
        )
    },
}

const Form = ({ setSubmitted, info, id }) => {
    const [error, setError] = useState(null)
    const handleSubmit = (e) => {
        e.preventDefault()
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
        fetch('/api/apply', {
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
                <div className="grid grid-cols-2 gap-3">
                    {info?.applicationFormDefinition?.sections?.map(({ fields }) => {
                        return fields.map(({ field, isRequired, descriptionPlain }) => {
                            const required = isRequired
                            const type = field?.type?.toLowerCase()

                            return (
                                <div
                                    className={
                                        type === 'string' || type === 'email' || type === 'valueselect'
                                            ? 'sm:col-span-1 col-span-2 flex flex-col'
                                            : 'col-span-2'
                                    }
                                    key={field?.path}
                                >
                                    <label
                                        className={`opacity-70 mb-1 inline-block ${required ? 'font-bold' : ''}`}
                                        htmlFor={field?.title}
                                    >
                                        {field?.title}
                                    </label>
                                    {components[type] &&
                                        components[type]({
                                            title: field?.title,
                                            required,
                                            path: field?.path,
                                            placeholder: descriptionPlain,
                                            options: field?.selectableValues,
                                        })}
                                </div>
                            )
                        })
                    })}
                </div>
                {error && <p className="font-bold text-red m-0 mt-4">{error}</p>}
                <button className={`${container()} mt-6 shadow-none !w-full box-border`}>
                    <span className={child()}>Submit</span>
                </button>
            </form>
        </div>
    )
}

const code = 'X7DABDB33723'

export default function Apply({ id, info }) {
    const posthog = usePostHog()
    const [submitted, setSubmitted] = useState(false)
    const [copyTooltip, setCopyTooltip] = useState(false)
    const [copied, setCopied] = useState(false)
    const [modalOpen, setModalOpen] = useState(true)
    const handleCopy = () => {
        navigator.clipboard.writeText(code)
        setCopyTooltip(true)
        setCopied(true)
        setTimeout(() => {
            setCopyTooltip(false)
        }, 1000)
        setTimeout(() => {
            setCopied(false)
        }, 3000)
    }

    return !submitted ? (
        <>
            <Modal open={modalOpen} setOpen={setModalOpen}>
                <div className="fixed inset-0">
                    <Confetti recycle={false} numberOfPieces={1000} />
                </div>
                <div onClick={() => setModalOpen(false)} className="flex flex-start justify-center absolute w-full p-4">
                    <div
                        className="max-w-xl bg-white dark:bg-black rounded-md relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute right-4 top-4 bg-tan rounded-full w-8 h-8 text-black flex items-center justify-center group active:scale-[.90] focus:ring-0"
                        >
                            <span className="inline-block w-4 h-4 opacity-30 group-hover:opacity-50">
                                <Close />
                            </span>
                        </button>
                        <div className="px-8 text-center">
                            <StaticImage
                                className=""
                                objectFit="contain"
                                placeholder="blurred"
                                width={296}
                                src="./images/newsletter-signup.png"
                            />
                        </div>
                        <div className="bg-blue/10 py-8 px-6 md:px-12 mb-8">
                            <div className="flex items-center space-x-2">
                                <svg
                                    width="36"
                                    height="36"
                                    viewBox="0 0 36 36"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect width="36" height="36" rx="18" fill="#1D4AFF" fillOpacity="0.2" />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M11.3827 16.8177L15.3008 20.7359L24.6072 11.4295C25.1799 10.8568 26.1144 10.8568 26.6871 11.4295L27.5705 12.3129C28.1432 12.8856 28.1432 13.8201 27.5705 14.3928L16.4268 25.5365C15.8567 26.1066 14.9302 26.1101 14.3557 25.5453L8.43956 19.7282C8.14305 19.4378 7.99569 19.0787 8.0001 18.6639C8.00451 18.2492 8.15982 17.8935 8.46163 17.6094L9.3335 16.7887C9.9124 16.2442 10.8204 16.2574 11.3826 16.8196L11.3827 16.8177Z"
                                        fill="#1D4AFF"
                                    />
                                </svg>
                                <h2 className="text-blue m-0 text-2xl">Application received!</h2>
                            </div>
                            <p className="text-base mt-2 mb-0">
                                Our mailhog has delivered your information to the hiring manager.{' '}
                                <strong>You can expect to get a response within a few days.</strong>
                            </p>
                        </div>

                        <div className="px-6 md:px-12 mb-8">
                            <StaticImage src="./images/sticker.png" width={140} className="float-right ml-4" />

                            <h3 className="m-0 text-base">Here's a laptop sticker, on us!</h3>
                            <p className="m-0 mb-3 text-sm">
                                This code is our token of appreciation for taking the time to apply.
                            </p>
                            <div className="rounded-md bg-tan dark:bg-primary  py-2 px-3 flex justify-between items-center mb-4 md:max-w-[210px] w-full">
                                <p className="font-semibold font-code m-0">{code}</p>
                                <button
                                    disabled={copied}
                                    className={`${
                                        copied ? '' : 'active:top-[0.5px] active:scale-[.90]'
                                    } relative outline-none`}
                                    onClick={handleCopy}
                                >
                                    <AnimatePresence>
                                        {copyTooltip && (
                                            <motion.div
                                                className="left-1/2"
                                                initial={{
                                                    position: 'absolute',
                                                    translateY: '-50%',
                                                    translateX: '-50%',
                                                    opacity: 0,
                                                }}
                                                animate={{ translateY: '-150%', opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                <span className="text-sm bg-primary rounded-md py-1 px-2 text-white">
                                                    Copied!
                                                </span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    {copied ? (
                                        <Check2 className="w-[18px] h-[18px] text-green" />
                                    ) : (
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M3.07961 5.84348H5.18261V2.41948C5.18261 1.83948 5.41861 1.31348 5.80061 0.932477C5.99554 0.736517 6.22723 0.580966 6.4824 0.474744C6.73758 0.368522 7.01121 0.313719 7.28761 0.313477H14.9216C15.5016 0.313477 16.0276 0.550477 16.4086 0.932477C16.6044 1.12749 16.7598 1.35922 16.8658 1.61439C16.9719 1.86956 17.0265 2.14315 17.0266 2.41948V10.0525C17.0266 10.329 16.972 10.6028 16.866 10.8581C16.7599 11.1135 16.6045 11.3453 16.4086 11.5405C16.2136 11.7363 15.9819 11.8916 15.7267 11.9977C15.4715 12.1037 15.1979 12.1584 14.9216 12.1585H12.8186V15.5825C12.8186 16.1625 12.5826 16.6885 12.2006 17.0695C12.0056 17.2653 11.7739 17.4206 11.5187 17.5267C11.2635 17.6327 10.9899 17.6874 10.7136 17.6875H3.07961C2.49961 17.6875 1.97361 17.4515 1.59261 17.0695C1.39683 16.8745 1.24146 16.6427 1.13542 16.3876C1.02937 16.1324 0.97472 15.8588 0.974609 15.5825V7.94848C0.974609 7.36848 1.21061 6.84248 1.59261 6.46148C1.78762 6.2657 2.01935 6.11033 2.27452 6.00428C2.52969 5.89823 2.80328 5.84359 3.07961 5.84348ZM6.35961 5.84348H10.7136C11.2936 5.84348 11.8196 6.07948 12.2006 6.46148C12.3964 6.65649 12.5518 6.88822 12.6578 7.14339C12.7639 7.39856 12.8185 7.67215 12.8186 7.94848V10.9815H14.9216C15.0434 10.9813 15.1639 10.9571 15.2763 10.9103C15.3887 10.8634 15.4908 10.7949 15.5766 10.7085C15.6631 10.6227 15.7319 10.5207 15.7789 10.4083C15.8259 10.2959 15.8503 10.1753 15.8506 10.0535V2.41848C15.8505 2.29646 15.8262 2.17569 15.7792 2.0631C15.7321 1.95052 15.6633 1.84835 15.5766 1.76248C15.4907 1.67614 15.3887 1.60759 15.2763 1.56074C15.1639 1.5139 15.0434 1.48968 14.9216 1.48948H7.28761C7.16583 1.48957 7.04527 1.51374 6.93286 1.56059C6.82045 1.60744 6.71841 1.67605 6.63261 1.76248C6.54616 1.84846 6.47754 1.95068 6.43069 2.06325C6.38384 2.17582 6.35968 2.29654 6.35961 2.41848V5.84248V5.84348ZM5.77361 7.01948H3.07761C2.95576 7.0197 2.83515 7.04403 2.72274 7.09105C2.61033 7.13808 2.50833 7.20687 2.42261 7.29348C2.33627 7.37934 2.26772 7.48139 2.22088 7.59379C2.17403 7.70618 2.14981 7.82671 2.14961 7.94848V15.5825C2.14961 15.8365 2.25361 16.0695 2.42261 16.2375C2.59161 16.4065 2.82361 16.5115 3.07761 16.5115H10.7116C10.8336 16.5114 10.9544 16.4871 11.067 16.4401C11.1796 16.3931 11.2818 16.3242 11.3676 16.2375C11.4539 16.1516 11.5225 16.0496 11.5693 15.9372C11.6162 15.8248 11.6404 15.7042 11.6406 15.5825V7.94848C11.6405 7.8267 11.6163 7.70616 11.5694 7.59376C11.5226 7.48135 11.454 7.37931 11.3676 7.29348C11.2817 7.20684 11.1795 7.13804 11.067 7.09101C10.9544 7.04399 10.8336 7.01968 10.7116 7.01948H5.77161H5.77361Z"
                                                fill="#F54E00"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <CallToAction
                                externalNoIcon
                                to="https://merch.posthog.com/discount/X7DABDB33723?redirect=%2Fproducts%2Fposthog-sticker"
                                size="sm"
                                className="!w-full"
                            >
                                <span>Visit merch store</span>
                                <IconExternal className="w-5 h-5 inline-block ml-1" />
                            </CallToAction>
                        </div>

                        <div className="mx-6 md:mx-12 py-6 ">
                            <h4 className="mb-0">Be our next star?</h4>
                            <aside className="float-right h-[28px] w-[125px] ml-8">
                                <GitHubButton href="https://github.com/PostHog/posthog" />
                            </aside>
                            <p className="text-sm mb-0">
                                We'd love if you starred our repo on GitHub (if you haven't already)!
                            </p>
                        </div>

                        <div className="mx-6 md:mx-12 py-6 ">
                            <h4 className="mb-0">Join our mailing list</h4>
                            <p className="text-sm mb-0">The best of PostHog. Delivered twice a month.</p>
                            <NewsletterForm subcompact className="px-0" />
                        </div>

                        <div className="mx-6 md:mx-12 py-6 ">
                            <h4 className="mb-0">Install PostHog on a side project</h4>
                            <p className="text-sm">
                                Feel free to give PostHog a whirl - we’d love to hear your feedback!
                            </p>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h5 className="text-base mb-0">Try PostHog Cloud</h5>
                                    <p className="text-sm opacity-60 mb-2">Easiest, fastest, cheapest</p>
                                    <RenderInClient
                                        placeholder={
                                            <TrackedCTA
                                                className="mt-auto"
                                                to={`https://app.posthog.com/signup`}
                                                size="sm"
                                                event={{ name: `clicked Continue`, type: 'cloud' }}
                                            >
                                                Get started - free
                                            </TrackedCTA>
                                        }
                                        render={() => (
                                            <TrackedCTA
                                                className="mt-auto"
                                                to={`https://${
                                                    posthog?.isFeatureEnabled &&
                                                    posthog?.isFeatureEnabled('direct-to-eu-cloud')
                                                        ? 'eu'
                                                        : 'app'
                                                }.posthog.com/signup`}
                                                size="sm"
                                                event={{ name: `clicked Continue`, type: 'cloud' }}
                                            >
                                                Get started - free
                                            </TrackedCTA>
                                        )}
                                    />
                                </div>
                                <div>
                                    <h5 className="text-base mb-0">Self-hosted</h5>
                                    <p className="text-sm opacity-60 mb-2">Install on your private cloud</p>
                                    <TrackedCTA
                                        to="/docs/self-host"
                                        className="mt-auto"
                                        size="sm"
                                        event={{ name: `clicked Continue`, type: 'self-hosted' }}
                                    >
                                        Get started - free
                                    </TrackedCTA>
                                </div>
                            </div>
                        </div>

                        <div className="mx-6 md:mx-12 pt-2 pb-6  text-center">
                            <Link to="/" className="font-bold text-red hover:bg-tan/50 w-full block px-4 py-2 rounded">
                                Go back to PostHog.com
                            </Link>
                        </div>
                    </div>
                </div>
            </Modal>
            <h3>Thanks for your interest in joining PostHog!</h3>
            <p>We will review your application as soon as possible and get back to you.</p>
        </>
    ) : (
        <Form info={info} id={id} setSubmitted={setSubmitted} />
    )
}
