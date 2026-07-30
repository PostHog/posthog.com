# LiveJSON

Renders a JSON document fetched live from a URL, so docs can show a real published file instead of
a hand-copied sample that drifts out of date.

Registered as a global MDX shortcode, so it's available in any `.mdx` page without an import.

## Usage

```mdx
<LiveJSON src="https://posthog.com/.well-known/posthog.com.json" label="posthog.com's metadata document" />
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | required | URL to fetch. Must be same-origin, or send CORS headers. |
| `label` | `string` | – | Caption shown before the link. The URL is always rendered as a link. |
| `maxHeight` | `string` | `max-h-96` | Tailwind max-height class for the scroll area. |

## Why it fetches at runtime

The point of the component is that a reader sees what the URL serves *now*. Fetching at build time
would produce the same stale snapshot the prose example already was, just one level less obvious.

## CORS

The fetch happens in the reader's browser, so it only works for same-origin URLs (anything on
posthog.com) or cross-origin ones that send `Access-Control-Allow-Origin`. A `.well-known` metadata
document usually does not.

A failed fetch renders as the plain link rather than an error, on purpose: a document being
unreadable from a browser says nothing about whether it's valid, and a red error box next to a
perfectly good file would be actively misleading.

## Where it's used

`contents/docs/integrate/provisioning.mdx`, to show posthog.com's own CIMD metadata document and
the JWK Set it publishes at its `jwks_uri` — the two files a partner has to produce versions of.
