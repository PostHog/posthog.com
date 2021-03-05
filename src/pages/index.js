import React, { useState, useEffect, Suspense } from 'react'
import Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
import './styles/index.scss'
import posthogComputer from '../images/computer-dashboard-4.svg'
import improveMobile from '../images/improve-mobile.svg'
import improveRetention from '../images/retro-retention-box.svg'
import improvePaths from '../images/retro-paths-box.svg'
import improveFunnels from '../images/retro-funnels-box.png'
import enterprise01 from '../images/retro-self-managed.svg'
import enterprise02 from '../images/enterprise-02.svg'
import enterprise03 from '../images/enterprise-03.svg'
import coolHedgehog from '../images/cool-hedgehog.svg'
import retroAutocapture from '../images/retro-autocapture.svg'
import trafficFlow from '../images/retro-how-traffic-flows.svg'
import visualizeTrends from '../images/retro-product-trends.svg'
import retroFlagsImg from '../images/retro-feature-flags.svg'
import selfHostedImg from '../images/self-host.svg'
import sessionRecordingImg from '../images/session-recording-3.svg'
import { SEO } from '../components/seo'
import Layout from '../components/Layout'
import { FeaturedSectionTextLeft } from '../components/Sections/FeaturedSectionTextLeft'
import { FeaturedSectionTextRight } from '../components/Sections/FeaturedSectionTextRight'
import { FeaturedSectionTripleImage } from '../components/Sections/FeaturedSectionTripleImage'
import { Spacer } from '../components/Spacer'
import { DesignedForYourStackBlock } from '../components/Sections/DesignedForYourStackBlock'
import { useActions } from 'kea'
import { layoutLogic } from '../logic/layoutLogic'

const UserLogosCarousel = React.lazy(() => import('../components/UserLogosCarousel'))

