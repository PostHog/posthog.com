# Support docs — content drafts (stashed)
These are the content rewrites from our session, saved for you to revisit and rewrite yourself. The information architecture (nav sections) is committed separately; page content on disk has been rolled back to the originals except the overview. Each section below is one page's draft.


---

## `contents/docs/support/index.mdx`

````mdx
---
title: Support
sidebar: Docs
showTitle: true
contentMaxWidthClass: max-w-5xl
---

import { IconLaptop, IconMessage, IconMagic, IconCode, IconBrackets, IconChat, IconAtSign, IconGithub } from '@posthog/icons'
import OSButton from 'components/OSButton'

Support gives you one inbox for every customer conversation, whether it arrives from your app, your email, or a GitHub issue. Because PostHog already knows what's happening in your product, each ticket comes with the sender's [session replay](/docs/session-replay), events, and errors attached, so you can see what went wrong instead of asking anyone to reproduce it. Those same conversations feed [self-driving](/docs/support/self-driving), which groups recurring issues into pull requests you review and merge. An AI agent that drafts replies to your customers is coming soon.

<OSButton variant="primary" asLink to="/docs/support/start-here">Get started</OSButton>

## Where you can use it

Support does different things depending on where you work. You read and reply to customers in the [web app](/docs/support/inbox). The other surfaces are for reviewing the self-driving work your tickets generate.

<div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6 my-6">

  <div className="flex items-start gap-3">
    <IconLaptop className="size-6 shrink-0 text-blue mt-0.5" />
    <div>
      <p className="m-0 font-bold text-primary">Web</p>
      <p className="m-0 mt-0.5 text-sm text-secondary">The only place you read and reply to customer tickets, each with the sender's replay and events in view.</p>
      <a href="/docs/support/inbox" className="inline-flex items-center gap-1 mt-1.5 text-sm font-semibold text-red">Manage tickets →</a>
    </div>
  </div>

  <div className="flex items-start gap-3">
    <IconMessage className="size-6 shrink-0 text-red mt-0.5" />
    <div>
      <p className="m-0 font-bold text-primary">Slack</p>
      <p className="m-0 mt-0.5 text-sm text-secondary">Ask <code>@PostHog</code> about your support data and review the self-driving reports built from your tickets.</p>
      <a href="/docs/support/self-driving" className="inline-flex items-center gap-1 mt-1.5 text-sm font-semibold text-red">Support and self-driving →</a>
    </div>
  </div>

  <div className="flex items-start gap-3">
    <IconMagic className="size-6 shrink-0 text-purple mt-0.5" />
    <div>
      <p className="m-0 font-bold text-primary">MCP</p>
      <p className="m-0 mt-0.5 text-sm text-secondary">List and update tickets and manage self-driving reports from Claude Code, Cursor, or any MCP client.</p>
      <a href="/docs/model-context-protocol/tools" className="inline-flex items-center gap-1 mt-1.5 text-sm font-semibold text-red">MCP tools reference →</a>
    </div>
  </div>

  <div className="flex items-start gap-3">
    <IconCode className="size-6 shrink-0 text-green mt-0.5" />
    <div>
      <p className="m-0 font-bold text-primary flex items-center gap-1.5">Code <span className="text-2xs font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-yellow/20 text-orange">Beta</span></p>
      <p className="m-0 mt-0.5 text-sm text-secondary">Review and merge the self-driving reports and PRs built from your tickets, next to the agents editing your product.</p>
      <a href="/docs/posthog-code" className="inline-flex items-center gap-1 mt-1.5 text-sm font-semibold text-red">PostHog Code →</a>
    </div>
  </div>

  <div className="flex items-start gap-3">
    <IconBrackets className="size-6 shrink-0 text-seagreen mt-0.5" />
    <div>
      <p className="m-0 font-bold text-primary">API</p>
      <p className="m-0 mt-0.5 text-sm text-secondary">Build a custom support experience on the <code>posthog.conversations</code> JavaScript API.</p>
      <a href="/docs/support/javascript-api" className="inline-flex items-center gap-1 mt-1.5 text-sm font-semibold text-red">Build a custom widget →</a>
    </div>
  </div>

</div>

## Channels

Tickets reach the inbox through four channels. Each one syncs both ways, so you answer from a single place no matter where the conversation started. Read more in [Channels](/docs/support/concepts/channels).

<div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 my-6">

  <div className="flex items-start gap-3">
    <IconChat className="size-6 shrink-0 text-blue mt-0.5" />
    <div>
      <p className="m-0 font-bold text-primary">Widget</p>
      <p className="m-0 mt-0.5 text-sm text-secondary">In-app chat button. Auto-attaches session, replay, URL, and identity.</p>
    </div>
  </div>

  <div className="flex items-start gap-3">
    <IconAtSign className="size-6 shrink-0 text-teal mt-0.5" />
    <div>
      <p className="m-0 font-bold text-primary">Email</p>
      <p className="m-0 mt-0.5 text-sm text-secondary">Forward <code>support@</code> mail in, and replies thread back to the customer's inbox.</p>
    </div>
  </div>

  <div className="flex items-start gap-3">
    <IconMessage className="size-6 shrink-0 text-red mt-0.5" />
    <div>
      <p className="m-0 font-bold text-primary">Slack</p>
      <p className="m-0 mt-0.5 text-sm text-secondary">SupportHog turns messages, mentions, or a <code>:ticket:</code> reaction into tickets.</p>
    </div>
  </div>

  <div className="flex items-start gap-3">
    <IconGithub className="size-6 shrink-0 text-primary mt-0.5" />
    <div>
      <p className="m-0 font-bold text-primary">GitHub</p>
      <p className="m-0 mt-0.5 text-sm text-secondary">Issues in monitored repos become tickets, and replies post back as comments.</p>
    </div>
  </div>

</div>

## Get started

The core of Support, the widget, inbox, and integrations, is free. [Start here](/docs/support/start-here) for the setup path, or jump straight to the [pricing](/docs/support/pricing) for how the optional paid pieces work.

<OSButton variant="primary" asLink to="/docs/support/start-here">Start here</OSButton>

````


---

## `contents/docs/support/start-here.mdx`

````mdx
---
title: Getting started with Support
hideRightSidebar: true
contentMaxWidthClass: max-w-5xl
---

import { QuestLog, QuestLogItem } from 'components/Docs/QuestLog'
import OSButton from 'components/OSButton'

<QuestLog firstSpeechBubble="Let's set up customer support!" lastSpeechBubble="You're ready to help your users!">

<QuestLogItem title="Enable Support and add the widget" subtitle="Required" icon="IconToggle">

The first step is to enable Support and drop the in-app widget onto your site, so customer conversations start arriving as tickets. Every widget ticket automatically carries the sender's session replay, events, and identity, so you always have the full story.

Building your own interface instead? The [JavaScript API](/docs/support/javascript-api) gives you the same backend without the default widget.

<OSButton variant="primary" asLink to="/docs/support/widget">Set up the widget</OSButton>

</QuestLogItem>

<QuestLogItem title="Connect your other channels" subtitle="Recommended" icon="IconMessage">

Meet customers wherever they already are. Beyond the widget, conversations can arrive from [email](/docs/support/email), [Slack](/docs/support/slack), and [GitHub](/docs/support/github), and every channel syncs both ways so you answer from a single inbox.

<OSButton variant="primary" asLink to="/docs/support/email">Connect a channel</OSButton>

</QuestLogItem>

<QuestLogItem title="Work your tickets" subtitle="Required" icon="IconNotebook">

The [Support inbox](/docs/support/inbox) is where your team lives. Open any ticket and the customer's replay, recent events, exceptions, and past conversations are right there, so you resolve issues without the back-and-forth. Assign, tag, snooze, and track SLAs from one view.

<OSButton variant="primary" asLink to="/docs/support/inbox">Explore the inbox</OSButton>

</QuestLogItem>

<QuestLogItem title="Automate the busywork" subtitle="Optional" icon="IconDecisionTree">

Let rules handle the repetitive parts. [Workflows](/docs/support/workflows) can set SLAs, auto-assign, tag, and route tickets for you, all rules you control, with no autonomous AI involved.

<OSButton variant="primary" asLink to="/docs/support/workflows">Set up workflows</OSButton>

</QuestLogItem>

<QuestLogItem title="Turn tickets into fixes" subtitle="Support feeds self-driving" icon="IconMagic">

Support isn't just an inbox, it's a signal source. Recurring issues in your conversations become [self-driving](/docs/support/self-driving) reports, and when there's a code fix, a pull request you review and merge. Answering customers still happens in the Support inbox; you review these fixes in the self-driving inbox.

<OSButton variant="primary" asLink to="/docs/support/self-driving">Support and self-driving</OSButton>

</QuestLogItem>

<QuestLogItem title="Migrating from another tool?" subtitle="Optional" icon="IconUpload">

Bring your history with you so the inbox starts with context instead of an empty slate. Historical imports backfill your past tickets and customer identities. [Zendesk](/docs/support/imports/zendesk) is available now, in beta.

<OSButton variant="primary" asLink to="/docs/support/imports">Import tickets</OSButton>

</QuestLogItem>

<QuestLogItem title="Free core product" subtitle="Opt-in AI agent" icon="IconPiggyBank">

Support's core features, the widget, inbox, and integrations, are free. An AI agent that drafts replies to your customers is coming soon and will be opt-in: only teams who turn it on are billed, and we'll give you plenty of notice first.

---

That's it! You're ready to start helping your users.

