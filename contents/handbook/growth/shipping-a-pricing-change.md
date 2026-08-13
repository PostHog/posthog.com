---
title: Shipping a pricing change
sidebar: Handbook
showTitle: true
---

[Pricing principles](/handbook/engineering/feature-pricing) covers what we charge for and the principles we hold ourselves to. This page covers the actual work: what you analyze and write, who reviews, who you communicate changes to, and in what order.

Budget roughly six weeks from first draft to migration/launch day. This is definitely a cross-team effort, so communicate changes openly and early to get it across the line effectively.

## RFC

### Do the analysis first

The RFC is where you show your work and your thinking, so do the work before you open the PR. This often contains:

1. **New prices**, modeled against old prices and competitors, with real usage data. A single "they charge $X" comparison isn't enough. Ideally show this with either modeled scenarios or real user data, so you can see how a customer's bill compares against competitors and how it will change.
2. **Revenue changes.** Will we make more or less money? How much will it change by?
3. **Unit economics.** What does it cost us to serve, and what's the margin at each tier?
4. **Revenue dynamics.** For example, how does the change shift the revenue concentration on your biggest customers?
5. **At-risk revenue.** We can't always be the cheapest if competitors use different pricing models. If price changes include an increase and may cause churn risk, model it.

This isn't an exhaustive list. If something here is irrelevant, remove it. If something else is relevant, add it.

This should be formatted in a way that is easy to read and review. A spreadsheet is the common way and can be linked to in the RFC (<PrivateLink url="https://docs.google.com/spreadsheets/d/1zztCzjKz8BKM2Yr82OSROjVVZQujLjkodTMmZr-PFzk/edit?gid=2107116200#gid=2107116200">Example spreadsheet</PrivateLink>).

Your pricing is also constrained by the product architectures billing supports: standalone products, product variants, a base product with add-ons, or bundled products (avoid this last one). Each determines whether free limits and monthly billing limits are separate or shared, so check the <PrivateLink url="https://github.com/PostHog/billing/blob/main/notes/pricing-rfc.md#product-definition">product definition guide</PrivateLink> in the billing repo while working through your pricing.

### Write it

Open an RFC in <PrivateLink url="https://github.com/PostHog/requests-for-comments-internal">requests-for-comments-internal</PrivateLink>. Include the breakdown above, what this does to existing customers, and your analysis / spreadsheet, and be explicit about what you're *not* changing. Deferring a decision is fine but mention it and why you've decided to defer. We don't want to be changing prices too often so there should be a reason why we're not bundling the changes together.

For existing customers, grandfather the old pricing. For beta-to-GA price changes, the grandfathering period is usually 1 month. For changes to existing GA pricing, it's usually 2 months.

### Reviewers

Get a mix. At minimum:

- Your team: they have usage and customer context.
- Someone from the [billing team](/teams/billing): they understand what's possible with the current billing architecture and whether changes are worth the engineering time.
- Someone from [Blitzscale](/teams/blitzscale): whoever has the most industry context on your product and/or pricing experience.
- If it's your first pricing RFC, your onboarding buddy PM.

### Review process

You do not need full consensus. You are ultimately the driver but each reasonable objection should be resolved or answered. A good RFC will have discussion around it, so buffer in time for answering questions, additional research, and a possible revision or two.

## Implementation

Once you've decided to move ahead with your new pricing scheme, you can begin implementing. Implementing a pricing change can often feel like juggling because you're working across a few teams with a single launch date. Communicating publicly and early helps.

The moment you have a launch date (mentioned below), tell everyone who has to do work:
- Your PMM, or the marketing team if you don't have one
- TAMs, AEs, CSMs, and support
- Paid ads

Giving at least two weeks' notice is ideal. If billing hands you a date less than two weeks out, which happens because they move fast, tell everyone ASAP. Below covers how to work with each team.

To make this a smooth process, it helps to start with a new "Grandfathering" tab in the spreadsheet with the following data for the orgs you are grandfathering:
- Org ID
- Org Name
- Recent bill on old pricing
- Estimated bill on new pricing
- Current plan (paid, extended free tier, grandfathered, etc.)
- Account manager (if managed)
- Owner and admin emails

