import { CallToAction } from 'components/CallToAction'
import React from 'react'

import { buildCta, CtaSpec } from './deepLink'

interface SecondaryCta {
    href: string
    label: string
}

/** The call to action, from frontmatter. Unlike `TemplateCTAs`, the primary stands alone. */
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
