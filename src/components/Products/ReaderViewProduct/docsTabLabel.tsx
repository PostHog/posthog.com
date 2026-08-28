import React from 'react'

import { RenderInClient } from 'components/RenderInClient'

import usePostHog from '../../../hooks/usePostHog'

/** Is "Reference" a better tab name once "Learn" sits beside it? Not to be run with `docs-nav-goals`. */
export const DOCS_TAB_LABEL_FLAG = 'docs-page-tab-labels'

const VARIANT_LABELS: Record<string, string> = {
    control: 'Docs',
    reference: 'Reference',
}

/** What renders during SSR, before flags resolve, and for anyone whose flags are blocked. */
export const DEFAULT_DOCS_TAB_LABEL = VARIANT_LABELS.control

export function resolveDocsTabLabel(variant: string | boolean | undefined): string {
    return (typeof variant === 'string' && VARIANT_LABELS[variant]) || DEFAULT_DOCS_TAB_LABEL
}

function VariantLabel(): JSX.Element {
    const posthog = usePostHog()
    return <>{resolveDocsTabLabel(posthog?.getFeatureFlag?.(DOCS_TAB_LABEL_FLAG))}</>
}

/** The placeholder is the control label, not `null`: a blank tab is worse than a briefly-wrong one. */
export default function DocsTabLabel(): JSX.Element {
    return <RenderInClient placeholder={<>{DEFAULT_DOCS_TAB_LABEL}</>} render={() => <VariantLabel />} />
}
