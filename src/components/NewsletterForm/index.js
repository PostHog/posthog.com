import React from 'react'
import { CallToAction } from '../CallToAction'

export class NewsletterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { email: '' }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        window.posthog.identify(event.target.value)
        window.posthog.people.set({ newsletter_subscriber: true })
        this.setState({ email: event.target.value })
    }

    render() {
        return (
            <div className="w-11/12 max-w-4xl mx-auto mb-24">
                <div className="bg-neon w-full h-full p-1 rounded">
                    <div
                        className="rounded flex justify-between flex-col lg:flex-row p-8 relative z-10"
                        style={{ backgroundColor: '#08042f' }}
                    >
                        <div className="w-full lg:w-2/3 lg:mr-4 text-white">
                            <h5 className="text-white text-3xl gosha">Your inbox but better...</h5>
                            <p className="opacity-80 text-sm">
                                Our newsletter keeps you up to date on what great things we are doing here at PostHog,
                                and trust me you don’t want to miss a thing.
                            </p>
                            <p className="opacity-80 mt-2 text-sm">
                                Plus if you decide that these emails aren’t brightening your day, you can unsuscribe at
                                any time, no hard feelings.
                            </p>
                        </div>

                        <div className="w-full lg:w-1/3 lg:ml-4">
                            <form
                                action="https://posthog.us19.list-manage.com/subscribe/post?u=292207b434c26e77b45153b96&id=1474906643"
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
                                        className="block w-full py-2 px-3 bg-white text-gray-900 rounded mt-1"
                                        id="mce-EMAIL"
                                        onChange={this.handleChange}
                                        placeholder="email address"
                                        value={this.state.email}
                                        required
                                    />
                                    {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
                                    <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                                        <input
                                            type="text"
                                            name="b_292207b434c26e77b45153b96_1474906643"
                                            tabIndex={-1}
                                            defaultValue
                                        />
                                    </div>
                                    <div className="clear">
                                        <CallToAction
                                            type="secondary"
                                            icon="check"
                                            width="full"
                                            className="mt-2"
                                            submit={true}
                                        >
                                            Join the List
                                        </CallToAction>
                                        {/* <input
                                            style={{ marginLeft: 5 }}
                                            type="submit"
                                            value="Subscribe"
                                            name="subscribe"
                                            id="mc-embedded-subscribe"
                                            className="button"
                                        /> */}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
