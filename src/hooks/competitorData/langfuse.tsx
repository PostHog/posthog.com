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
        user_profile_context: 'Partial',
        sql_queries_on_traces: false,
        trace_explorer_ui: 'Advanced',
    },
},
prompt_management: {
    features: {
        prompt_versioning: true,
        template_variables: true,
        prompt_deployment_api: true,
        version_comparison: true,
        prompt_labels: true,
        prompt_playground: true,
        composable_prompts: true,
        mcp_server_for_prompts: true,
        ab_test_prompt_versions: false,
    },
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
costs: {
    features: {
        token_counting: true,
        cost_calculation: true,
        cost_by_model: true,
        cost_trends: true,
        cost_by_user: 'Partial',
        cost_by_feature: false,
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
        web_analytics: {
            available: false,
        },
        feature_flags: {
            available: false,
        },
        experiments: {
            available: false,
        },
        error_tracking: {
            available: false,
        },
        surveys: {
            available: false,
        },
        data_warehouse: {
            available: false,
        },
        cdp: {
            available: false,
        },
    },
        platform: {
        deployment: {
            eu_hosting: true,
            open_source: true,
        },
    },
}