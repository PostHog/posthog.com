import React from 'react'
import { JSHtmlSnippet, JSInitSnippet } from 'onboarding/product-analytics'

const posthogSnippetMethods = [
    'init',
    'capture',
    'register',
    'register_once',
    'register_for_session',
    'unregister',
    'unregister_for_session',
    'getFeatureFlag',
    'getFeatureFlagResult',
    'isFeatureEnabled',
    'reloadFeatureFlags',
    'updateEarlyAccessFeatureEnrollment',
    'getEarlyAccessFeatures',
    'on',
    'onFeatureFlags',
    'onSessionId',
    'getSurveys',
    'getActiveMatchingSurveys',
    'renderSurvey',
    'canRenderSurvey',
    'getNextSurveyStep',
    'identify',
    'setPersonProperties',
    'group',
    'resetGroups',
    'setPersonPropertiesForFlags',
    'resetPersonPropertiesForFlags',
    'setGroupPropertiesForFlags',
    'resetGroupPropertiesForFlags',
    'reset',
    'get_distinct_id',
    'getGroups',
    'get_session_id',
    'get_session_replay_url',
    'alias',
    'set_config',
    'startSessionRecording',
    'stopSessionRecording',
    'sessionRecordingStarted',
    'captureException',
    'loadToolbar',
    'get_property',
    'getSessionProperty',
    'createPersonProfile',
    'opt_in_capturing',
    'opt_out_capturing',
    'has_opted_in_capturing',
    'has_opted_out_capturing',
    'clear_opt_in_out_capturing',
    'debug',
]

// Website versions of the JS snippet components.
// These use placeholder tokens that the website's CodeBlock replaces
// with real values from cookies (ph_current_project_token, etc.).
export const WebsiteJSHtmlSnippet = () => (
    <JSHtmlSnippet
        projectToken="<ph_project_token>"
        methods={posthogSnippetMethods}
        options={{
            api_host: { content: '<ph_client_api_host>', enabled: true },
            defaults: { content: '<ph_posthog_js_defaults>', enabled: true },
        }}
    />
)

export const WebsiteJSInitSnippet = () => <JSInitSnippet defaultsDate="<ph_posthog_js_defaults>" />
