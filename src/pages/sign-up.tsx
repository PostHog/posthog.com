import React from 'react'
import { SEO } from '../components/seo'
import '../components/Pricing/styles/index.scss'
import Header from 'components/Header'
import funnelsScreenshot from '/src/images/product-screenshots/browserframe-screenshot-new-funnels.png'
import { SignupModal } from 'components/SignupModal'
import { useActions, useValues } from 'kea'
import { Realm, signupLogic, SignupModalView } from 'logic/signupLogic'
import './styles/sign-up.scss'
import { ButtonBlock } from 'components/ButtonBlock/ButtonBlock'

const BenefitsList = ({ items }: { items: (string | React.ReactNode)[] }): JSX.Element => {
    return (
        <ul>
            {items.map((child, i) => (
                <li key={i}>
                    {child}
                    <span className="separator-line" />
                </li>
            ))}
        </ul>
    )
}

const SignUpPage = (): JSX.Element => {
    const { modalView, email } = useValues(signupLogic)
    const { reportDeploymentTypeSelected } = useActions(signupLogic)
    return (
        <div>
            <SEO
                title="Sign Up • PostHog"
                description="Unlock insights. Our Open Source, Scale, and Cloud editions provide flexible deployment of reliable analytics."
            />
            <Header onPostPage={false} logoOnly transparentBackground />
            <div className="w-full h-full relative flex items-center justify-center">
                {modalView === SignupModalView.EMAIL_PROMPT && (
                    <>
                        <img
                            src={funnelsScreenshot}
                            alt="PostHog Insights interface showing new Funnels features"
                            style={{ maxWidth: '75vw' }}
                        />
                        <SignupModal />
                    </>
                )}
                {modalView === SignupModalView.DEPLOYMENT_OPTIONS && (
                    <div className="w-full">
                        <div className="text-white text-center">
                            <h1 className="leading-tight mb-4">Choose your edition</h1>
                            <p className="opacity-75">
                                Get the same product suite, whether you self-host or choose PostHog Cloud.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pricing-grid">
                            <div className="pricing-card">
                                <h2 className="bg-yellow">Self-host</h2>
                                <div className="card-body">
                                    <p>Benefits</p>
                                    <BenefitsList
                                        items={[
                                            'Data stays on your infrastructure',
                                            'Full access to production instance',
                                            'No third-party cookies',
                                        ]}
                                    />
                                    <ButtonBlock
                                        as="a"
                                        href="/docs/self-host/overview"
                                        onClick={() => reportDeploymentTypeSelected(Realm.hosted)}
                                    >
                                        Select
                                    </ButtonBlock>
                                </div>
                                <footer>Self serve. Deploy with Docker, AWS, GCS + more</footer>
                            </div>
                            <div className="pricing-card">
                                <h2 className="bg-blue">Hosted</h2>
                                <div className="card-body">
                                    <p>Benefits</p>
                                    <BenefitsList
                                        items={[
                                            'Scales to billions of monthly events',
                                            'Automatic upgrades',
                                            'Start using immediately',
                                        ]}
                                    />
                                    <ButtonBlock
                                        as="a"
                                        href={`https://app.posthog.com/signup?email=${encodeURIComponent(email)}`}
                                        onClick={() => reportDeploymentTypeSelected(Realm.cloud)}
                                    >
                                        Select
                                    </ButtonBlock>
                                </div>
                                <footer>Self serve. Hosted & managed by PostHog.</footer>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SignUpPage