function IndexPage() {
    const [carouselAvailable, setCarouselAvailable] = useState(false)
    const { setIsGetStartedModalOpen } = useActions(layoutLogic)

    useEffect(() => {
        if (window && !carouselAvailable) {
            setCarouselAvailable(true)
        }
    }, [])

    const CarouselFallback = () => <div style={{ height: 60 }}></div>

    return (
        <div className="homepage">
            <div className="indexContainer">
                <Layout containerStyle={{ maxWidth: 'auto', padding: 0 }} isHomePage={true}>
                    <SEO
                        title="PostHog - Open-Source Product Analytics"
                        description="Self-hosted product analytics stack, to deploy on your infrastructure."
                    />
                    <div className="topSectionWrapperMobile">
                        <div className="topPageWrapper wrapper min-h-screen">
                            <div className="pageHeader row">
                                <h1 className="mt-12">
                                    A complete product analytics stack, to deploy on your infrastructure.
                                </h1>
                            </div>
                            <Spacer height={25} onlyDesktop={true} />
                            <div className="w-11/12 mx-auto max-w-4xl flex justify-between items-center flex-col lg:flex-row">
                                <div className="w-full lg:w-1/2">
                                    <span className="text-white text-xl hidden lg:block">
                                        Join 2,700 companies <br className="hiddenBreak" /> using PostHog.
                                    </span>

                                    <div className="mt-4 flex justify-start flex-col lg:flex-row flex-wrap items-center">
                                        <button
                                            className="button-primary lg:mr-1"
                                            onClick={() => setIsGetStartedModalOpen(true)}
                                        >
                                            Get Started for Free
                                        </button>
                                        <a
                                            href="/schedule-demo"
                                            className="px-4 py-2 my-1 font-gosha block bg-transparent border border-white rounded font-semibold text-base-larger text-white uppercase lg:mr-1 hover:bg-white hover:bg-opacity-10 hover:text-white"
                                        >
                                            Schedule Demo
                                        </a>
                                    </div>
                                </div>

                                <div className="w-full lg:w-1/2">
                                    <img
                                        src={posthogComputer}
                                        className="w-full max-w-lg mx-auto mt-8 lg:mt-0 lg:max-w-full block skeleton-loading skeleton-loading--250"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Spacer />
                    <h2 className="centered">Used At</h2>
                    {carouselAvailable ? (
                        <Suspense fallback={<CarouselFallback />}>
                            <UserLogosCarousel />
                        </Suspense>
                    ) : (
                        <CarouselFallback />
                    )}
                    <Spacer />
                    <FeaturedSectionTextRight
                        headerText="It all starts with event autocapture"
                        listItem="01"
                        descriptionText="PostHog autocaptures events and user behavior in your mobile or web app."
                        image={retroAutocapture}
                        color="yellow"
                    />
                    <Spacer onlyDesktop={true} />
                    <FeaturedSectionTextLeft
                        headerText="Understand how traffic really flows through your app"
                        listItem="02"
                        descriptionText="Know the pageviews and actions of every user in your app or on your website."
                        image={trafficFlow}
                        color="red"
                        imgDesktopHeight={477}
                        imgDesktopWidth="50vw"
                        imgStyle={{ backgroundSize: 'cover' }}
                    />
                    <Spacer onlyDesktop={true} />
                    <FeaturedSectionTextRight
                        headerText="Visualize product trends and retention"
                        listItem="03"
                        descriptionText="Powerful analytics to really understand what your users are doing and how to keep
                    them coming back."
                        image={visualizeTrends}
                        color="navy"
                    />
                    <Spacer onlyDesktop={true} />
                    <FeaturedSectionTextLeft
                        headerText="Watch how real users use your product"
                        listItem="04"
                        descriptionText="Watch back sessions from real users to track down bugs
                        faster and see where your customers get stuck."
                        image={sessionRecordingImg}
                        color="yellow"
                    />
                    <Spacer onlyDesktop={true} />
                    <FeaturedSectionTripleImage
                        mobileImg={improveMobile}
                        img1={improveRetention}
                        img2={improveFunnels}
                        img3={improvePaths}
                        listItem="05"
                        headerText="Improve conversion rates"
                        descriptionText={`Visualize how users navigate through your app or website, and use metrics to understand what needs improvement.`}
                        color="red"
                        title1="Retention"
                        title2="Funnels"
                        title3="Paths"
                    />
                    <Spacer />
                    <Spacer />
                    <div className="fs-feature-flags-wrapper">
                        <FeaturedSectionTextLeft
                            headerText="Use feature flags to test new ideas"
                            listItem="06"
                            descriptionText="Roll out new features to a few users first, randomly or based on their previous behavior or profile information."
                            image={retroFlagsImg}
                            color="navy"
                        />
                    </div>
                    <DesignedForYourStackBlock />
                    <Spacer />
                    <div className="fs-self-host-wrapper">
                        <FeaturedSectionTextLeft
                            headerText="Self-host PostHog with full data access"
                            listItem=""
                            descriptionText="Huge user base? No problem. Eliminate the data protection risks and costs associated with sending millions of users' data to third parties."
                            image={selfHostedImg}
                            color="blue"
                        />
                    </div>
                    <Spacer onlyDesktop={true} />

                    {/* Why posthog */}
                    <div className="whyPosthogWrapper wrapper">
                        <div className="whyPosthogRow row">
                            <h1>PostHog versus Self-Build</h1>
                            <div className="whyPosthogElementsWrapper">
                                <div className="whyPosthogElement">
                                    <h2 className="gosha">Data Lake</h2>
                                    <div className="whyPosthogElementBody">
                                        <p>Suitable for scalability</p>
                                        <p>You own your own data</p>
                                        <p>Resource-intensive</p>
                                        <p>Requires technical knowledge</p>
                                        <p>You have to build your own features</p>
                                        <p>Diverts effort from your core business</p>
                                    </div>
                                </div>
                                <div className="whyPosthogElement">
                                    <h2 className="gosha">Deploying Posthog</h2>
                                    <div className="whyPosthogElementBody">
                                        <p>Suitable for scalability</p>
                                        <p>You own your own data</p>
                                        <p>Ready to use immediately</p>
                                        <p>Regular updates</p>
                                        <p>Feature-rich</p>
                                        <p>Can be integrated with a data lake</p>
                                    </div>
                                </div>
                            </div>
                            <div className="startTrialRow">
                                <Button
                                    type="primary"
                                    className="startTrialButton"
                                    onClick={() => setIsGetStartedModalOpen(true)}
                                >
                                    Start my 30-day free trial
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* posthog for enterprise */}

                    <div className="posthog4EnterpriseWrapper wrapper redbackground">
                        <div className="posthog4EnterpriseRow1 row">
                            <h2 className="gosha ph-enterprise-title">PostHog for Enterprise</h2>
                        </div>
                        <div className="posthog4EnterpriseRow2 row">
                            <div className="posthog4EnterpriseRow2Col">
                                <h4 className="ph-enterprise-subheader">Self-managed</h4>
                                <img alt="enterprise-01" loading="lazy" src={enterprise01} className="imageShow" />
                                <div className="enterpriseText">
                                    <p>
                                        PostHog can be deployed in your cloud, for painless adoption and onboarding,
                                        with full underlying data access.
                                    </p>
                                </div>
                            </div>
                            <div className="posthog4EnterpriseRow2Col">
                                <h4 className="ph-enterprise-subheader">Unlimited volume</h4>
                                <img alt="enterprise-02" loading="lazy" src={enterprise02} className="imageShow" />
                                <div className="enterpriseText">
                                    <p>PostHog is built to scale. That includes our open core pricing model.</p>
                                </div>
                            </div>
                            <div className="posthog4EnterpriseRow2Col">
                                <h4 className="ph-enterprise-subheader">Support</h4>
                                <img alt="enterprise-03" loading="lazy" src={enterprise03} className="imageShow" />
                                <div className="enterpriseText">
                                    <p>
                                        PostHog's team can offer instance monitoring, updates and help with supporting
                                        integrations.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Spacer />
                    <Spacer />
                    <FeaturedSectionTextLeft
                        listItem=""
                        headerText="Get started for free"
                        image={coolHedgehog}
                        color="blue"
                        imgDesktopHeight={300}
                        descriptionText={
                            <div>
                                <p>
                                    Self-host our free-forever open source offering or start tracking your product
                                    instantly with PostHog Cloud.
                                </p>
                                <div className="landing-page-final-cta">
                                    <Button type="primary" size="large" onClick={() => setIsGetStartedModalOpen(true)}>
                                        Get Started for Free
                                    </Button>
                                    <a href="/slack">
                                        <Button type="primary" size="large">
                                            Join Our Slack
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        }
                    />
                </Layout>
            </div>
        </div>
    )
}

export default IndexPage
