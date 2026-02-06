import React from 'react'
import { ConfigBuilder, ConfigState } from 'components/Docs/ConfigBuilder'

const generateCode = (config: ConfigState): string => {
    const { selectedValue, checkboxes, inputs } = config
    const apiKey = inputs.apiKey as string
    const apiHost = selectedValue === 'eu-cloud' ? 'https://eu.i.posthog.com' : 'https://us.i.posthog.com'

    const configLines: string[] = []
    configLines.push(`    api_host: '${apiHost}',`)

    if (checkboxes.useDefaults) configLines.push(`    defaults: '2025-11-30',`)
    if (!checkboxes.enableAutocapture) configLines.push(`    autocapture: false,`)
    if (checkboxes.spaMode) configLines.push(`    capture_pageview: 'history_change',`)
    if (!checkboxes.enableSessionRecording) configLines.push(`    disable_session_recording: true,`)
    if (checkboxes.recordConsoleLogs) configLines.push(`    enable_recording_console_log: true,`)
    if (checkboxes.enableHeatmaps) configLines.push(`    enable_heatmaps: true,`)
    if (!checkboxes.enableSurveys) configLines.push(`    disable_surveys: true,`)
    if (checkboxes.maskAllText) configLines.push(`    mask_all_text: true,`)
    if (checkboxes.maskAllAttributes) configLines.push(`    mask_all_element_attributes: true,`)
    if (checkboxes.optOutByDefault) configLines.push(`    opt_out_capturing_by_default: true,`)

    const persistence = inputs.persistence as string
    if (persistence && persistence !== 'localStorage+cookie') {
        configLines.push(`    persistence: '${persistence}',`)
    }

    if (!checkboxes.crossSubdomainCookie) configLines.push(`    cross_subdomain_cookie: false,`)
    if (checkboxes.secureCookie) configLines.push(`    secure_cookie: true,`)
    if (checkboxes.alwaysCreateProfiles) configLines.push(`    person_profiles: 'always',`)

    return `posthog.init('${apiKey}', {\n${configLines.join('\n')}\n})`
}

const getFilename = (): string => 'posthog-init.js'
const getLanguage = (): string => 'javascript'

export const JSConfigBuilder: React.FC = () => {
    return (
        <ConfigBuilder
            toggle={{
                label: 'Where is PostHog hosted?',
                options: [
                    { value: 'us-cloud', label: 'US Cloud' },
                    { value: 'eu-cloud', label: 'EU Cloud' },
                ],
                defaultValue: 'us-cloud',
            }}
            checkboxes={[
                {
                    id: 'useDefaults',
                    label: 'Use recommended defaults',
                    description: "Sets defaults: '2025-11-30' which enables the latest recommended behaviors",
                    defaultValue: false,
                },
                {
                    id: 'enableAutocapture',
                    label: 'Enable autocapture',
                    description: 'Automatically capture clicks, form submissions, and other interactions',
                    defaultValue: true,
                },
                {
                    id: 'spaMode',
                    label: 'Single-page app (SPA)',
                    description: 'Detect page changes via history API instead of page loads',
                    defaultValue: false,
                },
                {
                    id: 'enableSessionRecording',
                    label: 'Enable session recording',
                    description: 'Record user sessions for replay',
                    defaultValue: true,
                },
                {
                    id: 'recordConsoleLogs',
                    label: 'Record console logs',
                    description: 'Include browser console logs in session recordings',
                    defaultValue: false,
                    group: 'advanced',
                },
                {
                    id: 'enableHeatmaps',
                    label: 'Enable heatmaps',
                    description: 'Capture click positions for heatmap visualizations',
                    defaultValue: false,
                    group: 'advanced',
                },
                {
                    id: 'enableSurveys',
                    label: 'Enable surveys',
                    description: 'Load the surveys script to show surveys to users',
                    defaultValue: true,
                    group: 'advanced',
                },
                {
                    id: 'maskAllText',
                    label: 'Mask all text (privacy)',
                    description: 'Replace all text content with asterisks in autocapture and recordings',
                    defaultValue: false,
                    group: 'advanced',
                },
                {
                    id: 'maskAllAttributes',
                    label: 'Mask all element attributes (privacy)',
                    description: 'Remove all element attributes from autocapture data',
                    defaultValue: false,
                    group: 'advanced',
                },
                {
                    id: 'optOutByDefault',
                    label: 'Opt users out by default (GDPR)',
                    description: 'Require explicit opt-in before tracking',
                    defaultValue: false,
                    group: 'advanced',
                },
                {
                    id: 'crossSubdomainCookie',
                    label: 'Cross-subdomain cookies',
                    description: 'Share identity across subdomains (enabled by default)',
                    defaultValue: true,
                    group: 'advanced',
                },
                {
                    id: 'secureCookie',
                    label: 'Secure cookies only (HTTPS)',
                    description: 'Only send cookies over HTTPS connections',
                    defaultValue: false,
                    group: 'advanced',
                },
                {
                    id: 'alwaysCreateProfiles',
                    label: 'Always create person profiles',
                    description: 'Create profiles for all users, not just identified ones (identified_only by default)',
                    defaultValue: false,
                    group: 'advanced',
                },
            ]}
            inputs={[
                {
                    id: 'apiKey',
                    label: 'Project API key',
                    type: 'text',
                    defaultValue: '<ph_project_api_key>',
                },
                {
                    id: 'persistence',
                    label: 'Persistence method',
                    description: 'How to store user identity',
                    type: 'text',
                    placeholder: 'localStorage+cookie (default)',
                    defaultValue: '',
                    group: 'advanced',
                },
            ]}
            generateCode={generateCode}
            getFilename={getFilename}
            getLanguage={getLanguage}
        />
    )
}

export default JSConfigBuilder
