import React, { useState, useEffect } from 'react'
import { CallToAction } from 'components/CallToAction'
import { useToast } from 'hooks/toast'
import { SEO } from 'components/seo'
import Layout from 'components/Layout'
import { CspEvaluator, DEFAULT_CHECKS } from 'csp_evaluator/dist/evaluator.js'
import { CspParser } from 'csp_evaluator/dist/parser.js'
import { Finding, Severity, Type } from 'csp_evaluator/dist/finding'
import { Chevron, Issue } from 'components/Icons'
import { IconX, IconInfo, IconQuestion } from '@posthog/icons'
import { CheckCircleIcon } from '@heroicons/react/outline'
import Confetti from 'react-confetti'
import { StickerPineapple, StickerPineappleNo } from 'components/Stickers/Index'
import { Csp, Version } from 'csp_evaluator/dist/csp'

// Constants
const PINEAPPLE_DIRECTIVE = 'pineapple-on-pizza'
const SAMPLE_POLICIES = {
    medium: `default-src 'self'; script-src 'self' https://*.posthog.com http://localhost:8010; connect-src 'self' https://*.posthog.com http://localhost:8010; img-src 'self' data:; style-src 'self'; report-uri http://localhost:8010/csp?token=phc_Pv7thRPMKG4x2lOBamiZHgo5kDW7vuGJeWqp978dlFg&pid=0196e0ff-cf85-70a1-a6d6-936afb5eb171`,
    high: `default-src 'self'; script-src 'self' 'unsafe-inline' https://*.posthog.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.posthog.com https://res.cloudinary.com https://www.gravatar.com; font-src 'self'; connect-src 'self' https://*.posthog.com https://api.github.com https://lottie.host https://better-animal-d658c56969.strapiapp.app; media-src 'self' https://www.youtube-nocookie.com; frame-src 'self' https://d1hovhsvet4m1p.cloudfront.net; report-uri https://app.posthog.com/csp?token=sTMPFsFhdP1Ssg&sample_rate=0.1&v=1; report-to posthog`,
    safe: `default-src 'none'; script-src 'nonce-random123' 'strict-dynamic'; object-src 'none'; base-uri 'none'; frame-ancestors 'self'; form-action 'self'; require-trusted-types-for 'script'`,
    pineapple: `default-src 'none'; script-src 'nonce-random123' 'strict-dynamic'; object-src 'none'; base-uri 'none'; frame-ancestors 'self'; form-action 'self'; require-trusted-types-for 'script'; ${PINEAPPLE_DIRECTIVE} 'yes'`,
}

type DirectiveStatus = 'ok' | 'error' | 'warning' | 'syntax' | 'info'

interface DirectiveInfo {
    isExpanded: boolean
    status: DirectiveStatus
    values: string[]
    findings: Finding[]
    isInPolicy: boolean
}

interface ProcessedCspPolicy {
    directives: Record<string, DirectiveInfo>
    parsedCsp?: Csp
    isValid: boolean
}

const SEVERITY_TYPES = {
    [Severity.HIGH]: {
        key: 'error',
        label: 'High severity finding',
        color: 'text-[#f51000]',
        icon: Issue,
    },
    [Severity.MEDIUM]: {
        key: 'warning',
        label: 'Medium severity finding',
        color: 'text-yellow',
        icon: Issue,
    },
    [Severity.HIGH_MAYBE]: {
        key: 'warning',
        label: 'Possible high severity finding',
        color: 'text-red',
        icon: IconQuestion,
    },
    [Severity.SYNTAX]: {
        key: 'syntax',
        label: 'Syntax error',
        color: 'text-purple',
        icon: IconX,
    },
    [Severity.INFO]: {
        key: 'info',
        label: 'Information',
        color: 'text-blue',
        icon: IconInfo,
    },
    [Severity.MEDIUM_MAYBE]: {
        key: 'info',
        label: 'Possible medium severity finding',
        color: 'text-yellow',
        icon: IconQuestion,
    },
    [Severity.NONE]: {
        key: 'ok',
        label: 'All good',
        color: 'text-green',
        icon: CheckCircleIcon,
    },
}

const createPineappleFinding = (): Finding => {
    return new Finding(
        Type.UNKNOWN_DIRECTIVE,
        "Thankfully, 'pineapple-on-pizza' is an unknown directive and will be ignored, but we're flagging it as high severity to keep the internet safe!",
        Severity.HIGH,
        PINEAPPLE_DIRECTIVE
    )
}

