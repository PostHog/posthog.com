import React from 'react'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import CommunityCTA from 'components/CommunityCTA'
import TutorialsSlider from 'components/TutorialsSlider'
import Editor from 'components/Editor'

const Tracks: React.FC = () => {
    return (
        <Editor
            // title="Tracks - PostHog"
            type="mdx"
            slug="/tracks"
            bookmark={{
                title: 'Tracks',
                description: 'Curated lesson tracks from our engineers and users, to help you build better products',
            }}
        >
            <div className="@container">
                <h1>Tracks</h1>
                <h2>Curated lessons from our engineers and users, to help you build better products</h2>

                <p>
                    Here you'll find common uses for particular roles, as well as general advice for all users - and
                    it's constantly expanding!
                </p>

                <hr />

                <h2>
                    PostHog <s className="text-secondary">for dummies</s> 101
                </h2>

                <p>Want a quick summary of the essential info? Well then stop scrolling.</p>

                <TutorialsSlider
                    slugs={[
                        '/tutorials/non-technical-guide-to-data',
                        '/tutorials/event-tracking-guide',
                        '/tutorials/regex-basics',
                        '/tutorials/identifying-users-guide',
                        '/tutorials/next-steps-after-installing',
                    ]}
                />

                <hr />

                <h2>
                    PostHog for <span className="text-red">product engineers</span>
                </h2>

                <p>Are you part-engineer, part-product person? Congrats, you found the right section.</p>

                <TutorialsSlider
                    slugs={[
                        '/tutorials/multiple-environments',
                        '/tutorials/canary-release',
                        '/tutorials/build-your-own-posthog-app',
                        '/tutorials/new-user-experiments',
                        '/tutorials/feature-retention',
                        '/tutorials/explore-insights-session-recordings',
                    ]}
                />

                <hr />

                <h2>
                    PostHog for <span className="text-red">front-end developers</span>
                </h2>

                <p>Want to build site apps and design products users love? These will help.</p>

                <TutorialsSlider
                    slugs={[
                        '/tutorials/test-frontend-feature-flags',
                        '/tutorials/react-popups',
                        '/tutorials/vue-cookie-banner',
                        '/tutorials/build-site-app',
                        '/tutorials/cookieless-tracking',
                    ]}
                />

                <hr />

                <h2>
                    PostHog for <span className="text-red">product managers</span>
                </h2>

                <p>Find the right users to talk to, organize interviews and gather intelligence.</p>

                <TutorialsSlider
                    slugs={[
                        '/tutorials/churn-rate',
                        '/tutorials/feature-retention',
                        '/tutorials/feedback-interviews-site-apps',
                        '/tutorials/stripe-payment-data',
                        '/tutorials/explore-insights-session-recordings',
                    ]}
                />

                <hr />

                <CommunityCTA />

                <hr />
                <section className="my-12 px-5">
                    <div className="max-w-screen-md">
                        <h2 className="">The PostHog way</h2>
                        <p>
                            We're open source, fully remote and we believe in transparency. Part of what's helped
                            PostHog ship so fast is that we share as much information as we can, including about the way
                            we work.
                        </p>
                        <ul className="">
                            <li className="">
                                <Link to="/blog/interview-snapshot-guide" state={{ newWindow: true }}>
                                    How to turn user interviews into actionable snapshots
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog/transparent-enterprise-pricing" state={{ newWindow: true }}>
                                    Why we ditched 'talk to sales' for transparent pricing
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog/posthog-first-five" state={{ newWindow: true }}>
                                    What we learned about hiring from our first five employees
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog/how-to-run-a-transparent-company" state={{ newWindow: true }}>
                                    How to run a transparent startup
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog/making-something-people-want" state={{ newWindow: true }}>
                                    How we made something people want
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog/startup-ops-toolkit" state={{ newWindow: true }}>
                                    The ops toolkit for early-stage startups
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog/startup-finance-without-finance" state={{ newWindow: true }}>
                                    How to run finance at your startup without hiring a finance person
                                </Link>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </Editor>
    )
}

export default Tracks
