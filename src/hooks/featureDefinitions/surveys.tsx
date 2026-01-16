export const surveysFeatures = {
    summary: {
        name: 'Surveys',
        description: 'Collect product feedback with no-code surveys and customizable targeting',
        url: '/surveys',
        docsUrl: '/docs/surveys',
    },
    features: {
        ai_response_summaries: {
            name: 'AI response summaries',
            description: 'AI-generated summaries of survey responses',
        },
        aggregated_results: {
            name: 'Aggregated results',
            description: 'See feedback summarized and broken down per response',
        },
        automatic_nps_calculation: {
            name: 'Automatic NPS score calculations',
            description: 'Automatic calculation of Net Promoter Scores from NPS survey responses',
        },
        capture_partial_responses: {
            name: 'Capture partial responses',
            description:
                'Log responses to individual questions as they are received, rather than waiting for completion',
        },
        completion_conditions: {
            name: 'Completion conditions',
            description: 'Configure the survey to repeat on a schedule or when display conditions are met',
        },
        customizable_wait_periods: {
            name: 'Customizable wait periods',
            description: 'Set a delay before a survey opens',
        },
        in_app_prompts_messages: {
            name: 'In-app prompts and messages',
            description: 'Send messages to users in your app',
        },
        sentiment_analysis: {
            name: 'Sentiment analysis',
            description: 'Analyze survey results using AI to discover trends',
        },
        webhooks: {
            name: 'Webhooks',
            description: 'Send survey responses to places like Slack or Teams',
        },
    },
    platforms: {
        description: '',
        features: {
            web: {
                name: 'Web surveys',
                description: 'Show surveys on websites and web apps',
            },
            mobile: {
                name: 'Mobile surveys',
                description: 'Show surveys in mobile apps',
            },
        },
    },
    question_types: {
        description: 'Ask anything with flexible question formats',
        features: {
            multiple_choice: {
                name: 'Multiple choice',
                description: 'Single-select questions with predefined answer options',
            },
            multi_select: {
                name: 'Multi-select',
                description: 'Allow users to select multiple answers from a list',
            },
            rating: {
                name: 'Numerical rating',
                description: 'Collect ratings on a numerical scale',
            },
            emoji_reaction: {
                name: 'Emoji reaction',
                description: 'Quick feedback collection using emoji reactions',
            },
            embedded_links: {
                name: 'Embedded links',
                description: 'Include clickable links within survey questions',
            },
            freeform_text: {
                name: 'Freeform text',
                description: 'Open-ended text responses for detailed feedback',
            },
            interview_scheduling: {
                name: 'Interview scheduling',
                description: 'Send users a link to schedule a feedback meeting',
            },
        },
    },
    templates: {
        description: 'Start faster with common use cases',
        features: {
            survey_templates: {
                name: 'Survey templates',
                description: 'Choose from a library of pre-built templates (CSAT, NPS, etc) or start from scratch',
            },
            nps_surveys: {
                name: 'NPS surveys',
                description: 'Built-in NPS survey templates with automatic score calculation',
            },
            csat_surveys: {
                name: 'CSAT surveys',
                description: 'Customer satisfaction survey templates',
            },
            pmf_surveys: {
                name: 'PMF surveys',
                description: 'Product-market fit survey templates',
            },
            user_interview_requests: {
                name: 'User interview requests',
                description: 'Templates for organizing and scheduling user interviews',
            },
        },
    },
    targeting: {
        description: 'Control when and who sees a survey',
        features: {
            display_conditions: {
                name: 'Display conditions',
                description: 'Display surveys based on URL or person property',
            },
            event_triggered: {
                name: 'Event-triggered surveys',
                description: 'Trigger a survey to open when an event occurs, either every time or just once',
            },
            linked_feature_flag: {
                name: 'Feature flag targeting',
                description: 'Target surveys to specific users based on feature flags',
            },
            custom_targeting: {
                name: 'Custom targeting',
                description: 'Target surveys to specific users, cohorts, or behavioral segments',
            },
        },
    },
    presentation: {
        description: 'Display surveys in-app or hosted',
        features: {
            popover: {
                name: 'Popover surveys',
                description: 'Display surveys as popovers in the bottom corner of the screen',
            },
            feedback_button: {
                name: 'Feedback button',
                description: 'Show a feedback button that opens surveys on click',
            },
            hosted_surveys: {
                name: 'Hosted surveys',
                description: 'Get a shareable URL to a survey that you can send directly to users or embed',
            },
            custom_ui: {
                name: 'Custom colors & positioning',
                description: 'Customize the colors of your surveys to match your brand',
            },
            custom_html: {
                name: 'Custom HTML',
                description: 'Add HTML to your survey text',
            },
            iframe_embedding: {
                name: 'Iframe embedding',
                description: 'Embed surveys in your website using an iframe',
            },
        },
    },
    branching: {
        description: 'Guide respondents through dynamic flows',
        features: {
            multi_step_surveys: {
                name: 'Multi-step surveys',
                description:
                    'Define the next step based on the response received for single choice and rating questions',
            },
            conditional_logic: {
                name: 'Conditional logic',
                description: 'Create dynamic survey flows based on user responses',
            },
        },
    },
    integrations: {
        description: 'Connect surveys to your workflows',
        features: {
            link_to_webpage: {
                name: 'Link to webpage',
                description: 'Send users to a webpage after survey completion',
            },
            calendar_invites: {
                name: 'Calendar invites',
                description: 'Invite users to book a meeting with a calendar invite',
            },
            slack_integration: {
                name: 'Send responses to Slack',
                description: 'Send real-time survey responses to a Slack channel',
            },
            cdp_destinations: {
                name: 'Send responses to CDP destinations',
                description: 'Send survey responses to any CDP destination for further processing',
            },
        },
    },
    implementation: {
        description: 'Set up surveys with no-code or API',
        features: {
            no_code: {
                name: 'No-code setup',
                description: 'Using PostHog.js? No more code required for basic surveys',
            },
            api_access: {
                name: 'API access',
                description: 'Full API access for creating custom survey experiences',
            },
            sdk_support: {
                name: 'SDK support',
                description: 'Supported platforms include JavaScript, iOS, React Native, and Flutter',
            },
        },
    },
}
