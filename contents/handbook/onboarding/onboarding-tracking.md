---
title: Onboarding process
sidebar: Handbook
showTitle: true
---

The onboarding team operates a high volume, high velocity sales pipeline with all pay-as-you-go (or YC) accounts that are forecasted to spend > $500 and are not otherwise engaged by Sales/CSM. As such, Onboarding is a linear flow moving from initial outreach to confirming the product is configured properly, ending with customers who are happy paying multiple bills. We aim to keep engagements to ~8 weeks, or 2 full billing periods, but in practice, there is some spillover depending on responsiveness.

### Principles

Our onboarding program was created to offer necessary help, increase the value our customers get from PostHog, and assist them in achieving their business goals.

The program is guided by a few key principles:

- Help with initial configuration and billing, offer advice on usage.
- Assist customers with any technical questions they have around fitting PostHog into their stack.
- Act as strategic partners in achieving business goals.
- Adapt to varied levels of engagement while ensuring value for everyone.
- Encourage time spent in PostHog, trying things out. Adoption can be fun!
- Share best practices to leverage PostHog tailored to specific use cases.

### Internal process

#### Customer Analytics view

**Comprehensive onboarding view** (<PrivateLink url="https://us.posthog.com/project/2/customer_analytics/accounts?view=01a11d0a-3430-73f3-be27-777e0b6c904b">link</PrivateLink>)

The view is automatically sorted by Onboarding Priority. The formula weights MRR, renewal date, when we last contacted the account, and more, so you mostly work from the top to the bottom of the queue. Since our role is focused on proactively providing users with value and setting them up for success, we’ve found it’s best to contact them ~14 days before their bill renews. This gives them enough time to see our email, schedule a call, and implement potential improvements in their setup.

**Onboarding Eligibility** is calculated for you, so you never set it by hand. An account is `Eligible` when it has a next bill date, at least $500 forecasted MRR, three billed months or fewer, no CSM or AE, no active trial, and isn't cancelled or deactivated. Once it's in the pipeline it reads `In progress`, and when it's finished it reads `Done`. An account that stops qualifying drops to `Not eligible` on its own.

**Onboarding Priority** runs from 0 to 100 and only has a value on `Eligible` and `In progress` accounts. It's built from how soon the next bill is (0 to 14 days scores highest), the strongest usage or billing signal, forecasted MRR and a small ICP fit bump. Anything the team emailed in the last 13 days scores 0, so you don't double up on a teammate.

Keep an eye on “Onboarding Pipeline,” which indicates whether the account is New or Onboarding has been initiated.

In the view, you have other useful columns like OS Priority, OS Last Messaged, forecasted MRR, or who’s assigned to the account. All these help in prioritizing your work.

Maintaining good hygiene and attention to detail is key here. Keep labels up to date and make sure not to miss accounts that were recently added to the queue—they might appear at the top of the list among accounts you’ve already worked through.

Remember to add a short summary from meetings in a Note, and if you need to follow up at some point, create a Task with a due date.

#### Onboarding program - logic and sequence

There are two paths for customers to progress through the onboarding process: those who engage with us in some way, and those who show little or no engagement.

User engagement is tracked behind the scenes with the time stamp in Customer Analytics, thanks to which we can query relevant data. 

For day-to-day operations, these are the statuses we use to track users in the **Onboarding Pipeline** property:

- `1. New Account` - Where new customers land when they become eligible. `Onboarding:: Enter queue` sets it once a day and adds the `onboarding lead` tag. During the outreach, we audit the account and share observations on current usage and optimization tips. We point out any configuration issues affecting their bill or ability to use the product properly. Our main objective is oriented towards trimming unnecessary spending, and communicating our position that [we are the cheapest for every product](https://posthog.com/why). This step can also involve refunding/adjusting bills for misconfigurations, per [our policy](https://posthog.com/handbook/growth/sales/refunds).
- `2. Onboarding Initiated` - Assigned as soon as the first outreach goes out, whether the email sequence sent it or you did from your own inbox.
- `3. Onboarding Completed` - The onboarding program has been completed, by the email sequence, by the daily close-out, or by hand.
- `Sales Handoff` - Assigned to customers that we [hand over to sales](/handbook/onboarding/sales-handover). This can happen at any stage throughout the process.
- `Purchased Onboarding Call` - Assigned when someone buys our consultation via the merch store. The status is applied automatically via <PrivateLink url="https://us.posthog.com/project/2/workflows/019ae005-7196-0000-2099-ab41737ab9f6/workflow">this Workflow</PrivateLink>.
- `Onboarding Intervention` - Set by `Onboarding:: Scaled CS intervention` when it emails an unmanaged account above $20k ARR about a billing moment (more visits to the billing page, a usage spike that's also a billing spike, or a billing limit set on a product). It can land on an account at any stage except 1 and 2, and the sender becomes the account's Onboarding specialist for 30 days.

The last three are not numbered, as they happen "outside" of the regular pipeline.

You don't need to keep tags or dates in step by hand. `Onboarding:: Stage reactor` does it on every stage change: it adds `onboarding lead` on stages 1 and 2, swaps it for `onboarding completed` at the end, and stamps the date the account first reached each stage. The first teammate to email an unassigned stage 1 or 2 account from their own inbox becomes its **Onboarding specialist**, and the specialist is cleared when the account is completed or handed to sales.

On day 14 of the journey, the email sequence sets the `Check-in` **Onboarding Status** property. It serves us as a visual helper and reminder to circle back to the account, see if our advice was followed, record a Loom video, or share some extra resources. It's a great opportunity to re-engage customers and show them some other PostHog's capabilities that they may not know about. It clears on its own once you email the account.

The complete Onboarding Journey runs in `Onboarding:: Email sequence`. The days count from when the account reaches `2. Onboarding Initiated`:

| When | What happens |
| -------- | -------- |
| Entry, under $600 forecasted MRR | Email 1 (billing and implementation) goes out automatically, and the account moves to `2. Onboarding Initiated` |
| Entry, $600 to $1,000 | Email 1 goes out automatically 7 days before the next bill |
| Entry, $1,000 and up | No automated email. A person writes the first outreach, and the account moves to `2. Onboarding Initiated` once that email syncs |
| Day 14 | `Check-in` status is set. Accounts between $500 and $600 also get email 2 |
| Day 28 | Last chance: a nudge to book a call, plus PostHog AI. Skipped if the account was ever handed to sales |
| Day 49 | Graduation, only for accounts that had a call with us or replied. Everyone else with no call booked and no team email in the last 7 days moves to `3. Onboarding Completed` with no email |
| Day 60 | `Onboarding:: Close out finished sequences` moves anything still at stage 2, with no onboarding email in 14 days, to `3. Onboarding Completed` |

When you write to a `1. New Account` from your own inbox, `Onboarding:: Set "Onboarding Initiated" when contacted by OS` moves it to stage 2 for you, and the sequence picks it up at the day 14 step. Your email reaches the account through the email sync, which can take a few hours to show up in the queue.

Every automated email skips an account that has a CSM, AE or TAM, carries any tag containing `referral`, has no admin emails, has a call booked, or has **Onboarding opted out** set to Yes. From email 2 on, it also skips anyone the team emailed in the last 7 days, and email 1 also skips an account someone else at PostHog emailed in the last 30 days.

Last chance prompts users to surface unanswered questions and book a session with us, and the Graduation email is a nice way to conclude the journey and point out other avenues where users can get help. It's also where we ask for feedback about our Onboarding.

#### Email link tracking

Every link in the automated onboarding emails carries UTM parameters, so we can measure what customers actually click and report on notebooks created and prompts clicked rather than calls booked. The scheme is `utm_source=onboarding`, `utm_medium=email`, `utm_campaign=onb_e1` through `onb_e4` (one value per email in the sequence), and `utm_content` naming the individual link:

| Email | Tracked links (`utm_content`) |
| -------- | -------- |
| E1 - first outreach (cost + implementation) | `audit_prompt`, `billing`, `wizard_docs`, `calendly` |
| E2 - second outreach (adoption) | `audit_prompt`, `calendly` |
| E3 - last chance | `ai_assistant`, `prompts`, `calendly` |

Where the numbers live:

- The main view is the **Onboarding email link tracking** dashboard (<PrivateLink url="https://us.posthog.com/project/2/dashboard/1946614">link</PrivateLink>): per-email sections, per-link breakdowns, and all-time totals.
- App links (the audit prompts, PostHog AI) sit behind a login: a logged-out click bounces to the sign-in page and its UTM properties are lost. The executive **Onboarding email link clicks (E1-E4)** insight (<PrivateLink url="https://us.posthog.com/project/2/insights/TKyFrkIR">link</PrivateLink>) therefore matches the campaign tag inside the page URL, which survives the redirect in double-encoded form, so every click counts whether or not the customer was logged in. A separate insight on the dashboard isolates the login-wall bounces.
- Calendly clicks never reach PostHog. Calendly stores the UTMs on each booking instead, so filter the Calendly Meetings page by `utm_campaign` to attribute booked calls to emails.
- The YouTube link in E3 is deliberately untracked (YouTube ignores UTM parameters, and we cannot read its analytics).

The live email templates are in the Workflows <PrivateLink url="https://us.posthog.com/project/2/workflows/library">library</PrivateLink>. The templates are the canonical copies of the audit prompts and the full tracked URLs. We avoid pasting the tracked URLs here so stray clicks from this page do not pollute the data.

#### Account analysis for outreach and meetings

-   Take a look at the [Metabase primer](https://posthog.com/handbook/onboarding/metabase-account-analysis) and follow the tips included there.
-   Check and get familiar with the [Account health check](https://posthog.com/handbook/customer-success/health-tracking) and the [Onboarding conversations](https://posthog.com/handbook/onboarding/onboarding-conversations-playbook) pages.
-   Use our docs, and link to relevant information.
-   Check the [Matching PostHog to a business type](https://posthog.com/handbook/growth/sales/utilization-by-business-type) page to understand your customers better in general.
-   Use Wappalyzer (browser or extension) to understand the customer's tech stack better. Credentials available in 1password.

### How this is organized in Workflows

All onboarding automation lives in the `Onboarding::` <PrivateLink url="https://us.posthog.com/project/2/workflows">workflows</PrivateLink>:

- **<PrivateLink url="https://us.posthog.com/project/2/workflows/01a05810-fb1c-0000-5c4d-7ae187210c4d/workflow">Enter queue</PrivateLink>** - Every day, moves eligible accounts with no onboarding stage to `1. New Account` and adds the `onboarding lead` tag.
- **<PrivateLink url="https://us.posthog.com/project/2/workflows/01a0c9f0-60a6-0000-af22-9cd658e27d6c/workflow">Email sequence</PrivateLink>** - Sends all four onboarding emails (first outreach, second outreach, last chance, and graduation) and moves the account through the stages. It skips accounts that have an owner, a referral tag, a booked call, no admin emails, or that opted out.
- **<PrivateLink url="https://us.posthog.com/project/2/workflows/01a0c9ee-f490-0000-4f72-e7640fd225e1/workflow">Stage reactor</PrivateLink>** - Keeps the tags, stage dates, and Onboarding specialist in step with the stage. It also moves referral accounts to `Sales Handoff`.
- **<PrivateLink url="https://us.posthog.com/project/2/workflows/01a12061-1ad1-0000-2b7e-9f88bc570da1/workflow">Set &quot;Onboarding Initiated&quot; when contacted by OS</PrivateLink>** - Moves an account from `1. New Account` to `2. Onboarding Initiated` when someone on the team emails it from their own inbox.
- **<PrivateLink url="https://us.posthog.com/project/2/workflows/01a11b55-55c2-0000-ecfc-d8c471e18ffb/workflow">Automated 'check-in' status removal</PrivateLink>** - Clears the Check-in status after a specialist emails the account.
- **<PrivateLink url="https://us.posthog.com/project/2/workflows/01a0859c-b295-0000-9509-e7e282dc9f20/workflow">Check in after the meeting</PrivateLink>** - Creates a task for the Onboarding specialist 14 days after a meeting.
- **<PrivateLink url="https://us.posthog.com/project/2/workflows/01a11165-4311-0000-eec5-642052e6944c/workflow">Consider referring to Sales</PrivateLink>** - Every week, creates a task for high-spend accounts that can be a good fit for Sales.
- **<PrivateLink url="https://us.posthog.com/project/2/workflows/01a0c97d-358a-0000-6ee6-d8b989c088a3/workflow">Close out finished sequences</PrivateLink>** - Every day, moves accounts that finished the sequence from `2. Onboarding Initiated` to `3. Onboarding Completed`.
- **<PrivateLink url="https://us.posthog.com/project/2/workflows/01a07bfe-b0f8-0000-7687-9575eeec3b0f/workflow">Automated Payment Failed</PrivateLink>** - Emails accounts in stage 1 or 2 when a payment fails.
- **<PrivateLink url="https://us.posthog.com/project/2/workflows/01a1165b-7003-0000-42c5-4e13f3d663dc/workflow">Gong call summaries to account notes</PrivateLink>** - Every hour, adds a summary note to the account for each new Gong call.
- **<PrivateLink url="https://us.posthog.com/project/2/workflows/01a0ab7a-3d0a-0000-f90b-fa73ccc51695/workflow">Create customer tasks from scout reports</PrivateLink>** - Creates a "Review onboarding brief" task for each onboarding research report from the scout.
- **<PrivateLink url="https://us.posthog.com/project/2/workflows/019ae005-7196-0000-2099-ab41737ab9f6/workflow">User orders an onboarding consultation from the merch store</PrivateLink>** - Sets the account to `Purchased Onboarding Call`, emails the buyer the booking link, and tells the team.
- **<PrivateLink url="https://us.posthog.com/project/2/workflows/01a162bb-966b-0000-2224-b7f2d51da219/workflow">Consultation workflow failure monitor</PrivateLink>** - Every week, posts failed runs of the merch store workflow to `#team-onboarding`, so someone can set the purchase up by hand.
- **<PrivateLink url="https://us.posthog.com/project/2/workflows/01a158f0-d5c4-0000-f2bb-2373069d6ba1/workflow">Scaled CS intervention</PrivateLink>** - Emails unmanaged accounts above $20k ARR when the `Onboarding:: Scaled CS signals` scout spots a billing moment, moves them to `Onboarding Intervention`, and makes the sender their Onboarding specialist for 30 days.

### Tags

Stage reactor keeps these in step with the stage, so you rarely add or remove them by hand:

- `onboarding lead` - On every account at `1. New Account` or `2. Onboarding Initiated`.
- `onboarding completed` - Replaces `onboarding lead` at `3. Onboarding Completed` or `Sales Handoff`, so other teams can see the Onboarding has been completed.
- `onboarding intervention` - Added on top of the account's other tags when it reaches `Onboarding Intervention`.

Any tag containing `referral` (like `ae referral`) stops every onboarding email and moves the account to `Sales Handoff`. See [Sales handover](/handbook/onboarding/sales-handover#lead-creation).

### Alerts and revenue tracking

We occasionally shift our attention to help customers who may need more urgent assistance. For these, we have a few types of alerts (tasks) in Customer Analytics, where Magda is a failsafe if the account doesn't have an assigned OS.

-   **Failed payments** - `Onboarding:: Automated Payment Failed` emails the customer (see [Failed payments](#failed-payments) below). The overdue alerts in `#sales-alerts` only cover a failed card payment when the account has an AE, CSM or TAM ([failed/late payments](/handbook/growth/sales/billing#failedlate-payments)), so on an onboarding account it raises no internal alert. The **Stripe delinquent** property on the account shows it. It's a good moment to reach out and offer help in figuring out their volume/billing.
-   **Upcoming large invoice alert** - It lets us prioritize the customer to touch base and make sure the bill doesn't come as a surprise.
-   **Event/Feature Flag/Replay/Error tracking spike indicator for OS** - unusually high usage that may point to a misconfiguration and require our assistance.

### Specific cases

#### How to stop automation

If you're actively talking to a customer and don't want the next automated email to go out:

- Set **Onboarding call booked** when there's a call on the calendar. Every automated email skips an account with a booked call.
- Move the account to `3. Onboarding Completed` or `Sales Handoff`. Leaving stage 2 ends its run in the email sequence, so nothing else goes out.
- If the customer asks us to stop emailing them, set **Onboarding opted out** to Yes. Only Yes skips, so setting it back to No opts them back in.

Never disable or archive `Onboarding:: Email sequence`. Turning it off doesn't stop the accounts waiting in it right away, but any account whose wait ends while it's off has its run canceled, so it never gets the rest of the sequence. If it does get turned off, turn it back on straight away: runs that haven't woken up yet carry on as normal ([how disabling works](/docs/workflows/editing-live-workflows#disabling-a-workflow-doesnt-cancel-runs)). To change it, [edit it in place](/docs/workflows/editing-live-workflows).

#### Failed payments

`Onboarding:: Automated Payment Failed` runs once a day and emails accounts at stage 1 or 2 whose payment failed. An account gets at most one email every 30 days. It skips accounts with a CSM, AE or TAM, a referral tag or no admin emails, and it ignores **Onboarding opted out** on purpose, because it's about billing rather than onboarding.

We may still see a failed payment on a customer we haven't engaged with yet. In this case, since we're unsure whether the customer is going to stay with us, we don't have to do a deep account analysis. It's enough to remind them to settle the invoice, offer help, and briefly point out obvious spikes and main drivers of the bill. 

It's enough to reach out just once, as the finance team monitors the payments and handles the account deactivation.

Keep "payment" in the subject line. The onboarding numbers ignore any email whose subject mentions payment, overdue, unpaid or outstanding, so it won't count as onboarding outreach, and `Onboarding:: Set "Onboarding Initiated" when contacted by OS` skips a delinquent account.

When you reach out regarding a failed payment, the account should stay as `New Account` and resurface in the Customer Analytics queue before the next renewal, if the customer settles the payment. When that happens, do our regular outreach with a deep account analysis and enroll them in the program.


