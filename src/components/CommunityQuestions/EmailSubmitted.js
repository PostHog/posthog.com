import React, { useState } from 'react'
import { Check } from 'components/Icons/Icons'
import GitHubButton from 'react-github-btn'
import emailSaved from './email-saved.svg'
import Button from './Button'

export default function EmailSubmitted() {
    const [subscribed, setSubscribed] = useState(false)
    return (
        <div className="text-center">
            {subscribed ? (
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
                    <p className="m-0 flex justify-center items-centertext-white font-semibold">
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
            ) : (
                <>
                    <div className="bg-tan p-4 rounded-sm mb-4">
                        <h6 className="m-0">We’ll email you.</h6>
                        <p className="text-[14px] opacity-50 m-0">We typically answer in 1-2 days.</p>
                        <img className="mx-auto mt-2" src={emailSaved} />
                    </div>
                    <p className="text-[14px] opacity-50 m-0">While we have you...</p>
                    <h6 className="m-0">Care to receive our email updates?</h6>
                    <Button onClick={() => setSubscribed(true)}>Sure, subscribe me to the newsletter!</Button>
                </>
            )}
        </div>
    )
}
