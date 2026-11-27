import React from 'react'
import { IconApps } from '@posthog/icons'
import BrandLogo from 'components/MCPLeaderboard/BrandLogo'
import { getLogo } from '../../constants/logos'
import langchainMark from '../../../contents/images/docs/llms/langchain.svg'

// A model can have several public names and a publisher prefix, such as meta-llama/llama-3.
const modelFamilies: [RegExp, string][] = [
    [/^(?:nemotron|llama-.*nemotron)/, 'nvidia'],
    [/^claude/, 'anthropic'],
    [/^(?:gemini|gemma|nano-banana)/, 'google'],
    [/^(?:gpt|chatgpt|o\d+(?:-|$)|codex|text-embedding|whisper|tts-|dall-e|omni-moderation)/, 'openai'],
    [/^grok/, 'xai'],
    [/^deepseek/, 'deepseek'],
    [/^(?:kimi|moonshot)/, 'kimi'],
    [/^glm/, 'zai'],
    [/^qwen/, 'qwen'],
    [/^minimax/, 'minimax'],
    [/^mimo/, 'xiaomi'],
    [/^(?:llama|muse-)/, 'meta'],
    [/^(?:sonar|r1-1776|pplx-)/, 'perplexity'],
    [/^(?:mistral|mixtral|codestral|devstral|pixtral|ministral|magistral)/, 'mistral'],
    [/^mercury/, 'inception'],
    [/^(?:scribe|eleven)[_-]/, 'elevenlabs'],
    [/^lfm/, 'liquid'],
    [/^step-/, 'stepfun'],
    [/^seed(?:ance|ream)?-/, 'bytedance'],
    [/^(?:command-|embed-english|embed-multilingual|rerank-)/, 'cohere'],
    [/^voyage-/, 'voyage'],
    [/^bge-/, 'baai'],
    [/^(?:amazon\.(?:titan|nova)|nova-)/, 'amazon'],
]

const sharedMarks: Record<string, string> = {
    anthropic: 'Anthropic',
    google: 'Google',
    openai: 'OpenAI',
    'openai-agents': 'OpenAI',
    xai: 'xAI',
}

const bundledMarks = new Set([
    'amazon',
    'baai',
    'bytedance',
    'claude-code',
    'claude-agent-sdk',
    'elevenlabs',
    'inception',
    'kimi',
    'liquid',
    'minimax',
    'nvidia',
    'openclaw',
    'pi',
    'qwen',
    'stepfun',
    'voyage',
    'xiaomi',
    'zai',
])

const frameworkTiles: Record<string, string> = {
    langchain: 'bg-lime-green',
    vercel: 'bg-pale-blue',
    'claude-code': 'bg-primary',
    'claude-agent-sdk': 'bg-primary',
    'openai-agents': 'bg-teal-2',
    openclaw: 'bg-primary',
    pi: 'bg-light-purple',
}

function brandLogo(brand: string | undefined): React.ReactElement {
    if (brand && typeof sharedMarks[brand] === 'string') {
        return (
            <span className="shrink-0" aria-hidden="true">
                <BrandLogo name={sharedMarks[brand]} />
            </span>
        )
    }
    if (brand && bundledMarks.has(brand)) {
        return (
            <svg className="size-4 shrink-0" aria-hidden="true">
                <use href={`/images/ai-adoption-brands.svg#${brand}`} />
            </svg>
        )
    }
    const logo = brand === 'langchain' ? langchainMark : getLogo(brand === 'meta' ? 'metaAds' : brand ?? '')
    if (typeof logo === 'string') {
        const invert = brand === 'perplexity'
        return (
            <img
                src={logo}
                className={`size-4 shrink-0 object-contain ${invert ? 'dark:invert' : ''}`}
                width={16}
                height={16}
                alt=""
            />
        )
    }
    return <IconApps className="size-4 shrink-0 text-secondary" aria-hidden="true" />
}

export function modelLab(key: string): string | undefined {
    const model = key.toLowerCase().split('/').pop() ?? ''
    return modelFamilies.find(([pattern]) => pattern.test(model))?.[1]
}

export function rowLogo(section: string, key: string): React.ReactElement | null {
    if (section === 'provider_diversity') return null
    if (section === 'model') return brandLogo(modelLab(key))
    if (section === 'framework') {
        const tile = frameworkTiles[key] ?? 'bg-accent'
        return (
            <span className={`inline-flex size-6 shrink-0 items-center justify-center rounded text-navy ${tile}`}>
                {brandLogo(key)}
            </span>
        )
    }
    return brandLogo(key)
}
