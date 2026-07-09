export const portkey = {
    name: 'Portkey',
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
                prompt_evaluations: false,
                alerting: true,
                error_tracking: true,
                system_prompts: true,
                clustering: false,
                trace_summarization: false,
                llm_translation: false,
                sentiment_classification: false,
                privacy_mode: true,
                agent_tracing: true,
                prompt_management: true,
                evaluation_datasets: false,
                human_annotation: false,
                session_replay: false,
                product_analytics: false,
                feature_flags: false,
                ai_gateway_proxy: true,
            },
        },
        session_replay: {
            available: false,
        },
        product_analytics: {
            available: false,
        },
        feature_flags: {
            available: false,
        },
        experiments: {
            available: false,
        },
    },
    platform: {
        deployment: {
            open_source: "Partial",
            eu_hosting: true,
        },
    },
}