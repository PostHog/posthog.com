import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import PlatformInstall from 'components/PlatformInstall'

const DEFAULT_TITLE = 'Install PostHog with one command'
const DEFAULT_SUBTITLE = 'Paste this into your terminal and make AI do all the work.'

/**
 * Wizard install banner for prose (blog posts, docs) and the `/r/*` landing pages.
 *
 * Every piece of copy has a prop defaulting to the value it was previously hard-coded to, so bare
 * `<WizardCTA />` call sites keep rendering exactly what they always have while an individual post
 * can retarget the command — e.g. `<WizardCTA selfDriving />` or
 * `<WizardCTA command="ai-observability" />`. Command building itself stays in
 * [`PlatformInstall`](../PlatformInstall) so the displayed and copied strings can't drift.
 */
export default function WizardCTA({
    command,
    selfDriving = false,
    title = DEFAULT_TITLE,
    subtitle = DEFAULT_SUBTITLE,
    learnMoreTo,
    className = '',
}: {
    /** Wizard subcommand appended to the command, e.g. "ai-observability" or "warehouse". */
    command?: string
    /** Shorthand for `command="self-driving"`. Takes precedence over `command`. */
    selfDriving?: boolean
    title?: string
    subtitle?: string
    /** "Learn more" link target under the command. Defaults to `/wizard`. */
    learnMoreTo?: string
    className?: string
}): JSX.Element {
    return (
        <div className={`relative overflow-hidden rounded not-prose my-6 border border-secondary ${className}`}>
            <div className="max-w-2xl mx-auto">
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
                <div className="relative flex flex-col-reverse @lg:flex-row items-center pl-5 @lg:pl-8 pr-5 py-4 @lg:py-3">
                    <div className="flex-1 text-center @lg:text-left">
                        <p className="text-lg font-bold !mb-0">{title}</p>
                        <p className="!mt-1 !mb-3 text-sm opacity-75">{subtitle}</p>
                        <PlatformInstall
                            variant="inline"
                            command={command}
                            selfDriving={selfDriving}
                            secondaryTo={learnMoreTo}
                        />
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
