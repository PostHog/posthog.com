import React, { ReactElement } from 'react'

interface CompetitorResult {
    url: string
    title: string
    score: number | null
    published_date: string
    author: string
    text: string
    summary: string
}

interface CompetitorSummaryProps {
    competitors: CompetitorResult[]
    isLoading?: boolean
}

export default function CompetitorSummary({ competitors, isLoading = false }: CompetitorSummaryProps): ReactElement {
    if (isLoading) {
        return (
            <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-center space-x-2 py-8">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-600">Analyzing competitors...</span>
                </div>
            </div>
        )
    }

    if (!competitors || competitors.length === 0) {
        return (
            <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="text-center py-8">
                    <p className="text-gray-500">No competitors found yet.</p>
                </div>
            </div>
        )
    }

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            })
        } catch {
            return 'Unknown date'
        }
    }

    const getDomainFromUrl = (url: string) => {
        try {
            const domain = new URL(url).hostname
            return domain.replace('www.', '')
        } catch {
            return url
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Competitor Analysis</h2>
                <p className="text-gray-600">
                    Found {competitors.length} competitor{competitors.length !== 1 ? 's' : ''} based on your website
                </p>
            </div>

            <div className="space-y-4">
                {competitors.map((competitor, index) => (
                    <div
                        key={`${competitor.url}-${index}`}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                                        {competitor.title || 'Untitled'}
                                    </h3>
                                </div>

                                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                    <span className="flex items-center">
                                        <svg
                                            className="w-4 h-4 mr-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                            />
                                        </svg>
                                        {getDomainFromUrl(competitor.url)}
                                    </span>
                                    {competitor.published_date && (
                                        <span className="flex items-center">
                                            <svg
                                                className="w-4 h-4 mr-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            {formatDate(competitor.published_date)}
                                        </span>
                                    )}
                                    {competitor.author && (
                                        <span className="flex items-center">
                                            <svg
                                                className="w-4 h-4 mr-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                />
                                            </svg>
                                            {competitor.author}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {competitor.score !== null && (
                                <div className="flex items-center space-x-1 bg-blue-50 px-3 py-1 rounded-full">
                                    <svg
                                        className="w-4 h-4 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                        />
                                    </svg>
                                    <span className="text-sm font-medium text-blue-600">
                                        {competitor.score.toFixed(1)}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-3">
                            {competitor.summary && (
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-1">Summary</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">{competitor.summary}</p>
                                </div>
                            )}

                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                <a
                                    href={competitor.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                                >
                                    View Source
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                </a>

                                <div className="text-xs text-gray-400">Competitor #{index + 1}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
