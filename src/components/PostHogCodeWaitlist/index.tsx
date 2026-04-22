import React, { useState } from 'react'
import { motion } from 'framer-motion'
import * as Yup from 'yup'
import { IconCheckCircle } from '@posthog/icons'
import usePostHog from '../../hooks/usePostHog'
import OSButton from 'components/OSButton'

const ValidationSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email address').required('Email is required'),
})

export default function PostHogCodeWaitlist(): JSX.Element {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [error, setError] = useState('')
    const posthog = usePostHog()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setError('')

        try {
            await ValidationSchema.validate({ email })
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                setError(err.message)
            }
            return
        }

        if (posthog) {
            posthog.capture('subscribe_to_product_updates', {
                email,
                selectedProduct: { handle: 'posthog_code', name: 'PostHog Code' },
            })
            posthog.setPersonProperties({
                email,
                posthog_code_waitlist: true,
            })
        }

        setSubmitted(true)
    }

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary dark:bg-accent border border-green rounded-md p-2"
            >
                <p className="!m-0 text-green text-xs flex items-center gap-2">
                    <IconCheckCircle className="h-4 w-4" />{' '}
                    <span className="text-primary">
                        You&apos;re on the list! We&apos;ll let you know when PostHog Code is ready.
                    </span>
                </p>
            </motion.div>
        )
    }

    if (!showForm) {
        return (
            <OSButton onClick={() => setShowForm(true)} variant="primary" size="md">
                Join the waitlist
            </OSButton>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            data-scheme="secondary"
            className="bg-primary dark:bg-dark border border-primary rounded-md p-4"
        >
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className={`w-full px-1 py-0.5 text-sm rounded-sm border ${
                            error ? 'border-red' : 'border-primary'
                        } bg-light outline-none ring-0 focus:ring-0 text-black`}
                        autoComplete="email"
                        autoFocus
                    />
                    {error && <p className="text-red text-xs mt-1 mb-0 font-semibold">{error}</p>}
                </div>
                <div>
                    <OSButton type="submit" variant="primary" size="sm">
                        Submit
                    </OSButton>
                </div>
            </form>
        </motion.div>
    )
}
