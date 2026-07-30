import React, { useState } from 'react'

/**
 * Interactive CIMD client registration for the provisioning docs.
 *
 * Two steps, deliberately in this order: read the document back so a partner can see what they
 * actually published before anything is created, then register per region.
 *
 * Registration posts straight from the browser rather than through a proxy on our side. That is
 * not incidental: the endpoint is rate limited per IP, so proxying would pool every reader behind
 * posthog.com's address and let them exhaust each other's budget.
 */

const REGIONS = [
    { key: 'us', label: 'US', host: 'https://us.posthog.com' },
    { key: 'eu', label: 'EU', host: 'https://eu.posthog.com' },
] as const

type RegionKey = (typeof REGIONS)[number]['key']

interface Check {
    name: string
    ok: boolean
    detail: string
}

interface RegistrationResult {
    status: 'ok' | 'error'
    registered?: boolean
    clientType?: string
    authMethod?: string
    capabilities?: Record<string, boolean>
    checks?: Check[]
    message?: string
}

const CODE = 'font-code text-[13px]'

function Row({ ok, children }: { ok: boolean; children: React.ReactNode }): JSX.Element {
    return (
        <li className="flex gap-2 items-baseline">
            <span className={ok ? 'text-green' : 'text-red'} aria-hidden="true">
                {ok ? '✓' : '✗'}
            </span>
            <span>{children}</span>
        </li>
    )
}

