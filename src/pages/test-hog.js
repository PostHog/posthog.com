import { SEO } from 'components/seo'
import React, { useState, useEffect } from 'react'
import Layout from 'components/Layout'
import { heading, section } from 'components/Home/classes'
import { CallToAction } from 'components/CallToAction'
import { StaticImage } from 'gatsby-plugin-image'
import Lottie from 'react-lottie'
import animationLottie from '../images/laptophog.json'

const title = `A/B TestHog`
const description = 'Enter URL to find out what to test on your site.'

const Recommendations = ({ recommendations }) => {
    return (
        <div className="max-w-4xl mx-auto py-8">
            {recommendations.map((rec, index) => (
                <div
                    key={index}
                    className="mb-8 border border-light dark:border-dark bg-accent dark:bg-accent-dark p-6 xl:p-8 rounded"
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
            ))}
        </div>
    )
}

const loadingTexts = [
    'Yes, this is just a ChatGPT wrapper',
    "Before the alphabet was invented, A/B testing was just called 'testing'",
    'Why flip a coin when you can run an A/B test?',
    'Why choose one bad idea when you can A/B test two?',
    'A/B testing: when you want to be wrong in the most precise way possible.',
    'Why flip a coin when you can run an A/B test?',
    'A/B testing: proving that even data can be indecisive.',
    "Experiment results not what you wanted? Just say it's a data anomaly and test again.",
    "When an A/B test fails, just call it a 'learning experience' and try again.",
]

export default function TestHog() {
    const [url, setUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [loadingTextIndex, setLoadingTextIndex] = useState(0)
    const [recommendations, setRecommendations] = useState([])
    const handleChange = (event) => {
        setUrl(event.target.value)
    }

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
            console.error('There was a problem with the fetch operation:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Layout>
            <SEO title={title} description={title} />
            <div className={section('z-10 relative md:!mb-8')}>
                <h1 className={`${heading()} overflow-hidden pb-1 home-hero-title`}>{title}</h1>
                <h2 className={`mt-2 mb-6 text-xl font-semibold text-center home-hero-subtitle`}>{description}</h2>
            </div>
            <div className="flex flex-col items-center justify-center mb-20">
                <input
                    type="text"
                    value={url}
                    onChange={handleChange}
                    className="w-60 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Enter URL..."
                />
                <CallToAction className="mt-4" onClick={handleAnalyze} type="primary">
                    {isLoading ? 'Analyzing...' : 'Analyze'}
                </CallToAction>
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
                {isLoading && <p className="text-center mt-4 text-lg">{loadingTexts[loadingTextIndex]}</p>}
            </div>
        </Layout>
    )
}
