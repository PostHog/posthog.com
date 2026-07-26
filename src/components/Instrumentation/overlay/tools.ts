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
import { Tool, ToolKey } from './types'

/*
 * The PostHog tools instrumented on the demo. "Tools" is the right word: error
 * tracking, session replay and the rest are tools, while "products" means the
 * interfaces you reach them through (web, MCP, Slack, desktop).
 *
 * Colors are literal hex because markers and icons color dynamically and Tailwind
 * can't JIT `bg-${color}` class names. Each entry names the token it came from, so
 * drift is checkable rather than a guess; resolve the hex against the palette in
 * tailwind.config.js. Icon and color both match the docs nav (src/navs/index.js),
 * which is the surface people see these tools on most.
 */
export const TOOLS: Record<ToolKey, Tool> = {
    core: {
        key: 'core',
        name: 'Install & SDKs',
        color: '#8F8F8C', // gray (no productData entry, neutral by design)
        textOnColor: '#fff',
        Icon: IconCode,
        docsUrl: '/docs/getting-started/install',
    },
    web: {
        key: 'web',
        name: 'Web analytics',
        color: '#36C46F', // web_analytics: green-2
        textOnColor: '#fff',
        Icon: IconPieChart,
        docsUrl: '/docs/web-analytics',
    },
    product: {
        key: 'product',
        name: 'Product analytics',
        color: '#2F80FA', // product_analytics: blue
        textOnColor: '#fff',
        Icon: IconGraph,
        docsUrl: '/docs/product-analytics',
    },
    replay: {
        key: 'replay',
        name: 'Session replay',
        color: '#F7A501', // session_replay: yellow
        textOnColor: '#000',
        Icon: IconRewindPlay,
        docsUrl: '/docs/session-replay',
    },
    experiments: {
        key: 'experiments',
        name: 'Experiments',
        color: '#B62AD9', // experiments: purple
        textOnColor: '#fff',
        Icon: IconFlask,
        docsUrl: '/docs/experiments',
    },
    flags: {
        key: 'flags',
        name: 'Feature flags',
        color: '#30ABC6', // feature_flags: seagreen
        textOnColor: '#fff',
        Icon: IconToggle,
        docsUrl: '/docs/feature-flags',
    },
    error: {
        key: 'error',
        name: 'Error tracking',
        color: '#EB9D2A', // error_tracking: orange (the amber token, not burnt-orange)
        textOnColor: '#000',
        Icon: IconWarning,
        docsUrl: '/docs/error-tracking',
    },
    surveys: {
        key: 'surveys',
        name: 'Surveys',
        color: '#F35454', // surveys: salmon
        textOnColor: '#fff',
        Icon: IconMessage,
        docsUrl: '/docs/surveys',
    },
    llm: {
        key: 'llm',
        name: 'LLM analytics',
        color: '#B62AD9', // ai_observability: purple
        textOnColor: '#fff',
        Icon: IconLlmAnalytics,
        docsUrl: '/docs/ai-observability',
    },
    selfdriving: {
        key: 'selfdriving',
        name: 'Self-driving',
        color: '#8567FF', // lilac (no productData entry)
        textOnColor: '#fff',
        Icon: IconSignal,
        docsUrl: '/docs/self-driving',
    },
    logs: {
        key: 'logs',
        name: 'Logs',
        color: '#F54E00', // logs: red
        textOnColor: '#fff',
        Icon: IconActivity,
        docsUrl: '/docs/logs',
    },
}
