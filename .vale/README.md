# Vale linting

Vale is a prose linter that enforces PostHog's writing style across the website: docs, blog posts, newsletters, and tutorials.

It catches spelling errors, style inconsistencies, and brand voice issues based on rules we define.

See the [Vale docs](https://vale.sh/docs) for all the details.

## Getting started

### Install Vale

```bash
brew install vale
```

### Run linting

```bash
pnpm vale                # Lint all content
pnpm vale:docs           # Lint docs only
pnpm vale:blog           # Lint blog posts only
pnpm vale:newsletter     # Lint newsletters only
pnpm vale:strict         # Warnings and errors only (no suggestions)
pnpm vale:json           # JSON output (for CI or tooling)
pnpm vale:path <path>    # Lint a specific file or directory
```

For real-time linting, install the [Vale VS Code extension](https://marketplace.visualstudio.com/items?itemName=chrischinchilla.vale-vscode).

## Rule packages

Rules are layered by content type. A doc gets `PostHogBase` + `PostHogDocs`. A blog post gets `PostHogBase` + `PostHogEditorial`. This is configured in `.vale.ini`.

```
PostHogBase            All .md and .mdx files
├── AmericanEnglish
├── ProductNames
├── EnDash
├── Inclusivity
├── OxfordComma
├── Spelling
└── ...

PostHogDocs            contents/docs/ only
├── DefinitionListDash
├── DirectAddress
├── Trivializers
└── UIBoldNotQuotes

PostHogEditorial       contents/blog/, newsletter/, tutorials/
├── BulletSpacing
├── EnableNotAllow
└── Hedging
```

## Vocabularies and spelling exceptions

You can define exceptions to the Vale rules for colloquial words or industry terms. You can add exceptions as vocabulary or as a spelling exception.

Here's a quick table on which to use: 

| Proper noun? Casing matters? | File | Examples |
|------------------------------|------|----------|
| Yes | `config/vocabularies/BrandsAndTechnologies/accept.txt` | HubSpot, JavaScript, ClickHouse, PostHog |
| No | `PostHogBase/spelling-exceptions.txt` | webhook, cron, heatmap, stonks |

Vocabularies are case-sensitive regex patterns that enforce exact capitalization. Use for brand names, products, and technologies.

Spelling exceptions are case-insensitive words the spell-checker should accept. Use for developer terminology or jargon that isn't in standard dictionaries. 

## Adding a rule

1. Pick the right package: `PostHogBase` (everywhere), `PostHogDocs` (docs only), or `PostHogEditorial` (blog/newsletter/tutorials)

2. Create a `.yml` file in the matching `styles/` subdirectory

The two most common rule types:

```yaml
# Substitution – suggest a replacement
extends: substitution
message: "Use '%s' instead of '%s'."
level: warning
swap:
  colour: color
```

```yaml
# Existence – flag terms that shouldn't appear
extends: existence
message: "Avoid using '%s'."
level: warning
tokens:
  - simply
  - obviously
```

Each rule can be configured to a severity level: 

1. Errors (must fix) 
2. Warnings (should fix) 
3. Suggestions (consider)

Use `pnpm vale:strict` to hide suggestions.

See the [Vale docs](https://vale.sh/docs/topics/styles/) for all rule types.

## What Vale skips

Configured in `.vale.ini`: Vale ignores fenced code blocks, inline code, import/export statements, markdown link URLs, and React/JSX component tags.