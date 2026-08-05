import React from 'react'
import { IconX, IconChevronDown } from '@posthog/icons'
import CloudinaryImage from 'components/CloudinaryImage'
import WizardCommand from 'components/WizardCommand'

const HEDGEHOG_SRC = 'https://res.cloudinary.com/dmukukwp6/image/upload/wizard_3f8bb7a240.png'

/**
 * Collapsible agent-flavored nudge that pushes a `npx @posthog/wizard <command>` CLI flow as the
 * automated alternative to manual setup. Visual design matches [`WizardCTA`](../WizardCTA).
 *
 * Collapsing persists in localStorage under `${dismissKey}-dismissed`. theme-init.js reads that key
 * before first paint and sets the same class on <html>; per-variant rules in global.css swap the
 * full banner for the slim re-expandable bar (both are always rendered, so there is no hydration
 * flash in either state). Adding a new variant means wiring the new key in both places — see the
 * README.
 */
export default function WizardHint({
    command,
    title,
    subtitle,
    dismissKey,
    className = '',
}: {
    /** Wizard subcommand, e.g. "warehouse" or "ai-observability" */
    command: string
    title: string
    subtitle: string
    /** Base name for the collapse localStorage key, <html> class, and wrapper class */
    dismissKey: string
    className?: string
}): JSX.Element {
    const handleCollapse = () => {
        localStorage.setItem(`${dismissKey}-dismissed`, '1')
        document.documentElement.classList.add(`${dismissKey}-dismissed`)
    }

    const handleExpand = () => {
        localStorage.removeItem(`${dismissKey}-dismissed`)
        document.documentElement.classList.remove(`${dismissKey}-dismissed`)
    }

    return (
        <div className={`${dismissKey} ${className}`}>
            <div className="wizard-hint-full relative">
                <button
                    type="button"
                    onClick={handleCollapse}
                    aria-label="Collapse"
                    className="absolute cursor-pointer rounded-full bg-white dark:bg-secondary p-1 top-1 right-1 translate-x-1/2 -translate-y-1/2 z-10 text-secondary hover:text-primary border border-secondary"
                >
                    <IconX className="size-4" />
                </button>
                <div className="relative overflow-hidden rounded not-prose border border-secondary">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/texture_tan_9608fcca70.png"
                        className="dark:hidden absolute inset-0 -bottom-12"
                        imgClassName="h-full w-full object-cover"
                    />
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/texture_tan_dark_a92b0e022d.png"
                        className="hidden dark:block absolute inset-0 -bottom-12"
                        imgClassName="h-full w-full object-cover"
                    />
                    <div className="relative flex flex-col-reverse @lg:flex-row items-center justify-between pl-5 @lg:pl-8 pr-8 py-4 @lg:py-3 gap-4">
                        <div className="flex-1 text-center @lg:text-left max-w-lg">
                            <p className="text-lg font-bold !mb-0">{title}</p>
                            <p className="!mt-1 !mb-3 text-sm opacity-75">{subtitle}</p>
                            <WizardCommand command={command} />
                        </div>
                        <div className="shrink-0">
                            <img
                                src={HEDGEHOG_SRC}
                                alt="PostHog Wizard hedgehog"
                                className="w-36 @lg:w-32 @xl:w-40 @2xl:w-48"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Slim bar shown in place of the banner once collapsed. Hidden by default and toggled
                to flex by the global.css rules — no `flex` utility here or it would always show. */}
            <button
                type="button"
                onClick={handleExpand}
                className="wizard-hint-collapsed w-full items-center gap-3 rounded not-prose border border-secondary px-4 py-1.5 text-left cursor-pointer text-secondary hover:text-primary hover:border-primary"
            >
                <img src={HEDGEHOG_SRC} alt="" className="h-8 w-8 object-contain" />
                <span className="flex-1 text-sm font-semibold">{title}</span>
                <IconChevronDown className="size-4" />
            </button>
        </div>
    )
}
