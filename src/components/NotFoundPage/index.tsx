import CloudinaryImage from 'components/CloudinaryImage'
import React, { useEffect, useState } from 'react'
import usePostHog from '../../hooks/usePostHog'
import { CallToAction } from '../CallToAction'
import Layout from '../Layout'
import Lottie from 'react-lottie'
import { StaticImage } from 'gatsby-plugin-image'
import SearchBox from 'components/Search/SearchBox'

export default function NotFoundPage(): JSX.Element {
    const posthog = usePostHog()
    const [hogData, setHogData] = useState<any | null>(null)

    useEffect(() => {
        import('../../../static/lotties/astrohog.json').then((data) => setHogData(data.default))
        posthog?.capture('page_404')
    }, [])

    return (
        <Layout className="not-found-page-container">
            <div className="bg-black -mt-1">
                <div className="max-w-6xl px-4 lg:px-8 xl:px-0 mx-auto py-24 text-white relative overflow-hidden">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/galaxy-1.png"
                        alt="The stars in the sky"
                        placeholder="blurred"
                        className="!absolute top-0 -left-24 max-h-full"
                    />
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/galaxy-2.png"
                        alt="More stars in the sky"
                        placeholder="blurred"
                        className="!absolute top-0 -right-8 max-h-full"
                    />

                    <div className="sm:!absolute right-0 -mt-12 sm:mt-0 sm:-right-12 lg:-right-24 bottom-0 md:-bottom-28 h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] lg:h-[600px] lg:w-[600px]">
                        {hogData ? (
                            <Lottie
                                options={{
                                    loop: true,
                                    autoplay: true,
                                    animationData: hogData,
                                }}
                            />
                        ) : (
                            <img
                                src="/images/astrohog.gif"
                                alt="Space hog"
                                className="w-[250px] sm:w-[500px] rotate-12"
                            />
                        )}
                    </div>

                    <div className="text-[15px] opacity-75 -mt-12 sm:mt-0 mb-4">
                        <strong>404:</strong> <s>Hog</s> Page not found
                    </div>
                    <h2 className="text-5xl md:text-7xl text-white mb-0">Lost in space</h2>

                    <div className="relative sm:w-1/2 md:w-3/4">
                        <div className="py-8">
                            <h3 className="text-2xl mb-4 text-yellow">Try a search to beam back to PostHog.com:</h3>
                            <SearchBox placeholder="Search..." location="404" />
                            <p className="text-sm pt-2 opacity-75 max-w-lg">
                                Searches: Docs, API, Tutorials, Blog, Community Questions, and Company Handbook –{' '}
                                <em>and it's actually pretty good!</em>
                            </p>
                        </div>

                        <CallToAction type="secondary" width="84" to="/">
                            Take me back to the homepage
                        </CallToAction>

                        <p className="mt-8 text-sm text-white/70">
                            Think this is a mistake? Email{' '}
                            <a href="mailto:hey@posthog.com" className="text-yellow">
                                hey@posthog.com
                            </a>{' '}
                            and we'll fix it!
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
