export const helicone = {
    name: 'Helicone',
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
                prompt_evaluations: true,
                alerting: true,
                error_tracking: true,
                system_prompts: true,
                clustering: false,
                trace_summarization: false,
                llm_translation: false,
                sentiment_classification: false,
                privacy_mode: true,
                agent_tracing: 'Basic',
                prompt_management: true,
                evaluation_datasets: true,
                human_annotation: false,
                session_replay: false,
                product_analytics: false,
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
            open_source: true,
            eu_hosting: true,
        },
    },
}