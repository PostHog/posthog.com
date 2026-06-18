// Single source of truth for PostHog's outbound/egress IP addresses — the IPs
// PostHog connects *from* when reaching a customer-controlled endpoint (e.g.
// webhook destinations, data warehouse sources, batch exports, and WAF-protected
// sites for features like heatmaps).
//
// These are public, stable IPs. If they ever change, update them here only — every
// docs surface renders them via the components in components/Docs/OutboundIPs.
export const POSTHOG_OUTBOUND_IPS = {
    US: ['44.205.89.55', '52.4.194.122', '44.208.188.173'],
    EU: ['3.75.65.221', '18.197.246.42', '3.120.223.253'],
}