const deduplicateFindings = (findings: Finding[]): Finding[] => {
    return Array.from(new Map(findings.map((finding) => [JSON.stringify(finding), finding])).values())
}

const processCspPolicy = (
    cspPolicy: string,
    cspVersion: number,
    currentDirectives: Record<string, DirectiveInfo> = {}
): ProcessedCspPolicy => {
    try {
        const parsedCsp = new CspParser(cspPolicy).csp
        const results = evaluateCspPolicy(cspPolicy, cspVersion)

        const findingsByDirective: Record<string, Finding[]> = results.reduce((acc, finding) => {
            if (!acc[finding.directive]) {
                acc[finding.directive] = []
            }
            acc[finding.directive].push(finding)
            return acc
        }, {} as Record<string, Finding[]>)

        // Process all directives from both the parsed policy and findings
        const allDirectiveNames = getSortedUniqueDirectives([
            Object.keys(parsedCsp.directives),
            results.map((f) => f.directive),
        ])

        const newDirectives: Record<string, DirectiveInfo> = {}

        allDirectiveNames.forEach((directive) => {
            const isInPolicy = Object.keys(parsedCsp.directives).includes(directive)
            const directiveFindings = findingsByDirective[directive] || []

            let status: DirectiveStatus = 'ok'
            if (directiveFindings.length > 0) {
                const severityTypes = directiveFindings.map(evaluationFindingToSeverityType)
                const highestSeverity = severityTypes.sort()[0]
                status =
                    (SEVERITY_TYPES[highestSeverity as keyof typeof SEVERITY_TYPES]?.key as DirectiveStatus) || 'ok'
            }

            const isExpanded = currentDirectives[directive]?.isExpanded || false

            newDirectives[directive] = {
                isExpanded,
                status,
                values: parsedCsp.directives[directive] || [],
                findings: directiveFindings,
                isInPolicy,
            }
        })

        return {
            directives: newDirectives,
            parsedCsp,
            isValid: true,
        }
    } catch (error) {
        return {
            directives: {},
            parsedCsp: undefined,
            isValid: false,
        }
    }
}

const evaluateCspPolicy = (cspPolicy: string, version = 3): Finding[] => {
    try {
        const parsed = new CspParser(cspPolicy).csp

        if (parsed.directives[PINEAPPLE_DIRECTIVE]) {
            return [createPineappleFinding()]
        }

        const findings = new CspEvaluator(parsed, version).evaluate(DEFAULT_CHECKS)
        return deduplicateFindings(findings)
    } catch {
        return []
    }
}

const getSortedUniqueDirectives = (arrays: string[][]): string[] => {
    return Array.from(new Set(arrays.flat())).sort((a, b) => a.localeCompare(b))
}

function evaluationFindingToSeverityType(finding: Finding): Severity {
    if (finding.severity == Severity.STRICT_CSP) {
        return Severity.MEDIUM_MAYBE
    }

    if (finding.severity in SEVERITY_TYPES) {
        return finding.severity
    }

    return Severity.NONE
}

function getSeverityTypeByKey(key: string) {
    return Object.values(SEVERITY_TYPES).find((s) => s.key === key) || SEVERITY_TYPES[Severity.NONE]
}

function severityToString(finding: Finding): string {
    const severityType = evaluationFindingToSeverityType(finding)
    return SEVERITY_TYPES[severityType as keyof typeof SEVERITY_TYPES]?.key || 'ok'
}

function getStatusColor(status: string): string {
    return getSeverityTypeByKey(status).color
}

function SeverityIcon({ type }: { type: string }): JSX.Element {
    const severityType = getSeverityTypeByKey(type)
    const IconComponent = severityType.icon
    return <IconComponent className={`${severityType.color} size-5 min-w-5`} />
}

function EvaluationForm({
    cspPolicy,
    setCspPolicy,
    onEvaluate,
}: {
    cspPolicy: string
    setCspPolicy: (policy: string) => void
    onEvaluate: () => void
}): JSX.Element {
    return (
        <>
            <div className="mb-4">
                <div className="flex justify-end space-x-4 mb-2">
                    <button
                        onClick={() => setCspPolicy(SAMPLE_POLICIES.high)}
                        className="text-[#f51000] hover:underline"
                    >
                        Sample unsafe policy
                    </button>
                    <button
                        onClick={() => setCspPolicy(SAMPLE_POLICIES.medium)}
                        className="text-yellow hover:underline"
                    >
                        Sample mixed policy
                    </button>
                    <button onClick={() => setCspPolicy(SAMPLE_POLICIES.safe)} className="text-green hover:underline">
                        Sample safe policy
                    </button>
                    <button
                        onClick={() => setCspPolicy(SAMPLE_POLICIES.pineapple)}
                        className="text-[#f51000] hover:underline"
                    >
                        <StickerPineapple className="w-8 h-8" />
                    </button>
                </div>
                <textarea
                    value={cspPolicy}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCspPolicy(e.target.value)}
                    placeholder="Enter your CSP policy here..."
                    className="w-full h-32 p-3 border border-gray-300 rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white font-mono text-sm"
                />
            </div>

            <div className="w-full sm:w-auto">
                <CallToAction onClick={onEvaluate} className="w-full" size="sm" type="secondary">
                    Check Policy
                </CallToAction>
            </div>
        </>
    )
}

