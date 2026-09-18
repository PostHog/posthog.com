> **Disclaimer:** This is Sara's scheduled task. Please edit it so it fits your needs.

```markdown
# Weekly Product Digest

Every Monday at 9 AM, build me a **Weekly Product Digest** from my three product Slack channels — #team-logs, #team-replay, and #team-error-tracking — covering the previous 7 days.

Save it as a live Cowork artifact called *Weekly Product Digest* that I can re-open from the sidebar all week, and refresh it each Monday with the new week's data.

Pull three things, in this order:

1. **Action items & @mentions of me.** Anything I'm tagged in or asked to do. Resolve my Slack user ID once at the start (my email is sara@posthog.com) and look for that ID in messages. For each item, show the channel, author, snippet (~200 chars), timestamp, and a "View in Slack" link.

2. **Decisions & announcements.** Product decisions, launch updates, scope or policy changes — anything that signals "this changed." Skip routine status pings.

3. **Team progress updates.** What the team is working on, milestones hit, blockers cleared. Group items by project/topic with a one-line synthesis under each heading. Skip lunch chatter, gif reactions, and off-topic threads.

If a section is genuinely empty, show *"Nothing this week"* in italic — don't hide it. I want to see that you actually checked.

**Layout:** light mode, clean and scannable. Header has the date range covered, the timestamp of the last update, and the three channels as monospace chips. Each item renders as a small card — channel + author + timestamp on top, snippet below, "View in Slack" link bottom-right opening in a new tab.

**After updating the artifact,** post a short chat summary (under 80 words) flagging the 1–3 things I should look at first — anything blocking a launch, anything I'm tagged on, or any decision that affects my plans. End with a reminder that the full digest is in the sidebar.

**If something breaks:** if a channel can't be reached, note it in the footer rather than failing the whole run. If Slack auth is broken, update the artifact with a banner saying Slack needs to be reconnected — don't invent data. Never produce a silently empty dashboard.
```
