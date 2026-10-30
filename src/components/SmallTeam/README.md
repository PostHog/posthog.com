# SmallTeam Component

A component for mentioning PostHog small teams in MDX/Markdown content.

## Usage

```mdx
<SmallTeam slug="website" />
```

## Props

-   `slug` (string, required): The team slug as stored in Strapi
-   `noMiniCrest` (boolean, optional): If true, hides the mini crest and border for inline usage
-   `className` (string, optional): Additional CSS classes
-   `variant` (`'pill' | 'crest'`, optional, default `'pill'`): See "Crest variant" below
-   `crestClassName` (string, optional): Sizing for the large crest when `variant="crest"`

## Features

-   Displays team name and mini crest in a bordered "chip" style (by default)
-   Links to the team's page (`/teams/{slug}`)
-   Shows full crest in tooltip on hover, clicking tooltip opens team page in new window
-   Falls back to displaying the slug as text if team is not found

## Crest variant

```tsx
<SmallTeam slug="ai-observability" variant="crest" />
```

Renders the full crest at size next to the team name and tagline, with no tooltip — for places where the team is the point rather than a passing mention. Product pages use this in the "Questions?" section to credit the team that owns the product (`productData.teamSlug`).

Degrades in steps: no full crest falls back to the mini crest, and no crest at all still renders the name as a link to the team page.

## Example with no mini crest

```mdx
<SmallTeam slug="website" noMiniCrest />
```

This will show only the team name as an inline link without border or mini crest, but still display the full crest on hover.
