import React from 'react'
import { motion } from 'framer-motion'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { PlaceItem } from './types'
import { getPlaceIcon } from './PlacesMap'

interface PlaceDetailProps {
    place: PlaceItem
    onClose: () => void
}

export default function PlaceDetail({ place, onClose }: PlaceDetailProps) {
    const { icon, colorClass } = getPlaceIcon(place.type, 'size-6')
    const hasCoordinates = place.latitude !== null && place.longitude !== null

    return (
        <motion.div
            initial={{ opacity: 0, translateX: '-50%' }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: '-50%' }}
            transition={{ duration: 0.3 }}
            className="absolute z-30 left-4 top-4 bottom-4 w-96 rounded bg-primary border border-primary shadow-lg z-10 overflow-hidden flex flex-col"
        >
            <button
                onClick={onClose}
                className="absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center rounded hover:bg-accent text-primary hover:text-primary text-xl leading-none"
            >
                ✕
            </button>

            <ScrollArea className="flex-1">
                <div className="p-4">
                    <div className="flex items-start gap-4 mb-6 pr-8">
                        <div
                            className={`flex items-center justify-center w-12 h-12 rounded-full ${colorClass} border-2 border-white shadow-lg flex-shrink-0`}
                        >
                            {icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-xl font-bold mb-1">{place.name}</h2>
                            <div
                                className={`inline-flex items-center gap-1 px-2 py-1 rounded ${colorClass} text-xs font-semibold`}
                            >
                                {place.type}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 text-sm">
                        {place.address && (
                            <div>
                                <div className="text-secondary text-[13px] mb-1">Address</div>
                                <div>{place.address}</div>
                            </div>
                        )}

                        <div className="pt-4 border-t border-primary">
                            <p className="text-[13px] text-secondary italic">Recommended by the PostHog team</p>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </motion.div>
    )
}
