import React, { useState } from 'react'
import { IconCheck, IconCopy } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { SignupCTA } from 'components/SignupCTA'
import { useToast } from '../../../../context/Toast'
import { SectionComponentProps } from '../types'

const INSTALL_COMMAND = 'npx -y @posthog/wizard@latest'

/** Renders `productData.compatibility` (e.g. supported platforms on Session Replay). */
const Compatibility = ({ productData }: { productData: any }) => {
    const compatibility = productData?.compatibility
    if (!compatibility) return null

    const heading = compatibility.headline || compatibility.title

    return (
        <div className="mb-8">
            {heading ? <h3 className="text-lg font-bold text-primary mt-0 mb-2">{heading}</h3> : null}
            {compatibility.description ? (
                <p className="text-base text-secondary leading-relaxed m-0 mb-4">{compatibility.description}</p>
            ) : null}
            {compatibility.children}
        </div>
    )
}

/** Renders `productData.mcp` (Session Replay MCP install + bullets). */
const ProductMcp = ({ productData }: { productData: any }) => {
    const mcp = productData?.mcp
    if (!mcp) return null

    const heading = mcp.headline || mcp.title

    return (
        <div className="mb-8">
            {heading ? <h3 className="text-lg font-bold text-primary mt-0 mb-2">{heading}</h3> : null}
            {mcp.description ? (
                typeof mcp.description === 'string' ? (
                    <p className="text-base text-secondary leading-relaxed m-0 mb-4">{mcp.description}</p>
                ) : (
                    <div className="text-base text-secondary leading-relaxed mb-4">{mcp.description}</div>
                )
            ) : null}
            {mcp.features && mcp.features.length > 0 ? (
                <ul className="m-0 mb-4 pl-4 space-y-2 list-disc text-base text-secondary">
                    {mcp.features.map((item: { title: string; description?: React.ReactNode }) => (
                        <li key={item.title}>
                            <strong className="text-primary">{item.title}</strong>
                            {item.description != null && item.description !== '' ? <> — {item.description}</> : null}
                        </li>
                    ))}
                </ul>
            ) : null}
            {mcp.children}
        </div>
    )
}

const GettingStarted = ({ id, productData }: SectionComponentProps) => {
    const [justCopied, setJustCopied] = useState(false)
    const { addToast } = useToast()

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(INSTALL_COMMAND)
            setJustCopied(true)
            addToast({ description: 'Code copied to clipboard!', duration: 3000 })
            setTimeout(() => setJustCopied(false), 3000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="text-3xl font-bold text-primary mt-0 mb-3">Get started</h2>
            <p className="text-base text-secondary leading-relaxed m-0 mb-4">
                Try {productData?.name} for free — no credit card required.
            </p>
            <Compatibility productData={productData} />
            <div className="grid grid-cols-1 @md:grid-cols-2 gap-4">
                <div className="border border-primary rounded p-5 bg-primary">
                    <h3 className="text-lg font-bold text-primary mt-0 mb-2">Install with AI</h3>
                    <p className="text-sm text-secondary leading-relaxed m-0 mb-3">
                        In your terminal or AI editor (Cursor, Claude Code, etc.), run:
                    </p>
                    <div className="flex items-center gap-1 bg-accent rounded p-2">
                        <code className="text-sm flex-1 truncate">{INSTALL_COMMAND}</code>
                        <OSButton size="xs" onClick={handleCopy} aria-label="Copy to clipboard">
                            {justCopied ? <IconCheck className="size-4 text-green" /> : <IconCopy className="size-4" />}
                        </OSButton>
                    </div>
                    <p className="text-xs text-secondary m-0 mt-2">
                        Supports Next.js, React, React Native, Svelte, and Astro.
                    </p>
                </div>
                <div className="border border-primary rounded p-5 bg-primary">
                    <h3 className="text-lg font-bold text-primary mt-0 mb-2">Install without AI</h3>
                    <p className="text-sm text-secondary leading-relaxed m-0 mb-4">
                        Sign up for a free account and follow the install instructions for your stack.
                    </p>
                    <SignupCTA size="md" type="primary" state={{ initialTab: 'signup' }} />
                </div>
            </div>
            <ProductMcp productData={productData} />
        </section>
    )
}

export default GettingStarted
