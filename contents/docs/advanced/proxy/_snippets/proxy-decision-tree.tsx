import React, { useState, useEffect } from 'react'
import Link from 'components/Link'
import { IconCheck, IconX, IconArrowRight, IconRevert } from '@posthog/icons'

interface Answer {
    managed?: string
    platform?: string
    framework?: string
    server?: string
}

interface Recommendation {
    method: string
    path: string
    reason: string
}

interface Option {
    value: string
    label: string
    icon?: React.FC<{ className?: string }>
}

interface Question {
    id: keyof Answer
    question: string
    description: string
    condition?: (answers: Answer) => boolean
    options: Option[]
}

const getRecommendation = (answers: Answer): Recommendation => {
    if (answers.managed === 'yes') {
        return {
            method: 'Managed reverse proxy',
            path: '/docs/advanced/proxy/managed-reverse-proxy',
            reason: "PostHog's managed proxy requires zero maintenance, handles SSL automatically, and stays up-to-date without any work on your part.",
        }
    }

    if (answers.platform === 'vercel') {
        if (answers.framework === 'nextjs') {
            return {
                method: 'Next.js rewrites',
                path: '/docs/advanced/proxy/nextjs',
                reason: 'Next.js rewrites are built into the framework and work seamlessly on Vercel with minimal configuration.',
            }
        }
        return {
            method: 'Vercel rewrites',
            path: '/docs/advanced/proxy/vercel',
            reason: 'Vercel rewrites work for any framework on their platform with just a simple vercel.json configuration.',
        }
    }

    if (answers.platform === 'netlify') {
        return {
            method: 'Netlify redirects',
            path: '/docs/advanced/proxy/netlify',
            reason: "Netlify's redirect rules work with any framework through a simple netlify.toml or _redirects file.",
        }
    }

    if (answers.platform === 'aws') {
        return {
            method: 'AWS CloudFront',
            path: '/docs/advanced/proxy/cloudfront',
            reason: 'CloudFront integrates seamlessly with AWS services and provides excellent performance with global edge locations.',
        }
    }

    if (answers.platform === 'cloudflare') {
        return {
            method: 'Cloudflare Workers',
            path: '/docs/advanced/proxy/cloudflare',
            reason: "Workers run at the edge across Cloudflare's global network and work on the free tier.",
        }
    }

    if (answers.platform === 'railway') {
        return {
            method: 'Railway template',
            path: '/docs/advanced/proxy/railway',
            reason: 'Railway offers a one-click deployment template that sets up a PostHog proxy instantly.',
        }
    }

    if (answers.platform === 'self-hosted') {
        if (answers.server === 'kubernetes') {
            return {
                method: 'Kubernetes Ingress',
                path: '/docs/advanced/proxy/kubernetes-ingress-controller',
                reason: 'Using an Ingress Controller is the Kubernetes-native way to handle routing and proxy requests.',
            }
        }
        if (answers.server === 'nginx') {
            return {
                method: 'nginx',
                path: '/docs/advanced/proxy/nginx',
                reason: 'nginx is a battle-tested, high-performance reverse proxy perfect for self-hosted setups.',
            }
        }
        if (answers.server === 'caddy') {
            return {
                method: 'Caddy',
                path: '/docs/advanced/proxy/caddy',
                reason: 'Caddy is a modern web server with automatic HTTPS that is simpler to configure than traditional servers.',
            }
        }
        if (answers.server === 'node') {
            return {
                method: 'Node.js HTTP',
                path: '/docs/advanced/proxy/node',
                reason: 'Using node:http lets you integrate the proxy directly into your existing Node.js application.',
            }
        }
    }

    if (answers.framework === 'nuxt') {
        return {
            method: 'Nuxt routeRules',
            path: '/docs/advanced/proxy/nuxt',
            reason: "The routeRules configuration is Nuxt's built-in way to handle proxying through Nitro.",
        }
    }

    if (answers.framework === 'sveltekit') {
        return {
            method: 'SvelteKit server hooks',
            path: '/docs/advanced/proxy/sveltekit',
            reason: "Server hooks are SvelteKit's way to intercept and handle requests on the server side.",
        }
    }

    if (answers.framework === 'remix') {
        return {
            method: 'Remix API routes',
            path: '/docs/advanced/proxy/remix',
            reason: "Remix's API routes with splat routing provide a clean, server-side way to proxy requests.",
        }
    }

    return {
        method: 'Managed reverse proxy',
        path: '/docs/advanced/proxy/managed-reverse-proxy',
        reason: "Based on your setup, we recommend starting with the managed proxy. It's the simplest option that works everywhere.",
    }
}

