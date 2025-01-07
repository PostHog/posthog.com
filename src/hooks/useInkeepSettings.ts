import type { InkeepAIChatSettings, InkeepSearchSettings, InkeepBaseSettings, InkeepModalSettings } from '@inkeep/uikit'
import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'

const inkeepStyleString = '.ikp-ai-chat__header {display: none;} b, strong {font-variation-settings: "wght" 800;}'
const encodedStyles = encodeURIComponent(inkeepStyleString)
const stylesheetLink = `data:text/css;charset=UTF-8,${encodedStyles}`

type InkeepSharedSettings = {
    baseSettings: InkeepBaseSettings
    aiChatSettings: InkeepAIChatSettings
    searchSettings: InkeepSearchSettings
    modalSettings: InkeepModalSettings
}

const useInkeepSettings = (): InkeepSharedSettings => {
    const { websiteTheme } = useValues(layoutLogic)
    const baseSettings: InkeepBaseSettings = {
        apiKey: process.env.GATSBY_INKEEP_API_KEY,
        integrationId: process.env.GATSBY_INKEEP_INTEGRATION_ID,
        organizationId: process.env.GATSBY_INKEEP_ORGANIZATION_ID,
        primaryBrandColor: '#E5E7E0',
        organizationDisplayName: 'PostHog',
        colorMode: {
            forcedColorMode: websiteTheme === 'dark' ? 'dark' : 'light',
        },
        theme: {
            stylesheetUrls: [stylesheetLink],
            components: {
                AIChatPageWrapper: {
                    defaultProps: {
                        variant: 'no-shadow',
                        size: 'expand',
                    },
                },
            },
            tokens: {
                fonts: {
                    heading: "'MatterVF', sans-serif",
                    body: "'MatterVF', sans-serif",
                    mono: "'Source Code Pro', 'Menlo', 'Consolas', 'monaco', 'monospace'",
                },
            },
        },
    }

    const modalSettings: InkeepModalSettings = {}

    const searchSettings: InkeepSearchSettings = {}

    const aiChatSettings: InkeepAIChatSettings = {
        botAvatarSrcUrl: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1688579513/max_c5dd553db8.png',
        botName: 'Max AI',
        quickQuestions: [
            'How do I track events?',
            'How do I identify users?',
            'Help debug sending data',
            'How does autocapture work?',
        ],
    }

    return { baseSettings, aiChatSettings, searchSettings, modalSettings }
}

export default useInkeepSettings
