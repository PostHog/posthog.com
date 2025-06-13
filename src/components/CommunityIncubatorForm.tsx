import * as React from 'react'
import usePostHog from 'hooks/usePostHog'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { IconCheck } = require('@posthog/icons') as { IconCheck: React.FC<any> }
import { useRef, useState } from 'react'
import { CallToAction } from './CallToAction'

export default function CommunityIncubatorForm(): JSX.Element {
    const formRef = useRef<HTMLFormElement>(null)
    const [submitted, setSubmitted] = useState(false)
    const posthog = usePostHog()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = formRef.current
        const nameInput = form?.elements.namedItem('name') as HTMLInputElement | null
        const emailInput = form?.elements.namedItem('email') as HTMLInputElement | null
        const cityInput = form?.elements.namedItem('city') as HTMLInputElement | null
        const motivationInput = form?.elements.namedItem('motivation') as HTMLTextAreaElement | null

        if (emailInput && emailInput.value) {
            posthog?.capture('community_incubator_application', {
                name: nameInput?.value,
                email: emailInput.value,
                city: cityInput?.value,
                motivation: motivationInput?.value,
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
                        <input
                            name="city"
                            type="text"
                            placeholder="What city would you like to start a builder community in?"
                            className="w-full border border-light rounded px-4 py-2 bg-[#E5E7E0] text-lg text-black"
                            required
                        />
                        <textarea
                            name="motivation"
                            placeholder="Why do you want to start this?"
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
                            Submit application
                        </CallToAction>
                    </>
                ) : (
                    <div className="bg-green text-white p-3 rounded-full flex items-center justify-center space-x-2">
                        <IconCheck className="size-6" />
                        <span>Thanks! We got your application.</span>
                    </div>
                )}
            </div>
        </form>
    )
}
