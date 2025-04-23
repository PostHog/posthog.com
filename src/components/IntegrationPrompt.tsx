import React from 'react'
import { CodeBlock } from './CodeBlock'

export default function IntegrationPrompt() {
    const promptCode = `Let's integrate PostHog. Run the following command; don't write any code until it completes:

npx --yes @posthog/wizard@latest --default --region <ph_region>`

    const languageOption = {
        language: 'Agent',
        code: promptCode,
    }

    return (
        <div className="md:block">
            <div className="rounded-lg border border-light dark:border-dark px-6 py-4 mt-16 mb-2 w-[70%] mx-auto bg-white dark:bg-accent-dark">
                <div className="flex items-center gap-2 mb-4">
                    <span className="bg-orange/10 !text-orange px-2 py-1 rounded text-sm font-semibold flex-shrink-0">
                        BETA
                    </span>
                    <h4 className="text-base font-bold m-0">Integrate PostHog in 90 seconds with this prompt</h4>
                </div>
                <p className="text-sm text-primary/75 dark:text-primary-dark/75 mb-4">
                    Works with agent-based coding tools like Cursor and Bolt:
                </p>
                <CodeBlock currentLanguage={languageOption} label="LLM agent prompt" showLabel={true} showCopy={true}>
                    {[languageOption]}
                </CodeBlock>
                <p className="text-sm text-primary/75 dark:text-primary-dark/75 mt-2 mb-0">
                    Supports Next.js, React, React Native, Svelte, and Astro.{' '}
                    <a href="/docs/getting-started/install?tab=wizard" className="text-orange hover:text-orange/75">
                        More on the way!
                    </a>
                </p>
            </div>
        </div>
    )
}
