import React, { useRef, useState } from 'react'
import { IconPlus, IconTrash } from '@posthog/icons'
import type { GeneratorState, LogoColor, LogoEntry, LogoType, LogoVariant } from '../types'
import Slider from './Slider'
import { useCloudinaryUpload } from '../hooks/useCloudinaryUpload'

type Props = {
    state: GeneratorState
    onChange: (next: GeneratorState) => void
}

function newLogo(): LogoEntry {
    return {
        id: `logo-${Date.now()}-${Math.floor(Math.random() * 999)}`,
        type: 'posthog',
        variant: 'landscape',
        color: 'mono-white',
        sizePx: 120,
    }
}

export default function LogosControl({ state, onChange }: Props) {
    const updateLogo = (id: string, patch: Partial<LogoEntry>) => {
        onChange({
            ...state,
            logos: state.logos.map((l) => (l.id === id ? { ...l, ...patch } : l)),
        })
    }
    const removeLogo = (id: string) => {
        onChange({ ...state, logos: state.logos.filter((l) => l.id !== id) })
    }
    const addLogo = () => {
        onChange({ ...state, logos: [...state.logos, newLogo()] })
    }

    return (
        <div className="space-y-3">
            <div className="space-y-2">
                <label className="text-xs text-secondary uppercase tracking-wide block">Placement</label>
                <div className="flex gap-1 border border-primary rounded p-1 bg-primary">
                    {(['inline', 'overlay'] as const).map((p) => (
                        <button
                            key={p}
                            type="button"
                            onClick={() => onChange({ ...state, logoPlacement: p })}
                            className={`flex-1 text-xs py-1 rounded capitalize ${
                                state.logoPlacement === p ? 'bg-accent font-bold' : 'hover:bg-accent/50'
                            }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="text-xs text-secondary uppercase tracking-wide block mb-1">Direction</label>
                    <select
                        value={state.logoArrangement.direction}
                        onChange={(e) =>
                            onChange({
                                ...state,
                                logoArrangement: {
                                    ...state.logoArrangement,
                                    direction: e.target.value as 'row' | 'col',
                                },
                            })
                        }
                        className="w-full bg-accent border border-primary rounded text-sm px-2 py-1"
                    >
                        <option value="row">Row</option>
                        <option value="col">Column</option>
                    </select>
                </div>
                <Slider
                    label="Gap"
                    value={state.logoArrangement.gap}
                    onChange={(v) => onChange({ ...state, logoArrangement: { ...state.logoArrangement, gap: v } })}
                    min={0}
                    max={120}
                    suffix="px"
                />
            </div>

            <div className="space-y-3 pt-2 border-t border-primary">
                {state.logos.map((logo, idx) => (
                    <div key={logo.id} className="border border-primary rounded p-2 space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase">Logo {idx + 1}</span>
                            <button
                                type="button"
                                onClick={() => removeLogo(logo.id)}
                                className="text-red hover:opacity-70"
                                aria-label="Remove logo"
                            >
                                <IconTrash className="size-4" />
                            </button>
                        </div>
                        <select
                            value={logo.type}
                            onChange={(e) => updateLogo(logo.id, { type: e.target.value as LogoType })}
                            className="w-full bg-accent border border-primary rounded text-sm px-2 py-1"
                        >
                            <option value="posthog">PostHog logo</option>
                            <option value="svg">Paste SVG</option>
                            <option value="upload">Upload image</option>
                        </select>

                        {logo.type === 'posthog' && (
                            <div className="grid grid-cols-2 gap-2">
                                <select
                                    value={logo.variant}
                                    onChange={(e) => updateLogo(logo.id, { variant: e.target.value as LogoVariant })}
                                    className="w-full bg-accent border border-primary rounded text-sm px-2 py-1"
                                >
                                    <option value="landscape">Landscape</option>
                                    <option value="stacked">Stacked</option>
                                </select>
                                <select
                                    value={logo.color}
                                    onChange={(e) => updateLogo(logo.id, { color: e.target.value as LogoColor })}
                                    className="w-full bg-accent border border-primary rounded text-sm px-2 py-1"
                                >
                                    <option value="mono-white">Mono (white)</option>
                                    <option value="mono-black">Mono (black)</option>
                                    <option value="gradient">Gradient</option>
                                </select>
                            </div>
                        )}

                        {logo.type === 'svg' && (
                            <textarea
                                value={logo.svg || ''}
                                onChange={(e) => updateLogo(logo.id, { svg: e.target.value })}
                                placeholder="Paste <svg>...</svg> markup"
                                rows={3}
                                className="w-full bg-accent border border-primary rounded text-xs font-mono px-2 py-1"
                            />
                        )}

                        {logo.type === 'upload' && (
                            <UploadInline
                                value={logo.uploadUrl}
                                onChange={(url) => updateLogo(logo.id, { uploadUrl: url })}
                            />
                        )}

                        <Slider
                            label="Size"
                            value={logo.sizePx}
                            onChange={(v) => updateLogo(logo.id, { sizePx: v })}
                            min={40}
                            max={400}
                            suffix="px"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addLogo}
                    className="w-full text-sm flex items-center justify-center gap-1 border border-dashed border-primary rounded py-2 hover:bg-accent"
                >
                    <IconPlus className="size-4" />
                    Add logo
                </button>
            </div>
        </div>
    )
}

function UploadInline({ value, onChange }: { value?: string; onChange: (url: string) => void }) {
    const inputRef = useRef<HTMLInputElement>(null)
    const { upload, uploading } = useCloudinaryUpload()
    const [error, setError] = useState<string | null>(null)

    const onFile = async (file: File) => {
        setError(null)
        try {
            const url = await upload(file)
            onChange(url)
        } catch (e: any) {
            setError(e?.message || 'Upload failed')
        }
    }

    return (
        <div className="space-y-1">
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
                className="text-xs"
            />
            {uploading && <p className="text-xs text-secondary">Uploading…</p>}
            {error && <p className="text-xs text-red">{error}</p>}
            {value && <img src={value} alt="" className="max-h-12 mt-1" />}
        </div>
    )
}
