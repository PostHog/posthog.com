import React, { ReactElement, useState } from 'react'
import { TrackedCTA } from '../CallToAction'

interface SiteInputProps {
    onAnalyze: (url: string, context: string) => void
    isLoading?: boolean
}

export default function SiteInput({ onAnalyze, isLoading = false }: SiteInputProps): ReactElement {
    const [url, setUrl] = useState('')
    const [context, setContext] = useState('')
    const [urlError, setUrlError] = useState('')

    const handleAnalyze = () => {
        setUrlError('')

        if (!url.trim()) {
            setUrlError('Please enter a website URL')
            return
        }

        try {
            new URL(url.trim())
        } catch {
            setUrlError('Please enter a valid URL')
            return
        }

        onAnalyze(url.trim(), context.trim())
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="space-y-6">
                <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                        Website URL
                    </label>
                    <input
                        id="url"
                        type="url"
                        value={url}
                        onChange={(e) => {
                            setUrl(e.target.value)
                            if (urlError) setUrlError('')
                        }}
                        placeholder="https://your-startup.com"
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            urlError ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                    />
                    {urlError && <p className="text-sm text-red-600 mt-1">{urlError}</p>}
                </div>

                <div>
                    <label htmlFor="context" className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Context (Optional)
                    </label>
                    <textarea
                        id="context"
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        placeholder="Tell us about your startup, target audience, or any specific marketing challenges you're facing..."
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                </div>

                <TrackedCTA
                    event={{
                        name: 'clicked analyze marketing strategy',
                        type: 'marketing_strategy_agent',
                    }}
                    onClick={handleAnalyze}
                    disabled={isLoading || !url.trim()}
                    width="full"
                    size="lg"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Analyzing...</span>
                        </div>
                    ) : (
                        'Analyze Marketing Strategy'
                    )}
                </TrackedCTA>
            </div>
        </div>
    )
}
