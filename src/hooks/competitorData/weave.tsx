export const weave = {
    name: 'Weave',
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
                error_tracking: true,
                system_prompts: false,
                clustering: false,
                trace_summarization: false,
                llm_translation: false,
                sentiment_classification: false,
                privacy_mode: true,
                agent_tracing: true,
                prompt_management: 'Basic',
                evaluation_datasets: true,
                human_annotation: 'Basic',
                session_replay: false,
                product_analytics: false,
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
