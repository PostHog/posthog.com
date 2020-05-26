import React from 'react'
import { graphql, Link } from "gatsby"
import Layout from '../components/Layout'
import { Row, Col, Button, Tabs, Card } from 'antd';
import SEO from '../components/seo';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const PricingPage = () => (
  <Layout>
  	<SEO
      title='PostHog Pricing'
      description='Find out how much it costs to use PostHog'
    />
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
	<h2>Feature comparison</h2>
	<table>
<thead>
<tr>
<th align="center">Feature</th>
<th align="center">PostHog</th>
<th align="center">Amplitude</th>
<th align="center">Mixpanel</th>
<th align="center">Heap</th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">Self Hosted</td>
<td align="center">✔</td>
<td align="center"></td>
<td align="center"></td>
<td align="center"></td>
</tr>
<tr>
<td align="center">Managed Hosting</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
</tr>
<tr>
<td align="center">Autocapture</td>
<td align="center">✔</td>
<td align="center"></td>
<td align="center"></td>
<td align="center">✔</td>
</tr>
<tr>
<td align="center">API</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
</tr>
<tr>
<td align="center">In-App Events Tracking</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
</tr>
<tr>
<td align="center">Conversion Tracking</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
</tr>
<tr>
<td align="center">Dashboard</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
</tr>
<tr>
<td align="center">Data Visualisation</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center"></td>
</tr>
<tr>
<td align="center">Cohort Analysis</td>
<td align="center">✔*</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
</tr>
<tr>
<td align="center">Funnel Analysis</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
</tr>
<tr>
<td align="center">Push Notifications</td>
<td align="center"></td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
</tr>
<tr>
<td align="center">Retention Tracking</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
</tr>
<tr>
<td align="center">User Engagement Tracking</td>
<td align="center">✔*</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
</tr>
<tr>
<td align="center">Revenue Tracking</td>
<td align="center"></td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
</tr>
<tr>
<td align="center">Data Import</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center"></td>
</tr>
<tr>
<td align="center">Data Export</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center"></td>
</tr>
<tr>
<td align="center">External Integrations</td>
<td align="center">✔*</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
</tr>
<tr>
<td align="center">Keyword (UTM) Tracking</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
</tr>
<tr>
<td align="center">Email Link Tracking</td>
<td align="center"></td>
<td align="center"></td>
<td align="center">✔</td>
<td align="center"></td>
</tr>
<tr>
<td align="center">Multi-Site</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
</tr>
<tr>
<td align="center">Multi User</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center">✔</td>
</tr>
<tr>
<td align="center">A/B Testing</td>
<td align="center"></td>
<td align="center">✔</td>
<td align="center">✔</td>
<td align="center"></td>
</tr>
<tr>
<td align="center">Direct SQL Access</td>
<td align="center">✔</td>
<td align="center"></td>
<td align="center"></td>
<td align="center">✔</td>
</tr>
<tr>
<td align="center">Full Data History</td>
<td align="center">✔</td>
<td align="center"></td>
<td align="center"></td>
<td align="center"></td>
</tr>
</tbody>
</table>
* These features are still in active development. <a href='https://github.com/posthog/posthog/issues'>See our repository to follow along.</a>
  </Layout>
)

export default PricingPage