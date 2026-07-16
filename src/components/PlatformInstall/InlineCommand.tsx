import React, { useRef, useState } from 'react'
import { IconCopy, IconChevronRight, IconCheck, IconArrowUpRight } from '@posthog/icons'
import { useToast } from '../../context/Toast'
import Link from 'components/Link'
import ZoomHover from 'components/ZoomHover'
import { useCopyConfettiZIndex, fireCopyConfetti } from './confetti'

export type InlineCommandProps = {
    /** Command shown in the button. */
    displayCommand: string
    /** Clipboard override; defaults to `displayCommand`. */
    copyCommand?: string
    /** Bordered button style (matches WizardCommand's `variant="bordered"`). */
    bordered?: boolean
    /** Hide the "Learn more" tab and fully round the button. */
    slim?: boolean
    /** Applied to the button element (matches WizardCommand's `className`). */
    className?: string
    /** "Learn more" link target, shown unless `slim`. */
    secondaryTo?: string
    onCopy?: () => void
}

/**
 * The bare inline command button — the consolidated home of what used to be `WizardCommand`'s look:
 * a ZoomHover gradient button with a green copy-flash + confetti, and an optional "Learn more" tab.
 * Rendered by `PlatformInstall` when `variant="inline"`. Command strings are precomputed by the
 * caller via `buildWizardCommand` so display/copy semantics live in one place.
 */
export function InlineCommand({
    displayCommand,
    copyCommand,
    bordered = false,
    slim = false,
    className = '',
    secondaryTo = '/wizard',
    onCopy,
}: InlineCommandProps): JSX.Element {
    const { addToast } = useToast()
    const confettiZIndex = useCopyConfettiZIndex()
    const copyButtonRef = useRef<HTMLButtonElement>(null)
    const [copyKey, setCopyKey] = useState(0)

    const handleCopy = () => {
        navigator.clipboard.writeText(copyCommand ?? displayCommand)
        setCopyKey((k) => k + 1)
        fireCopyConfetti(copyButtonRef.current, confettiZIndex)
        onCopy?.()
        addToast({
            description: (
                <span className="inline-flex items-center gap-1.5">
                    <IconCheck className="size-4 text-green" />
                    Copied to clipboard
                </span>
            ),
            duration: 2000,
        })
    }

    return (
        <div className="inline-flex flex-col not-prose">
            <ZoomHover size="lg">
                <button
                    ref={copyButtonRef}
                    onClick={handleCopy}
                    className={`group inline-flex items-center gap-2 bg-white text-black ${
                        bordered ? 'border border-primary shadow-sm' : ''
                    } font-mono text-sm px-2 py-1.5 cursor-pointer ${
                        !slim ? 'rounded-t-md relative z-10 border border-primary' : 'rounded-md'
                    } ${className}`}
                >
                    <IconChevronRight className="size-4 opacity-50" />
                    <span className="relative mr-1">
                        <code className="!bg-transparent !p-0 !border-0 text-gradient-wizard select-none">
                            {displayCommand}
                        </code>
                        {copyKey > 0 && (
                            <code
                                key={copyKey}
                                className="!bg-transparent !p-0 !border-0 absolute inset-0 text-[#36C46F] pointer-events-none text-gradient-wizard-flash"
                                aria-hidden="true"
                            >
                                {displayCommand}
                            </code>
                        )}
                    </span>
                    <IconCopy className="size-4 opacity-60 group-hover:opacity-80" />
                </button>
            </ZoomHover>
            {!slim && (
                <Link
                    to={secondaryTo}
                    state={{ newWindow: true }}
                    className="group relative -top-2 flex gap-px justify-center items-center pt-3 pr-2 pl-5 pb-1 text-xs text-secondary hover:text-primary mx-1.5 border-b border-x border-primary bg-accent/50 hover:bg-hover/100 rounded-b-md text-center"
                >
                    Learn more
                    <IconArrowUpRight className="invisible group-hover:visible inline-block size-3 opacity-75 relative" />
                </Link>
            )}
        </div>
    )
}
