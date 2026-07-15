import React from 'react'
import WistiaEmbed from 'components/WistiaEmbed'

const MERCH_VIDEO_ID = 'dibqzlkov4'
const MERCH_VIDEO_ASPECT_RATIO = 960 / 402

export default function MerchVideoCard(): React.ReactElement {
    return (
        // `ph-no-deadclick` stops PostHog from flagging clicks on the video player as $dead_click.
        // Play / pause / scrub interactions change playback state without the DOM mutation the
        // dead-click heuristic looks for, so they register as false-positive dead clicks and inflate
        // the merch page's dead-click rate. The class suppresses only dead-click capture (ancestor
        // match against the default ignore list); normal autocapture is unaffected.
        <div className="col-span-full px-2 pt-2 pb-1 border-[1.5px] border-transparent ph-no-deadclick">
            <div className="relative w-full overflow-hidden">
                <WistiaEmbed
                    mediaId={MERCH_VIDEO_ID}
                    aspectRatio={MERCH_VIDEO_ASPECT_RATIO}
                    className="w-full"
                    controlsVisibleOnLoad={false}
                    playerBorderRadius={0}
                />
            </div>
        </div>
    )
}
