---
title: TypeScript Types 
sidebar: Docs
showTitle: true
---

## Installation

To use the plugin types in your plugin, you can install them as follows:

```bash
# if using yarn
yarn add --dev @posthog/plugin-scaffold

# if using npm
npm install --save-dev @posthog/plugin-scaffold
``` 

Then, in your plugins, you can use them like so:

```typescript
import { PluginEvent, PluginMeta } from '@posthog/plugin-scaffold'

export function processEvent(event: PluginEvent, meta: PluginMeta) {
    if (event.properties) {
        event.properties['hello'] = 'world'
    }
    return event
}
```

## Types

Here are the TypeScript types that can be used by plugin authors:

```js
interface PluginEvent {
    distinct_id: string
    ip: string
    site_url: string
    team_id: number
    now: string
    event: string
    sent_at?: string
    properties?: Record<string, any>
}

interface PluginAttachment {
    content_type: string
    file_name: string
    contents: any
}

interface PluginMeta {
    cache: CacheExtension
}

interface PluginConfigSchema {
    key?: string
    name?: string
    type?: 'string' | 'attachment'
    default?: string
    hint?: string
    markdown?: string
    order?: number
    required?: boolean
}

interface CacheExtension {
    set: (key: string, value: unknown, ttlSeconds?: number) => Promise<void>
    get: (key: string, defaultValue: unknown) => Promise<unknown>
    incr: (key: string) => Promise<number>
    expire: (key: string, ttlSeconds: number) => Promise<boolean>
}

interface ConsoleExtension {
    log: (...args: unknown[]) => void
    error: (...args: unknown[]) => void
    debug: (...args: unknown[]) => void
    info: (...args: unknown[]) => void
    warn: (...args: unknown[]) => void
}
```
