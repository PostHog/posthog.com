export const QUESTIONS_TOPIC_SLUG = 'questions'

const TAG_FOR_DOCS_TOPIC_LABEL: Record<string, string> = {
    'ai observability': 'ai-observability',
    cdp: 'cdp-and-pipelines',
    'data warehouse': 'data-warehouse',
    endpoints: 'endpoints',
    'error tracking': 'error-tracking',
    experiments: 'experiments',
    'feature flags': 'feature-flags',
    'posthog ai': 'posthog-ai',
    'product analytics': 'product-analytics',
    'session replay': 'session-replay',
    surveys: 'surveys',
    'web analytics': 'web-analytics',
    workflows: 'workflows',
}

export const questionsTagForLabel = (label?: string) =>
    label ? TAG_FOR_DOCS_TOPIC_LABEL[label.trim().toLowerCase()] : undefined

export const questionsTagFilter = (tagSlug: string) => ({
    forumTags: { slug: { $eq: tagSlug }, topic: { slug: { $eq: QUESTIONS_TOPIC_SLUG } } },
})

export const questionsTagFeedPath = (tagSlug?: string) =>
    tagSlug ? `/forum/t/${QUESTIONS_TOPIC_SLUG}?tag=${tagSlug}` : '/forum'
