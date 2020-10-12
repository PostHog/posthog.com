import React from 'react'
import { Link } from 'gatsby'
import './styles/features.css'
import '../components/Layout/Layout.css'
import Layout from '../components/Layout'
import featureFlagsIcon from '../images/feature-flags-icon.svg'
import selfHostedIcon from '../images/self-hosted-icon.svg'
import eventAutocaptureIcon from '../images/event-autocapture-icon.svg'
import trendsIcon from '../images/trends-icon.svg'
import funnelsIcon from '../images/funnels-icon.svg'
import retentionIcon from '../images/retention-icon.svg'
import asterisk from '../images/asterisk.svg'
import PageHeader from '../components/PageHeader'

function ProductFeatures() {
    return (
        <Layout>
            <PageHeader
                title="Features"
                tagline="We know you’re wondering how PostHog compares to other analytics tools, so we have made it easy
                for you to check out how feature-rich we actually are."
                styleKey="productFeatures"
                bgColor="navy"
            />
            <div className="features-wrapper productFeatures blue">
                <div className="featuresWrapper productFeatures featuresNav">
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
                </div>
                <div className="productFeaturesTable bg-navy">
                    <br />
                    <br />
                    <h2>Comparison</h2>

                    <div className="comparisonRow">
                        <div className="comparison posthogComparison">
                            <p>PostHog</p>
                        </div>
                        <div className="comparison amplitudeComparison">
                            <p>Amplitude</p>
                        </div>
                        <div className="comparison mixpanelComparison">
                            <p>Mixpanel</p>
                        </div>
                        <div className="comparison heapComparison">
                            <p>Heap</p>
                        </div>
                    </div>
                    <div className="comparisonRow">
                        <div className="comparisonSM posthogComparison">
                            <p>PH</p>
                        </div>
                        <div className="comparisonSM amplitudeComparison">
                            <p>A</p>
                        </div>
                        <div className="comparisonSM mixpanelComparison">
                            <p>MP</p>
                        </div>
                        <div className="comparisonSM heapComparison">
                            <p>H</p>
                        </div>
                    </div>

                    <span className="table-borders features">
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

                    <div className="comparisonTableMobile">
                        <div className="productFeaturesTableRow">
                            <table className="productFeaturesTable">
                                <thead className="productFeaturesTable">
                                    <th colSpan="4">Self Hosted</th>
                                </thead>
                                <tbody className="productFeaturesTable">
                                    <tr>
                                        <td>PH</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="productFeaturesTable">
                                <thead className="productFeaturesTable">
                                    <th colSpan="4">Managed Hosting</th>
                                </thead>
                                <tbody className="productFeaturesTable">
                                    <tr>
                                        <td>PH</td>
                                        <td>A</td>
                                        <td>MP</td>
                                        <td>H</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="productFeaturesTable">
                                <thead className="productFeaturesTable">
                                    <th colSpan="4">Heatmap Feature</th>
                                </thead>
                                <tbody className="productFeaturesTable">
                                    <tr>
                                        <td>PH</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="productFeaturesTableRow">
                            <table className="productFeaturesTable">
                                <thead className="productFeaturesTable">
                                    <th colSpan="4">Autocapture</th>
                                </thead>
                                <tbody className="productFeaturesTable">
                                    <tr>
                                        <td>PH</td>
                                        <td></td>
                                        <td></td>
                                        <td>H</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="productFeaturesTable">
                                <thead className="productFeaturesTable">
                                    <th colSpan="4">API</th>
                                </thead>
                                <tbody className="productFeaturesTable">
                                    <tr>
                                        <td>PH</td>
                                        <td>A</td>
                                        <td>MP</td>
                                        <td>H</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="productFeaturesTable">
                                <thead className="productFeaturesTable">
                                    <th colSpan="4">In-App Events Tracking</th>
                                </thead>
                                <tbody className="productFeaturesTable">
                                    <tr>
                                        <td>PH</td>
                                        <td>A</td>
                                        <td>MP</td>
                                        <td>H</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="productFeaturesTableRow">
                            <table className="productFeaturesTable">
                                <thead className="productFeaturesTable">
                                    <th colSpan="4">Conversion Tracking</th>
                                </thead>
                                <tbody className="productFeaturesTable">
                                    <tr>
                                        <td>PH</td>
                                        <td>A</td>
                                        <td>MP</td>
                                        <td>H</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="productFeaturesTable">
                                <thead className="productFeaturesTable">
                                    <th colSpan="4">Dashboard</th>
                                </thead>
                                <tbody className="productFeaturesTable">
                                    <tr>
                                        <td>PH</td>
                                        <td>A</td>
                                        <td>MP</td>
                                        <td>H</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="productFeaturesTable">
                                <thead className="productFeaturesTable">
                                    <th colSpan="4">Data Visualization</th>
                                </thead>
                                <tbody className="productFeaturesTable">
                                    <tr>
                                        <td>PH*</td>
                                        <td>A</td>
                                        <td>MP</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="productFeaturesTableRow">
                            <table className="productFeaturesTable">
                                <thead className="productFeaturesTable">
                                    <th colSpan="4">Cohort Analysis</th>
                                </thead>
                                <tbody className="productFeaturesTable">
                                    <tr>
                                        <td>PH</td>
                                        <td>A</td>
                                        <td>MP</td>
                                        <td>H</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="productFeaturesTable">
                                <thead className="productFeaturesTable">
                                    <th colSpan="4">Funnel Analysis</th>
                                </thead>
                                <tbody className="productFeaturesTable">
                                    <tr>
                                        <td>PH</td>
                                        <td>A</td>
                                        <td>MP</td>
                                        <td>H</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="productFeaturesTable">
                                <thead className="productFeaturesTable">
                                    <th colSpan="4">Push Notifications</th>
                                </thead>
                                <tbody className="productFeaturesTable">
                                    <tr>
                                        <td></td>
                                        <td>A</td>
                                        <td>MP</td>
                                        <td>H</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="productFeaturesTableRow">
                            <table className="productFeaturesTable">
                                <thead className="productFeaturesTable">
                                    <th colSpan="4">Retention Tracking</th>
                                </thead>
                                <tbody className="productFeaturesTable">
                                    <tr>
                                        <td>PH*</td>
                                        <td>A</td>
                                        <td>MP</td>
                                        <td>H</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="productFeaturesTable">
                                <thead className="productFeaturesTable">
                                    <th colSpan="4">User Engagement Tracking</th>
                                </thead>
                                <tbody className="productFeaturesTable">
                                    <tr>
                                        <td>PH</td>
                                        <td>A</td>
                                        <td>MP</td>
                                        <td>H</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="productFeaturesTable">
                                <thead className="productFeaturesTable">
                                    <th colSpan="4">Revenue Tracking</th>
                                </thead>
                                <tbody className="productFeaturesTable">
                                    <tr>
                                        <td></td>
                                        <td>A</td>
                                        <td>MP</td>
                                        <td>H</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="productFeaturesTableRow">
                            <table className="productFeaturesTable">
                                <thead className="productFeaturesTable">
                                    <th colSpan="4">Data Import</th>
                                </thead>
                                <tbody className="productFeaturesTable">
                                    <tr>
                                        <td>PH</td>
                                        <td>A</td>
                                        <td>MP</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="productFeaturesTable">
                                <thead className="productFeaturesTable">
                                    <th colSpan="4">Data Export</th>
                                </thead>
                                <tbody className="productFeaturesTable">
                                    <tr>
                                        <td>PH*</td>
                                        <td>A</td>
                                        <td>MP</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="productFeaturesTable">
                                <thead className="productFeaturesTable">
                                    <th colSpan="4">External Integrations</th>
                                </thead>
                                <tbody className="productFeaturesTable">
                                    <tr>
                                        <td>PH</td>
                                        <td>A</td>
                                        <td>MP</td>
                                        <td>H</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="productFeaturesTableRow">
                            <table className="productFeaturesTable">
                                <thead className="productFeaturesTable">
                                    <th colSpan="4">Keyword (UTM) Tracking</th>
                                </thead>
                                <tbody className="productFeaturesTable">
                                    <tr>
                                        <td>PH</td>
                                        <td>A</td>
                                        <td>MP</td>
                                        <td>H</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="productFeaturesTable">
                                <thead className="productFeaturesTable">
                                    <th colSpan="4">Email Link Tracking</th>
                                </thead>
                                <tbody className="productFeaturesTable">
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>MP</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="productFeaturesTable">
                                <thead className="productFeaturesTable">
                                    <th colSpan="4">Multi-Site</th>
                                </thead>
                                <tbody className="productFeaturesTable">
                                    <tr>
                                        <td>PH</td>
                                        <td>A</td>
                                        <td>MP</td>
                                        <td>H</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="productFeaturesTableRow">
                            <table className="productFeaturesTable">
                                <thead className="productFeaturesTable">
                                    <th colSpan="4">Multi-User</th>
                                </thead>
                                <tbody className="productFeaturesTable">
                                    <tr>
                                        <td>PH</td>
                                        <td>A</td>
                                        <td>MP</td>
                                        <td>H</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="productFeaturesTable">
                                <thead className="productFeaturesTable">
                                    <th colSpan="4">A/B Testing</th>
                                </thead>
                                <tbody className="productFeaturesTable">
                                    <tr>
                                        <td></td>
                                        <td>A</td>
                                        <td>MP</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="productFeaturesTable">
                                <thead className="productFeaturesTable">
                                    <th colSpan="4">Direct SQL Access</th>
                                </thead>
                                <tbody className="productFeaturesTable">
                                    <tr>
                                        <td>PH</td>
                                        <td></td>
                                        <td></td>
                                        <td>H</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="productFeaturesTableRow">
                            <table className="productFeaturesTable">
                                <thead className="productFeaturesTable">
                                    <th colSpan="4">Full Data History</th>
                                </thead>
                                <tbody className="productFeaturesTable">
                                    <tr>
                                        <td>PH</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="featuresTableText">
                <img src={asterisk} />
                <p>
                    Full parity has not been achieved for this feature yet. You can follow our progress{' '}
                    <Link to="https://github.com/PostHog/posthog/projects/5">here</Link>.
                </p>
            </div>
        </Layout>
    )
}

export default ProductFeatures
