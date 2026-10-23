import React from 'react'
import { ScreenshotFrame } from 'components/UI/ScreenshotFrame'

const dashboard = {
    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/dashboard_light_61b3bab3b6.png',
    darkSrc: 'https://res.cloudinary.com/dmukukwp6/image/upload/dashboard_dark_5f2002f750.png',
    alt: 'PostHog product analytics dashboard with trends and charts',
}

export default function Frames(): JSX.Element {
    return (
        <div className="flex flex-col gap-12">
            <ScreenshotFrame
                {...dashboard}
                frame="browser"
                address="us.posthog.com/project/2/dashboard"
                copyAddress
                caption="Browser frame with a copy button in the address bar"
            />
            <ScreenshotFrame {...dashboard} frame="laptop" caption="Laptop frame" />
            <ScreenshotFrame
                frame="phone"
                src="https://res.cloudinary.com/dmukukwp6/image/upload/9000_mobile_bg_light_95ed14e5a3.jpg"
                darkSrc="https://res.cloudinary.com/dmukukwp6/image/upload/9000_mobile_bg_dark_8a84515f2d.jpg"
                alt="The PostHog grass wallpaper on a phone"
                caption="Phone frame"
            />
        </div>
    )
}