<OSButton variant="primary" asLink to="/docs/support/widget">Set up the widget</OSButton>

</QuestLogItem>

</QuestLog>

````


---

## `contents/docs/support/widget.mdx`

````mdx
---
title: Set up the widget
sidebar: Docs
showTitle: true
---

The Support widget is a chat interface that appears on your website, allowing users to start conversations with your team. It loads automatically when enabled and captures session context for each ticket.

## Enabling the widget

1. Go to **Support** in PostHog and click **Settings**
2. Click **Enable conversations** (if not already enabled)
3. Go to the **In-app widget** section and enable it
4. Configure your settings (see below)
5. Save

The widget appears as a floating button on your site. By default it appears in the bottom-right corner, but you can customize its position in the settings.

## Widget configuration

These settings are configured in the **In-app widget** section of Support settings.

| Setting | Description | Options | Default |
|---------|-------------|---------|--------|
| **Enable widget** | Show the chat widget on your site | `true`, `false` | `false` |
| **Button color** | Primary color for the widget (hex) | Any hex color | `#5375ff` |
| **Widget position** | Position of the widget on screen | `bottom_right`, `bottom_left`, `top_right`, `top_left` | `bottom_right` |
| **Greeting message** | Welcome text shown when widget opens | Any string | `"Hi! How can we help?"` |
| **Allowed domains** | Restrict which domains can show the widget | Array of domain strings | `[]` (all domains) |

## Identification form

You can optionally require users to identify themselves before starting a conversation:

| Setting | Description | Default |
|---------|-------------|---------|
| **Require email** | Users must enter their email to start chatting | `false` |
| **Collect name** | Additionally collect a name | `false` |
| **Form title** | Heading shown on the identification form | `"Before we start..."` |
| **Form description** | Subtext shown below the title | `"Please provide your details so we can help you better."` |

When enabled, the form appears before they can send their first message. The collected information is used to link the ticket to a person in PostHog.

## Domain restrictions

You can restrict which domains the widget appears on for security:

```javascript
// Configured in PostHog settings
domains: [
  "example.com",              // Exact match
  "*.example.com",            // Wildcard: matches sub.example.com
  "https://app.example.com"   // With protocol (protocol is stripped)
]
```

If `domains` is empty or not set, the widget shows on all domains.

## Controlling widget visibility

Use the JavaScript API to programmatically show or hide the widget:

```javascript
// Show the widget (renders it if not already rendered)
posthog.conversations.show()

// Hide and remove the widget from DOM
posthog.conversations.hide()

// Check if widget is currently visible
const isVisible = posthog.conversations.isVisible()
```

This is useful for:
- Showing the widget only on certain pages
- Triggering the widget from a custom button
- Hiding the widget during specific user flows

## Disabling the widget via config

You can disable conversations entirely via the PostHog init config:

```javascript
posthog.init('<ph_project_token>', {
  disable_conversations: true  // Prevents loading the conversations module
})
```

This is different from hiding the widget – it completely disables the feature.

## Recover tickets across browsers

Support tickets are tied to the browser session by default. If a user switches browsers or clears their storage, they won't see their previous tickets. The widget includes a **Recover your tickets** link to handle this.

### How recovery works

1. Click **Recover your tickets** in the ticket list
2. Enter the email address used in previous conversations
3. A recovery link is sent to that email (expires in one hour)
4. Click the link to open the widget and restore tickets in the new browser

If the page URL contains a `ph_conv_restore` query parameter (from clicking the recovery link), tickets are automatically restored on page load. The parameter is removed from the URL after processing.

## Identity verification

If your app has logged-in users, identity verification works better than email-based recovery. You sign the user's distinct ID on your server, and tickets persist across browsers and devices automatically – no user action required.

<CalloutBox icon="IconInfo" title="setIdentity vs identify" type="info">

`posthog.setIdentity()` and `posthog.identify()` are different methods:

- **`identify()`** links events to a user for analytics. It creates person profiles and merges anonymous events with identified ones. See [identifying users](/docs/product-analytics/identify).
- **`setIdentity()`** verifies ticket ownership for Support. It uses HMAC signing to prove the user is who they claim to be, enabling cross-browser ticket access.

You typically call both: `identify()` for analytics tracking, and `setIdentity()` for secure ticket access.

</CalloutBox>

### How it works

1. Your server computes an HMAC-SHA256 hash of the user's `distinct_id` using your team's `secret_api_token`
2. You pass this hash along with the `distinct_id` to the widget
3. The widget API verifies the signature and uses the `distinct_id` for ticket lookup instead of the browser session

With identity verification enabled, users see all their tickets on any browser or device.

### Server-side implementation

Generate the identity hash on your backend. Never expose your `secret_api_token` in client-side code.

<MultiLanguage>

```python
import hmac
import hashlib

def compute_identity_hash(distinct_id: str, secret_api_token: str) -> str:
    return hmac.new(
        secret_api_token.encode(),
        distinct_id.encode(),
        hashlib.sha256,
    ).hexdigest()
```

```node
const crypto = require('crypto');

function computeIdentityHash(distinctId, secretApiToken) {
  return crypto
    .createHmac('sha256', secretApiToken)
    .update(distinctId)
    .digest('hex');
}
```

```ruby
require 'openssl'

def compute_identity_hash(distinct_id, secret_api_token)
  OpenSSL::HMAC.hexdigest('sha256', secret_api_token, distinct_id)
end
```

```go
import (
    "crypto/hmac"
    "crypto/sha256"
    "encoding/hex"
)

func ComputeIdentityHash(distinctID, secretAPIToken string) string {
    h := hmac.New(sha256.New, []byte(secretAPIToken))
    h.Write([]byte(distinctID))
    return hex.EncodeToString(h.Sum(nil))
}
```

```php
function computeIdentityHash(string $distinctId, string $secretApiToken): string {
    return hash_hmac('sha256', $distinctId, $secretApiToken);
}
```

</MultiLanguage>

### Passing identity to the widget

Once you've computed the hash on your server, pass it to your frontend and set it on the PostHog SDK.

**Option 1: Set identity at initialization**

If you know the user's identity when PostHog initializes (like on a server-rendered page), pass it in the init config:

```javascript
posthog.init('<ph_project_api_key>', {
  api_host: '<ph_client_api_host>',
  identity_distinct_id: 'user_123',       // From your auth system
  identity_hash: 'a1b2c3d4e5f6...',       // HMAC hash from your server
})
```

**Option 2: Set identity after login**

For single-page apps – or when the user logs in after page load – call `setIdentity()`:

```javascript
// After user logs in, your server returns the hash
const identityHash = await fetchIdentityHashFromServer(userId)

// Pass it to the SDK
posthog.setIdentity('user_123', identityHash)
```

**Clear identity on logout**

When a user logs out, clear their identity so the widget falls back to session-based access:

```javascript
posthog.clearIdentity()
```

<CalloutBox icon="IconWarning" title="Keep your secret API token secure" type="caution">

Your `secret_api_token` must never be exposed in client-side code. Always compute the identity hash on your server and pass only the hash to the frontend.

</CalloutBox>

### When to use identity verification

| Scenario | Recommended approach |
|----------|---------------------|
| **Logged-in users** | Use identity verification for seamless cross-device access |
| **Anonymous visitors** | Use the default widget session (no setup required) |
| **Mixed audience** | Use identity verification when users are logged in, fall back to widget session for anonymous users |

If your team doesn't have a `secret_api_token` configured, identity verification is ignored and the widget falls back to session-based access control.

## Email notifications

Configure your team to receive email alerts when new tickets arrive.

### Setting up notifications

1. Go to **Settings** > **Support** in PostHog
2. Find the **Email notifications** section
3. Select team members who should receive alerts

### What emails include

- Team name
- Ticket number
- First message preview
- Direct link to the ticket

Recipients must have access to the team to receive notifications.

<CalloutBox icon="IconLightBulb" title="Use Workflows for advanced notifications" type="info">

For more control over notifications – like sending alerts only for high-priority tickets, routing to specific Slack channels, or notifying different teams based on tags – use [workflow automation](/docs/support/workflows). Workflows let you trigger Slack messages, webhooks, and more based on any ticket event.

</CalloutBox>

## Browser notifications

Individual team members can enable browser notifications for new ticket activity.

1. Go to **Support** in PostHog
2. Enable **Browser notifications** in the notification settings

When enabled, a desktop notification appears when the unread ticket count increases. This works independently of email notifications – you can use one or both.

## Public token

The widget uses a public token for authentication. This token is automatically generated and shown in your Support settings. It's safe to expose in client-side code.

If you need to reset the token:

1. Go to **Support** > **Settings**
2. Click **Regenerate token**

<CalloutBox icon="IconWarning" title="Resetting stops active chats" type="caution">

Resetting the token stops current chats. Users need to refresh the page to reconnect with the new token.

</CalloutBox>

````


---

## `contents/docs/support/inbox.mdx`

````mdx
---
title: Support inbox
sidebar: Docs
showTitle: true
---

import TicketStatuses from './_snippets/ticket-statuses.mdx'

