---
description: Finish one chapter of the PostHog pocket guide volume, in the volume's reported-narrative voice
---

# Finish a PostHog pocket guide chapter

The chapter to work on is: $ARGUMENTS

Valid slugs: `101`, `events`, `one-place`, `activation`, `the-outage`, `revenue`, `signals`, `the-fix`. If no argument is given, list the chapters with a one-line status for each and ask which one.

> **Model:** Run this with Opus. The failure mode on weaker models is voice: they revert the prose to second-person docs register within a paragraph or two, and the reversion is subtle enough to pass a skim.

## Core constraint: this volume is reported, not explained

Every other page on posthog.com talks to the reader in second person about what they can do. **This volume does not.** It reports what happened to a company called Unter, in past tense, about named people, and lets the reader work out the argument from the evidence. The thesis is never stated before chapter 7.

If you find yourself writing "you can", "this lets you", or "here's how to", you have left the volume's voice. The two deliberate exceptions are documented under **The step-in device** below.

## Step 1: Read these, in this order

1. `contents/pocket-guides/posthog/the-outage/index.mdx` — **the pattern.** Strongest prose in the volume. Match its register, paragraph length, and figure density.
2. `contents/pocket-guides/posthog/index.mdx` and `101/index.mdx` — the premise and the disclosure.
3. The chapter you're working on, in full.
4. The chapters immediately before and after it, so the story joins up.
5. `src/components/PocketGuides/README.md` — the format, the component vocabulary, the MDX traps.
6. `contents/handbook/wizard-and-docs/pocket-guides.md` — the authoring rules.

Do not read the old `contents/docs/new-to-posthog/` pages for voice. They are what this volume replaces.

## Step 2: Hold the canon

These facts appear across chapters and must not drift. If a chapter needs a fact that isn't here, invent it, then **tell the user what you added** so it can be added to this list.

| When | What |
| --- | --- |
| 12 Jan | Someone at Unter pastes eleven lines of JavaScript into a template. Takes an afternoon. |
| Jan–Feb | Five more tools go on. Nothing is instrumented twice. |
| 18 Feb | Two meetings decide the Monday number: holes cut, not signups. |
| 3 Mar, 14:20 | A config change at the tile provider starts returning 403 on every map request. Nothing crashes. |
| 3 Mar, 21:07 | Hoglet McSpine, a host in Sheffield, presses retry three times and closes the tab. Never returns. |
| 3–14 Mar | 412 hosts do the same. Nobody writes in. The Monday number falls 9% and is blamed on the weather. |
| 14 Mar, 03:40 | Four signals from four sources group into one report. |
| 14 Mar, 04:12 | A PR opens: four lines in `tiles.ts`, one regression test, three paragraphs of root cause. |
| 14 Mar, 05:50 | CI green. |
| 14 Mar, 09:30 | Bristle Quillfeather, Unter's only backend engineer, reads the fix and learns about the outage from it. Merges. |
| 21 Mar | A validation scout confirms recovery to within a point of the February baseline. |

**Root cause:** the tile request lost its auth header in a January refactor.

**Unter:** a ride-share network for hedgehogs. Hosts cut holes in garden fences so hedgehogs can move between streets. The coverage map shows which streets have enough holes to be worth joining.

**Two running mistakes**, used to keep the company credible: they renamed `ride_started` in April and the months either side have never lined up; and their scouts missed a slow memory leak that nobody found until June.

## Step 3: Write in the volume's voice

Past tense. Third person. Named people. Concrete numbers.

Wrong → right:

- *"PostHog captures errors automatically, so you'll know when something breaks."* → *"Error tracking had the exception, with a readable stack trace because the source maps had been uploaded since January."*
- *"This gives you a single source of truth."* → *"Four tools caught four symptoms because four tools were reading the same events."*
- *"Session replay is powerful because it shows you what users actually do."* → *"All 412 sessions were recorded. Nobody watched any of them."*

Also:

- **Cut significance tails.** No clause explaining what a sentence means or why it matters. If it matters, the fact says so.
- **No rule of three.** Two items, or four.
- **Repeat the noun.** Don't rename a thing each time it appears.
- **Plain verbs.** `is`, `has`, `wrote`, `used`. Not `serves as`, `leverages`, `enables`.
- **Sparse em dashes.** Commas, colons, parentheses.
- **Every chapter carries at least one thing that went wrong at Unter**, or the company reads as a demo.

## The step-in device

Second person is allowed in exactly two places in the whole volume, and both already exist:

- `the-outage` — the reader presses retry on the broken coverage map themselves.
- `the-fix` — the reader goes back and finds it working.

Do not add a third. If a chapter feels like it needs one, say so and explain why rather than adding it.

## Step 4: Respect the format

