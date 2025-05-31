import React from 'react'
import { useLocation } from '@reach/router'
import ProductManagerNewsletterContent from './ProductManagerNewsletterContent'
import CommunicationForEngineersNewsletter from './CommunicationForEngineersNewsletter'

export default function NewsletterContentForFBAds(): JSX.Element {
    const { search } = useLocation()
    const params = new URLSearchParams(search)
    const newsletterType = params.get('newsletter_type')
    switch (newsletterType) {
        case 'communication':
            return <CommunicationForEngineersNewsletter />
        case 'pm':
        default:
            return <ProductManagerNewsletterContent />
    }
}
