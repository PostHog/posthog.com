import React, { useState } from 'react'
import { CallToAction } from 'components/CallToAction'
import usePostHog from 'hooks/usePostHog'
import Input from 'components/OSForm/input'

interface VariantProp {
    title?: string
    product?: {
        title?: string
    }
    selectedOptions?: Array<{
        name: string
        value: string
    }>
    shopifyId?: string
}

interface ProductProp {
    title?: string
    shopifyId?: string
}

export function BackInStockForm({ variant, product }: { variant?: VariantProp; product: ProductProp }) {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const posthog = usePostHog()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Extract title with fallbacks: variant title -> variant.product title -> product title
        const title = variant?.product?.title || variant?.title?.replace('Default Title', '') || product?.title

        // Extract shopifyId with fallback: variant shopifyId -> product shopifyId
        const shopifyId = variant?.shopifyId || product?.shopifyId

        const size = variant?.selectedOptions?.find((o: any) => o.name === 'Size')?.value || 'N/A'
        const productData = { title, size, shopifyId }

        posthog?.capture('back_in_stock_form_submitted', { email, product: productData })
        setSubmitted(true)
    }

    return (
        <div data-scheme="primary" className="border border-primary p-4 bg-primary rounded-md">
            {submitted ? (
                <p className="m-0 text-sm">Thanks! We'll email you when it's back in stock.</p>
            ) : (
                <>
                    <h4 className="m-0">Get notified!</h4>
                    <p className="m-0 my-1.5 text-sm">
                        Enter your email and we'll get back to you as soon as this product is back in stock
                    </p>
                    <form onSubmit={handleSubmit} className="flex space-x-2 items-center m-0">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            showLabel={false}
                            dataScheme="secondary"
                            containerClassName="flex-1"
                        />
                        <div className="shrink-0">
                            <CallToAction size="lg" type="primary">
                                Notify me
                            </CallToAction>
                        </div>
                    </form>
                </>
            )}
        </div>
    )
}
