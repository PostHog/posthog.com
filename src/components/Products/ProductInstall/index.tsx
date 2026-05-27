import React, { useState } from 'react'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import { CopyableCommand } from 'components/PlatformInstall/CopyableCommand'
import WizardFrameworksTeaser from 'components/WizardFrameworksTeaser'
import InstallFrameworkGrid from 'components/Products/InstallFrameworkGrid'

export interface ProductInstallProps {
    /** TAXONOMY category ids shown in the manual tab (e.g. `['web', 'mobile', 'no-code']`). */
    categories?: string[]
    /** Product slug used to prefer product-specific install guides. */
    productSlug?: string
    /** AI install command. */
    command?: string
    /** Copy shown under the command on the AI tab. */
    aiDescription?: React.ReactNode
    className?: string
}

const DEFAULT_COMMAND = 'npx -y @posthog/wizard@latest'

/**
 * AI-first install UI with a "Manual install" tab that exposes the full
 * framework list. The framework grid is driven by the install taxonomy
 * (`InstallFrameworkGrid`) so the list is never duplicated.
 */
const ProductInstall = ({
    categories,
    productSlug,
    command = DEFAULT_COMMAND,
    aiDescription,
    className = '',
}: ProductInstallProps): JSX.Element => {
    const [tab, setTab] = useState<'ai' | 'manual'>('ai')

    return (
        <div className={`not-prose ${className}`}>
            <div className="mb-6 max-w-xs">
                <ToggleGroup
                    title="Install method"
                    hideTitle
                    value={tab}
                    onValueChange={(value) => value && setTab(value as 'ai' | 'manual')}
                    options={[
                        { label: 'Install with AI', value: 'ai', default: true },
                        { label: 'Manual install', value: 'manual' },
                    ]}
                />
            </div>

            {tab === 'ai' ? (
                <div className="max-w-xl">
                    <p className="text-[15px] font-semibold text-primary m-0 mb-2">Run this command</p>
                    <CopyableCommand command={command} animate className="mb-2" />
                    <WizardFrameworksTeaser />
                    {aiDescription ? (
                        <div className="text-sm text-secondary leading-relaxed mt-4">{aiDescription}</div>
                    ) : null}
                </div>
            ) : (
                <InstallFrameworkGrid categories={categories} productSlug={productSlug} searchable />
            )}
        </div>
    )
}

export default ProductInstall