The [PostHog web app](https://app.posthog.com) is home base for a support engineer. It's the surface for your **Support inbox**, where you read and reply to customer tickets, and it gives you the full context of what each person was doing when they reached out.

## Find and open tickets

Open your inbox from **Support** in [PostHog](https://app.posthog.com). From there you can:

- **Filter** by status, priority, [channel](/docs/support/concepts/channels), SLA state, tags, or assignee
- **Search** by ticket number, customer name, email, or message content
- **Save** a filter combination as a view, to switch between common queries

A ticket's status tells you where it is in your workflow:

<TicketStatuses />

## What's in a ticket

Each ticket carries a set of properties you can filter, sort, and act on.

| Property | Description |
| --- | --- |
| **Ticket number** | Auto-incremented unique number, for example #1, #2, #3 |
| **Status** | `new`, `open`, `pending`, `on_hold`, or `resolved` |
| **Priority** | `low`, `medium`, or `high`. Unset by default |
| **Channel** | Where the ticket came from: `widget`, `email`, `slack`, or `github` |
| **Assignee** | The user or role responsible for the ticket |
| **Session ID** | The PostHog session used to load events and exceptions |
| **Distinct ID** | The `distinct_id` used to link the ticket to a person |

## Reply with full context

Open a ticket and the customer's story sits next to the conversation, so you resolve issues without asking anyone to reproduce them. Each ticket detail page can show:

- **Chat thread** - The conversation with the customer. Replies you send reach them on the channel they used.
- **Session recording** - Watch the customer's [session replay](/docs/session-replay) for widget tickets, if replay is enabled.
- **Recent events** - The events from when the ticket was created, for widget tickets.
- **Exceptions** - Any [errors](/docs/error-tracking) from their session, for widget tickets.
- **Previous tickets** - Past conversations with the same person.
- **Activity log** - A history of status, assignment, and priority changes on the ticket.

## Messages

Every message on a ticket has an author type.

| Author type | Description |
| --- | --- |
| **Customer** | Sent by the end user through the widget, email, Slack, or GitHub |
| **Support** | Sent by your team from PostHog |

Replies you send show a delivery status so you know they landed. Widget messages show **Sent** when delivered and **Read** when the customer views them. Email replies show **Sending**, then **Sent** on success or **Failed** if delivery fails.

You can mark any message as a private note. Private notes are visible only to your team, hidden from the customer, and don't count toward the customer's unread messages. Use them for internal context or handoffs. Support tracks unread messages separately for the customer and your team, and counts reset when your team views a ticket or the customer marks messages as read.

## Assign, tag, and snooze

Assign a ticket to a user or a role from the **Assignee** dropdown in the sidebar. Assignment is manual, with no automatic routing, and each ticket has one assignee. Add free-form tags to categorize and filter tickets, and snooze a ticket until a set time when you're waiting on something external.

## Track SLAs

An SLA deadline is derived state, not a status. You set it through [workflow automation](/docs/support/workflows), and the ticket then reports as on track, at risk, or breached. You can filter and sort the inbox by SLA state.

## Automate ticket handling

For the repetitive parts, let rules do the work. [Workflows](/docs/support/workflows) run on ticket events to set SLAs, auto-assign, tag, route, and change status automatically. For example, set a 4-hour SLA on widget tickets, auto-assign by customer domain, or reopen a ticket when the customer replies. It's rules you control, with no autonomous AI. See [Automate ticket handling](/docs/support/workflows) for the full set of triggers and actions.

## Tips for efficient support

- Check [session replay](/docs/session-replay) before asking a customer to describe what happened.
- Look at the exceptions panel to identify bugs quickly.
- Review previous tickets to avoid asking repeat questions.
- Set a ticket to pending after you reply, to track who's waiting on a response.
- Use saved views to switch between common filter combinations.
- Snooze tickets when you're waiting on something external, instead of leaving them open.

````


---

## `contents/docs/support/workflows.mdx`

````mdx
---
title: Automate ticket handling
sidebar: Docs
showTitle: true
---

import TicketStatuses from './_snippets/ticket-statuses.mdx'

Support integrates with [Workflows](/docs/workflows) to automate ticket management. Tickets emit events that trigger Workflows, and Workflow actions can update tickets – setting SLAs, changing status, assigning tickets, and more.

```
Ticket event
    ↓
Workflow trigger matches
    ↓
Hog function executes
    ↓
Ticket updated
```

Updates made by Workflows do not re-emit ticket events, so you won't get infinite loops.

## Ticket statuses

Workflows trigger on and set these ticket statuses:

<TicketStatuses />

## Trigger events

When ticket or message state changes, certain events are emitted and can be used as workflow triggers:


All events include these base properties: `ticket_id`, `ticket_number`, `channel_source`, `status`, and `priority`.

### New ticket created

- **Event ID** - `$conversation_ticket_created`
- **Event description** - A customer creates a new ticket.

| Property | Type | Description |
|----------|------|-------------|
| `ticket_id` | string (UUID) | The ticket's unique ID |
| `ticket_number` | int | Human-readable ticket number |
| `channel_source` | string | `widget`, `email`, or `slack` |
| `status` | string | Always `new` for this trigger |
| `priority` | string or null | `low`, `medium`, `high`, or null |
| `customer_name` | string | Customer name |
| `customer_email` | string | Customer email |

### Ticket status changed

- **Event ID** - `$conversation_ticket_status_changed`
- **Event description** - Ticket status changes (e.g. new → pending → resolved). You can filter on `new_status` to trigger only for specific transitions.

| Property | Type | Description |
|----------|------|-------------|
| `old_status` | string | Previous status |
| `new_status` | string | New status (`new`, `open`, `pending`, `on_hold`, `resolved`) |

### Ticket priority changed

- **Event ID** - `$conversation_ticket_priority_changed`
- **Event description** - Ticket priority is set or changed.

| Property | Type | Description |
|----------|------|-------------|
| `old_priority` | string or null | Previous priority |
| `new_priority` | string or null | New priority |

### Ticket assigned

- **Event ID** - `$conversation_ticket_assigned`
- **Event description** - Ticket is assigned or unassigned.

| Property | Type | Description |
|----------|------|-------------|
| `assignee_type` | string | `user` or `role` |
| `assignee_id` | int or null | ID of the assigned user or role |

### Ticket message sent (team reply)

- **Event ID** - `$conversation_message_sent`
- **Event description** - A team member sends a reply.

| Property | Type | Description |
|----------|------|-------------|
| `message_id` | string | The message UUID |
| `message_content` | string | Message text (truncated to 1,000 chars) |
| `author_type` | string | Always `team` |
| `author_id` | int or null | PostHog user ID of the sender |

### Ticket message received (customer message)

- **Event ID** - `$conversation_message_received`
- **Event description** - A customer sends a message.

| Property | Type | Description |
|----------|------|-------------|
| `message_id` | string | The message UUID |
| `message_content` | string | Message text (truncated to 1,000 chars) |
| `author_type` | string | Always `customer` |
| `customer_name` | string | Customer name |
| `customer_email` | string | Customer email |

## Actions

Two workflow actions are available for ticket management:

### Get ticket action

Fetches the full ticket into workflow variables. Use this when you need fields beyond what's in the trigger event properties (e.g. `message_count`, `sla_due_at`).


| Input field | Type | Default |
|-------|------|---------|
| `ticket_id` | string | `{event.properties.ticket_id}` |


| Output field | Type | Description |
|-------|------|-------------|
| `id` | string (UUID) | Ticket ID |
| `ticket_number` | int | Per-team ticket number |
| `status` | string | `new`, `open`, `pending`, `on_hold`, `resolved` |
| `priority` | string or null | `low`, `medium`, `high`, or null |
| `channel_source` | string | `widget`, `email`, or `slack` |
| `distinct_id` | string | Customer's PostHog distinct ID |
| `created_at` | string (ISO 8601) | When the ticket was created |
| `updated_at` | string (ISO 8601) | Last update timestamp |
| `message_count` | int | Total messages on the ticket |
| `last_message_at` | string or null | Timestamp of last message |
| `last_message_text` | string or null | Preview of last message |
| `unread_team_count` | int | Unread messages for the team |
| `unread_customer_count` | int | Unread messages for the customer |
| `sla_due_at` | string or null | SLA deadline, or null if none |

The output fields are available as `{variables.ticket.*}`.

### Update ticket

Changes one or more fields on a ticket. Only the fields you provide are changed.


| Input field | Type | Required | Description |
|-------|------|----------|-------------|
| `ticket_id` | string | Yes | UUID of the ticket to update |
| `status` | choice | No | `new`, `open`, `pending`, `on_hold`, `resolved` |
| `priority` | choice | No | `low`, `medium`, `high` |
| `sla_amount` | string | No | Duration until SLA expires. Use `clear` to remove. |
| `sla_unit` | choice | No | `minute`, `hour`, or `day` (default: `hour`) |
| `assignee` | assignee | No | Assign to a user or role. Set to null to remove assignment. |
| `tags` | tags | No | Replace all tags on the ticket. |

<CalloutBox icon="IconWarning" title="Tags replace, not append" type="caution">

The `tags` input replaces all existing tags on the ticket. If you want to add a tag without removing existing ones, use **Get ticket** first to read the current tags, then merge them in your workflow logic.

</CalloutBox>

## Building conditions

Use `if/else` blocks in your workflow to branch logic.

### Conditions on event properties

```
event.properties.channel_source = "slack"
event.properties.status = "new"
event.properties.priority = "high"
event.properties.customer_email contains "@enterprise.com"
event.properties.new_status = "resolved"
event.properties.message_content contains "urgent"
```

### Conditions on ticket data

```
variables.ticket.message_count > 5
variables.ticket.sla_due_at is set
variables.ticket.unread_team_count > 0
variables.ticket.channel_source = "widget"
```

## Examples

### 1. Set SLA based on channel

Set different SLA deadlines based on whether a ticket came from Slack (internal) or the widget (customer-facing).

```
Trigger event = New ticket created

IF event.properties.channel_source = slack
    SET SLA = 24 hours
ELSE
    SET SLA = 4 hours
```

Update ticket config for the widget path:

| Input | Value |
|-------|-------|
| `ticket_id` | `{event.properties.ticket_id}` |
| `sla_amount` | `4` |
| `sla_unit` | `hour` |

### 2. Set SLA based on priority

Adjust the SLA deadline when a ticket's priority changes.

```
Trigger event = `$conversation_ticket_priority_changed`

IF event.properties.new_priority = high
   SET SLA = 1 hour
ELSE IF event.properties.new_priority = medium
   SET SLA = 4 hours
ELSE
   SET SLA = 24 hours
```

### 3. Auto-assign new tickets to a role

Assign every new ticket to the "Support" role automatically.

```
Trigger event = New ticket created

SET assignee = Support role
```

### 4. Auto-assign based on channel

Route tickets to different teams based on where they came from.

```
Trigger event = New ticket created

IF event.properties.channel_source = slack
   SET assignee = Engineering role
ELSE
   SET assignee = Support role
```

### 5. Move ticket to Open when team replies

Automatically change status from New to Open when a team member first replies.

**Trigger:** Ticket message sent

**Flow:**

1. **If** `event.properties.status` equals `new`
   - **Update ticket:** `status` = `open`

```
status = "open"
```

### 6. Move ticket to Pending after team reply

After a teammate replies, set the ticket to Pending (waiting for customer response).

**Trigger:** Ticket message sent

**Flow:**

1. **Update ticket:**

```
status = "pending"
```

### 7. Reopen ticket when customer replies

When a customer sends a message on a pending or resolved ticket, reopen it.

**Trigger:** Ticket message received

**Flow:**

1. **If** `event.properties.status` equals `pending` **or** `event.properties.status` equals `resolved`
   - **Update ticket:** `status` = `open`

### 8. Auto-tag tickets by customer email domain

Tag tickets from specific customer domains for prioritization.

**Trigger:** New ticket created

**Flow:**

1. **If** `event.properties.customer_email` contains `@bigcorp.com`
   - **Update ticket:**

```
tags = ["enterprise", "priority"]
```

2. **Else if** `event.properties.customer_email` contains `@startup.io`
   - **Update ticket:**

```
tags = ["startup"]
```

### 9. Escalate high-priority tickets

Immediately set a tight SLA and assign to senior support when a high-priority ticket is created.

**Trigger:** New ticket created

**Flow:**

1. **If** `event.properties.priority` equals `high`
   - **Update ticket:**

```
sla_amount = "30"
sla_unit = "minute"
assignee = Senior Support role
tags = ["escalated"]
```

### 10. Tag tickets moving to Pending

Track how many tickets go through the pending state by adding a tag.

**Trigger:** Ticket status changed (filter: `new_status` = `pending`)

**Flow:**

1. **Update ticket:**

```
tags = ["awaiting-customer"]
```

### 11. Full SLA Workflow with priority and channel

A comprehensive example combining multiple conditions for SLA, priority, and assignment.

**Trigger:** New ticket created

**Flow:**

1. **Get ticket** (to access full ticket data)
2. **If** `event.properties.channel_source` equals `slack`
   - **Update ticket:**

```
priority = "low"
sla_amount = "24"
sla_unit = "hour"
assignee = Engineering role
```

3. **Else if** `event.properties.customer_email` contains `@enterprise.com`
   - **Update ticket:**

```
priority = "high"
sla_amount = "1"
sla_unit = "hour"
assignee = Senior Support role
tags = ["enterprise", "vip"]
```

4. **Else**
   - **Update ticket:**

```
priority = "medium"
sla_amount = "4"
sla_unit = "hour"
assignee = Support role
```

## SLA reference

SLAs are set as a duration from "now" (the time the workflow runs). The `sla_due_at` field on the ticket stores the absolute deadline.

| `sla_amount` | `sla_unit` | Resulting deadline |
|--------------|------------|-------------------|
| `30` | `minute` | 30 minutes from now |
| `1` | `hour` | 1 hour from now |
| `4` | `hour` | 4 hours from now |
| `24` | `hour` | 24 hours from now |
| `1` | `day` | 1 day from now |
| `clear` | (ignored) | Removes the SLA |

In the ticket list, SLAs show as one of three states:

| SLA state | Condition |
|-----------|-----------|
| **On track** | More than 1 hour until deadline |
| **At risk** | 1 hour or less until deadline |
| **Breached** | Past the deadline |

## Important notes

- **No infinite loops** – updates made by Workflows (via the external API) do not re-emit ticket events. A Workflow that changes a ticket's status will not trigger the "status changed" Workflow again.
- **Event properties vs ticket data** – event properties give you a snapshot at the time of the event. If you need the latest ticket state (e.g. `message_count` or `sla_due_at`), use the **Get ticket** action first.
- **Tags replace, not append** – the `tags` input on Update ticket replaces all existing tags. Merge manually if you need to preserve existing tags.
- **Rate limits** – the external API used by Workflows is rate-limited to 60 requests/minute and 600 requests/hour per team.

````


---

## `contents/docs/support/javascript-api.mdx`

````mdx
---
title: Build a custom widget
sidebar: Docs
showTitle: true
---

The JavaScript API at `posthog.conversations` gives you full programmatic control over support conversations. Use it to build custom support interfaces or integrate support into your existing UI.

## Checking availability

Before using the API, check if conversations are available:

```javascript
if (posthog.conversations.isAvailable()) {
  // Conversations API is ready to use
}
```

`isAvailable()` returns `true` when:
- Conversations are enabled in your project settings
- The conversations module has loaded successfully

## Sending messages

```javascript
// Send a message (creates ticket if none exists)
const response = await posthog.conversations.sendMessage('Hello, I need help!')

// Send with user identification
const response = await posthog.conversations.sendMessage(
  'Hello, I need help!',
  { 
    name: 'John Doe', 
    email: 'john@example.com' 
  }
)

// Force start a new conversation (new ticket)
const response = await posthog.conversations.sendMessage(
  'Starting a new conversation',
  undefined,  // userTraits
  true        // newTicket
)
```

**Parameters:**
- `message` (string) – The message text to send
- `userTraits` (optional) – Object with `name` and/or `email` for user identification
- `newTicket` (optional, boolean) – If `true`, creates a new ticket even if one exists

**Response:**
```typescript
interface SendMessageResponse {
  ticket_id: string      // ID of the ticket
  message_id: string     // ID of the created message
  ticket_status: string  // 'new' | 'open' | 'pending' | 'on_hold' | 'resolved'
  created_at: string     // ISO timestamp
  unread_count: number   // Unread messages from team (0 after sending)
}
```

## Fetching messages

```javascript
// Get messages for the current active ticket
const response = await posthog.conversations.getMessages()

// Get messages for a specific ticket
const response = await posthog.conversations.getMessages('ticket-uuid')

// Get messages after a specific timestamp (for pagination)
const response = await posthog.conversations.getMessages(
  'ticket-uuid',
  '2024-01-15T10:30:00Z'
)
```

**Response:**
```typescript
interface GetMessagesResponse {
  ticket_id: string
  ticket_status: string
  messages: Message[]
  has_more: boolean      // Whether more messages exist
  unread_count: number   // Unread messages from team
}

interface Message {
  id: string
  content: string
  author_type: 'customer' | 'AI' | 'human'
  author_name?: string
  created_at: string     // ISO timestamp
  is_private: boolean    // Internal notes (not shown to customer)
}
```

## Marking messages as read

```javascript
// Mark messages as read for current ticket
await posthog.conversations.markAsRead()

// Mark messages as read for a specific ticket
await posthog.conversations.markAsRead('ticket-uuid')
```

**Response:**
```typescript
interface MarkAsReadResponse {
  success: boolean
  unread_count: number   // Should be 0 after marking as read
}
```

## Fetching tickets

```javascript
// Get all tickets
const response = await posthog.conversations.getTickets()

// Get tickets with filters
const response = await posthog.conversations.getTickets({
  status: 'open',
  limit: 10,
  offset: 0
})
```

**Parameters:**
```typescript
interface GetTicketsOptions {
  status?: string   // Filter by status: 'new' | 'open' | 'pending' | 'on_hold' | 'resolved'
  limit?: number    // Number of tickets to return (default: 20)
  offset?: number   // Pagination offset (default: 0)
}
```

**Response:**
```typescript
interface GetTicketsResponse {
  count: number      // Total count of tickets
  results: Ticket[]  // Array of tickets
}

interface Ticket {
  id: string
  status: string
  last_message?: string
  last_message_at?: string
  message_count: number
  created_at: string
  unread_count?: number
}
```

## Getting current context

```javascript
// Get the current active ticket ID (null if no conversation started)
const ticketId = posthog.conversations.getCurrentTicketId()

// Get the widget session ID (persistent browser identifier)
const sessionId = posthog.conversations.getWidgetSessionId()
```

The **widget session ID** is a persistent UUID that:
- Stays the same across page loads and browser sessions
- Is used for access control (only this browser can access its tickets)
- Survives user identification changes (`posthog.identify()`)

## User identification

Conversations work with both anonymous and identified users.

### Anonymous users

Messages are associated with the widget session ID. Access to the conversation persists across page loads.

### Identified users

When you call `posthog.identify()`, the conversation seamlessly continues:
- Widget session ID remains the same (user keeps access)
- Backend links the ticket to the identified Person
- User traits from PostHog are used if not provided in `sendMessage()`

### User traits priority

When sending messages, user traits are resolved in this order:
1. Explicitly provided in `sendMessage(message, { name, email })`
2. PostHog person properties (`$name`, `$email`, `name`, `email`)
3. Previously saved traits from the identification form

## Building a custom chat UI

You can build a completely custom chat UI using the API while disabling the default widget:

```javascript
// In PostHog settings: set widgetEnabled to false

// Your custom implementation
async function initCustomChat() {
  // Wait for conversations to be available
  const checkAvailable = setInterval(() => {
    if (posthog.conversations.isAvailable()) {
      clearInterval(checkAvailable)
      loadExistingMessages()
    }
  }, 100)
}

async function loadExistingMessages() {
  const ticketId = posthog.conversations.getCurrentTicketId()
  if (ticketId) {
    const response = await posthog.conversations.getMessages()
    renderMessages(response.messages)
  }
}

async function sendMessage(text, userEmail) {
  const response = await posthog.conversations.sendMessage(text, {
    email: userEmail
  })
  // Add optimistic UI update
  addMessageToUI({
    id: response.message_id,
    content: text,
    author_type: 'customer',
    created_at: response.created_at
  })
}

// Poll for new messages
setInterval(async () => {
  if (posthog.conversations.getCurrentTicketId()) {
    const response = await posthog.conversations.getMessages()
    updateMessagesUI(response.messages)
  }
}, 5000)
```

## Recover tickets across browsers

Tickets are tied to the browser's widget session ID, so switching browsers or clearing storage means losing access. You can recover tickets by requesting a recovery link via email.

### Request a recovery link

```javascript
await posthog.conversations.requestRestoreLink('user@example.com')
```

This sends an email containing a recovery link to the provided address. The link includes a `ph_conv_restore` token as a query parameter and expires after one hour.

**Parameters:**
- `email` (string) – The email address used in previous conversations

The method is rate limited. If you send too many requests, it throws an error with a 429 status.

### Restore tickets from a recovery link

```javascript
const result = await posthog.conversations.restoreFromUrlToken()
```

Reads the `ph_conv_restore` query parameter from the current URL and migrates the associated tickets to the current browser session. After processing, the query parameter is removed from the URL.

**Response:**
```typescript
interface RestoreResult {
  status: 'success'
  migrated_ticket_ids: string[]  // IDs of tickets migrated to this session
}
```

The default widget calls `restoreFromUrlToken()` automatically on load, so you only need to call this yourself if you're building a custom UI.

## Events captured

The conversations module automatically captures these events:

| Event | Description |
|-------|-------------|
| `$conversations_loaded` | Conversations API initialized |
| `$conversations_widget_loaded` | Widget UI rendered |
| `$conversations_message_sent` | User sent a message |
| `$conversations_widget_state_changed` | Widget opened/closed |
| `$conversations_user_identified` | User submitted identification form |
| `$conversations_identity_changed` | User called `posthog.identify()` |

### Workflow trigger events

In addition to the widget events above, the following server-side events are captured when ticket or message state changes. These events can be used as [workflow triggers](/docs/workflows/workflow-builder#conversation-event-triggers) to automate support processes.

| Event | Description | Properties |
|-------|-------------|------------|
| `$conversation_ticket_created` | A new support ticket was created | – |
| `$conversation_ticket_status_changed` | Ticket status was updated | `old_status`, `new_status` |
| `$conversation_ticket_priority_changed` | Ticket priority was updated | `old_priority`, `new_priority` |
| `$conversation_ticket_assigned` | Ticket was assigned to a team member or AI | `assignee_type`, `assignee_id` |
| `$conversation_message_sent` | Team member sent a message on a ticket | `message_id`, `message_content`, `author_type`, `author_id` |
| `$conversation_message_received` | Customer sent a message on a ticket | `message_id`, `message_content`, `author_type`, `customer_name`, `customer_email` |

All workflow trigger events include these base properties: `ticket_id`, `ticket_number`, `channel_source`, `status`, and `priority`.

These events integrate with the rest of PostHog – use them in funnels, cohorts, or to trigger other actions.

## Persistence

The SDK persists the following data in `localStorage`:
- Widget session ID (for access control)
- Current ticket ID (to continue conversations)
- Widget state (open/closed)
- User traits (name/email from identification form)

This data is cleared when:
- `posthog.reset()` is called
- Browser storage is cleared

## Error handling

API methods return `null` if conversations are not available yet. Always check availability or handle null returns:

```javascript
// Option 1: Check availability first
if (posthog.conversations.isAvailable()) {
  const response = await posthog.conversations.sendMessage('Hello')
}

// Option 2: Handle null response
const response = await posthog.conversations.sendMessage('Hello')
if (response) {
  console.log('Message sent:', response.message_id)
}
```

API calls may also throw errors for:
- Network failures
- Rate limiting (429 status)
- Invalid ticket IDs
- Server errors

```javascript
try {
  await posthog.conversations.sendMessage('Hello')
} catch (error) {
  if (error.message.includes('Too many requests')) {
    // Handle rate limiting - wait and retry
  }
}
```

## API reference summary

| Method | Description | Returns |
|--------|-------------|---------|
| `isAvailable()` | Check if conversations API is ready | `boolean` |
| `isVisible()` | Check if widget is rendered | `boolean` |
| `show()` | Show/render the widget | `void` |
| `hide()` | Hide/remove the widget | `void` |
| `sendMessage(message, userTraits?, newTicket?)` | Send a message | `Promise<SendMessageResponse \| null>` |
| `getMessages(ticketId?, after?)` | Fetch messages | `Promise<GetMessagesResponse \| null>` |
| `markAsRead(ticketId?)` | Mark messages as read | `Promise<MarkAsReadResponse \| null>` |
| `getTickets(options?)` | Fetch tickets list | `Promise<GetTicketsResponse \| null>` |
| `getCurrentTicketId()` | Get current ticket ID | `string \| null` |
| `getWidgetSessionId()` | Get widget session ID | `string \| null` |
| `requestRestoreLink(email)` | Send a recovery email to restore tickets | `Promise<void>` |
| `restoreFromUrlToken()` | Restore tickets from URL recovery token | `Promise<RestoreResult \| null>` |

````


---

## `contents/docs/support/email.mdx`

````mdx
---
title: Connect email
sidebar: Docs
showTitle: true
---

The email channel lets customers reach you by email. Incoming emails become support tickets in PostHog, and your replies are sent back as emails – keeping the full conversation threaded in both places.

- **Email to PostHog** – incoming emails are forwarded to PostHog and become support tickets
- **PostHog to email** – your replies in PostHog are sent as emails back to the customer

## Connecting an email address

1. Go to **Support** > **Settings** > **Email channel**
2. Click **Add email address**
3. Enter the email customers will contact you at (e.g. `support@company.com`) and a display name
4. You'll get a **forwarding address** – set this up in your email provider:
   - **Gmail:** Settings → Forwarding → Add a forwarding address
   - **Outlook:** Settings → Mail → Forwarding → Enable forwarding
5. Add the DNS records shown (SPF and DKIM) to your domain – this lets PostHog send replies on your behalf
6. Click **Verify domain** once DNS records are in place

You can connect up to 10 email addresses per project (e.g. `support@`, `billing@`, `sales@`).

<CalloutBox icon="IconInfo" title="Multiple addresses share one inbox" type="fyi">

All connected email addresses feed into the same Support inbox. Use the sender address shown on each ticket to tell which address the customer contacted.

</CalloutBox>

## Domain verification

Your domain must be verified before PostHog can send replies. Verification checks that the required SPF and DKIM DNS records are set up correctly.

<CalloutBox icon="IconWarning" title="Don't create duplicate SPF records" type="caution">

If you already have an SPF record (e.g. `v=spf1 include:someservice.com ~all`), don't create a second one – merge them:

```
v=spf1 include:someservice.com include:mailgun.org ~all
```

</CalloutBox>

Use **Send test email** after verification to confirm everything works.

## How it works

### Inbound (customer to you)

When a customer sends an email to your connected address, it's forwarded to PostHog and:

- A new ticket is created with the email subject, sender name, and sender email
- The email body appears as the first message on the ticket
- Attachments (images and files, up to 10 MB each, max 20 per email) are included in the message
- If the customer replies to an existing thread, the message is added to the same ticket

Tickets from email show `email` as the channel source in the [inbox](/docs/support/inbox) and can be filtered by it.

### Outbound (you to customer)

When you reply to an email ticket in PostHog:

- Your reply is sent as an email back to the customer
- The email uses your configured display name and sending address
- Standard email threading headers are set, so the reply appears in the same thread in the customer's inbox
- Rich text formatting (bold, links, images, etc.) is preserved in the email

**Private notes** are never sent to the customer.

### Threading

Email threads are tracked automatically. Replies from the customer land on the same ticket, and your replies appear in the customer's email thread. This works across email clients (Gmail, Outlook, Apple Mail, etc.).

## Viewing email tickets

Email-sourced tickets appear in your [inbox](/docs/support/inbox) alongside widget and Slack tickets. Each email ticket shows:

- An email icon indicating the channel source
- The sender's name and email address on messages

You can filter the ticket list by channel source to see only email tickets.

## Workflows

Email tickets work with [workflow automation](/docs/support/workflows) like widget and Slack tickets. You can set SLAs, auto-assign, auto-tag, and change status based on any ticket event.

The `channel_source` property is `email` for email-sourced tickets, so you can build channel-specific Workflows. For example, set a different SLA for email tickets or route them to a specific team.

## Disconnecting

To remove a connected email address:

1. Go to **Support** > **Settings** > **Email channel**
2. Click **Disconnect** on the email address you want to remove

Existing tickets from that address are not affected – they remain in your inbox.

````


---

## `contents/docs/support/slack.mdx`

````mdx
---
title: Connect Slack
sidebar: Docs
showTitle: true
---

The **SupportHog** Slack bot connects your Slack workspace to PostHog Support, enabling two-way sync between Slack conversations and support tickets.

- **Slack to PostHog** – messages in Slack automatically create support tickets and add comments
- **PostHog to Slack** – team replies in PostHog are posted back to the Slack thread

This is separate from PostHog's main Slack integration (used for alerts and dashboards). SupportHog has its own bot, credentials, and event handling.

## Connecting Slack

1. Go to **Support** > **Settings** in PostHog
2. Click **Add SupportHog to Slack**
3. Authorize the app in your Slack workspace
4. Select a **support channel** – messages posted there automatically become tickets
5. You're redirected back to PostHog settings

<CalloutBox icon="IconInfo" title="One workspace per project" type="fyi">

Each PostHog project can connect to one Slack workspace. If the workspace is already connected to another project, you'll see an error.

</CalloutBox>

## Configuration

After connecting, configure the integration in **Support** > **Settings**:

| Setting             | Description                                                                                                                                        | Default    |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| **Support channel** | Every top-level message in this channel becomes a ticket. Thread replies sync as ticket messages.                                                  | –          |
| **Ticket emoji**    | React with this emoji on any message in any channel to create a ticket from it.                                                                    | `:ticket:` |
| **Bot mentions**    | Always active – `@SupportHog` in any channel creates a ticket from that message.                                                                   | –          |
| **Ticket nudges**   | When enabled, SupportHog prompts users in non-support channels to open a ticket via a threaded reply with **Open ticket** / **No thanks** buttons. | On         |

### Picking a support channel

When you click the channel selector, PostHog lists all public and private channels the SupportHog bot has access to. Select the channel you want to use as your dedicated support inbox.

## How tickets are created

There are four ways a Slack message becomes a support ticket:

### 1. Support channel messages

Any top-level message in your configured support channel automatically creates a new ticket. Thread replies on that message sync as ticket messages.

### 2. Bot mentions

Type `@SupportHog` in any channel to create a ticket from that message. If mentioned inside an existing ticket thread, the message is added as a comment instead.

### 3. Emoji reactions

React with the configured emoji (default `:ticket:`) on any message to create a ticket from it. If a ticket already exists for that thread, the reaction is ignored to prevent duplicates.

### 4. Ticket nudges

When someone posts a top-level message in a channel the bot is in that isn't a configured support channel, SupportHog replies in-thread asking whether to open a support ticket. The prompt includes **Open ticket** and **No thanks** buttons.

- **Open ticket** – creates a ticket from the original message, backfills any thread replies posted while the prompt was pending, and replaces the prompt with a ticket confirmation.
- **No thanks** – deletes the prompt and suppresses further nudges for that user in that channel for 3 hours.

The prompt also mentions the emoji reaction and `@SupportHog` mention as alternative ways to open a ticket.

To reduce noise, SupportHog skips the nudge for:

- Trivial messages (3 words or fewer, or emoji-only)
- Messages from internal teammates
- Messages that `@mention` the bot (these create tickets directly)
- Users who were already nudged in the last 5 minutes

Ticket nudges are on by default. You can disable them in **Conversations** > **Settings** by unchecking **Nudge users to open tickets**.

All four methods:

- Set `channel_source` to `slack` on the ticket
- Resolve the Slack user's name, email, and avatar
- Convert Slack message formatting to PostHog's rich text format
- Download and re-host any image attachments (up to 4 MB per image)
- Post a confirmation reply in the Slack thread with the ticket number and a link to view it in PostHog

## Two-way sync

### Slack to PostHog

- New messages in the support channel create tickets
- Thread replies sync as ticket messages
- Images from Slack are downloaded and stored in PostHog

### PostHog to Slack

- When a team member replies to a Slack-sourced ticket in PostHog, the reply is posted back to the original Slack thread
- The reply shows the team member's name
- Images attached in PostHog replies are uploaded to the Slack thread

**Private notes** (internal notes) are never sent to Slack.

## Viewing Slack tickets

Slack-sourced tickets appear in your [inbox](/docs/support/inbox) alongside widget and email tickets. Each Slack ticket shows:

- A Slack icon indicating the channel source
- A link to the original Slack thread in the ticket sidebar
- The Slack user's name and avatar on messages

You can filter the ticket list by channel source to see only Slack tickets.

## Disconnecting

To remove the Slack integration:

1. Go to **Support** > **Settings**
2. Click **Disconnect** in the Slack section

Existing tickets created from Slack are not affected – they remain in your inbox but will no longer sync new messages.

````


---

## `contents/docs/support/github.mdx`

````mdx
---
title: Connect GitHub
sidebar: Docs
showTitle: true
---

The GitHub Issues channel connects your GitHub repositories to PostHog Support, enabling two-way sync between GitHub issues and support tickets.

- **GitHub to PostHog** – new issues in monitored repos automatically create support tickets, and issue comments sync as ticket messages
- **PostHog to GitHub** – team replies in PostHog are posted back to the GitHub issue as comments

## Connecting GitHub

<CalloutBox icon="IconInfo" title="GitHub App required" type="action">

You need a PostHog GitHub App installation before connecting the GitHub channel. If you don't have one yet, go to the [**GitHub integration page**](https://app.posthog.com/integrations/github) and install the GitHub App first.

</CalloutBox>

1. Go to [**Support** > **Settings**](https://app.posthog.com/support/settings) in PostHog
2. Click the **GitHub** tab under channels
3. Select a GitHub App installation to connect
4. Choose which repositories to monitor
5. Issues from those repos start creating tickets automatically

## Configuration

After connecting, configure the integration in the **GitHub** tab under **Support** > **Settings**:

| Setting                    | Description                                                                    |
| -------------------------- | ------------------------------------------------------------------------------ |
| **Monitored repositories** | Issues from these repos create support tickets. Select up to 100 repositories. |
| **Connection status**      | Toggle the integration on or off without removing the connection.              |

### Selecting repositories

Click the repository selector to see all repos available through your GitHub App installation. Only issues from selected repositories create tickets – issues from other repos are ignored.

## How tickets are created

### New issues

When someone opens a new issue in a monitored repository, PostHog automatically creates a support ticket with:

- The issue title and body as the first message
- The GitHub username as the customer identity (`github:<username>`)
- `channel_source` set to `github`
- A link back to the original GitHub issue

### Issue comments

Comments on monitored issues sync as ticket messages. If a comment arrives for an issue that doesn't have a ticket yet (e.g. the issue was opened before monitoring was enabled), PostHog creates the ticket automatically.

Duplicate comments are detected and skipped to prevent echoing.

## Two-way sync

### GitHub to PostHog

- New issues create tickets with status **new**
- Issue comments sync as ticket messages
- Closing a GitHub issue sets the ticket status to **resolved**
- Reopening a GitHub issue sets the ticket status back to **open**

### PostHog to GitHub

When a team member replies to a GitHub-sourced ticket in PostHog, the reply is posted back to the GitHub issue as a comment. The comment includes the team member's name.

**Private notes** (internal messages) are never posted to GitHub.

## Viewing GitHub tickets

GitHub-sourced tickets appear in your [inbox](/docs/support/inbox) alongside widget, Slack, and email tickets. Each GitHub ticket shows:

- A GitHub icon indicating the channel source
- A link to the original GitHub issue in the ticket sidebar (e.g. `owner/repo#123`)
- The GitHub user's login name on messages

Filter the ticket list by channel source to see only GitHub tickets.

## Disconnecting

To remove the GitHub integration:

1. Go to [**Support** > **Settings**](https://app.posthog.com/support/settings)
2. Click the **GitHub** tab
3. Click **Disconnect**

Existing tickets created from GitHub issues are not affected – they remain in your inbox but new issues and comments no longer sync.

````


---

## `contents/docs/support/imports/index.mdx`

````mdx
---
title: Import historical tickets
sidebar: Docs
showTitle: true
---

PostHog Support can import historical ticket data from other help desks into the [unified inbox](/docs/support/inbox). Use this when migrating to PostHog and you want agents to keep full ticket context in one place.

Imports are a one-time backfill, not a live integration. Imported tickets do not sync with the source system after the import completes.

## Where to find it

Go to **Project settings** > **Support** > **Imports**.

Only organization admins can start or monitor an import.

## Prerequisites

- [Support enabled](/docs/support/start-here) on the project
- Recommended: at least one [email channel](/docs/support/email) configured under Support settings, plus a default inbox for tickets whose original recipient does not match any of your connected support addresses

<CalloutBox icon="IconWarning" title="Set a default inbox" type="caution">

Without a default inbox, tickets with unmatched recipients may be imported without an email channel. Agents will not be able to reply by email on those tickets.

</CalloutBox>

## Available sources

| Source | Status | Guide |
| ------ | ------ | ----- |
| Zendesk Support | Beta | [Import from Zendesk](/docs/support/imports/zendesk) |

More sources will be added over time. Each source has its own credentials, field mapping, and limitations – see the source-specific guide for details.

## How imports work

Regardless of source, historical imports share the same behavior:

- **Silent import** - imported tickets do not trigger Support [Workflows](/docs/support/workflows), analytics events, or outbound replies (email, Slack, etc.)
- **Unified inbox** - imported tickets appear alongside native tickets. Agents can search, triage, and reply where an email channel is configured
- **Unread badges** - only **new** and **open** imported tickets get unread counts
- **Re-running** - safe to run again. Already-imported tickets are skipped (matched by source ticket ID). Re-running with a default inbox can backfill email channels on tickets that had none
- **Concurrency** - only one import per project at a time

The import page shows live progress. When complete, you will see counts for imported, skipped, and failed tickets.

## What imports are not

Historical imports are different from live [channel integrations](/docs/support/slack) (Slack, GitHub, email) and [data warehouse sources](/docs/cdp/sources/zendesk) (analytics and querying, not the Support inbox). For ongoing ticket flow after migration, use a channel integration or a source-specific two-way sync – not a historical import.

````


---

## `contents/docs/support/imports/zendesk.mdx`

````mdx
---
title: Import from Zendesk
sidebar: Docs
showTitle: true
---

> Zendesk import is in beta. Shared prerequisites and import behavior are covered in [Import historical tickets](/docs/support/imports).

You can migrate your existing Zendesk Support history to PostHog. By migrating, you can access your original Zendesk conversation threads, tags, attachments, and timestamps.

## Zendesk credentials

In addition to the [shared import prerequisites](/docs/support/imports#prerequisites), you need:

- **Subdomain** – e.g. `acme` from `acme.zendesk.com` (full URLs are accepted)
- **Agent email** – the email address tied to the API token
- **API token** – with ticket read access

## How to run an import

1. Go to **Project settings** > **Support** > **Imports**
2. Select **Zendesk**
3. Enter your subdomain, agent email, and API token
4. Optionally select a [default inbox](/docs/support/imports#prerequisites)
5. Click **Start import**

The API token and agent email are encrypted and never shown again after submission. To start a new import you must re-enter them. The subdomain is shown so you know which Zendesk account was used.

## What gets imported

For each Zendesk ticket:

| Item                | Details |
| ------------------- | ------- |
| Metadata            | subject, status, and priority (see mapping tables below) |
| Tags                | Zendesk tags appear as Support tags. Names are normalized and truncated to 255 characters; empty tags are dropped. Re-import does not update tags on already-imported tickets |
| Full message thread | public replies and internal notes |
| Attachments         | images embedded in the thread; other files linked. Files over 20 MiB are skipped. |
| Customer identity   | requester name and email |
| Original timestamps | ticket and message `created_at` / `updated_at` |
| Zendesk ticket ID   | stored on the ticket and shown in the sidebar |

### Status mapping

| Zendesk | PostHog Support |
| ------- | --------------- |
| new | New |
| open | Open |
| pending | Pending |
| hold | On hold |
| solved, closed | Resolved |

### Priority mapping

| Zendesk | PostHog Support |
| ------- | --------------- |
| low | Low |
| normal | Medium |
| high, urgent | High |

### Inbox routing

Tickets route to the email channel matching the original Zendesk recipient address. Unmatched tickets use the default inbox selected at import time.

## What does not get imported

- Assignees, groups, or Zendesk organizations
- Custom fields or CSAT scores

## Limitations

**Ticket counts:** The imported total may be lower than Zendesk's latest ticket number. Zendesk numbers include deleted tickets and gaps; the export API only returns tickets Zendesk still exposes. Permanently deleted tickets (past retention), archived tickets, and some AI agent tickets may be omitted.

**Attachments:** Oversized files are skipped; the message is still imported.

````


---

## `contents/docs/support/surfaces/slack.mdx`

````mdx
---
title: Use Support in Slack
sidebar: Docs
showTitle: true
---

Mention `@PostHog` in any Slack channel to query your support data and the [self-driving](/docs/support/self-driving) work it generates. This is Slack as a surface, where you review and steer. It's separate from [SupportHog](/docs/support/slack), which is Slack as a channel that turns messages into tickets.

<CalloutBox icon="IconInfo" title="You don't reply to customers here" type="fyi">

Answering customer tickets happens in the [web app](/docs/support/inbox). In Slack, you ask about your tickets and steer the self-driving fixes built from them.

</CalloutBox>

## What you can do

Mention `@PostHog` and it works in the thread:

- Ask about your support data, like "summarize my open tickets" or "what's the oldest unresolved one?"
- Review the self-driving reports built from your conversations, and approve, steer, or decline them.
- Ask it to plan a fix. It runs checks and opens a draft pull request, replying in-thread as it goes.

## Why Slack

Two things make Slack useful for a support team specifically.

- **Collaborative steering** - Anyone in the thread can answer the agent's questions or nudge a running task mid-flight.
- **Cross-visibility** - A task you start in Slack also shows up in [PostHog Code](/docs/support/surfaces/code), marked with a Slack icon, so you can take it over on your desktop.

The `@PostHog` Slack app is in beta, so some behaviors may still change.

````


---

## `contents/docs/support/surfaces/mcp.mdx`

````mdx
---
title: Use Support over MCP
sidebar: Docs
showTitle: true
---

import TicketStatuses from '../_snippets/ticket-statuses.mdx'

The PostHog [MCP server](/docs/model-context-protocol) brings Support into Claude Code, Cursor, and other AI tools. If you already work in one of these tools, it keeps ticket context within reach without a trip to the web app.

## Debug without leaving your editor

This is where MCP earns its place for a support engineer. Say you're in Cursor or Claude Code tracking down a bug, and a support ticket is about that exact issue. Instead of switching windows to the web app, ask your agent to pull the ticket. It reads the customer's message, the linked session, the surrounding events, and the exception right where you're already working, so you go from report to root cause without breaking flow. Once you've shipped the fix, update or resolve the ticket from the same place.

For example, you might ask your agent to:

- Show the open tickets that mention the checkout error you're investigating
- Pull ticket #142 and summarize what the customer ran into
- Set ticket #142 to resolved once you've merged the fix

Because your agent has both your codebase and your ticket context in one session, it can connect a customer report to the exact code path, and even draft the fix, without you copying details between two tools.

## What you can do

Through MCP tools, your agent can:

- List and update tickets, so you can pull ticket context into your session or script bulk changes.
- Manage self-driving reports, including reading a report and moving it through its states.

For the full list of tools and how to scope a session to a subset, see the [MCP tools reference](/docs/model-context-protocol/tools).

## Ticket statuses

When you update a ticket over MCP, you move it between the same statuses you'd use in the web app:

<TicketStatuses />

## Setup

Connect the PostHog MCP server to your AI tool of choice, then grant it access to your project. The [MCP overview](/docs/model-context-protocol) covers install and authentication for each client.

To hold a back-and-forth conversation with a customer, use the [web app](/docs/support/inbox). MCP is for reading ticket context and updating ticket state from inside your AI tool.

````


---

## `contents/docs/support/surfaces/code.mdx`

````mdx
---
title: Use Support in PostHog Code
sidebar: Docs
showTitle: true
---

[PostHog Code](/docs/posthog-code) is the desktop app for driving parallel agents that edit your product. For Support, it's where you review and merge the [self-driving](/docs/support/self-driving) work your tickets generate. You don't reply to customer tickets here, that happens in the [web app](/docs/support/inbox).

PostHog Code is in beta.

## What you can do

- Connect signal sources, including your support conversations, so they feed the self-driving loop.
- Review researched reports, prioritized by user impact, and merge the pull requests when a fix is ready.
- Take over a task locally for deeper, multi-repo agent work.

## How it connects to Slack

A task you start in [Slack](/docs/support/surfaces/slack) shows up in PostHog Code, so you can pick it up on your desktop and keep going. The same self-driving inbox lives in both places.

````


---

## `contents/docs/support/self-driving.mdx`

````mdx
---
title: Support and self-driving
sidebar: Docs
showTitle: true
contentMaxWidthClass: max-w-5xl
---

import { IconMessage, IconMagic } from '@posthog/icons'

Your support conversations are one of the richest signals about what's broken in your product. Self-driving reads them: a recurring complaint becomes a report, and when there's a code fix, a pull request you review and merge. This page is how the two connect, and where you work each side.

<CalloutBox icon="IconInfo" title="Coming soon: the reply-drafting agent" type="fyi">

An AI agent that drafts replies *to your customers* is coming soon. It's separate from the self-driving agent described here, which writes *code fixes*, not customer replies. Today you still write the replies yourself in the [inbox](/docs/support/inbox).

</CalloutBox>

## Two inboxes, two jobs

The most important thing to know: there are two different inboxes, and they don't do the same thing.

<div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-6">

  <div className="bg-accent border border-primary rounded p-4">
    <div className="flex items-center gap-2 mb-1"><IconMessage className="size-5 text-red shrink-0" /><span className="font-bold text-primary">Support inbox</span></div>
    <p className="m-0 text-sm text-secondary">Where you <strong>read and reply to customers</strong>. Every ticket carries the sender's replay, events, and errors. This is the human side, and it lives in the web app.</p>
    <a href="/docs/support/inbox" className="inline-flex items-center gap-1 mt-2 text-sm font-semibold text-red">Support inbox →</a>
  </div>

  <div className="bg-accent border border-primary rounded p-4">
    <div className="flex items-center gap-2 mb-1"><IconMagic className="size-5 text-purple shrink-0" /><span className="font-bold text-primary">Self-driving inbox</span></div>
    <p className="m-0 text-sm text-secondary">Where you <strong>review the reports and pull requests</strong> self-driving builds from those tickets (plus errors and replays). You steer, approve, and merge here.</p>
    <a href="/docs/self-driving/inbox" className="inline-flex items-center gap-1 mt-2 text-sm font-semibold text-red">Self-driving inbox →</a>
  </div>

</div>

## How support feeds the loop

Support is a first-class [signal source](/docs/self-driving/inbox/sources) for self-driving. It watches your conversations and turns actionable items into signals. Those signals don't each become their own task: they're deduplicated and grouped with related error-tracking and session-replay signals, so one customer-facing problem shows up as **one report**, not a scattered stream.

<div className="not-prose grid grid-cols-2 md:grid-cols-5 gap-2 my-6">
  <div className="bg-accent border border-primary rounded p-3"><div className="text-2xs font-bold uppercase tracking-wide text-red mb-1">Conversations</div><div className="text-[13px] text-secondary">Tickets from every channel, plus external help desks.</div></div>
  <div className="bg-accent border border-primary rounded p-3"><div className="text-2xs font-bold uppercase tracking-wide text-red mb-1">Signals</div><div className="text-[13px] text-secondary">Actionable items extracted from conversations.</div></div>
  <div className="bg-accent border border-primary rounded p-3"><div className="text-2xs font-bold uppercase tracking-wide text-red mb-1">One report</div><div className="text-[13px] text-secondary">Grouped with related errors and replays.</div></div>
  <div className="bg-accent border border-primary rounded p-3"><div className="text-2xs font-bold uppercase tracking-wide text-red mb-1">Draft PR</div><div className="text-[13px] text-secondary">When a code fix is possible.</div></div>
  <div className="bg-accent border border-primary rounded p-3"><div className="text-2xs font-bold uppercase tracking-wide text-red mb-1">You merge</div><div className="text-[13px] text-secondary">Nothing ships without a human.</div></div>
</div>

External help desks feed the loop too: [Zendesk](/docs/support/imports/zendesk), Jira, GitHub Issues, and Linear are all signal sources, so tickets living outside PostHog still count. You enable or disable Support as a source in the self-driving inbox settings.

## Where you work each side

Replying to customers happens in one place. Reviewing the self-driving work happens in several. Here's the split.

| Capability | Web app | PostHog Code | Slack (`@PostHog`) | MCP |
| --- | --- | --- | --- | --- |
| Reply to customer tickets | ✅ | – | via SupportHog only | list / update tickets |
| Configure Support as a signal source | ✅ | ✅ connect sources | – | – |
| Review self-driving reports and evidence | ✅ full depth | ✅ | ✅ | reports via API |
| Approve, steer, or decline | ✅ | ✅ | ✅ | state changes via API |
| Open, iterate, and merge PRs | ✅ merge | ✅ research → PR → merge | ✅ draft PR + steer | – |
| Collaborative, multi-person steering | – | – | ✅ | – |

A few things the matrix flattens:

- **Web app** is home base. It's the only place you reply to customers, and the only place with full-depth review of a report's evidence before you approve or merge.
- **PostHog Code** is the desktop surface for deep, multi-repo agent work: connect sources, review researched reports, and merge. You don't reply to customer tickets here.
- **Slack** is for summoning and steering in the flow of your day. Mention `@PostHog` and it plans a fix, runs checks, and opens a draft PR in-thread, where anyone can steer it. A task started in Slack also shows up in PostHog Code so you can take it over on desktop.
- **CLI** isn't a working surface. It only turns self-driving on: `npx @posthog/wizard self-driving`.

## Cost and betas

Draft pull requests are billed at **$15 each**, with your first three per month free, and [refunded if a PR wasn't worth it](/docs/self-driving/pricing#refunds). Reports are free, and nothing merges without a human.

Both the `@PostHog` Slack app and self-driving overall are in beta, so some behaviors (for example, exactly which review actions render in Slack versus the web app) may still shift.

````


---

## `contents/docs/support/pricing.mdx`

````mdx
---
title: Support pricing
sidebar: Docs
showTitle: true
---

The core of Support is free. The paid pieces are opt-in, so you only pay when you turn something on.

## What's free

The widget, the inbox, all four [channels](/docs/support/concepts/channels), workflow automation, and historical imports are free to use. There's no per-seat charge.

## The AI reply agent (coming soon)

An AI agent that drafts replies to your customers is coming soon. It will be opt-in: only teams who turn it on are billed, and we'll give you plenty of notice before that happens.

## Self-driving

When your tickets feed [self-driving](/docs/support/self-driving) and it opens a pull request, that PR is billed at $15, with your first three each month free. Reports are always free, nothing merges without a human, and a PR that wasn't worth it is [refunded](/docs/self-driving/pricing#refunds). See [self-driving pricing](/docs/self-driving/pricing) for the details.

````


---

## `contents/docs/support/concepts/channels.mdx`

````mdx
---
title: Channels
sidebar: Docs
showTitle: true
---

A channel is a way a customer conversation reaches Support. Whatever channel a message arrives on, it becomes a [ticket](/docs/support/inbox) in the same inbox, so your team works from one place.

Channels are your support context. In [self-driving](/docs/support/self-driving) terms, the conversations they bring in are a signal source: recurring issues across your tickets become reports and, when there's a code fix, pull requests.

## The four channels

| Channel | How tickets arrive | Guide |
| --- | --- | --- |
| **Widget** | An in-app chat button. Auto-attaches the session, replay, URL, and identity | [Set up the widget](/docs/support/widget) |
| **Email** | Forward `support@` mail in. Replies thread back to the customer's inbox | [Connect email](/docs/support/email) |
| **Slack** | SupportHog turns messages, mentions, or a `:ticket:` reaction into tickets | [Connect Slack](/docs/support/slack) |
| **GitHub** | Issues in monitored repos become tickets. Replies post back as comments | [Connect GitHub](/docs/support/github) |

Every channel syncs both ways. A reply you send in PostHog reaches the customer on the channel they used, and their responses sync back to the ticket.

## Slack and GitHub each play two roles

Two of these channels share a name with something else in PostHog, which is worth untangling.

- **Slack** is a channel when SupportHog turns messages into tickets. It's also a *surface* when you mention `@PostHog` to review self-driving work. The channel is where tickets come *from*; the surface is where you *work*. See [Use Support in Slack](/docs/support/surfaces/slack).
- **GitHub** is a channel when issues become support tickets. GitHub Issues is *also* a [self-driving signal source](/docs/self-driving/inbox/sources), where issues feed the loop directly. Same integration, two jobs.

````


---

## `contents/docs/support/_snippets/ticket-statuses.mdx`

````mdx
| Status | Meaning |
| --- | --- |
| `new` | Just created, not yet viewed by your team |
| `open` | Being actively worked on |
| `pending` | Waiting for a customer response |
| `on_hold` | Paused for an external reason |
| `resolved` | Issue resolved, conversation closed |

````


---

## `contents/docs/support/_to_delete/inboxes.mdx` (not found)


---

## `contents/docs/support/_to_delete/tickets.mdx`

````mdx
---
title: Tickets and statuses
sidebar: Docs
showTitle: true
---

import TicketStatuses from '../_snippets/ticket-statuses.mdx'

A ticket is a single customer conversation in Support. Every message a customer sends, from any [channel](/docs/support/concepts/channels), becomes part of a ticket that you read, assign, and resolve in the [Support inbox](/docs/support/inbox). This page explains a ticket's properties, how its status changes over its life, and how messages work.

## Ticket properties

Each ticket has the following properties.

| Property | Description |
| --- | --- |
| **Ticket number** | Auto-incremented unique number, for example #1, #2, #3 |
| **Status** | `new`, `open`, `pending`, `on_hold`, or `resolved` |
| **Priority** | `low`, `medium`, or `high`. Unset by default |
| **Channel** | Where the ticket came from: `widget`, `email`, `slack`, or `github` |
| **Assignee** | The user or role responsible for the ticket |
| **Session ID** | The PostHog session used to load events and exceptions |
| **Distinct ID** | The PostHog `distinct_id` used to link the ticket to a person |

## Statuses

A ticket moves through a set of statuses as your team works it.

<TicketStatuses />

You can also snooze a ticket until a specific time. Snoozing sets the status to `on_hold`, and the ticket reopens to `open` when the snooze expires.

SLA state is derived from a deadline you set through [workflow automation](/docs/support/workflows), not from the status. See [Manage and resolve tickets](/docs/support/inbox) for how to work statuses and SLAs day to day.

## Messages and author types

Every message on a ticket has an author type.

| Author type | Description |
| --- | --- |
| **Customer** | Sent by the end user through the widget, email, Slack, or GitHub |
| **Support** | Sent by your team from PostHog |
| **AI** | Reserved for the AI reply agent, which is coming soon. It will post private notes for your team or public replies, configurable per channel |

### Message delivery status

Widget and email messages show a delivery status so you know a reply landed.

| Channel | Statuses |
| --- | --- |
| Widget | **Sent** when delivered, **Read** when the customer views it |
| Email | **Sending**, then **Sent** on success or **Failed** if delivery fails |

### Private notes

You can mark any message as a private note. Private notes are visible only to your team in PostHog, hidden from the customer, and don't count toward the customer's unread messages. Use them for internal context or handoffs.

### Unread tracking

Support tracks unread messages separately for the customer and your team. Counts reset when your team views a ticket in PostHog, or when the customer marks messages as read from the widget.

````
