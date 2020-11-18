import React, { useState } from 'react'
import Button from 'antd/lib/button'
import Modal from 'react-modal'
import 'antd/lib/button/style/css'
import './styles/index.scss'
import { Link } from 'gatsby'
import modalSaasCloud from '../images/modal-saas-cloud.svg'
import modalSelfDeploy from '../images/modal-self-deploy.svg'
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
import SEO from '../components/seo'
import Layout from '../components/Layout'
import { FeaturedSectionTextLeft } from '../components/Sections/FeaturedSectionTextLeft'
import { FeaturedSectionTextRight } from '../components/Sections/FeaturedSectionTextRight'
import { FeaturedSectionTripleImage } from '../components/Sections/FeaturedSectionTripleImage'
import { Spacer } from '../components/Spacer'
import { DesignedForYourStackBlock } from '../components/Sections/DesignedForYourStackBlock'

function IndexPage() {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    return (
        <div className="homepage">
            <div className="indexContainer">
                <Layout containerStyle={{ maxWidth: 'auto', padding: 0 }} isHomePage={true}>
                    <SEO
                        title="PostHog - Open-Source Product Analytics"
                        description="Self-hosted product analytics stack, to deploy on your infrastructure."
                    />
                    <div className="topSectionWrapperMobile">
                        <div className="topPageWrapper wrapper">
                            <div className="pageHeader row">
                                <h1>A complete product analytics stack, to deploy on your infrastructure.</h1>
                            </div>
                            <Spacer height={25} onlyDesktop={true} />
                            <div className="topPageRow row">
                                <div className="topPageCol1">
                                    <div className="joinUsersText">
                                        <p>
                                            Join 2,400 companies <br className="hiddenBreak" /> using PostHog.
                                        </p>
                                        <br />
                                    </div>
                                    <div className="joinUsersButtons">
                                        <Button
                                            type="secondary"
                                            size="large"
                                            className="getStarted"
                                            onClick={() => setModalIsOpen(true)}
                                        >
                                            Get Started for Free
                                        </Button>
                                        <Modal
                                            isOpen={modalIsOpen}
                                            onRequestClose={() => setModalIsOpen(false)}
                                            className="modalContent"
                                            overlayClassName="modalOverlay"
                                        >
                                            <h2>Try PostHog - free</h2>
                                            <div className="modalCardsWrapper">
                                                <a href="https://app.posthog.com/signup">
                                                    <div className="modalSaasCloud modalCard">
                                                        <div className="modalCardHeader">
                                                            <img src={modalSaasCloud} alt="modal-saas-cloud" />
                                                            <h2>Cloud</h2>
                                                        </div>
                                                        <h4>Small business or low volumes and don't want hassle?</h4>
                                                        <p>
                                                            This is the simplest way to get started. Create an account.
                                                        </p>
                                                    </div>
                                                </a>
                                                <Link to="/docs/deployment">
                                                    <div className="modalSelfDeploy modalCard">
                                                        <div className="modalCardHeader">
                                                            <img src={modalSelfDeploy} alt="modal-self-deploy " />
                                                            <h2>Open Source</h2>
                                                        </div>
                                                        <h4>Want to use our free open source product?</h4>
                                                        <p>
                                                            Deploy PostHog Open Source on your own infrastructure. Free
                                                            forever.
                                                        </p>
                                                    </div>
                                                </Link>
                                                <a href="mailto:sales@posthog.com">
                                                    <div className="modalSelfDeploy modalCard">
                                                        <div className="modalCardHeader">
                                                            <img src={modalSelfDeploy} alt="modal-self-deploy " />
                                                            <h2>Enterprise</h2>
                                                        </div>
                                                        <h4>10K+ users? Need support?</h4>
                                                        <p>
                                                            Managed on your infrastructure with greater scalability and
                                                            support. Book a pilot.
                                                        </p>
                                                    </div>
                                                </a>
                                            </div>
                                            <Button
                                                icon="close"
                                                onClick={() => setModalIsOpen(false)}
                                                className="modalClose"
                                            />
                                        </Modal>
                                        <a href="/request_demo">
                                            <Button type="primary" size="large" className="requestDemo">
                                                Request Demo
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                                <div className="topPageCol2" />
                            </div>
                        </div>
                    </div>
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
                                    onClick={() => setModalIsOpen(true)}
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

                    <div className="buildingIsExpensiveWrapper wrapper">
                        <div className="buildingIsExpensiveRow row">
                            <div className="buildingIsExpensiveText">
                                <div className="buildingIsExpensiveText2">
                                    <div className="startTrialRow">
                                        <Button
                                            type="primary"
                                            className="startTrialButton"
                                            onClick={() => setModalIsOpen(true)}
                                        >
                                            Start my 30-day free trial
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="coolHedgehog">
                                <img alt="Cool hedgehog" src={coolHedgehog} />
                            </div>
                        </div>
                    </div>
                </Layout>
            </div>
        </div>
    )
}

export default IndexPage
