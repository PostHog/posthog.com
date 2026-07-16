import React, { useRef, useState } from 'react'
import usePostHog from 'hooks/usePostHog'
import { IconCheck } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { Select } from 'components/RadixUI/Select'
import { CommunityType, communityTypeLabels } from '../../data/builderCommunities'

const inputClasses =
    'w-full border border-primary rounded px-2 py-1.5 bg-primary text-primary text-sm placeholder:text-muted'

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <label className="block">
        <span className="block text-[13px] text-secondary mb-1">{label}</span>
        {children}
    </label>
)

export default function BuilderCommunityForm(): JSX.Element {
    const formRef = useRef<HTMLFormElement>(null)
    const [submitted, setSubmitted] = useState(false)
    const [type, setType] = useState<CommunityType>('builder-group')
    const posthog = usePostHog()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = formRef.current
        if (!form) return
        const getValue = (name: string) =>
            (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null)?.value

        if (getValue('email')) {
            posthog?.capture('builder_community_submission', {
                communityName: getValue('communityName'),
                location: getValue('location'),
                website: getValue('website'),
                type,
                organizers: getValue('organizers'),
                nextSessionLink: getValue('nextSessionLink'),
                submitterName: getValue('submitterName'),
                email: getValue('email'),
                notes: getValue('notes'),
            })
            form.reset()
            setSubmitted(true)
        }
    }

    if (submitted) {
        return (
            <div className="flex items-center justify-center gap-2 border border-primary rounded p-4 text-primary">
                <IconCheck className="size-6 text-green" />
                <span>Thanks! We'll review your submission and add the community to the list.</span>
            </div>
        )
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
            <p className="text-sm text-secondary mb-2">
                Know a builder group, hacker house, or builder collective that should be on this list? Tell us about it
                and we'll consider adding it after a quick review. We look for active, established, curated groups.
            </p>
            <Field label="Community name *">
                <input name="communityName" type="text" placeholder="Give(a)Go" className={inputClasses} required />
            </Field>
            <Field label="Location (city, country) *">
                <input name="location" type="text" placeholder="Dublin, Ireland" className={inputClasses} required />
            </Field>
            <Field label="Website or community link">
                <input name="website" type="url" placeholder="https://" className={inputClasses} />
            </Field>
            <Field label="Type *">
                <Select
                    value={type}
                    onValueChange={(value) => setType(value as CommunityType)}
                    ariaLabel="Community type"
                    className="w-full"
                    groups={[
                        {
                            label: 'Type',
                            items: Object.entries(communityTypeLabels).map(([value, label]) => ({
                                value,
                                label,
                            })),
                        },
                    ]}
                />
            </Field>
            <Field label="Organizer names (and links, if any)">
                <input
                    name="organizers"
                    type="text"
                    placeholder="Jane Builder (linkedin.com/in/janebuilder)"
                    className={inputClasses}
                />
            </Field>
            <Field label="Next session link (Luma, Meetup, etc.)">
                <input name="nextSessionLink" type="url" placeholder="https://lu.ma/..." className={inputClasses} />
            </Field>
            <Field label="Your name *">
                <input name="submitterName" type="text" placeholder="Your name" className={inputClasses} required />
            </Field>
            <Field label="Your email *">
                <input name="email" type="email" placeholder="you@example.com" className={inputClasses} required />
            </Field>
            <Field label="Anything else we should know?">
                <textarea
                    name="notes"
                    placeholder="How often do you meet? How many people show up?"
                    className={inputClasses}
                    rows={3}
                />
            </Field>
            <OSButton variant="primary" width="full" size="md" onClick={() => formRef.current?.requestSubmit()}>
                Submit community
            </OSButton>
        </form>
    )
}
