import React from 'react'
import { ScreenshotFrame } from 'components/UI/ScreenshotFrame'

export default function Zoom(): JSX.Element {
    return (
        <ScreenshotFrame
            src="https://res.cloudinary.com/dmukukwp6/image/upload/trend_light_9b29b1c254.png"
            darkSrc="https://res.cloudinary.com/dmukukwp6/image/upload/trend_dark_77178b53cb.png"
            alt="A PostHog insight with the data warehouse table picker open"
            zoom
            caption="Select the screenshot to read its small labels. Press Escape to close it."
        />
    )
}
