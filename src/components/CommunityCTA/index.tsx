import CloudinaryImage from 'components/CloudinaryImage'
import { LazyHog } from 'components/About/AboutHero'
import { CallToAction } from 'components/CallToAction'
import { StaticImage } from 'gatsby-plugin-image'
import React, { useEffect, useState } from 'react'
import Lottie from 'react-lottie'

export default function CommunityCTA() {
    const [hog1Data, setHog1Data] = useState<any | null>(null)

    useEffect(() => {
        // Define the URL as a constant
        const HOG_ANIMATION_URL = 'https://res.cloudinary.com/dmukukwp6/raw/upload/about_hog_1_1731825e07.json'

        // Use async/await for cleaner code
        const fetchHogAnimation = async () => {
            try {
                const response = await fetch(HOG_ANIMATION_URL)
                const data = await response.json()
                setHog1Data(data)
            } catch (error) {
                console.error('Failed to load hog animation:', error)
                // Handle the error appropriately (e.g., set a fallback image)
            }
        }

        fetchHogAnimation()
    }, [])

    return (
        <div className="flex md:flex-row flex-col items-center md:space-x-4 md:space-y-0 space-y-4 px-2 justify-center rounded-md mb-6 pb-12 md:pt-12 md:max-h-[250px] overflow-hidden">
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
                    <CloudinaryImage width={300} src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/about-hog-1.svg" alt="Hog" placeholder="blurred" />
                )}
            </div>
            <div className="max-w-[400px]">
                <h3 className="m-0">Join the PostHog.com community</h3>
                <p className="mt-2 mb-5">
                    Get help or answer questions from the PostHog community, vote on the roadmap, and get early access
                    to new features.
                </p>
                <CallToAction size="sm" to="/community">
                    Check it out
                </CallToAction>
            </div>
        </div>
    )
}
