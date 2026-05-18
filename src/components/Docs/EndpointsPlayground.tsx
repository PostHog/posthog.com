import React, { useState, useEffect } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { darkTheme, lightTheme } from 'components/CodeBlock/theme'
import { useApp } from '../../context/App'
import { IconChevronDown, IconTerminal } from '@posthog/icons'
import { AnimatePresence, motion } from 'framer-motion'
import OSButton from 'components/OSButton'
import AutosizeInput from 'react-input-autosize'

export interface QueryScenario {
    id: string
    name: string
    description: string
    endpointName: string
    query: string
    variable: {
        name: string
        options: { id: string; label: string }[]
    }
    generateResponse: (variableValue: string) => { results: Record<string, string | number>[] }
}

const hashString = (str: string): number => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i)
        hash = hash & hash
    }
    return Math.abs(hash)
}

export const scenarios: QueryScenario[] = [
    {
        id: 'customer-events',
        name: 'Customer activity',
        description: 'Daily event counts for a customer',
        endpointName: 'customer_activity',
        query: `SELECT
    toDate(timestamp) AS date,
    count() AS event_count
FROM events
WHERE properties.$group_0 = {variables.customer_id}
GROUP BY date
ORDER BY date DESC
LIMIT 7`,
        variable: {
            name: 'customer_id',
            options: [
                { id: 'acme-corp', label: 'Acme Corp' },
                { id: 'globex', label: 'Globex Inc' },
                { id: 'initech', label: 'Initech' },
                { id: 'umbrella', label: 'Umbrella Co' },
            ],
        },
        generateResponse: (customerId) => {
            const seed = hashString(customerId)
            const results = []
            for (let i = 0; i < 7; i++) {
                const date = new Date('2026-02-17')
                date.setDate(date.getDate() - i)
                results.push({
                    date: date.toISOString().split('T')[0],
                    event_count: 80 + ((seed * (i + 1)) % 120),
                })
            }
            return { results }
        },
    },
    {
        id: 'feature-usage',
        name: 'Feature usage',
        description: 'How often a feature is used',
        endpointName: 'feature_usage',
        query: `SELECT
    properties.$feature AS feature,
    count() AS usage_count,
    count(DISTINCT person_id) AS unique_users
FROM events
WHERE event = '$feature_interaction'
    AND properties.$feature = {variables.feature_name}
GROUP BY feature`,
        variable: {
            name: 'feature_name',
            options: [
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'export', label: 'Export' },
                { id: 'api_keys', label: 'API Keys' },
                { id: 'billing', label: 'Billing' },
            ],
        },
        generateResponse: (featureName) => {
            const seed = hashString(featureName)
            return {
                results: [
                    {
                        feature: featureName,
                        usage_count: 500 + (seed % 2000),
                        unique_users: 50 + (seed % 200),
                    },
                ],
            }
        },
    },
    {
        id: 'top-pages',
        name: 'Top pages',
        description: 'Most viewed pages by path',
        endpointName: 'top_pages',
        query: `SELECT
    properties.$pathname AS page,
    count() AS pageviews,
    count(DISTINCT person_id) AS unique_visitors
FROM events
WHERE event = '$pageview'
    AND properties.$host = {variables.domain}
GROUP BY page
ORDER BY pageviews DESC
LIMIT 5`,
        variable: {
            name: 'domain',
            options: [
                { id: 'app.example.com', label: 'app.example.com' },
                { id: 'docs.example.com', label: 'docs.example.com' },
                { id: 'www.example.com', label: 'www.example.com' },
            ],
        },
        generateResponse: (domain) => {
            const seed = hashString(domain)
            const pages =
                domain === 'docs.example.com'
                    ? ['/getting-started', '/api-reference', '/tutorials', '/changelog', '/faq']
                    : domain === 'app.example.com'
                    ? ['/dashboard', '/settings', '/projects', '/analytics', '/team']
                    : ['/pricing', '/features', '/about', '/blog', '/contact']
            return {
                results: pages.map((page, i) => ({
                    page,
                    pageviews: Math.max(1000 - i * 150 + ((seed * (i + 1)) % 100), 50),
                    unique_visitors: Math.max(400 - i * 60 + ((seed * (i + 1)) % 50), 20),
                })),
            }
        },
    },
    {
        id: 'user-journey',
        name: 'User events',
        description: 'Recent events for a specific user',
        endpointName: 'user_events',
        query: `SELECT
    event,
    timestamp,
    properties.$pathname AS page
FROM events
WHERE person_id = {variables.user_id}
ORDER BY timestamp DESC
LIMIT 5`,
        variable: {
            name: 'user_id',
            options: [
                { id: 'user_8f2a9c', label: 'user_8f2a9c' },
                { id: 'user_3d7e1b', label: 'user_3d7e1b' },
                { id: 'user_9k4m2p', label: 'user_9k4m2p' },
            ],
        },
        generateResponse: (userId) => {
            const seed = hashString(userId)
            const events = ['$pageview', '$click', '$pageview', '$feature_interaction', '$pageview']
            const pages = ['/dashboard', '/settings', '/projects', '/analytics', '/home']
            const results = []
            for (let i = 0; i < 5; i++) {
                const date = new Date('2026-02-17T14:30:00')
                date.setMinutes(date.getMinutes() - i * 5 - (seed % 10))
                results.push({
                    event: events[(seed + i) % events.length],
                    timestamp: date.toISOString(),
                    page: pages[(seed + i) % pages.length],
                })
            }
            return { results }
        },
    },
]

