import React from 'react'
import Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
import './index.css'
import { Link } from 'gatsby'
import improveMobile from '../images/improve-mobile.svg'
import improveRetention from '../images/retro-retention-box.svg'
import improvePaths from '../images/retro-paths-box.svg'
import improveFunnels from '../images/retro-funnels-box.png'
import enterprise01 from '../images/retro-self-managed.svg'
import enterprise02 from '../images/enterprise-02.svg'
import enterprise03 from '../images/enterprise-03.svg'
import shelf4 from '../images/shelf-4.svg'
import shelf2 from '../images/shelf-2.svg'
import shelf5 from '../images/shelf-5.svg'
import rays from '../images/rays.svg'
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
import installHeroku from '../images/install-heroku.svg'
import installDocker from '../images/install-docker.svg'
import installAws from '../images/install-aws.svg'
import installKubernetes from '../images/install-kubernetes.svg'
import githubButton from '../images/github-button.svg'
import slackButton from '../images/slack-button.svg'
import roadmapButton from '../images/roadmap-button.svg'
import whatsNewPhone from '../images/whats-new-phone.svg'
import SEO from '../components/seo'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet'


function IndexPage() {
  return (
    <div className="indexContainer">
      <Layout containerStyle={{maxWidth: "auto", padding: 0}} >
        <SEO
          title="PostHog - Open-Source Product Analytics"
          description="Self-hosted product analytics stack, to deploy on your infrastructure."
        />
        <Helmet bodyAttributes={{ class: 'homepage' }} />
        <div className="">
        <div className='topSectionWrapperMobile'>
          <div className="topPageWrapper wrapper">
            <div className="pageHeader row">
                <h1>A complete product analytics stack, to deploy on your infrastructure.</h1>
            </div>
            <div className="topPageRow row">
              <div className="topPageCol1">
                <div className="joinUsersText">
                  <p>Join 1,900 companies <br className="hiddenBreak"/> using PostHog.</p>     
                  <br/>
                </div>
                <div className="joinUsersButtons">
                  <a href="/trial">
                    <Button type="secondary" size="large" className="getStarted" >
                      Get Started for Free
                    </Button>
                  </a>
                  <a href="/request_demo">
                    <Button type="primary" size="large" className="requestDemo">
                      Request Demo
                    </Button>
                  </a>
                </div>
              </div>
              <div className="topPageCol2"/>
            </div>
          </div>
          </div>


          {/*01 - It all starts with event autocapture*/}
          <div className="autocaptureWrapper wrapper autocapturesizing featureSection">
            <div className="autocaptureRow row">
              <div className="autocaptureImg"/>
                <div className="autocapture01 number">
                  <h1 className="yellowText">01</h1>
                </div>
                <div className="autocaptureCol col">
                  <h2 className="gosha">It all starts with event autocapture</h2>
                  <br className="revHiddenBreak"/>
                  <hr className="yellowLine"/>
                  <br className="revHiddenBreak"/>
                  <p>PostHog autocaptures events and user behavior in your mobile or web app.</p>
                </div>
              </div>
            </div>
          </div>



          <div className="trafficVisualWrapper wrapper featureSection">
            {/*02 - Understand how traffic really flows through your app*/}
            <div className="trafficRow row">
              <div className="trafficImg"/>
              <div className="traffic02 number">
                <h1 className="redText">02</h1>
              </div>
              <div className="trafficCol col">
                <h2 className="gosha">Understand how traffic really flows through your app</h2>
                <br className="revHiddenBreak"/>
                <hr className="redLine"/>
                <br className="revHiddenBreak"/>
                <p className="trafficParagraph">Know the pageviews and actions of every user in your app or on your website.</p>
              </div>
            </div>




            {/*01 - It all starts with event autocapture*/}
          <div className="autocaptureWrapper wrapper featureSection">
            <div className="autocaptureRow row">
              <div className="visualizeImg"/>
                <div className="visualize03 number">
                  <h1 className="darkBlueText">03</h1>
                </div>
                <div className="autocaptureCol col">
                  <h2 className="gosha">Visualize product trends and retention</h2>
                  <br className="revHiddenBreak"/>
                  <hr className="darkBlueLine"/>
                  <br className="revHiddenBreak"/>
                  <p>Powerful analytics to really understand what your users are doing and how to keep them coming back.</p>
                </div>
              </div>
            </div>
          </div>
          



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
                <hr className="yellowLine"/>
                <p>Visualize how users navigate through your app or website, and use metrics to understand what needs improvement.</p>
                </div>
            </div>
            <br className="hiddenBreak"/>
            <div className="improveConversionRow2 row">
              <div className="improveConversionElement">
                <img alt="improve-retention" loading="lazy" src={improveRetention}/>
                <br className="revHiddenBreak"/>
                <h4>Retention</h4>
              </div>
              <div className="improveConversionElement">
                <img alt="improve-funnels" loading="lazy" src={improveFunnels}/>
                <br className="revHiddenBreak"/>
                <h4>Funnels</h4>
              </div>
              <div className="improveConversionElement">
                <img alt="improve-paths" loading="lazy" src={improvePaths}/>
                <br className="revHiddenBreak"/>
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
                <h2 className="gosha">Use feature flags <br/>to test new ideas</h2>
                <hr className="redLine"/>
                <br/>
                <p className="featureFlagsText">Visualize how users navigate through your app or website, and use metrics to understand what needs improvement.</p>
              </div>
              <div className="featureFlagsImg"/>
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
                  <img alt="shelf-2" className="imageShow shelf" loading="lazy" src={shelf2}/>
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
                    <img alt="Javascript" className="imageShow" loading="lazy" src={stackJavascript}/>
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
                  <img alt="shelf-4" className="imageShow shelf" loading="lazy" src={shelf4}/>
                </div>
              </div>
            </div>
          </div>

          {/* self-hosted full data*/}
          <div className="selfHostedDataWrapper wrapper">
            <div className="selfHostedDataRow row">
              <div className="selfHostedDataCol">
                <h2 className="gosha">Self host available, <br/> with full underlying data access</h2>
                <hr className="blueLine"/>
                <p className="darkBlueText">Huge user base? No problem. Eliminate the data protection risks and costs associated with sending millions of users' data to 3rd parties.</p>
              </div>
              <div className="selfHostedDataImg"/>
            </div>
          </div>

          {/* Why posthog */}
          <div className="whyPosthogWrapper wrapper">
            <div className="whyPosthogRow row">
              <h1>PostHog versus Self Build</h1>
              <div className="whyPosthogElementsWrapper">
                <div className="whyPosthogElement">
                  <h2 className="gosha">Data Lake</h2>
                  <div className="whyPosthogElementBody">
                    <p>Suitable for scalability</p>
                    <p>You own your own data</p>
                    <p>Resource intensive</p>
                    <p>Technical knowledge needed to use daily</p>
                    <p>You have to update yourself</p>
                    <p>You have to build your own features</p>
                    <p>Not your business' core competency</p>
                  </div>
                </div>
                <div className="whyPosthogElement">
                  <h2 className="gosha">Deploying Posthog</h2>
                    <div className="whyPosthogElementBody">
                      <p>Suitable for scalability</p>
                      <p>You own your own data</p>
                      <p>Ready to use immediately</p>
                      <p>Self-serve analytics for everyone</p>
                      <p>Regular updates</p>
                      <p>Feature rich</p>
                      <p>We don't focus on anything else</p>
                      <p>Can work with data lake in any case</p>
                    </div>
                </div>
              </div>
              <div className="startTrialRow">
                <Link to="/trial/">
                  <Button type="primary" className="startTrialButton">Start my 30-day free trial</Button>
                </Link>
                <img src={rays}/>
              </div>
            </div>
          </div>

          {/* posthog for enterprise */}
          
          <div className="posthog4EnterpriseWrapper wrapper redbackground">
            <div className="posthog4EnterpriseRow1 row">
                <h2 className="gosha">PostHog for Enterprise</h2>
            </div>
            <div className="posthog4EnterpriseRow2 row">
              <div className="posthog4EnterpriseRow2Col">
                <h4>Self-managed</h4>
                <img alt="enterprise-01" loading="lazy" src={enterprise01} className="imageShow"/>
                <div className="enterpriseText">
                  <p>
                    PostHog can be deployed in your cloud, for painless adoption and onboarding, with full underlying data access.
                  </p>
                </div>
              </div>
              <div className="posthog4EnterpriseRow2Col">
                <h4>Unlimited volume</h4>
                <img alt="enterprise-02" loading="lazy" src={enterprise02} className="imageShow"/>
                <div className="enterpriseText">
                  <p>
                    PostHog is built to scale. That includes our open core pricing model.
                  </p>
                </div>
              </div>
              <div className="posthog4EnterpriseRow2Col">
                <h4>Support</h4>
                <img alt="enterprise-03" loading="lazy" src={enterprise03} className="imageShow"/>
                <div className="enterpriseText">
                  <p>
                    PostHog can be deployed in your cloud, for painless adoption and onboarding, with full underlying data access.
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
                    <Link to="/trial/">
                      <Button type="primary" className="startTrialButton">Start my 30-day free trial</Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="coolHedgehog">
                <img src={coolHedgehog}/>
              </div>
            </div>
          </div>
      
      </Layout>
    </div>
  )
}

export default IndexPage