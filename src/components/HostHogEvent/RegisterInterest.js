import React from 'react'
import { section, heading } from 'components/HostHogHub/classes.js'

const MailChimpForm = () => {
    return (
        <>
            {/* <!-- Begin Mailchimp Signup Form --> */}
            <div id="mc_embed_signup">
                <form
                    action="https://posthog.us19.list-manage.com/subscribe/post?u=292207b434c26e77b45153b96&amp;id=1170344655"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    className="validate"
                    target="_blank"
                    noValidate
                >
                    <div id="mc_embed_signup_scroll">
                        <div className="indicates-required">
                            <div className="mc-field-group">
                                <input
                                    type="email"
                                    placeholder="hedgehog@posthog.com"
                                    defaultValue=""
                                    name="EMAIL"
                                    className="required email bg-white text-md rounded-md w-3/6 p-2 mb-4"
                                    id="mce-EMAIL"
                                />
                            </div>
                            <div id="mce-responses" className="clear">
                                <div className="response hidden" id="mce-error-response"></div>
                                <div className="response hidden" id="mce-success-response"></div>
                            </div>
                            {/* <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--> */}
                            <div
                                style={{ position: 'absolute', left: '-5000px;', ariaHidden: true }}
                                className="hidden"
                            >
                                <input
                                    placeholder="hedgehog@posthog.com"
                                    type="text"
                                    name="b_292207b434c26e77b45153b96_1170344655"
                                    tabIndex="-1"
                                    value=""
                                    className="text-md bg-white rounded-md"
                                />
                            </div>
                            <div className="clear">
                                <input
                                    type="submit"
                                    value="I'm interested"
                                    name="subscribe"
                                    id="mc-embedded-subscribe"
                                    className="button"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* <!--End mc_embed_signup--> */}
        </>
    )
}

export default function RegisterInterest() {
    return (
        <section className={section('text-center')}>
            <div className="bg-black rounded-lg py-14 px-16 w-9/12 mx-auto">
                <h2 className={heading('md', 'white')}>Register your interest</h2>
                <p className="text-white py-4 px-16">
                    Attendance is limited and free spots get snapped up quickly. Drop your email address below and we’ll
                    let you know as soon as you can RSVP.
                </p>

                <div>
                    <MailChimpForm />
                </div>
            </div>
        </section>
    )
}
