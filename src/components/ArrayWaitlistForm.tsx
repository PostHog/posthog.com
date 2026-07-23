import * as React from 'react'
import usePostHog from 'hooks/usePostHog'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { IconCheck } = require('@posthog/icons') as { IconCheck: React.FC<any> }
import { useRef, useState } from 'react'
import { CallToAction } from './CallToAction'

export default function ArrayWaitlistForm(): JSX.Element {
    const formRef = useRef<HTMLFormElement>(null)
    const [submitted, setSubmitted] = useState(false)
    const posthog = usePostHog()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = formRef.current
        const nameInput = form?.elements.namedItem('name') as HTMLInputElement | null
        const emailInput = form?.elements.namedItem('email') as HTMLInputElement | null
        const contributionsInput = form?.elements.namedItem('contributions') as HTMLTextAreaElement | null

        if (emailInput && emailInput.value) {
            posthog?.capture('the_array_waitlist_signup', {
                name: nameInput?.value,
                email: emailInput.value,
                contributions: contributionsInput?.value,
            })
            form?.reset()
            setSubmitted(true)
        }
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            <div className="bg-white shadow-2xl rounded-md p-6 space-y-4 transition-all max-w-[700px] mx-auto">
                {!submitted ? (
                    <>
                        <input
                            name="name"
                            type="text"
                            placeholder="Your name"
                            className="w-full border border-light rounded px-4 py-2 bg-[#E5E7E0] text-lg text-black"
                            required
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Your email"
                            className="w-full border border-light rounded px-4 py-2 bg-[#E5E7E0] text-lg text-black"
                            required
                        />
                        <textarea
                            name="contributions"
                            placeholder="What have you built, answered, or created for PostHog? Links welcome."
                            className="w-full border border-light rounded px-4 py-2 bg-[#E5E7E0] text-lg text-black"
                            rows={4}
                            required
                        />
                        <CallToAction
                            type="primary"
                            size="lg"
                            className="w-full"
                            to="#"
                            onClick={() => {
                                formRef.current?.requestSubmit()
                            }}
                        >
                            Join the waitlist
                        </CallToAction>
                    </>
                ) : (
                    <div className="bg-green text-white p-3 rounded-full flex items-center justify-center space-x-2">
                        <IconCheck className="size-6" />
                        <span>You're on the list! We'll be in touch when the next cohort opens.</span>
                    </div>
                )}
            </div>
        </form>
    )
}
