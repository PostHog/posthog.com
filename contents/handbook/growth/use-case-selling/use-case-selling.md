---
title: 'Use-case selling'
showTitle: true
hideAnchor: false
---
 
We sell products. Customers buy solutions.
 
When we pitch "add Surveys," it sounds like we're trying to increase their bill. When we pitch "here's how to close the loop on why users drop off," it sounds like we're solving their problem. Same product. Different framing. Very different conversion rate.
 
**Use cases are how we sell. Products are how we bill.** A use case is a discrete problem a team is trying to solve, supported by a combination of PostHog products. Billing, metering, and packaging don't change. What changes is how we talk about it, how we organize around it, and how we measure adoption.
 
Each use case has a full playbook with discovery questions, competitive positioning, expansion paths, objection handling, and onboarding checklists.
 
## The seven use cases
 
| Use case | Job to be done | Core buyer | 
|---|---|---|
| [Product Intelligence](/handbook/growth/use-case-selling/product-intelligence) | "Help me understand what users do, why they do it, and what to build next." | PMs, designers, product engineers, founders | 
| [Release Engineering](/handbook/growth/use-case-selling/release-engineering) | "Help me ship faster without breaking things." | Engineering managers, platform teams, developers | 
| [Observability](/handbook/growth/use-case-selling/observability) | "Help me know when things break, understand why, and fix them fast." | SREs, platform engineers, DevOps | 
| [Growth & Marketing](/handbook/growth/use-case-selling/growth-and-marketing) | "Help me understand what drives acquisition, conversion, and revenue." | Growth engineers, marketing leads, CRO, GTM engineers |
| [AI/LLM Observability](/handbook/growth/use-case-selling/ai-llm-observability) | "Help me understand how my AI features perform, what they cost, and how users interact with them." | AI/ML engineers, AI PMs, AI founders | 
| [Data Infrastructure](/handbook/growth/use-case-selling/data-infrastructure) | "Help me unify product data with business data and get it where it needs to go." | Data engineers, analytics engineers, product ops | 
| [Customer Experience](/handbook/growth/use-case-selling/customer-experience) | "Help me handle customer conversations in one place, understand what happened, and ship the fix." | Support leaders, engineering leads, CS leaders |
 
## Product coverage matrix
 
| Product | Primary use case | Secondary use cases |
|---|---|---|
| Support | Customer Experience | |
| Product Analytics | Product Intelligence | Growth & Marketing, AI/LLM Obs, Customer Experience |
| Session Replay | Product Intelligence | Release Engineering, Observability, AI/LLM Obs, Customer Experience |
| Heatmaps | Product Intelligence | Growth & Marketing, Customer Experience |
| Feature Flags | Release Engineering | Growth & Marketing |
| Experiments | Release Engineering | Product Intelligence, AI/LLM Obs, Growth & Marketing, Customer Experience |
| Error Tracking | Observability | AI/LLM Obs, Customer Experience |
| Surveys | Product Intelligence | Growth & Marketing, Customer Experience |
| Web Analytics | Growth & Marketing | |
| Marketing Analytics *beta* | Growth & Marketing | |
| Customer Analytics | Growth & Marketing | Product Intelligence |
| Workflows | Growth & Marketing | Product Intelligence, Customer Experience |
| AI Observability | AI/LLM Obs | Customer Experience |
| AI Evals | AI/LLM Obs | Product Intelligence, Release Engineering |
| Prompt management | AI/LLM Obs | |
| Data Warehouse | Data Infrastructure | |
| Data Pipelines / Batch Exports | Data Infrastructure | Growth & Marketing |
| Endpoints | Data Infrastructure | |
| Semantic layer | Data Infrastructure | |
| Logs | Observability | Customer Experience |
| Distributed tracing *alpha* | Observability | Release Engineering |
| Metrics *alpha* | Observability | |
| Health checks *beta* | Observability | Data Infrastructure |
| Replay Vision *closed beta* | Product Intelligence | Customer Experience, Observability |
| PostHog AI | Horizontal (all) | |
| self-driving | Horizontal (all) | Converts fastest in Observability, Release Engineering, and Customer Experience |

**Maturity matters when you're pitching.** Anything marked *alpha*, *beta*, or *closed beta* above needs a caveat in the room, and each playbook carries the specific one. Two are worth knowing before any call:

- **[Replay Vision](/docs/replay-vision) is closed beta** — waitlist only, quota-limited, and you cannot promise a date.
- **[self-driving](/docs/self-driving) is a capability, not a SKU.** Write it lowercase and hyphenated, and keep the customer's product as the subject: we make *their* product self-driving. Never "PostHog is a self-driving product." See [brand foundations](/handbook/brand/foundations#how-we-describe-posthog) and [how to pitch self-driving](/handbook/growth/sales/how-to-pitch-self-driving).

**Products vs tools.** In brand terms, most rows above are *tools* — the capabilities you access through the five *products* (PostHog Web, Slack, MCP, CLI, and [Desktop](/handbook/marketing/positioning/desktop)). That distinction doesn't change how you sell a use case, but it does change the words: don't call PostHog Desktop a tool, and don't call product analytics a product.

## Playbook structure
 
Every use case playbook follows the same sections, so TAMs know where to find what they need:

1. Job to be done
2. What PostHog products are relevant (with doc links)
3. Adoption and expansion paths
4. Business impact
5. Personas to target
6. Signals in Vitally & PostHog
7. Command of the Message (discovery, negative consequences, desired state, outcomes, metrics)
8. Competitive positioning
9. Pain points & known limitations
10. Getting a customer started (evaluation scope, onboarding checklist)
11. Cross-sell pathways to other use cases
12. Internal resources
13. Company archetype considerations

Two pages add an **Objection handling** section between 10 and 11 ([Growth & Marketing](/handbook/growth/use-case-selling/growth-and-marketing) and [Customer Experience](/handbook/growth/use-case-selling/customer-experience)), and [Data Infrastructure](/handbook/growth/use-case-selling/data-infrastructure) adds a data-maturity appendix at the end. Everything else is consistent across all seven.
