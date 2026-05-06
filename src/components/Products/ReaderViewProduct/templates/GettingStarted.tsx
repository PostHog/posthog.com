import React from 'react'
import { SignupCTA } from 'components/SignupCTA'
import ScriptInstallCallout from 'components/ScriptInstallCallout'
import WizardFrameworksTeaser from 'components/WizardFrameworksTeaser'
import type { SectionComponentProps } from '../types'

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

const GettingStarted = ({ id, productData }: SectionComponentProps) => {
    return (
        <section id={id} className="scroll-mt-20 not-prose mb-20">
            <h2 className="text-3xl font-bold text-primary mt-0 mb-3">Get started – free</h2>
            <p className="text-base leading-relaxed m-0 mb-4">
                No credit card required.{' '}
                {productData?.freeLimit && productData?.startsAt && productData?.unit ? (
                    <>
                        You get the{' '}
                        <strong>
                            first {Number(productData.freeLimit).toLocaleString()} {productData.unit}s free every month,
                        </strong>{' '}
                        <span className="inline-block">
                            then pricing starts at{' '}
                            <strong>
                                ${productData.startsAt}/{productData.unit}
                            </strong>{' '}
                            and reduces with volume.
                        </span>
                    </>
                ) : null}
            </p>
            <Compatibility productData={productData} />
            <div className="grid grid-cols-1 @2xl/reader-content:grid-cols-2 gap-4">
                <ScriptInstallCallout
                    title="Install with AI"
                    description="Run this command in your terminal or AI editor."
                    command={INSTALL_COMMAND}
                    footer={<WizardFrameworksTeaser />}
                />
                <div className="border border-primary rounded p-5 bg-primary">
                    <h3 className="text-lg font-bold text-primary mt-0 mb-2">Install without AI</h3>
                    <p className="text-sm text-secondary leading-relaxed m-0 mb-4">
                        Sign up for a free account and follow the install instructions for your stack.
                    </p>
                    <SignupCTA size="md" type="primary" state={{ initialTab: 'signup' }} />
                </div>
            </div>
        </section>
    )
}

export default GettingStarted
