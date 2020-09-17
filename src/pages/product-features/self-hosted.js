import React from 'react'
import { Link } from 'gatsby'
import '../features.css'
import '../../components/Layout/Layout.css'
import Layout from '../../components/Layout'
import Button from 'antd/lib/button'


function ProductFeatures() {
    return (
        <Layout>
            <div className="featuresWrapper selfHosted">
                <div className="head blue selfHosted">
                    <div className="headContents">
                        <Link to="/product-features" className="headNav top">
                            <Button icon="left" />
                            <p>Back to Features</p>
                        </Link>
                        <h1>Self Hosted</h1>
                        <h3>Powerful analytics on your own infrastructure, with all the features your team needs.</h3>
                        <Link to="/product-features" className="headNav bottom">
                            <p>Next Feature</p>
                            <Button icon="right" />
                        </Link>
                    </div>
                    <div className="headImg selfHosted"/>
                </div>
                <div className="row01 row">
                    <h2 className="number">01</h2>
                    <div className="rowContents row01">
                        <h2>Take control of your data</h2>
                        <p>When you self-host, your data is all yours. This means your users’ data is not sent to any third-party, not even PostHog. The privacy of your users is preserved, and it is easier to comply with legislation such as GDPR and cookie laws.</p>
                    </div>
                    <div className="rowImg row01"/>
                </div>
                <div className="row02 row">
                    <div className="rowImg row02"/>
                    <h2 className="number">02</h2>
                    <div className="rowContents row02">
                        <h2>Deploy in your own way</h2>
                        <p>We strive to make our deployment process as simple as possible. As a result, we offer a wide variety of ways to deploy PostHog, so you can pick the one that suits you best. Additionally, it’s up to you where you deploy it! This gives you more freedom and prevents PostHog from disrupting your tech stack.</p>
                    </div>
                </div>
                <div className="row03 row">
                    <h2 className="number">03</h2>
                    <div className="rowContents row03">
                        <h2>Perform powerful analytics your entire team can use</h2>
                        <p>PostHog provides self-serve analytics for any Engineer or Product Manager. The interface is simple for any user - no data analysts needed. With PostHog, you have all the benefits of self-building plus the support of a world-class team ensuring you have all the features you need. In addition, by being open source, PostHog ensures that our tool is secure and battle-tested.</p>
                    </div>
                    <div className="rowImg row03"/>
                </div>
            </div>
                
               
        </Layout>
    )
}

export default ProductFeatures;