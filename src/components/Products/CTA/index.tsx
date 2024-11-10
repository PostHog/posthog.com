import React from 'react'
import { CallToAction } from 'components/CallToAction'

interface ProductCTAProps {
    className?: string
}

export const ProductCTA = ({ className }: ProductCTAProps): JSX.Element => {
    return (
        <div className={`flex gap-2 mb-8 ${className}`}>
            <CallToAction href="https://app.posthog.com/signup" type="primary" size="sm">
                Get started - free
            </CallToAction>
            <CallToAction href="/talk-to-a-human" type="secondary" size="sm">
                Talk to a human
            </CallToAction>
        </div>
    )
}

export default ProductCTA