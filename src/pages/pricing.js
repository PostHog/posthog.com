import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import { Row, Col, Button, Card } from 'antd'
import SEO from '../components/seo'
import './pricing.css'

const PricingPage = () => {
  const plans = [
    {
      title: 'Free',
      popular: false,
      price: '$0',
      priceDetail: 'forever',
      description: 'Ideal if you’re just getting started with your product',
      callToAction: 'Create free account',
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
      benefits: [
        '<span class="p-plan-benefit-lg">Everything in Growth, plus:</span>',
        'Capture <b>unlimited</b> events',
        '<b>Unlimited</b> data retention',
        'Dedicated support',
      ],
    },
  ]

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

      <Row gutter={[24, 36]} type="flex">
        {plans.map(plan => (
          <Col md={24 / plans.length} sm={24} align="middle" key={plan.title}>
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
              <Button type={plan.popular ? 'primary' : 'default'} size="large">
                {plan.callToAction}
              </Button>
              <div className="p-plan-benefits">
                {plan.benefits.map(benefit => (
                  <span dangerouslySetInnerHTML={{ __html: benefit }}></span>
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Layout>
  )
}

export default PricingPage
