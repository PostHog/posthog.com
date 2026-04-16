import React, { useState } from 'react'
import { motion } from 'framer-motion'
import usePostHog from '../../hooks/usePostHog'
import OSButton from 'components/OSButton'
import * as Yup from 'yup'
import { IconCheckCircle } from '@posthog/icons'

const ValidationSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email address').required('Email is required'),
})

export default function DuckDBWaitlistSurvey(): JSX.Element {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [error, setError] = useState('')
    const posthog = usePostHog()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setError('')

        // Validate email
        try {
            await ValidationSchema.validate({ email })
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                setError(err.message)
            }
            return
        }

        // Submit to PostHog as a survey response
        if (posthog) {
            posthog.capture('survey sent', {
                $survey_id: '019b05b2-973f-0000-8f68-f8326c077146',
                $survey_response: email,
            })

            // Also set person property for follow-up
            posthog.setPersonProperties({
                email: email,
                duckdb_waitlist: true,
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
                    <span className="text-primary">Thanks! You're on the waitlist. We'll be in touch soon.</span>
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
