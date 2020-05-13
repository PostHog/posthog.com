import React from 'react'
import { graphql, Link } from "gatsby"
import Layout from '../components/Layout'
import { Row, Col, Button, Tabs, Card } from 'antd';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const PricingPage = () => (
  <Layout>
    <Row gutter={[24, 24]}>
    <Col span={24} align="middle">
        <h1>Pricing</h1>
      </Col>
    </Row>
    <Row gutter={[16, 96]}>
      <Tabs onChange={callback} type="card">
	    <TabPane tab="🏢 Self-Managed" key="1">
	      <div className="site-card-wrapper">
		    <Row gutter={16}>
		      <Col span={12}>
		        <Card title="Community Edition" bordered={false}>
					<h4>$0/month</h4>
					<li>Unlimited event volumes</li>
					<li>Unlimited users</li>
					<li>Full user data control</li>
					<li>Free forever</li>
					<li>Community support</li>
					<p>
						<Link to="/docs/deployment">
						<Button type="primary">Install</Button>
						</Link>
					</p>
		        </Card>
		      </Col>
		      <Col span={12}>
		        <Card title="Supported" bordered={false}>
		        	<h4>Starts at $2k/month</h4>
					<li>PostHog team manage your deployment for you</li>
					<li>Uptime and scalability SLAs</li>
					<li>Custom databases and integrations</li>
					<li>All features of Community Edition</li>
					<li>Dedicated support</li>
					<p>
						<a href="mailto:sales@posthog.com">
						<Button type="primary">Contact</Button>
						</a>
					</p>
		        </Card>
		      </Col>
		    </Row>
		  </div>
	    </TabPane>
	    <TabPane tab="☁️ SaaS / Hosted" key="2">
	      <div className="site-card-wrapper">
		    <Row gutter={16}>
		      <Col span={8}>
		        <Card title="Free" bordered={false}>
					<h4>$0/month</h4>
					<li>Unlimited users</li>
					<li>5,000 events/month</li>
					<li>3 months data history</li>
					<li>Community support</li>
					<p>
						<a href="https://app.posthog.com/signup">
						<Button type="primary">Start Now</Button>
						</a>
					</p>
		        </Card>
		      </Col>
		      <Col span={8}>
		        <Card title="Growth" bordered={false}>
		        	<h4>$25/user/month</h4>
					<li>All features of Free Tier</li>
					<li>500,000 events/month</li>
					<li>12 months data history</li>
					<li>Community support</li>
					<p>
						<a href="https://app.posthog.com/signup">
						<Button type="primary">Start Trial</Button>
						</a>
					</p>
		        </Card>
		      </Col>
		      <Col span={8}>
		        <Card title="Ultimate" bordered={false}>
		        	<h4>$ Custom</h4>
					<li>All features of Growth Tier</li>
					<li>Unlimited events</li>
					<li>Unlimited history</li>
					<li>Dedicated support</li>
					<p>
						<a href="mailto:sales@posthog.com">
						<Button type="primary">Contact</Button>
						</a>
					</p>
		        </Card>
		      </Col>

		    </Row>
		  </div>
	    </TabPane>
	  </Tabs>
    </Row>
    <Row className="spacer-row">

    </Row>
  </Layout>
)

export default PricingPage