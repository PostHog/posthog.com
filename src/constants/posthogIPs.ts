// Single source of truth for PostHog's IP addresses: the fixed, public set PostHog
// connects from when reaching a customer-controlled endpoint (webhook destinations,
// data warehouse sources, batch exports, and WAF-protected sites for features like
// heatmaps). These are PostHog's outbound/egress IPs; from the customer's side they
// arrive as inbound connections to allowlist.
//
// If they ever change, update them here only. Every docs surface renders them via
// the components in components/Docs/PostHogIPs.
export const POSTHOG_IPS = {
    US: ['44.205.89.55', '52.4.194.122', '44.208.188.173'],
    EU: ['3.75.65.221', '18.197.246.42', '3.120.223.253'],
}
