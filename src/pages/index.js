import React from 'react'
import Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
import './index.css'
import { Link } from 'gatsby'
import posthogComputerRetro4 from '../images/posthog-computer-retro-4.png'
import hogflix1 from '../images/hogflix-1.png'
import dashboards1 from '../images/dashboards-1.png'
import funnels1 from '../images/funnels-1.png'
import featureFlags1 from '../images/feature-flags-1.png'
import threeComputers1 from '../images/three-computers-1.png'
import enterprise01 from '../images/enterprise-01.png'
import enterprise02 from '../images/enterprise-02.png'
import enterprise03 from '../images/enterprise-03.png'
import installNowFree1 from '../images/install-now-free-1.svg'
import shelfLower1 from '../images/shelf-lower-1.svg'
import shelf2 from '../images/shelf-2.svg'
import stackAndroid from '../images/stack-android.png'
import stackPython from '../images/stack-python.png'
import stackIos from '../images/stack-ios.png'
import stackNode from '../images/stack-node.png'
import stackPhp from '../images/stack-php.png'
import stackRuby from '../images/stack-ruby.png'
import stackGatsby from '../images/stack-gatsby.png'
import stackJavascript from '../images/stack-javascript.png'
import stackGo from '../images/stack-go.png'
import stackApi from '../images/stack-api.png'
import installHeroku from '../images/install-heroku.svg'
import installDocker from '../images/install-docker.svg'
import installAws from '../images/install-aws.svg'
import installKubernetes from '../images/install-kubernetes.svg'
import communityGithub from '../images/community-github.png'
import communitySlack from '../images/community-slack.png'
import { Row, Col, Icon } from 'antd'
import SEO from '../components/seo'
import Layout from '../components/Layout'
import { RightCircleFilled, LeftCircleFilled } from '@ant-design/icons';


