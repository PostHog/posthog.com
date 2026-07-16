import React, { useState } from 'react'
import { useFormik } from 'formik'
import SEO from 'components/seo'
import Wizard from 'components/Wizard'
import { CallToAction } from 'components/CallToAction'
import Input from 'components/OSForm/input'
import Link from 'components/Link'
import { IconSpinner } from '@posthog/icons'
import CloudinaryImage from 'components/CloudinaryImage'

export default function MerchOrders(): JSX.Element {
    const [errorMessage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState(false)

    const { handleSubmit, submitForm, touched, errors, getFieldProps, isSubmitting } = useFormik({
        initialValues: {
            orderNumber: '',
            email: '',
        },
        validate: (values) => {
            const errors: Record<string, string> = {}
            if (!values.orderNumber.trim()) {
                errors.orderNumber = 'Required'
            }
            if (!values.email.trim()) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email'
            }
            return errors
        },
        onSubmit: async (values) => {
            setErrorMessage('')

            try {
                const res = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/orders/lookup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        orderNumber: values.orderNumber.trim(),
                        email: values.email.trim(),
                    }),
                })

                if (res.ok) {
                    const data = await res.json()
                    if (data.statusURL) {
                        setSuccess(true)
                        window.location.href = data.statusURL
                        return
                    }
                }

                if (res.status === 404) {
                    setErrorMessage('No order found. Double check both fields.')
                    return
                }

                if (res.status === 429) {
                    setErrorMessage('Too many attempts. Try again in a minute.')
                    return
                }

                setErrorMessage('Something went wrong. Try again in a moment.')
            } catch {
                setErrorMessage('Something went wrong. Try again in a moment.')
            }
        },
    })

    return (
        <>
            <SEO
                title="Order lookup - PostHog Merch"
                description="Look up your PostHog merch order to check status, request a return, or cancel."
            />
            <div className="size-full">
                <Wizard
                    leftNavigation={
                        <div className="text-sm">
                            Need help?{' '}
                            <a href="mailto:merch@posthog.com" className="text-red dark:text-yellow font-semibold">
                                Email us
                            </a>
                        </div>
                    }
                    rightNavigation={
                        <div className="flex items-center space-x-2">
                            <CallToAction
                                disabled={isSubmitting || success}
                                type="primary"
                                size="sm"
                                onClick={submitForm}
                                className="flex-shrink-0"
                            >
                                {isSubmitting ? (
                                    <IconSpinner className="size-4 animate-spin my-0.5" />
                                ) : success ? (
                                    'Redirecting...'
                                ) : (
                                    'Find my order'
                                )}
                            </CallToAction>
                        </div>
                    }
                >
                    <div className="bg-accent flex gap-6 px-8 py-6 flex-1">
                        <div className="max-w-20">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/shopahogic.png"
                                className="w-20"
                            />
                        </div>
                        <div data-scheme="primary" className="flex-1">
                            <h3 className="text-base font-semibold leading-tight mb-2">Find your merch order</h3>
                            <p className="text-sm text-secondary mb-4">
                                Enter the details from your confirmation email to check status, cancel, or request a
                                return.
                            </p>
                            <form onSubmit={handleSubmit} className="space-y-2 mb-4">
                                <Input
                                    label="Order #"
                                    type="text"
                                    size="sm"
                                    direction="row"
                                    touched={!!touched.orderNumber}
                                    error={errors.orderNumber}
                                    {...getFieldProps('orderNumber')}
                                    placeholder="#1234"
                                />
                                <Input
                                    label="Email"
                                    type="email"
                                    size="sm"
                                    direction="row"
                                    touched={!!touched.email}
                                    error={errors.email}
                                    {...getFieldProps('email')}
                                    placeholder="you@example.com"
                                />
                                <button type="submit" className="hidden" />
                            </form>
                            {errorMessage && (
                                <p className="text-red dark:text-yellow text-sm m-0 mb-3 font-bold">{errorMessage}</p>
                            )}
                        </div>
                    </div>
                </Wizard>
            </div>
        </>
    )
}
