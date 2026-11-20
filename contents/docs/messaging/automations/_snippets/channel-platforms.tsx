import React from 'react'
import List from 'components/List'

const ChannelPlatforms = () => {
    const platforms = [
        {
            label: 'Email',
            url: '/docs/messaging/verify-domain',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/email_channel_dcb0bdadf1.svg',
        },
        {
            label: 'Slack',
            url: '/docs/messaging/automations/workflow-builder?tab=Slack',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/slack_EDCRACS_4_55ce672831.png',
        },

        {
            label: 'Twilio',
            url: '/docs/messaging/automations/workflow-builder?tab=Twilio',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/twilio_860042a891.png',
        },
        {
            label: 'Push',
            url: '/docs/messaging/push-notifications#set-up-a-push-channel',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/push_8ac7759b08.svg',
        },
    ]

    return <List className="gap-4 grid sm:grid-cols-2 not-prose mt-8" items={platforms} />
}
export default ChannelPlatforms
