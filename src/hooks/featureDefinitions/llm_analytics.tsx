export const llmAnalyticsFeatures = {
    summary: {
        name: 'LLM Analytics',
        description: 'Monitor and debug your LLM-powered features',
        url: '/llm-analytics',
        docsUrl: '/docs/llm-analytics',
    },
    features: {
        generation_tracking: {
            name: 'Generation tracking',
            description: '',
        },
        latency_tracking: {
            name: 'Latency tracking',
            description: '',
        },
        cost_tracking: {
            name: 'Cost tracking',
            description: 'Includes cost per user',
        },
        trace_visualization: {
            name: 'Trace visualization',
            description: '',
        },
        token_tracking: {
            name: 'Token tracking',
            description: '',
        },
        prompt_playground: {
            name: 'Prompt playground',
            description: 'interactive testing environment for prompts and models',
        },
        prompt_evaluations: {
            name: 'Prompt evaluations',
            description: 'online LLM-as-a-Judge evaluations for measuring AI output quality',
        },
        alerting: {
            name: 'Alerting',
            description: '',
        },
        error_tracking: {
            name: 'Error tracking',
            description: 'grouped error tracking for LLM applications',
        },
        system_prompts: {
            name: 'System prompts',
            description: 'create and manage system prompts from the PostHog UI',
        },
        clustering: {
            name: 'Clustering',
            description: 'automatic grouping of similar traces and outputs',
        },
        trace_summarization: {
            name: 'Trace summarization',
            description: 'AI-generated summaries  quick understanding',
        },
        llm_translation: {
            name: 'LLM translation',
            description: 'translation of non-English LLM traces to English',
        },
    },
}
