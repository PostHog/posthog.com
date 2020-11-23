import React from 'react'
import GitHubButton from 'react-github-btn'

interface StarRepoButtonProps {
    theme: string
}

export const StarRepoButton = ({ theme = 'light' }: StarRepoButtonProps) => (
    <span id="github-star-repo-btn">
        <GitHubButton
            href="https://github.com/PostHog/posthog"
            data-icon="octicon-star"
            data-size="large"
            data-show-count={true}
            data-color-scheme={theme}
            aria-label="Star PostHog/posthog on GitHub"
        >
            Star
        </GitHubButton>
    </span>
)
