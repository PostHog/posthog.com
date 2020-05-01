import React from 'react'
import Layout from '../components/Layout'
import Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
import { Link } from "gatsby"
import { Row, Col } from 'antd';

const IndexPage = () => {
  return (
    <Layout>
      <Row gutter={[24, 8]}>
        <Col span={24} className="gutter-row">
          <h2 className="large-header">Understand your users.<br />Build a better product.</h2>
        </Col>
      </Row>
      <Row gutter={[16, 8]}>
        <Col span={16} className="gutter-row">
          <p>Join 1,000 companies using PostHog.</p>
        </Col>
      </Row>
      <Row gutter={[24, 8]}>
        <Col span={5} className="gutter-row">
          <Link to="https://app.posthog.com/signup">
            <Button type="primary" size="large" icon="right-circle" style={{marginRight: 10}}>Try Hosted, Free</Button>
          </Link>
        </Col>
        <Col span={5} className="gutter-row">
          <Link to="https://app.posthog.com/signup">
            <Button type="secondary" size="large" href="https://github.com/posthog/posthog">Self-Managed</Button>
          </Link>
        </Col>
      </Row>
      <Row gutter={[24, 24]} class="medium-row">
        <Col span={24} className="gutter-row medium-row" align="middle">
          <h2>Open source product analytics</h2>
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12} className="gutter-row">
          <h3>Understand users and events</h3>
          <p>PostHog autocaptures events and user behavior in your mobile or web app.</p>
        </Col>
        <Col span={12} className="gutter-row">
          <p>image of the system</p>
        </Col>
      </Row>
      <Row gutter={[24, 24]} class="medium-row">
        <Col span={24} className="gutter-row medium-row" align="middle">
          <h2>Self-hosted available, with full underlying data access.</h2>
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12} className="gutter-row">
          <p>image of the system</p>
        </Col>
        <Col span={12} className="gutter-row">
          <h3>Full product analytics UX</h3>
          <p>PostHog provides a full product analytics UX. Analyze trends, funnels, retention and cohorts.</p>
        </Col>
      </Row>
      <Row gutter={[24, 24]} class="medium-row">
        <Col span={24} className="gutter-row medium-row" align="middle">
          <h2>Designed for your stack</h2>
          <p>Logos of stuff we integrate with here</p>
        </Col>
      </Row>
      <Row gutter={[24, 8]}>
        <Col span={24} className="gutter-row" align="middle">
          <h2>PostHog for Enterprise</h2>
        </Col>
      </Row>
      <Row gutter={[24, 8]}>
        <Col span={8} className="gutter-row" align="middle">
          <h3>Self-managed</h3>
          <p>PostHog can be deployed in your cloud, for painless adoption and onboarding.</p>
        </Col>
        <Col span={8} className="gutter-row" align="middle">
          <h3>Unlimited volume</h3>
          <p>PostHog is built to scale. That includes our open core pricing model.</p>
        </Col>
        <Col span={8} className="gutter-row" align="middle">
          <h3>Support</h3>
          <p>PostHog can manage your deployment for you. All the benefits of sel-hosting with the reliability and scalability of the cloud.</p>
        </Col>
      </Row>
      <Row gutter={[24, 24]} class="medium-row">
        <Col span={24} className="gutter-row medium-row" align="middle">
          <h2>Install now, free</h2>
          <p>Logos of how we can deploy here.</p>
          <p>... or start a <Link to="https://app.posthog.com/signup">free trial</Link> with PostHog SaaS.</p>
        </Col>
      </Row>
      <Row gutter={[24, 8]}>
        <Col span={24} className="gutter-row" align="middle">
          <h2>Join the community</h2>
        </Col>
      </Row>
      <Row gutter={[24, 8]}>
        <Col span={8} className="gutter-row" align="middle">
          <p>GitHub logo</p>
          <h3>GitHub</h3>
        </Col>
        <Col span={8} className="gutter-row" align="middle">
          <p>Slack logo</p>
          <h3>Slack</h3>
        </Col>
        <Col span={8} className="gutter-row" align="middle">
          <p>Roadmap icon</p>
          <h3>Roadmap</h3>
        </Col>
      </Row>
      <Row gutter={[24, 24]} class="medium-row">
        <Col span={24} className="gutter-row medium-row" align="middle">
          <h2>What's new</h2>
          <p>1.1.0</p>
          <Button type="information" size="large">Release notes</Button>
        </Col>
      </Row>
    </Layout>
  )
}

export default IndexPage