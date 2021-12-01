import React from 'react'
import GitHubButton from 'react-github-btn'

export default function StarUsBanner() {
    return (
        <div className="bg-[#F54E00] p-3 text-center">
            <p className="m-0 flex justify-center items-center space-x-3 text-white font-semibold">
                <span>Star us on GitHub</span>
                <span className="h-[28px]">
                    <GitHubButton
                        href="https://github.com/posthog/posthog"
                        data-size="large"
                        data-show-count="true"
                        aria-label="Star posthog/posthog on GitHub"
                    >
                        Star
                    </GitHubButton>
                </span>
            </p>
        </div>
    )
}
