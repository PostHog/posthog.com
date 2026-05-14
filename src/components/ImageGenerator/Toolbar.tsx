import React from 'react'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import OSButton from 'components/OSButton'
import { IconDownload, IconCheck } from '@posthog/icons'
import type { Aspect, GeneratorState, TemplateId } from './types'
import { TEMPLATE_LABELS } from './templates'

type Props = {
    state: GeneratorState
    onAspectChange: (aspect: Aspect) => void
    onTemplateChange: (template: TemplateId) => void
    onDownload: () => void
    downloaded: boolean
    downloading: boolean
}

export default function Toolbar({
    state,
    onAspectChange,
    onTemplateChange,
    onDownload,
    downloaded,
    downloading,
}: Props) {
    const templateOptions = Object.entries(TEMPLATE_LABELS).map(([value, label]) => ({ label, value }))

    return (
        <div className="flex items-center justify-between gap-4 border-b border-primary bg-primary p-2 flex-wrap">
            <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                    <label className="text-xs text-secondary uppercase tracking-wide">Template</label>
                    <select
                        value={state.template}
                        onChange={(e) => onTemplateChange(e.target.value as TemplateId)}
                        className="bg-accent border border-primary rounded text-sm px-2 py-1"
                    >
                        {templateOptions.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-xs text-secondary uppercase tracking-wide">Aspect</label>
                    <ToggleGroup
                        title=""
                        hideTitle
                        value={state.aspect}
                        onValueChange={(v) => v && onAspectChange(v as Aspect)}
                        options={[
                            { label: 'Square', value: 'square' },
                            { label: 'Open Graph', value: 'og' },
                        ]}
                    />
                </div>
            </div>
            <div>
                <OSButton
                    variant="primary"
                    size="md"
                    onClick={onDownload}
                    disabled={downloading}
                    icon={downloaded ? <IconCheck /> : <IconDownload />}
                >
                    {downloaded ? 'Downloaded' : downloading ? 'Generating…' : 'Download'}
                </OSButton>
            </div>
        </div>
    )
}
