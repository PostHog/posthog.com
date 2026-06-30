export const langfuse = {
    name: 'Langfuse',
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
                alerting: false,
                system_prompts: true,
                error_tracking: true,
                clustering: true,
                trace_summarization: true,
                llm_translation: false,
                sentiment_classification: false,
                privacy_mode: true,
                agent_tracing: true,
                prompt_management: true,
                evaluation_datasets: true,
                human_annotation: true,
                session_replay: false,
                product_analytics: false,
                feature_flags: false,
            },
        },
        session_replay: {
            available: false,
        },
        product_analytics: {
            available: false,
        },
    },
}
