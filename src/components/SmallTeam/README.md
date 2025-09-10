# SmallTeam Component

A component for mentioning PostHog small teams in MDX/Markdown content.

## Usage

```mdx
<SmallTeam slug="brand-vibes" />
```

## Props

-   `slug` (string, required): The team slug as stored in Strapi
-   `noMiniCrest` (boolean, optional): If true, hides the mini crest and border for inline usage
-   `className` (string, optional): Additional CSS classes

## Features

-   Displays team name and mini crest in a bordered "chip" style (by default)
-   Links to the team's page (`/teams/{slug}`)
-   Shows full crest in tooltip on hover, clicking tooltip opens team page in new window
-   Falls back to displaying the slug as text if team is not found

## Example with no mini crest

```mdx
<SmallTeam slug="brand-vibes" noMiniCrest />
```

This will show only the team name as an inline link without border or mini crest, but still display the full crest on hover.
