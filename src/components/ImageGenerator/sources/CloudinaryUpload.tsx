import React, { useRef, useState } from 'react'
import type { GeneratorState } from '../types'
import { useCloudinaryUpload } from '../hooks/useCloudinaryUpload'

type Props = {
    state: GeneratorState
    onChange: (next: GeneratorState) => void
}

export default function CloudinaryUpload({ state, onChange }: Props) {
    const inputRef = useRef<HTMLInputElement>(null)
    const { upload, uploading } = useCloudinaryUpload()
    const [error, setError] = useState<string | null>(null)

    const handleFile = async (file: File) => {
        setError(null)
        try {
            const url = await upload(file)
            onChange({
                ...state,
                image: { ...state.image, source: 'upload', uploadUrl: url },
            })
        } catch (e: any) {
            setError(e?.message || 'Upload failed')
        }
    }

    return (
        <div className="space-y-2">
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="w-full border border-dashed border-primary rounded p-4 text-sm hover:bg-accent disabled:opacity-50"
            >
                {uploading ? 'Uploading…' : 'Choose image to upload'}
            </button>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                className="hidden"
            />
            {error && <p className="text-xs text-red">{error}</p>}
            {state.image.uploadUrl && state.image.source === 'upload' && (
                <img src={state.image.uploadUrl} alt="" className="max-h-32 mx-auto" />
            )}
        </div>
    )
}
