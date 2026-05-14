import React from 'react'
import type { GeneratorState } from '../types'

type Props = {
    state: GeneratorState
    onChange: (next: GeneratorState) => void
}

export default function EventControl({ state, onChange }: Props) {
    const ev = state.event || { showCalendar: true }
    const update = (patch: Partial<NonNullable<GeneratorState['event']>>) =>
        onChange({ ...state, event: { ...ev, ...patch } })

    return (
        <div className="space-y-3">
            <div>
                <label className="text-xs text-secondary uppercase tracking-wide block mb-1">Date</label>
                <input
                    type="date"
                    value={ev.date || ''}
                    onChange={(e) => update({ date: e.target.value || undefined })}
                    className="w-full bg-accent border border-primary rounded px-2 py-1 text-sm"
                />
            </div>
            <div>
                <label className="text-xs text-secondary uppercase tracking-wide block mb-1">Time</label>
                <input
                    type="time"
                    value={ev.time || ''}
                    onChange={(e) => update({ time: e.target.value || undefined })}
                    className="w-full bg-accent border border-primary rounded px-2 py-1 text-sm"
                />
            </div>
            <label className="flex items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    checked={ev.showCalendar}
                    onChange={(e) => update({ showCalendar: e.target.checked })}
                />
                Show calendar tile
            </label>
        </div>
    )
}
