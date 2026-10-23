import React from 'react'
import { Compare } from 'components/UI/Compare'

const before = {
    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/dashboard_light_61b3bab3b6.png',
    alt: 'PostHog dashboard in light mode',
}
const after = {
    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/dashboard_dark_5f2002f750.png',
    alt: 'The same PostHog dashboard in dark mode',
}

export default function Directions(): JSX.Element {
    return (
        <div className="space-y-8">
            <Compare
                before={before}
                after={after}
                beforeLabel="Light mode"
                afterLabel="Dark mode"
                label="Compare dashboard themes"
            />
            <Compare
                before={before}
                after={after}
                beforeLabel="Light mode"
                afterLabel="Dark mode"
                orientation="vertical"
                defaultValue={35}
                label="Compare themes from top to bottom"
            />
        </div>
    )
}
