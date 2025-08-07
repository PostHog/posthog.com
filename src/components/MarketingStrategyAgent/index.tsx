import React, { useState } from 'react'
import SiteInput from './SiteInput'
import CompetitorSummary from './CompetitorSummary'

interface CompetitorResult {
    url: string
    title: string
    score: number | null
    published_date: string
    author: string
    text: string
    summary: string
}

export default function MarketingStrategyAgent(): JSX.Element {
    const [isLoading, setIsLoading] = useState(false)
    const [competitors, setCompetitors] = useState<CompetitorResult[]>([])

    const handleAnalyze = async (url: string, context: string) => {
        console.log('Analyzing competitors for URL:', url, 'with context:', context)
        setIsLoading(true)
        setCompetitors([])

        try {
            // TODO: Replace with actual API call
            const response = await fetch('http://localhost:8000/api/marketing_research/find_competitors/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    websiteurl: url,
                    summaryText: context,
                }),
            })

            if (response.ok) {
                const data = await response.json()
                setCompetitors(data.results || [])
            } else {
                console.error('Failed to fetch competitors', response)
                setCompetitors([])
            }
        } catch (error) {
            console.error('Error analyzing competitors:', error)
            setCompetitors([])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Marketing Strategy Agent</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Get personalized marketing strategies for your YC startup. We'll analyze your website, identify
                        competitors, and provide actionable marketing recommendations.
                    </p>
                </div>

                <SiteInput onAnalyze={handleAnalyze} isLoading={isLoading} />

                {competitors.length >= 0 && (
                    <div className="mt-8">
                        <CompetitorSummary competitors={competitors} isLoading={isLoading} />
                    </div>
                )}
            </div>
        </div>
    )
}
