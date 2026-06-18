# PostHogIPs

Renders PostHog's IP addresses inside docs pages. These are the fixed, public IPs
PostHog connects from when reaching a customer-controlled endpoint (webhook
destinations, data warehouse sources, batch exports, and WAF-protected sites for
features like heatmaps). They are PostHog's outbound/egress IPs; from the customer's
side they arrive as inbound connections to allowlist, which is why the same set is
referenced from both "outbound" and "inbound" framings.

## Single source of truth

The IP values live in one place: [`src/constants/posthogIPs.ts`](../../../constants/posthogIPs.ts)
(`POSTHOG_IPS`). Every docs surface that lists these IPs renders them through this
component, so an IP rotation is a single edit to that constant.

Do not hardcode these IPs in MDX. Import a component below instead.

## Exports

| Export | Output | Used by |
| --- | --- | --- |
| `PostHogIPsInline` | Bold `EU` / `US` labels with comma-separated inline code chips (via `InlineCode`) | The "Add IPs to Firewall/WAF allowlists" `<details>` accordions (`integrate/_snippets/details/posthog-ips.mdx`, `cdp/destinations/webhook.mdx`) |
| `PostHogIPsTable` | A plain `<table>` with `US` / `EU` columns | The "Inbound IP addresses" snippet (`cdp/_snippets/inbound-ip-addresses.mdx`) used by sources and batch exports |

Both components are pure and hook-free (they read a static constant), so they are
SSR-safe under `gatsby build`. `PostHogIPsTable` emits a bare `<table>` with no
classes so it inherits the `.article-content` prose table styling; `PostHogIPsInline`
emits plain paragraphs so it inherits `<details>` paragraph spacing.

## Usage

```mdx
import { PostHogIPsInline, PostHogIPsTable } from 'components/Docs/PostHogIPs'

<PostHogIPsInline />

<PostHogIPsTable />
```
