import React from 'react'
import { IconRefresh } from '@posthog/icons'

export default function ExhibitResetButton({ onReset }: { onReset: () => void }): JSX.Element {
    return (
        <div className="mb-3 flex justify-end">
            <button
                type="button"
                onClick={onReset}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded border border-[#b8b4ab] bg-[#fffdfa] px-2.5 py-1.5 font-rounded text-xs font-semibold text-[#292724] shadow-sm hover:bg-[#f6f3ed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange"
            >
                <IconRefresh className="size-3.5" aria-hidden="true" />
                Reset
            </button>
        </div>
    )
}
