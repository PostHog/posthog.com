---
title: User feedback
sidebar: Handbook
showTitle: true
---

Gathering user feedback is critical for the development of our product. It's not about casually listening to users, or just paying attention to bug reports, we actively seek (outbound) input in everything we work on. In addition to having multiple channels to continuously receive inbound feedback, we generally do active outbound feedback requests for:
- General product and experience feedback. Continuous effort to gather general feedback on the product and their holistic experience with PostHog. Usually run by the [Feedback Hero](#feedback-hero).
- Usability tests. We generally run these for new big features the Engineering team is working on. Usually run by the Product Team.

> 😍 Want to share feedback? Simply send us an email to [hey@posthog.com](mailto:hey@posthog.com) or reach out on [Slack](/slack). **We're always happy to hear from you!**


### Feedback Hero
Previously a single person owned the feedback process. As we grew, we created the Feedback Hero ([see discussion](https://github.com/PostHog/product-internal/issues/98)) to scale our feedback process. The Feedback Hero is **rotated every two weeks**. This person is in charge of:
1. Proactive reach out to users to schedule feedback calls.
2. Having the feedback calls.
3. Housekeeping. Logging the relevant notes and other reports (see [process](#feedback-process)) below. Send the user applicable rewards as a thank you for their time.
4. Follow-up. Create any relevant issues, follow-up with users around specific issues, questions or concerns.

The Feedback Hero rotation can be found [in this doc](https://docs.google.com/spreadsheets/d/1DkD-Jw_LvSixhBK7-m8UO_r7g_wAW0IvoeAjg3IawNg/edit#gid=0).

### Feedback call process

**Scheduling**
- Make sure all feedback calls are registered in the [User interviews calendar](https://calendar.google.com/calendar/?cid=Y19tczllaWN1Ym92ZGgxYWhzNmtoY2xpNTQ3b0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t). If the invite was created from your own calendar, you can simply add "User interviews" as an invitee.
- Notify team members of upcoming calls in the [#product](https://posthog.slack.com/archives/C01RJ7T212S) channel to invite them to join.
- Not a hard rule, but it's usually good to limit the number of team members (around two) joining from our side to foment a more intimate chat. 


**During the call**
- Do a quick round of intros if you haven't met previously.
- Ask the user if it's okay to record the conversation (mention we only use internally and keep for 3 months maximum).
- If this is the first interview with the user, ask them for context about their company, their role, if they're technical.
- The topics of the conversation are usually better informed from the previous step. It's always more helpful to talk about topics where the user has had more experience. It's however always useful to consider what we're currently working on at Product/Growth/Marketing and ask questions that could help each team do a better job.


**After the call**
1. Upload the recording to the [recordings folder][recordings], be sure to follow naming conventions.
2. Add the notes to the [Google Doc][feedback-doc], linking the recording. Try to keep them as clean as possible.
3. If the user reported specific bug reports or specific feature requests, open the relevant issues in GitHub. Be sure to link to their Orbit and/or Hubspot record in case Engineering needs more context when scoping/building.
4. Generate the reward for the user (see below).
   1. Most of the time, the reward will be a gift card for the [PostHog merch store](https://merch.posthog.com/). If it's the case, create the gift card in Shopify. Make sure to **add a link to their Orbit profile** in the notes section and set the **default expiration date** (5 years), and make note of the gift card code.
5. Register call on Orbit. Remember to link the notes, add appropriate labels (e.g. `received merch`) and information on the rewards sent.
6. If the customer is Sales/Scale, register the call on Hubspot too (but linking to Google doc notes).
7. Follow-up with the user. Send any applicable rewards, links to any opened GitHub issues, and answers to any outstanding questions.


### Rewards 
We strongly value our user's time. We particularly acknowledge the value it provides us in building a better product. As such, we usually send a small gift of appreciation. We have the following general _guidelines_, but just use your best judgement.
- Generally we send users a gift card to the merch store with around $50 of value.
- When the above is not an option (e.g. shipping restrictions, user has received merch already) we default to Amazon gift cards. Use your Brex card to purchase these (and remember to follow our [spending guidelines](/handbook/people/spending-money)). Contact Paolo to join our Amazon Business account.
    > To avoid operationally complexity, we try to send only Amazon US cards, but generally sending cards on Amazon UK, IT, DE, MX or BR has worked in the past. Due to card restrictions, **we can't support Amazon IN**.


### Repositories of information 
We keep a log (notes) of user feedback to continuously aid in the product development process. Recordings are kept at most 3 months to respect our user's privacy. User feedback is registered in the following places:
- **Feedback notes.** Feedback notes are mainly kept in this [Google doc][feedback-doc].
- **Feedback records.** Our source of truth for records of users who we have interviewed is [Orbit](https://app.orbit.love/posthog/activities?activity_type=custom%3AFeedback+call&affiliation=member). 
- **Feedback records for Scale/Sales customers.** For Scale customers or sales-focused customers, we also register any records on **Hubspot** (and link the relevant notes/Orbit record). This is not intended as a source of truth for the scope of feedback calls, but rather for the benefits of team members doing sales efforts.
- **Recordings.** All recordings are kept in [this folder][recordings] in the Product shared drive. Recordings are kept for up to 3 months.
- **Usability tests.** As usability tests are done with a specific focus, we create issues for each feature in the product-internal repo ([example](https://github.com/PostHog/product-internal/issues/157)). Notes related to this issue  only are kept in their respective issue. Recordings are still kept in the same folder, as well as the appropriate Orbit record. 

### Additional notes
Any PostHog team member may receive feedback at any time, whether doing sales, customer support, on forums outside of PostHog or even friends & family. If you receive feedback for PostHog, it's important to **share it with the rest of the team.** To do so, just add it to our [feedback doc][feedback-doc].

Some feedback is particularly worth highlighting to the rest of the team. To do so, just share the snippet on the  [#posthogfeedback](https://posthog.slack.com/archives/C011L071P8U) channel and link to the [doc][feedback-doc] if applicable.

<blockquote class='warning-note'>
To ensure feedback durability and visibility, the #posthogfeedback channel should not be used as the primary source of <i>storage</i>. Please mainly add the feedback to the main Google doc.
</blockquote>

If you're not part of the [Feedback Hero](#feedback-hero) rotation, **we strongly recommend you to join at least one feedback call per month.** Regardless of your role, you will always benefit from staying in the loop with our users.

[feedback-doc]: https://docs.google.com/document/d/1762fbEbFOVZUr24jQ3pFFj91ViY72TWrTgD-JxRJ5Tc/edit
[recordings]: https://drive.google.com/drive/folders/1kmhj0GMAZTjVauN8JJKs_U7BgaD7XnUJ?usp=sharing
