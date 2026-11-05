---
title: How we run support through Workflows in PostHog
date: 2026-10-22
author:
  - abigail-richardson
tags:
  - Support
  - Guides
  - Workflows
---

In July we moved our support team off Zendesk and onto [PostHog Support](/docs/support). Making the switch felt like a mammoth task. 

Although the helpdesk features of PostHog Support were solid, it was missing nearly all of the more advanced features we relied on in Zendesk. It had no native understanding of Service Level Agreements (SLAs), when they should be set, or how they should be calculated. No way of triaging and routing tickets. No handling of Customer Satisfaction surveys (CSATs). No out-of-office handling.

The obvious solution was to ask the engineering team to build all of it and wait, but this wasn't a good solution ([why not now?](/handbook/values#why-not-now)). Instead, I built almost everything we needed in [PostHog Workflows](/workflows). We now have 27 active workflows related to support, and I think the result is better than if we'd built it all natively.

## Why we built workflows instead

Building these features natively means one of two things. Either we build them for our exact use case, or we generalize them to suit every customer. Generalizing tends to end up gray and mushy: you try to please everyone and end up pleasing no one.

Using Workflows lets us build exactly what our support team needs, on top of the data we already have in PostHog. When something changes, I can just go and modify the workflow, rather than waiting for a feature to ship.

At times I thought it would be easier to build some features natively, but the more I use Workflows, the more I realize how powerful they are. I control what happens and when. A native version would be more restrictive.

This level of customizability isn't for everyone, and it can feel or sound overwhelming at times, but working with AI makes it a lot easier. The main restriction at this point is my own brain and what I can dream up.

Here are some examples of what I built:

## Triaging and categorizing tickets

In our old world, triage was mostly manual – customers had to pick a product area and priority when submitting a ticket. That was fine when PostHog had a couple of products, but with so many now, customers have no idea which area to pick.

It was also a lot of upkeep for me and for engineering teams. Every time a team was created, renamed, or split, we had to update the sidebar topics and the Zendesk triggers that routed tickets.

Moving to our new world, I was adamant that I didn't want a branch per team that I'd have to maintain forever. The solution was the [Workflows AI task step](/docs/workflows/ai-tasks). It helps us do all of our triage and categorization in one workflow. On every new ticket it:

1. Fetches the ticket.
2. Runs a spam pre-filter, and skips and auto-resolves anything we don't want classified.
3. Runs a [PostHog AI task](/docs/workflows/ai-tasks) that:
    1. Applies a team tag and an SME tag in a format I've defined
    2. Sets the ticket's priority, based on the examples in our handbook
    3. Captures a custom PostHog event to say the ticket has been classified and which tags were applied
    4. Investigates the ticket and pulls useful context onto it for the support engineer (including events, replays, customer analytics, errors, past tickets, etc)

Having the tags automatically applied like this also means that:

- I can easily report on support at a product-by-product level.
- If a ticket does need escalating to engineering, the support engineer can see straight away which team it belongs to, without having to look anything up.

I don't need to worry about team changes anymore. The task uses what's currently on our [teams page](/teams), [feature ownership page](/handbook/engineering/feature-ownership), and [support SME page](/handbook/support/support-smes) to decide which team owns a ticket. The classification event it captures then triggers a custom [destination](/docs/cdp/destinations) that works out the Slack channel from the team tag, using our naming convention – a product analytics ticket notifies `#support-product-analytics`. So if a team is renamed or a new one is created, there's nothing for me to update. A second destination listens for the `$conversation_ticket_assigned` event and does the same whenever a ticket is assigned, notifying the new assignee's team.

Workflows also knows which email address a ticket was sent to or what channel was used (email, widget, Slack, etc.) so I can have a workflow that sends tickets sent to our merch email address directly to our merch team.

> **Try it yourself:** The **Ticket: AI triage and investigation** template investigates with your PostHog data, tags a category and priority, and posts its findings as a private note. It runs read-only and never replies to the customer. Ours also routes to team channels through custom destinations, but the template leaves this out.

## Updating the ticket lifecycle

We have several workflows to keep tickets moving:

- **Acknowledge new tickets** - email and widget tickets get an email so they know we've got their ticket. Slack and MS Teams tickets already get a post in the thread.
- **Tell widget customers we've replied** - emails them so they don't have to keep checking in-app.
- **Reopen on reply** - reopens a ticket when the customer replies (this is one of the few things I think should be native).
- **Resolve stale pending tickets** - when a ticket goes to pending, it waits 5 days and checks in with the customer in case they want to add anything. After 2 more days with no reply, it marks the ticket resolved.

> **Try it yourself:** With the acknowledge, reopen, and nudge-then-auto-resolve templates.

## Managing service level agreements

SLAs are the biggest set of workflows we have. Most helpdesks have SLAs built in: you set your working hours and a policy per plan, and the tool decides behind the scenes when each deadline starts, pauses, and stops. In Workflows, nothing happens unless you say so. Every point where a deadline gets set or cleared is a step in a workflow, with its own working hours.

