import {
    IconActivity,
    IconSignal,
    IconCode,
    IconFlask,
    IconToggle,
    IconGraph,
    IconLlmAnalytics,
    IconMessage,
    IconPieChart,
    IconRewindPlay,
    IconWarning,
} from '@posthog/icons'
import { Tool, ToolColor, ToolKey } from './types'

/*
 * Tailwind classes per palette token, spelled out in full because the JIT scans
 * source text and can't resolve a computed `bg-${color}`. Same approach as
 * components/Glow, and the reason to prefer it over a map of hexes: the color is
 * only ever named here, never copied, so it can't drift from tailwind.config.js the
 * way the hex map in AI/TerminalFeatures.tsx has.
 *
 * `on` is a contrast decision rather than a token: amber and yellow need black text.
 */
export const TOOL_CLASSES: Record<ToolColor, { bg: string; on: string; text: string; outline: string }> = {
    gray: { bg: 'bg-gray', on: 'text-white', text: 'text-gray', outline: 'border-gray bg-gray/10' },
    'green-2': { bg: 'bg-green-2', on: 'text-white', text: 'text-green-2', outline: 'border-green-2 bg-green-2/10' },
    blue: { bg: 'bg-blue', on: 'text-white', text: 'text-blue', outline: 'border-blue bg-blue/10' },
    yellow: { bg: 'bg-yellow', on: 'text-black', text: 'text-yellow', outline: 'border-yellow bg-yellow/10' },
    purple: { bg: 'bg-purple', on: 'text-white', text: 'text-purple', outline: 'border-purple bg-purple/10' },
    seagreen: { bg: 'bg-seagreen', on: 'text-white', text: 'text-seagreen', outline: 'border-seagreen bg-seagreen/10' },
    orange: { bg: 'bg-orange', on: 'text-black', text: 'text-orange', outline: 'border-orange bg-orange/10' },
    salmon: { bg: 'bg-salmon', on: 'text-white', text: 'text-salmon', outline: 'border-salmon bg-salmon/10' },
    lilac: { bg: 'bg-lilac', on: 'text-white', text: 'text-lilac', outline: 'border-lilac bg-lilac/10' },
    red: { bg: 'bg-red', on: 'text-white', text: 'text-red', outline: 'border-red bg-red/10' },
}

/*
 * The PostHog tools instrumented on the demo. "Tools" is the right word: error
 * tracking, session replay and the rest are tools, while "products" means the
 * interfaces you reach them through (web, MCP, Slack, desktop).
 *
 * Each `color` is the tailwind.config.js token that tool carries in productData, so
 * icon and color both match the docs nav (src/navs/index.js), which is the surface
 * people see these tools on most.
 */
export const TOOLS: Record<ToolKey, Tool> = {
    core: {
        key: 'core',
        name: 'Install & SDKs',
        color: 'gray', // no productData entry; neutral by design
        Icon: IconCode,
        docsUrl: '/docs/getting-started/install',
    },
    web: {
        key: 'web',
        name: 'Web analytics',
        color: 'green-2', // web_analytics
        Icon: IconPieChart,
        docsUrl: '/docs/web-analytics',
    },
    product: {
        key: 'product',
        name: 'Product analytics',
        color: 'blue', // product_analytics
        Icon: IconGraph,
        docsUrl: '/docs/product-analytics',
    },
    replay: {
        key: 'replay',
        name: 'Session replay',
        color: 'yellow', // session_replay
        Icon: IconRewindPlay,
        docsUrl: '/docs/session-replay',
    },
    experiments: {
        key: 'experiments',
        name: 'Experiments',
        color: 'purple', // experiments
        Icon: IconFlask,
        docsUrl: '/docs/experiments',
    },
    flags: {
        key: 'flags',
        name: 'Feature flags',
        color: 'seagreen', // feature_flags
        Icon: IconToggle,
        docsUrl: '/docs/feature-flags',
    },
    error: {
        key: 'error',
        name: 'Error tracking',
        color: 'orange', // error_tracking
        Icon: IconWarning,
        docsUrl: '/docs/error-tracking',
    },
    surveys: {
        key: 'surveys',
        name: 'Surveys',
        color: 'salmon', // surveys
        Icon: IconMessage,
        docsUrl: '/docs/surveys',
    },
    llm: {
        key: 'llm',
        name: 'LLM analytics',
        color: 'purple', // ai_observability
        Icon: IconLlmAnalytics,
        docsUrl: '/docs/ai-observability',
    },
    selfdriving: {
        key: 'selfdriving',
        name: 'Self-driving',
        color: 'lilac', // no productData entry
        Icon: IconSignal,
        docsUrl: '/docs/self-driving',
    },
    logs: {
        key: 'logs',
        name: 'Logs',
        color: 'red', // logs
        Icon: IconActivity,
        docsUrl: '/docs/logs',
    },
}