- `<LeftPage>` holds figures, `<RightPage>` holds prose. The reader interleaves them.
- **A figure component's name must end in `Figure`** or the reader prints it uncited at the top of the page. Use `<ExampleFigure>` for placeholders and `<LoopFigure>` where the loop diagram is real. A bare `<Fig>` will not interleave.
- Cite a figure with `<SeeFig n={1} />` mid-sentence. It embeds after the block that cites it. Numbering is per page, starting at 1.
- **Never begin a line with a JSX tag** — including a list item. `- <Term …>` splits the paragraph. Keep inline tags mid-sentence.
- Markdown inside a JSX block needs blank lines around it.
- `#` is the page title, `##` a section heading. Nothing deeper.
- Frontmatter for this volume: `title`, `shortTitle`, `subtitle`, `pocketGuideOrder`, and `isPrimer` on chapter 1 only. **No `pocketGuideCta`** — the CTA shape is still undecided for this volume, so no chapter gets a button.
- `<Term name="…">` only with names that exist in `src/components/PocketGuides/terms.tsx`. Check before using one. Available and relevant: `event`, `person`, `session`, `cohort`, `funnel`, `experiment`, `autocapture`, `exception`, `feature flag`, `session replay`, `rage click`, `replay vision`, `observation`, `console log`, `network request`, `scout`, `signal`, `signal source`, `report`, `inbox`, `self-driving`.

## Step 5: Keep figure placeholders honest

Every placeholder figure carries its shot spec in `legend`: the Unter page, the tool filter, the exact annotation id, and whether it can be captured today or needs building. **Never invent an annotation id.** The real ones, from `overlay/annotations/*.tsx` on branch `posthog-code/interactive-instrumentation`:

- **Shuffle** (`ride`, 15): `topnav/core`, `topnav/web`, `hero-headline/experiments`, `promo-link/web`, `ride-form/replay`, `input-destination/selfdriving`, `btn-see-prices/product`, `acct-row/product`, `tiers/product`, `tier-solo/product`, `btn-signup/product`, `reserve-feature/flags`, `footer-legal/core`, `survey-badge/surveys`, `app-row/core`
- **Host** (`highway`, 11): `topnav/core`, `hw-form/product`, `hw-form/selfdriving`, `input-postcode/replay`, `btn-start-cutting/logs`, `btn-start-cutting/error`, `survey-badge/surveys`, `impact-calc/product`, `host-faq/product`, `refer-block/experiments`, `footer-outbound/product`
- **Safety** (`safety`, 8): `safety-hero/web`, `safe-no-roads/flags`, `coverage-error/error`, `coverage-error/selfdriving`, `safety-longread/web`, `btn-coverage-retry/replay`, `coverage-map/logs`, `page-help/surveys`
- **Help** (`help`, 5): `chat-widget/llm`, `chat-widget/replay`, `chat-bot-msg/llm`, `help-suggestions/experiments`, `help-escalate/surveys`

Tool keys: `core`, `web`, `product`, `replay`, `experiments`, `flags`, `error`, `surveys`, `llm`, `selfdriving`, `logs`.

The counts above are from the annotation files themselves. The branch README quotes a sidebar reading `Shuffle 15 · Host 10 · Help 4 · Safety 9`, which no longer matches — trust the files, and don't "correct" these back.

If a chapter needs an annotation that doesn't exist, write the placeholder anyway and mark the legend **NEW ANNOTATION REQUIRED**.

## Step 6: Verify before you report back

```bash
# MDX parses against the repo's own compiler
node -e "
const mdx=require(require('node:path').resolve('node_modules/.pnpm/@mdx-js+mdx@1.6.22/node_modules/@mdx-js/mdx'));
const fs=require('fs'), dir='contents/pocket-guides/posthog';
const files=[dir+'/index.mdx',...fs.readdirSync(dir,{withFileTypes:true}).filter(d=>d.isDirectory()).map(d=>dir+'/'+d.name+'/index.mdx')];
(async()=>{for(const f of files){try{await (mdx.default||mdx)(fs.readFileSync(f,'utf8'));console.log('OK  ',f)}catch(e){console.log('FAIL',f,e.message.split('\n')[0])}}})()"

# No line or list item opens with a JSX tag
grep -rnE "^\s*(-\s*)?<(Term|SeeFig)" contents/pocket-guides/posthog/ && echo "MDX TRAP" || echo "clean"

npx markdownlint-cli2 --fix "contents/pocket-guides/posthog/**/*.mdx"
```

Then read the rendered page at `localhost:8001/pocket-guides/posthog/$ARGUMENTS`. The reader is the only place the voice can actually be judged — a chapter that reads well in the file and badly in the book is a chapter that failed.

## Don't

- **Don't move the disclosure** in chapter 1. It sits in the fourth paragraph, before any figure, in the same voice as the lede. Reported prose only works if the reader is told Unter is invented before they are shown evidence.
- **Don't present Unter as a PostHog customer**, anywhere, in any caption.
- **Don't add a CTA.**
- **Don't invent PostHog features.** If the story needs a capability, check `contents/docs/` for it first. If it isn't there, change the story.
- **Don't state the thesis early.** Chapters 2–6 show; chapter 7 explains.
- **Don't touch** `contents/blog/best-open-source-analytics-tools.mdx`, `posthog-vs-amplitude.mdx`, `posthog-vs-sentry.mdx`, `contents/docs/ai-observability/user-feedback/manual-event-capture.mdx`, or `contents/docs/error-tracking/upload-source-maps/angular.mdx` — those have unrelated uncommitted work in them.

## Report back with

What changed, which figures are still placeholders, any canon you invented, and anything you could not verify.
