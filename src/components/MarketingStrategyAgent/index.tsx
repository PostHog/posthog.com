import React, { useState } from 'react'
import SiteInput from './SiteInput'
import { AnyResearchNode, ResearchTree } from './types'
import { Summary } from './Summary'
import { Competitor } from './Competitor'

export default function MarketingStrategyAgent(): JSX.Element {
    const [isLoading, setIsLoading] = useState(false)
    const [researchTree, setResearchTree] = useState<ResearchTree>({})
    const abortControllerRef = React.useRef<AbortController | null>(null)

    const handleAnalyze = async (url: string, context: string) => {
        console.log('Analyzing website:', url, 'with context:', context)
        setIsLoading(true)
        setResearchTree({})

        // Abort any ongoing request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
        }

        abortControllerRef.current = new AbortController()

        try {
            // curl -X GET 'http://localhost:8000/api/marketing_web_analysis/website_analysis/?website_url=https://posthog.com'
            const response = await fetch(
                `http://localhost:8000/api/marketing_web_analysis/website_analysis/?website_url=${encodeURIComponent(
                    url
                )}&context=${encodeURIComponent(context)}`,
                {
                    method: 'GET',
                    signal: abortControllerRef.current.signal,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            if (!response.body) {
                throw new Error('No response body')
            }

            const reader = response.body.getReader()
            const decoder = new TextDecoder()

            // eslint-disable-next-line no-constant-condition
            while (true) {
                const { done, value } = await reader.read()

                if (done) {
                    break
                }

                const chunk = decoder.decode(value, { stream: true })
                const lines = chunk.split('\n')

                for (const line of lines) {
                    if (line.trim() === '') continue

                    if (line.startsWith('data: ')) {
                        const data = line.slice(6) // Remove 'data: ' prefix

                        try {
                            const parsedData: AnyResearchNode = JSON.parse(data)
                            console.log('Received streaming data:', parsedData)

                            if ('kind' in parsedData) {
                                switch (parsedData.kind) {
                                    case 'get_summary':
                                        setResearchTree((prev) => ({
                                            ...prev,
                                            summary: parsedData.result.summary,
                                        }))
                                        break
                                    case 'find_competitors': {
                                        setResearchTree((prev) => {
                                            const competitors = { ...prev.competitors }
                                            for (const [key, val] of Object.entries(parsedData.result.competitors)) {
                                                console.log('find_competitors', { key, val })

                                                competitors[key] = {
                                                    ...competitors[key],
                                                    name: val.url,
                                                    find_competitors_data: val,
                                                }
                                            }
                                            return {
                                                ...prev,
                                                competitors,
                                            }
                                        })
                                        break
                                    }
                                    case 'enrich_competitors': {
                                        setResearchTree((prev) => {
                                            const competitors = { ...prev.competitors }
                                            for (const [key, val] of Object.entries(
                                                parsedData.result.enriched_competitors
                                            )) {
                                                console.log('enrich_competitors', { key, val })
                                                competitors[key] = {
                                                    ...competitors[key],
                                                    enrich_competitors_data: val,
                                                }
                                            }
                                            return {
                                                ...prev,
                                                competitors,
                                            }
                                        })
                                        break
                                    }
                                }
                            }
                        } catch (error) {
                            console.error('Error parsing streaming data:', error)
                        }
                    }
                }
            }
        } catch (error) {
            if (error instanceof Error && error.name === 'AbortError') {
                console.log('Request was aborted')
            } else {
                console.error('Error during analysis:', error)
                setResearchTree({})
            }
        } finally {
            setIsLoading(false)
            abortControllerRef.current = null
        }
    }

    // Cleanup on unmount
    React.useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort()
            }
        }
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Marketing Strategy Agent</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Get personalized marketing strategies for your startup. We'll analyze your website, identify
                        competitors, and provide actionable marketing recommendations.
                    </p>
                </div>

                <SiteInput onAnalyze={handleAnalyze} isLoading={isLoading} />

                {isLoading && (
                    <div className="text-center mt-8">
                        <p className="text-gray-600">Analyzing your website, please wait...</p>
                    </div>
                )}

                {researchTree.summary ? <Summary summary={researchTree.summary} /> : null}

                {researchTree.competitors && Object.keys(researchTree.competitors).length > 0
                    ? Object.values(researchTree.competitors).map((competitor) => (
                          <Competitor key={competitor.name} competitor={competitor} />
                      ))
                    : null}
            </div>
        </div>
    )
}
