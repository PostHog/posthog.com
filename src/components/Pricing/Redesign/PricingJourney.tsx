import React from 'react'
import { IconArrowRight, IconCheck, IconCreditCard } from '@posthog/icons'
import SignupBlock from './SignupBlock'

/**
 * Free and pay-as-you-go as two stops on a journey, not two plans in a table.
 *
 * The comparison-table version of this section framed the two modes as a choice
 * to make at signup. They aren't: everybody starts on the left, and the right
 * side is something that happens later, from inside the product. Numbering the
 * two states and pointing an arrow between them says that without a caption.
 *
 * Two details carry most of the meaning:
 *
 * - **Step 2 is additive, not alternative.** It opens with "Everything in Free,
 *   plus" and every item is stated as a delta (`6 projects – up from 1`), so the
 *   load-bearing claim of the page — adding a card doesn't take the free tier
 *   away — is structural rather than a footnote.
 * - **Only step 1 has a CTA.** Step 2's action lives in PostHog's billing
 *   settings, so giving it a button here would imply a second decision today.
 *   Its footer says there's nothing to do instead.
 */

const freeIncludes = [
    'Full monthly free tier on every product',
    'Unlimited team members',
    '1 project, 1-year data retention',
    'Community support',
]

const paidAdds = [
    { name: 'Keep going past the free tier', detail: 'at usage-based rates' },
    { name: '6 projects', detail: 'up from 1' },
    { name: '7-year data retention', detail: 'up from 1 year' },
    { name: 'Email support', detail: 'or Slack over $2k/mo' },
]

const StepBadge = ({ number, label, tone }: { number: number; label: string; tone: 'now' | 'later' }) => (
    <div className="flex items-center gap-2 mb-3">
        <span
            className={`flex items-center justify-center size-6 rounded-full text-sm font-bold shrink-0 ${
                tone === 'now' ? 'bg-yellow text-black' : 'border border-primary text-secondary'
            }`}
        >
            {number}
        </span>
        <span className="text-sm font-semibold uppercase tracking-wide text-secondary">{label}</span>
    </div>
)

export default function PricingJourney(): JSX.Element {
    return (
        <div className="@container not-prose">
            <div className="grid @2xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-4 @2xl:gap-3 items-stretch">
                {/* Step 1 — what you do today */}
                <div className="border border-primary rounded-md bg-light dark:bg-accent p-5 flex flex-col">
                    <StepBadge number={1} label="Start here" tone="now" />

                    <h3 className="text-lg mb-0.5">Free</h3>
                    <p className="text-sm text-secondary mb-4">
                        No credit card, not a trial. This is <strong className="text-primary">97% of companies</strong>.
                    </p>

                    <ul className="list-none p-0 m-0 space-y-2 mb-4">
                        {freeIncludes.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-[15px]">
                                <IconCheck className="text-green size-5 shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <p className="text-sm text-secondary border-t border-primary pt-3 mb-4">
                        Usage stops at the free tier limits, so you can't be charged by surprise.
                    </p>

                    <div className="mt-auto">
                        <SignupBlock />
                    </div>
                </div>

                {/* The thing that moves you from 1 to 2. No connecting rule: the column is only
                    ~112px wide side-by-side, and a line behind the chip would need to be masked
                    with an opaque background this section's translucent backdrop can't provide.
                    The numbered badges plus a direction-aware arrow carry the sequence instead. */}
                <div className="flex flex-col items-center justify-center gap-1.5 @2xl:w-28 text-center">
                    <span className="flex items-center justify-center size-9 rounded-full border border-primary bg-light dark:bg-accent shrink-0">
                        <IconCreditCard className="size-5 text-secondary" />
                    </span>
                    <span className="text-xs font-semibold text-secondary leading-tight text-balance">
                        Hit a limit? Add a card
                    </span>
                    <IconArrowRight className="size-5 text-secondary opacity-70 rotate-90 @2xl:rotate-0" />
                </div>

                {/* Step 2 — what happens later, from inside the product */}
                <div className="border border-dashed border-2 border-primary rounded-md p-5 flex flex-col bg-accent">
                    <StepBadge number={2} label="If and when you need it" tone="later" />

                    <h3 className="text-lg mb-0.5">Pay-as-you-go</h3>
                    <p className="text-sm text-secondary mb-4">
                        Same free tier every month. You only pay for what you use beyond it.
                    </p>

                    <p className="text-[15px] font-semibold mb-2">
                        Everything in Free, <span className="text-green-dark dark:text-lime-green">plus:</span>
                    </p>

                    <ul className="list-none p-0 m-0 space-y-2 mb-4">
                        {paidAdds.map(({ name, detail }) => (
                            <li key={name} className="flex items-start gap-2 text-[15px]">
                                <IconArrowRight className="text-green size-5 shrink-0" />
                                <span>
                                    <strong>{name}</strong> <span className="text-secondary text-sm">– {detail}</span>
                                </span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-auto border-t border-primary pt-3">
                        <p className="text-sm text-secondary mb-0">
                            <strong className="text-primary">Nothing to do today.</strong> Add a card from your billing
                            settings whenever you're ready – there's nothing to migrate, and you can set a billing limit
                            per product.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
