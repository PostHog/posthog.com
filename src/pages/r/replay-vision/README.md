# Replay Vision paid-search landing page

Route: `/r/replay-vision`. This isolated campaign page connects Session Replay searches to Replay Vision. It reuses the shared Editor, CTA, Link, ZoomImage, product metadata, and installation-command components. The existing `/replay-vision` product page is unchanged. No experiment is configured. The page is noindex. Earlier comparison versions remain in Brian’s local workspace and are not included in this branch.

## Editorial direction

Keep the approved Session Replay-to-Replay Vision opening, magnifying-glass hog, paper/grid treatment, strong CTAs, real observation screenshot, and prominent wizard/MCP. Lead with benefits and useful examples; keep setup prerequisites and billing mechanics in supporting copy. Existing published copy supplies the supporting material, with the approved hero headline/paragraph as an explicit exception. Do not describe the whole page as zero new copy.

## Audit changes applied

- Current scanner descriptions replace older checkout wording. User intent, Session outcome, and Session summary come first.
- Output badges use existing scanner-type definitions; the misleading custom-scanner “Your prompt” badge is removed.
- The scanner explanation uses the documented background/on-demand distinction without an exhaustive-scanning promise.
- Existing live headings replace new decorative headings, and unsupported reading-card summaries are removed.
- The original screenshot stays genuine. Neutral “Confidence and citations” framing and its exact prompt caption avoid presenting its No verdict as a positive bug detection.
- The standalone Calibration and Impact and cohorts callouts were removed in the September 22 visual refinement. Their documentation links remain inside the observations FAQ disclosure, keeping detail available without interrupting the page.
- An early “In the app” link and visible template-setup card support PMs. MCP is no longer presented as an alternative to recording setup.
- MCP examples lead with summarizing findings, then affected users/cohorts, while retaining the original scoped scanner-creation prompt in a disclosure.
- MCP capability rows use small, monochrome PostHog icons in place of invisible list markers. The existing capability copy is unchanged; icons are decorative for assistive technology.
- Free allowance copy uses an existing published excerpt. Pricing explains model-dependent credits and links to the estimator. No universal observation allowance.
- Existing prerequisite copy includes organization-admin AI-processing approval.
- Daily digest appears in a compact disclosure with the existing self-driving requirement and separate billing text. No promise that scouts are included in Replay Vision credits.
- Decorative hogs have empty alt text; the meaningful screenshot uses its existing published description.

## Copy provenance (checked September 22, 2026)

| Content | Published source |
| --- | --- |
| Approved hero and matching SEO title | Explicitly approved adaptation in this conversation; sole substantive editorial exception |
| Current six scanner descriptions; “Your product, watching itself”; free-credit excerpt/full pricing sentence; “What does it do?”, “In the app”, “Install with AI in a single prompt” | https://posthog.com/replay-vision |
| Session Replay input description | First sentence of https://posthog.com/session-replay “What does it do?” |
| Intro, continuous-scanning sentence, observation definition excerpt, “How it works”, “Further reading” | https://posthog.com/docs/replay-vision |
| Background/on-demand scanner sentence | First sentence of https://posthog.com/docs/replay-vision/running-scanners |
| Scanner output definitions, confidence heading | https://posthog.com/docs/replay-vision/scanner-types |
| Wizard paragraph, editable setup, template UI, recording prerequisite, screenshot captions and alt, estimator label | https://posthog.com/docs/replay-vision/start-here |
| Observation-list sentence and queryable event paragraph | https://posthog.com/docs/replay-vision/observations |
| MCP body, complete capability bullets, client sentence, all three example prompts | https://posthog.com/docs/replay-vision/mcp |
| Model-dependent observation cost sentence | https://posthog.com/docs/replay-vision/quota-and-limits |
| AI-processing approval sentence | https://posthog.com/docs/replay-vision/troubleshooting |
| Daily digest description, enabled-project requirement, separate billing sentence | https://posthog.com/docs/replay-vision/scouts |
| Paying-customers line and Get started free CTA | https://posthog.com/r/session-replay |
| Reading-card titles, privacy/mobile/troubleshooting labels | Their destination pages |

Unchanged excerpts can end before the source sentence ends; punctuation/capitalization and numeric section labels are presentational. Product names, generic diagram labels, and breadcrumb composition are interface text. The page does not claim literal full-string identity for every interface label or shared component's global text. Local docs are older than published docs; relative internal links intentionally follow the site's conventions, so a local documentation preview may still show obsolete beta/quota language.

## Assets and behavior

- Hero: Brian's Cloudinary upload `magnifying_glass_019bc5b2d4.png`, existing Hoglitos art. CSS scale compensates for transparent padding; no image content was generated or altered.
- Evidence: existing `observation_detail_monitor_77a2192684.png`, with ZoomImage.
- Footer: existing `src/images/explorer-hog.png`.
- WizardCommand owns SDK/MCP command generation and clipboard handling.
- All seven native details disclosures start closed, including MCP examples, prerequisites, pricing, integrations, and the daily digest. Visitors can open each independently.
- Layout uses container queries. No shared styles, navigation, window management, or build pipeline changes.
- Same-page anchor clicks are handled within this Editor to avoid the desktop window's default hash navigation scrolling beyond the target. Modified-click behavior is preserved. These local jumps deliberately leave the URL unchanged.

## Validation

Rendered in the running Gatsby site at desktop width 1280 and mobile width 390. Hero, screenshot, footer art, setup paths, pricing, and MCP sections load. Document width matches viewport width at both sizes; MCP has no elements extending beyond the mobile viewport. The in-app anchor lands at the setup section, all same-page targets exist, and the new scanner-creation and daily-digest disclosures open. Prettier and whitespace checks pass. Existing-page hashes remain unchanged. This was a focused development-preview check, not a full production build.

The subsequent callout/icon refinement was checked at widths 398 and 1280: all three MCP icons render at 20 × 20 pixels, neither viewport has horizontal document overflow, and neither removed callout remains. Version one and two hashes still match the originals below.

## Review branch checks

All seven disclosures start closed. A focused browser check verifies their defaults and opening/closing in light and dark mode at widths 640 and 1440. Screenshots are attached to the PR. The development preview runs in the original checkout; this branch is based on upstream master at `20ecfc3676f45959827e07c27741e7ddb2576885`. A production build and the hosted branch preview remain required before merge.
