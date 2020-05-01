import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Row, Col } from 'antd'

class Footer extends Component {

  render() {
    
    return (
      <div
        style={{
          background: 'black',
          color:'white',
          position: 'relative',
          left: 0,
          width: '100%',
          top: '100%',
          paddingTop: 20,
          paddingBottom: 80,
        }}
      >
        <Row gutter={[24, 8]}>
        <Col span={6} className="gutter-row" align="middle">
        </Col>
        <Col span={16} className="gutter-row">

          <Col span={4} className="gutter-row">
          	<span className="footer-links-header">Why PostHog</span>
      		<ul className="footer-links">
      			<li>Product</li>
      			<li>Features</li>
      			<li>Pricing</li>
      			<li>Services</li>
      			<li>FAQ</li>
      		</ul>
          </Col>
          <Col span={4} className="gutter-row">
          	<span className="footer-links-header">Resources</span>
      		<ul className="footer-links">
      			<li>Quick start</li>
      			<li><Link to="/docs">Docs</Link></li>
      			<li><Link to="/blog">Blog</Link></li>
      			<li>Newsletter</li>
      		</ul>
          </Col>
          <Col span={4} className="gutter-row">
          	<span className="footer-links-header">Community</span>
      		<ul className="footer-links">
      			<li><a href="https://github.com/PostHog/posthog/graphs/contributors">Contributors</a></li>
      			<li><a href="https://github.com/posthog/posthog">Source code</a></li>
      			<li><a href="https://github.com/posthog">Explore repositories</a></li>
      			<li>Roadmap</li>
      			<li><a href="https://github.com/PostHog/posthog/blob/master/CONTRIBUTING.md">Contribute</a></li>
      			<li><a href="https://github.com/PostHog/posthog/issues">Issues</a></li>
      		</ul>
          </Col>
          <Col span={4} className="gutter-row">
          	<span className="footer-links-header">Support</span>
      		<ul className="footer-links">
      			<li>Get help</li>
      			<li>Contact sales</li>
      			<li>Contact support</li>
      			<li>Status</li>
      		</ul>
          </Col>
          <Col span={4} className="gutter-row">
          	<span className="footer-links-header">Company</span>
      		<ul className="footer-links">
      			<li><Link to="/handbook/story">About</Link></li>
      			<li><Link to="/handbook">Handbook</Link></li>
      			<li><Link to="/careers">Careers</Link></li>
      			<li><Link to="/handbook/investors">Investors</Link></li>
      			<li>Media</li>
      		</ul>
          </Col>
        <Col span={4} className="gutter-row" align="middle">
        </Col>
        </Col>
      </Row>
      </div>
    )
  }
}

export default (Footer);
