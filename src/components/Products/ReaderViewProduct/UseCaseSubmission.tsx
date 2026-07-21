import React, { useState } from 'react'
import OSButton from 'components/OSButton'
import Textarea from 'components/OSForm/textarea'
import Input from 'components/OSForm/input'
import usePostHog from 'hooks/usePostHog'
import { useUser } from 'hooks/useUser'
import { useApp } from '../../../context/App'

interface UseCaseSubmissionProps {
    productName?: string
    productSlug?: string
}

const MAX_LENGTH = 1000

const UseCaseSubmission = ({ productName, productSlug }: UseCaseSubmissionProps): JSX.Element | null => {
    const posthog = usePostHog()
    const { user } = useUser()
    const { setConfetti } = useApp()

    const [mode, setMode] = useState<'collapsed' | 'expanded' | 'submitted'>('collapsed')
    const [useCase, setUseCase] = useState('')
    const [email, setEmail] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    if (!productName) return null

    const reset = () => {
        setUseCase('')
        setEmail('')
        setError(null)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (submitting) return

        const trimmed = useCase.trim()
        if (!trimmed) {
            setError('Please describe your use case before submitting.')
            return
        }

        if (!user && !email.trim()) {
            setError('Please add an email so we can follow up.')
            return
        }

        setSubmitting(true)
        setError(null)

        try {
            posthog?.capture('Use case suggestion', {
                use_case: trimmed,
                product_name: productName,
                product_slug: productSlug,
                submitted_by: user ? 'logged_in' : 'anonymous',
                ...(user ? {} : { email: email.trim() }),
            })
            setConfetti(true)
            setMode('submitted')
            reset()
        } catch (err) {
            setError('Something went wrong. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    if (mode === 'collapsed') {
        return (
            <div>
                <OSButton variant="primary" size="md" onClick={() => setMode('expanded')}>
                    How do you use {productName}?
                </OSButton>
            </div>
        )
    }

    if (mode === 'submitted') {
        return (
            <div className="border border-primary rounded-md p-4 bg-accent">
                <h3 className="text-lg font-semibold m-0 mb-1">Thanks for sharing!</h3>
                <p className="text-sm text-secondary m-0 mb-3">
                    We've passed your use case along to the {productName} team.
                </p>
                <OSButton
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                        reset()
                        setMode('expanded')
                    }}
                >
                    Submit another
                </OSButton>
            </div>
        )
    }

    const remaining = MAX_LENGTH - useCase.length

    return (
        <form onSubmit={handleSubmit} className="border border-primary rounded-md p-4 bg-accent flex flex-col gap-3">
            <div>
                <h3 className="text-base font-semibold m-0 mb-0.5">How do you use {productName}?</h3>
                <p className="text-sm text-secondary m-0">
                    Tell us how it fits into your workflow — we'll share standout responses with the team.
                </p>
            </div>

            <Textarea
                label="Your use case"
                name="use_case"
                direction="column"
                size="md"
                rows={4}
                required
                maxLength={MAX_LENGTH}
                value={useCase}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setUseCase(e.target.value)}
                placeholder={`e.g. We use ${productName} to…`}
            />
            <div className="-mt-2 text-xs text-secondary text-right">
                {remaining} character{remaining === 1 ? '' : 's'} left
            </div>

            {!user && (
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    direction="column"
                    size="md"
                    required
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    description="So we can reach out if we have questions."
                />
            )}

            {error && <p className="text-sm text-red dark:text-yellow m-0">{error}</p>}

            <div className="flex items-center gap-2">
                <OSButton
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={submitting || !useCase.trim() || (!user && !email.trim())}
                >
                    {submitting ? 'Submitting…' : 'Submit'}
                </OSButton>
                <OSButton
                    type="button"
                    variant="secondary"
                    size="md"
                    onClick={() => {
                        reset()
                        setMode('collapsed')
                    }}
                >
                    Cancel
                </OSButton>
            </div>
        </form>
    )
}

export default UseCaseSubmission
