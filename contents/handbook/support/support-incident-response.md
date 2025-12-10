---
title: Support team incident response
sidebar: Handbook
showTitle: true
---

When things break, we need to make sure users know what's happening and feel supported through it. This page covers how the support team handles incidents - what we do, when we do it, and how we stay aligned with [engineering](https://posthog.com/handbook/engineering/operations/incidents), [marketing](https://posthog.com/handbook/growth/marketing/incident-comms), and [sales](https://posthog.com/handbook/growth/sales/communications-templates-incidents).

## Raising an incident

Anyone can and should raise an incident if they suspect there is one. This includes support team members. When in doubt, always raise an incident - it's much better to declare something that turns out not to be an incident than to miss a real one.

Declaring an incident doesn't trigger any external notifications. It just creates an incident channel and alerts the right people internally.

If you're seeing multiple tickets about the same issue, or if something seems seriously broken, type `/incident` in any Slack channel to declare one. See the [full guide on raising an incident](https://posthog.com/handbook/engineering/operations/incidents#raising-an-incident) for more details.

Once you've raised the incident, you should raise your hand to watch it from a support perspective, or actively hand it over to someone else on the team.

## Your role during an incident

- If you suspect an incident, raise one - type `/incident` in any Slack channel
- When an incident is declared, a workflow posts to #team-support asking for someone to raise their hand
- Whoever raises their hand owns watching that incident from a support perspective:
  - Monitor the incident channel for updates, and ensure the status page has clear messaging
  - Respond to new and existing tickets related to the incident, creating a macro as needed
  - Keep the team updated in #team-support with anything relevant
  - Hand over to the next timezone if the incident runs long
- Don't duplicate comms - coordinate with the Comms Lead and TAMs/CSMs as needed

## When an incident is declared

