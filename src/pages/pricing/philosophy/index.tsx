import CloudinaryImage from 'components/shared/media/CloudinaryImage'
import React from 'react'
import { SectionHeader } from 'components/Pricing/Test/Sections'
import Link from 'components/shared/ui/Link'
import { CTA as PlanCTA } from 'components/Pricing/Plans'

const PricingPhilosophy = (): JSX.Element => {
    return (
        <section
            id="philosophy"
            className="bg-accent text-primary shadow-xl rounded py-6 @xl:py-8 px-4 @xl:px-8 @2xl:px-12 mx-auto mt-12 mb-20 w-full max-w-3xl border border-primary"
        >
            <div className="flex gap-2 items-center mb-5">
                <Link href="/community/profiles/27732" state={{ newWindow: true }}>
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/v1683655764/james_b841adce96.png"
                        quality={100}
                        alt="James Hawkins, CEO, Co-founder"
                        placeholder="none"
                        objectFit="contain"
                        className="bg-yellow rounded-full overflow-hidden size-12 border border-primary p-0.5 dark:bg-dark relative"
                        imgClassName="absolute inset-0 object-cover"
                    />
                </Link>
                <p className="leading-tight my-0">
                    <Link href="/community/profiles/27732" state={{ newWindow: true }} className="flex">
                        <strong>James Hawkins</strong>
                    </Link>
                    <span className="text-sm text-secondary">Co-founder</span>
                </p>
            </div>

            <SectionHeader>
                <h3 className="text-xl">Our pricing is designed to make you happy</h3>
            </SectionHeader>

            <p className="mt-4">Here's what you should know about our pricing:</p>
            <ul className="space-y-1 mb-4 [&_li]:leading-7 pl-4 @xl:pl-8">
                <li>We don’t have loss-leader products that will go up in pricing later or get retired.</li>
                <li>
                    We aim to match the cheapest competitor at every scale.{' '}
                    <Link
                        iconClasses="!text-dark dark:!text-light"
                        href="https://twitter.com/intent/tweet?text=@posthog%20Your%20pricing%20is..."
                        external
                    >
                        Tell us if we're not!
                    </Link>{' '}
                    (Note: This doesn't include your buddy's two-person startup.)
                </li>
                <li>
                    We have significant revenue and are{' '}
                    <Link
                        href="/newsletter/the-companies-that-shaped-posthog#our-takeaways-2"
                        state={{ newWindow: true }}
                    >
                        default alive
                    </Link>
                    . We don’t rely on investors to grow, and we’re stable. This goes a long way to avoiding the average
                    dumb VC-backed company stuff — like running out of money or selling to a lame bigger company.
                </li>
                <li>
                    We have an open source product too. It is MIT licensed if you want to use it in a big organization
                    that isn’t ready to move to PostHog Web yet.
                </li>
            </ul>
            <p className="mb-4">If this makes you happy, just start here:</p>
            <p className="mb-0">
                <span className="flex flex-col @xl:flex-row gap-2 @xl:gap-4 items-center">
                    <PlanCTA />
                    <em className="opacity-75 text-sm">No credit card required</em>
                </span>
            </p>
        </section>
    )
}

export default PricingPhilosophy
