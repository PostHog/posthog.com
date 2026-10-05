import React from 'react'
import { IconPlayFilled } from '@posthog/icons'

const PlayOverlay = (): JSX.Element => (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25">
        <div className="flex size-14 items-center justify-center rounded-full border-4 border-white bg-black/70 @md:size-24">
            <IconPlayFilled className="size-7 text-white @md:size-12" />
        </div>
    </div>
)

export default PlayOverlay
