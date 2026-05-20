# Skills explorer

Prototype UI for browsing agent-oriented PostHog workflows at `/skills`.

## Data model

Skills live in [`src/hooks/skills.tsx`](../../hooks/skills.tsx). Each skill is an **outcome** (department → category → name), not a product container.

Products are referenced via `resources: SkillResourceRef[]`:

```ts
{ handle: "session_replay" }
{ handle: "support", label: "Conversations" }
{ handle: "product_analytics", label: "Cohorts", href: "/docs/data/cohorts" }
```

- `handle` must match [`useProduct`](../../hooks/useProduct.ts) / [`useProducts`](../../hooks/useProducts.tsx).
- `label` is for capabilities inside a product (display only; icon/color from parent handle).
- `href` overrides the link when `slug` is not enough.

Vibed tool names are mapped in [`skillsResourceRegistry.ts`](../../hooks/skillsResourceRegistry.ts) (`SKILL_RESOURCE_ALIASES`).

## Components

| Component | Role |
|-----------|------|
| `SkillsColumnView` | Finder columns — outcome (dept → skills grouped by category dividers) or product (product → skills) |
| `SkillsOutcomeSkillsColumn` | Second outcome column: category section headers + skills in one list |
| `SkillsSearchList` | Flat list + detail when search/filters are active |
| `SkillDetailPane` | Workflow, resource chips, prompts, related skills |
| `ProductResourceChip` | Icon, color, link from resolved product metadata |

## Adding a skill

1. Add a `RawSkill` entry in `RAW_SKILLS` inside `skills.tsx` (use `tools: string[]` — converted via aliases).
2. If a tool string is new, add it to `SKILL_RESOURCE_ALIASES` in `skillsResourceRegistry.ts`.
3. Prefer an existing product `handle`; use `label` + optional `href` for doc-only capabilities.

## Browse modes

- **Task** (default): department → skills grouped by category dividers.
- **Product**: product (with icon) → skills that list that handle in `resources`.
- Task/Product toggle lives in the header of the first column.
- **Search**: any non-empty query or filter hides columns and shows `SkillsSearchList`.
