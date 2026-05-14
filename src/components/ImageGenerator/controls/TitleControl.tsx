import React from 'react'
import type { GeneratorState } from '../types'
import Slider from './Slider'

type Props = {
    state: GeneratorState
    onChange: (next: GeneratorState) => void
}

export default function TitleControl({ state, onChange }: Props) {
    return (
        <div className="space-y-3">
            <label className="text-xs text-secondary uppercase tracking-wide block">Content (HTML)</label>
            <textarea
                value={state.title.content}
                onChange={(e) => onChange({ ...state, title: { ...state.title, content: e.target.value } })}
                rows={2}
                className="w-full bg-accent border border-primary rounded px-2 py-1 text-sm"
                placeholder="Event title"
            />
            <p className="text-xs text-secondary">
                Use <code>&lt;span class="text-red"&gt;</code> to emphasize parts, <code>&lt;br /&gt;</code> for line
                breaks.
            </p>
            <Slider
                label="Max width"
                value={state.title.maxWidth}
                onChange={(v) => onChange({ ...state, title: { ...state.title, maxWidth: v } })}
                min={30}
                max={100}
                suffix="%"
            />
        </div>
    )
}
