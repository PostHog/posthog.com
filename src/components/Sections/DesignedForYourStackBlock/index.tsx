import React from 'react'
import { Link } from 'gatsby'
const stackApi = 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/stack-api.svg'
const stackGo = 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/stack-go.svg'
const stackJavascript = 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/stack-javascript.svg'
const stackGatsby = 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/stack-gatsby.svg'
const stackRuby = 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/stack-ruby.svg'
const stackPhp = 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/stack-php.svg'
const stackNode = 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/stack-node.svg'
const stackIos = 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/stack-ios.svg'
const stackPython = 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/stack-python.svg'
const stackAndroid = 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/stack-android.svg'
const shelf2 = 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/shelf-2.svg'
const shelf4 = 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/shelf-4.svg'

export const DesignedForYourStackBlock = () => {
    return (
        <div className="designed4StackWrapper">
            <div className="designed4StackRow row-">
                <h2 className="gosha centered">Designed for your stack</h2>
            </div>
            <div className="yourStackWrapper">
                <div className="yourStackLogosRow row">
                    <div className="yourStackLogos">
                        <Link to="docs/integrate/server/python">
                            <img alt="Python" className="imageShow" loading="lazy" src={stackPython} />
                        </Link>
                    </div>
                    <div className="yourStackLogos">
                        <Link to="docs/integrate/server/php">
                            <img alt="PHP" className="imageShow" loading="lazy" src={stackPhp} />
                        </Link>
                    </div>
                    <div className="yourStackLogos">
                        <Link to="/docs/integrate/client/android">
                            <img alt="Android" className="imageShow" loading="lazy" src={stackAndroid} />
                        </Link>
                    </div>
                    <div className="yourStackLogos">
                        <Link to="/docs/integrate/client/ios">
                            <img alt="iOS" className="imageShow" loading="lazy" src={stackIos} />
                        </Link>
                    </div>
                    <div className="yourStackLogos">
                        <Link to="docs/integrate/server/node">
                            <img alt="Node" className="imageShow" loading="lazy" src={stackNode} />
                        </Link>
                    </div>
                </div>
                <div className="yourStackShelfRow row">
                    <div className="yourStackShelf">
                        <img alt="shelf-2" className="imageShow shelf" loading="lazy" src={shelf2} />
                    </div>
                </div>
                <div className="yourStackLogosRow row">
                    <div className="yourStackLogos">
                        <Link to="docs/integrate/server/ruby">
                            <img alt="Ruby" className="imageShow" loading="lazy" src={stackRuby} />
                        </Link>
                    </div>
                    <div className="yourStackLogos">
                        <Link to="/docs/libraries/gatsby">
                            <img alt="Gatsby" className="imageShow" loading="lazy" src={stackGatsby} />
                        </Link>
                    </div>
                    <div className="yourStackLogos">
                        <Link to="/docs/integrate/client/js">
                            <img alt="Javascript" className="imageShow" loading="lazy" src={stackJavascript} />
                        </Link>
                    </div>
                    <div className="yourStackLogos">
                        <Link to="docs/integrate/server/go">
                            <img alt="Go" className="imageShow" loading="lazy" src={stackGo} />
                        </Link>
                    </div>
                    <div className="yourStackLogos">
                        <Link to="/docs/api/overview">
                            <img alt="API" className="imageShow" loading="lazy" src={stackApi} />
                        </Link>
                    </div>
                </div>
                <div className="yourStackShelfRow row">
                    <div className="yourStackShelf">
                        <img alt="shelf-4" className="imageShow shelf" loading="lazy" src={shelf4} />
                    </div>
                </div>
            </div>
        </div>
    )
}