That's more to set up, but it means I decide exactly how our SLAs behave, rather than working around someone else's idea of when a clock should start. I could give some customers different working hours, or put certain tickets on a 24/7 clock. We don't need that today, but nothing stops us. And because I describe what I want and AI builds the workflow, the extra setup is mostly a conversation, not hours in an editor.

We use three types of SLA deadline:

| SLA | Set when | Based on |
| --- | --- | --- |
| First response time (FRT) | A ticket is created | Customer segment, then plan |
| Next response time (NRT) | The customer replies, or we reopen a ticket | Segment and plan, rechecked on every reply |
| Update time | We respond to the customer and the ticket is still new or open | The ticket's plan tag |

When a ticket moves to pending, resolved, or on hold, a separate workflow clears its deadline, so the clock stops while we're waiting on the customer.

### Setting the first response time

For every new ticket, this workflow checks the customer's organization in [Customer Analytics](/docs/customer-analytics) for customers our sales or customer success teams have marked as high priority or churn risks. These get special alerts into our internal channels.

> **Try it yourself:** With the **prioritize important customers** template, which also sets high priority and assigns the ticket to a lead.

Otherwise, a conditional step checks the plan on the customer's organization and sets the SLA deadline on the ticket. It also tags the ticket with the plan, so engineers can see at a glance whether it's Enterprise, Scale, Boost, or something else, and we can easily report on these. When setting the SLA deadline, I set our working hours to Monday to Friday, 5am to 9pm Canada/Atlantic. That's 9am UK to 5pm Pacific, kept inside one day in one time zone.

There are a couple of fallbacks:

- If we can't find a plan but the ticket came from a shared Slack or Microsoft Teams channel, we treat the customer as Enterprise.
- If we still can't set an SLA, the workflow alerts `#alerts-support` so I can work out why.

### Setting the next response time

This works in a similar way to the FRT workflow, but runs on every customer reply. It rechecks segment and plan, in case either has changed since the ticket was created, and updates the tags as necessary.

It only sets a new SLA deadline if the ticket has no SLA deadline set, or the new one would be shorter than the existing one. So, if a customer writes in twice before we've answered, they keep the original, shorter SLA deadline.

The same SLA is applied when someone reopens a ticket, for example if it was set to pending or resolved by mistake. That workflow keys off the plan or segment tag already on the ticket.

### Setting the update time

When we send a reply, the workflow checks the ticket's status. If the team member set it to pending, resolved, or on hold, there's nothing to do. If it's still new or open, it sets an update time based on the plan tag. We don't want to just go quiet on a customer while we investigate.

### Breach warnings

This workflow notifies us that a ticket is about to breach its SLA deadline. The workflow triggers on anything that could change an SLA deadline: a new ticket, a message from us, a message from the customer, or a status change. Then it:

1. Waits 10 minutes so the other workflows have set the deadline.
2. Checks the ticket is still new/open and has a deadline.
3. Waits until 2 hours before the deadline.
4. Rechecks that the deadline hasn't moved and the ticket is still open.
5. Captures a custom PostHog event to say the deadline is approaching.

![Breach warning](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_10_26_at_18_14_06_2x_1710873755.png)

It does the same again 30 minutes before the deadline.

In a similar way to my triage workflow, a custom destination picks up the captured events. It de-duplicates them so each deadline only gets one alert, then it works out which team channel to notify:

- If the ticket is assigned to a role, it builds the channel name from the role name.
- If it's assigned to a person, it looks up their role through the API.

The Slack alert shows the deadline, the assignee, the priority, and the status, with a button to open the ticket.

> **Try it yourself:** There's a template for each piece: first response, next response, reopened, follow-up after a team reply, pause, warn before a breach, and escalate. They tier by an example `plan` person property and default to 9:00 to 17:00 UTC working hours, so you'll need to fill in your own properties and working hours. Ours tiers by organization plan and segments.

## Working with sales and customer success

As you might imagine, this one hooks into [Customer Analytics](/docs/customer-analytics). When a ticket is created, the workflow finds the customer's account and checks who's assigned to it:

- If there's an account executive (AE), it adds an `AE_<name>` tag.
- If there's a customer success manager (CSM), it adds a `CSM_<name>` tag.

If either is assigned, the workflow also posts to an internal Slack channel that sales and CS watch, tagging them so they know a ticket has come in.

![Sales and CS assigning](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2026_10_26_at_18_16_10_2x_4757151426.png)

AEs and CSMs can then filter tickets by their own tag and see everything raised by customers they own. It's a simple way for our sales and CS folks to keep an eye on tickets they might care about.

> **Try it yourself:** With the **notify the account owner** template.

## Handling our out of office schedule

We still want tickets to be picked up when a customer replies to a ticket assigned to someone who's on vacation.

