---
title: User feedback
sidebar: Handbook
showTitle: true
---

> 😍 Want to share feedback? [File a GitHub issue](https://github.com/PostHog) or [reach out directly](https://app.posthog.com/home#supportModal). **We're always happy to hear from you!**

We actively seek (outbound) input in everything we work on. In addition to having multiple channels to continuously receive inbound feedback, we generally do active outbound feedback requests for:
- General product and experience feedback. Continuous effort to gather general feedback on the product and their holistic experience with PostHog are led by the PMs supporting the team.
- Usability tests. We generally run these for new big features the Engineering team is working on. Run by the engineer building that feature.

### Feedback call process

**Recruiting users**

Ways to invite users for an interview:
- [PostHog Surveys](https://app.posthog.com/survey_templates). We even have a template for [user interviews](/templates/user-interview).
   - We recommend to create a cohort first (with a static copy), and use that as a display condition.
   - We have more and more surveys running, therefore it's best if a survey wait period is applied. We recommend 14 days.
   - If your cohort is large (>1,000 users), it's best to not roll it out to 100%, as you might get overwhelmed by the amount of interviews in a short period of time. Start with 20-30% and increase if you need more interviews.
   - PMs use cal.com for scheduling interviews, but you can choose a different tool as well.
- If a customer has requested a feature through Slack, then message them directly.
- Email customers who have subscribed to the feature on the [roadmap](/roadmap).

**Scheduling**
- Add all feedback calls to the [User interviews calendar](https://calendar.google.com/calendar/?cid=Y19tczllaWN1Ym92ZGgxYWhzNmtoY2xpNTQ3b0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t). If the invite was created from your own calendar, you can simply add "User interviews" as an invitee.

**During the call**
- We recommend recording interviews using [BuildBetter](https://app.buildbetter.app/). Please, always ask and make sure the user is comfortable with being recorded before doing so.
   - Once the user confirms they are okay with this, you can easily trigger the recording by clicking on `Join a call` on the BuildBetter homepage and copy-pasting the call URL.
   - If you do not have access to BuildBetter yet, drop a message in the `#pm` Slack channel.
   - If you have any feedback, bug to report or feature request for BuildBetter, we have a [shared Slack channel](https://posthog.slack.com/archives/C080Q451P3M) with them, feel free to directly message their team there.
- Do a quick round of intros if you haven't met previously.
- If this is the first interview with the user, ask them for context about their company, their role, if they're technical.

**After the call**
1. If you used BuildBetter, the tool will automatically generate a summary for you under the recording. We recommend checking this, and adding any additional thoughts, because the AI can sometimes pick up things incorrectly. You can also generate a doc using the platform, where you can give very specific prompts for the outline of the summary.
   1. We also want to keep recordings easily identifiable, therefore please rename the recording to `[topic of the interview] user interview with [first name of the user]`, e.g. Web analytics user interview with Joe.
2. In case recording wasn't possible, add the notes to the [Google Doc][feedback-doc].
3. Share a short summary of the user interview in the `#posthog-feedback` Slack channel.
4. If the user reported specific bugs or requested specific features, open the relevant issues in GitHub. Be sure to link to their person profile in case our engineers needs more context when scoping/building.
5. Generate the reward for the user (see below).
   1. Most of the time, the reward will be a gift card for the [PostHog merch store](https://merch.posthog.com/). If it's the case, create the gift card in Shopify.
6. Follow-up with the user. Send any applicable rewards, links to any opened GitHub issues, and answers to any outstanding questions.

### Rewards 
We strongly value our users' time. As such, we usually send a small gift of appreciation. We have the following general _guidelines_, but just use your best judgement.
- Generally we send users a gift card to the [PostHog merch store](https://merch.posthog.com/) with around $30 of value.
- When the above is not an option (e.g. user has received merch already) we can offer the user a $30 gift card with [Open Collective](https://opencollective.com/).
- The instructions on how to create gift cards can be found [here](/handbook/growth/sales/yc-onboarding#after-the-call).

### Repositories of information 
We keep a log of user feedback in the following places:
- **BuildBetter.** Starting 2025, we keep track of all user interviews (recordings & notes) in [BuildBetter](https://app.buildbetter.app/).
- **Feedback notes.** Feedback notes are mainly kept in this [Google doc][feedback-doc].
- **Old recordings.** All older recordings are kept in [this folder][recordings] in the Product shared drive.

### Additional notes
Any PostHog team member may receive feedback at any time, whether doing sales, customer support, on forums outside of PostHog or even friends & family. If you receive feedback for PostHog, it's important to **share it with the rest of the team.** To do so, just add it to the [#posthog-feedback](https://posthog.slack.com/archives/C011L071P8U) channel.

<blockquote class='warning-note'>
To ensure feedback durability and visibility, the #posthog-feedback channel should not be used as the primary source of <i>storage</i>. Please add the feedback to the main Google doc.
</blockquote>

**We strongly recommend that everyone joins at least one user call per month.** Regardless of your role, you will always benefit from staying in the loop with our users and their pain.

[feedback-doc]: https://docs.google.com/document/d/1762fbEbFOVZUr24jQ3pFFj91ViY72TWrTgD-JxRJ5Tc/edit
[recordings]: https://drive.google.com/drive/folders/1kmhj0GMAZTjVauN8JJKs_U7BgaD7XnUJ?usp=sharing
