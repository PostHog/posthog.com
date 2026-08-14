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
                anomaly_detection: false,
                error_tracking: true,
                system_prompts: true,
                clustering: false,
                trace_summarization: false,
                llm_translation: false,
                sentiment_classification: false,
                privacy_mode: true,
                // Sessions group multi-step traces hierarchically.
                agent_tracing: true,
                prompt_management: true,
                evaluation_datasets: true,
                human_annotation: false,
                // User feedback API (thumbs up/down on responses).
                user_feedback: true,
                session_replay: false,
                product_analytics: false,
                agent_reports: false,
                ai_gateway_proxy: true,
            },
            tracing: {
                features: {
                    // Sessions group multi-step requests into a tree.
                    hierarchical_traces: true,
                    custom_spans: true,
                    tool_call_tracking: false,
                    // Vector DB calls can be logged into sessions.
                    rag_retrieval_tracking: true,
                    session_grouping: true,
                    opentelemetry_support: true,
                    async_ingestion: true,
                    multi_model_support: true,
                    session_replay_link: false,
                    // Per-user request and cost metrics, no behavioral profile.
                    user_profile_context: 'Partial',
                    sql_queries_on_traces: false,
                    trace_explorer_ui: true,
                },
            },
            prompt_management: {
                features: {
                    prompt_versioning: true,
                    template_variables: true,
                    prompt_deployment_api: true,
                    version_comparison: true,
                    prompt_config: true,
                    prompt_labels: false,
                    prompt_playground: true,
                    composable_prompts: false,
                    mcp_server_for_prompts: false,
                    // Prompt experiments split traffic between versions.
                    ab_test_prompt_versions: true,
                },
            },
            evaluations: {
                features: {
                    llm_as_a_judge: true,
                    code_evaluators: true,
                    annotation_queues: false,
                    datasets: true,
                    experiment_runs: true,
                    ab_experiments_on_product_metrics: false,
                },
            },
            costs: {
                features: {
                    token_counting: true,
                    cost_calculation: true,
                    cost_by_model: true,
                    cost_trends: true,
                    cost_by_user: true,
                    // Via custom properties on requests.
                    cost_by_feature: true,
                    cost_by_cohort: false,
                },
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
