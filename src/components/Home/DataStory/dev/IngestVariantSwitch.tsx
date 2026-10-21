import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import MarbleRun from '../Ingest/MarbleRun'
import EventBoard from '../Ingest/EventBoard'

const PARAM = 'step-1'
const VARIANTS = ['marble', 'table'] as const
type Variant = (typeof VARIANTS)[number]

const readVariant = (): Variant => {
    const fromUrl = new URLSearchParams(window.location.search).get(PARAM)
    return VARIANTS.find((variant) => variant === fromUrl) ?? VARIANTS[0]
}

const writeVariant = (variant: Variant): void => {
    const url = new URL(window.location.href)
    if (variant === VARIANTS[0]) url.searchParams.delete(PARAM)
    else url.searchParams.set(PARAM, variant)
    window.history.replaceState(null, '', url.toString())
}

export default function IngestVariantSwitch(): JSX.Element {
    const [variant, setVariant] = useState<Variant>(VARIANTS[0])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        setVariant(readVariant())
    }, [])

    const toggle = () => {
        const next = variant === 'marble' ? 'table' : 'marble'
        writeVariant(next)
        setVariant(next)
    }

    return (
        <>
            {variant === 'table' ? <EventBoard /> : <MarbleRun />}
            {mounted &&
                createPortal(
                    <button
                        type="button"
                        onClick={toggle}
                        className="fixed bottom-3 right-3 z-[99999] rounded-full border border-primary bg-primary px-2.5 py-1 font-mono text-[11px] text-primary shadow-lg"
                    >
                        step 1 · {variant}
                    </button>,
                    document.body
                )}
        </>
    )
}
