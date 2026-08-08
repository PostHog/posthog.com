#!/usr/bin/env node
/**
 * Register posthog.com's CIMD client with PostHog, and report what PostHog makes of it.
 *
 * Registration is per region. Each region has its own database, so registering in the US does
 * not register in the EU, and a client that only registered in one will get a 401 from the
 * other. This script does both by default.
 *
 * Safe to re-run: it re-fetches the metadata document and re-runs every check, which makes it
 * the quickest way to confirm a change to the document or the signing key took effect.
 *
 * Usage:
 *   node bin/register-cimd-client.mjs                  # both regions
 *   node bin/register-cimd-client.mjs --region us       # one region
 *   node bin/register-cimd-client.mjs --no-assertion    # skip the signing check
 *
 * Env:
 *   CIMD_CLIENT_ID           defaults to https://posthog.com/.well-known/posthog.com.json
 *   CIMD_CLIENT_PRIVATE_KEY  optional here; without it the signing check is skipped
 *   CIMD_CLIENT_KEY_ID       required alongside the private key, and must match what
 *                            /api/oauth/jwks publishes
 */
import crypto from 'crypto'

const REGIONS = {
    us: 'https://us.posthog.com',
    eu: 'https://eu.posthog.com',
}

const CLIENT_ASSERTION_TYPE = 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer'

const args = process.argv.slice(2)
const regionArg = args.includes('--region') ? args[args.indexOf('--region') + 1] : null
const withAssertion = !args.includes('--no-assertion')

const clientId = process.env.CIMD_CLIENT_ID || 'https://posthog.com/.well-known/posthog.com.json'
const keyId = process.env.CIMD_CLIENT_KEY_ID
const privateKeyPem = process.env.CIMD_CLIENT_PRIVATE_KEY

if (privateKeyPem && !keyId) {
    console.error('CIMD_CLIENT_PRIVATE_KEY is set but CIMD_CLIENT_KEY_ID is not.')
    console.error('The kid has to match what /api/oauth/jwks publishes, so it cannot be guessed here.')
    process.exit(1)
}

const targets = regionArg ? { [regionArg]: REGIONS[regionArg] } : REGIONS
if (regionArg && !REGIONS[regionArg]) {
    console.error(`Unknown region "${regionArg}". Use one of: ${Object.keys(REGIONS).join(', ')}`)
    process.exit(1)
}

function clientAssertion(host) {
    const now = Math.floor(Date.now() / 1000)
    const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url')
    const input =
        b64({ alg: 'RS256', typ: 'JWT', kid: keyId }) +
        '.' +
        b64({
            iss: clientId,
            sub: clientId,
            // Addressed to the region being registered: an assertion minted for one region is
            // not accepted by the other.
            aud: `${host}/api/agentic/oauth/token`,
            jti: crypto.randomUUID(),
            iat: now,
            exp: now + 60,
        })
    const signature = crypto.sign('RSA-SHA256', Buffer.from(input), crypto.createPrivateKey(privateKeyPem))
    return `${input}.${signature.toString('base64url')}`
}

async function register(region, host) {
    const body = { client_id: clientId }
    if (withAssertion && privateKeyPem) {
        body.client_assertion = clientAssertion(host)
        body.client_assertion_type = CLIENT_ASSERTION_TYPE
    }

    const response = await fetch(`${host}/api/agentic/provisioning/client_registration`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })
    const json = await response.json().catch(() => null)

    console.log(`\n${region.toUpperCase()}  ${host}`)
    if (!json) {
        console.log(`  HTTP ${response.status} with no JSON body`)
        return false
    }

    for (const check of json.checks || []) {
        console.log(`  ${check.ok ? 'ok  ' : 'FAIL'}  ${check.name}: ${check.detail}`)
    }

    if (!json.registered) {
        console.log(`  not registered: ${json.error?.message || `HTTP ${response.status}`}`)
        return false
    }

    console.log(`  registered as ${json.client_type} (${json.token_endpoint_auth_method})`)
    console.log(
        `  github grants: ${json.capabilities?.github_grants ? 'allowed' : 'NOT allowed, this is a public client'}`
    )
    console.log(`  scope ceiling: ${(json.scopes || []).join(', ') || '(none declared)'}`)

    return (json.checks || []).every((check) => check.ok)
}

if (withAssertion && !privateKeyPem) {
    console.log('CIMD_CLIENT_PRIVATE_KEY is not set, so the signing check will be skipped.')
}

let allPassed = true
for (const [region, host] of Object.entries(targets)) {
    try {
        allPassed = (await register(region, host)) && allPassed
    } catch (error) {
        console.log(`\n${region.toUpperCase()}  ${host}\n  request failed: ${error.message}`)
        allPassed = false
    }
}

console.log('')
process.exit(allPassed ? 0 : 1)
