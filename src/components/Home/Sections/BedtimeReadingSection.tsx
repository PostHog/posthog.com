import React from 'react'
import Markdown from 'components/Markdown'
import { ImageReading1, ImageReading2 } from 'components/Home/Decorations'
import CloudinaryImage from 'components/CloudinaryImage'

export const BedtimeReadingSection = () => (
    <div id="bedtime-reading">
        <h2>Bedtime reading</h2>

        <CloudinaryImage
            src="https://res.cloudinary.com/dmukukwp6/image/upload/night_hog_219fff00f3.png"
            className="@lg:float-right max-w-[340px] w-full @lg:ml-12 mb-2 rotate-[5deg]"
        />

        <p>Still here? We've got some links that may be mildly interesting to you:</p>

        <Markdown>{`- [demo.mov](/demo)
- [Technical docs](/docs)
- [API](/docs/api)
- [Ask a question](/questions)
- [Small teams at PostHog](/teams)`}</Markdown>
    </div>
)

export default BedtimeReadingSection
