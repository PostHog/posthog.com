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
            url: '/docs/llm-analytics/installation/litellm',
            icon: <img className='size-full' src='https://res.cloudinary.com/dmukukwp6/image/upload/w_200,c_limit,q_auto,f_auto/litellm_3b2c4291f9.png' />,
        },
        {
            label: 'Manual Capture',
            url: '/docs/llm-analytics/installation/manual-capture',
            icon: <svg className='size-full' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
        },
    ]

    return <OSList className="grid" items={platforms} />
}
export default LLMInstallationPlatforms
