import { CallToAction } from 'components/CallToAction'
import React from 'react'

import { buildCta, CtaSpec } from './deepLink'

interface SecondaryCta {
    href: string
    label: string
}

/**
 * A template's call to action, built from frontmatter.
 *
 * Replaces `components/TemplateCTAs`, which returned null unless both buttons were present – so a
 * template with one honest CTA rendered none. Here the primary stands alone, and an unbuildable
 * primary drops to the secondary rather than taking the whole block down with it.
 */
export default function TemplateCTA({
    cta,
    secondary,
}: {
    cta?: CtaSpec | null
    secondary?: SecondaryCta | null
}): JSX.Element | null {
    const primary = buildCta(cta)

    if (!primary && !secondary) {
        return null
    }

    return (
        <div className="flex flex-col items-center gap-2 @[500px]:flex-row @[500px]:justify-center">
            {primary && (
                <CallToAction href={primary.href} type="primary" externalNoIcon>
                    {primary.label}
                </CallToAction>
            )}
            {secondary && (
                <CallToAction href={secondary.href} type={primary ? 'secondary' : 'primary'}>
                    {secondary.label}
                </CallToAction>
            )}
        </div>
    )
}

export { buildCta } from './deepLink'
export type { CtaKind, CtaSpec, ResolvedCta } from './deepLink'
