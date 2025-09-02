import React from 'react'
import { OSList } from 'components/OSList'
import { IconOpenAI, IconAnthropic, IconGemini, IconLangChain, IconVercel, IconOpenRouter } from 'components/OSIcons'

const LLMInstallationPlatforms = () => {
    const platforms = [
        {
            label: 'OpenAI',
            url: '/docs/llm-analytics/installation/openai',
            icon: <IconOpenAI />,
        },
        {
            label: 'Anthropic',
            url: '/docs/llm-analytics/installation/anthropic',
            icon: <IconAnthropic />,
        },
        {
            label: 'Google Gemini',
            url: '/docs/llm-analytics/installation/google',
            icon: <IconGemini />,
        },
        {
            label: 'LangChain',
            url: '/docs/llm-analytics/installation/langchain',
            icon: <IconLangChain />,
        },
        {
            label: 'Vercel AI SDK',
            url: '/docs/llm-analytics/installation/vercel-ai',
            icon: <IconVercel />,
        },
        {
            label: 'OpenRouter',
            url: '/docs/llm-analytics/installation/openrouter',
            icon: <IconOpenRouter />,
        },
        {
            label: 'LiteLLM',
            url: '', // TODO: Add LiteLLM link
            image: '/static/images/litellm-logo.png',
        },
    ]

    return <OSList className="grid" items={platforms} />
}
export default LLMInstallationPlatforms
