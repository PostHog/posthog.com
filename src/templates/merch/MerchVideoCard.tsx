import React from 'react'
import WistiaEmbed from 'components/WistiaEmbed'

const MERCH_VIDEO_ID = 'dibqzlkov4'
const MERCH_VIDEO_ASPECT_RATIO = 960 / 402

function MerchVideoCard(): React.ReactElement {
    return (
        <div className="col-span-full px-2 pt-2 pb-1 border-[1.5px] border-transparent">
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

// Memoized so the embedded Wistia player is not re-rendered on unrelated
// storefront interactions (cart open, product panel, panel resize). It takes
// no props, so after the initial mount it never needs to re-render.
export default React.memo(MerchVideoCard)
