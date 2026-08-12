import React from 'react'

export interface LandingVariantProps {
    /** Post-category folder to load (e.g. `founders`, `blog`, `newsletter`). */
    folder: string
    /** Page heading. */
    title: string
    /** Optional intro copy rendered near the top of the page. */
    intro?: React.ReactNode
}
