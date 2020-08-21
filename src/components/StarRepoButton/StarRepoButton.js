import React from 'react'
import GitHubButton from 'react-github-btn'

const StarRepoButton = () => (
    <GitHubButton
        href="https://github.com/PostHog/posthog"
        data-icon="octicon-star"
        data-size="large"
        data-show-count="true"
        aria-label="Star PostHog/posthog on GitHub"
    >
        Star
    </GitHubButton>
)

export default StarRepoButton