function IndexPage() {
  return (
    <Layout containerStyle={{maxWidth: "auto", padding: 0}} className="index-page">
      <div style={{maxWidth: 960, padding: '0px 1.0875rem 1.45rem', margin: '0 auto'}}>
      <SEO
        title="PostHog - open source product analytics"
        description="Understand your users. Build a better product"
      />
      <Row>
        <Col span={24}>
          <div className="firstSpace"></div>
        </Col>
      </Row>
      
      <Row align="top">
        <Col xs={24} sm={18} md={12} lg={12} xl={12} className="gutter-row">
          <h1 className="largeHeader" align="top">
            Understand <br className="hiddenHeadBreak"/>your users.
            <br />
            Build a better product.
          </h1>
          <p>Join 1,000 companies using PostHog.</p>      
            <a href="/trial">
              <Button
                type="primary"
                size="large"
                icon="right-circle"
              >
                Get Started for Free
              </Button>
            </a>
            {' '}
            <a href="/request_demo">
              <Button type="secondary" size="large">
                Request Demo
              </Button>
            </a>
            <div className="secondSpace"></div>
            <h2 className="yellowHead">Open source product analytics</h2>
            <p>
              PostHog provides a full product analytics UX. Analyze trends, funnels, retention and cohorts.
            </p>
        </Col>
        <Col xs={0} sm={0} md={12} lg={12} xl={12} className="gutter-row">
          <img alt="posthog-computer-retro-4" loading="lazy" src={posthogComputerRetro4}/>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
        <div className="thirdSpace"></div>
        </Col>
      </Row>
      
      {/*01 - It all starts with event autocapture*/}
      <Row gutter={24} justify="space-between">
        <Col xs={0} sm={0} md={11} lg={11} xl={11}>
          <img alt="hogflix-1" loading="lazy" src={hogflix1}/>
        </Col>
        <Col xs={0} sm={0} md={1} lg={1} xl={1}></Col>
        <Col xs={4} sm={4} md={3} lg={3} xl={3}>
          <br/>
          <br/>
          <h2 className="yellowHead">01</h2>
        </Col>
        <Col xs={17} sm={17} md={9} lg={9} xl={9}>
          <br/>
          <br/>
          <h3>It all starts with event autocapture</h3>
          <hr className="yellowLine"/>
          <br/>
          <p>PostHog autocaptures events and user behavior in your mobile or web app.</p>
        </Col>
        <Col xs={3} sm={3} md={0} lg={0} xl={0}></Col>
      </Row>

      {/*component space */}
      <Row>
        <Col span={24}>
        <div className="componentSpace"></div>
        </Col>
      </Row>
      
      {/*02 - Understand how traffic really flows through your app*/}
      <Row gutter={24} justify="space-between">
        <Col xs={0} sm={0} md={4} lg={4} xl={4}>
        </Col>
        <Col xs={4} sm={4} md={3} lg={3} xl={3}>
          <h2 className="redHead">02</h2>
        </Col>
        <Col xs={20} sm={20} md={14} lg={14} xl={14}>
          <h3>Understand how traffic really flows through your app</h3>
          <hr className="redLine"/>
        </Col>
        <Col xs={0} sm={0} md={3} lg={3} xl={3}>
        </Col>
      </Row>
      <Row>
        <Col xs={0} sm={0} md={2} lg={2} xl={2}>
        </Col>
        <Col xs={0} sm={0} md={20} lg={20} xl={20}>
          <img alt="funnels-1" loading="lazy" src={funnels1}/>
        </Col>
        <Col xs={0} sm={0} md={2} lg={2} xl={2}>
        </Col>
      </Row>
      
      {/*component space */}
      <Row>
        <Col span={24}>
        <div className="componentSpace"></div>
        </Col>
      </Row>
      
      {/*03 - Understand how traffic really flows through your app*/}
      <Row gutter={24} justify="space-between">
        <Col xs={4} sm={4} md={3} lg={3} xl={3}>
          <h2 className="blueHead">03</h2>
        </Col>
        <Col xs={18} sm={18} md={9} lg={9} xl={9}>
          <h3>Visualise product trends and retention</h3>
          <hr className="blueLine"/>
          <p>Some explaination here about event autocapture, how the code is imput in once and then ready to go?</p>
        </Col>
        <Col xs={2} sm={2} md={1} lg={1} xl={1}></Col>
        <Col xs={0} sm={0} md={10} lg={10} xl={10}>
          <img alt="dashboards-1" src={dashboards1}/>
        </Col>
        <Col xs={2} sm={2} md={1} lg={1} xl={1}></Col>
      </Row>

      {/*component space */}
      <Row>
        <Col span={24}>
        <div className="componentSpace"></div>
        </Col>
      </Row>

      {/*04 - Improve conversion rates*/}
      <Row gutter={24} justify="space-between">
        <Col xs={0} sm={0} md={5} lg={5} xl={5}></Col>
        <Col xs={4} sm={4} md={3} lg={3} xl={3}>
          <h2 className="yellowHead">04</h2>
        </Col>
        <Col xs={20} sm={20} md={12} lg={12} xl={12}>
          <h3>Improve conversion rates</h3>
          <hr className="yellowLine"/>
        </Col>
        <Col xs={0} sm={0} md={4} lg={4} xl={4}></Col>
      </Row>
      <Row justify="space-between" gutter={48}>
        <Col span={24}>
        <img alt="three-computers-1" loading="lazy" src={threeComputers1}/>
        </Col>
      </Row>

      {/*component space */}
      <Row>
        <Col span={24}>
        <div className="componentSpace"></div>
        </Col>
      </Row>
      
      {/*05 - Use feature flags to test new ideas*/}
      <Row gutter={24} justify="space-between">
        <Col xs={0} sm={0} md={12} lg={12} xl={12}>
          <img alt="feature-flags-1" loading="lazy" src={featureFlags1}/>
        </Col>
        <Col xs={4} sm={4} md={3} lg={3} xl={3}>
          <br/>
          <br/>
          <h2 className="redHead">05</h2>
        </Col>
        <Col xs={20} sm={20} md={9} lg={9} xl={9}>
          <br/>
          <br/>
          <h3>Use feature flags to test new ideas</h3>
          <hr className="redLine"/>
          <br/>
          <p>Some explaination here about event autocapture, how the code is imput in once and then ready to go?</p>
        </Col>
      </Row>
      
      <Row className="gutter-row" justify="center" align="middle">
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Col span={24} className="gutter-row" justify="center" align="middle">
          <h3 align="middle" className="icons-header header-row">
            Designed for your stack
          </h3>
        </Col>
      </Row>
      <div className="yourStack">
        <Row className="gutter-row" gutter={24} justify="space-between" align="middle">
          <Col span={4} offset={2} align="middle">
            <Link to="/docs/integrations/python-integration">
              <img alt="Python" className="imageShow" loading="lazy" src={stackPython} />
            </Link>
          </Col>
          <Col span={4} align="middle">
            <Link to="/docs/integrations/php-integration">
              <img alt="PHP" className="imageShow" loading="lazy" src={stackPhp} />
            </Link>
          </Col>
          <Col span={4} align="middle">
            <Link to="/docs/integrations/android-integration">
              <img alt="Android" className="imageShow" loading="lazy" src={stackAndroid} />
            </Link>
          </Col>
          <Col span={4} align="middle">
            <Link to="/docs/integrations/ios-integration">
              <img alt="iOS" className="imageShow" loading="lazy" src={stackIos} />
            </Link>
          </Col>
          <Col span={4} align="middle">
            <Link to="/docs/integrations/node-integration">
              <img alt="Node" className="imageShow" loading="lazy" src={stackNode} />
            </Link>
          </Col>
          <Col span={22} offset={1}>
            <img alt="shelf-2" className="imageShow" loading="lazy" src={shelf2}/>
          </Col>
        </Row>
        <Row className="gutter-row" gutter={24} justify="space between" align="bottom">
          <br/>
          <br/>
          <Col span={4} offset={2} align="middle">
            <Link to="/docs/integrations/ruby-integration">
              <img alt="Ruby" className="imageShow" loading="lazy" src={stackRuby} />
            </Link>
          </Col>
          <Col span={4}align="middle">
            <Link to="/docs/integrations/gatsby-integration">
              <img alt="Gatsby" className="imageShow" loading="lazy" src={stackGatsby} />
            </Link>
          </Col>
          <Col span={4} align="middle">
            <Link to="/docs/integrations/js-integration">
              <img alt="Javascript" className="imageShow" loading="lazy" src={stackJavascript}/>
            </Link>
          </Col>
          <Col span={4} align="middle">
            <Link to="/docs/integrations/go-integration">
              <img alt="Go" className="imageShow" loading="lazy" src={stackGo} />
            </Link>
          </Col>
          <Col span={4} align="middle">
            <Link to="/docs/integrations/api">
              <img alt="API" className="imageShow" loading="lazy" src={stackApi} />
            </Link>
          </Col>
          <Col span={22} offset={1} >
            <img alt="shelf-lower-1" className="imageShow" loading="lazy" src={shelfLower1}/>
          </Col>
        </Row>
      </div>
      
      
      
      
      
      
      
      
      {/*component space */}
      <Row>
        <Col span={24}>
        <div className="componentSpace"></div>
        </Col>
      </Row>
      </div>
      <Row>
        <Col span={24}>
          <div className="lightBlueBreak"></div>
        </Col>
      </Row>
      <div style={{maxWidth: 960, padding: '0px 1.0875rem 1.45rem', margin: "0 auto"}}>
      {/*component space */}
      <Row>
        <Col span={24}>
        <div className="componentSpace"></div>
        </Col>
      </Row>

      <Row gutter={[24, 8]}>
        <Col span={24} align="middle">
          <h2>PostHog for Enterprise</h2>
          <br/>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Row gutter={24}>
            <Col xs={10} sm={10} md={24} lg={24} xl={24}>
              <img alt="enterprise-01" loading="lazy" src={enterprise01} className="imageShow"/>
              <br/>
            </Col>
            <Col xs={14} sm={14} md={24} lg={24} xl={24}>
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
          <Row gutter={24}>
            <Col xs={10} sm={10} md={24} lg={24} xl={24}>
              <img alt="enterprise-02" loading="lazy" src={enterprise02} className="imageShow"/>
              <br/>
            </Col>
            <Col xs={14} sm={14} md={24} lg={24} xl={24}>
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
          <Row gutter={24}>
            <Col xs={10} sm={10} md={24} lg={24} xl={24}>
              <img alt="enterprise-03" loading="lazy" src={enterprise03} className="imageShow"/>
              <br/>
            </Col>
            <Col xs={14} sm={14} md={24} lg={24} xl={24}>
              <h4>Support</h4>
              <br/>
              <hr className="yellowLine2"/>
              <p>
                PostHog can manage your deployment on your infrastructure. All the
                benefits of self-hosting with the reliability and scalability of the
                cloud.
              </p>
              <br/>
            </Col>
          </Row>`
        </Col>
      </Row>
      <Row gutter={[24,8]}>
        <Col span={22} offset={1}>
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

      <Row gutter={[24, 24]} justify="center">
        <Col span={24} align="middle">
          <p>
            ... or start a{' '}
            <a href="https://app.posthog.com/signup">free trial</a> with PostHog
            SaaS.
          </p>
        </Col>
      </Row>
      </div>
      <Row>
        <Col span={24}>
          <div className="darkBreak"></div>
        </Col>
      </Row>
      <div style={{maxWidth: 960, padding: '0px 1.0875rem 1.45rem', margin: "0 auto"}}>
      <Row gutter={[24, 24]}>
        <Col span={24} className="header-row" align="middle">
          <h2>Join the community</h2>
        </Col>
      </Row>
      <Row span={21} gutter={[24, 24]}>
        <Col xs={0} sm={0} md={3} lg={3} xl={3}></Col>
        <a href="https://github.com/posthog/posthog">
          <Col xs={8} sm={8} md={6} lg={6} xl={6} align="middle">
            <img alt="GitHub" src={communityGithub} className="hover-shadow" />
          </Col>
        </a>
        <a href="https://join.slack.com/t/posthogusers/shared_invite/enQtOTY0MzU5NjAwMDY3LTc2MWQ0OTZlNjhkODk3ZDI3NDVjMDE1YjgxY2I4ZjI4MzJhZmVmNjJkN2NmMGJmMzc2N2U3Yjc3ZjI5NGFlZDQ">
          <Col xs={8} sm={8} md={6} lg={6} xl={6} align="middle">
            <img alt="Slack" src={communitySlack} className="hover-shadow" />
          </Col>
        </a>
        <Link to="/handbook/strategy/roadmap">
          <Col xs={8} sm={8} md={6} lg={6} xl={6} align="middle">
            <Icon
              type="project"
              theme="filled"
              className="hover-shadow icon-100"
            />
          </Col>
        </Link>
        <Col xs={0} sm={0} md={3} lg={3} xl={3}></Col>
      </Row>
      <Row gutter={[24, 96]}>
        <Col span={24} className="gutter-row header-row" align="middle">
          <h2>What's new?</h2>
          <p>Version 1.10.1</p>
          <Link to="blog/the-posthog-array-1-10-0">
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