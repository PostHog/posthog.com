import React from 'react'
import type { GeneratorState } from '../types'
import Slider from './Slider'

type Props = {
    state: GeneratorState
    onChange: (next: GeneratorState) => void
}

export default function TextControl({ state, onChange }: Props) {
    return (
        <div className="space-y-3">
            <label className="text-xs text-secondary uppercase tracking-wide block">Subtext (HTML, optional)</label>
            <textarea
                value={state.text.content}
                onChange={(e) => onChange({ ...state, text: { ...state.text, content: e.target.value } })}
                rows={3}
                className="w-full bg-accent border border-primary rounded px-2 py-1 text-sm"
                placeholder="Optional supporting text"
            />
            <Slider
                label="Max width"
                value={state.text.maxWidth}
                onChange={(v) => onChange({ ...state, text: { ...state.text, maxWidth: v } })}
                min={30}
                max={100}
                suffix="%"
            />
        </div>
    )
}
