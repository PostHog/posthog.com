import type { InkeepAIChatSettings, InkeepBaseSettings } from '@inkeep/cxkit-react'
import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'
import { useEffect, useState } from 'react'
type InkeepSharedSettings = {
    baseSettings: InkeepBaseSettings
    aiChatSettings: InkeepAIChatSettings
    setBaseSettings: (baseSettings: InkeepBaseSettings) => void
    setAiChatSettings: (aiChatSettings: InkeepAIChatSettings) => void
}

export const defaultQuickQuestions = [
    "Why isn't my data showing up?",
    'How do I set up a reverse proxy?',
    'How do I identify users?',
    'What are person profiles and how are they billed?',
]

const defaultBaseSettings: InkeepBaseSettings = {
    apiKey: process.env.GATSBY_INKEEP_API_KEY,
    primaryBrandColor: '#E5E7E0',
    organizationDisplayName: 'PostHog',
    colorMode: {
        sync: {
            target: typeof document !== 'undefined' ? document.body : null,
            attributes: ['class'],
            isDarkMode: (attrs) => attrs['class']?.includes('dark') ?? false,
        },
    },
    theme: {
        disableLoadingDefaultFont: true,
        styles: [
            {
                key: 'google-fonts',
                type: 'link',
                value: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&display=swap',
            },
            {
                key: 'custom-theme',
                type: 'style',
                value: `
.ikp-ai-chat__header {
display: none;
}

b, 
strong, 
.ikp-message-header__name {
font-variation-settings: "wght" 800;
}

.ikp-ai-chat-message-wrapper {
}

.ikp-ai-chat-message-loading {
background: url(https://res.cloudinary.com/dmukukwp6/image/upload/loading_bdba47912e.gif) no-repeat center center;
background-size: 100%;
height: 3rem;
margin-left: -.5rem;
width: 3rem;
}

.ikp-ai-chat-message-loading span {
display: none;
}

.ikp-ai-chat-footer__content-wrapper {
padding-top: .5rem;
}

.ikp-ai-chat__message-box {
border-radius: .25rem;
border-style: solid;
border-width: 1px;
box-shadow: none;
padding: 0;

[data-theme="light"] & {
    background: #E5E7E0;
    border-color: #E5E7E0;

    &:hover {
        border-color: rgba(0,0,0,.25);
    }

    &:focus-within {
        border-color: rgba(0,0,0,.5);
    }
}

[data-theme="dark"] & {
    background: #232429;
    border-color: #4A4C52;

    &:hover {
        border-color: rgba(255,255,255,.5);
    }

    &:focus-within {
        border-color: rgba(255,255,255,.75);
    }
}
}

.ikp-ai-chat__message-input {
font-size: 15px;
}

.ikp-ai-chat__send-button {
border-radius: .25rem;
border-style: solid;
border-width: 1.5px;
flex: 0 0 28px;
margin: .25rem .25rem calc(.25rem + 1px);
min-height: 28px;
padding: .25rem;
min-width: 28px;
width: 28px;
}

.ikp-ai-chat__send-button:not(:disabled) {
border-bottom-width: 2.5px;

[data-theme="light"] & {
    border-color: rgba(0,0,0,.5);
    color: rgba(0,0,0,.5);
}
[data-theme="dark"] & {
    border-color: rgba(255,255,255,.5);
    color: rgba(255,255,255,.75);
}
}

.ikp-ai-chat__send-button:disabled {
[data-theme="light"] & {
    border-color: rgba(0,0,0,.3);
    color: rgba(0,0,0,.3);
}
[data-theme="dark"] & {
    border-color: #4A4C52;
    color: #4A4C52;
}
}

.ikp-ai-chat__send-button:hover {
top: -.5px;
}

.ikp-ai-chat__send-button:active {
top: .5px;
}

.ikp-ai-chat__send-icon {
transform: rotate(0deg);
}

.ikp-ai-chat-input__send-button-icon {
transform: none !important;
}

.ikp-messages__wrapper > div:first-child {
padding-bottom: 0;
}

.ikp-chat-bubble__wrapper {
padding-top: 1rem;
padding-bottom: 0;
}

.ikp-message-header {
margin-bottom: .5rem;
}

.community-suggestion {
border-width: 1px;
border-style: solid;
border-radius: .25rem; 
font-size: .875rem; 
padding: .5rem;
[data-theme="light"] & {
    border-color: #D0D1C9;
    background: #EEEFE9;
}
[data-theme="dark"] & {
    border-color: #4A4C52;
    background: #1d1f27;
}
}

.ikp-chat-bubble__message-actions {
margin-bottom: -1.5rem;
}

/* sources container */
.ikp-d_block .ikp-d_flex.ikp-items_center.ikp-gap_3.ikp-flex_column {
gap: 0;
}

.ikp-citation-sources-header {
font-size: .875rem;
margin: 0;
position: relative;
top: -.25rem;
}

.ikp-d_block .ikp-d_flex.ikp-items_center > a:not(:last-child) {
border-bottom-width: 1px;
border-bottom-style: solid;
border-radius: 0;
padding: 0;

[data-theme="light"] & {
    border-bottom-color: #D0D1C9;
}
[data-theme="dark"] & {
    border-bottom-color: #4A4C52;
}
}



a.ikp-result-card {

}

.ikp-result-card__container {
border: none;
padding: 0;
}

.ikp-result-card__container--focused {
background: transparent;
}

.ikp-result-card__container--focused .ikp-search-result-line__first .ikp-preview-content {
text-decoration: underline;
} 

.ikp-result-card__body {
padding: .25rem 0;
}

.ikp-result-card__body .ikp-d_flex.ikp-items_center.ikp-gap_3 {
gap: .5rem;
}
.ikp-ai-chat-wrapper {
    box-shadow: none !important;
}
.ikp-ai-chat-wrapper {
    width: 100% !important;
    max-height: initial !important;
    border-radius: 0 !important;
}

/* User message code block styling */
.ikp-chat-bubble__wrapper[data-role="user"] .ikp-ai-chat-message-content {
    white-space: pre-wrap;
    font-family: inherit;
}

.ikp-chat-bubble__wrapper[data-role="user"] .ikp-ai-chat-message-content .ikp-codeblock-container,
.ikp-chat-bubble__wrapper[data-role="user"] .ikp-ai-chat-message-content pre,
.ikp-chat-bubble__wrapper[data-role="user"] .ikp-ai-chat-message-content code {
    font-family: 'Source Code Pro', 'Menlo', 'Consolas', 'monaco', monospace;
    font-size: 0.875rem;
    border-radius: 0.25rem;
    padding: 0.75rem 1rem;
    overflow-x: auto;
    display: block;
    margin-top: 0.5rem;

    [data-theme="light"] & {
        background: #f1f3f0;
        border: 1px solid #D0D1C9;
    }
    [data-theme="dark"] & {
        background: #1d1f27;
        border: 1px solid #4A4C52;
    }
}

/* AI response code block styling */
.ikp-codeblock-container {
    border-radius: 6px;
    margin: 12px 0;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    font-family: 'Source Code Pro', 'Menlo', 'Consolas', 'Monaco', monospace;

    [data-theme="light"] & {
        border: 1px solid #e5e7eb;
    }
    [data-theme="dark"] & {
        border: 1px solid #374151;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    }
}

.ikp-codeblock-header {
    padding: 8px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 36px;

    [data-theme="light"] & {
        background: #f9fafb;
        border-bottom: 1px solid #e5e7eb;
    }
    [data-theme="dark"] & {
        background: #1f2937;
        border-bottom: 1px solid #374151;
    }
}

.ikp-codeblock-header-language {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    [data-theme="light"] & {
        color: #6b7280;
    }
    [data-theme="dark"] & {
        color: #9ca3af;
    }
}

.ikp-codeblock-copy-button {
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    transition: all 0.2s;
    cursor: pointer;

    [data-theme="light"] & {
        border: 1px solid #d1d5db;
        background: white;
        color: #4b5563;

        &:hover {
            background: #f3f4f6;
            border-color: #9ca3af;
        }
    }
    [data-theme="dark"] & {
        background: #374151;
        border: 1px solid #4b5563;
        color: #d1d5db;

        &:hover {
            background: #4b5563;
            border-color: #6b7280;
        }
    }
}

.ikp-codeblock-highlighter-wrapper {
    padding: 14px;
    overflow-x: auto;
    max-height: 400px;

    [data-theme="light"] & {
        background: #ffffff;
    }
    [data-theme="dark"] & {
        background: #111827;
    }
}

.ikp-codeblock-highlighter {
    font-size: 13px;
    line-height: 1.5;
}

.ikp-codeblock-code {
    font-family: 'Source Code Pro', 'Menlo', 'Consolas', 'Monaco', monospace !important;
}

/* Fallback for any plain pre tags in AI responses */
.ikp-ai-chat-message-content pre:not(.ikp-codeblock-highlighter) {
    border-radius: 6px;
    padding: 14px;
    overflow-x: auto;
    font-family: 'Source Code Pro', 'Menlo', 'Consolas', 'Monaco', monospace;
    font-size: 13px;
    line-height: 1.5;

    [data-theme="light"] & {
        background: #f9fafb;
        border: 1px solid #e5e7eb;
    }
    [data-theme="dark"] & {
        background: #111827;
        border: 1px solid #374151;
    }
}
                `,
            },
        ],
        // components: {
        //     AIChatPageWrapper: {
        //         defaultProps: {
        //             variant: 'no-shadow',
        //             size: 'expand',
        //         },
        //     },
        // },
        // tokens: {
        //     fonts: {
        //         heading: "'IBM Plex Sans', sans-serif",
        //         body: "'IBM Plex Sans', sans-serif",
        //         mono: "'Source Code Pro', 'Menlo', 'Consolas', 'monaco', 'monospace'",
        //     },
        // },
    },
    customIcons: {
        chatSubmit: { custom: '/icons/return.svg' },
    },
    privacyPreferences: {
        optOutAnalyticalCookies: true,
        optOutFunctionalCookies: true,
    },
}

const defaultAiChatSettings: InkeepAIChatSettings = {
    aiAssistantAvatar: {
        light: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1688579513/max_c5dd553db8.png',
        dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1688579513/max_c5dd553db8.png',
    },
    aiAssistantName: 'PostHog AI',
    isFirstExampleQuestionHighlighted: false,
    conversationVisibility: 'public',
}

const useInkeepSettings = (): InkeepSharedSettings => {
    const { websiteTheme } = useValues(layoutLogic)
    const [baseSettings, setBaseSettings] = useState(defaultBaseSettings)
    const [aiChatSettings, setAiChatSettings] = useState(defaultAiChatSettings)

    useEffect(() => {
        setBaseSettings({
            ...baseSettings,
            colorMode: {
                forcedColorMode: websiteTheme === 'dark' ? 'dark' : 'light',
            },
        })
    }, [websiteTheme])

    return { baseSettings, aiChatSettings, setBaseSettings, setAiChatSettings }
}

export default useInkeepSettings
