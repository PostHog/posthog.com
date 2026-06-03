> **Disclaimer:** This is Sara's scheduled task. Please edit it so it fits your needs.

````markdown
# Competitor Changelog Watch

**Run a bi-weekly competitive intelligence watch for me (Sara, PMM @ PostHog).** Focus on the four areas where PostHog competes hardest: **error tracking, logs, session replay, and AI-on-replay ("replay vision")**.

## Competitors and sources

**Error tracking**

- Sentry — https://sentry.io/changelog/ and https://blog.sentry.io/
- BugSnag — https://www.bugsnag.com/resources/
- Rollbar — https://rollbar.com/changelog/ and https://rollbar.com/blog/

**Logs / observability**

- Datadog — https://www.datadoghq.com/blog/ (filter to logs/observability)
- New Relic — https://docs.newrelic.com/whats-new/ and https://newrelic.com/blog
- Splunk — https://www.splunk.com/en_us/blog/ (filter to product/observability)
- Elastic — https://www.elastic.co/blog (filter to observability/logs)
- Grafana Loki — https://grafana.com/blog/ and https://github.com/grafana/loki/releases
- Better Stack — https://betterstack.com/changelog and https://betterstack.com/community/

**Session replay**

- Microsoft Clarity — https://learn.microsoft.com/en-us/clarity/mobile-sdk/sdk-changelog and https://clarity.microsoft.com/blog/
- FullStory — https://help.fullstory.com/hc/en-us/articles/4410282600343-Fullstory-Release-Notes
- LogRocket — https://blog.logrocket.com/
- Hotjar — https://www.hotjar.com/blog/

**Replay vision / AI-on-replay** (strategic focus area)

- HumanBehavior — https://www.humanbehavior.co/
- AutoPlay AI — https://www.autoplay.ai/
- Decipher — search "Decipher session replay" on first run, then use the domain
- Contentsquare — https://support.contentsquare.com/hc/en-us/articles/37271835021201-Releases-and-Updates-for-2025
- Amplitude — https://amplitude.com/releases (filter to Session Replay / AI items only)
- Sprig — https://docs.sprig.com/changelog
- Pendo — https://support.pendo.io/hc/en-us/categories/15374632651291-What-s-new
- Glassbox — https://www.glassbox.com/blog/
- UXCam — https://uxcam.com/blog/

## How to run

1. Fetch URLs in parallel. If a page returns a client-rendered shell, retry with Chrome. If it 404s, note it once at the bottom and move on — don't loop.
2. **Only include items dated in the last 14 days.** Use visible date stamps on the page; don't summarize archive content.
3. **Ignore noise** — minor bug fixes, hiring posts, regional/legal updates, generic thought-leadership. **Keep** — new launches, pricing changes, repositioning, AI/agent features (especially multi-session summaries, NL search, MCP, autonomous replay agents), new SDKs/integrations, anything that shifts their story vs PostHog.
4. For each item that survives, write 2–3 lines:
   - What they shipped (one sentence)
   - Why it matters for PostHog (closes a gap, opens a gap, reframes positioning, validates a direction)
   - Source link
5. If a competitor shipped nothing relevant, say **"Nothing notable"** in one line. Don't pad.
6. **Pay extra attention to:**
   - **Better Stack** — going hard after our buyer ("30x cheaper than Datadog", AI SRE, contract buyouts)
   - **HumanBehavior, AutoPlay AI, Decipher** — AI-native "parasitic VLM" replay startups; directionally where PostHog is heading
   - **Amplitude's Session Replay Agent and Contentsquare's Sense Analyst** — autonomous replay agents; track every iteration

## Output (in chat, no file)

```
# Competitor Watch — [date range]

## Headlines
2–3 bullets naming the biggest moves of the cycle. Skip if nothing notable.

## Error tracking
### Sentry
…
[etc.]

## What I'd action this cycle
1–3 concrete suggestions: battlecard update, blog response, sales talking point, gap to flag to product or #team-replay. Skip if nothing.

## Couldn't reach
(only if URLs failed)
```

Keep the whole digest under ~1000 words. I read this once and decide what to do — be ruthless about signal vs noise. Most competitors will be "Nothing notable" most weeks, and that's the right answer.
````
