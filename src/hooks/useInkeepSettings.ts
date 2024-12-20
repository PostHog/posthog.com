import type { InkeepAIChatSettings, InkeepSearchSettings, InkeepBaseSettings, InkeepModalSettings } from '@inkeep/uikit'

type InkeepSharedSettings = {
    baseSettings: InkeepBaseSettings
    aiChatSettings: InkeepAIChatSettings
    searchSettings: InkeepSearchSettings
    modalSettings: InkeepModalSettings
}

const useInkeepSettings = (): InkeepSharedSettings => {
    const baseSettings: InkeepBaseSettings = {
        apiKey: process.env.GATSBY_INKEEP_API_KEY,
        integrationId: process.env.GATSBY_INKEEP_INTEGRATION_ID,
        organizationId: process.env.GATSBY_INKEEP_ORGANIZATION_ID,
        primaryBrandColor: '#E5E7E0',
        organizationDisplayName: 'PostHog',
        theme: {
            components: {
                AIChatPageWrapper: {
                    defaultProps: {
                        variant: 'no-shadow',
                        size: 'expand',
                    },
                },
            },
        },
    }

    const modalSettings: InkeepModalSettings = {}

    const searchSettings: InkeepSearchSettings = {}

    const aiChatSettings: InkeepAIChatSettings = {
        botAvatarSrcUrl: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1688579513/max_c5dd553db8.png',
        botName: 'Max AI',
        quickQuestions: ['How do I get started?'],
    }

    return { baseSettings, aiChatSettings, searchSettings, modalSettings }
}

export default useInkeepSettings
