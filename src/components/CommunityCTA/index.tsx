import { LazyHog } from 'components/About/AboutHero'
import { CallToAction } from 'components/CallToAction'
import { StaticImage } from 'gatsby-plugin-image'
import React, { useEffect } from 'react'
import Lottie from 'react-lottie'

export default function CommunityCTA() {
    const [hog1Data, setHog1Data] = React.useState<any | null>(null)

    useEffect(() => {
        import('../../../static/lotties/about-hog-1.json').then((data) => setHog1Data(data.default))
    }, [])

    return (
        <div className="flex items-center space-x-4 px-2 justify-center rounded-md mb-12 pb-12 pt-12 border-t border-b border-gray-accent-light dark:border-gray-accent-dark border-dashed max-h-[250px] overflow-hidden">
            <div className="flex-shrink-0">
                {hog1Data ? (
                    <Lottie
                        width={300}
                        options={{
                            loop: true,
                            autoplay: true,
                            animationData: hog1Data,
                        }}
                    />
                ) : (
                    <StaticImage src="../../images/about-hog-1.svg" alt="Hog" placeholder="blurred" />
                )}
            </div>
            <div className="max-w-[400px]">
                <h3 className="m-0">Join the PostHog.com community!</h3>
                <p className="mt-2 mb-5">
                    Ask and answer questions, engage with other PostHog users, and get early access to new features!
                </p>
                <CallToAction size="sm" to="/community">
                    Check it out
                </CallToAction>
            </div>
        </div>
    )
}
