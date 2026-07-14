import * as React from 'react'
import usePostHog from 'hooks/usePostHog'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { IconCheck } = require('@posthog/icons') as { IconCheck: React.FC<any> }
import { useRef, useState } from 'react'
import { CallToAction } from './CallToAction'
import { cn } from '../utils'

const TRACKS = [
    {
        value: 'builder_group',
        label: 'Builder group',
        description: 'Recruit local builders for 4 sessions',
        accent: 'peer-checked:border-red peer-checked:bg-red/10',
    },
    {
        value: 'builder_collective',
        label: 'Builder collective',
        description: 'Back a crew that already ships together',
        accent: 'peer-checked:border-blue peer-checked:bg-blue/10',
    },
    {
        value: 'hacker_house',
        label: 'Hacker house',
        description: 'Go full-time for a fixed sprint',
        accent: 'peer-checked:border-teal peer-checked:bg-teal/10',
    },
]

const inputClasses = 'w-full border border-light rounded px-4 py-2 bg-[#E5E7E0] text-lg text-black'

export default function CommunityIncubatorForm(): JSX.Element {
    const formRef = useRef<HTMLFormElement>(null)
    const [submitted, setSubmitted] = useState(false)
    const posthog = usePostHog()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = formRef.current
        const getValue = (name: string) =>
            (form?.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | RadioNodeList | null)?.value

        const email = getValue('email')
        if (email) {
            posthog?.capture('community_incubator_application', {
                track: getValue('track'),
                name: getValue('name'),
                email,
                city: getValue('city'),
                linkedin: getValue('linkedin'),
                github: getValue('github'),
                project_urls: getValue('project_urls'),
                motivation: getValue('motivation'),
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
                        <fieldset className="border-0 p-0 m-0">
                            <legend className="text-black font-semibold mb-2">Which track are you applying for?</legend>
                            <div className="grid @sm/reader-content-container:grid-cols-3 gap-2">
                                {TRACKS.map((track) => (
                                    <label key={track.value} className="relative cursor-pointer">
                                        <input
                                            type="radio"
                                            name="track"
                                            value={track.value}
                                            required
                                            className="peer sr-only"
                                        />
                                        <span
                                            className={cn(
                                                'flex flex-col h-full rounded border-2 border-light bg-[#E5E7E0] px-3 py-2 transition-colors hover:border-black/30',
                                                track.accent
                                            )}
                                        >
                                            <span className="font-bold text-black">{track.label}</span>
                                            <span className="text-sm text-black/60">{track.description}</span>
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                        <input name="name" type="text" placeholder="Your name" className={inputClasses} required />
                        <input name="email" type="email" placeholder="Your email" className={inputClasses} required />
                        <input
                            name="city"
                            type="text"
                            placeholder="What city are you based in?"
                            className={inputClasses}
                            required
                        />
                        <div className="grid @sm/reader-content-container:grid-cols-2 gap-4">
                            <input
                                name="linkedin"
                                type="url"
                                placeholder="LinkedIn URL"
                                className={inputClasses}
                                required
                            />
                            <input
                                name="github"
                                type="text"
                                placeholder="GitHub handle"
                                className={inputClasses}
                                required
                            />
                        </div>
                        <textarea
                            name="project_urls"
                            placeholder="URLs of things you've shipped (one per line)"
                            className={inputClasses}
                            rows={3}
                            required
                        />
                        <textarea
                            name="motivation"
                            placeholder="Why do you want to do this? Tell us about your crew, your city, and what you're building."
                            className={inputClasses}
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
