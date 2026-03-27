import React, { useState } from 'react'
import { motion } from 'framer-motion'
import usePostHog from 'hooks/usePostHog'
import OSButton from 'components/OSButton'
import * as Yup from 'yup'
import { IconCheckCircle } from '@posthog/icons'

const SURVEY_ID = '019c94ae-37a4-0000-89bf-7258757f8ebf'

const PARTNERSHIP_TYPES = ['Technical integration', 'Implementation partnership', 'Affiliate program', 'Other']

const ValidationSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email address').required('Email is required'),
    partnershipType: Yup.string().required('Please select a partnership type'),
})

export default function PartnershipsSurvey(): JSX.Element {
    const [email, setEmail] = useState('')
    const [partnershipType, setPartnershipType] = useState('')
    const [tellUsMore, setTellUsMore] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState<{ email?: string; partnershipType?: string }>({})
    const posthog = usePostHog()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setErrors({})

        try {
            await ValidationSchema.validate({ email, partnershipType }, { abortEarly: false })
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const fieldErrors: { email?: string; partnershipType?: string } = {}
                err.inner.forEach((e) => {
                    if (e.path) fieldErrors[e.path as 'email' | 'partnershipType'] = e.message
                })
                setErrors(fieldErrors)
            }
            return
        }

        if (posthog) {
            posthog.capture('survey sent', {
                $survey_id: SURVEY_ID,
                $survey_response: email,
                $survey_response_1: partnershipType,
                $survey_response_2: tellUsMore || undefined,
            })
            posthog.setPersonProperties({ email })
        }

        setSubmitted(true)
    }

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-green rounded-md p-4 flex items-center gap-3"
            >
                <IconCheckCircle className="h-5 w-5 text-green shrink-0" />
                <p className="!m-0 text-primary">
                    Thanks for your interest! We'll be in touch when we're ready to move forward.
                </p>
            </motion.div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Q1: Email */}
            <div>
                <label className="block text-sm font-semibold text-primary mb-1">
                    What's your email address? <span className="text-red">*</span>
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    autoComplete="email"
                    className={`w-full px-3 py-2 text-sm rounded border ${
                        errors.email ? 'border-red' : 'border-input'
                    } bg-primary text-primary outline-none ring-0 focus:ring-0`}
                />
                {errors.email && <p className="text-red text-xs mt-1 mb-0 font-semibold">{errors.email}</p>}
            </div>

            {/* Q2: Partnership type */}
            <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                    What type of integration are you interested in? <span className="text-red">*</span>
                </label>
                <div className="space-y-2">
                    {PARTNERSHIP_TYPES.map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="partnershipType"
                                value={type}
                                checked={partnershipType === type}
                                onChange={() => setPartnershipType(type)}
                                className="accent-red"
                            />
                            <span className="text-sm text-primary">{type}</span>
                        </label>
                    ))}
                </div>
                {errors.partnershipType && (
                    <p className="text-red text-xs mt-1 mb-0 font-semibold">{errors.partnershipType}</p>
                )}
            </div>

            {/* Q3: Tell us more (optional) */}
            <div>
                <label className="block text-sm font-semibold text-primary mb-1">
                    Tell us more about what you have in mind.{' '}
                    <span className="text-secondary font-normal">(Optional)</span>
                </label>
                <textarea
                    value={tellUsMore}
                    onChange={(e) => setTellUsMore(e.target.value)}
                    placeholder="Describe your partnership idea..."
                    rows={4}
                    className="w-full px-3 py-2 text-sm rounded border border-input bg-primary text-primary outline-none ring-0 focus:ring-0 resize-y"
                />
            </div>

            <OSButton type="submit" variant="primary" size="md">
                Register interest
            </OSButton>
        </form>
    )
}
