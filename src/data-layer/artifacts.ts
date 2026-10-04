// Files the build writes before it starts:
// - static/scripts/posthog-init.js: the PostHog snippet (only when the API key and host are set)
// - static/hedgehog-mode: the assets of @posthog/hedgehog-mode
// - static/videos-metadata.json: src/data/videos with thumbnails and titles
// - src/data/mcp-tools.json and src/data/scout-skills.json: from the posthog/posthog repo
// All of them are gitignored.
import fs from 'node:fs'
import path from 'node:path'
import { env } from './env'
import { ROOT } from './paths'
import { videos, type Video } from '../data/videos'
import type { McpToolDefinition } from './sources/posthogApi'

/** src/data/mcp-tools.json */
export interface McpToolsData {
    categories:
        { name: string; feature?: string; tools: { name: string; summary?: string; description: string }[] }[] | null
    byName: Record<
        string,
        { summary?: string; description?: string; category?: string; required_scopes?: string[] }
    > | null
    execCommands: string | null
    error: boolean
}

export interface ScoutSkill {
    name: string
    description: string
    /** The whole file, frontmatter included. */
    raw: string
}

/** src/data/scout-skills.json */
export interface ScoutSkillsData {
    /** Keyed by template key, e.g. costly-users. null when a fetch failed. */
    skills: Record<string, ScoutSkill> | null
    error: boolean
}

/** static/videos-metadata.json entries. */
export interface VideoMetadata extends Video {
    thumbnail: string
}

interface WistiaOembed {
    thumbnail_url?: string
    title?: string
}

interface YoutubeVideosResponse {
    items?: { snippet?: { title?: string } }[]
}

const STATIC_DIR = path.join(ROOT, 'static')
const FETCH_TIMEOUT_MS = 15000

function writeFile(file: string, contents: string) {
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.writeFileSync(file, contents)
}

async function fetchWithTimeout(url: string): Promise<Response> {
    return fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) })
}

function writePosthogInit() {
    const apiKey = env('PUBLIC_POSTHOG_API_KEY')
    const apiHost = env('PUBLIC_POSTHOG_API_HOST')
    if (!apiKey || !apiHost) return
    const assetHost = env('PUBLIC_POSTHOG_ASSET_HOST')
    // The "1" pins the array.js major version; strict_script_versioning makes the SDK load its lazy
    // chunks from matching versioned paths on the asset host.
    const arrayRoute = assetHost ? `${assetHost}/static/1/array.js` : `${apiHost}/static/array.js`
    const assetHostConfig = assetHost ? `asset_host: "${assetHost}",\n    strict_script_versioning: true,\n    ` : ''
    const script = `!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src="${arrayRoute}",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],Object.defineProperty(u,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e}}),Object.defineProperty(u.people,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(){return u.toString(1)+".people (stub)"}}),o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init("${apiKey}", {
    api_host: "${apiHost}",
    ui_host: "${env('PUBLIC_POSTHOG_UI_HOST')}",
    ${assetHostConfig}capture_pageview: false,
    capture_pageleave: true,
    // A windowed page scrolls inside its app window, not the document, so the default
    // document scroll root reports "100% scrolled" for everyone. ScrollArea marks the
    // viewport with data-scroll-root while that viewport is what scrolls, and 'html'
    // keeps the default behavior for a page that scrolls the document instead.
    scroll_root_selector: ['[data-scroll-root]', 'html'],
    persistence: 'localStorage+cookie',
    cookie_persisted_properties: ['prod_interest'],
    uuid_version:'v7',
    session_recording: {
        maskAllInputs: false,
        maskInputOptions: {
            password: true,
        },
    },
    error_tracking: {
        __capturePostHogExceptions: true,
    },
    // Drop exceptions coming from local dev servers so developers' local
    // exceptions (e.g. dev-server chunk load errors on hot recompiles)
    // don't pollute production error tracking. Real users are never on localhost.
    before_send: function (event) {
        var hostname = window.location.hostname
        if (event && event.event === '$exception' && (hostname === 'localhost' || hostname === '127.0.0.1')) {
            return null
        }
        return event
    },
    person_profiles: 'identified_only',
    __preview_heatmaps: true,
    opt_in_site_apps: true,
    __preview_remote_config: true,
    __preview_flags_v2: true,
    __preview_lazy_load_replay: true,
    __preview_capture_bot_pageviews: true,
    __preview_disable_xhr_credentials: true,
    // Tune rageclick detection to cut false positives from toggles and other
    // flip-to-see controls: require 4 rapid clicks (default 3) within 750ms of
    // each other (default 1000ms) before treating a burst as a $rageclick.
    rageclick: {
        click_count: 4,
        timeout_ms: 750,
    },
})`
    writeFile(path.join(STATIC_DIR, 'scripts', 'posthog-init.js'), script)
}

