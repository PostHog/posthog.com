import React from 'react'

export const Blockquote = () => {
    return (
        <div className="blockquote-section pt-6 pb-4">
            &nbsp;
            <div className="w-11/12 max-w-xl mx-auto md:mt-12 bg-opacity-20 rounded p-8 text-center text-white relative">
                <p className="opacity-80">
                    PostHog is what I always wanted a Product Analytics SaaS to be. Private cloud option so GDPR becomes
                    way more manageable, features built based on direct community feedback, focus on simplicity and
                    usefulness over vanity features...Great job people!
                </p>
                <span className="block opacity-50">@benjackwhite</span>
            </div>
        </div>
    )
}
