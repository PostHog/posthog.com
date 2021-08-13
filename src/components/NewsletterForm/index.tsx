import React, { useState } from 'react'
import { CallToAction } from '../CallToAction'
import { mergeClassList } from '../../lib/utils'

import checkDark from './images/check-dark.svg'

export const NewsletterForm = ({
    compact = false,
    bgColor = '#08042f',
    className = '',
}: {
    compact?: boolean
    bgColor?: string
    className?: string
}) => {
    const [email, setEmail] = useState('')
    const classList = mergeClassList(
        'rounded-lg flex justify-between flex-col lg:flex-row py-6 px-6 md:px-12 relative z-10 items-center justify-between',
        className
    )

    return compact ? (
        <div className="w-full mx-auto my-24 text-center">
            <div className="bg-neon inline-flex mx-auto h-full p-1 rounded">
                <div className={classList}>
                    <img src={checkDark} alt="sign up for mailing list" className="block lg:mr-3 h-8 mb-0" />
                    <span className="mt-4 lg:mt-0 font-bold flex-grow text-lg md:text-sm">
                        Yes, I'd love to receive PostHog updates in my inbox at
                    </span>
                    <form
                        action="https://posthog.us19.list-manage.com/subscribe/post?u=292207b434c26e77b45153b96&id=97194afa0a"
                        method="post"
                        id="mc-embedded-subscribe-form"
                        name="mc-embedded-subscribe-form"
                        className="validate flex flex-col lg:flex-row items-center mb-0"
                        target="_blank"
                        noValidate
                    >
                        <input
                            type="email"
                            name="EMAIL"
                            className="block w-full p-2 bg-transparent border-b-2 border-gray-600 mt-8 lg:mt-0 lg:mx-2 text-black"
                            id="mce-EMAIL"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@address.com"
                            value={email}
                            required
                        />
                        {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
                        <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                            <input
                                type="text"
                                name="b_292207b434c26e77b45153b96_97194afa0a"
                                tabIndex={-1}
                                defaultValue
                            />
                        </div>
                        <input
                            type="submit"
                            className="button-primary mt-8 lg:mt-0 border-none cursor-pointer ml-1 px-3 py-2 rounded"
                            value="Subscribe"
                        />
                    </form>
                </div>
            </div>
        </div>
    ) : (
        <div className="w-11/12 max-w-4xl mx-auto mb-48">
            <div className="bg-neon w-full h-full p-1 rounded">
                <div
                    className="rounded-lg flex justify-between flex-col lg:flex-row p-8 relative z-10"
                    style={{ backgroundColor: bgColor }}
                >
                    <div className="w-full lg:w-2/3 lg:mr-4 text-white">
                        <h5 className="text-white text-3xl gosha">Your inbox but better...</h5>
                        <p className="opacity-80 text-sm">
                            Our newsletter keeps you up to date on what great things we are doing here at PostHog, and
                            trust me you don’t want to miss a thing.
                        </p>
                        <p className="opacity-80 mt-2 text-sm">
                            Plus if you decide that these emails aren’t brightening your day, you can unsubscribe at any
                            time, no hard feelings.
                        </p>
                    </div>

                    <div className="w-full lg:w-1/3 lg:ml-4">
                        <form
                            action="https://posthog.us19.list-manage.com/subscribe/post?u=292207b434c26e77b45153b96&id=97194afa0a"
                            method="post"
                            id="mc-embedded-subscribe-form"
                            name="mc-embedded-subscribe-form"
                            className="validate"
                            target="_blank"
                            noValidate
                        >
                            <div id="mc_embed_signup_scroll">
                                <strong className="text-white gosha text-lg">Join our newsletter</strong>
                                <label className="text-white opacity-80 mt-3 block" htmlFor="mce-EMAIL">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    name="EMAIL"
                                    className="block w-full py-2 px-3 bg-white text-gray-900 rounded my-1"
                                    id="mce-EMAIL"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email address"
                                    value={email}
                                    required
                                />
                                {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
                                <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                                    <input
                                        type="text"
                                        name="b_292207b434c26e77b45153b96_97194afa0a"
                                        tabIndex={-1}
                                        defaultValue
                                    />
                                </div>
                                <div className="clear">
                                    <CallToAction
                                        type="custom"
                                        icon="check"
                                        width="full"
                                        className="text-white border-white border-2 mt-2 hover:bg-white hover:bg-opacity-20"
                                        submit={true}
                                    >
                                        Join the List
                                    </CallToAction>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
