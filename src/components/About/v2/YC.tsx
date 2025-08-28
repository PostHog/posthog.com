import CloudinaryImage from 'components/CloudinaryImage'
import { YCBadge } from '../AboutStory/yc-badge'
import React from 'react'
import { James, Tim } from 'components/Signatures'

export const YC = () => {
    return (
        <aside className="max-w-sm relative @xl:float-right @xl:ml-4 mt-4 @2xl/reader-content-container:-mr-4 @3xl/reader-content-container:-mr-16 @4xl/reader-content-container:-mr-28 mb-6 @xl:mb-0 inline-block transition-all">
            {/* <div className="hidden @xl:flex justify-end text-primary dark:text-primary-dark">
        <YCBadge className="w-[95px] h-[63px]" />
      </div> */}
            <div className="rotate-1">
                <div className="relative shadow-2xl rounded overflow-hidden">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/hn_screenshot_e2819766a4.png"
                        width={574}
                        height={352}
                        alt="PostHog launches on HackerNews"
                    />
                    <div className="bg-gradient-to-b from-transparent via-transparent to-tan dark:to-dark absolute inset-0" />
                    <div className="absolute -bottom-4 right-32 -rotate-1">
                        <CloudinaryImage
                            breakpoints={[750, 1080, 1366, 1920]}
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/About/AboutStory/images/james.png"
                            width={386}
                            height={366}
                            quality={100}
                            alt="James Hawkins, Co-CEO, Co-founder"
                            placeholder="none"
                            objectFit="contain"
                            className="w-36"
                        />
                    </div>
                    <div className="text-primary absolute bottom-4 right-60 leading-tight -rotate-1">
                        <James className="h-12 mb-1" />
                        <strong>James Hawkins</strong>
                        <span className="block text-sm">Co-CEO</span>
                    </div>
                    <div className="absolute -bottom-2 right-16 -rotate-1">
                        <CloudinaryImage
                            breakpoints={[750, 1080, 1366, 1920]}
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/About/AboutStory/images/tim.png"
                            width={285}
                            height={320}
                            quality={100}
                            alt="Tim Glaser, Co-CEO, Co-founder"
                            placeholder="none"
                            objectFit="contain"
                            className="w-28"
                        />
                    </div>
                    <div className="absolute bottom-2 right-2 text-primary leading-tight -rotate-1">
                        <Tim className="h-10 mb-1" />
                        <strong>Tim Glaser</strong>
                        <span className="block text-sm">Co-CEO</span>
                    </div>
                </div>
                <p className="!text-xs text-right pt-2 !mt-1 !mb-0">PostHog was hatched in Y Combinator's W20 batch.</p>
            </div>
        </aside>
    )
}
