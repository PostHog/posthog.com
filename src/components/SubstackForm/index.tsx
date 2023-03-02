import { Check2 } from 'components/Icons'
import React, { FormEvent, useState } from 'react'

export default function SubstackForm(): JSX.Element {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitting(true)
        const data = await fetch(`/api/substack`, {
            method: 'POST',
            body: JSON.stringify({
                email,
            }),
        })
            .then((res) => res.json())
            .catch((err) => {
                console.error(err)
                return err
            })

        if (data?.success) {
            setSubmitted(true)
        }

        setSubmitting(false)
    }

    return submitted ? (
        <p className="m-0 font-semibold mt-4 text-sm flex items-center space-x-2">
            <Check2 className="text-green w-5" />
            <span>Thank you for subscribing!</span>
        </p>
    ) : (
        <form onSubmit={handleSubmit} className="validate w-full mb-0 space-y-2">
            <div className="relative">
                <input
                    disabled={submitting}
                    type="email"
                    name="EMAIL"
                    className="block w-full px-2 py-2 flex-1 bg-white border-gray-accent-light rounded-sm font-semibold text-sm outline-none pr-7"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@address.com"
                    value={email}
                    required
                />
                <button disabled={submitting} className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill="#000"
                            d="M12.55 4.25a.62.62 0 0 0-.619.62v4.045a.826.826 0 0 1-.825.826H6.613l1.214-1.213a.62.62 0 0 0-.876-.877l-2.27 2.271a.62.62 0 0 0 0 .876l2.27 2.27a.62.62 0 0 0 .876-.875l-1.214-1.214h4.491a2.062 2.062 0 0 0 2.065-2.064V4.87a.62.62 0 0 0-.62-.619Z"
                            opacity=".3"
                        />
                        <g filter="url(#a)">
                            <path
                                fill="#BFBFBC"
                                fillRule="evenodd"
                                d="M3 0a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3Zm0 1a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H3Z"
                                clipRule="evenodd"
                            />
                        </g>
                        <defs>
                            <filter
                                id="a"
                                width="18"
                                height="19"
                                x="0"
                                y="0"
                                colorInterpolationFilters="sRGB"
                                filterUnits="userSpaceOnUse"
                            >
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    result="hardAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                />
                                <feOffset dy="1" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix values="0 0 0 0 0.74902 0 0 0 0 0.74902 0 0 0 0 0.737255 0 0 0 0.25 0" />
                                <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_7590_77741" />
                                <feBlend in="SourceGraphic" in2="effect1_dropShadow_7590_77741" result="shape" />
                            </filter>
                        </defs>
                    </svg>
                </button>
            </div>
        </form>
    )
}