This can be created with the <PrivateLink url="https://us.posthog.com/project/2/llm-analytics/skills/building-usage-and-revenue-dataset">building-usage-and-revenue-dataset skill</PrivateLink> and is used across billing changes, customer outreach, the email blast, etc., so it will let you easily work with all the necessary teams as you implement the changes.

You can also add large customers (of other products) who are close to crossing the free tier even though they aren't paying yet.

### Billing

Kick off with the <PrivateLink url="https://github.com/PostHog/billing/blob/fc97e44b54c981d83d01142e4ca4e30aa6bbd6a3/.agents/skills/billing-pricing-changes/SKILL.md">billing-pricing-changes skill</PrivateLink> in the <PrivateLink url="https://github.com/PostHog/billing">billing repo</PrivateLink>. It generates the pricing PR, then billing takes it from there.

Billing then gives you migration date options based on their capacity and what else is queued. **This date is your launch date.** It's when new customers get the new price and when the grandfathering clock starts for everyone else.

The first thing they'll need is that "Grandfathering" tab as they use the list of org IDs to grandfather accounts when the pricing changes go into effect.

### Notifying

Split by whether the account is managed.

#### Managed accounts

TAMs, AEs, and CSMs handle these. Post the spreadsheet in <PrivateLink url="https://posthog.slack.com/archives/C090RCG671C">#group-cs-sales-support</PrivateLink> with an overview of the changes and the reason why.

This is where the old bill, estimated new bill, and account owner become useful. Everyone can communicate the pricing changes clearly to their respective accounts.

#### Non-managed accounts

PMMs typically write the emails but if your product doesn't have one, <PrivateLink url="https://posthog.slack.com/archives/C08CG24E3SR">#team-marketing</PrivateLink> will help. Start from a recent pricing-change email (ask the PMs) rather than a blank page. 

If the price is going up, the email should say so plainly. Don't talk around it.

Build it in [Workflows](/docs/workflows): an email step, a static cohort of the grandfathered orgs' owners and admins, and a batch trigger filtered on that cohort. Exclude managed accounts. Those customers are getting a conversation instead.

You can schedule the send or send it manually on the day, once you know the migration went fine.

The email should come from you or the PMM, not a generic address.

**Start the sender permission on day one.** Being added as an approved sender needs project 2 admin, and finding someone who can do it can take days. It's the longest-lead item on this whole list, and a two-minute job for the right person. Ask in <PrivateLink url="https://posthog.slack.com/archives/C06GG249PR6">#team-workflows</PrivateLink>.

### Marketing

#### Docs, blogs, and the pricing page

The pricing calculator updates from the billing migration, but check it renders. Then have an agent comb the [posthog.com repo](https://github.com/PostHog/posthog.com) for the old price. It shows up in more places than you'd expect: product docs, comparison blog posts, "best X tools" roundups with worked cost examples, and SEO descriptions. Some pages carry a "pricing current as of" date that needs bumping too.

#### Paid ads

The [paid ads team](/handbook/growth/marketing/paid) runs ads with your price in them, on Google, LinkedIn, Reddit, and more. Give them the date with the same two weeks' notice as everyone else, and tell them you've already handled docs and blogs so they only need to worry about ad copy.

### Launch day

**Internal.** Post in <PrivateLink url="https://posthog.slack.com/archives/C0351B1DMUY">#tell-posthog-anything</PrivateLink> with the before and after tables, the grandfathering terms, and a link to the RFC. Add any other important information, like whether the change is margin positive.

**External.** Check with billing that the migration went through and confirm the email went out.

## Launch checklist

- Open the pricing PR with the `billing-pricing-changes` skill
- Get the launch date from billing
- Create the grandfathering tab with the `building-usage-and-revenue-dataset` skill
- Send billing the org IDs to grandfather
- Notify TAMs, AEs, CSMs, and support
- Notify the marketing team
- Notify the paid ads team
- Ask #team-workflows to add you (or the PMM) as an email sender
- Create the static cohort of owner and admin emails
- (If no PMM) Create the email, set up the batch trigger, and add the cohort
- Sweep posthog.com for the old price and check the pricing calculator renders
- Post the change in #tell-posthog-anything on launch day
- Confirm the migration went through, then send the email

## After launch checklist

- Confirm the ads and the pricing page are updated
- Update this page with whatever information we missed
