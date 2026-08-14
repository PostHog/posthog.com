# AgentSkillsList

Renders the canonical agent skills for one product as a list of cards: skill name, description,
the `posthog:*` MCP tools the skill calls (as minimal pills), and a link to the SKILL.md source
on GitHub.

Data comes from the `AgentSkill` GraphQL nodes ingested at build time from the
[PostHog monorepo](https://github.com/PostHog/posthog) (`products/<product>/skills/<name>/SKILL.md`)
via the `posthog-main-repo` `gatsby-source-git` source – see `gatsby/onCreateNode.ts` and
`useAgentSkills()` in `src/hooks/skills.tsx`. The list updates automatically on every site build;
nothing here is hand-maintained.

Also exports `AgentSkillsInstallPrompt` – the install path for the docs page: a copyable
paste-into-your-agent prompt (rendered via `SingleCodeBlock`) with a `ToggleGroup` switching
between two variants:

- **AI Observability skills** (default) – tells the agent to cherry-pick this product's
  skills from the `agent-skills-latest` release zip. Skill names are interpolated from the
  same build-time data as the list, so the prompt and the list can never drift apart.
- **All PostHog skills** – leads with the [PostHog AI plugin](https://github.com/PostHog/ai-plugin)
  (which bundles every skill plus the MCP server), falling back to extracting the whole zip
  for agents without plugin support.

The toggle labels are AIO-specific; generalize them if another product page ever adopts it.

## Usage

Import directly in MDX (no global shortcode registration):

```mdx
import AgentSkillsList, { AgentSkillsInstallPrompt } from 'components/AgentSkillsList'

<AgentSkillsList product="ai_observability" exclude={["feature-usage-feed"]} />
<AgentSkillsInstallPrompt product="ai_observability" exclude={["feature-usage-feed"]} />
```

Both components take the same props.

## Props

| Prop      | Type       | Description                                                              |
| --------- | ---------- | ------------------------------------------------------------------------ |
| `product` | `string`   | Monorepo product folder, e.g. `ai_observability`                         |
| `exclude` | `string[]` | Skill names (frontmatter `name`) to hide, for internal-only skills       |

If no skills are found (e.g. a local build without the monorepo clone), it renders a fallback
link to the product's skills folder on GitHub instead of an empty page.

## Used by

- `contents/docs/ai-observability/skills.mdx` (`/docs/ai-observability/skills`)