This workflow runs on every customer reply. A conditional branch splits by the ticket's current assignee, and each team member adds their vacation dates and times to their own branch. If the reply lands in that window, the ticket gets reassigned back to the Team Support role so that it can be picked up by someone else on the team. Otherwise it stays with whoever had it.

The date range is the important part: it only applies while you're away, so you don't have to remember to switch it off when you're back!

> **Try it yourself:** With the **reassign while an agent is out of office** template.

## Sending CSAT surveys

These measure customer satisfaction, and we have two workflows that handle them. The first sends the survey, and the second handles completed responses.

The first workflow triggers when a ticket is resolved, then waits 24 hours and checks that the ticket is still resolved. If it is, it emails the customer with our CSAT survey. The email has a row of faces, and clicking one opens a survey we host with [Surveys](/docs/surveys) (with that face already selected so customers don't have to pick twice).

The second triggers based on a completed survey response. It:

- Saves the CSAT scores and comment to the ticket as a private note.
- Posts the response to our support team Slack channel. We like to celebrate the nice comments. When a score is low, we follow up, fix what went wrong, and make sure the customer has what they need, because we want all of our customers to be successful.

![CSAT in Slack](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2026_10_26_at_18_18_26_2x_6510ccae29.png)

> **Try it yourself:** With the **send survey after resolve** and **post responses to Slack and the ticket** templates.

## Creating proactive tickets

You can also use workflows to create tickets, very meta!

When someone submits our roadmap pitch survey, a workflow triggers on the survey response. A webhook step creates a proactive ticket on behalf of the person who submitted it. If it makes sense, we can then follow up with them about their suggestion, right from the ticket.

Turning this feedback into tickets means we can reply to customers who are missing a way to do something, or let engineering teams know there's feedback.

## Workflows the team built

Individual support engineers have also customized their own workflows.

Christiaan built a workflow to keep track of his own SLA deadlines. It posts a Slack warning 15 minutes before the SLA deadline on any ticket assigned to him that's still unresolved.

Chris built two workflows that connect tickets to our incident.io incidents. When an incident is declared, an AI task finds open tickets about it and tags them, so they're all in one place. New tickets about an open or recently closed incident get the same tag.

Christian set up a workflow so that when a customer replies, the ticket assignee gets an email. He also built one so that anyone who escalates a ticket to an engineering team automatically follows that ticket, so they can see what the engineering team says. Luke then built on that, so anyone can follow a ticket and get emailed when someone replies or leaves a private note. The team chose email, but it could just as easily go to a Slack channel.

> **Try it yourself:** With the **notify the assignee when the customer replies** template.

## How all these workflows were built

This looks like a lot to build, but it's honestly been less effort than it sounds.

I rarely build a workflow from scratch in the editor. Mostly I describe what I want to an AI agent, like PostHog AI or Claude through the [PostHog MCP](/docs/model-context-protocol), and it builds the workflow for me. I sometimes ask the [PostHog Slack app](/docs/posthog-ai/surfaces/slack) in a thread to make changes to workflows for me. I usually ask to stage a draft so that I can open the editor to review, or to make a quick tweak.

The same goes for understanding a workflow. For my most complex workflows, the quickest way to see what's happening is to talk it through with an AI agent. I ask the agent to explain exactly which steps happen in short bullet points or a table. I can then check it against what I think should happen, and step through any changes with the agent.

A few habits make this work:

- **Write the description first.** Every workflow has a plain-English description of what it does and why. That's what lets an agent, or a teammate, change it safely later.
- **Name it like a folder.** Mine follow `Support:: <area>:: <what it does>`, so they're easy to find and sort.
- **Start as a draft.** A workflow stays a draft until someone has reviewed it and enabled it.

## Gotchas when creating workflows

- Watch for loops or workflows that are dependent on one another.
- AI tasks are attributed to the workflow's creator.
- AI tasks have daily limits. Each workflow can start 100 AI tasks a day, and each project 500 by default. If you need more, ask us to raise them.
- Not everything a workflow can do shows up in the UI. For example, in the template that clears the SLA deadline when a ticket goes to on hold, pending, or resolved, you can't see all of the trigger conditions in the editor. I'd recommend getting your agent to build you a draft.

## Set up these workflows yourself

Workflows glues together events, tickets, Customer Analytics data, emails, and Slack for us. If you run support, onboarding, or customer success on PostHog, you can build the same thing.

The easiest way to get started is using the [support workflow templates](https://app.posthog.com/workflows/templates?tagFilter=support) I've created. They're generalized from ours, so they won't match our setup exactly, but they're a working starting point you can customize for your own use cases. You get 10,000 emails and 10,000 other destinations free every month. 

## Thank you

Massive thanks to the [Workflows team](/teams/workflows) for building the product and for putting up with all my requests. Whenever I've needed something that didn't exist yet, they've been really quick to build it.

And thank you to the [Support team](/teams/support) for building out workflows wherever we needed them, and for trying out everything I've thrown at them along the way.
