# AgentSkillsList

Renders the canonical agent skills for one product as a list of cards: skill name, description,
the `posthog:*` MCP tools the skill calls (as minimal pills), and a link to the SKILL.md source
on GitHub.

Data comes from the `AgentSkill` GraphQL nodes ingested at build time from the
[PostHog monorepo](https://github.com/PostHog/posthog) (`products/<product>/skills/<name>/SKILL.md`)
via the `posthog-main-repo` `gatsby-source-git` source – see `gatsby/onCreateNode.ts` and
`useAgentSkills()` in `src/hooks/skills.tsx`. The list updates automatically on every site build;
nothing here is hand-maintained.

Installation guidance lives in the docs page prose and points at the
[PostHog AI plugin](https://github.com/PostHog/ai-plugin), whose README is the canonical,
always-current install reference – deliberately not duplicated here or in the page.

## Usage

Import directly in MDX (no global shortcode registration):

```mdx
import AgentSkillsList from 'components/AgentSkillsList'

<AgentSkillsList product="ai_observability" exclude={["feature-usage-feed"]} />
```

## Props

| Prop      | Type       | Description                                                              |
| --------- | ---------- | ------------------------------------------------------------------------ |
| `product` | `string`   | Monorepo product folder, e.g. `ai_observability`                         |
| `exclude` | `string[]` | Skill names (frontmatter `name`) to hide, for internal-only skills       |

If no skills are found (e.g. a local build without the monorepo clone), it renders a fallback
link to the product's skills folder on GitHub instead of an empty page.

## Used by

- `contents/docs/ai-observability/skills.mdx` (`/docs/ai-observability/skills`)
