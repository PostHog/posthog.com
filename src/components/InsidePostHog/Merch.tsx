import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import Link from 'components/Link'

export default function Merch() {
    return (
        <div>
            <div className="bg-white dark:bg-accent-dark p-4 border border-light dark:border-dark mt-4 mb-0 rounded">
                {/* quote source: https://posthog.slack.com/archives/C011L071P8U/p1710758940243199 */}
                <h3 className="text-lg text-center italic leading-tight">
                    "Some of the best company swag I've ever seen"
                </h3>

                <Link to="/merch">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/v1715109076/dw.jpg"
                        alt="PostHog t-shirt"
                        className="w-full"
                    />
                </Link>
            </div>
        </div>
    )
}
