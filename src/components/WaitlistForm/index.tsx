import React, { useRef, useState } from 'react'
import Input from 'components/OSForm/input'
import OSButton from 'components/OSButton'
import usePostHog from '../../hooks/usePostHog'
import useProduct from '../../hooks/useProduct'
import { useApp } from '../../context/App'
import Link from 'components/Link'
import { IconDiscord } from 'components/OSIcons/Icons'

export function WaitlistForm({ autoFocus = false, confetti = true }: { autoFocus?: boolean; confetti?: boolean }) {
    const posthog = usePostHog()
    const selectedProduct = useProduct({ handle: 'posthog_code' })
    const { setConfetti } = useApp()
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return
        posthog?.capture('subscribe_to_product_updates', { email, selectedProduct })
        if (confetti) {
            setConfetti(true)
        }
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <p className="text-sm mt-0 mb-4 border border-green rounded-md p-3 bg-green/10">
                <strong>You&apos;re on the list!</strong>
                <br />
                We&apos;ll let you know when <span className="inline-block">PostHog Code</span> is ready.
                <br />
                <br />
                <Link
                    className="group flex items-center gap-1 text-sm font-medium"
                    to="https://discord.com/invite/E9xV2WnR98"
                    externalNoIcon
                >
                    <IconDiscord className="size-6 text-secondary group-hover:text-primary" />
                    <span className="group-hover:underline">Join our Discord</span>
                </Link>
            </p>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <h3 className="text-lg font-bold mb-2 !mt-0">Join the waitlist</h3>
            <Input
                ref={inputRef}
                autoFocus={autoFocus}
                label="Email"
                type="email"
                size="md"
                direction="column"
                showLabel={false}
                placeholder="Email address"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
            />
            <OSButton variant="primary" size="md" width="full" onClick={handleSubmit}>
                Get updates
            </OSButton>
        </form>
    )
}
