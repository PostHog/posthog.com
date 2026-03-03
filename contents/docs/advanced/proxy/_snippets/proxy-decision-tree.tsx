import React from 'react'
import { DecisionTree } from 'components/Docs/DecisionTree'
import type { DecisionTreeQuestion, DecisionTreeRecommendation } from 'components/Docs/DecisionTree'

const questions: DecisionTreeQuestion[] = [
    {
        id: 'platform',
        question: 'Where are you deploying?',
        description: 'Select your hosting platform or deployment target.',
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
            answers.platform === 'vercel' || answers.platform === 'netlify' || answers.platform === 'other',
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

const getRecommendation = (answers: Record<string, string>): DecisionTreeRecommendation => {
    if (answers.platform === 'vercel') {
        if (answers.framework === 'nextjs') {
            return {
                title: 'We recommend: Next.js rewrites',
                path: '/docs/advanced/proxy/nextjs',
                reason: 'Next.js rewrites are built into the framework and work seamlessly on Vercel with minimal configuration.',
            }
        }
        return {
            title: 'We recommend: Vercel rewrites',
            path: '/docs/advanced/proxy/vercel',
            reason: 'Vercel rewrites work for any framework on their platform with just a simple vercel.json configuration.',
        }
    }

    if (answers.platform === 'netlify') {
        return {
            title: 'We recommend: Netlify redirects',
            path: '/docs/advanced/proxy/netlify',
            reason: "Netlify's redirect rules work with any framework through a simple netlify.toml or _redirects file.",
        }
    }

    if (answers.platform === 'aws') {
        return {
            title: 'We recommend: AWS CloudFront',
            path: '/docs/advanced/proxy/cloudfront',
            reason: 'CloudFront integrates seamlessly with AWS services and provides excellent performance with global edge locations.',
        }
    }

    if (answers.platform === 'cloudflare') {
        return {
            title: 'We recommend: Cloudflare Workers',
            path: '/docs/advanced/proxy/cloudflare',
            reason: "Workers run at the edge across Cloudflare's global network and work on the free tier.",
        }
    }

    if (answers.platform === 'railway') {
        return {
            title: 'We recommend: Railway template',
            path: '/docs/advanced/proxy/railway',
            reason: 'Railway offers a one-click deployment template that sets up a PostHog proxy instantly.',
        }
    }

    if (answers.platform === 'self-hosted') {
        if (answers.server === 'kubernetes') {
            return {
                title: 'We recommend: Kubernetes Ingress',
                path: '/docs/advanced/proxy/kubernetes-ingress-controller',
                reason: 'Using an Ingress Controller is the Kubernetes-native way to handle routing and proxy requests.',
            }
        }
        if (answers.server === 'nginx') {
            return {
                title: 'We recommend: nginx',
                path: '/docs/advanced/proxy/nginx',
                reason: 'nginx is a battle-tested, high-performance reverse proxy perfect for self-hosted setups.',
            }
        }
        if (answers.server === 'caddy') {
            return {
                title: 'We recommend: Caddy',
                path: '/docs/advanced/proxy/caddy',
                reason: 'Caddy is a modern web server with automatic HTTPS that is simpler to configure than traditional servers.',
            }
        }
        if (answers.server === 'node') {
            return {
                title: 'We recommend: Node.js HTTP',
                path: '/docs/advanced/proxy/node',
                reason: 'Using node:http lets you integrate the proxy directly into your existing Node.js application.',
            }
        }
    }

    if (answers.framework === 'nuxt') {
        return {
            title: 'We recommend: Nuxt server routes',
            path: '/docs/advanced/proxy/nuxt',
            reason: "Server routes are Nuxt's way to intercept and handle requests on the server side.",
        }
    }

    if (answers.framework === 'sveltekit') {
        return {
            title: 'We recommend: SvelteKit server hooks',
            path: '/docs/advanced/proxy/sveltekit',
            reason: "Server hooks are SvelteKit's way to intercept and handle requests on the server side.",
        }
    }

    if (answers.framework === 'remix') {
        return {
            title: 'We recommend: Remix resource routes',
            path: '/docs/advanced/proxy/remix',
            reason: "Remix's resource routes with splat routing provide a clean, server-side way to proxy requests.",
        }
    }

    return {
        title: 'We recommend: Managed reverse proxy',
        path: '/docs/advanced/proxy/managed-reverse-proxy',
        reason: "Based on your setup, we recommend starting with the managed proxy. It's the simplest option that works everywhere.",
    }
}

const ProxyDecisionTree: React.FC = () => {
    return <DecisionTree questions={questions} getRecommendation={getRecommendation} />
}

export default ProxyDecisionTree
