import type { InkeepAIChatSettings, InkeepBaseSettings } from '@inkeep/uikit'
import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'

type InkeepSharedSettings = {
    baseSettings: InkeepBaseSettings
    aiChatSettings: InkeepAIChatSettings
}

export const defaultQuickQuestions = [
    "Why isn't my data showing up?",
    'How do I set up a reverse proxy?',
    'How do I identify users?',
    'What are person profiles and how are they billed?',
]

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
            stylesheetUrls: ['/styles/inkeep.css'],
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
        customIcons: {
            chatSubmit: { custom: '/icons/return.svg' },
        },
        optOutAnalyticalCookies: true,
        optOutAllAnalytics: true,
        optOutFunctionalCookies: true,
    }

    const aiChatSettings: InkeepAIChatSettings = {
        botAvatarSrcUrl: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1688579513/max_c5dd553db8.png',
        botName: 'Max AI',
        quickQuestions: defaultQuickQuestions,
        shouldHighlightFirstQuickQuestion: false,
    }

    return { baseSettings, aiChatSettings }
}

export default useInkeepSettings
