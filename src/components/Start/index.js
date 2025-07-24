import React, { Fragment, useState, useEffect } from 'react'
import SEO from 'components/seo'
import Wizard from 'components/Wizard'
import { CallToAction } from 'components/CallToAction'
import { productMenu } from '../../navs'
import * as Icons from '@posthog/icons'
import Link from 'components/Link'
import { IconBold, IconLink } from 'components/OSIcons'
import ScrollArea from 'components/RadixUI/ScrollArea'
import Logo from 'components/Logo'
import { RadioGroup } from 'components/RadixUI/RadioGroup'
import { navigate } from 'gatsby'
import usePostHog from '../../hooks/usePostHog'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import CodeBlock from '../Home/CodeBlock'
import ContactForm from '../Home/ContactForm'
import { useLocation } from '@reach/router'
const MainContent = ({ selectedOption, setSelectedOption, options }) => (
    <div className="flex flex-1 w-full border-y border-primary">
        <div data-scheme="primary" className="w-[40%] flex items-center justify-center p-2 border-r border-primary">
            <div className="w-full bg-accent flex items-center justify-center h-full text-sm relative border border-primary overflow-hidden">
                <img src="https://res.cloudinary.com/dmukukwp6/image/upload/3000_773e0d4c49.png" className="" />
                <img
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/yc_approved_347c12b8e6.png"
                    className="absolute -right-24 top-6 rotate-[45deg]"
                />
            </div>
        </div>
        <div className="w-[60%] flex flex-col justify-center px-8 py-4">
            <Logo className="h-10 mb-4 dark:hidden" />
            <Logo className="h-10 mb-4 hidden dark:block" fill="white" />
            <h1 className="text-xl font-bold mb-1">The toolkit for building successful products</h1>
            <p className="text-secondary text-[15px]">
                PostHog is the single platform to build products, talk to users, and ship new features
            </p>
            <div className="mt-4">
                <RadioGroup
                    title="Menu options"
                    options={options}
                    value={selectedOption}
                    onValueChange={setSelectedOption}
                />

                <div className="mt-6 text-sm border-t border-primary pt-6">
                    You can also{' '}
                    <Link to="/demo" className="font-semibold text-red dark:text-yellow" state={{ newWindow: true }}>
                        watch a demo
                    </Link>{' '}
                    or learn{' '}
                    <Link to="/credits" className="font-semibold text-red dark:text-yellow" state={{ newWindow: true }}>
                        why our website looks like this
                    </Link>
                    .
                </div>
            </div>
        </div>
    </div>
)

const AIInstallContent = () => (
    <div className="pt-8 px-8 flex flex-col items-center w-full mb-8">
        <h2 className="text-xl font-bold mb-1">Integrate PostHog in 90 seconds</h2>
        <p className="text-[15px] text-secondary text-center mb-10">
            Let's integrate PostHog. Run the following command; don't write any code until it completes:
        </p>

        <div className="w-full max-w-2xl">
            <CodeBlock
                code="npx --yes @posthog/wizard@latest --default --region us"
                language="bash"
                hideNumbers={false}
            />
        </div>
        <p className="text-[13px] text-secondary dark:text-primary-dark/85 m-0 -mt-0.5">
            Works with agent-based coding tools like Cursor and Bolt. Supports Next.js, React, React Native, Svelte, and
            Astro.{' '}
            <Link to="/docs/getting-started/install?tab=wizard" className="font-semibold text-right dark:text-yellow">
                More on the way!
            </Link>
        </p>
    </div>
)

const SignupContent = () => (
    <div className="flex flex-1 w-full h-full border-y border-primary">
        <iframe src="https://app.posthog.com/signup" className="w-full h-full border-0" title="PostHog signup" />
    </div>
)

