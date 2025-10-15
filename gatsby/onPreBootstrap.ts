import { GatsbyNode } from 'gatsby'
import fetch from 'node-fetch'
import path from 'path'
import fs from 'fs'

import { fetchAndProcessMCPTools, writeMCPToolsToFile } from './utils/fetchMCPTools'

export const PAGEVIEW_CACHE_KEY = 'onPreBootstrap@@posthog-pageviews'
export const MCP_TOOLS_CACHE_KEY = 'onPreBootstrap@@mcp-tools'

export const onPreBootstrap: GatsbyNode['onPreBootstrap'] = async ({ cache }) => {
    if (process.env.GATSBY_POSTHOG_API_KEY && process.env.GATSBY_POSTHOG_API_HOST) {
        const posthogScript = `!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init("${process.env.GATSBY_POSTHOG_API_KEY}", {
    api_host: "${process.env.GATSBY_POSTHOG_API_HOST}",
    ui_host: "${process.env.GATSBY_POSTHOG_UI_HOST}",
    capture_pageview: false,
    capture_pageleave: true,
    persistence: 'localStorage+cookie',
    uuid_version:'v7',
    session_recording: {
        maskAllInputs: false,
        maskInputOptions: {
            password: true,
        },
    },
    person_profiles: 'identified_only',
    __preview_heatmaps: true,
    opt_in_site_apps: true,
    __preview_remote_config: true,
    __preview_flags_v2: true,
    __preview_lazy_load_replay: true,
    cookieless_mode: navigator.userAgent.includes("Firefox/") ? "on_reject" : undefined,
    __preview_disable_xhr_credentials: true,
})`
        const scriptsDir = path.resolve(__dirname, '../static/scripts')
        fs.writeFileSync(path.join(scriptsDir, 'posthog-init.js'), posthogScript)
    }

    // Copy hedgehog mode assets to public folder
    const source = path.resolve('node_modules/@posthog/hedgehog-mode/assets')
    const hedgehogModeDir = path.resolve(__dirname, '../public/hedgehog-mode')
    fs.cpSync(source, hedgehogModeDir, { recursive: true })

    // Fetch and process MCP tool definitions
    const mcpToolsData = await fetchAndProcessMCPTools()
    writeMCPToolsToFile(mcpToolsData)

    // Cache the data if successful
    if (!mcpToolsData.error && mcpToolsData.categories) {
        await cache.set(MCP_TOOLS_CACHE_KEY, mcpToolsData.categories)
    }

    if (process.env.POSTHOG_APP_API_KEY && !(await cache.get(PAGEVIEW_CACHE_KEY))) {
        const pageViews: Record<string, number> = {}

        const params = new URLSearchParams({
            events: `[{"id":"$pageview","name":"$pageview","type":"events","order":0,"properties":[{"key":"$host","type":"event","value":["posthog.com"],"operator":"exact"}]}]`,
            date_from: '-30d',
            breakdown: '$pathname',
            filter_test_accounts: 'false',
            breakdown_normalize_url: 'true',
            breakdown_limit: '2000',
            offset: '0',
        })

        const res = await fetch(`https://app.posthog.com/api/projects/2/insights/trend?${params.toString()}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.POSTHOG_APP_API_KEY}`,
            },
        })

        if (res.status !== 200) {
            console.error('Something went wrong when fetching pageview stats')
            return
        }

        const data = await res.json()

        data.result.forEach((result) => {
            pageViews[result.breakdown_value] = result.count
        })

        await cache.set(PAGEVIEW_CACHE_KEY, pageViews)
    }
}
