import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import Link from 'components/Link'

export default function Merch() {
    return (
        <div>
            <div className="bg-white dark:bg-accent flex flex-col items-center p-4 border border-primary mt-4 mb-0 rounded">
                <h3 className="text-sm text-center italic leading-tight mb-4 font-medium">
                    "This merch store has some of the best company swag I've ever seen"
                </h3>
                {/* quote source: https://posthog.slack.com/archives/C011L071P8U/p1710758940243199 */}

                <Link to="/merch">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/DSC_07383_3265x4897_crop_center_28e2007a77.jpg"
                        alt="PostHog stickers"
                        className="w-full"
                        width={500}
                    />
                </Link>
            </div>
        </div>
    )
}