interface EndpointsPlaygroundProps {
    scenarioId?: string
}

export default function EndpointsPlayground({ scenarioId }: EndpointsPlaygroundProps): JSX.Element {
    const { siteSettings } = useApp()
    const websiteTheme = siteSettings?.theme || 'light'
    const codeTheme = websiteTheme === 'dark' ? darkTheme : lightTheme

    const getScenario = (id?: string) => scenarios.find((s) => s.id === id) || scenarios[0]

    const [selectedScenario, setSelectedScenario] = useState(() => getScenario(scenarioId))
    const [openSteps, setOpenSteps] = useState<Set<number>>(new Set([1, 2]))
    const [hasInteracted, setHasInteracted] = useState(false)
    const [endpointName, setEndpointName] = useState(() => getScenario(scenarioId).endpointName)
    const [createdEndpointName, setCreatedEndpointName] = useState('')
    const [selectedVariable, setSelectedVariable] = useState(() => getScenario(scenarioId).variable.options[0])
    const [variableDropdownOpen, setVariableDropdownOpen] = useState(false)
    const [response, setResponse] = useState(() => {
        const scenario = getScenario(scenarioId)
        return scenario.generateResponse(scenario.variable.options[0].id)
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isCreating, setIsCreating] = useState(false)
    const [endpointCreated, setEndpointCreated] = useState(false)

    useEffect(() => {
        const scenario = getScenario(scenarioId)
        setSelectedScenario(scenario)
        setEndpointName(scenario.endpointName)
        setSelectedVariable(scenario.variable.options[0])
        setResponse(scenario.generateResponse(scenario.variable.options[0].id))
        setEndpointCreated(false)
        setCreatedEndpointName('')
        setOpenSteps(new Set([1, 2]))
        setHasInteracted(false)
    }, [scenarioId])

    const toggleStep = (step: number) => {
        setHasInteracted(true)
        if (hasInteracted) {
            if (openSteps.has(step)) {
                setOpenSteps(new Set())
            } else {
                setOpenSteps(new Set([step]))
            }
        } else {
            setOpenSteps(new Set([step]))
        }
    }

    const handleCreateEndpoint = () => {
        setIsCreating(true)
        setTimeout(() => {
            setIsCreating(false)
            setEndpointCreated(true)
            setCreatedEndpointName(endpointName)
            setResponse(selectedScenario.generateResponse(selectedVariable.id))
            setHasInteracted(true)
            setOpenSteps(new Set([3]))
        }, 500)
    }

    const handleVariableChange = (option: { id: string; label: string }) => {
        setSelectedVariable(option)
        setVariableDropdownOpen(false)
        setIsLoading(true)

        setTimeout(() => {
            setResponse(selectedScenario.generateResponse(option.id))
            setIsLoading(false)
        }, 300)
    }

    return (
        <div className="rounded-md border border-primary overflow-hidden">
            {/* Step 1: Query */}
            <button
                onClick={() => toggleStep(1)}
                className="w-full px-4 py-2.5 bg-primary flex items-center justify-between hover:bg-accent"
            >
                <div className="flex items-center gap-2">
                    <span className="size-5 rounded-full bg-red/15 text-red dark:text-yellow text-xs font-bold flex items-center justify-center">
                        1
                    </span>
                    <span className="text-sm font-semibold text-primary">Write your query</span>
                </div>
                <IconChevronDown
                    className={`size-4 text-muted transition-transform ${openSteps.has(1) ? 'rotate-180' : ''}`}
                />
            </button>
            <AnimatePresence>
                {openSteps.has(1) && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        {/* Query code */}
                        <div className="bg-accent dark:bg-accent-dark p-4 font-mono text-sm overflow-auto">
                            <Highlight {...defaultProps} code={selectedScenario.query} language="sql" theme={codeTheme}>
                                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                                    <pre
                                        className={`${className} !bg-transparent m-0 p-0`}
                                        style={{ ...style, background: 'transparent' }}
                                    >
                                        {tokens.map((line, i) => {
                                            const lineContent = line.map((t) => t.content).join('')
                                            const hasVariable = lineContent.includes('{variables.')

                                            return (
                                                <div key={i} {...getLineProps({ line, key: i })} className="table-row">
                                                    <span className="table-cell pr-4 text-muted select-none text-right w-6">
                                                        {i + 1}
                                                    </span>
                                                    <span className="table-cell">
                                                        {hasVariable
                                                            ? lineContent
                                                                  .split(/(\{variables\.[^}]+\})/)
                                                                  .map((part, idx) =>
                                                                      part.startsWith('{variables.') ? (
                                                                          <span
                                                                              key={idx}
                                                                              className="text-red dark:text-yellow"
                                                                          >
                                                                              {part}
                                                                          </span>
                                                                      ) : (
                                                                          <span key={idx}>{part}</span>
                                                                      )
                                                                  )
                                                            : line.map((token, key) => (
                                                                  <span key={key} {...getTokenProps({ token, key })} />
                                                              ))}
                                                    </span>
                                                </div>
                                            )
                                        })}
                                    </pre>
                                )}
                            </Highlight>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Step 2: Create endpoint */}
            <button
                onClick={() => toggleStep(2)}
                className="w-full px-4 py-2.5 border-t border-primary bg-primary flex items-center justify-between hover:bg-accent"
            >
                <div className="flex items-center gap-2">
                    <span className="size-5 rounded-full bg-red/15 text-red dark:text-yellow text-xs font-bold flex items-center justify-center">
                        2
                    </span>
                    <span className="text-sm font-semibold text-primary">Create your endpoint</span>
                </div>
                <IconChevronDown
                    className={`size-4 text-muted transition-transform ${openSteps.has(2) ? 'rotate-180' : ''}`}
                />
            </button>
            <AnimatePresence>
                {openSteps.has(2) && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 py-4 bg-primary flex flex-col @sm:flex-row @sm:items-end @sm:justify-between gap-4">
                            <div>
                                <div className="text-xs text-secondary mb-1.5">Endpoint path</div>
                                <div className="flex items-center text-sm font-mono text-primary">
                                    <span className="">/api/endpoints/</span>
                                    <AutosizeInput
                                        value={endpointName}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setEndpointName(e.target.value)
                                        }
                                        inputClassName="bg-accent dark:bg-accent-dark border border-primary text-red dark:text-yellow rounded px-1.5 py-0.5 focus:outline-none focus:border-red dark:focus:border-yellow"
                                    />
                                    <span className="">/run</span>
                                </div>
                            </div>
                            <OSButton
                                variant="primary"
                                size="md"
                                onClick={handleCreateEndpoint}
                                disabled={isCreating || !endpointName.trim()}
                            >
                                {isCreating ? 'Creating...' : 'Create endpoint'}
                            </OSButton>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Step 3: Query endpoint */}
            <button
                onClick={() => endpointCreated && toggleStep(3)}
                disabled={!endpointCreated}
                className="w-full px-4 py-2.5 border-t border-primary bg-primary flex items-center justify-between hover:bg-accent disabled:bg-accent disabled:cursor-not-allowed disabled:hover:bg-accent"
            >
                <div className="flex items-center gap-2">
                    <span className="size-5 rounded-full bg-red/15 text-red dark:text-yellow text-xs font-bold flex items-center justify-center">
                        3
                    </span>
                    <span className="text-sm font-semibold text-primary">Query your endpoint</span>
                </div>
                <IconChevronDown
                    className={`size-4 text-muted transition-transform ${openSteps.has(3) ? 'rotate-180' : ''}`}
                />
            </button>
            <AnimatePresence>
                {openSteps.has(3) && endpointCreated && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        {/* URL */}
                        <div className="px-4 py-4 bg-primary border-b border-primary">
                            <div className="text-xs text-secondary mb-1.5">API request</div>
                            <code className="text-sm font-mono flex items-center flex-wrap gap-y-1 py-1 px-2">
                                <span className="text-green font-semibold">GET</span>
                                <span className="text-muted ml-1">/api/endpoints/</span>
                                <span className="text-red dark:text-yellow">{createdEndpointName}</span>
                                <span className="text-muted">/run?</span>
                                <span className="text-primary">{selectedScenario.variable.name}=</span>
                                <span className="relative inline-flex">
                                    <button
                                        onClick={() => setVariableDropdownOpen(!variableDropdownOpen)}
                                        className="inline-flex items-center gap-1 text-red dark:text-yellow bg-accent dark:bg-accent-dark border border-primary rounded px-1.5 py-0.5 hover:border-red dark:hover:border-yellow "
                                    >
                                        <span>{selectedVariable.id}</span>
                                        <IconChevronDown
                                            className={`size-3 text-muted transition-transform ${
                                                variableDropdownOpen ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {variableDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -4 }}
                                                transition={{ duration: 0.1 }}
                                                className="absolute top-full left-0 mt-1 bg-primary border border-primary rounded-md shadow-lg z-10 overflow-hidden min-w-[140px]"
                                            >
                                                {selectedScenario.variable.options.map((option) => (
                                                    <button
                                                        key={option.id}
                                                        onClick={() => handleVariableChange(option)}
                                                        className={`w-full text-left px-3 py-2 text-sm font-mono hover:bg-accent  ${
                                                            option.id === selectedVariable.id
                                                                ? 'text-red dark:text-yellow'
                                                                : 'text-primary'
                                                        }`}
                                                    >
                                                        {option.id}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </span>
                            </code>
                        </div>

                        {/* Response JSON */}
                        <div className="bg-accent p-4 font-mono text-sm overflow-auto max-h-[280px]">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-secondary">Response</span>
                                <span className="text-xs text-green font-medium">200 OK</span>
                            </div>
                            <motion.div
                                key={selectedVariable.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isLoading ? 0.5 : 1 }}
                                transition={{ duration: 0.15 }}
                            >
                                <Highlight
                                    {...defaultProps}
                                    code={JSON.stringify(response, null, 2)}
                                    language="json"
                                    theme={codeTheme}
                                >
                                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                                        <pre
                                            className={`${className} !bg-transparent m-0`}
                                            style={{ ...style, background: 'transparent' }}
                                        >
                                            {tokens.map((line, i) => (
                                                <div key={i} {...getLineProps({ line, key: i })}>
                                                    {line.map((token, key) => (
                                                        <span key={key} {...getTokenProps({ token, key })} />
                                                    ))}
                                                </div>
                                            ))}
                                        </pre>
                                    )}
                                </Highlight>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
