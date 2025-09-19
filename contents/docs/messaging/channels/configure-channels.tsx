import React from 'react'
import List from 'components/List'

const InstallationPlatforms = () => {
    const platforms = [
        {
            label: 'Email',
            url: '/docs/messaging/channels/email',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/email_channel_dcb0bdadf1.svg',
        },
        {
            label: 'Slack',
            url: '/docs/messaging/channels/slack',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/slack_EDCRACS_4_55ce672831.png',
        },

        {
            label: 'Twilio',
            url: '/docs/messaging/channels/twilio',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/twilio_860042a891.png',
        },
    ]

    return <List className="gap-4 grid sm:grid-cols-2 not-prose mt-8" items={platforms} />
}
export default InstallationPlatforms
