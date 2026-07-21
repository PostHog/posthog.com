import React from 'react'
import OSButton from 'components/OSButton'
import CloudinaryImage from 'components/CloudinaryImage'
import { SectionComponentProps } from '../types'

const PricingFooterCTA = ({ id, productData }: SectionComponentProps) => {
    const hog = productData?.hog

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <div className="relative bg-accent dark:bg-accent-dark rounded-xl overflow-hidden px-8 py-12 @2xl:px-14 @2xl:py-16">
                <div className="max-w-lg relative z-10">
                    <p className="text-sm text-primary/40 mb-3">Still here?</p>
                    <h2 className="text-3xl @2xl:text-4xl font-bold text-primary mt-0 mb-4 leading-tight">
                        The hedgehog has been waiting this whole time.
                    </h2>
                    <p className="text-base text-primary/70 mb-8">
                        It's free to start. Not "free trial" free — actually free. No card, no call, no "someone from
                        our team will be in touch." Just PostHog.
                    </p>
                    <div className="flex flex-wrap gap-3 items-center">
                        <OSButton variant="primary" asLink to="https://app.posthog.com/signup" size="lg">
                            Get started — free
                        </OSButton>
                        <OSButton variant="secondary" asLink to="/talk-to-a-human" size="lg">
                            Talk to a human
                        </OSButton>
                    </div>
                    <p className="text-xs text-primary/30 mt-4">No sales call. No "tailored demo." No expiry.</p>
                </div>

                {hog?.src && (
                    <div className="hidden @2xl:block absolute bottom-0 right-0 h-full pointer-events-none select-none">
                        <CloudinaryImage
                            src={hog.src}
                            alt={hog.alt || ''}
                            className="h-full w-auto object-contain object-bottom opacity-80"
                        />
                    </div>
                )}
            </div>
        </section>
    )
}

export default PricingFooterCTA
