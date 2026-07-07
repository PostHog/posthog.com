export const lunary = {
    name: 'Lunary',
    products: {
        ai_observability: {
            available: true,
            features: {
                generation_tracking: true,
                latency_tracking: true,
                cost_tracking: true,
                trace_visualization: true,
                token_tracking: true,
                prompt_playground: true,
                prompt_evaluations: 'Basic',
                alerting: false,
                error_tracking: true,
                system_prompts: true,
                clustering: false,
                trace_summarization: false,
                llm_translation: false,
                prompt_management: true,
                framework_agnostic: true,
                opentelemetry: true,
                sentiment_classification: false,
                privacy_mode: true,
                agent_tracing: true,
                evaluation_datasets: true,
                human_annotation: true,
            },
        },
        product_analytics: { 
            available: false
        },
        session_replay: {
            available: false
        },
        feature_flags: {
            available: false
        },
    },
    platform: {
        pricing: {
            self_serve: true,
            free_tier: true,
        },
            deployment: {
                open_source: true,
                eu_hosting: true,
            },
    },
}