import React from 'react'
import { IconX } from '@posthog/icons'
import CloudinaryImage from 'components/CloudinaryImage'
import WizardCommand from 'components/WizardCommand'

// Persist dismissal so the hint doesn't nag a user who has already seen it. Mirrors the
// product app's WarehouseWizardHint, which uses the same localStorage key.
// theme-init.js sets `warehouse-wizard-hint-dismissed` on <html> before paint when this
// key is set; global.css hides `.warehouse-wizard-hint` when that class is present.
const DISMISSED_KEY = 'warehouse-wizard-hint-dismissed'
const DISMISSED_CLASS = 'warehouse-wizard-hint-dismissed'

/**
 * Agent-flavored nudge that pushes the `npx @posthog/wizard warehouse` CLI, which auto-detects
 * and connects a user's databases/APIs straight from their codebase instead of setting up a
 * source by hand. Visual design matches [`WizardCTA`](../WizardCTA).
 */
export default function WarehouseWizardHint({ className = '' }: { className?: string }): JSX.Element {
    const handleDismiss = () => {
        localStorage.setItem(DISMISSED_KEY, '1')
        document.documentElement.classList.add(DISMISSED_CLASS)
    }

    return (
        <div className={`warehouse-wizard-hint relative ${className}`}>
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
                        <p className="text-lg font-bold !mb-0">Let AI connect your sources for you</p>
                        <p className="!mt-1 !mb-3 text-sm opacity-75">
                            Skip the manual setup — run this in your project and the wizard auto-detects your databases
                            and APIs and connects them to PostHog.
                        </p>
                        <WizardCommand command="warehouse" />
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
