import React from 'react'
import posthog from 'posthog-js'
import { JSHtmlSnippet, JSInitSnippet } from 'onboarding/product-analytics'

function getPosthogMethods(): string[] {
    const methods: string[] = []
    const posthogPrototype = Object.getPrototypeOf(posthog)
    for (const key of Object.getOwnPropertyNames(posthogPrototype)) {
        if (
            typeof posthogPrototype[key] === 'function' &&
            !key.startsWith('_') &&
            !['constructor', 'toString', 'push'].includes(key)
        ) {
            methods.push(key)
        }
    }
    return methods
}

// Website versions of the JS snippet components.
// These use placeholder tokens that the website's CodeBlock replaces
// with real values from cookies (ph_current_project_token, etc.).
export const WebsiteJSHtmlSnippet = () => (
    <JSHtmlSnippet
        projectToken="<ph_project_token>"
        methods={getPosthogMethods()}
        options={{
            api_host: { content: '<ph_client_api_host>', enabled: true },
            defaults: { content: '<ph_posthog_js_defaults>', enabled: true },
        }}
    />
)

export const WebsiteJSInitSnippet = () => <JSInitSnippet defaultsDate="<ph_posthog_js_defaults>" />
