# Skills explorer

UI for browsing agent-oriented PostHog use cases at `/skills`. The page shows what each
skill does, which products/tools power it, and the chain of MCP tools an agent calls.

## Data model

The curated dataset lives in [`src/hooks/skillsData.ts`](../../hooks/skillsData.ts) as
`IncomingSkill[]` and is normalized into the `Skill` type by
[`src/hooks/skills.tsx`](../../hooks/skills.tsx).

Each `IncomingSkill`:

```ts
{
  name: 'Debug a user complaint',
  stage: 'Startup',                         // company growth stage: MVP → Startup → Scale → Enterprise
  tags: ['Support', 'Engineering'],         // departments / personas (same concept)
  description: '…',
  tools_used: 'Session Replay, Logs, …',    // comma string → linked product chips
  flow: 'persons-list, query-logs, …',      // comma string of MCP tool handles → FlowChips
  example_prompts: ['…'],                   // illustrative user asks
}
```

Department == persona == a tag (there is no separate `department` field). The **Role** browse
mode groups by department; within a department, skills are divided by **Stage** (ordered via
`STAGE_ORDER` in `skills.tsx`, not alphabetically). There is no separate filter bar — browsing
the columns _is_ the filter, and the left-column search box overrides both.

`tools_used` becomes `resources: SkillResourceRef[]` via `toolStringToResource`. Product
names map to handles in [`skillsResourceRegistry.ts`](../../hooks/skillsResourceRegistry.ts):

```ts
{ handle: "session_replay" }
{ handle: "support", label: "Conversations" }
{ handle: "product_analytics", label: "Cohorts", href: "/docs/data/cohorts" }
```

- `handle` must match [`useProduct`](../../hooks/useProduct.ts) / [`useProducts`](../../hooks/useProducts.tsx).
- Unknown names fall back to a gray chip (no link).

`flow` MCP tool handles are mapped to products by `mcpToolToProductHandle` (prefix rules),
with gaps filled from the ingested monorepo skills (see below).

## Canonical skills ingestion

`products/*/skills/*/SKILL.md` from the [monorepo](https://github.com/PostHog/posthog) are
pulled at build time (via the `posthog-main-repo` `gatsby-source-git` patterns) and parsed
into `AgentSkill` nodes in [`gatsby/onCreateNode.ts`](../../../gatsby/onCreateNode.ts) (typed
in `gatsby/createSchemaCustomization.ts`). They are blocked from MDX transformation, so they
never create pages. `useAgentSkills()` / `useFlowToolResolver()` expose them — currently used
to enrich the `flow`-tool → product mapping (`product` folder → posthog.com handle).

## Components

| Component | Role |
|-----------|------|
| `SkillsColumnView` | Owns the whole view: left column (search + Role/Product toggle), browse columns, search results, detail pane |
| `SkillsBrowseHeader` | Left-column header: persistent search box above the Role/Product toggle |
| `SkillsOutcomeSkillsColumn` | Second role column: stage section headers + skills |
| `SkillDetailPane` | Stage, tags, resource chips, `FlowChips`, prompts, related skills |
| `FlowChips` | Renders `flow` as product-icon chips linked to product pages |
| `ProductResourceChip` | Icon, color, link from resolved product metadata |

## Adding a skill

1. Add an `IncomingSkill` entry to `skillsData.ts` (`tools_used`/`flow` are comma strings).
2. If a product name in `tools_used` is new, add it to `SKILL_RESOURCE_ALIASES`.
3. If a `flow` MCP tool prefix isn't mapped, extend `MCP_TOOL_PRODUCT_RULES`.

## Browse modes

A persistent search box sits at the top of the left column (above the Role/Product toggle).

- **Role** (default): department (persona) → skills grouped by stage dividers.
- **Product**: product (with icon) → skills that list that handle in `resources`.
- **Search**: a non-empty query collapses the columns into a single flat results list in the
  left column; clearing it restores the column browse. The search box lives in the left
  column's header and stays mounted across the swap so focus is never lost.
