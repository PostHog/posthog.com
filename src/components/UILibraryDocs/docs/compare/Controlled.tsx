import React, { useState } from 'react'
import { Compare } from 'components/UI/Compare'
import { Button } from 'components/UI/Button'

export default function Controlled(): JSX.Element {
    const [value, setValue] = useState(50)
    return (
        <div className="space-y-3">
            <Compare
                value={value}
                onValueChange={setValue}
                label="Compare analytics themes"
                before={{
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/trend_light_9b29b1c254.png',
                    alt: 'PostHog trend chart in light mode',
                }}
                after={{
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/trend_dark_77178b53cb.png',
                    alt: 'PostHog trend chart in dark mode',
                }}
                beforeLabel="Light"
                afterLabel="Dark"
            />
            <Button variant="secondary" size="sm" onClick={() => setValue(50)}>
                Reset comparison
            </Button>
        </div>
    )
}
