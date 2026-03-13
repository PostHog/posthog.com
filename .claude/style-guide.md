# PostHog Writing Style Guide

This is a combined reference from the PostHog handbook style guides for use when writing or editing content.

---

## General principles


### Get to the point
Don't wait three paragraphs to explain something. Start with the explanation and expand later. Almost all articles can be improved by shortening (or removing) the intro. Don't be boring.

### Make it easy to read
Most readers will scan a page before committing to reading it. Use clear headings, diagrams and tables to demonstrate thoroughness.

### Avoid hedging
We are opinionated at PostHog. Avoid hedging like "it's complicated" or "it depends." Instead:
1. Have an opinion.
2. Provide an example.
3. Do the research until you can do 1. or 2.

---

## Voice and tone

### Address the reader directly
Use "you" instead of "the user", "developers", or "we". Use imperative form when giving instructions.

> **Do**: "You can create an insight by clicking **New insight**."
> **Don't**: "Users can create insights."

### Use active voice
> **Do**: "PostHog captures events automatically."
> **Don't**: "Events are captured automatically by PostHog."

Exception: Use passive voice when the actor is unknown or unimportant.

### Use present tense
Avoid future tense unless explicitly describing future behavior.

> **Do**: "The insight displays your data."
> **Don't**: "The insight will display your data."

### Be concise
Remove unnecessary words. Every clause should add either value or clarity.

> **Do**: "Click **Save**"
> **Don't**: "Now you can go ahead and click the **Save** button to save your changes"

### Avoid unexplained jargon
When introducing technical terms or acronyms, explain them on first use or link to a definition.

### Use contractions
Use contractions to maintain a conversational tone.

> **Do**: "That's it. The experiment is running."
> **Don't**: "That is it. The experiment is running."

---

## Style rules

### Use American English
For consistency: color, analyze, behavior, license (not colour, analyse, behaviour, licence).

### Use sentence case for titles
Write "Documentation style guide", not "Documentation Style Guide".

### Capitalize product names and proper nouns
Capitalize PostHog product names as proper nouns: "Session Replay", "Product Analytics". Use lowercase for general industry terms: "many companies offer product analytics."

### Capitalize acronyms
Write "URLs", not "urls". Link first use of unfamiliar acronyms to a definition.

### Use the Oxford comma
Write "bananas, apples, and oranges", not "bananas, apples and oranges".

### Use "enable", not "allow"
In most cases, PostHog *enables* users to do things (provides means/opportunity), not *allows* (permits).

### Use straight apostrophes and quote marks
Avoid curly quotes from tools like Google Docs, Notion, Word.

### "Open source" vs "open-source"
Hyphenate before a noun ("the open-source community"), no hyphen otherwise ("PostHog loves being open source").

### Use British-style en dashes
Use en dash ( – ) with spaces either side, not em dash (—) without spaces. On Mac: Option + hyphen.

### Numbers
- Spell out zero through nine
- Use numerals for 10 and above
- Use numerals for percentages, measurements, and technical values

---

## Word choice

### Choose simple words
| Instead of | Use |
|------------|-----|
| utilize | use |
| facilitate | help |
| commence | start, begin |
| subsequent | next |
| prior to | before |

### Use precise verbs
| Vague | Specific |
|-------|----------|
| use the API | call the API |
| work with data | query data, analyze data |
| handle errors | catch errors, log errors |
| manage users | add users, remove users, assign roles |

### Inclusive language
| Instead of | Use |
|------------|-----|
| blacklist/whitelist | denylist/allowlist |
| sanity check | validation, verification |
| master/slave | primary/secondary |

### Avoid phrases that trivialize
Don't use "simply", "just", "easily", "obviously", "of course", "clearly".

> **Do**: "Add the SDK to your project."
> **Don't**: "Simply add the SDK to your project."

---

## Formatting and structure

### Use descriptive headings
Prefer action-oriented titles over nouns and gerunds.

> **Do**: "## How to create a feature flag"
> **Don't**: "## Feature flag creation"

### Use short paragraphs
Avoid paragraphs longer than 3-4 lines. Break up with subheadings, lists, or visual elements.

### Bulleted lists
Use bullets for unordered items of equal importance. Default to prose when 1-2 items would be clearer as a sentence.

### Numbered lists
Use when ordering, ranking, or hierarchy matters.

### Definition-style lists
Use a dash ( - ) to separate item from description, not a colon.

> **Do**: **Product Analytics** - Track user behavior
> **Don't**: **Product Analytics:** Track user behavior

### Punctuation in lists
- Use a period when each item is a complete standalone sentence
- Don't use a period when items are phrases/fragments
- Be consistent within a single list

### Bold text
Use bold for:
- UI elements (buttons, menu items, labels)
- Callout labels (**Note:**, **Important:**, **Warning:**, **Tip:**)
- Definition lists (**Term** - Description)
- Problem/Solution labels

Avoid bold for general emphasis in prose.

### Bold UI elements
> **Do**: Click **New insight** in the **Insights** tab.
> **Don't**: Click the "New insight" button.

For nested UI: **Settings** > **API keys** > **Personal API key**

### Links
- Link first mention of PostHog terms to their docs page
- Link text should describe the destination (not "click here")
- Link to PostHog app using `https://app.posthog.com/` (auto-redirects)

### Add extra line breaks between long bullet points
Sections with long bullet point items are hard to read without extra line breaks in Markdown.

---

## Media

### Images and videos
- Upload media to Cloudinary (under 20 MB)
- Use PNGs in most cases (auto-converted to webp)
- Do NOT upload animated GIFs – record short clips as MP4s
- Ensure no personal information is visible in screenshots
- Focus on relevant UI, use standard viewport (1000-1400px)
- Use annotations to highlight specific UI elements

### Videos
- Use Screen Studio with preset settings
- Remove zoom-in for clicks
- Export: MP4, 1080p, 60 fps, "web" quality
