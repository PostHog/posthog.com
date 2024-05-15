import { SEO } from 'components/seo'
import React, { useState } from 'react'
import Layout from 'components/Layout'
import { heading, section } from 'components/Home/classes'
import { CallToAction } from 'components/CallToAction'
import { StaticImage } from 'gatsby-plugin-image'

const title = `A/B TestHog`
const description = 'Enter URL to find out what to test on your site.'

const dummyData = [
    {
        testTitle: 'Add Clear Call-To-Action (CTA) Button to Hero Section',
        testExplanationAndReason:
            'The current hero section does not have a dominant CTA button, which may lead to missed conversion opportunities.',
        controlVariant: 'Hero section without a primary CTA button.',
        testVariant:
            "Hero section with a primary CTA button that says 'Get in Touch' directly below the introductory text along with a contrasting color for visibility.",
        goalMetric: 'Click-through rate on the CTA button',
        secondaryMetrics: ['Time on page', 'Bounce rate'],
        guardrailMetrics: ['Overall page load time', 'Exit rate'],
    },
    {
        testTitle: 'Implement Pain-Agitate-Solution (PAS) Copy Framework',
        testExplanationAndReason:
            'The existing copy does not strongly evoke the pain points and the solution offered. Using the PAS framework could increase empathy and drive conversions.',
        controlVariant: 'Current copy on the landing page.',
        testVariant:
            "Revised copy that follows PAS framework: 1. Pain: 'Struggling to find a designer who understands your brand vision?' 2. Agitate: 'Get frustrated with endless revisions and missed deadlines?' 3. Solve: 'I can help you transform your ideas into stunning visuals efficiently and effectively.'",
        goalMetric: 'Conversion rate',
        secondaryMetrics: ['Time on page', 'Scroll depth'],
        guardrailMetrics: ['Bounce rate', 'Exit rate'],
    },
    {
        testTitle: 'Add Testimonials Section Above the Fold',
        testExplanationAndReason:
            'The site currently lacks visible social proof, which can reduce trust and lower conversions.',
        controlVariant: 'No testimonials above the fold.',
        testVariant:
            'Add a testimonials section with 2-3 client testimonials, including names, titles, and photos right below the hero section.',
        goalMetric: 'Conversion rate',
        secondaryMetrics: ['Time on page', 'Scroll depth'],
        guardrailMetrics: ['Bounce rate', 'Exit rate'],
    },
    {
        testTitle: 'Simplify Language Across the Page',
        testExplanationAndReason: 'The language on the page is somewhat complex, which might alienate some visitors.',
        controlVariant: 'Original page language.',
        testVariant:
            "Simplified language: Replace complex terms with plain language. For example, change 'Enhance your digital presence with bespoke designs' to 'Create custom designs to improve your online presence.'",
        goalMetric: 'Conversion rate',
        secondaryMetrics: ['Bounce rate', 'Time on page'],
        guardrailMetrics: ['Exit rate', 'Scroll depth'],
    },
    {
        testTitle: 'Highlight Unique Selling Points (USPs)',
        testExplanationAndReason:
            'The current page does not make the unique selling points clear, which may make it hard for visitors to distinguish from competitors.',
        controlVariant: 'No explicit USP section.',
        testVariant:
            "Add a section titled 'Why Choose Me?' with bullet points such as 'Personalized design solutions,' 'Quick turnaround times,' and 'Transparent pricing.'",
        goalMetric: 'Conversion rate',
        secondaryMetrics: ['Time on page', 'Scroll depth'],
        guardrailMetrics: ['Bounce rate', 'Exit rate'],
    },
    {
        testTitle: 'Add Clear Use Cases and Benefits',
        testExplanationAndReason:
            'Visitors need to see how the product or service will benefit them with clear examples.',
        controlVariant: 'No use cases or benefits explicitly stated.',
        testVariant:
            "Add a section titled 'How I Can Help You' with specific use cases like 'Brand identity design for startups' and 'Redesigns for established brands,' alongside benefits such as 'Increased brand recognition' and 'Higher engagement rates.'",
        goalMetric: 'Conversion rate',
        secondaryMetrics: ['Time on page', 'Scroll depth'],
        guardrailMetrics: ['Bounce rate', 'Exit rate'],
    },
]

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

export default function TestHog() {
    const [url, setUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const handleChange = (event) => {
        setUrl(event.target.value)
    }

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
            const suggestions = { data }
            console.log(data)
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
                <Recommendations recommendations={dummyData} />
            </div>
        </Layout>
    )
}
