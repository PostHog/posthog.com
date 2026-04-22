---
title: Running product training sessions
sidebar: Handbook
showTitle: true
---

> **Purpose** - Get new PostHog customers self-sufficient and primed to explore more of PostHog.
> **Format** - Two live group sessions for up to 30 people across product, marketing, and engineering.
> **Total TAM time** - ~2.5–3.5 hours live delivery, plus ~one hour prep per session.

This document tells you what to cover in a training session and why it matters. It's not a script or the only way to approach training. Consider this a good baseline but you will want to always run it in your own voice, in whatever order fits the customer's needs. Product training is a separate and optional activity you can run with an account if you believe it will increase usage and help them derive more value from PostHog. 

PostHog AI and MCP should be woven into every demo and practical. Don't teach them as standalone features. Use them as the way you build things in front of the room. The goal is for everyone to leave thinking AI-assisted analytics is the normal way to work.

## Pre-session work

Do this before Session 1. The prep is what separates a useful session from a product tour that is easily forgotten.

### Understand what will make the session valuable

Gather answers to the following questions (you may know the answers but it's still worth asking the customer directly):

- "What are the three questions about your users you can't answer today?"

- "What tools are you replacing or supplementing with PostHog?" (GA4, Amplitude, LaunchDarkly, etc.)

- "Who on your team do you want using PostHog daily? What are their roles?"

- "How heavily have your teams adopted AI tools and workflows?" (This sets up the MCP conversation later.)

### Decide what to show

- If the customer already has a PostHog instance, you may want to use it for the training session. It is easier for new users to understand how PostHog works if they're familiar with the data they're looking at. Make sure you have permission from an Owner or Admin before Session 1.

- Review their account in Metabase to get a better understanding of existing usage. Are events named consistently? Are they identifying users? Is autocapture on? Note the gaps – you'll address them in Session 1.

- If the customer's instance has not been well instrumented (poor event taxonomy, instrumentation gaps, or limited product adoption), it may be better to use a demo instance with data that closely resembles what the customer might have. If it's really bad, consider waiting to do training until you've helped them improve it.

### Prep a dashboard

- Build a dashboard from their actual data (or something closely resembling it). Three to five insights that answer their key user questions above. You'll refine it live, but showing up with something already built saves 15 minutes of dead air and proves you did the homework.

### Prep a session summary

- Generating a session summary can take a few minutes. Instead of doing it live during training, create one ahead of time that you can show.

### Confirm attendees have access

- Confirm via admin panel that attendees can sign up by themselves (Authentication Domains have been configured) or that they've been invited.

- Consider sending attendees a welcome email if they're new to PostHog. Use this as an opportunity to tell them what PostHog is and how they can access it.

<CalloutBox icon="IconInfo" title="A note on scheduling" type="fyi">
If possible, schedule both sessions in the same week. Monday/Thursday or Tuesday/Friday. A long gap between sessions kills momentum.
</CalloutBox>

## Session 1: PostHog fundamentals

**Audience** - Everyone. Product, engineering, marketing, data, leadership.

**Duration** - 90 minutes (65 min content, 15 min Q&A, 10 min buffer).

**Deliverable** - A working dashboard in their project. Every attendee knows how to build an insight and watch a replay.

### Why it matters

This is the only session that's guaranteed. If they never show up for Session 2, this has to be enough to make PostHog stick. Every topic here maps to the most-visited pages in our docs.

### Topics to cover

#### Intro to PostHog (5 min)

- We want to jump into the product as quickly as possible – keep this brief. It's not a sales pitch but rather an overview of the platform and why it can help product engineers build more successful products.

- Avoid talking through the individual products at this point. It's better to show them.

- Make sure everyone is able to sign into PostHog.

#### The data model (10 min)

**Events**

- Start on the Activity page and explain that Events are the backbone of how PostHog works. Differentiate between autocapture and custom events. Open an event to show that it has properties.

- Quick note on frontend vs. backend capture. Backend is more reliable. Frontend captures richer interaction data. Both have a place.

- Ask PostHog AI "What are the most common events in this project?". This will orient the room and let them see PostHog AI can access and understand their events.

**Persons and properties**

- Show the difference between identified and anonymous users. Explain how `identify()` stitches anonymous and known users together.

- Show them a person profile and what lives there. Point out what person properties are and give examples of useful ones in the customer's context.

**Cohorts**

- Build one live using PostHog AI: "users who signed up in the last seven days" or whatever matches their product. Give real examples of other useful cohorts they may want to explore (e.g. power users, early adopters, likely to churn, etc.)

- Explain that cohorts can be automatically updated and are reusable across different parts of PostHog. Create cohorts to learn from the behaviors of specific groups of users.

Pause for questions. Allow for some awkward silence.

#### Building insights (15 min)

The core of the session. Don't teach insight types in the abstract. Build them around a real question from the pre-session prep.

**Trends**

- "How many users signed up this week vs. last week?"

- Show total count, unique users, breakdown by property, and aggregation of property values.

- Flip through visualizations: line, bar, number. Same data tells different stories depending on the display.

**Funnels**

- "Where are users dropping off in our onboarding flow?"

- Build a three- to four-step funnel from their actual events.

- Show conversion rate, the drop-off step, how to click into the users who dropped off, and tie it back to cohorts.

- If the data supports it, show correlation analysis. ("Users with property X convert 2x better.")

<CalloutBox icon="IconInfo" title="Make it interactive" type="fyi">
For smaller audiences (~10 people), encourage attendees to build an insight themselves by prompting PostHog AI or clicking through the UI. Try: "Show me a funnel from page_view to sign_up to first_project_created in the last 30 days." For larger groups, this gets chaotic – demo it yourself and save the hands-on exercise for Session Replay.
</CalloutBox>

#### Session Replay (15 min)

Connect Session Replay to the funnel you built. Show the numbers, then show the human behind the numbers.

- Mention the filters: by event, by person property, by error, feature flag, rage clicks, console logs. Plant the seed that PostHog products all work well together.

- Show how to create and save a playlist.

<CalloutBox icon="IconInfo" title="Make it interactive" type="fyi">
Ask the audience to build a Session Replay filter using PostHog AI or the UI.
</CalloutBox>

- End this portion of the training by explaining AI session summaries. Show the real example from your prep work.

#### Dashboards (10 min)

- Take the insights you built and save them to the starter kit dashboard.

- Show sharing, date range controls, and pinning.

- Mention dashboard templates for teams that want something pre-built.

- Show subscriptions: schedule a weekly dashboard email to their team. (Single best way to keep PostHog in people's inboxes without any TAM effort.)

#### Quick overview of what else exists (5 min)

Don't demo any of these. Name them so the room knows what's available and that they're tied to events.

- Feature Flags and Experiments, including no-code web experiments (product + eng)
  - Change your app and see the impact on Product Analytics data
- Web Analytics dashboard (marketing)
  - Understand who is visiting your site, where they're coming from, whether they're converting, and if they become active users
- Surveys (product + marketing)
  - Collect qualitative feedback by triggering in-app surveys based on user actions
- LLM Analytics (teams building AI features)
  - Understand how people are interacting with your LLM-based features
- Error Tracking and Logs (engineering)
  - Capture errors as events so that you can see how exceptions are influencing user behavior
- Data Warehouse and SQL editor (data / power users)
  - Query other data, such as prod dbs or Stripe transactions, alongside your Product Analytics data
- MCP server (engineering teams using AI coding tools)
- CDP & Workflows

#### Q&A (15 min)

Open floor. If nobody asks any questions, mention some of the below examples as commonly asked questions. This may make people feel more comfortable.

- "How do I filter out internal users?" – Point to the [tutorial](/tutorials/filter-internal-users). Top-10 docs page for a reason.

- "What's the difference between Web Analytics and Product Analytics?" – Web Analytics is the pre-built dashboard for high-level metrics. Product Analytics enables custom insights for deeper questions.

- "Can I share this with people who don't have PostHog access?" – Yes. Subscriptions, embeds, PNG exports.

- "Is it possible to group related events and analyze them as one?"

- "Do I need to involve engineering every time I want to track a new event?"

### After Session 1

- Drop a screenshot and a link of the dashboard into the shared Slack channel within 24 hours. Tag the team lead.

- Send a follow-up with links to the three or four most relevant docs or tutorials based on what came up in Q&A.

- Send the MCP setup and share a Loom video of accessing PostHog data from Claude or ChatGPT.

---

## Session 2: Pick your track

**Duration** - 60 minutes (40 min content, 15 min Q&A, five min buffer).

Offered as two tracks. The customer picks one, or runs both if they have the headcount. Schedule it two to four days after Session 1.

Session 2 is optional. Hype it up, but don't treat it as a dealbreaker. If a customer only does Session 1, they're still in solid shape.

### Track A: Product + engineering

**Audience** - PMs, engineers, data scientists. Anyone who ships features.

**Deliverable** - A live feature flag targeting a real user segment, plus a draft experiment with a defined hypothesis.

#### Feature Flags (15 min)

The gateway to Experiments. Nail this first.

- Create a flag together targeting a real segment (beta users, a specific country, a percentage rollout).

- Walk through the lifecycle: create, roll out to X%, check analytics, roll to 100% or kill it.

- Briefly cover multivariate flags, payloads, early access feature management.

- For engineering-heavy rooms: mention local evaluation and bootstrapping. These are top docs pages because engineers want flags that resolve fast on the client.

#### Experiments (10 min)

Start from a hypothesis, not a feature. Ask the room: "What's something you're debating shipping right now?"

- Set up a draft experiment: hypothesis, primary metric (a funnel or trend), control and test variant.

- Walk through how to read results. When to call it. Use a real experiment with good data.

- Mention no-code web experiments for quick wins that don't need eng work.

#### LLM Analytics (10 min)

Big for any team building AI features. Clustering in particular can provide insights that are otherwise hard to come by.

- Show what gets captured automatically: conversations, token usage, cost per model, latency, error rates.

- Walk through a generation: input, output, tokens, cost.

- Show traces for multi-step LLM workflows.

- Connect it to Session Replay: "here's the replay of a user interacting with your AI feature, alongside the trace."

If they're not building AI features, skip this. Spend the time on Feature Flags and Experiments instead.

#### MCP

- Make sure everyone who wants to use the MCP server has either set it up already or knows where to find the docs.

- Ask for a volunteer to try using MCP to create a feature flag. "Create a feature flag called 'new-checkout-flow' with 20% rollout targeting users in the US." For teams already using AI coding tools, this will probably be the single biggest takeaway from the entire training.

#### Bonus topics if time allows

- **Group analytics** - Account-level analysis for B2B products (setting up groups, group properties, group-based flags). This is the most important bonus topic for B2B customers – if the customer sells to businesses rather than consumers, prioritize this over the others.

- **Error Tracking** - Auto-captured errors, stack traces, connecting errors to replays

- **Data Warehouse** - SQL Editor and bringing in data from other sources

### Track B: Marketing + growth

**Audience** - Marketing, growth, content, demand gen. Anyone who cares about acquisition and conversion.

**Deliverable** - A Web Analytics dashboard configured for their site, plus a live survey draft targeting a real user segment.

#### Web Analytics (15 min)

- Walk through the pre-built dashboard: visitors, bounce rate, top pages, traffic sources, devices.

- Marketing analytics: UTM tracking, channel attribution, entry/exit pages.

- Web vitals: page load performance. (Matters for SEO, matters for ad spend efficiency.)

- Clarify the relationship with Product Analytics: Web Analytics is aggregate and pre-built, Product Analytics is custom and user-level. Same data, different lenses.

#### Advanced funnels for marketing (10 min)

Build on what they learned in Session 1, applied to marketing use cases.

- Funnel from landing page visit to signup (or whatever their conversion event is).

- Break down by UTM source to show which channels convert best.

- Correlation analysis: what properties predict conversion?

- Time-to-convert: how long from first visit to signup?

- PostHog AI moment – "why are users dropping off between step 2 and 3?"

#### Surveys (7 min)

- Create a popover survey targeting a real page or user segment.

- Targeting options: URL, user properties, event triggers, device type.

- Question types: open-ended, rating, NPS, multiple choice.

- Mention response limits, scheduling, custom appearance.

- PostHog AI moment – summarize responses using AI.

#### Session Replay for marketing (5 min)

- Filter replays to users from a specific traffic source or landing page.

- Show rage clicks and dead clicks on key conversion pages.

- "Watch three replays of users who hit your pricing page but didn't sign up" is a strong closer for marketing audiences.

#### Workflows (3 min)

- Reach out to users at the right time based on their behavior.

- Show templates.

### After Session 2

- Follow up on any unanswered questions. Share docs to anything that piqued their interest.

- Reach out to anyone that was invited but didn't join. Share some of the most interesting learning / Q&A topics.

---

## Engagement tips

### For the "too busy" crowd

**Offer a 15-minute micro session.** If someone reschedules twice, don't push. Offer to screenshare and build one thing while they watch. Low commitment, high value. Most people who do a micro session rebook the full one.

**For $80k+ customers who are in-office** – pitch a half-day onsite. Frame it as "we'll sit with your team and build your analytics stack together." Informal one-on-one time at someone's desk is worth 3x a scheduled Zoom.

### Gather feedback with Surveys

Set up a PostHog survey targeting training participants after each session. This does two things: it collects real feedback on the training, and it shows attendees a live example of Surveys in action on themselves. Good dog-fooding moment.
