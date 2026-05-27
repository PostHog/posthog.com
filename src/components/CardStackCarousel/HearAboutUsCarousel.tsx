import React from 'react'
import { CardStackCarousel } from './'
import { SignupQuoteCard } from './SignupQuoteCard'
import quotes from './quotes.json'

export function HearAboutUsCarousel() {
    return (
        <CardStackCarousel
            count={quotes.length}
            renderCard={(i, { isActive }) => <SignupQuoteCard content={quotes[i].content} isActive={isActive} />}
            ariaLabel="How users heard about PostHog"
        />
    )
}

export default HearAboutUsCarousel