export default function CIMDRegistration(): JSX.Element {
    const [url, setUrl] = useState('')
    const [documentJson, setDocumentJson] = useState<string | null>(null)
    const [documentNotes, setDocumentNotes] = useState<Check[]>([])
    const [fetchError, setFetchError] = useState<string | null>(null)
    const [fetching, setFetching] = useState(false)
    const [results, setResults] = useState<Partial<Record<RegionKey, RegistrationResult>>>({})
    const [registering, setRegistering] = useState<RegionKey | null>(null)

    const trimmedUrl = url.trim()

    async function fetchDocument(): Promise<void> {
        setFetching(true)
        setFetchError(null)
        setDocumentJson(null)
        setDocumentNotes([])
        setResults({})

        try {
            const response = await fetch(trimmedUrl)
            const text = await response.text()
            let parsed: Record<string, unknown>
            try {
                parsed = JSON.parse(text)
            } catch {
                setFetchError('That URL returned something that is not JSON.')
                return
            }

            setDocumentJson(JSON.stringify(parsed, null, 2))

            // Local sanity checks only. PostHog re-validates everything server-side during
            // registration, so these exist to catch the two mistakes that are easiest to make.
            const authMethod = (parsed.token_endpoint_auth_method as string) || 'none'
            const notes: Check[] = [
                {
                    name: 'client_id matches this URL',
                    ok: parsed.client_id === trimmedUrl,
                    detail:
                        parsed.client_id === trimmedUrl
                            ? 'Exact match'
                            : `Document says ${
                                  String(parsed.client_id) || '(missing)'
                              }, which must equal the URL exactly`,
                },
                {
                    name: 'redirect_uris present',
                    ok: Array.isArray(parsed.redirect_uris) && parsed.redirect_uris.length > 0,
                    detail:
                        Array.isArray(parsed.redirect_uris) && parsed.redirect_uris.length > 0
                            ? (parsed.redirect_uris as string[]).join(', ')
                            : 'At least one HTTPS redirect URI is required',
                },
            ]

            if (authMethod === 'private_key_jwt') {
                const jwks = parsed.jwks_uri as string | undefined
                notes.push({
                    name: 'jwks_uri for private_key_jwt',
                    ok: Boolean(jwks && jwks.startsWith('https://')),
                    detail: jwks
                        ? `${jwks}${jwks.startsWith('https://') ? '' : ' (must be https)'}`
                        : 'private_key_jwt requires a jwks_uri',
                })
            } else {
                notes.push({
                    name: 'Public client',
                    ok: true,
                    detail: 'token_endpoint_auth_method is "none", so this client relies on PKCE and cannot use the GitHub grant endpoints',
                })
            }

            setDocumentNotes(notes)
        } catch {
            // Almost always CORS: a .well-known file rarely sends Access-Control-Allow-Origin.
            // Not a problem for registration, which fetches the document server-side, so say so
            // rather than making it look like a failure.
            setFetchError(
                'Could not read that URL from your browser. This is usually CORS, since a metadata document does not normally allow cross-origin reads, and it does not affect registration: PostHog fetches the document server-side. You can register below anyway.'
            )
        } finally {
            setFetching(false)
        }
    }

    async function register(region: (typeof REGIONS)[number]): Promise<void> {
        setRegistering(region.key)
        try {
            const response = await fetch(`${region.host}/api/agentic/provisioning/client_registration`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ client_id: trimmedUrl }),
            })
            const json = await response.json().catch(() => null)

            setResults((prev) => ({
                ...prev,
                [region.key]: {
                    status: json?.registered ? 'ok' : 'error',
                    registered: Boolean(json?.registered),
                    clientType: json?.client_type,
                    authMethod: json?.token_endpoint_auth_method,
                    capabilities: json?.capabilities,
                    checks: json?.checks,
                    message: json?.error?.message || (json ? undefined : `HTTP ${response.status}`),
                },
            }))
        } catch (error) {
            setResults((prev) => ({
                ...prev,
                [region.key]: {
                    status: 'error',
                    message: `Request failed: ${(error as Error).message}`,
                },
            }))
        } finally {
            setRegistering(null)
        }
    }

    const canSubmit = trimmedUrl.startsWith('https://') && !fetching

    return (
        <div className="border border-light dark:border-dark rounded p-4 my-4 bg-accent dark:bg-accent-dark">
            <label className="block font-bold mb-2" htmlFor="cimd-url">
                Your metadata document URL
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    id="cimd-url"
                    type="url"
                    className={`flex-1 px-3 py-2 rounded border border-light dark:border-dark bg-white dark:bg-dark ${CODE}`}
                    placeholder="https://yourapp.com/.well-known/oauth-client.json"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' && canSubmit) {
                            void fetchDocument()
                        }
                    }}
                />
                <button
                    className="px-4 py-2 rounded bg-red text-white font-bold disabled:opacity-50"
                    disabled={!canSubmit}
                    onClick={() => void fetchDocument()}
                >
                    {fetching ? 'Fetching…' : 'Fetch document'}
                </button>
            </div>
            {trimmedUrl !== '' && !trimmedUrl.startsWith('https://') && (
                <p className="text-sm text-red mt-2 mb-0">A metadata document URL has to use HTTPS.</p>
            )}

            {fetchError && <p className="text-sm mt-3 mb-0 opacity-80">{fetchError}</p>}

            {documentJson && (
                <>
                    <p className="font-bold mt-4 mb-1">What we read at that URL</p>
                    <pre className="max-h-80 overflow-auto text-[13px] mb-3">
                        <code>{documentJson}</code>
                    </pre>
                    <ul className="list-none pl-0 space-y-1 text-sm mb-0">
                        {documentNotes.map((note) => (
                            <Row key={note.name} ok={note.ok}>
                                <strong>{note.name}.</strong> {note.detail}
                            </Row>
                        ))}
                    </ul>
                </>
            )}

            {(documentJson || fetchError) && (
                <>
                    <p className="font-bold mt-4 mb-1">Register</p>
                    <p className="text-sm opacity-80 mt-0 mb-2">
                        US and EU are separate deployments with separate databases. Register in each region you serve,
                        because we will not do the other one for you.
                    </p>
                    <div className="flex gap-2 flex-wrap">
                        {REGIONS.map((region) => (
                            <button
                                key={region.key}
                                className="px-4 py-2 rounded border border-light dark:border-dark font-bold disabled:opacity-50"
                                disabled={registering !== null || !trimmedUrl.startsWith('https://')}
                                onClick={() => void register(region)}
                            >
                                {registering === region.key
                                    ? `Registering in ${region.label}…`
                                    : `Register in ${region.label}`}
                            </button>
                        ))}
                    </div>

                    {REGIONS.filter((region) => results[region.key]).map((region) => {
                        const result = results[region.key] as RegistrationResult
                        return (
                            <div key={region.key} className="mt-3 pt-3 border-t border-light dark:border-dark">
                                <p className="font-bold mb-1">
                                    {region.label}{' '}
                                    <span className={result.registered ? 'text-green' : 'text-red'}>
                                        {result.registered ? 'registered' : 'not registered'}
                                    </span>
                                </p>
                                {result.registered && (
                                    <p className="text-sm mt-0 mb-1">
                                        <code>{result.clientType}</code> client using <code>{result.authMethod}</code>.
                                        GitHub grant endpoints:{' '}
                                        {result.capabilities?.github_grants ? 'available' : 'not available'}.
                                    </p>
                                )}
                                {result.message && <p className="text-sm mt-0 mb-1">{result.message}</p>}
                                {result.checks && result.checks.length > 0 && (
                                    <ul className="list-none pl-0 space-y-1 text-sm mb-0">
                                        {result.checks.map((check) => (
                                            <Row key={check.name} ok={check.ok}>
                                                <code>{check.name}</code> {check.detail}
                                            </Row>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )
                    })}
                </>
            )}
        </div>
    )
}
