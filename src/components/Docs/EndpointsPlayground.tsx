import React, { useState } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { darkTheme, lightTheme } from 'components/CodeBlock/theme'
import { useApp } from '../../context/App'
import { IconChevronDown, IconTerminal } from '@posthog/icons'
import { AnimatePresence, motion } from 'framer-motion'
import OSButton from 'components/OSButton'

const sqlQuery = `SELECT
    toDate(timestamp) AS date,
    count() AS event_count
FROM events
WHERE
    properties.customer_id = {variables.customer_id}
GROUP BY date
ORDER BY date`

const customers = [
    { id: 'acme-corp', name: 'Acme Corp' },
    { id: 'globex', name: 'Globex Inc' },
    { id: 'initech', name: 'Initech' },
    { id: 'umbrella', name: 'Umbrella Co' },
]

const hashString = (str: string): number => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i)
        hash = hash & hash
    }
    return Math.abs(hash)
}

const generateResponse = (customerId: string) => {
    const seed = hashString(customerId)
    const baseCount = 60 + (seed % 120)
    const results = []
    const startDate = new Date('2026-02-12')

    for (let i = 0; i < 5; i++) {
        const date = new Date(startDate)
        date.setDate(date.getDate() + i)
        const variance = ((seed * (i + 1)) % 60) - 30
        results.push({
            date: date.toISOString().split('T')[0],
            event_count: Math.max(baseCount + variance, 15),
        })
    }

    return { results }
}

export default function EndpointsPlayground(): JSX.Element {
    const { siteSettings } = useApp()
    const websiteTheme = siteSettings?.theme || 'light'
    const codeTheme = websiteTheme === 'dark' ? darkTheme : lightTheme

    const [openSteps, setOpenSteps] = useState<Set<number>>(new Set([1, 2]))
    const [hasInteracted, setHasInteracted] = useState(false)
    const [endpointName, setEndpointName] = useState('customer_events')
    const [createdEndpointName, setCreatedEndpointName] = useState('')
    const [selectedCustomer, setSelectedCustomer] = useState(customers[0])
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [response, setResponse] = useState(generateResponse(customers[0].id))
    const [isLoading, setIsLoading] = useState(false)
    const [isCreating, setIsCreating] = useState(false)
    const [endpointCreated, setEndpointCreated] = useState(false)

    const toggleStep = (step: number) => {
        setHasInteracted(true)
        if (hasInteracted) {
            // After first interaction, exclusive mode
            if (openSteps.has(step)) {
                setOpenSteps(new Set())
            } else {
                setOpenSteps(new Set([step]))
            }
        } else {
            // First interaction - just toggle to the clicked step
            setOpenSteps(new Set([step]))
        }
    }

    const handleCreateEndpoint = () => {
        setIsCreating(true)
        setTimeout(() => {
            setIsCreating(false)
            setEndpointCreated(true)
            setCreatedEndpointName(endpointName)
            setHasInteracted(true)
            setOpenSteps(new Set([3]))
        }, 500)
    }

    const handleCustomerChange = (customer: (typeof customers)[0]) => {
        setSelectedCustomer(customer)
        setDropdownOpen(false)
        setIsLoading(true)

        setTimeout(() => {
            setResponse(generateResponse(customer.id))
            setIsLoading(false)
        }, 300)
    }

    return (
        <div className="rounded-md border border-primary overflow-hidden">
            {/* Step 1: Query */}
            <button
                onClick={() => toggleStep(1)}
                className="w-full px-4 py-2.5 bg-primary flex items-center justify-between hover:bg-accent/30 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <span className="size-5 rounded-full bg-orange/15 text-orange text-xs font-bold flex items-center justify-center">
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
                        <div className="bg-accent dark:bg-accent-dark p-4 font-mono text-sm overflow-auto">
                            <Highlight {...defaultProps} code={sqlQuery} language="sql" theme={codeTheme}>
                                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                                    <pre
                                        className={`${className} !bg-transparent m-0 p-0`}
                                        style={{ ...style, background: 'transparent' }}
                                    >
                                        {tokens.map((line, i) => (
                                            <div key={i} {...getLineProps({ line, key: i })} className="table-row">
                                                <span className="table-cell pr-4 text-muted select-none text-right w-6">
                                                    {i + 1}
                                                </span>
                                                <span className="table-cell">
                                                    {line.map((token, key) => (
                                                        <span key={key} {...getTokenProps({ token, key })} />
                                                    ))}
                                                </span>
                                            </div>
                                        ))}
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
                className="w-full px-4 py-2.5 border-t border-primary bg-primary flex items-center justify-between hover:bg-accent/30 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <span className="size-5 rounded-full bg-orange/15 text-orange text-xs font-bold flex items-center justify-center">
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
                                    <span className="text-muted">/api/endpoints/</span>
                                    <input
                                        type="text"
                                        value={endpointName}
                                        onChange={(e) => setEndpointName(e.target.value)}
                                        className="bg-accent dark:bg-accent-dark border border-primary text-orange rounded px-1.5 py-0.5 focus:outline-none focus:border-orange w-[160px]"
                                    />
                                    <span className="text-muted">/run</span>
                                </div>
                            </div>
                            <OSButton
                                variant="primary"
                                size="md"
                                onClick={handleCreateEndpoint}
                                disabled={isCreating || !endpointName.trim()}
                                icon={<IconTerminal />}
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
                className="w-full px-4 py-2.5 border-t border-primary bg-primary flex items-center justify-between hover:bg-accent/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
            >
                <div className="flex items-center gap-2">
                    <span className="size-5 rounded-full bg-orange/15 text-orange text-xs font-bold flex items-center justify-center">
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
                                <span className="text-orange">{createdEndpointName}</span>
                                <span className="text-muted">/run?</span>
                                <span className="text-primary">customer_id=</span>
                                <span className="relative inline-flex">
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="inline-flex items-center gap-1 text-orange bg-accent dark:bg-accent-dark border border-primary rounded px-1.5 py-0.5 hover:border-orange transition-colors"
                                    >
                                        <span>{selectedCustomer.id}</span>
                                        <IconChevronDown
                                            className={`size-3 text-muted transition-transform ${
                                                dropdownOpen ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {dropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -4 }}
                                                transition={{ duration: 0.1 }}
                                                className="absolute top-full left-0 mt-1 bg-primary border border-primary rounded-md shadow-lg z-10 overflow-hidden min-w-[140px]"
                                            >
                                                {customers.map((customer) => (
                                                    <button
                                                        key={customer.id}
                                                        onClick={() => handleCustomerChange(customer)}
                                                        className={`w-full text-left px-3 py-2 text-sm font-mono hover:bg-accent transition-colors ${
                                                            customer.id === selectedCustomer.id
                                                                ? 'text-orange'
                                                                : 'text-primary'
                                                        }`}
                                                    >
                                                        {customer.id}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </span>
                            </code>
                        </div>

                        {/* Response JSON */}
                        <div className="bg-accent dark:bg-accent-dark p-4 font-mono text-sm overflow-auto">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-secondary">Response</span>
                                <span className="text-xs text-green font-medium">200 OK</span>
                            </div>
                            <motion.div
                                key={selectedCustomer.id}
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
