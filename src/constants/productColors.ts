// Each product's color, by product handle. The product data (`color` in src/hooks/productData) and
// the Products menu icons read it, and so do the pocket guide spines, so a product looks the same
// everywhere. Data only, so `gatsby/` can import it in Node (through pocketGuides.ts).
// Callers build classes like `text-${color}` and `bg-${color}`, so every color must be safelisted.
export const PRODUCT_COLORS = {
    ai_observability: 'purple',
    cdp: 'sky-blue',
    data_modeling: 'lilac',
    data_pipelines: 'blue',
    data_warehouse: 'purple',
    endpoints: 'teal',
    error_tracking: 'orange',
    experiments: 'purple',
    feature_flags: 'seagreen',
    group_analytics: 'teal',
    inbox: 'blue',
    llm_evals: 'lilac',
    logs: 'red',
    marketing_analytics: 'orange',
    mcp_analytics: 'purple',
    posthog_ai: 'blue',
    posthog_code: 'brown',
    product_analytics: 'blue',
    realtime_destinations: 'seagreen',
    replay_vision: 'yellow',
    session_replay: 'yellow',
    support: 'blue',
    surveys: 'salmon',
    traces: 'blue',
    web_analytics: 'green-2',
    workflows_emails: 'teal',
    // Not in product data: the Self-driving item in the Products menu (TaskBarMenu/menuData.tsx).
    self_driving: 'red',
} as const
