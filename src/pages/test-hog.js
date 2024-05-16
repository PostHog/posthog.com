import { SEO } from 'components/seo'
import React, { useState, useEffect } from 'react'
import Layout from 'components/Layout'
import { heading, section } from 'components/Home/classes'
import { CallToAction } from 'components/CallToAction'
import { StaticImage } from 'gatsby-plugin-image'
import Lottie from 'react-lottie'
import animationLottie from '../images/laptophog.json'
// import { useToast } from '../../hooks/toast'
import { useToast } from '../hooks/toast'
import { ArrayCTA } from 'components/ArrayCTA'

function isValidURL(url) {
    const urlPattern =
        /^(https?|ftp):\/\/(([A-Za-z0-9-]+\.)+[A-Za-z]{2,}|localhost)(:[0-9]{1,5})?(\/[A-Za-z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/
    return urlPattern.test(url)
}

const title = `A/B TestHog`
const description = `I'll find five awesome A/B tests to increase conversions on your website!`

const hogs = [
    <StaticImage
        key="1"
        objectFit="contain"
        src="https://res.cloudinary.com/dmukukwp6/image/upload/v1710126295/posthog.com/contents/images/wave_hog.png"
        alt="This hog knows where he's headed"
        width={120}
        placeholder="blurred"
        className="w-full sm:w-[120px] m-auto"
    />,
    <StaticImage
        key="1"
        objectFit="contain"
        src="https://res.cloudinary.com/dmukukwp6/image/upload/v1710126229/posthog.com/contents/images/startup-spotlight.png"
        alt="This hog knows where he's headed"
        width={180}
        placeholder="blurred"
        className="w-full sm:w-[180px] m-auto"
    />,
    <StaticImage
        key="1"
        objectFit="contain"
        src="https://res.cloudinary.com/dmukukwp6/image/upload/v1710126158/posthog.com/contents/images/startup-heart.png"
        alt="This hog knows where he's headed"
        width={190}
        placeholder="blurred"
        className="w-full sm:w-[190px] m-auto"
    />,
    <StaticImage
        key="1"
        objectFit="contain"
        src="https://res.cloudinary.com/dmukukwp6/image/upload/v1710126404/posthog.com/contents/images/smart_hog.png"
        alt="This hog knows where he's headed"
        width={120}
        placeholder="blurred"
        className="w-full sm:w-[120px] m-auto"
    />,
    <StaticImage
        key="1"
        objectFit="contain"
        src="https://res.cloudinary.com/dmukukwp6/image/upload/v1710125785/posthog.com/contents/images/startup-credit.png"
        alt="This hog knows where he's headed"
        width={200}
        placeholder="blurred"
        className="w-full sm:w-[200px] m-auto"
    />,
    <StaticImage
        key="1"
        objectFit="contain"
        src="https://res.cloudinary.com/dmukukwp6/image/upload/v1710125785/posthog.com/contents/images/support-hog.png"
        alt="This hog knows where he's headed"
        width={140}
        placeholder="blurred"
        className="w-full sm:w-[140px] m-auto"
    />,
]

const Recommendations = ({ recommendations }) => (
    <div className="max-w-4xl mx-auto pt-8">
        {recommendations.map((rec, index) => (
            <>
                <div
                    key={index}
                    className="border border-light dark:border-dark bg-accent dark:bg-accent-dark p-6 xl:p-8 rounded"
                >
                    <h2 className="text-2xl font-semibold mb-4">
                        {index + 1}. {rec.testTitle}
                    </h2>
                    <p className="mb-4 text-gray-700">{rec.testExplanationAndReason}</p>
                    <div className="mb-4">
                        <h4 className="font-semibold">Goal Metric</h4>
                        <p>{rec.goalMetric}</p>
                    </div>
                    <div className="mb-4">
                        <h4 className="font-semibold">Secondary Metrics</h4>
                        <ul className="list-disc list-inside">
                            {rec.secondaryMetrics.map((metric, idx) => (
                                <li key={idx}>{metric}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-4">
                        <h4 className="font-semibold">Guardrail Metrics</h4>
                        <ul className="list-disc list-inside">
                            {rec.guardrailMetrics.map((metric, idx) => (
                                <li key={idx}>{metric}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-4">
                        <h4 className="font-semibold">Test Variants</h4>
                        <div className="mb-2 flex items-center">
                            <span
                                style={{ backgroundColor: '#621DA6' }}
                                className="w-2 h-2 bg-purple-500 rounded-full inline-block mr-2"
                            ></span>
                            <span className="font-semibold inline">Control</span>
                        </div>
                        <p className="mb-4">{rec.controlVariant}</p>
                        <div className="mb-2 flex items-center">
                            <span
                                style={{ backgroundColor: '#42827E' }}
                                className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"
                            ></span>
                            <span className="font-semibold inline">Test</span>
                        </div>
                        <p>{rec.testVariant}</p>
                    </div>
                </div>
                <div className="w-full text-center py-10">{hogs[index] || hogs[0]}</div>
            </>
        ))}
    </div>
)

const loadingTexts = [
    'Yes, this is just a GPT wrapper',
    "Before the alphabet was invented, A/B testing was just called 'testing'",
    'Why flip a coin when you can run an A/B test?',
    'Why choose one bad idea when you can A/B test two?',
    'A/B testing: when you want to be wrong in the most precise way possible',
    'Why flip a coin when you can run an A/B test?',
    'A/B testing: proving that even data can be indecisive',
    "Experiment results not what you wanted? Just say it's a data anomaly and test again.",
    "When an A/B test fails, just call it a 'learning experience' and try again",
]

export default function TestHog() {
    const [url, setUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [loadingTextIndex, setLoadingTextIndex] = useState(0)
    const [recommendations, setRecommendations] = useState([])
    const { addToast } = useToast()

    useEffect(() => {
        let interval
        if (isLoading) {
            interval = setInterval(() => {
                setLoadingTextIndex(Math.floor(Math.random() * loadingTexts.length))
            }, 3000)
        } else {
            setLoadingTextIndex(0)
        }

        return () => clearInterval(interval)
    }, [isLoading])

    const handleAnalyze = async () => {
        if (!isValidURL(url)) {
            return addToast({ error: true, message: `Please enter a valid URL` })
        }

        try {
            setIsLoading(true)
            const response = await fetch('/api/abTestHog', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    websiteURL: url,
                }),
            })
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await response.json()
            const { suggestions } = data
            if (suggestions && suggestions.length > 0) {
                setRecommendations(suggestions)
            }
        } catch (error) {
            addToast({ error: true, message: `There was a problem with the fetch operation: ${error}` })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Layout>
            <SEO title={title} description={title} />
            <div className={section('z-10 relative md:!mb-8')}>
                <h1 className={`${heading()} overflow-hidden pb-1 home-hero-title`}>{title}</h1>
                <h2 className={`mt-2 mb-6 text-xl font-semibold text-center`}>{description}</h2>
                <div className="w-full text-center py-4">
                    <StaticImage
                        key="1"
                        objectFit="contain"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/v1710125790/posthog.com/contents/images/science_hog.png"
                        alt="This hog knows where he's headed"
                        width={150}
                        placeholder="blurred"
                        className="w-full sm:w-[150px] m-auto"
                    />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center mb-20">
                <div className="inline-flex items-center space-x-2">
                    <input
                        type="text"
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                        className="h-11 w-60 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Enter URL..."
                    />
                    <div style={{ transform: 'translateY(-8px)' }}>
                        <CallToAction className="mt-4" onClick={handleAnalyze} type="primary">
                            {isLoading ? 'Analyzing...' : 'Analyze'}
                        </CallToAction>
                    </div>
                </div>
                {!isLoading && recommendations.length > 0 && <Recommendations recommendations={recommendations} />}
                {isLoading && (
                    <div className="w-[125px] sm:w-[250px]">
                        <Lottie
                            options={{
                                loop: true,
                                autoplay: true,
                                animationData: animationLottie,
                            }}
                        />
                    </div>
                )}
                {isLoading && <p className="text-center mt-4 text-zinc-600">{loadingTexts[loadingTextIndex]}</p>}
                {recommendations.length > 0 && (
                    <div className="space-y-4 -mt-12">
                        <ArrayCTA />
                    </div>
                )}
            </div>
        </Layout>
    )
}
