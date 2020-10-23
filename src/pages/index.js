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
import shelf4 from '../images/shelf-4.svg'
import shelf2 from '../images/shelf-2.svg'
import coolHedgehog from '../images/cool-hedgehog.svg'
import stackAndroid from '../images/stack-android.svg'
import stackPython from '../images/stack-python.svg'
import stackIos from '../images/stack-ios.svg'
import stackNode from '../images/stack-node.svg'
import stackPhp from '../images/stack-php.svg'
import stackRuby from '../images/stack-ruby.svg'
import stackGatsby from '../images/stack-gatsby.svg'
import stackJavascript from '../images/stack-javascript.svg'
import stackGo from '../images/stack-go.svg'
import stackApi from '../images/stack-api.svg'
import retroAutocapture from '../images/retro-autocapture.svg'
import trafficFlow from '../images/retro-how-traffic-flows.svg'
import visualizeTrends from '../images/retro-product-trends.svg'
import SEO from '../components/seo'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet'
import { FeaturedSectionTextLeft } from '../components/Sections/FeaturedSectionTextLeft'
import { FeaturedSectionTextRight } from '../components/Sections/FeaturedSectionTextRight'
import { Spacer } from '../components/Spacer'

function IndexPage() {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    return (
        <div className="indexContainer">
            <Layout containerStyle={{ maxWidth: 'auto', padding: 0 }} isHomePage={true}>
                <SEO
                    title="PostHog - Open-Source Product Analytics"
                    description="Self-hosted product analytics stack, to deploy on your infrastructure."
                />
                <Helmet bodyAttributes={{ class: 'homepage' }}>{/* <style>{indexCSS}</style> */}</Helmet>
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
                                        Join 2,100 companies <br className="hiddenBreak" /> using PostHog.
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
                                                    <p>This is the simplest way to get started. Create an account.</p>
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

                {/*04 - Improve conversion rates*/}
                <div className="improveConversionWrapper wrapper bluebg featureSection">
                    <div className="improveConversionHidden">
                        <img src={improveMobile} loading="lazy" alt="improve-mobile" className="imageShow" />
                    </div>
                    <div className="improveConversionRow1 row">
                        <div className="improveConversion04 number">
                            <h1 className="yellowText">04</h1>
                        </div>
                        <div className="improveConversionCol col">
                            <h2 className="gosha">Improve conversion rates</h2>
                            <hr className="yellowLine" />
                            <p>
                                Visualize how users navigate through your app or website, and use metrics to understand
                                what needs improvement.
                            </p>
                        </div>
                    </div>
                    <br className="hiddenBreak" />
                    <div className="improveConversionRow2 row">
                        <div className="improveConversionElement">
                            <img alt="improve-retention" loading="lazy" src={improveRetention} />
                            <br className="revHiddenBreak" />
                            <h4>Retention</h4>
                        </div>
                        <div className="improveConversionElement">
                            <img alt="improve-funnels" loading="lazy" src={improveFunnels} />
                            <br className="revHiddenBreak" />
                            <h4>Funnels</h4>
                        </div>
                        <div className="improveConversionElement">
                            <img alt="improve-paths" loading="lazy" src={improvePaths} />
                            <br className="revHiddenBreak" />
                            <h4>Paths</h4>
                        </div>
                    </div>
                </div>

                {/*05 - Use feature flags to test new ideas*/}
                <div className="featureFlagsWrapper wrapper featureSection">
                    <div className="featureFlagsRow row">
                        <div className="featureFlags05 number">
                            <h1 className="redText">05</h1>
                        </div>
                        <div className="featureFlagsCol col">
                            <h2 className="gosha">
                                Use feature flags <br />
                                to test new ideas
                            </h2>
                            <hr className="redLine" />
                            <br />
                            <p className="featureFlagsText">
                                Roll out new features to a few users first, randomly or based on their previous behavior
                                or profile information.
                            </p>
                        </div>
                        <div className="featureFlagsImg" />
                    </div>
                </div>

                {/*Designed for your Stack */}
                <div className="designed4StackWrapper">
                    <div className="designed4StackRow row-">
                        <h2 align="middle" className="gosha">
                            Designed for your stack
                        </h2>
                    </div>
                    <div className="yourStackWrapper">
                        <div className="yourStackLogosRow row" align="bottom">
                            <div className="yourStackLogos">
                                <Link to="/docs/integrations/python-integration">
                                    <img alt="Python" className="imageShow" loading="lazy" src={stackPython} />
                                </Link>
                            </div>
                            <div className="yourStackLogos">
                                <Link to="/docs/integrations/php-integration">
                                    <img alt="PHP" className="imageShow" loading="lazy" src={stackPhp} />
                                </Link>
                            </div>
                            <div className="yourStackLogos">
                                <Link to="/docs/integrations/android-integration">
                                    <img alt="Android" className="imageShow" loading="lazy" src={stackAndroid} />
                                </Link>
                            </div>
                            <div className="yourStackLogos">
                                <Link to="/docs/integrations/ios-integration">
                                    <img alt="iOS" className="imageShow" loading="lazy" src={stackIos} />
                                </Link>
                            </div>
                            <div className="yourStackLogos">
                                <Link to="/docs/integrations/node-integration">
                                    <img alt="Node" className="imageShow" loading="lazy" src={stackNode} />
                                </Link>
                            </div>
                        </div>
                        <div className="yourStackShelfRow row">
                            <div className="yourStackShelf">
                                <img alt="shelf-2" className="imageShow shelf" loading="lazy" src={shelf2} />
                            </div>
                        </div>
                        <div className="yourStackLogosRow row" align="bottom">
                            <div className="yourStackLogos">
                                <Link to="/docs/integrations/ruby-integration">
                                    <img alt="Ruby" className="imageShow" loading="lazy" src={stackRuby} />
                                </Link>
                            </div>
                            <div className="yourStackLogos">
                                <Link to="/docs/integrations/gatsby-integration">
                                    <img alt="Gatsby" className="imageShow" loading="lazy" src={stackGatsby} />
                                </Link>
                            </div>
                            <div className="yourStackLogos">
                                <Link to="/docs/integrations/js-integration">
                                    <img alt="Javascript" className="imageShow" loading="lazy" src={stackJavascript} />
                                </Link>
                            </div>
                            <div className="yourStackLogos">
                                <Link to="/docs/integrations/go-integration">
                                    <img alt="Go" className="imageShow" loading="lazy" src={stackGo} />
                                </Link>
                            </div>
                            <div className="yourStackLogos">
                                <Link to="/docs/integrations/api">
                                    <img alt="API" className="imageShow" loading="lazy" src={stackApi} />
                                </Link>
                            </div>
                        </div>
                        <div className="yourStackShelfRow row">
                            <div className="yourStackShelf">
                                <img alt="shelf-4" className="imageShow shelf" loading="lazy" src={shelf4} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* self-hosted full data*/}
                <div className="selfHostedDataWrapper wrapper">
                    <div className="selfHostedDataRow row">
                        <div className="selfHostedDataCol">
                            <h2 className="gosha">
                                Self host available, <br /> with full underlying data access
                            </h2>
                            <hr className="blueLine" />
                            <p className="darkBlueText">
                                Huge user base? No problem. Eliminate the data protection risks and costs associated
                                with sending millions of users' data to 3rd parties.
                            </p>
                        </div>
                        <div className="selfHostedDataImg" />
                    </div>
                </div>

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
                            <Button type="primary" className="startTrialButton" onClick={() => setModalIsOpen(true)}>
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
                                    PostHog can be deployed in your cloud, for painless adoption and onboarding, with
                                    full underlying data access.
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
                                    PostHog can be deployed in your cloud, for painless adoption and onboarding, with
                                    full underlying data access.
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
    )
}

export default IndexPage
