export const langsmith = {
    name: 'Langsmith',
    products: {
        llm_analytics: {
            available: true,
            features: {
                generation_tracking: true,
                latency_tracking: true,
                cost_tracking: false,
                trace_visualization: true,
                token_tracking: true,
                prompt_playground: true,
                prompt_evaluations: true,
                alerting: true,
            },
        },
    },
}
