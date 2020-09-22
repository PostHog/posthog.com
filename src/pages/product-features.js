import React from 'react'
import { Link } from 'gatsby'
import './features.css'
import '../components/Layout/Layout.css'
import Layout from '../components/Layout'
import Button from 'antd/lib/button'
import rays from '../images/rays.svg'
import featureFlagsIcon from '../images/feature-flags-icon.svg'
import selfHostedIcon from '../images/self-hosted-icon.svg'
import eventAutocaptureIcon from '../images/event-autocapture-icon.svg'
import trendsIcon from '../images/trends-icon.svg'
import funnelsIcon from '../images/funnels-icon.svg'
import retentionIcon from '../images/retention-icon.svg'
import asterisk from '../images/asterisk.svg'

function ProductFeatures() {
    return (
        <Layout>
            <div className="productFeaturesHead">
                <div className="productFeaturesHeadText">
                    <h1>Features</h1>
                    <p>
                        We know you’re wondering how PostHog compares to other analytics tools, so we have made it easy
                        for you to check out how featurefull we actually are.
                    </p>
                </div>
            </div>
            <div className="productFeaturesHeadTextMobile">
                <h1>Features</h1>
                <hr className="redLine" />
                <p>
                    We know you’re wondering how PostHog compares to other analytics tools, so we have made it easy for
                    you to check out how featurefull we actually are.
                </p>
            </div>
            <div className="featuresWrapper productFeatures">
                <div className="featuresNav">
                    <div className="threeFeatures">
                        <Link to="/product-features/self-hosted">
                            <img src={selfHostedIcon} />
                            <h4>Self hosted</h4>
                        </Link>
                        <Link to="/product-features/event-autocapture">
                            <img src={eventAutocaptureIcon} />
                            <h4>Event autocapture</h4>
                        </Link>
                        <Link to="/product-features/trends">
                            <img src={trendsIcon} />
                            <h4>Trends</h4>
                        </Link>
                    </div>
                    <div className="threeFeatures">
                        <Link to="/product-features/funnels">
                            <img src={funnelsIcon} />
                            <h4>Funnels</h4>
                        </Link>
                        <Link to="/product-features/retention">
                            <img src={retentionIcon} />
                            <h4>Retention</h4>
                        </Link>
                        <Link to="/product-features/feature-flags">
                            <img src={featureFlagsIcon} />
                            <h4>Feature flags</h4>
                        </Link>
                    </div>
                </div>
                <div className="productFeaturesTable">
                    <span class="table-borders features">
                        <table>
                            <thead>
                                <tr>
                                    <th>Feature</th>
                                    <th>PostHog</th>
                                    <th>Amplitude</th>
                                    <th>Mixpanel</th>
                                    <th>Heap</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Self Hosted</td>
                                    <td>✔</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Managed Hosting</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                </tr>
                                <tr>
                                    <td>Autocapture</td>
                                    <td>✔</td>
                                    <td></td>
                                    <td></td>
                                    <td>✔</td>
                                </tr>
                                <tr>
                                    <td>API</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                </tr>
                                <tr>
                                    <td>In-App Events Tracking</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                </tr>
                                <tr>
                                    <td>Conversion Tracking</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                </tr>
                                <tr>
                                    <td>Dashboard</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                </tr>
                                <tr>
                                    <td>Data Visualisation</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Cohort Analysis</td>
                                    <td>✔*</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                </tr>
                                <tr>
                                    <td>Funnel Analysis</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                </tr>
                                <tr>
                                    <td>Push Notifications</td>
                                    <td></td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                </tr>
                                <tr>
                                    <td>Retention Tracking</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                </tr>
                                <tr>
                                    <td>User Engagement Tracking</td>
                                    <td>✔*</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                </tr>
                                <tr>
                                    <td>Revenue Tracking</td>
                                    <td></td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                </tr>
                                <tr>
                                    <td>Data Import</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Data Export</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>External Integrations</td>
                                    <td>✔*</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                </tr>
                                <tr>
                                    <td>Keyword (UTM) Tracking</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                </tr>
                                <tr>
                                    <td>Email Link Tracking</td>
                                    <td></td>
                                    <td></td>
                                    <td>✔</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Multi-Site</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                </tr>
                                <tr>
                                    <td>Multi User</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                </tr>
                                <tr>
                                    <td>A/B Testing</td>
                                    <td></td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Direct SQL Access</td>
                                    <td>✔</td>
                                    <td></td>
                                    <td></td>
                                    <td>✔</td>
                                </tr>
                                <tr>
                                    <td>Full Data History</td>
                                    <td>✔</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </span>
                    <div className="featuresTableText">
                        <img src={asterisk} />
                        <p>
                            Full parity has not been achieved for this feature yet. You can follow our progress{' '}
                            <Link to="https://github.com/PostHog/posthog/projects/5">here</Link>.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductFeatures
