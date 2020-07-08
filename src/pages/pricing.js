import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from '@reach/router'
import { Link } from 'gatsby'
import queryString from 'query-string'
import Layout from '../components/Layout'
import { Row, Col, Button, Card } from 'antd'
import SEO from '../components/seo'
import './pricing.css'

const PricingPage = () => {
  const [state, setState] = useState({ planOptions: 'cloud' })
  const comparisonRef = useRef()
  const location = useLocation()
  const plans = {
    cloud: [
      {
        title: 'Free',
        popular: false,
        price: '$0',
        priceDetail: 'forever',
        description: 'Ideal if you’re just getting started with your product',
        callToAction: 'Create free account',
        callToActionDest: {
          type: 'url',
          value: 'https://app.posthog.com/signup',
        },
        benefits: [
          'Capture up to <b>5,000 events/month</b>',
          '<b>All analytics features</b>',
          '<b>Unlimited</b> tracked users',
          '<b>Unlimited</b> team members',
          '90 day data retention',
          'Community support',
        ],
      },
      {
        title: 'Growth',
        popular: true,
        price: '$29',
        priceDetail: '/month',
        description: 'Ideal for scaling companies with higher usage',
        callToAction: 'Start my 30-day free trial',
        callToActionDest: {
          type: 'url',
          value: 'https://app.posthog.com/signup',
        },
        benefits: [
          '<span class="p-plan-benefit-lg">Everything in Free, plus:</span>',
          'Up to <b>500,000 events/month</b>',
          '12 month data retention',
          'Email support',
        ],
      },
      {
        title: 'Enterprise',
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
        ],
      },
    ],
    'self-managed': [
      {
        title: 'Community',
        popular: false,
        price: '$0',
        priceDetail: 'forever',
        description:
          'Ideal if your team has technical expertise and handles large volumes of users or events',
        callToAction: 'Start deployment',
        callToActionType: 'primary',
        callToActionDest: {
          type: 'gatsbyLink',
          value: '/docs/deployment',
        },
        benefits: [
          'Capture <b>unlimited</b> events',
          '<b>All analytics features</b>',
          '<b>Unlimited</b> tracked users',
          '<b>Unlimited</b> team members',
          '<b>Unlimited</b> data retention',
          'Free updates for life (our code is <a href="https://github.com/posthog/posthog" target="_blank">open source</a>)',
          'Community support',
        ],
      },
      {
        title: 'Supported',
        popular: false,
        price: 'Starts at $2k',
        priceDetail: '/month',
        description:
          'Ideal for companies with large volumes that do not want the hassle of managing a tech infrastructure',
        callToAction: 'Contact sales',
        callToActionDest: {
          type: 'url',
          value:
            'mailto:sales@posthog.com?subject=Enquiry%20about%20self-managed%20supported%20plan',
        },
        benefits: [
          '<span class="p-plan-benefit-lg">Everything in Community, plus:</span>',
          'PostHog deploys and maintains everything (in your own infrastructure)',
          'Uptime and scalability SLAs',
          'Custom databases and integrations',
          'Dedicated support',
        ],
      },
    ],
  }

  useEffect(() => {
    // On load, set the correct plan options (if applicable)
    const { o } = queryString.parse(location.search)
    if (o && o in plans) setState({ ...state, planOptions: o })
  }, [])

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
          <h1 className="p-title p-text-primary">
            Affordable product analytics for everyone
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
              className={state.planOptions === 'self-managed' ? 'active' : ''}
            >
              <input
                type="radio"
                value="self-managed"
                name="planOptions"
                checked={state.planOptions === 'self-managed'}
                onChange={event => handleSegmentChange(event)}
              />{' '}
              Self-managed
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
          <Col md={8} sm={24} align="middle" key={plan.title}>
            {plan.popular && (
              <div className="p-plan-popular-badge">POPULAR</div>
            )}
            <Card className="p-plan">
              <h3
                className={
                  (plan.popular ? 'p-text-primary ' : '') + 'p-plan-title'
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
          <Link to="/docs/features">
            <a href="#" className="p-features-link">
              Full features details{' '}
              <img
                alt=""
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEuMjUiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxNCAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjI2NjUgMTEuNzI5M0wzLjkxNTgyIDIwLjA4QzMuNTEzMDggMjAuNDgyNyAyLjg2MDEyIDIwLjQ4MjcgMi40NTc0MiAyMC4wOEwxLjQ4MzQ1IDE5LjEwNkMxLjA4MTM5IDE4LjcwMzkgMS4wODA2MSAxOC4wNTIzIDEuNDgxNzMgMTcuNjQ5M0w4LjA5OTgyIDExLjAwMDFMMS40ODE3MyA0LjM1MDg4QzEuMDgwNjEgMy45NDc4OCAxLjA4MTM5IDMuMjk2MjUgMS40ODM0NSAyLjg5NDJMMi40NTc0MiAxLjkyMDIyQzIuODYwMTcgMS41MTc0OCAzLjUxMzEyIDEuNTE3NDggMy45MTU4MiAxLjkyMDIyTDEyLjI2NjUgMTAuMjcwOUMxMi42NjkyIDEwLjY3MzYgMTIuNjY5MiAxMS4zMjY2IDEyLjI2NjUgMTEuNzI5M1oiIGZpbGw9IiMxODkwRkYiLz4KPC9zdmc+"
              />
            </a>
          </Link>
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={24} align="middle">
          <Card className="p-startup-card">
            <div>
              <img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDkiIGhlaWdodD0iNDkiIHZpZXdCb3g9IjAgMCA0OSA0OSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik00OC4zNDE2IDEuODI3MzNDNDguMjI3NyAxLjI5Nzk3IDQ3LjcwNDQgMC43NzQ1OTcgNDcuMTczMyAwLjY2MDk1QzQ0LjA5MiAwIDQxLjY3OTQgMCAzOS4yNzczIDBDMjkuMzk3NiAwIDIzLjQ3MyA1LjI4MzExIDE5LjA0OTkgMTIuMjVIOS4wNzYyN0M3LjUxMTc1IDEyLjI1MTUgNS42NzMzOSAxMy4zODY1IDQuOTcxODggMTQuNzg0NkwwLjI0MDc1MyAyNC4yNDEzQzAuMDk0NTQ0MyAyNC41NjM4IDAuMDEyNzYxMSAyNC45MTE4IDAgMjUuMjY1NkMwLjAwMDIxOTk4OSAyNS44NzQ4IDAuMjQyMzU5IDI2LjQ1OSAwLjY3MzE3OSAyNi44ODk3QzEuMTA0IDI3LjMyMDQgMS42ODgyMyAyNy41NjI0IDIuMjk3NDMgMjcuNTYyNUgxMi4yMzI0TDEwLjA4MTUgMjkuNzEyOEM4Ljk5MzgzIDMwLjgwMDEgOC44Mzc3NiAzMi44IDEwLjA4MTUgMzQuMDQzNEwxNC45NTMyIDM4LjkxNTNDMTYuMDIwOSAzOS45ODYgMTguMDMwNyA0MC4xNzQ0IDE5LjI4NjQgMzguOTE1M0wyMS40MzczIDM2Ljc2NVY0Ni43MDMxQzIxLjQzNzUgNDcuMzEyMyAyMS42Nzk2IDQ3Ljg5NjUgMjIuMTEwNSA0OC4zMjcyQzIyLjU0MTMgNDguNzU3OSAyMy4xMjU1IDQ4Ljk5OTkgMjMuNzM0NyA0OUMyNC4wODg2IDQ4Ljk4NjkgMjQuNDM2NyA0OC45MDUxIDI0Ljc1OTQgNDguNzU5MkwzNC4yMDggNDQuMDMyNEMzNS42MDggNDMuMzM0MSAzNi43NDQ5IDQxLjQ5NjMgMzYuNzQ0OSAzOS45MzA2VjI5LjkzNTZDNDMuNjkyNyAyNS41MDM0IDQ4Ljk5ODIgMTkuNTYwOCA0OC45OTgyIDkuNzMzMzFDNDkuMDA3MiA3LjMyMTI5IDQ5LjAwNzIgNC45MDkyNyA0OC4zNDE2IDEuODI3MzNaTTM2Ljc1MzkgMTYuMDc4MUMzNS45OTY4IDE2LjA3NzkgMzUuMjU2NyAxNS44NTMzIDM0LjYyNzMgMTUuNDMyNUMzMy45OTc5IDE1LjAxMTggMzMuNTA3NCAxNC40MTM4IDMzLjIxNzggMTMuNzE0M0MzMi45MjgyIDEzLjAxNDggMzIuODUyNSAxMi4yNDUxIDMzLjAwMDMgMTEuNTAyNkMzMy4xNDgxIDEwLjc2MDEgMzMuNTEyOCAxMC4wNzgxIDM0LjA0ODIgOS41NDI3OEMzNC41ODM2IDkuMDA3NSAzNS4yNjU3IDguNjQzIDM2LjAwODMgOC40OTUzNkMzNi43NTA5IDguMzQ3NzMgMzcuNTIwNSA4LjQyMzU5IDM4LjIyIDguNzEzMzZDMzguOTE5NCA5LjAwMzEzIDM5LjUxNzIgOS40OTM3OSAzOS45Mzc4IDEwLjEyMzNDNDAuMzU4NCAxMC43NTI4IDQwLjU4MjkgMTEuNDkyOSA0MC41ODI5IDEyLjI1QzQwLjU4MjMgMTMuMjY1MyA0MC4xNzg3IDE0LjIzODggMzkuNDYwNyAxNC45NTY2QzM4Ljc0MjcgMTUuNjc0NCAzNy43NjkxIDE2LjA3NzggMzYuNzUzOSAxNi4wNzgxWiIgZmlsbD0iI0Y1NEUwMCIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwIj4KPHJlY3Qgd2lkdGg9IjQ5IiBoZWlnaHQ9IjQ5IiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo="
                alt=""
              />
            </div>
            <div class="p-main">
              <h4>Are you a startup?</h4>
              <span>
                We got your back! Find product-market fit,{' '}
                <b>completely free</b> with a tool that does the legwork for
                you.
              </span>
            </div>
            <div>
              <Link to="/startups">
                <Button type="primary" size="middle">
                  Learn more
                </Button>
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={[24, 24]} style={{ marginTop: '32px' }}>
        <Col span={24}>
          <div ref={comparisonRef} id="comparison"></div>
          <h2>Cloud vs. self-managed</h2>
          <p>
            It is very important that you select the option that is{' '}
            <b>right for you</b>, below you will find some recommendations on
            which options to choose.
          </p>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: '48px' }}>
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