const questions: Question[] = [
    {
        id: 'managed',
        question: 'Do you want a managed solution?',
        description: 'PostHog offers a managed reverse proxy as a product add-on with zero maintenance.',
        options: [
            { value: 'yes', label: 'Yes, managed', icon: IconCheck },
            { value: 'no', label: 'No, self-hosted', icon: IconX },
        ],
    },
    {
        id: 'platform',
        question: 'Where are you deploying?',
        description: 'Select your hosting platform or deployment target.',
        condition: (answers) => answers.managed === 'no',
        options: [
            { value: 'vercel', label: 'Vercel' },
            { value: 'netlify', label: 'Netlify' },
            { value: 'aws', label: 'AWS' },
            { value: 'cloudflare', label: 'Cloudflare' },
            { value: 'railway', label: 'Railway' },
            { value: 'self-hosted', label: 'Self-hosted server' },
            { value: 'other', label: 'Other / Framework-specific' },
        ],
    },
    {
        id: 'framework',
        question: 'What framework are you using?',
        description: 'Some frameworks have built-in proxy capabilities.',
        condition: (answers) =>
            answers.managed === 'no' &&
            (answers.platform === 'vercel' || answers.platform === 'netlify' || answers.platform === 'other'),
        options: [
            { value: 'nextjs', label: 'Next.js' },
            { value: 'nuxt', label: 'Nuxt' },
            { value: 'sveltekit', label: 'SvelteKit' },
            { value: 'remix', label: 'Remix' },
            { value: 'other', label: 'Other / Plain HTML' },
        ],
    },
    {
        id: 'server',
        question: 'What server are you using?',
        description: 'Select your server or container orchestration platform.',
        condition: (answers) => answers.platform === 'self-hosted',
        options: [
            { value: 'nginx', label: 'nginx' },
            { value: 'caddy', label: 'Caddy' },
            { value: 'kubernetes', label: 'Kubernetes' },
            { value: 'node', label: 'Node.js' },
            { value: 'other', label: 'Other' },
        ],
    },
]

const ProxyDecisionTree: React.FC = () => {
    const [step, setStep] = useState(0)
    const [answers, setAnswers] = useState<Answer>({})
    const [recommendation, setRecommendation] = useState<Recommendation | null>(null)

    const currentQuestion = questions[step]

    const handleAnswer = (questionId: keyof Answer, value: string) => {
        const newAnswers = { ...answers, [questionId]: value }
        setAnswers(newAnswers)

        const nextQuestions = questions.slice(step + 1)
        const hasMoreQuestions = nextQuestions.some((q) => !q.condition || q.condition(newAnswers))

        if (hasMoreQuestions) {
            setStep(step + 1)
        } else {
            const rec = getRecommendation(newAnswers)
            setRecommendation(rec)
        }
    }

    const reset = () => {
        setStep(0)
        setAnswers({})
        setRecommendation(null)
    }

    useEffect(() => {
        if (currentQuestion && currentQuestion.condition && !currentQuestion.condition(answers)) {
            const nextStep = questions.findIndex((q, i) => i > step && (!q.condition || q.condition(answers)))
            if (nextStep !== -1) {
                setStep(nextStep)
            } else {
                const rec = getRecommendation(answers)
                setRecommendation(rec)
            }
        }
    }, [step, answers])

    if (recommendation) {
        return (
            <div className="border border-light dark:border-dark rounded-md p-5 bg-accent dark:bg-accent-dark my-4">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-green/20 flex items-center justify-center flex-shrink-0">
                        <IconCheck className="w-5 h-5 text-green" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-lg font-bold m-0 mb-2">We recommend: {recommendation.method}</h4>
                        <p className="text-[15px] opacity-75 m-0 mb-4">{recommendation.reason}</p>

                        <div className="flex flex-wrap gap-2">
                            <Link
                                to={recommendation.path}
                                className="inline-flex items-center gap-1.5 bg-orange text-primary dark:text-primary font-semibold px-4 py-2 rounded-md text-sm hover:opacity-90 transition-opacity"
                            >
                                Follow the guide
                                <IconArrowRight className="w-4 h-4" />
                            </Link>
                            <button
                                onClick={reset}
                                className="inline-flex items-center gap-1.5 border border-light dark:border-dark hover:bg-light dark:hover:bg-dark px-4 py-2 rounded-md font-semibold text-sm transition-colors"
                            >
                                <IconRevert className="w-4 h-4" />
                                Start over
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!currentQuestion) return null

    return (
        <div className="border border-light dark:border-dark rounded-md p-5 bg-accent dark:bg-accent-dark my-4">
            <div className="mb-4">
                <h4 className="text-lg font-bold m-0">{currentQuestion.question}</h4>
                <p className="text-[15px] opacity-75 m-0 mt-1">{currentQuestion.description}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-2">
                {currentQuestion.options.map((option) => {
                    const Icon = option.icon
                    return (
                        <button
                            key={option.value}
                            onClick={() => handleAnswer(currentQuestion.id, option.value)}
                            className="flex items-center gap-2 p-3 border-2 border-light dark:border-dark hover:border-orange dark:hover:border-orange rounded-md transition-colors text-left bg-white dark:bg-dark"
                        >
                            {Icon && <Icon className="w-5 h-5 flex-shrink-0 opacity-60" />}
                            <span className="font-semibold text-sm">{option.label}</span>
                        </button>
                    )
                })}
            </div>

            {step > 0 && (
                <button
                    onClick={() => setStep(step - 1)}
                    className="mt-3 text-sm opacity-60 hover:opacity-100 transition-opacity"
                >
                    ← Back
                </button>
            )}
        </div>
    )
}

export default ProxyDecisionTree
