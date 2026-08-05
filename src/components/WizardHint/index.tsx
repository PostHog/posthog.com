import React from 'react'
import { IconX } from '@posthog/icons'
import CloudinaryImage from 'components/CloudinaryImage'
import WizardCommand from 'components/WizardCommand'

/**
 * Dismissible agent-flavored nudge that pushes a `npx @posthog/wizard <command>` CLI flow as the
 * automated alternative to manual setup. Visual design matches [`WizardCTA`](../WizardCTA).
 *
 * Dismissal persists in localStorage under `${dismissKey}-dismissed`. theme-init.js reads that key
 * before first paint and sets the same class on <html>; a per-variant rule in global.css hides the
 * hint (matched by the `dismissKey` class on the wrapper). Adding a new variant means wiring the
 * new key in both places — see the README.
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
    /** Base name for the dismissal localStorage key, <html> class, and wrapper class */
    dismissKey: string
    className?: string
}): JSX.Element {
    const handleDismiss = () => {
        localStorage.setItem(`${dismissKey}-dismissed`, '1')
        document.documentElement.classList.add(`${dismissKey}-dismissed`)
    }

    return (
        <div className={`${dismissKey} relative ${className}`}>
            <button
                type="button"
                onClick={handleDismiss}
                aria-label="Dismiss"
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
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/wizard_3f8bb7a240.png"
                            alt="PostHog Wizard hedgehog"
                            className="w-36 @lg:w-32 @xl:w-40 @2xl:w-48"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
