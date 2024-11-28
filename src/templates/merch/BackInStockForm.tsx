import React, { useState } from 'react'
import { CallToAction } from 'components/CallToAction'
import usePostHog from 'hooks/usePostHog'

export function BackInStockForm({ variant }) {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const posthog = usePostHog()
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const title = variant?.product?.title
        const size = variant?.selectedOptions?.find((o: any) => o.name === 'Size')?.value || 'N/A'
        const product = { title, size, shopifyId: variant?.shopifyId }
        posthog?.capture('back_in_stock_form_submitted', { email, product })
        setSubmitted(true)
    }

    return (
        <div className="border-t border border-border dark:border-dark p-4 bg-accent dark:bg-accent-dark rounded-md">
            {submitted ? (
                <p className="m-0 text-sm">Thanks! We'll email you when it's back in stock.</p>
            ) : (
                <>
                    <h4 className="m-0">Get notified!</h4>
                    <p className="m-0 my-1.5 text-sm">
                        Enter your email and we'll get back to you as soon as this product is back in stock
                    </p>
                    <form onSubmit={handleSubmit} className="flex space-x-2 items-center m-0">
                        <input
                            placeholder="Email"
                            className="bg-white dark:bg-dark rounded-md border border-border dark:border-dark py-1.5 px-2 text-base mt-[2px] w-full"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="shrink-0">
                            <CallToAction size="md" type="primary">
                                Notify me
                            </CallToAction>
                        </div>
                    </form>
                </>
            )}
        </div>
    )
}
