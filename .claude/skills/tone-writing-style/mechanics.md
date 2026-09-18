# Mechanics

Grammar, punctuation, vocabulary, and spelling rules. American English is the default, with a few intentional exceptions.

## Spelling and language

- American English: "color" not "colour", "optimize" not "optimise", "behavior" not "behaviour"
- Date format: "November 5, 2025" or "Nov 5, 2025" (American) — not "5 November 2025"
- Time format: 12-hour with am/pm (lowercase, no periods): "9am", "2:30pm"

## Punctuation

### Dashes (the most violated rule)

- **En dash with spaces** ( – ) is the house style for parenthetical breaks: "PostHog is fast – fast enough to feel instant."
- **Em dashes** (—) are wrong on PostHog properties. Find and replace.
- **Hyphens** ( - ) with spaces around them are also wrong as parenthetical breaks. They're for compound modifiers only.

### Quotes

- Straight quotes only: `"` and `'`
- Never curly: `"` `"` `'` `'`
- Most editors auto-curl. Turn it off in Notion, Google Docs, Word, etc.

### Other

- **Oxford comma:** use it. "Events, flags, and surveys."
- **Sentence-ending punctuation in quotes:** American style — periods and commas inside quotes.
- **Ellipses:** use sparingly. Three dots, no spaces around them in most cases.
- **Exclamation points:** use rarely. PostHog's voice is dry, not excitable.

## Capitalization

### Headings and titles

**Sentence case** for everything: page titles, blog post titles, section headings, button labels, navigation.

- Right: "How to set up feature flags"
- Wrong: "How To Set Up Feature Flags"

Exception: proper nouns and product names retain their capitalization.

### Product names

- "PostHog" — capital P, capital H, no space
- Product suite names use sentence case in body text, title case only when they're proper product names. Check posthog.com for the canonical form when in doubt.

## Hyphenation rules

- **"open-source"** as adjective before noun: "an open-source company"
- **"open source"** elsewhere: "PostHog is open source"
- **"product-led"**, **"developer-facing"**, **"AI-native"** — hyphenated as compound modifiers before nouns

## Vocabulary preferences

### Use these

- **"Analytics platform"** instead of "product analytics tool" — PostHog has expanded well beyond product analytics. Reserve "product analytics" for specific references to that suite.
- **"Developers"** or **"engineers"** for the audience (rather than "users", "customers", "stakeholders")
- **"Use"** over "utilize", "leverage"
- **"To"** over "in order to"
- **"Get"** / **"set up"** / **"ship"** — PostHog uses concrete, casual verbs

### Avoid these

- "Solution" (name the actual product)
- "Stakeholders" (unless literally talking about stakeholders in a corporate sense)
- "Synergy", "alignment", "scalable" (without something concrete attached)
- "Best-of-breed", "world-class", "best-in-class"
- "Cutting-edge", "next-gen", "revolutionary"
- "Robust" without specifics
- "Seamless" / "seamlessly"

### Numbers

- Spell out one through nine: "two products", "five flags"
- Numerals for 10 and above: "10 events", "100 customers"
- Always numerals for measurements, percentages, currencies: "5ms", "2GB", "50%", "$10/month"

## Lists

- **Bulleted lists** for unordered items
- **Numbered lists** only when sequence or count matters
- **Capitalize the first word** of each bullet
- **Punctuate consistently** — either all bullets end with periods or none do (none is common for short fragments)

## Code formatting

- **Backticks** around inline code: `posthog.capture()`
- **Triple backticks** with language tags for code blocks
- Don't mix prose and code formatting awkwardly — if a feature name has a code-like form, use backticks consistently

## Links

- **Always link** when referencing another product, doc page, or external resource. "Contact us" without a link is broken.
- **Descriptive link text** — not "click here". The linked phrase should make sense out of context.

## A note on rule-breaking

PostHog's editor cares more about readability and aesthetics than about rules to the letter. If a rule creates clunky copy, prioritize the read. But know the rules before breaking them — the en dash thing, especially, is a hill the team will die on.
