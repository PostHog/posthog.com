import React from 'react'
import { CodeBlock } from './CodeBlock'
import Link from './Link'

export default function IntegrationPrompt() {
    const promptCode = `Let's integrate PostHog. Run the following command; don't write any code until it completes:

npx --yes @posthog/wizard@latest --default --region <ph_region>`

    const languageOption = {
        language: 'Agent',
        code: promptCode,
    }

    return (
        <div className="md:block">
            <div className="rounded border border-border dark:border-border-dark px-5 py-4 max-w-[700px] w-full mx-auto bg-white dark:bg-accent-dark">
                <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg font-bold m-0">Integrate PostHog in 90 seconds with this prompt</h4>
                    <span className="bg-orange/10 !text-orange px-1 py-0.5 rounded text-sm font-semibold flex-shrink-0 border border-orange">
                        BETA
                    </span>
                </div>
                <p className="text-[15px] text-primary dark:text-primary-dark mb-4">
                    Works with agent-based coding tools like Cursor and Bolt.
                </p>
                <CodeBlock currentLanguage={languageOption} label="LLM agent prompt" showLabel={true} showCopy={true}>
                    {[languageOption]}
                </CodeBlock>
                <p className="text-[13px] text-primary/85 dark:text-primary-dark/85 m-0 -mt-0.5">
                    Supports Next.js, React, React Native, Svelte, and Astro.{' '}
                    <Link
                        to="/docs/getting-started/install?tab=wizard"
                        className="text-yellow dark:text-red hover:text-yellow dark:hover:text-red"
                    >
                        More on the way!
                    </Link>
                </p>
            </div>
        </div>
    )
}