function ResultDetail({ finding }: { finding: Finding }): JSX.Element {
    const findingType = severityToString(finding)

    return (
        <div className="px-4 py-2 grid grid-cols-10 gap-x-4 items-start">
            <div className="flex items-start gap-2 pl-8 col-span-3 break-all">
                <SeverityIcon type={findingType} />
                {finding.value ? (
                    <span className={`font-mono text-sm`}>{finding.value}</span>
                ) : (
                    <span className={`font-mono text-sm`}>[missing]</span>
                )}
            </div>
            <div className="text-gray-700 dark:text-gray-300 col-span-7">{finding.description}</div>
        </div>
    )
}

function DirectiveValue({ value }: { value: string }): JSX.Element {
    return (
        <div className="px-4 py-2 grid grid-cols-10 gap-x-4 items-start">
            <div className="flex items-start gap-2 pl-8 col-span-3">
                <SeverityIcon type="ok" />
                <span className={`font-mono text-sm`}>{value}</span>
            </div>
            <div className="text-gray-700 dark:text-gray-300 text-sm col-span-7"></div>
        </div>
    )
}

function Legend(): JSX.Element {
    return (
        <div className="mt-8 p-4 border border-gray-200 rounded-md">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Legend</h3>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                {Object.values(SEVERITY_TYPES).map((severity) => {
                    const IconComponent = severity.icon
                    return (
                        <div key={severity.key + severity.label} className="flex items-center gap-2">
                            <IconComponent className={`${severity.color} size-5`} />
                            <span>{severity.label}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function DirectivePanel({
    directive,
    findings,
    values,
    missingNote,
}: {
    directive: string
    findings: Finding[]
    values: string[]
    missingNote?: Finding
}): JSX.Element {
    return (
        <div id={`panel-${directive}`} role="region" aria-labelledby={`header-${directive}`}>
            {findings.length > 0
                ? findings
                      .filter((f) => !missingNote || f.description !== missingNote.description)
                      .map((finding, index) => <ResultDetail key={index} finding={finding} />)
                : values.map((value, index) => <DirectiveValue key={index} value={value} />)}
        </div>
    )
}

function DirectiveResult({
    directive,
    directiveInfo,
    toggleDirective,
}: {
    directive: string
    directiveInfo: DirectiveInfo
    toggleDirective: (directive: string) => void
}): JSX.Element {
    const missingNote = directiveInfo.findings.find((f) => !f.value)
    const statusColor = getStatusColor(directiveInfo.status)
    const isPineappleDirective = directive === PINEAPPLE_DIRECTIVE

    return (
        <div className="border-b border-gray last:border-b-0">
            <button
                id={`header-${directive}`}
                className="w-full flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 text-left"
                onClick={() => toggleDirective(directive)}
                aria-expanded={directiveInfo.isExpanded}
                aria-controls={`panel-${directive}`}
            >
                <div className="flex items-center gap-2">
                    {isPineappleDirective ? (
                        <StickerPineappleNo className="w-6 min-w-6" />
                    ) : (
                        <SeverityIcon type={directiveInfo.status} />
                    )}
                    <span className={`font-bold ${statusColor} min-w-60`}>{directive}</span>
                    <span>{missingNote?.description || ''}</span>
                </div>
                <div className="min-w-5">
                    <Chevron
                        className={`w-4 h-4 min-w-4 text-gray-500 transition-transform duration-200 ${
                            directiveInfo.isExpanded ? 'rotate-180' : ''
                        }`}
                    />
                </div>
            </button>

            <div className={`${directiveInfo.isExpanded ? 'block' : 'hidden'}`}>
                <DirectivePanel
                    directive={directive}
                    findings={directiveInfo.findings}
                    values={directiveInfo.values}
                    missingNote={missingNote}
                />
            </div>
        </div>
    )
}

function CSPResults({
    directives,
    cspVersion,
    toggleDirective,
    toggleAllDirectives,
}: {
    directives: Record<string, DirectiveInfo>
    cspVersion: number
    toggleDirective: (directive: string) => void
    toggleAllDirectives: () => void
}): JSX.Element | null {
    const directivesList = Object.keys(directives).sort((a, b) => a.localeCompare(b))

    if (directivesList.length === 0) {
        return null
    }

    return (
        <>
            <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Results considering CSP version {cspVersion}
                    </h3>
                    <button className="text-red-500 hover:underline" onClick={toggleAllDirectives}>
                        expand/collapse all
                    </button>
                </div>

                <div className="border border-gray-200 rounded-md overflow-hidden">
                    {directivesList.map((directive) => (
                        <DirectiveResult
                            key={directive}
                            directive={directive}
                            directiveInfo={directives[directive]}
                            toggleDirective={toggleDirective}
                        />
                    ))}
                </div>
            </div>

            <Legend />
        </>
    )
}

function CSPEvaluatorHero(): JSX.Element {
    const [cspPolicy, setCspPolicy] = useState('')
    const [cspVersion] = useState(Version.CSP3)
    const [directives, setDirectives] = useState<Record<string, DirectiveInfo>>({})
    const [showConfetti, setShowConfetti] = useState(false)
    const { addToast } = useToast()

    useEffect(() => {
        if (Object.keys(directives).length > 0) {
            const allGood = Object.values(directives).every((d) => d.status === 'ok')
            setShowConfetti(allGood)
        }
    }, [directives])

    const handleEvaluate = () => {
        if (!cspPolicy) {
            addToast({ message: 'Please enter a CSP policy to evaluate', error: true })
            return
        }

        const result = processCspPolicy(cspPolicy, cspVersion, directives)

        if (!result.isValid) {
            addToast({ message: 'Please enter a valid CSP policy', error: true })
            return
        }

        setDirectives(result.directives)
    }

    const toggleDirective = (directive: string) => {
        setDirectives((prev) => ({
            ...prev,
            [directive]: {
                ...prev[directive],
                isExpanded: !prev[directive].isExpanded,
            },
        }))
    }

    const toggleAllDirectives = () => {
        const allExpanded = Object.values(directives).every((d) => d.isExpanded)

        setDirectives((prev) => {
            const newState = { ...prev }
            Object.keys(newState).forEach((directive) => {
                newState[directive] = {
                    ...newState[directive],
                    isExpanded: !allExpanded,
                }
            })
            return newState
        })
    }

    return (
        <section className="py-12 relative">
            {showConfetti && <Confetti recycle={false} numberOfPieces={1000} />}
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:px-12">
                <div className="flex flex-col md:flex-row justify-center items-center mb-8 gap-6">
                    <h1 className="text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
                        CSP Evaluator
                    </h1>
                </div>

                <div className="mb-8">
                    <p className="text-lg mb-2 text-gray-700 dark:text-gray-300">
                        We provide this utility to give you a quick way to check your Content Security Policy (CSP) and
                        ensure it properly protects against{' '}
                        <a
                            href="https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting"
                            className="text-red-500 hover:underline"
                        >
                            cross-site scripting attacks
                        </a>
                        .
                    </p>
                    <p className="text-lg mb-2 text-gray-700 dark:text-gray-300">
                        This tool is built using the{' '}
                        <a href="https://www.npmjs.com/package/csp_evaluator" className="text-blue-500 hover:underline">
                            csp_evaluator
                        </a>{' '}
                        library and helps you identify potential weaknesses in your policies that might be exploited. It
                        simplifies the typically manual process of reviewing CSP policies and provides recommendations
                        to strengthen your security posture.
                    </p>
                </div>

                <EvaluationForm cspPolicy={cspPolicy} setCspPolicy={setCspPolicy} onEvaluate={handleEvaluate} />

                <CSPResults
                    directives={directives}
                    cspVersion={cspVersion}
                    toggleDirective={toggleDirective}
                    toggleAllDirectives={toggleAllDirectives}
                />
            </div>
        </section>
    )
}

function CSPEvaluator(): JSX.Element {
    return (
        <Layout headerBlur={false}>
            <SEO
                title="PostHog - CSP Evaluator"
                description="Understand your Content Security Policy (CSP) and evaluate its effectiveness against common threats"
            />
            <CSPEvaluatorHero />
        </Layout>
    )
}

export default CSPEvaluator
