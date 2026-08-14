import React from 'react'
import OSButton from 'components/OSButton'
import CloudinaryImage from 'components/CloudinaryImage'
import type { SectionComponentProps } from 'components/Products/ReaderViewProduct/types'

// Detective hedgehog watching a wall of monitors.
const IMAGE =
    'https://res.cloudinary.com/dmukukwp6/image/upload/noir_desk_relax_surveillance_computer_63a434c398.png' as const

// Same look as the shared PricingFooterCTA, but laid out as two columns so the
// image sits beside the copy on the right instead of overlapping it.
const PricingFooterCTASection = ({ id }: SectionComponentProps) => {
    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <div className="@container relative bg-accent dark:bg-accent-dark rounded-xl overflow-hidden">
                <div className="grid gap-8 items-center px-8 py-12 @2xl:px-14 @2xl:py-16 @2xl:grid-cols-[1fr_auto]">
                    <div className="max-w-lg">
                        <p className="text-sm text-primary/40 mb-3">Still here?</p>
                        <h2 className="text-3xl @2xl:text-4xl font-bold text-primary mt-0 mb-4 leading-tight">
                            The hedgehog has been watching this whole time.
                        </h2>
                        <p className="text-base text-primary/70 mb-8">
                            It's free to start. Not "free trial" free – actually free. No card, no call, no "someone
                            from our team will be in touch." Just PostHog.
                        </p>
                        <div className="flex flex-wrap gap-3 items-center">
                            <OSButton variant="primary" asLink to="https://app.posthog.com/signup" size="lg">
                                Get started – free
                            </OSButton>
                            <OSButton variant="secondary" asLink to="/talk-to-a-human" size="lg">
                                Talk to a human
                            </OSButton>
                        </div>
                        <p className="text-xs text-primary/30 mt-4">No sales call. No "tailored demo." No expiry.</p>
                    </div>
                    <div className="hidden @2xl:block justify-self-end pointer-events-none select-none">
                        <CloudinaryImage
                            src={IMAGE}
                            alt="Replay Vision watching your sessions"
                            className="w-64 @4xl:w-80"
                            imgClassName="w-full h-auto"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PricingFooterCTASection
