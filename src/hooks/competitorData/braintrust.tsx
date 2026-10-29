export const braintrust = {
    name: 'Braintrust',
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
                byok: true,
                system_prompts: true,
                clustering: true,
                trace_summarization: true,
                // Manual per-message translation in the trace UI, session-only.
                llm_translation: 'Partial',
                // Topics pipeline has a built-in Sentiment facet (opt-in, usage-priced).
                sentiment_classification: true,
                privacy_mode: true,
                agent_tracing: true,
                prompt_management: true,
                evaluation_datasets: true,
                human_annotation: true,
                // logFeedback API attaches user feedback to spans.
                user_feedback: true,
                // Loop is an on-demand chat assistant; automations are alerts/webhooks.
                // Nothing autonomously watches production or files reports/PRs.
                agent_reports: false,
                ai_gateway_proxy: true,
            },
            evaluations: {
                features: {
                    llm_as_a_judge: true,
                    code_evaluators: true,
                    annotation_queues: true,
                    datasets: true,
                    experiment_runs: true,
                    ab_experiments_on_product_metrics: false,
                },
            },
            tracing: {
                features: {
                    hierarchical_traces: true,
                    custom_spans: true,
                    tool_call_tracking: true,
                    rag_retrieval_tracking: true,
                    session_grouping: true,
                    opentelemetry_support: true,
                    async_ingestion: true,
                    multi_model_support: true,
                    session_replay_link: false,
                    user_profile_context: false,
                    // BTQL, a SQL-like query language over logs and traces.
                    sql_queries_on_traces: true,
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
                    prompt_labels: true,
                    prompt_playground: true,
                    composable_prompts: false,
                    mcp_server_for_prompts: true,
                    // Versions and environments only – docs describe user-implemented
                    // traffic routing, no built-in split or canary.
                    ab_test_prompt_versions: false,
                },
            },
            costs: {
                features: {
                    token_counting: true,
                    cost_calculation: true,
                    cost_by_model: true,
                    cost_trends: true,
                    cost_by_custom_tags: true,
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
            eu_hosting: true,
            open_source: false,
        },
    },
}
