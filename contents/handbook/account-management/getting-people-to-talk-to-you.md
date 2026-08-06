---
title: Getting people to talk to you
sidebar: Handbook
showTitle: true
---

> This is a living document — we'll keep adding tactics as we learn what works. If you've found something effective, add it here!

Product engineers, our ICP, are very self-serve and happy to implement PostHog themselves and read the docs without ever interacting with someone unless they have support queries. But unengaged customers churn, and "just checking in" rarely works.

The common thread across everything below: **do your homework first, then lead with something specific and valuable.**

## Why is it helpful for someone to talk to you?

The reasons have to be _genuinely helpful_ ones - just 'having a point of contact' is not enough. Reasons include:

- You can save them money:
  - They've implemented PostHog in a silly way and are consuming stuff they don't need
  - They can pre-commit and get a discount on credit
- You can help them get more out of PostHog for the same amount of money, e.g. if they're ingesting loads of events but not using features to their fullest
- You can train their team on how to use PostHog, so they don't have to
- You can make them aware of upcoming or new products that are specifically useful for their use case
- You can be a shortcut to premium support, if they are in your book of business

If you go down the 'saving money' route, bear in mind two things:

- Prepaid credit never works as an opener - 'save money by fixing implementation' >>> 'save money by committing to credit at a discount'
- Buying a bunch of credits at a nice discount is much nicer to hear than 'please commit to a scary annual plan' - they can commit for a year, 6 months, whatever so long as they buy >$20k up front

## Do your homework first

Before reaching out, spend 10 minutes understanding where the customer is at. This makes all the difference between a generic check-in and a genuinely helpful conversation.

### Review their engagement metrics

Use the customer's PostHog usage data to understand what they're actually doing before you reach out. Look at:

- **What features they're using** — insights, dashboards, recordings, etc.
- **Insight titles they've created** — these reveal what business questions they care about
- **Recent activity** — are they creating new things or just passively viewing?

For example, if a customer is creating and viewing insights with titles around "funnel conversions," they almost certainly care about improving funnel conversion rates. Lead with that.

**Where to look:** Customer engagement dashboard in PostHog — filter by the customer's org/team and check insight creation and viewing activity. Use PostHog AI or the PostHog MCP ([with CS Skills like User Deep Dive](https://github.com/PostHog/skills/tree/main/skills/team/customer-success)) to pull additional details and summaries.

### Walk through their site with debug mode

Visit the customer's website and inspect their PostHog implementation firsthand:

1. Open the browser console and run `posthog.debug()` to enable debug mode
2. Check the config to see how PostHog is configured
3. Walk through key flows (login, onboarding, core product actions)
4. Watch what events fire — are they capturing meaningful actions?
5. Look for issues: missing events, misconfigured properties, no identify calls, etc.