const TalkToHumanContact = ({ onClose, onFormSubmit }) => {
    const [formSubmitted, setFormSubmitted] = useState(false)

    const handleFormSubmit = () => {
        setFormSubmitted(true)
        onFormSubmit()
    }

    return (
        <div data-scheme="secondary" className="flex flex-1 w-full overflow-hidden border-y border-primary bg-primary">
            <div data-scheme="primary" className="w-[40%] flex items-center justify-center p-2 border-r border-primary">
                <div className="w-full bg-accent flex items-end justify-center h-full px-4 text-sm relative border border-primary overflow-hidden">
                    <img
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/quick_calls_5c19368fa0.png"
                        className="w-[415px] max-w-full"
                    />
                </div>
            </div>
            <ScrollArea className="h-full w-[60%] ">
                <div className="flex flex-col justify-center px-8 py-4 h-full">
                    <h2 className="text-xl font-bold mb-1">Let's chat</h2>

                    <div className="border border-primary p-2 text-sm mb-4">
                        Want to watch a{' '}
                        <Link to="/demo" className="font-semibold text-red" state={{ newWindow: true }}>
                            demo
                        </Link>{' '}
                        first?
                    </div>
                    <div className="w-full max-w-2xl">
                        <ContactForm
                            onSubmit={handleFormSubmit}
                            hideSubmitButton={true}
                            buttonText="Submit"
                            successMessage="Message received. We'll be in touch!"
                        />
                        {formSubmitted && (
                            <div className="mt-4 flex justify-center">
                                <CallToAction type="primary" size="sm" onClick={onClose}>
                                    Close
                                </CallToAction>
                            </div>
                        )}
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}

export default function Start() {
    const posthog = usePostHog()
    const { closeWindow } = useApp()
    const { appWindow } = useWindow()
    const [selectedOption, setSelectedOption] = useState('free-signup')
    const [currentFlow, setCurrentFlow] = useState('main')
    const [currentSlide, setCurrentSlide] = useState(0)
    const [contactFormSubmitted, setContactFormSubmitted] = useState(false)
    const { search } = useLocation()

    const handleClose = () => {
        closeWindow(appWindow)
    }

    const handleContactFormSubmit = () => {
        setContactFormSubmitted(true)
    }

    // Define the wizard flows
    const flows = {
        main: {
            component: MainContent,
            props: {
                selectedOption,
                setSelectedOption,
                options: [
                    {
                        label: 'Get started – free',
                        value: 'free-signup',
                        default: true,
                    },
                    {
                        label: 'Install with AI',
                        value: 'install-with-ai',
                    },
                    {
                        label: 'Talk to a human',
                        value: 'talk-to-a-human',
                    },
                ],
            },
            navigation: {
                forward: {
                    label: 'Continue',
                    action: () => {
                        if (selectedOption === 'free-signup') {
                            setCurrentFlow('signup')
                        } else if (selectedOption === 'install-with-ai') {
                            setCurrentFlow('install-with-ai')
                        } else if (selectedOption === 'talk-to-a-human') {
                            setCurrentFlow('talk-to-a-human')
                        }
                    },
                },
            },
        },
        signup: {
            component: SignupContent,
            navigation: {
                back: {
                    label: 'Back',
                    action: () => setCurrentFlow('main'),
                },
            },
        },
        'install-with-ai': {
            component: AIInstallContent,
            navigation: {
                back: {
                    label: 'Back',
                    action: () => setCurrentFlow('main'),
                },
                forward: {
                    label: 'Open docs',
                    action: () => navigate('/docs/getting-started/install?tab=snippet', { state: { newWindow: true } }),
                },
            },
        },
        'talk-to-a-human': {
            component: TalkToHumanContact,
            props: {
                onClose: handleClose,
                onFormSubmit: handleContactFormSubmit,
            },
            navigation: {
                back: {
                    label: 'Back',
                    action: () => setCurrentFlow('main'),
                },
                forward: contactFormSubmitted
                    ? null
                    : {
                          label: 'Submit form',
                          action: () => {
                              if (typeof window !== 'undefined' && window.submitContactForm) {
                                  window.submitContactForm()
                              }
                          },
                      },
            },
        },
    }

    // Get the current flow configuration
    const currentFlowConfig = flows[currentFlow]

    // For talk-to-a-human flow, get the current slide
    const currentSlideConfig =
        currentFlowConfig.slides && typeof currentSlide === 'number' ? currentFlowConfig.slides[currentSlide] : null

    // Get the component to render
    const ContentComponent = currentSlideConfig ? currentSlideConfig.component : currentFlowConfig.component

    // Get the navigation config
    const navigationConfig = currentSlideConfig ? currentSlideConfig.navigation : currentFlowConfig.navigation

    // Get props to pass to the component
    const componentProps =
        currentSlideConfig && currentSlideConfig.props ? currentSlideConfig.props : currentFlowConfig.props || {}

    // Render left navigation button
    const renderLeftNavigation = () => {
        if (navigationConfig?.back) {
            return (
                <CallToAction type="secondary" size="sm" onClick={navigationConfig.back.action}>
                    {navigationConfig.back.label}
                </CallToAction>
            )
        }
        return null
    }

    // Render right navigation button
    const renderRightNavigation = () => {
        if (navigationConfig?.forward) {
            if (typeof navigationConfig.forward === 'object') {
                if (navigationConfig.forward.action && typeof navigationConfig.forward.action === 'function') {
                    return (
                        <CallToAction type="primary" size="sm" onClick={navigationConfig.forward.action}>
                            {navigationConfig.forward.label}
                        </CallToAction>
                    )
                } else if (navigationConfig.forward.to) {
                    return (
                        <Link to={navigationConfig.forward.to} state={{ newWindow: true }}>
                            <CallToAction type="primary" size="sm">
                                {navigationConfig.forward.label}
                            </CallToAction>
                        </Link>
                    )
                }
            }
        }
        return null
    }

    useEffect(() => {
        const params = new URLSearchParams(search)
        const flow = params.get('flow')
        if (flow) {
            setCurrentFlow(flow)
        }
    }, [search])

    return (
        <>
            <SEO
                title="PostHog - How developers build successful products"
                description="PostHog is the only all-in-one platform for product analytics, feature flags, session replays, experiments, and surveys that's built for developers."
                image={`/images/home.png`}
            />
            <Wizard leftNavigation={renderLeftNavigation()} rightNavigation={renderRightNavigation()}>
                {currentFlow === 'main' || currentFlow === 'signup' || currentFlow === 'talk-to-a-human' ? (
                    <ContentComponent {...componentProps} />
                ) : (
                    <ScrollArea className="flex-1 w-full border-y border-primary flex flex-col items-center">
                        <ContentComponent {...componentProps} />
                    </ScrollArea>
                )}
            </Wizard>
        </>
    )
}
