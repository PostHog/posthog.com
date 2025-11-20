import React from 'react'
import { Checkbox } from 'components/RadixUI/Checkbox'

export default function Menu({
    enabledLayers,
    onToggle,
    ids,
}: {
    enabledLayers: string[]
    onToggle: (layerId: string) => void
    ids: { people: string; upcoming: string; past: string }
}): JSX.Element {
    return (
        <div className="absolute top-3 left-3 z-10">
            <div className="rounded border border-primary bg-primary px-3 py-2 shadow-sm">
                <div className="dark:text-white">
                    Layers:
                    <div className="flex flex-row justify-start items-center gap-2 my-1">
                        <Checkbox
                            id="people"
                            value="people"
                            checked={enabledLayers.includes(ids.people)}
                            onCheckedChange={() => onToggle(ids.people)}
                        />{' '}
                        <label htmlFor="people">People</label>
                    </div>
                    <div className="flex justify-start items-center gap-2 my-1">
                        <Checkbox
                            id="events-upcoming"
                            value="events-upcoming"
                            checked={enabledLayers.includes(ids.upcoming)}
                            onCheckedChange={() => onToggle(ids.upcoming)}
                        />{' '}
                        <label htmlFor="events-upcoming">Upcoming events</label>
                    </div>
                    <div className="flex justify-start items-center gap-2 my-1">
                        <Checkbox
                            id="events-past"
                            value="events-past"
                            checked={enabledLayers.includes(ids.past)}
                            onCheckedChange={() => onToggle(ids.past)}
                        />{' '}
                        <label htmlFor="events-past">Past events</label>
                    </div>
                </div>
            </div>
        </div>
    )
}
