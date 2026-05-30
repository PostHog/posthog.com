import React, { useState } from 'react'
import SEO from 'components/seo'
import { CallToAction } from 'components/CallToAction'

export default function AIVisibility(): JSX.Element {
    const [domain, setDomain] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        // Basic domain validation
        const cleanDomain = domain.trim()
        if (!cleanDomain) {
            setError('Please enter a domain')
            return
        }

        // Remove http(s):// and www. if present, and any trailing slashes
        const processedDomain = cleanDomain
            .replace(/^https?:\/\//i, '')
            .replace(/^www\./i, '')
            .replace(/\/.*$/, '')

        if (!processedDomain) {
            setError('Please enter a valid domain')
            return
        }

        // Open report in new tab
        window.open(`http://localhost:8010/viz/${encodeURIComponent(processedDomain)}`, '_blank')
    }

    return (
        <>
            <SEO
                title="Get Your Free AI Visibility Report - PostHog"
                description="See where you stand and start optimizing your AI search performance. Analyze your brand's visibility across ChatGPT, Claude, and other AI platforms."
                image="/images/og/ai-visibility.jpg"
            />
            <div data-scheme="primary" className="min-h-screen bg-accent dark:bg-dark">
                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Content */}
                        <div className="space-y-6">
                            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                                Get Your Free AI Visibility Report
                            </h1>
                            <p className="text-xl md:text-2xl text-primary/80 leading-relaxed">
                                See where you stand and start optimizing your AI search performance, all for free.
                            </p>
                            <p className="text-lg text-primary/70">
                                Your customers aren't googling anymore. They're asking AI.
                            </p>

                            {/* Form */}
                            <div className="pt-8 mt-8 border-t border-primary">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="domain" className="block text-2xl font-bold mb-4">
                                            Analyze my brand
                                        </label>
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <input
                                                type="text"
                                                id="domain"
                                                value={domain}
                                                onChange={(e) => setDomain(e.target.value)}
                                                placeholder="yourdomain.com"
                                                className="flex-1 px-4 py-3 rounded border border-primary bg-light dark:bg-dark text-primary placeholder:text-primary/40 focus:outline-none focus:ring-2 focus:ring-red dark:focus:ring-yellow"
                                            />
                                            <button
                                                type="submit"
                                                className="px-6 py-3 bg-red dark:bg-yellow text-white dark:text-black font-bold rounded hover:scale-[1.02] active:scale-[0.98] transition-transform"
                                            >
                                                Get Report
                                            </button>
                                        </div>
                                        {error && <p className="text-red dark:text-yellow text-sm mt-2">{error}</p>}
                                    </div>
                                    <p className="text-xs text-primary/60">
                                        By submitting, you consent to PostHog processing your data in accordance with
                                        our{' '}
                                        <a href="/privacy" className="underline hover:text-primary">
                                            Privacy Policy
                                        </a>
                                        .
                                    </p>
                                </form>
                            </div>
                        </div>

                        {/* Right Column - Visual */}
                        <div className="relative">
                            <div className="bg-light dark:bg-dark border border-primary rounded-lg p-6 shadow-xl">
                                <img
                                    src={'src/images/ai-visibility-preview.png'}
                                    alt="AI visibility dashboard showing brand rankings and mention percentages"
                                    className="w-full rounded"
                                />
                            </div>
                            {/* Decorative element */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-red/10 dark:bg-yellow/10 rounded-full blur-2xl" />
                            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue/10 rounded-full blur-2xl" />
                        </div>
                    </div>
                </div>

                {/* Value Proposition Section */}
                <div className="bg-light dark:bg-dark border-t border-primary py-16">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                            Understand your presence across major AI platforms
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="space-y-3">
                                <div className="text-4xl">🎯</div>
                                <h3 className="text-xl font-bold">Visibility scores across top AI platforms</h3>
                                <p className="text-primary/70">
                                    See how your brand appears in ChatGPT, Claude, Google AI Overview, and more.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="space-y-3">
                                <div className="text-4xl">🏆</div>
                                <h3 className="text-xl font-bold">Competitive rankings versus key competitors</h3>
                                <p className="text-primary/70">
                                    Benchmark your AI presence against your competition and find opportunities to stand
                                    out.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="space-y-3">
                                <div className="text-4xl">💬</div>
                                <h3 className="text-xl font-bold">Prompts and sources driving brand conversations</h3>
                                <p className="text-primary/70">
                                    Discover what people are asking about your brand and where AI gets its information.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="py-16">
                    <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold">Ready to see where you stand?</h2>
                        <p className="text-xl text-primary/70">
                            Get your free AI visibility report in seconds. No credit card required.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <CallToAction
                                onClick={() => {
                                    const element = document.getElementById('domain')
                                    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                                    element?.focus()
                                }}
                                size="lg"
                                type="primary"
                            >
                                Analyze my brand
                            </CallToAction>
                            <CallToAction href="/ai" size="lg" type="secondary">
                                Learn about PostHog AI
                            </CallToAction>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="border-t border-primary py-12 bg-light dark:bg-dark">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid md:grid-cols-4 gap-8">
                            <div>
                                <h4 className="font-bold mb-4">Product</h4>
                                <ul className="space-y-2 text-sm">
                                    <li>
                                        <a href="/product-analytics" className="text-primary/70 hover:text-primary">
                                            Product Analytics
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/session-replay" className="text-primary/70 hover:text-primary">
                                            Session Replay
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/feature-flags" className="text-primary/70 hover:text-primary">
                                            Feature Flags
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/experiments" className="text-primary/70 hover:text-primary">
                                            A/B Testing
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold mb-4">Resources</h4>
                                <ul className="space-y-2 text-sm">
                                    <li>
                                        <a href="/docs" className="text-primary/70 hover:text-primary">
                                            Docs
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/handbook" className="text-primary/70 hover:text-primary">
                                            Handbook
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/blog" className="text-primary/70 hover:text-primary">
                                            Blog
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold mb-4">Company</h4>
                                <ul className="space-y-2 text-sm">
                                    <li>
                                        <a href="/about" className="text-primary/70 hover:text-primary">
                                            About
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/careers" className="text-primary/70 hover:text-primary">
                                            Careers
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/community" className="text-primary/70 hover:text-primary">
                                            Community
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold mb-4">Legal</h4>
                                <ul className="space-y-2 text-sm">
                                    <li>
                                        <a href="/privacy" className="text-primary/70 hover:text-primary">
                                            Privacy
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/terms" className="text-primary/70 hover:text-primary">
                                            Terms
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-12 pt-8 border-t border-primary text-center text-sm text-primary/60">
                            <p>&copy; {new Date().getFullYear()} PostHog. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}
