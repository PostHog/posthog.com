/**
 * File-backed mock ProvisioningClient (`WIZARD_DROP_MOCK=1`) so the entire drop flow — including
 * every failure branch in the RFC's error table — is walkable locally without the monorepo
 * endpoints existing.
 *
 * State lives in a JSON file under os.tmpdir() rather than module memory because Gatsby bundles
 * each function separately: the github/callback bundle (which creates grants) and the repos /
 * provision bundles (which read them) each get their own module instance, so in-memory state
 * would not be shared. Delete the file (or reboot) to reset scenarios.
 *
 * Magic repositories drive the scenarios:
 * - `mock-dev/happy-path`            → bundled provision succeeds (task + run ids)
 * - `mock-dev/wizard-fails`          → bundled wizard errors AND the granular retry fails → degraded
 * - `mock-dev/wizard-retry-succeeds` → bundled wizard errors, granular retry succeeds → success
 * - `mock-dev/existing-user`         → requires_auth whose URL round-trips through the local
 *                                      oauth-callback, exercising the consent detour
 * - `mock-dev/rate-limited`          → 429 with a retry-after
 *
 * Other behaviors:
 * - The first `createGithubGrant` call per state file simulates one `202 registering` delay.
 * - The first two `getGrantRepositories` calls per grant return `installed: false` to exercise
 *   the awaiting-install polling state.
 * - Grants expire after 60 minutes; `forceExpireGrant` powers the `?mock_expire=1` hook.
 */
import crypto from 'crypto'
import fs from 'fs'
import os from 'os'
import path from 'path'

import { config } from './config'
import { GrantExpiredError, ProvisioningClient, ProvisioningRequestError, RateLimitedError } from './provisioning'
import type { GrantRepository } from './types'

const GRANT_TTL_MS = 60 * 60 * 1000
const INSTALL_POLLS_BEFORE_DETECTED = 2
const STATE_FILE = path.join(os.tmpdir(), 'posthog-wizard-drop-mock-state.json')

// String to match the real upstream repositories listing, which emits installation ids as strings.
const MOCK_INSTALLATION_ID = '12345'
const REPOSITORIES: GrantRepository[] = [
    { full_name: 'mock-dev/happy-path', default_branch: 'main', installation_id: MOCK_INSTALLATION_ID, private: true },
    {
        full_name: 'mock-dev/wizard-fails',
        default_branch: 'main',
        installation_id: MOCK_INSTALLATION_ID,
        private: true,
    },
    {
        full_name: 'mock-dev/wizard-retry-succeeds',
        default_branch: 'main',
        installation_id: MOCK_INSTALLATION_ID,
        private: true,
    },
    {
        full_name: 'mock-dev/existing-user',
        default_branch: 'main',
        installation_id: MOCK_INSTALLATION_ID,
        private: true,
    },
    {
        full_name: 'mock-dev/rate-limited',
        default_branch: 'main',
        installation_id: MOCK_INSTALLATION_ID,
        private: true,
    },
]

type MockGrant = { createdAt: number; expired: boolean; repoPolls: number }
type MockState = { grants: Record<string, MockGrant>; registeringSimulated: boolean }

function readState(): MockState {
    try {
        return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'))
    } catch {
        return { grants: {}, registeringSimulated: false }
    }
}

function writeState(state: MockState): void {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state))
}

function getLiveGrant(state: MockState, grantId: string): MockGrant {
    const grant = state.grants[grantId]
    if (!grant || grant.expired || Date.now() - grant.createdAt > GRANT_TTL_MS) {
        throw new GrantExpiredError()
    }
    return grant
}

/** Test hook for the grant-expired flow (`/api/wizard/repos?mock_expire=1`). */
export function forceExpireGrant(grantId: string): void {
    const state = readState()
    if (state.grants[grantId]) {
        state.grants[grantId].expired = true
        writeState(state)
    }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const mockClient: ProvisioningClient = {
    async createGithubGrant({ code }) {
        const state = readState()
        if (!state.registeringSimulated) {
            // Stand-in for the one-time `202 registering` CIMD registration delay.
            state.registeringSimulated = true
            await sleep(1000)
        }
        if (!code.startsWith('mock')) {
            throw new GrantExpiredError('Unknown mock code')
        }
        const grantId = `mock-grant-${crypto.randomBytes(8).toString('hex')}`
        state.grants[grantId] = { createdAt: Date.now(), expired: false, repoPolls: 0 }
        writeState(state)
        return { grant_id: grantId, gh_login: 'mock-dev', email: 'mock@example.com', expires_in: 3600 }
    },

    async getGrantRepositories(grantId) {
        const state = readState()
        const grant = getLiveGrant(state, grantId)
        await sleep(300)
        if (grant.repoPolls < INSTALL_POLLS_BEFORE_DETECTED) {
            grant.repoPolls++
            writeState(state)
            return { installed: false }
        }
        return { installed: true, repositories: REPOSITORIES }
    },

    async createAccountRequest(body) {
        getLiveGrant(readState(), body.configuration.wizard.grant_id)
        await sleep(500)
        const repository = body.configuration.wizard.repository
        switch (repository) {
            case 'mock-dev/rate-limited':
                throw new RateLimitedError(120)
            case 'mock-dev/existing-user':
                return {
                    id: body.id,
                    type: 'requires_auth',
                    requires_auth: { url: `${config.siteUrl}/api/wizard/oauth-callback?code=mock-consent-code` },
                }
            case 'mock-dev/wizard-fails':
            case 'mock-dev/wizard-retry-succeeds':
                return {
                    id: body.id,
                    type: 'oauth',
                    oauth: { code: 'mock-oauth-code' },
                    // Mirrors the backend's bundled-block failure code (`_process_wizard_block`).
                    wizard: { error: { code: 'run_creation_failed', message: 'Simulated bundled wizard failure' } },
                }
            default:
                return {
                    id: body.id,
                    type: 'oauth',
                    oauth: { code: 'mock-oauth-code' },
                    wizard: { task_id: 'mock-task-1', run_id: 'mock-run-1' },
                }
        }
    },

    async exchangeToken() {
        await sleep(200)
        return {
            token_type: 'bearer',
            access_token: 'mock-bearer-token',
            refresh_token: 'mock-refresh-token',
            expires_in: 3600,
            account: { id: 'mock-org', available_teams: [{ id: 2, name: 'Mock project' }] },
        }
    },

    async createResource() {
        await sleep(200)
        return {
            status: 'complete',
            id: 2,
            service_id: 'free',
            complete: { access_configuration: { api_key: 'phc_mock', host: config.posthogApiHost } },
        }
    },

    async createGithubIntegration(_bearer, _teamId, { grant_id }) {
        getLiveGrant(readState(), grant_id)
        await sleep(200)
    },

    async createWizardRun(_bearer, _teamId, { repository }) {
        await sleep(300)
        if (repository === 'mock-dev/wizard-fails') {
            // Mirrors the backend's wizard_runs failure code (`_create_wizard_run`).
            throw new ProvisioningRequestError('run_creation_failed', 'Simulated granular retry failure', 500)
        }
        return { task_id: 'mock-task-2', run_id: 'mock-run-2' }
    },
}
