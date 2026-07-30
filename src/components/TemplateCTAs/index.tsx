import { CallToAction } from 'components/CallToAction'
import React from 'react'

export default function TemplateCTAs({
    urls,
    labels,
}: {
    urls: { primary: string; secondary: string }
    labels?: { primary?: string; secondary?: string }
}) {
    if (!urls?.primary || !urls?.secondary) return null
    return (
        <div className="flex justify-center gap-2">
            <CallToAction href={urls.primary} type="primary">
                {labels?.primary || 'Get started with this template'}
            </CallToAction>
            <CallToAction href={urls.secondary} type="secondary">
                {labels?.secondary || 'Create your own'}
            </CallToAction>
        </div>
    )
}