This gives you a firsthand view of what the customer is (or isn't) capturing. You can come to the conversation with specific, concrete observations — "I noticed you're not capturing any events after sign-up" — rather than asking them to self-report.

**Framing matters:** Position it as a proactive health check, not a criticism. Something like: "I took a look at your implementation and spotted a couple of things that might be worth addressing..."

### Dig into frustration signals with MCP

MCP is great for finding silent frustration — and the specific person worth reaching out to about it:

- **Lost insights** — ask how many insights were started versus saved, and by who. 130 started and 6 saved is someone struggling to build what they want.
- **Rage clicks** — find pages or insights where a user is unusually frustrated, then pair it with session replay to see what they were trying to do.
- **Query failures** — Vitally surfaces that they happen; MCP will often name the failing query, so you can investigate (and ideally fix it) before reaching out.
- **Client request failures** — separate from query failures, and usually means data isn't loading for them. Resolve it, or file a bug on their behalf.
- **Product engagement** — AI often measures PostHog UI engagement only, so ask about MCP engagement too. Vitally's low "dashboard activity" is frequently a false positive because it counts dashboard views, not insights.
- **Event changes** — ask for an analysis at the _organization_ level (it defaults to user engagement) on a daily/weekly/monthly basis to catch implementation changes and product drops. If volume moved, ask who was using that product beforehand.
- **Product adoption** — MCP will surface customers testing a product, sending sample events, or quietly winding usage down. E.g. *"I see you recently tested our data warehouse briefly but have discontinued sending data. Was there anything specific you were looking to do that I could help with?"*
- **Priority summary** — once you've looked at all the signals, ask for a prioritized list of users to contact, each with their specific issue and a draft message you can tweak.

_Note:_ ask MCP to ignore weekend events — weekend dips create false positives.

### But don't let research become the blocker

A heavily researched, tailored message is always better, but it can be a big time sink. For a first touch, a simple email that points at their use case with a specific suggestion is enough — you don't need to design a bespoke Loom for everyone. Just don't tip into generic: "here to help" won't break through.

## Reasons to reach out

Ordered roughly by how often the trigger comes up. Apply the [rules of thumb](#rules-of-thumb) to whichever you pick.

### SDK health — flag outdated SDKs

Use the SDK health check to see if the customer is running outdated SDKs. This is one of the easiest, most concrete reasons to reach out. We recommend customers update monthly so they don't miss bug fixes and improvements.

**Suggested cadence:** Run the SDK health check on each of your accounts quarterly, or whenever a customer is ramping up usage of a specific SDK.

**Suggested wording:**

> BTW our SDK health check is warning that you are using a three year old version of our Python SDK — I promise we've improved it since then! Also your iOS and Android SDKs are really out of date. Any chance of updating these?

**Why it works:** Specific, helpful, and low-effort for both sides. The tone is light and friendly, not alarming.

### Spot new product interest and reach out proactively

Watch customer activity for signs they're exploring a product they haven't adopted — docs page views, product-page activity, exploratory events. Use that as a natural conversation starter (credit to Tyler). Same goes in reverse: tell them about new or upcoming features they may not be aware of which you know could be a great fit, and let them try them out for free.

**Suggested cadence:** Weekly scan of doc-page views and product-page activity for your accounts.

**Suggested wording:**

> Hey @[contact], saw you checking out AI observability and wanted to share a few things. It occurred to me that our LLM observability suite might be really helpful for your team.
>
> Not only do you get evals/traces/generations to track model performance, token usage, etc, you can then also connect those things back to PostHog session/user data. Which means you can actually easily run A/B and multivariate tests on things like prompts, models, and so on, while ALSO seeing how the LLM performance/quality have an impact on conversion and funnel.
>
> You may already have something like that in place but thought it was worth mentioning!

### Steady drumbeat of usage-specific tips

For customers who rarely reply, keep sending value anyway. Session replays will tell you whether your advice is landing — quiet customers often act on tips without ever responding (credit to Anna-Marie, who used this pattern on a customer that hadn't replied in months; replays showed they were quietly acting on every tip and eventually adopted multiple new features).

**Suggested cadence:** Every 1-2 weeks. Rotate value types so it doesn't feel like a stream of asks.

**Value types to rotate through:**

- Cost optimization — e.g. *"you have a couple of flags tied to completed experiments still enabled"*
- Alerts or monitoring opportunities you spot in their data
- Data quality observations — e.g. *"your group analytics has many groups being created with a UUID as the group key"*
- Workflow templates based on insights or dashboards they've drafted but not saved
- Heads-ups on upcoming products in their space — especially competitive ones — so they don't get blindsided
- New beta features that tie back to what they're already doing
- OOO heads-ups with a fallback contact

**Suggested wording (transparency about a competing product launch):**

> Hey @[contact], :wave: just wanted to give you a heads-up and be super transparent: as you might already know our engineers have been working on [new product]. I've just heard that the ballpark timeline is ~end of [month] for going into beta. I know this might be a sore point given your space, and didn't want you to feel blindsided.
>
> I'd love to address any questions or concerns you may have, and as always — make sure that you continue getting value from our product analytics, feature flags and experiments you've been running.
>
> Wanted to be upfront here! :pray:

**Source:** [Slack discussion](https://posthog.slack.com/archives/C093XHYMGBE/p1777971362108529?thread_ts=1777971362.108529&cid=C093XHYMGBE)

### Send a lightweight survey

A short in-app or emailed survey is cheap, scales across your whole book, and doesn't ask anyone for a call ([example](https://us.posthog.com/project/2/surveys/019fb442-ff15-0000-fdb3-360d82cb621c), credit to Luke). It's good for gathering the basics: how they're using PostHog, whether they're happy, what they need help with, and how they'd prefer to hear from you. The answers then give you a specific reason for the follow-up.

### Post-event outbound to long-silent customers

After events (Stripe Sessions, conferences, meetups), sweep through post-event outbound — including customers who already have a CSM/TAM relationship that's gone cold (credit to Lorena). Event context resets the conversation: it's not "checking in," it's "I just saw you at X." A different sender or different framing can revive a stalled thread that relationship-based follow-ups couldn't.

**Suggested cadence:** After every event your customers attended, do a post-event outbound sweep — don't filter out accounts with existing relationships.

**Why it works:** Event-tied context lowers the social bar to engage. The customer doesn't have to explain the silence — they just have to reply to "great to see you at X."

**Source:** [Slack discussion](https://posthog.slack.com/archives/C090RCG671C/p1778497201155889?thread_ts=1778497201.155889&cid=C090RCG671C)

### Use a competitor pricing change (or market news) as a value-based reason

When something happens in the wider market that could cost the customer money — e.g. a competitor's pricing change — that's a real reason to reach out. Will used this when LaunchDarkly's pricing changes started getting bad press: tagged specific engineers and offered to do the heavy lifting on a PostHog vs LD comparison.

**Suggested cadence:** Opportunistic — keep an eye on competitor news so you're not the last to know.

**Suggested wording:**

> Hey @engineer1 and @engineer2,
> i know you're using [competitor] for feature flags — we heard at [event] that the [pricing changes]([link]) are causing bill shocks, so if you're doing any sort of internal review, lemme know and i'll do the heavy lifting of the comparison from our side.
> p.s. please lemme know if i should tag anyone specific

**Follow-up pattern that worked:**

- If they engage, drop a deep, honest technical breakdown. Don't oversell — call out gaps in our product where they exist.
- If they push back on a gap, close the loop publicly: *"Let's put a pin in it for now. I'll keep an eye on this from our side, and if we can support [X] cleanly sooner, I'll come back with something then!"*
- Loop in engineering in the customer channel when relevant — turns the conversation into a product input loop and shows the feedback is being taken seriously.

**Source:** [Slack discussion](https://posthog.slack.com/archives/C093XHYMGBE/p1777914846235949?thread_ts=1777914846.235949&cid=C093XHYMGBE)

### More reasons to reach out

- Offer to optimize their usage/reduce their billing - if they are pointlessly tracking a bunch of junk, tell them! Otherwise they'll just find out themselves and churn anyway.
- Subscribe to your customers' newsletters, set up Google Alerts, use their products and follow their X or Reddit communities. This lets you time your outreach for when they've just shipped something - making it about them, not you. For example, if they just launched an AI feature, you can reach out the next day to the PM or engineer and congratulate them whilst they are energized and then connect it to a PostHog product they might not be using yet that helps them make their new product better.
- If they submit a support request, jump in and respond yourself to try and build a relationship.
- Find your customer's GitHub – company open source repos or individual engineers' personal projects. Review any open bugs, issues, etc. and submit a real pull request. Extra points if you fix an open bug on their company repo. The customer will see your name somewhere other than their inbox and engage. For important customers, ask our engineering team for help with more complex fixes.
- Guest-list your customer to a cool event – a PostHog event, industry meetup, hackathon, etc. – where they can meet potential customers, partners, or peers in their space. You're putting them in front of people who can help their business – and that's a reason to talk to you.

## Which channel, and which person

Getting the reason right is only half of it — most failed outreach dies because it went to the wrong place or the wrong person.

- **Use multiple channels.** Email is usually the worst way to reach our ICP. Slack, in-app surveys or even Telegram are all usually better. But try email first anyway.
- **Message people individually, never as a group.** Channel-wide pings get ignored; named tags lower the social cost of replying. Start with the most active users, then the newest. Invite a redirect when you're not sure who's right: *"lemme know if i should tag anyone specific."*
- **Loom videos** sharing your observations about their usage/account provide a personalized and human touch which can go a long way to building lasting relationships. Ask Simon for an invitation to our company account if you don't have access.
- **LinkedIn.** Adding the contact and sending a very human video or audio message can work really well - even for technical people (use the LinkedIn mobile app).
- **Non-technical people.** Figure out what the non-technical people in their team need and then go out and talk to them - get someone who isn't an engineer to talk to us given engineers don't want to.
- **Escalate to senior stakeholders.** If you can't get hold of anyone, email more senior team members even if they don't use PostHog (credit to Steven). They can help you find the right person.
- **"New users."** If you're not succeeding getting through with your champions, engage with colleagues recently invited into PostHog. Monitor for them via the "new user" segment in Vitally and reach out immediately with an email and Slack invite. New users often accept because they assume the Slack channel is part of their company's PostHog setup. Be helpful, send merch, and when it lands at their office, the rest of the team is much more likely to join the Slack channel.
- **Their language.** If the customer's main language isn't English, that alone can make them hesitant to engage over Slack or email. Try writing your message in their language – but AI translation can read as unnatural depending on the language, so use it with discretion, ideally where you can spot-check the result. Better still, pull in a teammate who speaks the language (credit to Steven) – they don't need to own the account, just to remove the friction. ([Slack discussion](https://posthog.slack.com/archives/C08M011SBCM/p1781285664051099?thread_ts=1781285664.051099&cid=C08M011SBCM))
- **Ask the wider team for help** - we have to get creative here! You'd be surprised how often somebody knows someone...

Ideally you want to get multiple people into a [shared Slack channel](/handbook/growth/sales/new-sales#4-product-evaluation), as we've found this enables the best communication and allows us to provide them with great support. Just adding a bunch people to the Slack channel is also a legit tactic - forgiveness, not permission.

## Crafting the message

Despite the organization using PostHog, they may not recognize you/PostHog, or may not even be the correct person to talk to about PostHog, which means your message needs to be well crafted.

1. Your initial outreach isn't about you, it is about them. Lead with customer-centered comms. Avoid leading with being attached to their account or telling them how you are there to help them. [Tim has some great thoughts on this subject](https://posthog.slack.com/archives/C01MGUHFH6G/p1740674855616549).
2. Open with a specific observation pulled from their actual PostHog usage, and pair it with a direct link to the relevant view in their project so they can act in one click.
3. Avoid fluff. "I'm just reaching out to", "I just wanted to" etc. are empty phrases that take longer to get to the point. Before you hit send, reread and see if there is anything you can cut out.
4. Lead with value within the first sentence. If it takes a paragraph to get there, you won't get responses.
5. Keep it human — lowercase subject lines, minimal formatting, casual hooks. Match their style if their team or brand has a distinct one. Seb reached out to a customer's marketing lead by making a TikTok in the same style the customer's own marketing team uses, explaining session replay.
6. Ask yourself, if I got this email to the sales@ email box, would I engage it? Would I even give it a second look?

Some examples of good emails that have worked:

> Hello [name],
> It looks like your Product Analytics usage has increased over the past month and I wanted to ensure that the increase was expected.
> [Here are some tools you can use](https://posthog.com/docs/product-analytics/cutting-costs) to ensure you are collecting the correct events and getting valuable insights from them. We have a whole host of [tutorials and guides](https://posthog.com/docs/product-analytics/tutorials) to help you get the most out of PostHog.
> If you have any questions, don't hesitate to ask.

> [First],
> Wanted to reach out direct since I noticed the [Company] team ramp up usage in PostHog recently.
> We'll typically reach out to help with optimizing event capture and make recommendations with regards to instrumentation + querying in PostHog.
> Up for a chat? Here's my calendar, feel free to grab a time that works best for you.
> Cheers,

Pattern breakers are worth a test, too — unusual openers, intentional mistakes, personal or pop culture hooks. Empty subject lines can grab attention, but be careful: they lower open rates and are more likely to land you in spam. Don't do clickbaity things or trick people into talking to you - it'll just annoy them. And definitely don't just offer a generic checkin 'to see how things are going'!

## Asking for introductions

If you feel like you have done a good job with a customer, and have genuinely been helpful, it's ok to ask for a favor back. You can be specific and ask for a direct introduction to a person you want to talk to, or try go a bit more broad and ask the person if they know anyone who would benefit from some help with PostHog. Either way, a warm introduction from a colleague is always going to be better than reaching out on your own.

Something like "Hey Leon, our session last week seemed to have landed well. I'm glad you found it useful. I was wondering if you could help me out. Your team is growing really quickly, and there's a bunch of new folks starting to use PostHog. I imagine not all of them are super comfortable with the platform yet and could use a helping hand. Could you introduce me to Simon, Charles and Scott?"

## Just been handed an account?

Sometimes you'll get a customer in your book who was previously working with someone else on the PostHog team. A pre-existing relationship can help, but it's not guaranteed they'll want to talk to you.

We've found a message like this in Slack/email works well after the intro:

> Thanks [PostHog team mate]
> Hey [customer] :blob-wave: Excited to be working with you! As I take over, it would be a big help if we could schedule a quick 15–20 minutes intro call [link to your Calendly]. Just a chance for me to learn more and figure out how I can best support you going forward. Let me know if you'd be open to that.

We've found most people will respond to this.

## When they go quiet

### Put time on the calendar instead of waiting for a reply

Rather than asking for a meeting and waiting, drop one on their calendar a couple of weeks out and give them the option to move or decline (credit to Phil). Worst case they decline, which is still a response.

### Ask directly whether they're churning

Sometimes the best move is candidly asking where things stand. Seb and Jake have both broken through this way after months of silence — an email to the founder saying *"is [company] planning to churn from PostHog? Or is your team primarily self-serve and happy with how things are going?"* got a same-week reply and a warm intro to the actual PostHog owner, who then joined the Slack channel and booked a call. The question is easy to answer, and either answer tells you what to do next. ([Slack discussion](https://posthog.slack.com/archives/C0B020BPP8Q/p1784056518180709))

### Rebuild a dead channel one person at a time

When a customer channel goes completely silent, don't mass-ping — it gets ignored. Instead, DM team members individually over a couple of weeks until you've rebuilt the channel one person at a time, then get them on a call together. Seb used this on a dead channel and eventually got the whole team back on a call.

**Bonus — same-day call follow-up with a custom touch:** A custom-branded merch discount code (set up in the Shopify admin — see the [merch store handbook page](/handbook/company/merch-store)) is a small detail with outsized goodwill impact. Sending it same-day rides the momentum, well before the "proper follow-up."

**Suggested wording (same-day follow-up):**

> hey team! thanks for the productive chat earlier today.
>
> i owe you a proper follow up on everything we discussed, but couldn't wait to share this discount code ([CUSTOM-CODE]) with ya'll so you can get your save posthog t shirt on the (hog)house :hog-party-wave:
>
> lovely meeting you all - excited to keep working together :hog-offers-heart:
> cc @[people who showed interest on the call] - tagging you since you were esp excited about the merch :slightly_smiling_face:

**Source:** [Slack discussion](https://posthog.slack.com/archives/C08M011SBCM/p1779489719678409?thread_ts=1779489719.678409&cid=C08M011SBCM)

### Have you been ghosted?

If you've had a conversation with someone, there was interest on their side and then they suddenly go dark, using the [John Barrows Ghosting Sequence](https://jbarrows.com/) can revivify them.

1. After 2 weeks of valuable follow-up and you've not heard back, reply-all to the latest email thread.
Change the subject to: "Still interested?"

And put in the body:
>`[Name]`
>
>Still looking at options like PostHog to solve `[business problem they previously acknowledged]?`
>
>Let me know either way.

That last line is very important because it gives them a safe option to say "no". About half will respond.
2. If there's no response again after another week, change the subject again to "Did I lose you?"

Leave the body empty. This will pick up about 80% of people who go dark. If not, close out the opportunity 3 days after this final message.

## Rules of thumb

- **Try stuff.** Got a quiet account? Test something unusual on it — there's very little downside, and it's how everything on this page got found.
- **Mix value types, not all asks.** If every message is an ask, you train them to ignore you. Build trust before the ask.
- **Low-pressure framing.** *"thought it was worth mentioning"*, *"lmk if interesting"*, *"if it's a bad fit, I'll say that and leave it there"*, *"you may already have something like that in place"*. Don't push when they push back — close the loop with a clean "let's put a pin in this" so the door stays open.
- **Strike while energy is high.** Same-day follow-ups after calls beat polished follow-ups sent a week later.
- **Timing probably matters.** Nobody's measured this properly, but the consensus is that early in the week and in the morning beats Friday afternoon.

## LinkedIn Sales Nav

To get notified about new hires and other changes to the accounts you manage, you can set up lists of accounts to track in LinkedIn Sales Nav.

1. Search for an account you want and click on their profile.
2. Click the star icon on the left, and then choose a list to add them to.
3. Optional, tailor the notifications you get [in LinkedIn](https://www.linkedin.com/sales/settings/app-notifications)

You will now be notified any time a senior hire joins your account, which will be helpful for tracking folks to reach out to and give advanced signals around potential data science hires.
