import React from 'react'
import './style.scss'

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
            <div className="newsletter-form-wrapper center">
                <link
                    href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css"
                    rel="stylesheet"
                    type="text/css"
                />
                <div id="mc_embed_signup">
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
                            <label htmlFor="mce-EMAIL">Stay up to date with PostHog</label>
                            <input
                                type="email"
                                name="EMAIL"
                                className="email"
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
                                <input
                                    style={{ marginLeft: 5 }}
                                    type="submit"
                                    value="Subscribe"
                                    name="subscribe"
                                    id="mc-embedded-subscribe"
                                    className="button"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
