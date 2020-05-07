import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Row, Col } from 'antd'

const FooterListItem = props => (
  <div className="footer-li">
    {props.to ? (
      <Row>
        <Link to={props.to}>{props.children}</Link>
      </Row>
    ) : (
      props.children
    )}
  </div>
)

class Footer extends Component {
  render() {
    return (
      <div className="footer-universal">
        <Row gutter={[24, 8]}>

          <Col span={6} className="gutter-row" align="middle"></Col>
          <Col span={16} className="gutter-row">
            <Col span={4} className="gutter-row">
              <span className="footer-links-header">Why PostHog</span>
              <FooterListItem to="/product-features">Features</FooterListItem>
              <FooterListItem to="/pricing">Pricing</FooterListItem>
              <FooterListItem to="/services">Services</FooterListItem>
              <FooterListItem to="/faq">FAQ</FooterListItem>
            </Col>
            <Col span={4} className="gutter-row">
              <span className="footer-links-header">Resources</span>
              <FooterListItem to="/docs/deployment">Quick Start</FooterListItem>
              <FooterListItem to="/docs">Docs</FooterListItem>
              <FooterListItem to="/blog">Blog</FooterListItem>
              <FooterListItem to="/newsletter">Newsletter</FooterListItem>
            </Col>
            <Col span={4} className="gutter-row">
              <span className="footer-links-header">Community</span>
              <FooterListItem>
                <a href="https://github.com/PostHog/posthog/graphs/contributors">
                  Contributors
                </a>
              </FooterListItem>
              <FooterListItem>
                <a href="https://github.com/posthog/posthog">Source code</a>
              </FooterListItem>
              <FooterListItem>
                <a href="https://github.com/posthog">Explore repositories</a>
              </FooterListItem>
              <FooterListItem to="/handbook/roadmap">Roadmap</FooterListItem>
              <FooterListItem>
                <a href="https://github.com/PostHog/posthog/blob/master/CONTRIBUTING.md">
                  Contribute
                </a>
              </FooterListItem>
              <FooterListItem>
                <a href="https://github.com/PostHog/posthog/issues">Issues</a>
              </FooterListItem>
            </Col>
            <Col span={4} className="gutter-row">
              <span className="footer-links-header">Support</span>
              <FooterListItem to="/support">Contact support</FooterListItem>
              <FooterListItem>Contact sales</FooterListItem>
              <FooterListItem to="/status">Status</FooterListItem>
            </Col>
            <Col span={4} className="gutter-row">
              <span className="footer-links-header">Company</span>
              <FooterListItem to="/handbook/story">About</FooterListItem>
              <FooterListItem to="/handbook">Handbook</FooterListItem>
              <FooterListItem to="/careers">Careers</FooterListItem>
              <FooterListItem to="/handbook/investors">
                Investors
              </FooterListItem>
              <FooterListItem>Media</FooterListItem>
              <FooterListItem to="/terms">Terms</FooterListItem>
            </Col>
            <Col span={4} className="gutter-row" align="middle"></Col>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Footer
