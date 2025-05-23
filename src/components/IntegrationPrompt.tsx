import React from 'react'
import { CodeBlock } from './CodeBlock'
import Link from './Link'
import { useUser } from 'hooks/useUser'

export default function IntegrationPrompt() {
    const { user } = useUser()
    const basePrompt = `Let's integrate PostHog. Run the following command; don't write any code until it completes:

npx --yes @posthog/wizard@latest --default --region <ph_region>`

    let finalPrompt: string

    if (user) {
        finalPrompt = basePrompt
    } else {
        finalPrompt = `${basePrompt} --signup`
    }

    const languageOption = {
        language: 'Agent',
        code: finalPrompt,
    }

    return (
        <div className="md:block">
            <div className="rounded border border-border dark:border-border-dark px-5 py-4 bg-white dark:bg-accent-dark">
                <div className=" items-center gap-2 mb-1">
                    <h4 className="text-lg font-bold m-0">
                        <span className=" mr-1">Integrate PostHog in 90 seconds with this prompt</span>
                        <span className="bg-orange/10 !text-orange px-1 rounded-sm text-[13px] font-semibold flex-shrink-0 border border-orange">
                        BETA
                        </span>
                    </h4>
                    
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
                        className="text-red dark:text-yellow hover:text-red dark:hover:text-yellow font-semibold"
                    >
                        More on the way!
                    </Link>
                </p>
            </div>
        </div>
    )
}
