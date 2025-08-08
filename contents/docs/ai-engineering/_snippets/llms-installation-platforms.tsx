import React from 'react'
import List from 'components/List'

const LLMInstallationPlatforms = () => {
    const platforms = [
        {
            label: 'OpenAI',
            url: '/docs/ai-engineering/installation/openai',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/openai_d86c68d66f.svg',
        },
        {
            label: 'Anthropic',
            url: '/docs/ai-engineering/installation/anthropic',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/anthropic_093714e898.svg',
        },
        {
            label: 'Google',
            url: '/docs/ai-engineering/installation/google',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/gemini_3b2348da64.svg',
        },
        {
            label: 'LangChain',
            url: '/docs/ai-engineering/installation/langchain',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/langchain_bb97e9da36.svg',
        },
        {
            label: 'Vercel AI SDK',
            url: '/docs/ai-engineering/installation/vercel-ai',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/vercel_ded5edb1ef.svg',
        },
    ]

    return <List className="grid sm:grid-cols-2" items={platforms} />
}
export default LLMInstallationPlatforms
