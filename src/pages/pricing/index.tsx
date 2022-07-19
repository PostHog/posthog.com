import Layout from 'components/Layout'
import { StaticImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'
import { FAQs } from 'components/Pricing/FAQs'
import { Quote } from '../../components/Pricing/Quote'
import 'components/Pricing/styles/index.scss'
import { SEO } from '../../components/seo'
import cntl from 'cntl'
import Link from 'components/Link'
import { GitHub, Info } from 'components/Icons/Icons'
import Calculator from 'components/Pricing/Calculator/index'
import Features from 'components/Pricing/Features/index'
import AllPlans from 'components/Pricing/AllPlans'
import GitHubButton from 'react-github-btn'
import { animateScroll as scroll } from 'react-scroll'
import shape from './images/shape.svg'
import Modal from 'components/Modal'
import SelfHost from 'components/Pricing/Overlays/SelfHost'
import Enterprise from 'components/Pricing/Overlays/Enterprise'

export const section = cntl`
    max-w-6xl
    mx-auto
    px-5
`

const Button = ({
    onClick,
    children,
    active,
}: {
    onClick?: () => void
    children: React.ReactNode
    active?: boolean
}) => {
    return (
        <button
            className={`text-base font-bold flex items-center flex-grow sm:flex-grow-0 sm:w-[186px] justify-between px-4 py-2 bg-white rounded-sm shadow-sm text-black/70 hover:text-black/95 relative active:top-[1px] active:scale-[.97] active:border-[2.5px] active:border-red transition-none ${
                active ? 'border-red' : 'border-white'
            } border-[2.5px] transition-colors`}
            onClick={onClick}
        >
            <span>{children}</span>

            <svg
                className={`${active ? 'opacity-100' : 'opacity-0'} transition-none`}
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.9947 5.52548L6.4635 8.99428L14.7025 0.75528C15.2095 0.24824 16.0369 0.24824 16.5439 0.75528L17.3259 1.53732C17.833 2.04436 17.833 2.8717 17.3259 3.37872L7.46034 13.2443C6.95566 13.749 6.13534 13.7521 5.62674 13.2521L0.389145 8.10213C0.126645 7.84509 -0.00381509 7.52713 8.49096e-05 7.15995C0.00399111 6.79277 0.141491 6.47791 0.408685 6.22635L1.18056 5.49979C1.69306 5.01775 2.49696 5.02947 2.99462 5.52714L2.9947 5.52548Z"
                    fill="#F54E00"
                />
            </svg>
        </button>
    )
}

const PricingNew = (): JSX.Element => {
    const [selfHost, setSelfHost] = useState(false)
    const [enterprise, setEnterprise] = useState(false)
    const [currentModal, setCurrentModal] = useState<string | boolean>(false)

    const handleInfo = (currentModal: string) => {
        setCurrentModal(currentModal)
    }

    return (
        <Layout>
            <Modal open={!!currentModal} setOpen={setCurrentModal}>
                {currentModal === 'self host' ? (
                    <SelfHost setOpen={setCurrentModal} />
                ) : (
                    <Enterprise setOpen={setCurrentModal} />
                )}
            </Modal>
            <SEO title="PostHog Pricing" description="Find out how much it costs to use PostHog" />
            <section>
                <div className={`grid lg:grid-cols-2 lg:mt-12 md:mt-18 lg:gap-x-4 gap-y-3 lg:gap-y-0 mb-4 ${section}`}>
                    <div className="lg:order-2">
                        <StaticImage
                            alt="The cutest hedgehog you've ever seen driving a red tractor"
                            src="./images/tractor-hog.png"
                            className="lg:-mt-4 xl:-mt-12 max-w-screen-sm"
                            loading="eager"
                        />
                    </div>
                    <div className="lg:order-1">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl m-0">
                            Pay per tracked event.
                            <br /> Get access to all features.
                        </h1>
                        <h2 className="text-lg text-blue mt-2 leading-tight">
                            <span className="text-black/50 m-0">Your first</span>{' '}
                            <span className="inline-block">1 million events are free.</span>{' '}
                            <span className="text-black/50 m-0">Every month.</span>
                        </h2>
                        <p className="m-0 text-[14px] font-semibold text-black/50">
                            Need help{' '}
                            <Link to="/blog/calculating-events-from-users" className="font-bold">
                                estimating your event volume?
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
            <div className="relative">
                <section
                    className={`${section} my-8 md:my-12 grid md:grid-cols-2 md:gap-y-0 gap-y-12 md:gap-x-4 gap-x-0 items-start z-10 relative`}
                >
                    <div className="relative flex flex-col">
                        <h2 className="text-xl m-0 mb-6 md:mb-8">Calculate your monthly price</h2>
                        <div>
                            <h3 className="m-0 mb-1 text-[18px] flex items-center space-x-1">
                                <span>Do you need to self-host?</span>
                                <button onClick={() => handleInfo('self host')}>
                                    <Info />
                                </button>
                            </h3>
                            <p className="m-0 text-black/50 font-medium text-sm">
                                Customer data never leaves your infrastructure or private cloud.
                            </p>
                            <div className="flex space-x-3 mt-3">
                                <Button onClick={() => setSelfHost(true)} active={selfHost}>
                                    Yes
                                </Button>
                                <Button onClick={() => setSelfHost(false)} active={!selfHost}>
                                    No
                                </Button>
                            </div>
                            <h3 className="m-0 mb-1 text-[18px] mt-9 flex items-center space-x-1">
                                <span>Are you an enterprise?</span>
                                <button onClick={() => handleInfo('enterprise')}>
                                    <Info />
                                </button>
                            </h3>
                            <p className="m-0 text-black/50 font-medium text-sm">
                                Advanced permissioning, proactive support, training, SSO/SAML & more
                            </p>
                            <div className="flex space-x-3 mt-3">
                                <Button onClick={() => setEnterprise(true)} active={enterprise}>
                                    Yes
                                </Button>
                                <Button onClick={() => setEnterprise(false)} active={!enterprise}>
                                    No
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Calculator enterprise={enterprise} selfHost={selfHost} />
                </section>
                <img src={shape} className="absolute w-screen left-0 -bottom-12 md:block hidden" />
            </div>
            <section className={section}>
                <h2 className="text-xl m-0 flex items-center after:ml-6 after:flex-grow after:border-t after:border-gray-accent-light after:border-dashed">
                    What comes in PostHog?
                </h2>
                <p className="m-0 text-black/50 font-medium mb-7">Get access to all features and no plan limits.</p>
                <Features />
            </section>
            <section className={`${section} mb-12 mt-24`}>
                <h2 className="text-xl m-0 flex items-center after:ml-6 after:flex-grow after:border-t after:border-gray-accent-light after:border-dashed">
                    Compare all plans
                </h2>
                <AllPlans />
            </section>
            <section className={`${section} mb-12 mt-24`}>
                <h2 className="text-xl m-0 mb-6 pb-6 border-b border-gray-accent-light border-dashed">
                    PostHog open source
                </h2>
                <div className="grid lg:grid-cols-2 gap-x-4">
                    <div>
                        <p>
                            Our original open source product is available for self-hosting, and ships with product
                            analytics, feature flags, and session recordings.
                        </p>
                        <Link
                            className="p-2 sm:max-w-[250px] sm:w-auto w-full bg-primary flex items-center justify-center space-x-4 rounded-sm text-white hover:text-white text-[15px] font-bold relative active:top-[1px] active:scale-[.97]"
                            to="https://github.com/PostHog/posthog"
                        >
                            <GitHub />
                            <span>Browse on GitHub</span>
                        </Link>
                        <p className="text-xs opacity-50 mt-2">
                            Limitations: one project, no user permissions, and community support only.
                        </p>
                    </div>

                    <div className="sm:flex-row flex-col flex items-center sm:items-start justify-center mt-6 lg:-mt-10">
                        <div className="text-center bg-[#2D2D2D] p-4 rounded-md relative sm:-rotate-6 sm:-mr-8 flex-shrink-0">
                            <p className="text-white mb-2 mt-0 font-comic">Want to be our next star?</p>
                            <span className="h-[28px] w-[125px]">
                                <GitHubButton
                                    href="https://github.com/posthog/posthog"
                                    data-size="large"
                                    data-show-count="true"
                                    aria-label="Star posthog/posthog on GitHub"
                                >
                                    Star
                                </GitHubButton>
                            </span>
                            <svg
                                className="absolute left-2 sm:left-auto sm:right-2 -bottom-5"
                                width="35"
                                height="29"
                                viewBox="0 0 35 29"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M34.0329 28.7305L28.9422 2.03952L0.169405 0.617765C0.169405 0.617765 12.4378 8.50347 18.738 13.9774C25.0381 19.4513 34.0329 28.7305 34.0329 28.7305Z"
                                    fill="#2D2D2D"
                                />
                            </svg>
                        </div>

                        <StaticImage src="./images/star-hog.png" width={242} alt="Star Hog" />
                    </div>
                </div>
            </section>
            <section className={`${section} my-12`}>
                <h2 className="text-xl m-0 mb-6 pb-6 border-b border-gray-accent-light border-dashed">Questions</h2>
                <FAQs />
            </section>
            <section className="bg-primary my-12">
                <Quote
                    className="py-12 md:py-16 px-5 bg-primary"
                    name={<span className="text-white">Jonathan Hyde</span>}
                    title={<span className="text-white">Former Head of Product, Legl</span>}
                    image={
                        <StaticImage
                            width={100}
                            height={100}
                            alt="Jonathan Hyde - Former Head of Product, Legl"
                            src="../../images/jonathan-hyde-plain.png"
                        />
                    }
                    quote={
                        <span className="text-white">
                            PostHog is the first analytics platform where{' '}
                            <span className="text-yellow">I can be 100% confident in the data.</span> I've finally got
                            the data insight platform I've always wanted as a Product person.
                        </span>
                    }
                />
            </section>
            <section className={`${section} mb-12 mt-16`}>
                <div className="sm:flex-row flex-col-reverse flex items-center sm:items-start justify-center">
                    <StaticImage src="./images/vacation-hog.png" alt="Vacation Hog" width={252} />
                    <div className="text-center bg-[#2D2D2D] p-4 rounded-md relative sm:rotate-6 sm:-mr-8 flex-shrink-0">
                        <p className="text-white m-0 text-[18px] font-bold font-comic">
                            Looking for the signup button?
                        </p>
                        <p className="text-[15px] mt-0 mb-2 text-white font-comic">(I’ll take you there.)</p>
                        <button
                            onClick={() => scroll.scrollToTop()}
                            className="mx-auto flex space-x-2 items-center bg-red text-[15px] font-bold text-white px-3 py-2 rounded-sm relative active:top-[1px] active:scale-[.97]"
                        >
                            <span>Beam me up!</span>
                            <svg
                                width="17"
                                height="23"
                                viewBox="0 0 17 23"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11.7211 16.9033V4.24645L14.1749 6.70024C14.6354 7.14428 15.366 7.13788 15.8183 6.6865C16.2697 6.23421 16.2761 5.50358 15.832 5.04306L11.3787 0.58972C10.9209 0.132854 10.1793 0.132854 9.72153 0.58972L5.26819 5.04306C4.82415 5.50358 4.83055 6.23421 5.28284 6.6865C5.73514 7.13789 6.46576 7.14428 6.92537 6.70024L9.37729 4.24645V16.9033C9.37729 18.5989 8.00301 19.9742 6.30636 19.9742C4.61072 19.9742 3.23637 18.599 3.23637 16.9033H0.892505C0.892505 18.8379 1.92434 20.6251 3.5999 21.592C5.27447 22.5597 7.33906 22.5597 9.01375 21.592C10.6892 20.6251 11.7211 18.8379 11.7211 16.9033H11.7211Z"
                                    fill="white"
                                />
                                <path d="M3.04878 15.0117V15.9493H0.70492V15.0117H3.04878Z" fill="white" />
                                <path d="M3.04878 13.1367V14.0743H0.70492V13.1367H3.04878Z" fill="white" />
                                <path d="M3.04878 7.51123V8.44878H0.70492V7.51123H3.04878Z" fill="white" />
                                <path d="M3.04878 9.38672V10.3243H0.70492V9.38672H3.04878Z" fill="white" />
                                <path d="M3.04878 11.2617V12.1993H0.70492V11.2617H3.04878Z" fill="white" />
                            </svg>
                        </button>
                        <svg
                            className="absolute right-2 sm:left-2 sm:right-auto -bottom-5 -scale-x-1"
                            width="35"
                            height="29"
                            viewBox="0 0 35 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M34.0329 28.7305L28.9422 2.03952L0.169405 0.617765C0.169405 0.617765 12.4378 8.50347 18.738 13.9774C25.0381 19.4513 34.0329 28.7305 34.0329 28.7305Z"
                                fill="#2D2D2D"
                            />
                        </svg>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default PricingNew
