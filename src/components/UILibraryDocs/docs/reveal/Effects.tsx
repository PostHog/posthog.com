import React from 'react'
import { Reveal } from 'components/UI/Reveal'
import { ScreenshotFrame } from 'components/UI/ScreenshotFrame'

export default function Effects(): JSX.Element {
    return (
        <div className="space-y-16">
            {(['fade', 'slide-up', 'scale'] as const).map((effect) => (
                <Reveal key={effect} effect={effect}>
                    <h3 className="mb-3 mt-0">
                        {effect === 'fade'
                            ? 'Explore your dashboard'
                            : effect === 'slide-up'
                            ? 'Find the trend behind the numbers'
                            : 'See the whole picture'}
                    </h3>
                    <ScreenshotFrame
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/dashboard_light_61b3bab3b6.png"
                        darkSrc="https://res.cloudinary.com/dmukukwp6/image/upload/dashboard_dark_5f2002f750.png"
                        alt="PostHog analytics dashboard"
                        caption={`${effect} entrance`}
                    />
                </Reveal>
            ))}
        </div>
    )
}