function copyHedgehogAssets() {
    fs.cpSync(path.join(ROOT, 'node_modules/@posthog/hedgehog-mode/assets'), path.join(STATIC_DIR, 'hedgehog-mode'), {
        recursive: true,
    })
}

async function wistiaMetadata(videoId: string) {
    try {
        const response = await fetchWithTimeout(
            `https://fast.wistia.com/oembed?url=https://home.wistia.com/medias/${videoId}`
        )
        if (!response.ok) throw new Error(`${response.status}`)
        const data = (await response.json()) as WistiaOembed
        return { thumbnail: data.thumbnail_url || '', title: data.title || '' }
    } catch (error) {
        console.warn(`[data-layer] Wistia metadata for ${videoId} failed: ${(error as Error).message}`)
        return null
    }
}

async function youtubeTitle(videoId: string) {
    const key = env('YOUTUBE_API_KEY')
    if (!key) return null
    try {
        const response = await fetchWithTimeout(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${key}`
        )
        if (!response.ok) throw new Error(`${response.status}`)
        const data = (await response.json()) as YoutubeVideosResponse
        return data.items?.[0]?.snippet?.title ?? null
    } catch (error) {
        console.warn(`[data-layer] YouTube metadata for ${videoId} failed: ${(error as Error).message}`)
        return null
    }
}

/** src/data/videos with thumbnails and titles from Wistia and YouTube. An API title wins over the manual one. */
async function writeVideosMetadata() {
    if (!env('YOUTUBE_API_KEY')) console.warn('[data-layer] YOUTUBE_API_KEY not set, keeping manual YouTube titles')
    const enriched: VideoMetadata[] = await Promise.all(
        videos.map(async (video) => {
            let thumbnail = ''
            let title = ''
            if (video.source === 'wistia') {
                const metadata = await wistiaMetadata(video.videoId)
                thumbnail = metadata?.thumbnail ?? ''
                title = metadata?.title ?? ''
            } else if (video.source === 'youtube') {
                thumbnail = `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`
                title = (await youtubeTitle(video.videoId)) ?? ''
            }
            return { ...video, thumbnail, title: title || video.title }
        })
    )
    writeFile(path.join(STATIC_DIR, 'videos-metadata.json'), JSON.stringify(enriched, null, 2))
}

const MCP_TOOLS_URL =
    'https://raw.githubusercontent.com/PostHog/posthog/refs/heads/master/services/mcp/schema/tool-definitions-all.json'
// Generated in the main repo by services/mcp/scripts/generate-exec-docs.ts from the templates the MCP
// server serves to agents at runtime.
const MCP_EXEC_COMMANDS_URL =
    'https://raw.githubusercontent.com/PostHog/posthog/refs/heads/master/services/mcp/schema/exec-command-reference.md'
const MAX_DESCRIPTION_LENGTH = 300

const truncate = (text: string) =>
    text.length <= MAX_DESCRIPTION_LENGTH ? text : text.slice(0, MAX_DESCRIPTION_LENGTH - 1).trimEnd() + '…'

async function execCommandsMarkdown(): Promise<string | null> {
    try {
        const response = await fetchWithTimeout(MCP_EXEC_COMMANDS_URL)
        if (response.status !== 200) throw new Error(`${response.status}`)
        const markdown = await response.text()
        // The fragment opens with an HTML provenance comment, which react-markdown renders as literal
        // text. Start at the first heading instead.
        const bodyStart = markdown.indexOf('## ')
        return bodyStart === -1 ? markdown : markdown.slice(bodyStart)
    } catch (error) {
        console.error(`[data-layer] MCP exec command reference failed: ${(error as Error).message}`)
        return null
    }
}

/**
 * `{ categories, byName, execCommands, error }`. A category's `feature` is the upstream slug and is not
 * unique across categories, so `name` is the key. Written even on failure, with null fields.
 */
async function writeMcpTools() {
    const execCommands = await execCommandsMarkdown()
    let data: McpToolsData
    try {
        const response = await fetchWithTimeout(MCP_TOOLS_URL)
        if (response.status !== 200) throw new Error(`${response.status}`)
        const tools = (await response.json()) as Record<string, McpToolDefinition>
        const categories: Record<string, Omit<NonNullable<McpToolsData['categories']>[number], 'name'>> = {}
        const byName: NonNullable<McpToolsData['byName']> = {}
        for (const [name, tool] of Object.entries(tools)) {
            const category = tool.category || 'Uncategorized'
            categories[category] ??= { feature: tool.feature, tools: [] }
            categories[category].tools.push({
                name,
                summary: tool.summary,
                description: truncate(tool.description ?? ''),
            })
            byName[name] = {
                summary: tool.summary,
                description: tool.description,
                category: tool.category,
                required_scopes: tool.required_scopes,
            }
        }
        Object.values(categories).forEach(({ tools }) => tools.sort((a, b) => a.name.localeCompare(b.name)))
        data = {
            categories: Object.entries(categories)
                .map(([name, { feature, tools }]) => ({ name, feature, tools }))
                .sort((a, b) => a.name.localeCompare(b.name)),
            byName,
            execCommands,
            error: false,
        }
    } catch (error) {
        console.error(`[data-layer] MCP tools failed: ${(error as Error).message}`)
        data = { categories: null, byName: null, execCommands, error: true }
    }
    writeFile(path.join(ROOT, 'src/data/mcp-tools.json'), JSON.stringify(data, null, 2))
}

/**
 * The scout SKILL.md files the pocket guides render. The monorepo owns them, so a guide and the app's
 * create-scout modal agree. Keys match the template keys in aiObservabilityScoutTemplates.ts.
 */
const SCOUT_SKILLS: Record<string, string> = {
    'daily-digest': 'signals-scout-ai-observability-daily-digest',
    'costly-users': 'signals-scout-ai-observability-costly-users',
    'error-patterns': 'signals-scout-ai-observability-error-patterns',
}
const SCOUTS_BASE_URL =
    'https://raw.githubusercontent.com/PostHog/posthog/refs/heads/master/products/ai_observability/backend/scouts'

/** `name` and the folded `description` from the frontmatter. Deliberately not a YAML parse. */
function scoutFrontmatter(raw: string): { name: string; description: string } | null {
    const block = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)?.[1]
    if (!block) return null
    const name = block.match(/^name:\s*(.+)$/m)?.[1]?.trim()
    const description = block
        .match(/^description:\s*>\s*\n((?:[ \t]+.*\n?)+)/m)?.[1]
        ?.split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .join(' ')
    return name && description ? { name, description } : null
}

/** `{ skills: { [key]: { name, description, raw } }, error }`. One failure nulls the whole result. */
async function writeScoutSkills() {
    let data: ScoutSkillsData
    try {
        const entries = await Promise.all(
            Object.entries(SCOUT_SKILLS).map(async ([key, name]) => {
                const response = await fetchWithTimeout(`${SCOUTS_BASE_URL}/${name}.md`)
                if (response.status !== 200) throw new Error(`scout skill ${name}: ${response.status}`)
                const raw = await response.text()
                const fields = scoutFrontmatter(raw)
                if (!fields) throw new Error(`scout skill ${name} is missing name or description in its frontmatter`)
                return [key, { ...fields, raw }] as const
            })
        )
        data = { skills: Object.fromEntries(entries), error: false }
    } catch (error) {
        console.error(`[data-layer] scout skills failed: ${(error as Error).message}`)
        data = { skills: null, error: true }
    }
    writeFile(path.join(ROOT, 'src/data/scout-skills.json'), JSON.stringify(data, null, 2))
}

export async function writeArtifacts(): Promise<void> {
    const started = Date.now()
    writePosthogInit()
    copyHedgehogAssets()
    await Promise.all([writeVideosMetadata(), writeMcpTools(), writeScoutSkills()])
    console.log(`[data-layer] artifacts written in ${Date.now() - started}ms`)
}
