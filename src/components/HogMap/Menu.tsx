import React from 'react'
import { Checkbox } from 'components/RadixUI/Checkbox'
import { EventType, PlaceType } from './types'

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
        <div className="absolute bottom-3 left-3 z-10">
            <div className="rounded border border-primary bg-primary px-3 py-2 shadow-sm group cursor-pointer">
                <div className="text-primary dark:text-white font-semibold select-none">Layers</div>
                <div className="hidden group-hover:block mt-2 dark:text-white">
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
                    <div className="mt-3 text-primary dark:text-white font-semibold select-none">Event types</div>
                    <div className="mt-1 space-y-1">
                        {Object.values(EventType).map((et) => (
                            <div key={et} className="flex justify-start items-center gap-2">
                                <Checkbox
                                    id={`event-${et}`}
                                    value={`event-${et}`}
                                    checked={enabledLayers.includes(et)}
                                    onCheckedChange={() => onToggle(et)}
                                />{' '}
                                <label htmlFor={`event-${et}`} className="capitalize">
                                    {et}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="mt-3 text-primary dark:text-white font-semibold select-none">Places</div>
                    <div className="mt-1 space-y-1">
                        {Object.values(PlaceType).map((pt) => (
                            <div key={pt} className="flex justify-start items-center gap-2">
                                <Checkbox
                                    id={`place-${pt}`}
                                    value={`place-${pt}`}
                                    checked={enabledLayers.includes(pt)}
                                    onCheckedChange={() => onToggle(pt)}
                                />{' '}
                                <label htmlFor={`place-${pt}`} className="capitalize">
                                    {pt}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
