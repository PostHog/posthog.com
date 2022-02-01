import React from 'react'
import { Check } from 'components/Icons/Icons'
import GitHubButton from 'react-github-btn'

export default function Subscribed() {
    return (
        <>
            <p className="flex justify-center items-center space-x-1 font-semibold text-[#43AF79] m-0">
                <span className=" w-[24px] h-[24px] bg-[#43AF79] rounded-full flex justify-center items-center">
                    <Check className="w-[12px] h-[12px] text-white" />
                </span>
                <span>You're subscribed!</span>
            </p>
            <h6 className="mt-2 mb-3">
                Be sure to check us out on <a href="https://github.com/PostHog/posthog">Github.com</a>
            </h6>
            <p className="m-0 flex justify-center items-center text-white font-semibold h-[28px] w-[125px]">
                <GitHubButton
                    className="text-white hover:text-white"
                    href="https://github.com/posthog/posthog"
                    data-size="large"
                    data-show-count="true"
                    aria-label="Star posthog/posthog on GitHub"
                >
                    Star
                </GitHubButton>
            </p>
        </>
    )
}
