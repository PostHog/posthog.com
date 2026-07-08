export const langsmith = {
    name: 'Langsmith',
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
                clustering: false,
                system_prompts: true,
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
            },
        },
        session_replay: {
            available: false,
        },
        product_analytics: {
            available: false,
        },
    },
        platform: {
        deployment: {
            eu_hosting: true,
            open_source: false,
        },
    },
}