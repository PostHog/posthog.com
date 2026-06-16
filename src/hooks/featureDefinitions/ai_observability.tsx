export const aiObservabilityFeatures = {
    summary: {
        name: 'AI Observability',
        description: 'Monitor and debug your LLM-powered features',
        url: '/ai-observability',
        docsUrl: '/docs/ai-observability',
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
        sentiment_classification: {
            name: 'Sentiment classification',
            description: 'Automatically classify user messages as positive, neutral, or negative',
        },
        privacy_mode: {
            name: 'Privacy mode',
            description: 'Mask prompts and responses before they are stored',
        },
        agent_tracing: {
            name: 'Agent/multi-step tracing',
            description: 'Understand complex agent and tool-calling workflows',
        },
        prompt_management: {
         name: 'Prompt management',
         description: 'Create, version, and manage prompts',
        },
        evaluation_datasets: {
         name: 'Evaluation datasets',
         description: 'Create datasets for testing and benchmarking outputs',
        },
        human_annotation: {
        name: 'Human annotation/review',
        description: 'Review and label model outputs manually',
        },
        session_replay: {
        name: 'Session replay',
        description: 'Watch recordings of users interacting with AI features',
        },
        product_analytics: {
        name: 'Product analytics',
        description: 'Analyze AI interactions alongside retention, funnels, and feature adoption',
},
    },
}