When an incident gets declared, our [incident.io workflow](https://app.incident.io/posthog/settings/workflows/01J90ZX25Z3TR822JJCDKD572S) automatically posts to #team-support. This post asks for someone from support to raise their hand and take ownership of watching the incident. All members of the support team are responsible for making sure that an incident has a Support Watcher assigned during business hours.

Support team members aren't automatically added to incident channels. You can keep an eye on #incidents for an overview of what's currently open. When you raise your hand in #team-support to watch an incident, join the incident channel using the link in the workflow post.

When you join the incident channel, you'll be [automatically assigned](https://app.incident.io/posthog/settings/workflows/01KBG1T8DHEFQXQQ0KJ1AVR002) the [Support Watcher role](https://app.incident.io/posthog/settings/incident-roles) in incident.io. This makes it clear and visible to both the support team and the incident team who is managing the incident from a support perspective.

If nobody from support joins the incident channel, the incident lead will get a [nudge](https://app.incident.io/posthog/settings/nudges/01KBG0YDAFEEHBW1PGNPJX09TC/edit) reminding them to assign the Support Watcher role, along with a note that support only watches incidents during business hours.

If you're online and available during your normal working hours, raise your hand on that thread. This is informal - it's just whoever can do it. If nobody responds after a few minutes and you're around, go ahead and volunteer even if you're in the middle of something else.

**We don't have on-call support coverage.** You're only expected to raise your hand for incidents during your normal working hours. If an incident is declared outside of working hours, support tickets will either need to wait until support working hours resume, or be handled by the @on-call-global person from engineering.

Once you've raised your hand and joined the incident channel, you'll be assigned the Support Watcher role. You own:

- Following the incident channel and keeping up with status updates
- Ensuring the status page has clear, customer-friendly messaging about the impact
- Looking through existing tickets in the queue to see if any were opened because of this incident
- Creating a [macro](https://posthoghelp.zendesk.com/admin/workspaces/agent-workspace/macros) (if appropriate) for responding to customers about the incident
- Checking for new tickets coming into the support queue during the incident
- Passing along relevant updates or highlights to the rest of the support team in #team-support
- Understanding the user impact so the team can respond to tickets accurately

Your job isn't to fix the incident. Your job is to be the bridge between the incident response and the support team, and to make sure users opening tickets get accurate information.

## Using the status page

The status page is our source of truth during incidents. The incident lead is typically responsible for keeping it updated, but as the support team member watching the incident, you should make sure the messaging is clear and customer-friendly.

Review the status page messaging when it's updated to ensure:
- The impact is described in terms customers will understand (not just "elevated errors" or technical jargon)
- The affected components are marked correctly
- The messaging isn't ambiguous - users should understand what's broken and how it affects them

If the status page update is too generic or unclear, work with the incident lead to improve it. You can update it yourself using `/incident statuspage` (`/inc sp`) in the incident channel.

Good status page messaging:
> Feature flags are being returned but with 30-60 second delays instead of the usual <1 second response time. All other PostHog features are operating normally.

Unclear status page messaging:
> Elevated errors in the feature flags service.

Always link to the status page in ticket responses. Users should be able to check it themselves for updates rather than having to ask us every hour.

## Creating a macro for the incident

If the incident is likely to generate multiple support tickets (most incidents do), create a [macro](https://posthoghelp.zendesk.com/admin/workspaces/agent-workspace/macros) so the whole team can respond consistently. To create the macro:

1. Clone the [Incident information](https://posthoghelp.zendesk.com/admin/workspaces/agent-workspace/macros/24914978630939) macro as your starting template
2. Look at the incident number in incident.io (e.g., INC-123)
3. Add the tag incident/[number] to the macro (e.g., incident/123). This ensures all tickets using this macro are automatically tagged with the incident number for tracking.

The macro should include:
- A brief description of what we currently understand about the incident
- The specific impact to users (what's broken, what's working, what's degraded)
- A link to the incident on our status page

Keep it simple and factual.

**If there's a Comms Lead assigned:**
- For major or security incidents, share the macro draft with them before using it. We want to make sure we're saying consistent things across all channels. The Comms Lead should review the macro to ensure the messaging aligns with broader customer communications.
- For minor incidents, share the macro with them after you've created it so they're aware of what messaging we're using.

**If there's no Comms Lead assigned:**
Use your best judgement to create a clear, factual macro. If you think the incident warrants coordination with Marketing, mention it in the incident channel - but don't let that block you from responding to customers.

Update the macro if the situation changes significantly. If you do update it, let the Comms Lead know (if there is one). Delete the macro once the incident is resolved.

Let the team know in #team-support when you've created the macro so they know to use it.

## Handling incoming tickets during an incident

If you're the person who raised your hand to watch the incident, you're also responsible for keeping an eye on the support queue during the incident. Check through the queue for any existing tickets which might have been raised before the incident was declared, and then continue to monitor for new tickets being raised related to this incident.

Sort your tickets by newest so you can easily spot new tickets coming in. This makes it much easier to catch incident-related issues as they arrive.

Don't send generic "we're working on it" messages. Use the macro if you created one, or link to the status page, explain what we know about the impact, and give them a real timeline if we have one. If we don't have a timeline, say that too.

Example response:
> Hey - yes, we're seeing this too. There's an incident affecting feature flag requests right now. You can follow updates on our [status page](https://status.posthog.com), but the short version is that flags are returning but with higher latency than normal. The team is working on it and we'll update the status page as we know more. I'll be sure to let you know when it's resolved.

**Important:** Always attach incident-related tickets to the open incident using the incident.io app in the right-hand sidebar in Zendesk. This helps us track the user impact and keeps everything organized. Anyone on the support team responding to incident-related tickets should do this, not just the person watching the incident.

If you're seeing the same issue across multiple tickets, drop a note in the incident channel. Sometimes support spots patterns before monitoring does. Also share this in #team-support so the rest of the team knows what to expect.

## Creating proactive tickets

Sometimes we need to reach out to users proactively during an incident - for example, if a specific org caused the incident or was significantly affected. The engineering team may ask us in #team-support to [create tickets for affected customers](https://posthog.com/handbook/engineering/operations/incidents#when-a-customer-is-causing-an-incident).

Before creating any proactive tickets, check with the incident lead and coordinate with the Comms Lead to ensure we're not duplicating their communications.

## Keeping the team updated

As the person watching the incident, keep the rest of the support team informed in #team-support. Share:

- Major updates about what's happening
- Changes to the user impact
- Patterns you're seeing in tickets
- When the incident is resolved

You don't need to copy every single update from the incident channel. Just share the things that would help someone else on the team respond to a ticket about this incident accurately.

## Working with the Comms Lead

For an incident that requires external comms, Marketing will appoint a [Comms Lead](https://posthog.com/handbook/growth/marketing/incident-comms). They own external communication strategy. We don't.

As the support team member watching the incident, you should coordinate with the Comms Lead:
- Coordinate on macro creation (see 'Creating a macro for the incident' above)
- If you're seeing patterns in support tickets that might inform their messaging
- If you need help with a particularly complex or sensitive customer communication
- When you update the macro - let them know what changed

If you think external comms are required but there isn't a Comms lead assigned, you can request one by asking in #team-marketing or using the @all-marketers tag in Slack.

## Coordinating with TAMs and CSMs

Enterprise customers often have dedicated TAMs (Technical Account Managers) or CSMs (Customer Success Managers) from the Sales/CS team. When these customers reach out about an incident - either through their Slack channels or via tickets - we need to coordinate our response.

For minor incidents, we can usually just respond ourselves. Keep it straightforward and use the macro if you created one.

For major incidents, Sales/CS teams may want to handle communication with their customers directly. Check #cs-sales-support to see if they're coordinating a response plan. If you're unsure whether to respond to a particular customer:
- Check #cs-sales-support to see if there's discussion about the incident
- Create a side conversation from the Zendesk ticket into #cs-sales-support and ask if they'd prefer to handle the communication with this customer
- If nobody responds and the customer is waiting, respond yourself - it's better than leaving them hanging

Remember that TAMs and CSMs work in specific timezones. If an enterprise customer reaches out when their TAM/CSM is offline or on holiday, don't leave them waiting. Respond to their question. You can loop in their TAM/CSM as a heads-up, but the customer should get an answer from someone.

## Handing over across timezones

If an incident is still ongoing when you're about to log off for the day, hand over to someone who's still working or coming online. Try to hand over to someone who has the most working hours ahead of them - this avoids multiple handovers.

Post in #team-support via the original workflow thread with:
- Current status of the incident (what's broken, what's being done about it)
- Roughly how many support tickets we've seen related to it
- Any key information the next person needs to know
- Anything you told users in tickets that the team should be consistent about

If you're US West Coast based and logging off for the day, write detailed handover notes given that nobody in EU will be online yet. This way they can pick it up smoothly when they start their day.

If you're picking up an incident from someone in a previous timezone, read their notes, scan the incident channel for updates since those notes were written, and jump in. Raise your hand on the original #team-support workflow post if you haven't already.

## After an incident resolves

Once the customer-facing impact of the incident is resolved:

- Find all incident-related tickets by filtering for the relevant `incident/xxx` tag in Zendesk (these are automatically added when you attach tickets to the incident via the incident.io app in Zendesk)
- Go back through these tickets and update users that the incident is resolved
- Check if any docs or help content needs updating based on what happened - if you can ship a quick docs fix or FAQ update, do it now while it's fresh
- Delete the incident macro you created

For major incidents, there will be a [post-mortem](https://posthog.com/handbook/engineering/operations/post-mortems). Read it. If you have feedback from the support side - things we could have done better, information we were missing, communication that didn't work, patterns you saw in tickets - add it to the post-mortem document or share it in the incident channel. Your perspective on the user impact and customer communication is valuable.
