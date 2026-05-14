import React, { useState } from 'react'
import type { GeneratorState, ImageSource } from '../types'
import Slider from './Slider'
import PersonPicker from '../sources/PersonPicker'
import LibraryBrowser from '../sources/LibraryBrowser'
import CloudinaryUpload from '../sources/CloudinaryUpload'

type Props = {
    state: GeneratorState
    onChange: (next: GeneratorState) => void
}

const TABS: Array<{ value: ImageSource; label: string }> = [
    { value: 'person', label: 'Person' },
    { value: 'library', label: 'Library' },
    { value: 'upload', label: 'Upload' },
]

export default function ImageControl({ state, onChange }: Props) {
    const [tab, setTab] = useState<ImageSource>(state.image.source || 'person')

    return (
        <div className="space-y-3">
            <div className="flex gap-1 border border-primary rounded p-1 bg-primary">
                {TABS.map((t) => (
                    <button
                        key={t.value as string}
                        type="button"
                        onClick={() => setTab(t.value)}
                        className={`flex-1 text-xs py-1 rounded ${
                            tab === t.value ? 'bg-accent font-bold' : 'hover:bg-accent/50'
                        }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {tab === 'person' && <PersonPicker state={state} onChange={onChange} />}
            {tab === 'library' && <LibraryBrowser state={state} onChange={onChange} />}
            {tab === 'upload' && <CloudinaryUpload state={state} onChange={onChange} />}

            {state.image.source && (
                <div className="space-y-2 pt-2 border-t border-primary">
                    <Slider
                        label="Size"
                        value={state.image.size}
                        onChange={(v) => onChange({ ...state, image: { ...state.image, size: v } })}
                        min={20}
                        max={200}
                        suffix="%"
                    />
                    <Slider
                        label="X offset"
                        value={state.image.x}
                        onChange={(v) => onChange({ ...state, image: { ...state.image, x: v } })}
                        min={-400}
                        max={400}
                        suffix="px"
                    />
                    <Slider
                        label="Y offset"
                        value={state.image.y}
                        onChange={(v) => onChange({ ...state, image: { ...state.image, y: v } })}
                        min={-400}
                        max={400}
                        suffix="px"
                    />
                    <Slider
                        label="Rotation"
                        value={state.image.rotation}
                        onChange={(v) => onChange({ ...state, image: { ...state.image, rotation: v } })}
                        min={-180}
                        max={180}
                        suffix="°"
                    />
                </div>
            )}
        </div>
    )
}
