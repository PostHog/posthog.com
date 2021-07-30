import React from 'react'
import { SEO } from '../components/seo'
import '../components/Pricing/styles/index.scss'
import Header from 'components/Header'
import funnelsScreenshot from '/src/images/product-screenshots/browserframe-screenshot-new-funnels.png'
import { SignupModal } from 'components/SignupModal'
import { useActions, useValues } from 'kea'
import { Realm, signupLogic, SignupModalView } from 'logic/signupLogic'
import './styles/sign-up.scss'
import posthogIcon from '../../contents/images/logos/posthog-icon-black.svg'
import { ButtonBlock } from 'components/ButtonBlock/ButtonBlock'
import { BadgeWrapper, CloudIcon, OpenSourceIcon, ServerIcon, UpAndToTheRightIcon } from 'components/Icons/Icons'

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
                                <h2 className="bg-yellow">
                                    <ServerIcon />
                                    Self-host
                                </h2>
                                <div className="card-body">
                                    <div className="icon-flex-row">
                                        <div className="icon-lockup">
                                            <BadgeWrapper
                                                style={{
                                                    background: 'rgba(251, 79, 13, 0.1)',
                                                    color: '#F75A01',
                                                }}
                                            >
                                                <OpenSourceIcon />
                                            </BadgeWrapper>
                                            <h3 className="font-sans">Open source</h3>
                                            <p>Free forever</p>
                                        </div>
                                        <div className="icon-lockup">
                                            <BadgeWrapper
                                                style={{
                                                    background: 'rgba(58, 94, 244, 0.1)',
                                                    color: '#3A5EF4',
                                                }}
                                            >
                                                <UpAndToTheRightIcon />
                                            </BadgeWrapper>
                                            <h3 className="font-sans">Enterprise</h3>
                                            <p>From $2k/mo</p>
                                        </div>
                                    </div>
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
                                <h2 className="bg-blue">
                                    <CloudIcon />
                                    Hosted
                                </h2>
                                <div className="card-body">
                                    <div className="icon-flex-row">
                                        <div className="icon-lockup">
                                            <img src={posthogIcon} style={{ height: 36 }} className="posthog-icon" />
                                            <h3 className="font-sans">PostHog Cloud</h3>
                                            <p>Pay per event</p>
                                        </div>
                                    </div>
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
