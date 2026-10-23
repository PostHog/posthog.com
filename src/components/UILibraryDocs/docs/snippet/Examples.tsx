import React from 'react'
import { Snippet } from 'components/UI/Snippet'

export default function Examples(): JSX.Element {
    return (
        <div className="grid min-w-0 gap-4">
            <Snippet text="npx @posthog/wizard" />
            <Snippet text={['pnpm add posthog-js', 'pnpm dev']} />
            <Snippet
                text="const posthog = new PostHog('your_project_api_key', { api_host: 'https://us.i.posthog.com' })"
                prompt={false}
            />
        </div>
    )
}
