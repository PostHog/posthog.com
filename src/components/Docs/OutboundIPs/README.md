# OutboundIPs

Renders PostHog's outbound/egress IP addresses inside docs pages. These are the IPs
PostHog connects **from** when reaching a customer-controlled endpoint (webhook
destinations, data warehouse sources, batch exports, and WAF-protected sites for
features like heatmaps).

## Single source of truth

The IP values live in **one place** – [`src/constants/outboundIPs.ts`](../../../constants/outboundIPs.ts)
(`POSTHOG_OUTBOUND_IPS`). Every docs surface that lists these IPs renders them through
this component, so an IP rotation is a single edit to that constant.

Do **not** hardcode these IPs in MDX. Import a component below instead.

## Exports

| Export | Output | Used by |
| --- | --- | --- |
| `OutboundIPsInline` | Bold `EU` / `US` labels with comma-separated inline code chips (via `InlineCode`) | The "Add IPs to Firewall/WAF allowlists" `<details>` accordions (`integrate/_snippets/details/posthog-ips.mdx`, `cdp/destinations/webhook.mdx`) |
| `OutboundIPsTable` | A plain `<table>` with `US` / `EU` columns | The "Inbound IP addresses" snippet (`cdp/_snippets/inbound-ip-addresses.mdx`) used by sources and batch exports |

Both components are pure and hook-free (they read a static constant), so they are
SSR-safe under `gatsby build`. `OutboundIPsTable` emits a bare `<table>` with no
classes so it inherits the `.article-content` prose table styling; `OutboundIPsInline`
emits plain paragraphs so it inherits `<details>` paragraph spacing.

## Usage

```mdx
import { OutboundIPsInline, OutboundIPsTable } from 'components/Docs/OutboundIPs'

<OutboundIPsInline />

<OutboundIPsTable />
```
