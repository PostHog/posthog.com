import React from 'react'
import Markdown from 'components/Markdown'
import { ImageReading1, ImageReading2 } from 'components/Home/Decorations'

export const BedtimeReadingSection = () => (
    <div id="bedtime-reading">
        <h2>Bedtime reading</h2>

        <ImageReading1 />

        <p>Still here? We've got some links that may be mildly interesting to you:</p>

        <ImageReading2 />

        <Markdown>{`- [demo.mov](/demo)
- [Technical docs](/docs)
- [API](/docs/api)
- [Ask a question](/questions)
- [Small teams at PostHog](/teams)`}</Markdown>
    </div>
)

export default BedtimeReadingSection
