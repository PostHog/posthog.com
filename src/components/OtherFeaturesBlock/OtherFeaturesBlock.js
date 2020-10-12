import React from 'react'
import { Link } from 'gatsby'
import featuresPageData from './features'
import styles from './other-features.module.css'

const OtherFeaturesBlock = ({ currentPageKey }) => {
    const pagesToDisplay = featuresPageData.filter((page) => page.key !== currentPageKey)
    return (
        <div className={styles.wrapper}>
            <h2>Other features</h2>
            <div className={styles.features}>
                <div className={styles.twoFeatures}>
                    <Link className={styles.featureLink} to={pagesToDisplay[0].href}>
                        <img className={styles.featureImage} src={pagesToDisplay[0].icon} />
                        <h4 className={styles.header4}>{pagesToDisplay[0].title}</h4>
                    </Link>
                    <Link className={styles.featureLink} to={pagesToDisplay[1].href}>
                        <img className={styles.featureImage} src={pagesToDisplay[1].icon} />
                        <h4 className={styles.header4}>{pagesToDisplay[1].title}</h4>
                    </Link>
                </div>
                <div className={styles.twoFeatures}>
                    <Link className={styles.featureLink} to={pagesToDisplay[2].href}>
                        <img className={styles.featureImage} src={pagesToDisplay[2].icon} />
                        <h4 className={styles.header4}>{pagesToDisplay[2].title}</h4>
                    </Link>
                    <Link className={styles.featureLink} to={pagesToDisplay[3].href}>
                        <img className={styles.featureImage} src={pagesToDisplay[3].icon} />
                        <h4 className={styles.header4}>{pagesToDisplay[3].title}</h4>
                    </Link>
                </div>
                <Link className={styles.featureLink} to={pagesToDisplay[4].href}>
                    <img className={styles.featureImage} src={pagesToDisplay[4].icon} />
                    <h4 className={styles.header4}>{pagesToDisplay[4].title}</h4>
                </Link>
            </div>
        </div>
    )
}

export default OtherFeaturesBlock
