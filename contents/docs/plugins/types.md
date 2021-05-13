---
title: TypeScript Types 
sidebar: Docs
showTitle: true
---

PostHog supports TypeScript plugins natively, without you having to compile the TypeScript yourself (although you can also do that).

To build a TypeScript plugin, you'll probably need some types, so read on.
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