import { Button, Col, Row } from 'antd'
import React from 'react'
import imgBuilding from '../../images/building.svg'
import imgCloud from '../../images/cloud.svg'
import imgScaleFree from '../../images/plan-enterprise1.svg'
import imgEnterprise2 from '../../images/plan-enterprise2.svg'
import imgOpenSource from '../../images/plan-open-source.svg'

export const PlanComparisonTable = () => {
    return (
        <Row type="flex" gutter={[24, 24]} style={{ paddingLeft: '16px' }}>
            <table>
                <tr>
                    <th>
                        <img src={imgCloud} alt="" style={{ paddingRight: 0 }} />
                        Cloud
                    </th>
                    <th>
                        <img src={imgOpenSource} alt="" width="50px" />
                        Self Hosted (Open Source)
                    </th>
                    <th>
                        <img src={imgScaleFree} alt="" width="50px" />
                        Self Hosted (Scale Free)
                    </th>
                    <th>
                        <img src={imgEnterprise2} alt="" width="50px" />
                        Self Hosted (Scale)
                    </th>
                </tr>
                <tr>
                    <td colSpan={3}>
                        <strong>Deployment</strong>
                    </td>
                </tr>
                <tr>
                    <td>On PostHog's infrastructure</td>
                    <td>On your infrastructure</td>
                    <td>On your infrastructure</td>
                    <td>On your infrastructure</td>
                </tr>
                <tr>
                    <td>Unlimited team size</td>
                    <td>Unlimited team size</td>
                    <td>Max team of 3</td>
                    <td>Unlimited team size</td>
                </tr>
                <tr>
                    <td>Constant price</td>
                    <td>Free but doesn't scale</td>
                    <td>Free and scales</td>
                    <td>Cheaper at scale</td>
                </tr>
                <tr>
                    <td>Scales to millions+ of users</td>
                    <td>Scales to a few thousand users</td>
                    <td>Scales to ~1 million users</td>
                    <td>Scales to millions+ of users</td>
                </tr>
                <tr>
                    <td>Managed by PostHog</td>
                    <td>Managed by you</td>
                    <td>Managed by you</td>
                    <td>We help you manage</td>
                </tr>
                <tr>
                    <td>Instant to deploy</td>
                    <td>Instant to deploy</td>
                    <td>1-3 days to deploy</td>
                    <td>1-3 days to deploy</td>
                </tr>

                <tr>
                    <td>Multiple Projects</td>
                    <td>1 Project</td>
                    <td>1 Project</td>
                    <td>Multiple Projects</td>
                </tr>

                <tr>
                    <td>User data leaves your infrastructure</td>
                    <td>No user data leaves your infrastructure</td>
                    <td>No user data leaves your infrastructure</td>
                    <td>No user data leaves your infrastructure</td>
                </tr>

                <tr>
                    <td colSpan={3}>
                        <strong>Building on PostHog</strong>
                    </td>
                </tr>
                <tr>
                    <td>10+ SDKs for event capture</td>
                    <td>10+ SDKs for event capture</td>
                    <td>10+ SDKs for event capture</td>
                    <td>10+ SDKs for event capture</td>
                </tr>
                <tr>
                    <td>Plugins</td>
                    <td>Plugins</td>
                    <td>Plugins</td>
                    <td>Plugins</td>
                </tr>
                <tr>
                    <td>Data lake export</td>
                    <td>Data lake export</td>
                    <td>Data lake export</td>
                    <td>Data lake export</td>
                </tr>
                <tr>
                    <td>CSV export</td>
                    <td>CSV export</td>
                    <td>CSV export</td>
                    <td>CSV export</td>
                </tr>
                <tr>
                    <td>API access</td>
                    <td>Database and API access</td>
                    <td>Database and API access</td>
                    <td>Database and API access</td>
                </tr>

                <tr>
                    <td colSpan={3}>
                        <strong>Features</strong>
                    </td>
                </tr>
                <tr>
                    <td>Event data pipeline</td>
                    <td>Event data pipeline</td>
                    <td>Event data pipeline</td>
                    <td>Event data pipeline</td>
                </tr>
                <tr>
                    <td>Event autocapture</td>
                    <td>Event autocapture</td>
                    <td>Event autocapture</td>
                    <td>Event autocapture</td>
                </tr>
                <tr>
                    <td>Trends</td>
                    <td>Trends</td>
                    <td>Trends</td>
                    <td>Trends</td>
                </tr>
                <tr>
                    <td>Funnels</td>
                    <td>Funnels</td>
                    <td>Funnels</td>
                    <td>Funnels</td>
                </tr>
                <tr>
                    <td>Retention</td>
                    <td>Retention</td>
                    <td>Retention</td>
                    <td>Retention</td>
                </tr>
                <tr>
                    <td>Session recording</td>
                    <td>Session recording</td>
                    <td>Session recording</td>
                    <td>Session recording</td>
                </tr>
                <tr>
                    <td>Heatmaps</td>
                    <td>Heatmaps</td>
                    <td>Heatmaps</td>
                    <td>Heatmaps</td>
                </tr>
                <tr>
                    <td>7 year data retention</td>
                    <td>Unlimited data retention</td>
                    <td>Unlimited data retention</td>
                    <td>Unlimited data retention</td>
                </tr>

                <tr>
                    <td colSpan={3}>
                        <strong>Collaboration</strong>
                    </td>
                </tr>

                <tr>
                    <td>Dashboard tagging</td>
                    <td>No tagging</td>
                    <td>No tagging</td>
                    <td>Dashboard tagging</td>
                </tr>

                <tr>
                    <td>Multiple projects</td>
                    <td>1 project</td>
                    <td>1 project</td>
                    <td>Multiple projects</td>
                </tr>

                <tr>
                    <td colSpan={3}>
                        <strong>Your team</strong>
                    </td>
                </tr>
                <tr>
                    <td>Unlimited users</td>
                    <td>Unlimited users</td>
                    <td>3 users</td>
                    <td>Unlimited users</td>
                </tr>
                <tr>
                    <td>No private projects</td>
                    <td>No private projects</td>
                    <td>No private projects</td>
                    <td>Private projects</td>
                </tr>
                <tr>
                    <td>SSO</td>
                    <td>No SSO</td>
                    <td>No SSO</td>
                    <td>SSO</td>
                </tr>
                <tr>
                    <td>No SAML</td>
                    <td>No SAML</td>
                    <td>No SAML</td>
                    <td>SAML</td>
                </tr>
                <tr>
                    <td colSpan={3}>
                        <strong>Support</strong>
                    </td>
                </tr>
                <tr>
                    <td>Dedicated Slack Channel</td>
                    <td>Community Slack</td>
                    <td>Community Slack</td>
                    <td>Dedicated Slack Channel</td>
                </tr>
                <tr>
                    <td>Email support</td>
                    <td>No email support</td>
                    <td>No email support</td>
                    <td>Email support</td>
                </tr>
                <tr>
                    <td>Account Manager</td>
                    <td>No account management</td>
                    <td>No account management</td>
                    <td>Account Manager</td>
                </tr>
            </table>
            <Col md={12} sm={24}>
                <div className="p-full-height">
                    <h4 className="p-text-primary p-title-with-icon">
                        <img src={imgCloud} alt="" style={{ paddingRight: 0 }} />
                        Cloud
                    </h4>
                    <ul className="p-comparison-list max-w-sm text-left mx-auto">
                        <li>Immediate start</li>
                        <li>
                            Recommended if you want to get started <b>right now</b>. Start capturing events in under 5
                            minutes.
                        </li>
                        <li>
                            You don’t own or want to own your own technical infrastructure.
                            <b> We’ll handle everything for you.</b>
                        </li>
                        <li>You want an out-of-the-box secure solution.</li>
                        <li>You want to get automatic updates with all the latest features.</li>
                    </ul>
                    <div className="p-comparison-btn">
                        <a href="https://app.posthog.com/signup">
                            <Button type="primary" size="large">
                                Start free
                            </Button>
                        </a>
                    </div>
                </div>
            </Col>
            <Col md={12} sm={24}>
                <div className="p-full-height">
                    <h4 className="p-text-primary p-title-with-icon">
                        <img src={imgBuilding} alt="" /> Self Hosted Scale
                    </h4>
                    <ul className="p-comparison-list max-w-sm text-left mx-auto">
                        <li>Recommended if you have large volumes of events or users ({'>10k monthly users'}).</li>
                        <li>You don't want user data to leave your infrastructure (e.g. HIPAA, SOC2).</li>
                        <li>You need full access to the production instance.</li>
                        <li>
                            You are concerned with browser privacy features, ad blockers, or third-party cookie
                            blockers.
                        </li>
                        <li>You want to export data to your data lake.</li>
                    </ul>
                    <div className="p-comparison-btn">
                        <Button type="primary" size="large" href="/signup/self-host/get-in-touch#contact">
                            Contact sales
                        </Button>
                    </div>
                </div>
            </Col>
        </Row>
    )
}
