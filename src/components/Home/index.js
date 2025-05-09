import React, { Fragment, useState } from 'react'
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
            <Logo className="h-10 mb-4" />
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
                    <Link to="/tour" className="font-semibold text-right dark:text-yellow">
                        take a tour
                    </Link>{' '}
                    or learn{' '}
                    <Link to="/#" className="font-semibold text-right dark:text-yellow">
                        why our website looks like this
                    </Link>
                </div>
            </div>
        </div>
    </div>
)

const AIInstallContent = () => (
    <div className="pt-8 px-8 flex flex-col items-center w-full mb-8">
        <div className="bg-accent border border-primary size-40 rounded-full flex items-center justify-center mb-4">
            <IconBold className="size-12" />
        </div>
        <h2 className="text-xl font-bold mb-1">Install PostHog with AI assistance</h2>
        <p className="text-[15px] text-secondary text-center mb-10">
            Our AI will guide you through the installation process step by step
        </p>
        <div className="grid grid-cols-1 gap-4 w-full max-w-2xl">
            <div className="flex items-start gap-3">
                <span>
                    <IconBold className="size-6" />
                </span>
                <div>
                    <div className="font-semibold">Quick setup</div>
                    <div className="text-secondary text-[15px]">Install PostHog in minutes with our AI assistant</div>
                </div>
            </div>
            <div className="flex items-start gap-3">
                <span>
                    <IconLink className="size-6" />
                </span>
                <div>
                    <div className="font-semibold">Framework detection</div>
                    <div className="text-secondary text-[15px]">
                        AI detects your tech stack and provides customized installation instructions
                    </div>
                </div>
            </div>
            <div className="flex items-start gap-3">
                <span>
                    <IconBold className="size-6" />
                </span>
                <div>
                    <div className="font-semibold">Code snippets</div>
                    <div className="text-secondary text-[15px]">
                        Get ready-to-use code snippets for your specific setup
                    </div>
                </div>
            </div>
        </div>
    </div>
)

const TalkToHumanDemo = () => (
    <div className="pt-8 px-8 flex flex-col items-center w-full mb-8">
        <h2 className="text-xl font-bold mb-1">Watch a demo first</h2>
        <p className="text-[15px] text-secondary text-center mb-10">
            See how PostHog can help your team build better products
        </p>
        <div className="w-full max-w-2xl bg-accent border border-primary p-4 rounded">
            <div className="aspect-video bg-primary flex items-center justify-center text-white">
                <p>Demo video placeholder</p>
            </div>
        </div>
    </div>
)

const TalkToHumanContact = () => (
    <div className="pt-8 px-8 flex flex-col items-center w-full mb-8">
        <h2 className="text-xl font-bold mb-1">Contact our team</h2>
        <p className="text-[15px] text-secondary text-center mb-10">
            Fill out this form and we'll get back to you shortly
        </p>
        <div className="w-full max-w-2xl">
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="w-full border border-primary rounded p-2"
                        placeholder="Your name"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full border border-primary rounded p-2"
                        placeholder="your.email@example.com"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message
                    </label>
                    <textarea
                        id="message"
                        rows={4}
                        className="w-full border border-primary rounded p-2"
                        placeholder="How can we help you?"
                    />
                </div>
            </div>
        </div>
    </div>
)

const TalkToHumanConfirmation = () => (
    <div className="pt-8 px-8 flex flex-col items-center w-full mb-8">
        <h2 className="text-xl font-bold mb-1">Thank you!</h2>
        <p className="text-[15px] text-secondary text-center mb-10">
            We've received your message and will get back to you soon.
        </p>
    </div>
)

export default function Home() {
    const posthog = usePostHog()
    const { closeWindow } = useApp()
    const { appWindow } = useWindow()
    const [selectedOption, setSelectedOption] = useState('free-signup')
    const [currentFlow, setCurrentFlow] = useState('main')
    const [currentSlide, setCurrentSlide] = useState(0)

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
                            window.open('https://app.posthog.com/signup', '_blank')
                        } else if (selectedOption === 'install-with-ai') {
                            setCurrentFlow('install-with-ai')
                        } else if (selectedOption === 'talk-to-a-human') {
                            setCurrentFlow('talk-to-a-human')
                        }
                    },
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
                    action: () => navigate('/docs/getting-started/install', { state: { newWindow: true } }),
                },
            },
        },
        'talk-to-a-human': {
            slides: [
                {
                    component: TalkToHumanDemo,
                    navigation: {
                        back: {
                            label: 'Back',
                            action: () => {
                                setCurrentFlow('main')
                                setCurrentSlide(0)
                            },
                        },
                        forward: {
                            label: 'Continue',
                            action: () => setCurrentSlide(1),
                        },
                    },
                },
                {
                    component: TalkToHumanContact,
                    navigation: {
                        back: {
                            label: 'Back',
                            action: () => setCurrentSlide(0),
                        },
                        forward: {
                            label: 'Submit form',
                            action: () => setCurrentSlide(2),
                        },
                    },
                },
                {
                    component: TalkToHumanConfirmation,
                    navigation: {
                        forward: {
                            label: 'Close',
                            action: () => {
                                closeWindow(appWindow)
                            },
                        },
                    },
                },
            ],
        },
    }

    // Get the current flow configuration
    const currentFlowConfig = flows[currentFlow]

    // For talk-to-a-human flow, get the current slide
    const currentSlideConfig = currentFlow === 'talk-to-a-human' ? currentFlowConfig.slides[currentSlide] : null

    // Get the component to render
    const ContentComponent = currentSlideConfig ? currentSlideConfig.component : currentFlowConfig.component

    // Get the navigation config
    const navigationConfig = currentSlideConfig ? currentSlideConfig.navigation : currentFlowConfig.navigation

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

    return (
        <>
            <SEO
                title="PostHog - How developers build successful products"
                description="PostHog is the only all-in-one platform for product analytics, feature flags, session replays, experiments, and surveys that's built for developers."
                image={`/images/home.png`}
            />
            <Wizard leftNavigation={renderLeftNavigation()} rightNavigation={renderRightNavigation()}>
                {currentFlow === 'main' ? (
                    <ContentComponent {...currentFlowConfig.props} />
                ) : (
                    <ScrollArea className="flex-1 w-full border-y border-primary flex flex-col items-center">
                        <ContentComponent />
                    </ScrollArea>
                )}
            </Wizard>
        </>
    )
}
