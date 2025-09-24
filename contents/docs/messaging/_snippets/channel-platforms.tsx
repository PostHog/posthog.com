import React from 'react'
import List from 'components/List'

const ChannelPlatforms = () => {
    const platforms = [
        {
            label: 'Email',
            url: '/docs/messaging/configure-channels?tab=Email',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/email_channel_dcb0bdadf1.svg',
        },
        {
            label: 'Slack',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/slack_EDCRACS_4_55ce672831.png',
            badge: 'Coming soon',
        },

        {
            label: 'Twilio',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/twilio_860042a891.png',
            badge: 'Coming soon',
        },
    ]

    return <List className="gap-4 grid sm:grid-cols-2 not-prose mt-8" items={platforms} />
}
export default ChannelPlatforms
