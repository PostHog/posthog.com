import React from 'React'
import { Link } from 'gatsby'
import featureFlagsIcon from '../../images/feature-flags-icon.svg'
import selfHostedIcon from '../../images/self-hosted-icon.svg'
import eventAutocaptureIcon from '../../images/event-autocapture-icon.svg'
import trendsIcon from '../../images/trends-icon.svg'
import funnelsIcon from '../../images/funnels-icon.svg'
import retentionIcon from '../../images/retention-icon.svg'
import './features-nav.scss'

export const FeaturesNav = () => {
    return (
        <div className="features-nav-container">
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
    )
}
