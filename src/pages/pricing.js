import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from '@reach/router'
import { Link } from 'gatsby'
import queryString from 'query-string'
import Layout from '../components/Layout'
import { Row, Col, Button, Card, Collapse } from 'antd'
import SEO from '../components/seo'
import './styles/pricing.css'
import 'antd/lib/collapse/style/css'
import imgCloud from '../images/cloud.svg'
import imgBuilding from '../images/building.svg'
import imgRocket from '../images/rocket.svg'
import imgChevronRight from '../images/chevron-right.svg'
import imgHobby from "../images/plan-hobby.svg"
import imgStarter from "../images/plan-starter.svg"
import imgGrowth from "../images/plan-growth.svg"
import imgUltimate from "../images/plan-enterprise.svg"
import imgOpenSource from "../images/plan-open-source.svg"
import imgEnterprise1 from "../images/plan-enterprise1.svg"
import imgEnterprise2 from "../images/plan-enterprise2.svg"

const PricingPage = () => {
  const [state, setState] = useState({ planOptions: 'cloud' })
  const comparisonRef = useRef()
  const location = useLocation()
  const { Panel } = Collapse
  const plans = {
    cloud: [
      {
        title: 'Hobby',
        image: imgHobby,
        popular: false,
        price: '$0',
        priceDetail: 'forever',
        description: 'Ideal for just yourself or small side projects',
        callToAction: 'Create free account',
        callToActionDest: {
          type: 'url',
          value: 'https://app.posthog.com/signup',
        },
        benefits: [
          'Capture up to <b>20,000 events/month</b>',
          '<b>All core analytics features</b>',
          '<b>Unlimited</b> tracked users',
          '<b>1</b> team member',
          '90 day data retention',
          'Community support',
        ],
      },
      {
        title: 'Starter',
        image: imgStarter,
        popular: true,
        price: '$19',
        priceDetail: '/month',
        description: 'Ideal to get your product or website off the ground',
        callToAction: 'Start my free trial',
        callToActionDest: {
          type: 'url',
          value: 'https://app.posthog.com/signup?plan=starter',
        },
        benefits: [
          '<span class="p-plan-benefit-lg">Everything in Hobby, plus:</span>',
          'Capture up to <b>200,000 events/month</b>',
          '<b>Unlimited</b> team members',
          '<a href="/docs/features/feature-flags" target="blank">Feature flags</a>',
          '<a href="/docs/features/cohorts" target="blank">User cohorts</a>',
          '<a href="/docs/features/users#user-history" target="blank">Individual user history</a>',
          '6 month data retention',
          'Community support',
        ],
      },
      {
        title: 'Growth',
        image: imgGrowth,
        popular: false,
        price: '$99',
        priceDetail: '/month',
        description: 'Ideal for companies with large volumes',
        callToAction: 'Start my free trial',
        callToActionDest: {
          type: 'url',
          value: 'https://app.posthog.com/signup?plan=growth',
        },
        benefits: [
          '<span class="p-plan-benefit-lg">Everything in Starter, plus:</span>',
          'Up to <b>500,000 events/month</b>',
          'Further events charged $99/500K',
          '12 month data retention',
          'Email support',
        ],
      },
      {
        title: 'Ultimate',
        image: imgUltimate,
        popular: false,
        price: 'Custom',
        priceDetail: 'contact us',
        description: 'Ideal for large companies with millions of users',
        callToAction: 'Contact sales',
        callToActionDest: {
          type: 'url',
          value:
            'mailto:sales@posthog.com?subject=Enquiry%20about%20enterprise%20plan',
        },
        benefits: [
          '<span class="p-plan-benefit-lg">Everything in Growth, plus:</span>',
          'Capture <b>unlimited</b> events',
          '<b>Unlimited</b> data retention',
          'Dedicated support',
          'SSO/SAML',
          'Export to data lakes'
        ],
      },
    ],
    'enterprise': [
      {
        title: 'Enterprise',
        image: imgEnterprise1,
        popular: false,
        price: 'Starts at $2k',
        priceDetail: '/month',
        description:
          'Ideal for companies need scalability and enterprise features',
        callToAction: 'Contact sales',
        callToActionDest: {
          type: 'url',
          value:
            'mailto:sales@posthog.com?subject=Enquiry%20about%20enterprise%20supported%20plan',
        },
        benefits: [
          '<span class="p-plan-benefit-lg">Everything in Open Source, plus:</span>',
          'Clickhouse database for Petabyte scale',
          'Integrations with services like Zapier',
          'Permissioning and multiple projects',
          'Dedicated support',
          'SSO/SAML',
          'Export to data lakes'
        ],
      },
      {
        title: 'Supported Enterprise',
        image: imgEnterprise2,
        popular: true,
        price: 'Custom',
        priceDetail: 'contact us',
        description:
          'Ideal for companies that do not want the hassle of managing PostHog, but want to own their data.',
        callToAction: 'Contact sales',
        wraps: false,
        callToActionDest: {
          type: 'url',
          value:
            'mailto:sales@posthog.com?subject=Enquiry%20about%20enterprise%20supported%20plan',
        },
        benefits: [
          '<span class="p-plan-benefit-lg">Everything in Enterprise, plus:</span>',
          'PostHog deploys and maintains everything (in your own infrastructure)',
          'Uptime and scalability SLAs',
        ],
      }
    ],
    'open-source': [
      {
        title: 'Open source',
        image: imgOpenSource,
        popular: true,
        price: 'Free',
        priceDetail: '',
        description:
          'Ideal for those with smaller traffic volumes, happy to manage their own infrastructure',
        callToAction: 'Deploy',
        callToActionDest: {
          type: 'url',
          value:
            'https://posthog.com/docs/deployment',
        },
        benefits: [
          '<span class="p-plan-benefit-lg">Everything in Open Source, plus:</span>',
          'Clickhouse database for Petabyte scale',
          'Integrations with services like Zapier',
          'Permissioning and multiple projects',
          'Dedicated support',
          'SSO/SAML',
          'Export to data lakes'
        ],
      }
    ],
  }
  const faqs = [
    {
      q: 'How do I know what my volume is?',
      a:
        'We provide a free tier on our Cloud plan. This allows you to quickly get a sense of what your volume is. If you have very high volumes (10s-100s of thousands of users, our enterprise product is probably the most cost effective.'
    },
    {
      q: 'What happens when I reach the maximum number of events in my plan?',
      a:
        'We will let you know when you are close to the maximum number of events and prompt you to upgrade to a different plan. We will not stop collecting events but we might limit your ability to consult your data or run analytics until the next billing period.',
    },
    {
      q: 'Is there a free trial on paid plans?',
      a:
        'You can get a 30-day free trial on our Starter and Growth plans. Our Ultimate plan does not offer a free trial because it has the same base features as the Growth plan.',
    },
    {
      q: 'What happens after the data retention period elapses?',
      a:
        'On the cloud plans, any event or user data stored for more than the retention period may be permanently deleted from our systems. On the enterprise and open source plans, you control your data retention and what happens to your data afterwards.',
    },
    {
      q: 'Can I switch between the cloud and enterprise plans?',
      a:
        'We are working hard to enable a bridge that allows data transfer between cloud instances and enterprise instances. This will be possible in the coming months.',
    },
  ]

  const setOptionFromQS = () => {
    // On load, set the correct plan options (if applicable)
    const { o } = queryString.parse(location.search)
    if (o && o in plans) setState({ ...state, planOptions: o })
  }

  useEffect(setOptionFromQS, [])

  const handleSegmentChange = event => {
    const newOption = event.target.value
    const pushUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?o=${newOption}`
    window.history.pushState({ path: pushUrl }, '', pushUrl)
    setState({ ...state, planOptions: event.target.value })
  }

  const CTAButton = props => (
    <Button
      type={
        props.plan.callToActionType ||
        (props.plan.popular ? 'primary' : 'default')
      }
      size="large"
    >
      {props.plan.callToAction}
    </Button>
  )

  return (
    <Layout>
      <SEO
        title="PostHog Pricing"
        description="Find out how much it costs to use PostHog"
      />
      <Row gutter={[24, 24]}>
        <Col span={24} align="middle">
          <h1>
            Pricing for your scale
          </h1>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col span={24} align="middle">
          <div className="p-segment">
            <label className={state.planOptions === 'cloud' ? 'active' : ''}>
              <input
                type="radio"
                value="cloud"
                name="planOptions"
                checked={state.planOptions === 'cloud'}
                onChange={event => handleSegmentChange(event)}
              />{' '}
              Cloud
            </label>
            <label
              className={state.planOptions === 'enterprise' ? 'active' : ''}
            >
              <input
                type="radio"
                value="enterprise"
                name="planOptions"
                checked={state.planOptions === 'enterprise'}
                onChange={event => handleSegmentChange(event)}
              />{' '}
              Enterprise
            </label>
            <label
              className={state.planOptions === 'open-source' ? 'active' : ''}
            >
              <input
                type="radio"
                value="open-source"
                name="planOptions"
                checked={state.planOptions === 'open-source'}
                onChange={event => handleSegmentChange(event)}
              />{' '}
              Open source
            </label>
          </div>
          <div style={{ paddingTop: '16px' }}>
            <a
              href="#comparison"
              onClick={event => {
                event.preventDefault()
                comparisonRef.current.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })
              }}
            >
              What is the difference?
            </a>
          </div>
        </Col>
      </Row>
      <Row
        gutter={[24, 36]}
        type="flex"
        style={{ justifyContent: 'center', marginTop: '32px' }}
      >
        {plans[state.planOptions].map(plan => (
          <Col md={24 / plans[state.planOptions].length} sm={24} align="middle" key={plan.title}>
            {plan.popular && (
              <div className="p-plan-popular-badge">POPULAR</div>
            )}
            <Card className="p-full-height">
              {plan.image && <div style={{marginTop: 16}}>
                <img src={plan.image} alt="" />  
              </div>}
              <h3
                className={
                  (plan.popular ? 'p-text-primary ' : '') + 'p-plan-title ' + (plan.wraps && 'p-plan-title-wrap')
                }
              >
                {plan.title}
              </h3>
              <div className="p-plan-price">
                {plan.price}
                <span className="p-text-primary">{plan.priceDetail}</span>
              </div>
              <div className="p-plan-description">{plan.description}</div>
              {plan.callToActionDest?.type === 'gatsbyLink' && (
                <Link to={plan.callToActionDest?.value}>
                  <CTAButton plan={plan} />
                </Link>
              )}
              {plan.callToActionDest?.type !== 'gatsbyLink' && (
                <a href={plan.callToActionDest?.value}>
                  <CTAButton plan={plan} />
                </a>
              )}

              <div className="p-plan-benefits">
                {plan.benefits.map(benefit => (
                  <span
                    key={benefit}
                    dangerouslySetInnerHTML={{ __html: benefit }}
                  ></span>
                ))}
              </div>
            </Card>
          </Col>
        ))}
        <Col span={24} align="middle">
          All prices in US Dollars (USD), excluding taxes
        </Col>
        <Col span={24} align="middle">
          <Link to="/docs/features" className="p-features-link">
            Full features details <img alt="" src={imgChevronRight} />
          </Link>
        </Col>
      </Row>
      <br />
      <Row gutter={[24, 24]}>
        <Col span={24} align="middle">
          <Card className="p-startup-card">
            <div>
            <div>
              <img src={imgRocket} alt="" />
            </div>
            <div className="p-main">
              <h4>Are you a startup?</h4>
              <span>
                We've got your back! Find product-market fit,{' '}
                <b>completely free</b> with a tool that does the legwork for
                you.
              </span>
            </div>
            <div>
              <Link to="/startups">
                <Button type="primary">Learn more</Button>
              </Link>
            </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={[24, 24]} style={{ marginTop: '32px' }}>
        <Col span={24}>
          <div ref={comparisonRef} id="comparison"></div>
          <h2>Cloud vs. Enterprise</h2>
          <p>
            Cloud or Enterprise? We'd love to help you find the option that's{' '}
            <b>right for you</b>.
          </p>
        </Col>
        <Row type="flex" gutter={[24, 24]} style={{ paddingLeft: '16px' }}>
          <Col md={12} sm={24}>
            <div className="p-full-height">
              <h4 className="p-text-primary p-title-with-icon">
                <img src={imgCloud} alt="" style={{ paddingRight: 0 }} />
                Cloud
              </h4>
              <ul className="p-comparison-list">
                <li>
                  Recommended if you want to get <b>started right now</b>. Start
                  capturing events in under 5 minutes.
                </li>
                <li>
                  You don’t own or want to own your own technical
                  infrastructure.
                  <b>We’ll handle everything for you.</b>
                </li>
                <li>You want an out-of-the-box secure solution.</li>
                <li>
                  You want to get automatic updates to all the latest features.
                </li>
              </ul>
              <div className="p-comparison-btn">
                <a href="https://app.posthog.com/signup?plan=starter">
                  <Button type="primary" size="large">
                    Start my 30-day free trial
                  </Button>
                </a>
              </div>
            </div>
          </Col>
          <Col md={12} sm={24}>
            <div className="p-full-height">
              <h4 className="p-text-primary p-title-with-icon">
                <img src={imgBuilding} alt="" /> Enterprise
              </h4>
              <ul className="p-comparison-list">
                <li>
                  Recommended if you have large volumes of events or users (in
                  the hundreds of thousands or more).
                </li>
                <li>
                  If you have heavy compliance requirements on privacy or data
                  handling (e.g. HIPAA, SOC2).
                </li>
                <li>
                  If you need dedicated support, and want regular touch points with our team to get the best value.
                </li>
                <li>
                  You are concerned with browser privacy features, ad blockers
                  or third-party cookie blockers.
                </li>
              </ul>
              <div className="p-comparison-btn">
                <Link to="/docs/deploy">
                  <Button type="primary" size="large">
                    Start deployment
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: '60px' }}>
        <Col span={24}>
          <h2>Frequently asked questions</h2>
        </Col>
        <Col span={24} className="p-faqs">
          <Collapse bordered={false}>
            {faqs.map((faq, i) => (
              <Panel header={faq.q} key={i}>
                {faq.a}
              </Panel>
            ))}
          </Collapse>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: '60px' }}>
        <Col span={24} align="middle">
          <h2 className="p-text-primary">Ready to get started?</h2>
          <a href="https://app.posthog.com/signup">
            <Button type="primary" size="large">
              Create my free account
            </Button>
          </a>
        </Col>
      </Row>
    </Layout>
  )
}

export default PricingPage
