import React, { useState } from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import WistiaEmbed from 'components/WistiaEmbed'
import { useApp } from '../../context/App'

const MERCH_VIDEO_ID = 'dibqzlkov4'
const MERCH_VIDEO_THUMBNAIL =
    'https://res.cloudinary.com/dmukukwp6/image/upload/619447966_8a91ec84_e099_4891_96e9_7bf3790f635c_faaebbb0ed.png'

export default function MerchVideoCard(): React.ReactElement {
    const [isPlaying, setIsPlaying] = useState(false)
    const { websiteMode } = useApp()

    return (
        <div className="col-span-1 @xs:col-span-2 px-2 pt-2 pb-1 border-[1.5px] border-transparent">
            <div className="relative size-full overflow-hidden bg-black">
                {isPlaying ? (
                    <WistiaEmbed mediaId={MERCH_VIDEO_ID} autoPlay className="w-full h-full" />
                ) : (
                    <button
                        type="button"
                        onClick={() => setIsPlaying(true)}
                        className={`w-full h-full block ${websiteMode ? 'cursor-pointer' : 'cursor-default'}`}
                        aria-label="Play merch launch video"
                    >
                        <CloudinaryImage
                            src={MERCH_VIDEO_THUMBNAIL}
                            alt="Merch store launch video"
                            className="w-full h-full"
                            imgClassName="w-full h-full object-cover"
                        />
                    </button>
                )}
            </div>
        </div>
    )
}
