import React from 'react'
import Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
import './index.css'
import { Link } from 'gatsby'
import posthogComputerRetro from '../images/posthog-computer-retro.svg'
import hogflix1 from '../images/hogflix-1.svg'
import dashboards1 from '../images/dashboards-1.svg'
import funnels1 from '../images/funnels-1.svg'
import featureFlags1 from '../images/feature-flags-1.svg'
import threeComputers from '../images/three-computers.svg'
import enterprise01 from '../images/enterprise-01.svg'
import enterprise02 from '../images/enterprise-02.svg'
import enterprise03 from '../images/enterprise-03.svg'
import selfHostedData1 from '../images/self-hosted-data-1.svg'
import installNowFree1 from '../images/install-now-free-1.svg'
import shelfLower1 from '../images/shelf-lower-1.svg'
import shelf2 from '../images/shelf-2.svg'
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
import githubButton1 from '../images/github-button-1.svg'
import slackButton1 from '../images/slack-button-1.svg'
import roadmapButton1 from '../images/roadmap-button-1.svg'
import { Row, Col } from 'antd'
import SEO from '../components/seo'
import Layout from '../components/Layout'


function IndexPage() {
  return (
    <Layout containerStyle={{maxWidth: "auto", padding: 0}} className="indexPage">
      <div className="indexContainer">
      <SEO
        title="PostHog - open source product analytics"
        description="Understand your users. Build a better product"
      />
      <Row>
        <Col span={24}>
          <div className="firstSpace"></div>
        </Col>
      </Row>
      
      <Row align="top" style={{marginBottom: '12rem'}}>
        <Col xs={24} sm={18} md={12} lg={12} xl={12} className="gutter-row">
          <h1 className="largeHeader" align="top">
            Understand <br className="hiddenHeadBreak"/>your users.
            <br />
            Build a better product.
          </h1>
          <p>Join 1,000 companies using PostHog.</p>   
            <Link to="/trial">
              <Button
                type="primary"
                size="large"
                icon="right-circle"
              >
                Get Started for Free
              </Button>
              </Link>   
            {' '}
            <Link to="/request_demo">
              <Button type="secondary" size="large">
                Request Demo
              </Button>
            </Link>
            <div className="secondSpace"></div>
            <h2 className="yellowText">Open source product analytics</h2>
            <p>
              PostHog provides a full product analytics UX. Analyze trends, funnels, retention and cohorts.
            </p>
        </Col>
        <Col xs={0} sm={0} md={12} lg={12} xl={12} className="gutter-row">
          <img alt="posthog-computer-retro" loading="lazy" src={posthogComputerRetro}/>
        </Col>
      </Row>
      
      {/*01 - It all starts with event autocapture*/}
      <div className="redBackground">
        <Row justify="space-between">
          <Col xs={0} sm={0} md={12} lg={12} xl={12}>
            <img alt="hogflix-1" loading="lazy" src={hogflix1} />
          </Col>
          <Col xs={0} sm={0} md={1} lg={1} xl={1}></Col>
          <Col xs={4} sm={4} md={3} lg={3} xl={3}>
            <h2 className="yellowText numberHead">01</h2>
          </Col>
          <Col xs={17} sm={17} md={8} lg={8} xl={8}>
            <h2 className="blueText">It all starts with event autocapture</h2>
            <hr className="yellowLine"/>
            <br/>
            <p className="blueText">PostHog autocaptures events and user behavior in your mobile or web app.</p>
          </Col>
          <Col xs={3} sm={3} md={0} lg={0} xl={0}></Col>
        </Row>
      </div>

      {/*02 - Understand how traffic really flows through your app*/}
      <div className="whiteBackground">
        <Row justify="space-between">
          <Col xs={0} sm={0} md={2} lg={2} xl={2}></Col>
          <Col xs={4} sm={4} md={3} lg={3} xl={3}>
            <h2 className="redHead numberHead">02</h2></Col>
          <Col xs={20} sm={20} md={19} lg={19} xl={19}>
            <h2>Understand how traffic really flows through your app</h2>
            <hr className="redLine"/></Col>          
        </Row>
        <Row justify="space-between">
          <Col xs={4} sm={4} md={5} lg={5} xl={5}></Col>
          <Col xs={20} sm={20} md={19} lg={19} xl={19}>
            <p>Know the pageviews and actions of every user in your app or on your website.</p>
          </Col>
        </Row>
        <Row>
          <Col xs={0} sm={0} md={24} lg={24} xl={24}>
            <img alt="funnels-1" loading="lazy" src={funnels1} style={{paddingTop: '2rem'}}/>
          </Col>
        </Row>
      </div>
      
      {/*03 - Understand how traffic really flows through your app*/}
      <div className="blueBackground">
        <Row justify="space-between">
          <Col xs={4} sm={4} md={3} lg={3} xl={3}>
            <h2 className="blueText numberHead">03</h2>
          </Col>
          <Col xs={18} sm={18} md={9} lg={9} xl={9}>
            <h2>Visualize product trends and retention</h2>
            <hr className="blueLine"/>
            <p>Powerful analytics to really understand what your users are doing and how to keep them coming back.</p>
          </Col>
          <Col xs={2} sm={2} md={1} lg={1} xl={1}></Col>
          <Col xs={0} sm={0} md={11} lg={11} xl={11}>
            <img alt="dashboards-1" src={dashboards1}/>
          </Col>
          <Col xs={2} sm={2} md={0} lg={0} xl={0}></Col>
        </Row>
      </div>

      {/*04 - Improve conversion rates*/}
      <div className="whiteBackground">
        <Row>
          <Col xs={0} sm={0} md={5} lg={5} xl={5}></Col>
          <Col xs={4} sm={4} md={3} lg={3} xl={3}>
            <h2 className="yellowText numberHead">04</h2>
          </Col>
          <Col xs={20} sm={20} md={12} lg={12} xl={12}>
            <h2>Improve conversion rates</h2>
            <hr className="yellowLine"/>
          </Col>
          <Col xs={0} sm={0} md={4} lg={4} xl={4}></Col>
          <Col xs={4} sm={4} md={8} lg={8} xl={8}></Col>
          <Col xs={20} sm={20} md={12} lg={12} xl={12}>
            <p>Visualize how users navigate through your app or website, and use metrics to understand what needs improvement.</p>
          </Col>
        </Row>
        <Row justify="space-between">
          <Col span={24}>
          <img alt="three-computers-1" loading="lazy" src={threeComputers} style={{paddingTop: '2rem'}}/>
          </Col>
        </Row>
      </div>
      
      {/*05 - Use feature flags to test new ideas*/}
      <div className="yellowBackground">
        <Row justify="space-between">
          <Col xs={0} sm={0} md={12} lg={12} xl={12}>
            <img alt="feature-flags-1" loading="lazy" src={featureFlags1}/>
          </Col>
          <Col xs={0} sm={0} md={1} lg={1} xl={1}></Col>
          <Col xs={4} sm={4} md={3} lg={3} xl={3}>
            <h2 style={{marginTop: '1rem'}} className="redText numberHead">05</h2>
          </Col>
          <Col xs={20} sm={20} md={8} lg={8} xl={8}>
            <h2 style={{marginTop: '1rem'}} className="blueText">Use feature flags <br/>to test new ideas</h2>
            <hr className="redLine"/>
            <br/>
            <p className="blueText">Continuously release new features without worrying about breaking changes. Test new ideas quickly and roll out to 10%, 20% or 100% of your users.</p>
          </Col>
        </Row>
      </div>

      {/*Designed for your Stack */}
      <div className="whiteBackground">
      <Row className="gutter-row" justify="center" align="middle">
        <Col span={24} className="gutter-row" justify="center" align="middle">
          <h3 align="middle">
            Designed for your stack
          </h3>
        </Col>
      </Row>
      <div className="yourStack" align="bottom">
        <Row justify="space-between" align="bottom">
          <Col xs={2} sm={2} md={7} lg={7} xl={7}></Col>
          <Col xs={4} sm={4} md={2} lg={2} xl={2} align="middle">
            <Link to="/docs/integrations/python-integration">
              <img alt="Python" className="imageShow" loading="lazy" src={stackPython} />
            </Link>
          </Col>
          <Col xs={4} sm={4} md={2} lg={2} xl={2} align="middle">
            <Link to="/docs/integrations/php-integration">
              <img alt="PHP" className="imageShow" loading="lazy" src={stackPhp} />
            </Link>
          </Col>
          <Col xs={4} sm={4} md={2} lg={2} xl={2} align="middle">
            <Link to="/docs/integrations/android-integration">
              <img alt="Android" className="imageShow" loading="lazy" src={stackAndroid} />
            </Link>
          </Col>
          <Col xs={4} sm={4} md={2} lg={2} xl={2} align="middle">
            <Link to="/docs/integrations/ios-integration">
              <img alt="iOS" className="imageShow" loading="lazy" src={stackIos} />
            </Link>
          </Col>
          <Col xs={4} sm={4} md={2} lg={2} xl={2} align="middle">
            <Link to="/docs/integrations/node-integration">
              <img alt="Node" className="imageShow" loading="lazy" src={stackNode} />
            </Link>
          </Col>
          <Col xs={2} sm={2} md={7} lg={7} xl={7}></Col>
        </Row>
      </div>
        <Row justify="space-between" align="top">
          <Col xs={0} sm={0} md={6} lg={6} xl={6}></Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <img alt="shelf-2" className="imageShow" loading="lazy" src={shelf2}/>
          </Col>
          <Col xs={0} sm={0} md={6} lg={6} xl={6}></Col>
        </Row>
        <br/>
        <br/>
      <div className="yourStack" align="bottom">
        <Row justify="space-between" align="bottom">
          <Col xs={2} sm={2} md={7} lg={7} xl={7}></Col>
          <Col xs={4} sm={4} md={2} lg={2} xl={2} align="middle">
            <Link to="/docs/integrations/ruby-integration">
              <img alt="Ruby" className="imageShow" loading="lazy" src={stackRuby} />
            </Link>
          </Col>
          <Col xs={4} sm={4} md={2} lg={2} xl={2} align="middle">
            <Link to="/docs/integrations/gatsby-integration">
              <img alt="Gatsby" className="imageShow" loading="lazy" src={stackGatsby} />
            </Link>
          </Col>
          <Col xs={4} sm={4} md={2} lg={2} xl={2} align="middle">
            <Link to="/docs/integrations/js-integration">
              <img alt="Javascript" className="imageShow" loading="lazy" src={stackJavascript}/>
            </Link>
          </Col>
          <Col xs={4} sm={4} md={2} lg={2} xl={2} align="middle">
            <Link to="/docs/integrations/go-integration">
              <img alt="Go" className="imageShow" loading="lazy" src={stackGo} />
            </Link>
          </Col>
          <Col xs={4} sm={4} md={2} lg={2} xl={2} align="middle">
            <Link to="/docs/integrations/api">
              <img alt="API" className="imageShow" loading="lazy" src={stackApi} />
            </Link>
          </Col>
          <Col xs={2} sm={2} md={7} lg={7} xl={7}></Col>
        </Row>
      </div>
        <Row justify="space-between" align="top">
          <Col xs={0} sm={0} md={6} lg={6} xl={6}></Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <img alt="shelf-lower-1" className="imageShow" loading="lazy" src={shelfLower1}/>
          </Col>
          <Col xs={0} sm={0} md={6} lg={6} xl={6}></Col>
        </Row>
    </div>

    {/* posthog for enterprise */}
    <div className="redBackground">
      <Row>
        <Col span={24} align="middle">
          <h3>PostHog for Enterprise</h3>
          <br/>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Row>
            <Col xs={9} sm={9} md={24} lg={24} xl={24}>
              <img alt="enterprise-01" loading="lazy" src={enterprise01} className="imageShow"/>
              <br/>
              <br/>
            </Col>
            <Col xs={1} sm={1} md={0} lg={0} xl={0}></Col>
            <Col xs={14} sm={14} md={24} lg={24} xl={24} style={{padding: '0 5%'}}>
            <h4>Self-managed</h4>
            <br/>
            <hr className="blueLine2"/>
            <p>
              PostHog can be deployed in your cloud, for painless adoption and
              onboarding.
            </p>
            <br/>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Row>
            <Col xs={9} sm={9} md={24} lg={24} xl={24}>
              <img alt="enterprise-02" loading="lazy" src={enterprise02} className="imageShow"/>
              <br/>
              <br/>
            </Col>
            <Col xs={1} sm={1} md={0} lg={0} xl={0}></Col>
            <Col xs={14} sm={14} md={24} lg={24} xl={24} style={{padding: '0 6%'}}>
              <h4>Unlimited volume</h4>
              <br/>
              <hr className="redLine2"/>
              <p>
                PostHog is built to scale. That includes our open core pricing
                model.
              </p>
              <br/>
            </Col>
          </Row>`
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Row>
            <Col xs={9} sm={9} md={24} lg={24} xl={24}>
              <img alt="enterprise-03" loading="lazy" src={enterprise03} className="imageShow"/>
              <br/>
              <br/>
            </Col>
            <Col xs={1} sm={1} md={0} lg={0} xl={0}></Col>
            <Col xs={14} sm={14} md={24} lg={24} xl={24} style={{padding: '0 6%'}}>
              <h4>Support</h4>
              <br/>
              <hr className="yellowLine2"/>
              <p>
                PostHog can manage your deployment on your infrastructure. All the
                benefits of self-hosting with the reliability and scalability of the
                cloud.
              </p>
            </Col>
          </Row>`
        </Col>
      </Row>
    </div>

      {/* self-hosted full data*/}
      <Row style={{marginTop: '4rem'}}>
        <Col xs={24} sm={24} md={14} lg={14} xl={14}>
          <h3 style={{marginTop: '6rem'}}>Self host available, <br/> with full underlying data access</h3>
          <br/>
          <hr className="blueLine"/>
        </Col>
        <Col xs={0} sm={0} md={10} lg={10} xl={10}>
          <img alt="self-hosted-data-1" loading="lazy" src={selfHostedData1}/>
        </Col>
      </Row>

      {/* Install now, free*/}
      <Row style={{marginTop: '4rem'}}>
        <Col span={24}>
          <div className="installNow">
            <div className="installNowImg">
              <Link to="/docs/deployment">
                <div className="heroku">
                  <img
                    alt="Deploy on Heroku"
                    src={installHeroku}
                  />
                </div>
              </Link>
              <Link to="/docs/deployment#docker">
                <div className="docker">
                  <img
                    alt="Deploy on Docker"
                    src={installDocker}
                  />
                </div>
              </Link>
              <Link to="docs/deployment#aws-ecs-fargate">
                <div className="aws">
                  <img
                    alt="Deploy on AWS"
                    src={installAws}
                  />
                </div>
              </Link>
              <Link to="docs/deployment#helm-charts-and-kubernetes">
                <div className="kubernetes">
                  <img
                    alt="Deploy on Kubernetes"
                    src={installKubernetes}
                  />
                </div>
              </Link>
            </div>
            <img alt="install-now-free-1" loading="lazy" src={installNowFree1} className="imageShow"/>
          </div>
        </Col>
      </Row>

      <Row justify="center">
        <Col span={24} align="middle">
          <p>
            ... or start a{' '}
            <a href="https://app.posthog.com/signup">free trial</a> with PostHog
            SaaS.
          </p>
        </Col>
      </Row>

      {/*join the community*/}
      <Row>
        <Col span={24} className="header-row" align="middle">
          <h2>Join the community</h2>
        </Col>
      </Row>
      <Row justify="spaceBetween">
      <Col xs={8} sm={8} md={6} lg={6} xl={6}>
          <a href="https://github.com/posthog/posthog">
            <img alt="GitHub" src={githubButton1} loading="lazy" className="hover-shadow imageShow" />
          </a>
        </Col>
        <Col xs={0} sm={0} md={3} lg={3} xl={3}></Col>
        <Col xs={8} sm={8} md={6} lg={6} xl={6}>
          <a href="https://join.slack.com/t/posthogusers/shared_invite/enQtOTY0MzU5NjAwMDY3LTc2MWQ0OTZlNjhkODk3ZDI3NDVjMDE1YjgxY2I4ZjI4MzJhZmVmNjJkN2NmMGJmMzc2N2U3Yjc3ZjI5NGFlZDQ">
            <img alt="Slack" src={slackButton1} loading="lazy" className="hover-shadow imageShow" />
          </a>
        </Col>
        <Col xs={0} sm={0} md={3} lg={3} xl={3}></Col>
        <Col xs={8} sm={8} md={6} lg={6} xl={6}>
          <Link to="/handbook/strategy/roadmap">
            <img alt="RoadMap" src={roadmapButton1} loading="lazy" className="hover-shadow imageShow"/>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col span={24} className="gutter-row header-row" >
          <h2 className="yellowHead">What's new?</h2>
          <p>Version 1.13.0</p>
          <Link to="blog/the-posthog-array-1-13-0">
            <Button type="information" size="large">
              Release notes
            </Button>
          </Link>
        </Col>
      </Row>
      </div>
    </Layout>
  )
}

export default IndexPage