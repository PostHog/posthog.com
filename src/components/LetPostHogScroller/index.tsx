import React from 'react'
import SlotMachineText from 'components/SlotMachineText'
import posthogIcon from 'images/posthog-icon-white.svg'

/**
 * "Let [icon] PostHog {analyze|debug|…|code}" – the animated wordmark used as
 * the Desktop page's header brand, and reused wherever the page is making the
 * same point: PostHog doing the work, not just watching it.
 */
const LetPostHogScroller = ({
    className = 'text-2xl @xl:text-3xl font-bold tracking-tight',
}: {
    className?: string
}): JSX.Element => (
    <SlotMachineText
        className={className}
        words={['analyze', 'debug', 'instrument', 'ship', 'experiment', 'query', 'flag', 'code']}
        holdDuration={4000}
        wordClassName="text-red dark:text-yellow"
        prefix={
            <span className="inline-flex items-center gap-2">
                <span>Let</span>
                <img src={posthogIcon} alt="" aria-hidden className="size-6 rounded-md @xl:size-7" />
                <span>PostHog</span>
            </span>
        }
    />
)

export default LetPostHogScroller
