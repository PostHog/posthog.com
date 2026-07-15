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
            description: 'Track response times and identify slow prompts, models, and workflow steps',
        },
        cost_tracking: {
            name: 'Cost tracking',
            description: 'Includes cost per user and broken down by provider, models',
        },
        trace_visualization: {
            name: 'Trace visualization',
            description: 'View complete request traces across prompts, model calls, tools, and workflows',
        },
        token_tracking: {
            name: 'Token tracking',
            description: '',
        },
        prompt_playground: {
            name: 'Prompt playground',
            description: 'Interactive testing environment for prompts and models',
        },
        prompt_evaluations: {
            name: 'Prompt evaluations',
            description: 'Online LLM-as-a-Judge evaluations for measuring AI output quality',
        },
        alerting: {
            name: 'Alerting',
            description: '',
        },
        error_tracking: {
            name: 'Error tracking',
            description: 'Grouped error tracking for LLM applications',
        },
        system_prompts: {
            name: 'System prompts',
            description: 'Create and manage system prompts from the PostHog UI',
        },
        clustering: {
            name: 'Clustering',
            description: 'Automatic grouping of similar traces and outputs',
        },
        trace_summarization: {
            name: 'Trace summarization',
            description: 'AI-generated summaries for quick understanding',
        },
        llm_translation: {
            name: 'LLM translation',
            description: 'Translation of non-English LLM traces to English',
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
            description: 'Create datasets for experimentation and benchmarking outputs',
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
        ai_gateway_proxy: {
        name: 'AI gateway/proxy',
        description: 'Route LLM requests through a gateway for caching, rate limits, fallbacks, and observability',
        },
    },
    tracing: {
    description: 'Trace requests across prompts, model calls, tools, and workflows',
    features: {
        hierarchical_traces: {
            name: 'Hierarchical traces',
            description: 'Nested spans showing the full call flow',
        },
        custom_spans: {
            name: 'Custom spans',
            description: 'Instrument any operation as a span',
        },
        tool_call_tracking: {
            name: 'Tool call tracking',
            description: 'Track function/tool calls in AI agents',
        },
        rag_retrieval_tracking: {
            name: 'RAG retrieval tracking',
            description: 'Monitor retrieval steps in RAG pipelines',
        },
        session_grouping: {
            name: 'Session grouping',
            description: 'Group traces into user sessions',
        },
        opentelemetry_support: {
            name: 'OpenTelemetry support',
            description: 'Ingest traces via the OTel protocol',
        },
        async_ingestion: {
            name: 'Async ingestion',
            description: 'Non-blocking trace collection',
        },
        multi_model_support: {
            name: 'Multi-model support',
            description: 'Track calls across LLM providers',
        },
        session_replay_link: {
            name: 'Session replay link',
            description: "Jump from a trace to the user's session recording",
        },
        user_profile_context: {
            name: 'User profile context',
            description: 'Connect traces to full user profiles with behavioral history',
        },
        sql_queries_on_traces: {
            name: 'SQL queries on traces',
            description: 'Query trace data alongside product events',
        },
        trace_explorer_ui: {
            name: 'Trace explorer UI',
            description: 'Dedicated interface for browsing and filtering traces',
        },
    },
},
prompt_management: {
    description: 'Create, version, deploy, and test prompts',
    features: {
        prompt_versioning: {
            name: 'Prompt versioning',
            description: 'Track changes to prompts over time',
        },
        template_variables: {
            name: 'Template variables',
            description: 'Dynamic {{variables}} compiled at runtime',
        },
        prompt_deployment_api: {
            name: 'Prompt deployment API',
            description: 'Fetch the active prompt version via SDK',
        },
        version_comparison: {
            name: 'Version comparison',
            description: 'Side-by-side diff of prompt versions',
        },
        prompt_labels: {
            name: 'Prompt labels',
            description: 'Tag prompts as production, staging, latest',
        },
        prompt_playground: {
            name: 'Prompt playground',
            description: 'Test and compare prompts interactively',
        },
        composable_prompts: {
            name: 'Composable prompts',
            description: 'Link and chain prompts together',
        },
        mcp_server_for_prompts: {
            name: 'MCP server for prompts',
            description: 'Manage prompts via AI coding agents',
        },
        ab_test_prompt_versions: {
            name: 'A/B test prompt versions',
            description: 'Split users between versions, measure cost, latency, and eval pass rate',
        },
    },
},
evaluations: {
    description: 'Score, review, and test LLM outputs',
    features: {
        llm_as_a_judge: {
            name: 'LLM-as-a-judge',
            description: 'Use models to score outputs automatically',
        },
        code_evaluators: {
            name: 'Code evaluators',
            description: 'Custom scoring functions for automated eval',
        },
        annotation_queues: {
            name: 'Annotation queues',
            description: 'Assign human reviewers to score outputs',
        },
        datasets: {
            name: 'Datasets',
            description: 'Curate sets of inputs and expected outputs',
        },
        experiment_runs: {
            name: 'Experiment runs',
            description: 'Run evaluation pipelines across datasets',
        },
        ab_experiments_on_product_metrics: {
            name: 'A/B experiments on product metrics',
            description: 'Statistical tests measuring impact on real user behavior',
        },
    },
},
costs: {
    description: 'Track token usage, model costs, and spending trends',
    features: {
        token_counting: {
            name: 'Token counting',
            description: 'Track input and output tokens per call',
        },
        cost_calculation: {
            name: 'Cost calculation',
            description: 'Dollar cost per generation',
        },
        cost_by_model: {
            name: 'Cost by model',
            description: 'Break down spending by model',
        },
        cost_trends: {
            name: 'Cost trends',
            description: 'Historical cost over time',
        },
        cost_by_user: {
            name: 'Cost by user',
            description: 'See what individual users cost you',
        },
        cost_by_feature: {
            name: 'Cost by feature',
            description: 'Break down spending by product feature',
        },
        cost_by_cohort: {
            name: 'Cost by cohort',
            description: 'Compare costs across user segments',
        },
    },
},
}