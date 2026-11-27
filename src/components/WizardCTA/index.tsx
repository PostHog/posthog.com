import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import PlatformInstall from 'components/PlatformInstall'
import { useWindow } from '../../context/Window'
import hedgehogWizard1Png from 'hoggies/wizard-1.png'
import hedgehogWizard2Png from 'hoggies/wizard-2.png'
import hedgehogWizard3Png from 'hoggies/wizard-3.png'
import hedgehogWizard4Png from 'hoggies/wizard-4.png'

const DEFAULT_TITLE = 'Install PostHog with one command'
const DEFAULT_SUBTITLE = 'Paste this into your terminal and make AI do all the work.'
const WIZARD_IMAGES = [hedgehogWizard1Png, hedgehogWizard2Png, hedgehogWizard3Png, hedgehogWizard4Png]
const DEFAULT_IMAGE_ALT = 'PostHog Wizard hedgehog'

/** The same wizard every time on a page, and different wizards across pages. */
function wizardForPath(path = ''): string {
    let hash = 0
    for (const char of path) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
    return WIZARD_IMAGES[hash % WIZARD_IMAGES.length]
}

/**
 * Container-query widths for the image, so it tracks the banner's own width rather than the
 * viewport's — the banner lives inside resizable app windows. Height is left to the image's aspect
 * ratio; a replacement that isn't roughly as wide as it is tall will change the banner's height, so
 * `imageClassName` can override this wholesale.
 */
const DEFAULT_IMAGE_CLASSES = 'w-36 @lg:w-32 @xl:w-40 @2xl:w-48'

/**
 * Wizard install banner for prose (blog posts, docs) and the `/r/*` landing pages.
 *
 * Every piece of copy has a prop defaulting to the value it was previously hard-coded to, so bare
 * `<WizardCTA />` call sites keep rendering exactly what they always have while an author editing a
 * post can retarget it inline. Two levels of control, deliberately:
 *
 * - `command="self-driving"` appends a subcommand, keeping the `-y`/`@latest` pinning on copy.
 * - `fullCommand="npx @posthog/wizard self-driving"` replaces the command outright, shown and copied
 *   verbatim, for when the built form isn't what you want.
 *
 * `PlatformInstall`'s `selfDriving` flag is deliberately not re-exposed here — it is just shorthand
 * for `command="self-driving"`, and two spellings of one thing is a worse API than one.
 *
 * Command assembly itself stays in [`PlatformInstall`](../PlatformInstall) so the displayed and
 * copied strings can't drift.
 */
export default function WizardCTA({
    command,
    fullCommand,
    copyCommand,
    title = DEFAULT_TITLE,
    subtitle = DEFAULT_SUBTITLE,
    image,
    imageAlt,
    imageClassName = DEFAULT_IMAGE_CLASSES,
    learnMoreTo,
    className = '',
}: {
    /** Wizard subcommand appended to the command, e.g. "ai-observability" or "warehouse". */
    command?: string
    /**
     * The entire command, shown and copied verbatim. Overrides `command`/`selfDriving` and skips the
     * `-y`/`@latest` pinning, so include them yourself if you want them.
     */
    fullCommand?: string
    /** Clipboard override, if it should differ from what's displayed. */
    copyCommand?: string
    title?: string
    subtitle?: string
    /** Image URL, replacing the wizard hedgehog (one of four, picked by page). Prefer a transparent PNG. */
    image?: string
    /**
     * Alt text for `image`. Defaults to the hedgehog's alt for the default image and to `''` for a
     * replacement — a swapped-in image is treated as decorative rather than silently inheriting a
     * description of a different picture. Set it whenever the image carries meaning.
     */
    imageAlt?: string
    /** Sizing/positioning classes for the image, replacing the responsive width defaults. */
    imageClassName?: string
    /** "Learn more" link target under the command. Defaults to `/wizard`. */
    learnMoreTo?: string
    className?: string
}): JSX.Element {
    const { appWindow } = useWindow()
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
                            fullCommand={fullCommand}
                            copyCommand={copyCommand}
                            secondaryTo={learnMoreTo}
                        />
                    </div>
                    <div className="shrink-0">
                        <img
                            src={image ?? wizardForPath(appWindow?.path)}
                            alt={imageAlt ?? (image ? '' : DEFAULT_IMAGE_ALT)}
                            className={`object-contain ${imageClassName}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
