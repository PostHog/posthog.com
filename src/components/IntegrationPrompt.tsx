import React, { useState } from 'react'
import { CodeBlock } from './CodeBlock'

export default function IntegrationPrompt() {
    const [region, setRegion] = useState('us')

    return (
        <>
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
                <CodeBlock
                    currentLanguage={{
                        language: 'Agent',
                        code: `Let's integrate PostHog. Run the following command; don't write any code until it completes:

npx --yes @posthog/wizard@latest --default --region ${region}`,
                    }}
                    label="LLM agent prompt"
                    showLabel={true}
                    showCopy={true}
                >
                    {[
                        {
                            language: 'Agent',
                            code: `Let's integrate PostHog. Run the following command; don't write any code until it completes:

npx --yes @posthog/wizard@latest --default --region ${region}`,
                        },
                    ]}
                </CodeBlock>
                <p className="text-sm text-primary/75 dark:text-primary-dark/75 mt-2 mb-0">
                    Supports Next.js, React, React Native, Svelte, and Astro.{' '}
                    <a href="https://github.com/PostHog/wizard" className="text-orange hover:text-orange/75">
                        More on the way!
                    </a>
                </p>
            </div>
            <div className="w-[70%] mx-auto text-center">
                <button
                    onClick={() => setRegion(region === 'us' ? 'eu' : 'us')}
                    className="text-sm text-orange hover:text-orange/75 cursor-pointer"
                >
                    give me the {region === 'us' ? 'eu' : 'us'} prompt!
                </button>
            </div>
        </>
    )
}
