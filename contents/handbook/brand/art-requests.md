---
title: Art, brand, and merch requests
sidebar: Handbook
showTitle: true
hideAnchor: false
---

> 🎨 **Need artwork or merch?** Please request it using the [request templates](https://github.com/PostHog/marketing/issues/new/choose). Do not request art or merch over Slack or email.

All artwork and merch requests are handled by <TeamMember name="Lottie Coxon" />, <TeamMember name="Heidi Berton" />, and <TeamMember name="Daniel Hawkins" /> on the Graphics team.

They can help you with things like:

- Custom visuals for paid ad campaigns
- Blog and social media artwork
- New themed hedgehogs
- Custom CTAs and banners
- Branded merch 
- Animated UI elements

> 💡 **You might not need a request at all.** [brand.posthog.com](https://brand.posthog.com) has ready-made brand assets — logos, colors, hedgehogs, and crests — that any team can use without filing an issue. The [hedgehog library](#hedgehog-library) below covers approved hogs too.

They get a lot of work requests, so they use two separate project boards to organize work – [one for merch](https://github.com/orgs/PostHog/projects/178) and [one for other art projects](https://github.com/orgs/PostHog/projects/65/views/2). This reflects that merch projects often have much longer timelines and need to be handled differently. 

Whenever you want to request a new merch design or other artwork, you should [use the relevant design request templates in the marketing repo](https://github.com/PostHog/marketing/issues/new/choose) – one template for merch, one for other art requests. Each template automatically assigns work to the correct project board. 

### Art board automations

The Art & Brand Planning board uses GitHub Actions to keep work moving:

- **Reminders** — A daily job (9 AM UTC) posts one-time comments on issues that have been stuck in...
  - **Feedback/Review** for 10+ days: asks if any feedback is needed to move the task forward.
  - **No Status** for 7+ days: asks someone to pick it up or assign it to a column.
- **Status changes** — A job polls the board every 30 minutes and reacts to Status changes:
  - **Moved to "Done"** → the issue is automatically closed (as completed).
  - **Moved to "Assigned: Daniel", "Assigned: Lottie", or "Assigned: Heidi"** → other default assignees are removed so only the assigned person is on the issue. Internal requests (from the design team) keep all assignees.
  - These changes do not impact the "Assigned: Cleo" column, as Cleo has a different workload.
- **Artist labels** — Every 30 minutes, open issues in an "Assigned: ..." column get a matching label for that artist, so the work can be filtered per person.
- Workflows run under the **Art Board Bot** GitHub App and live in the [marketing repo](https://github.com/PostHog/marketing) under `.github/workflows/` (`art-board-reminder.yml`, `art-board-reminders.yml`, `art-board-status-change.yml`, `sync-artist-labels.yml`). The board is org-level, so they act on art board issues wherever those issues live.

To establish a clear connection between the task and the working file, designers will create a frame containing a link to the task. They should then add a link to that frame within the task for easy reference.

Please give **two weeks notice** for new briefs — this is the preferred minimum, and more time is always better. For reference, the team receives roughly 25-30 new art requests a month, so new briefs are rarely picked up the day they land. A **one-week turnaround is only possible for actual emergencies.** If your request is a genuine emergency, please share your request issue in [#team-graphics channel](https://posthog.slack.com/archives/C0AU440KS6P) and mention Lottie, Daniel, and/or [Cory](/community/profiles/30200).

If you need to chase for an update on a request, the best place to do it is a comment on the issue itself, not a Slack DM. Comments keep the context with the brief, notify the assigned artist, and the team triages from the project board.

## Hedgehog library

For team members we keep all our currently approved hedgehogs [in this Figma file](https://www.figma.com/file/I0VKEEjbkKUDSVzFus2Lpu/Hoggies?type=design&node-id=0-1&mode=design&t=H3ElmuzbLMFp4qP7-0). This enables us to look through the library of approved hogs, and to export them at required sizes without relying on the design team.

Here's how:
1. Open the Figma file. You can manually browse, or use `Cmd + F` to search based on keywords such as 'happy', 'sad', or 'will smith'.
2. Select the hog you want. If needed, adjust the size using the 'Frame' menu in the top of the right-hand sidebar. 
3. At the bottom of the right-hand sidebar, select the file type you need in the 'Export' menu, choose `@2x`, then select 'Export [filename]' to download the image.

If you can't find a suitable hog, you can [request one from the design team](/handbook/brand/art-requests). 

> Non-team members can find some of the most-used hogs to download on [our press page](/media).
