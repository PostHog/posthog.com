---
title: CSM + TAM rules of engagement
sidebar: Handbook
showTitle: true
---

Some accounts have both a CSM and a TAM. The point is depth: two people sharing the load so each can focus on what they're best at, and the customer gets a better experience than one person stretched across everything.

Both roles have a real relationship with the customer. Both are in the Slack channel. Both know what's happening on the account. The difference is _focus_, not ownership.

The customer should never have to figure out who to contact. They reach out to either person, and PostHog sorts it out internally.

## What each role focuses on

### tl;dr
 - TAM is focused on and leading commercial conversations (product adoption, renewals, expansion, etc...)
 - CSM is focused on and leading technical conversations (efficient implementation, product training, support escalation)
 - TAMs and CSMs should meet regularly (every other week / once a month) to discuss where each person is focused on the account and agree to next steps and have a shared account plan documented
 - These roles are not exclusive. CSM should be able to speak to product adoption, TAMs should be able to speak to efficient implementation


### CSM

- Operational health and [health score](/handbook/cs-and-onboarding/health-tracking) monitoring
- Support escalation and follow-through
- Credit usage optimization
- Onboarding, training, getting new users set up
- Renewal process
- Day-to-day responsiveness
- Health of the technical implementation
- Surface cross-sell signals from product usage and conversations to TAM

### TAM

- Cross-sell strategy and execution
- Credit discount negotiation and deal structuring for new credit purchases, invoicing
- Use case discovery, mapping products to problems
- Renewal process
- Multi-threading into new teams and stakeholders
- Account planning (updated regularly in Vitally)
- Stakeholder management

### Both

- General customer questions (whoever sees it first)
- Implementation reviews
- Retention. TAMs are not off the hook here. Understanding health and usage is a prerequisite for cross-selling, not work that gets delegated.

## What good looks like

- Customer reaches out to either person and gets a fast, informed response. They never think about who to contact.
- Both go deeper on their focus area than either could alone
- Customer knows both people, trusts both, feels like they have a team
- Neither person is surprised by what the other communicated
- Both are visible in Slack, not just when they need something
- Both are aligned on the current state of the customer, risks, opportunities and what their counterpart is working on.
- TAM and CSM alignment on the account happens in public, not DMs

## What bad looks like

- Customer gets told "that's not my area, let me get [other person]"
- Customer only hears from the TAM when PostHog wants to sell something
- Customer gets asked "how are things going?" by both people in the same week
- CSM discusses pricing without knowing the TAM had a deal in play
- TAM sends a cross-sell email without knowing the customer filed 3 support tickets yesterday
- Neither person responds because each assumed the other would
- TAM checks out on health because "the CSM handles that now"
- Customer has to explain the same thing twice

# **How to kick off the CSM + TAM collaboration**

Both of you share the responsibility of making sure the other has enough context to be effective on the account.

## **Create an internal Slack channel**

Create a channel using the naming convention `#customer-[customer_name]-internal`. Invite your counterpart, respective Team Leads and Simon to the channel. If there's an FDE on the account, invite them too.

This channel effectively replaces DMs between TAMs and CSMs related to the account. Your public collaboration here will be a huge service to future teammates who might inherit the account.

## **Get current on the account**

### **If you're joining on and your counterpart has the pre-existing relationship**

Take it upon yourself to gather as much context as you can before jumping in with questions. Share what you find and use any gaps to guide your questions.

As a CSM, treat this like your standard deep dive when [inheriting an account](/handbook/cs-and-onboarding/getting-started-with-customers), but oriented toward where you can create value immediately:

- Are there cost optimizations to surface?
- Opportunities to deepen value on products they're already using heavily?
- Implementation issues?

Cross-reference your findings against recent Slack threads and Vitally notes. You want a reasonably current assessment of the account and its needs that your counterpart can sense-check.

Go as far as recommending an initial action item for yourself based on your research - that's a highly effective way to take mental load off your counterpart. Once you have an initial grasp on the account, send a message in your internal Slack channel with your questions, ideas, and recommended action items if applicable ([example](https://posthog.slack.com/archives/C0B0UD92EG1/p1777424141416129)).

**Your goal**: create value for the account as soon as possible, with the right context, while protecting your counterpart's bandwidth. This is an art, not a science. You're co-piloting a ship on a shared mission, but each of you are still responsible for your own controls.

> *If you're a TAM in this position, the principles are the same: gather context first, share what you find, propose an action item.*
> 

### **If you're the one with the pre-existing relationship**

Proactively share any top-of-mind context in your internal Slack channel as a starting point for your counterpart. If a quick call is needed to convey context that isn't apparent in the paper trail (Slack, Vitally, etc.), do that. 

Your counterpart is already gathering context from what's written, so you don't need to be exhaustive. Focus on:

- Key issues or active threads they must know about
- Important relationships or stakeholders
- Implementations in progress or recently completed

Add your counterpart to the customer's Slack Connect channel. Use your judgement for when to introduce them to the wider customer team, and relay that guidance so you stay aligned on timing.

When you do introduce them, frame it positively - the customer's PostHog team is growing, not that they're being handed off (here’s a solid [example](https://posthog.slack.com/archives/C090RCG671C/p1777565614828089)).

> **The underlying principle:** The goal is to outdo one another in service. Getting current on the account and elevating relevant context makes you both better experts, which directly improves the quality of your customer-facing work.

# **How to divide & conquer without blocking each other**

Make sure you're in lockstep with your counterpart so you can each deepen your impact on different areas of the account. Having two people on the account enables depth *and* breadth when it comes to relationship-building, use case optimization, implementation audits, and so much more. 

But how do you maximize the value of having two PostHog humans on one account? A good starting point is to identify gaps in coverage and every open thread, then prioritize from there.

A non-exhaustive list of questions to explore together to align on starting points: 
- Is the customer struggling with a specific product? <PrivateLink url="https://posthog.slack.com/archives/C0B0K4EACH2/p1787237987414149">(example)</PrivateLink>
- What frustrations have they surfaced recently?   
- What expansion opportunities are there? 
- Is their implementation healthy? Are they due for a health audit? <PrivateLink url="https://posthog.slack.com/archives/C0B0UD92EG1/p1782344320472969">(example)</PrivateLink>
- Any cost optimization opportunities? <PrivateLink url="https://posthog.slack.com/archives/C0BAUUD4R5E/p1783969456929179">(example)</PrivateLink>

Work with your counterpart to prioritize account needs, then explicitly assign each other the dedicated paths to run with. Think of it as delegating tasks that you'd otherwise do yourself if it was only you on the account. Play to your strengths and advantages on the account and give each other work streams where you have the highest likelihood of success. For example, if a TAM has a warm relationship with the champion for a new product expansion, they should continue focusing on that versus handing it off while it's a work in progress. 

**Example scenario where you can both create value in separate product areas at the same time, whilst playing to your unique strengths as a TAM and CSM:**
- Customer is a heavy Experiments user, and they run into a lot of issues because of their sophisticated setup. But they're concentrated on that product, so we're also thinking about expansion opportunities to derisk the account. 
- The CSM could focus on deepening the value the customer gets from Experiments by scheduling 1:1 feedback calls with power users to better understand their pain points and work on fixes.
- The TAM can focus on a net new cross-sell opportunity into AIO with a different set of stakeholders and deepen the value from other products that have been adopted. 
- In this scenario, your parallel efforts unlock goodwill from the customer, bandwidth for the TAM to grow the account, and space for the CSM to go deep on debugging and instrumentation on their existing product adoption. 
- The net effect: customer feels supported on multiple fronts.

By no means is this a hard rule (CSMs focused on instrumentation, TAMs focused on expansion). There will be times where you overlap and switch, and other times where you're more siloed due to the nature of the account. 

You should always ensure you have clarity on your parallel work streams. If you can confidently answer at any time what your counterpart is working on related to the account, then you're doing it right. If not: make time to catch up on a call or async, or share what you're working on in your internal customer channel more frequently! 

The risk we're avoiding is duplicative or irrelevant work. Your time is incredibly valuable, so honor each other's time by communicating clearly and often. 

### Concrete ways to work well together

How can you both be the driver if there are two people in the same car? Put another way, if you're sharing an account with someone, how do you avoid blocking each other whilst working together? 

While this process isn't perfect, here are a few good habits that protect your autonomy and effectiveness:
1. **Post often in the internal channel:** what you're thinking about, who you have a call scheduled with, open questions you have, an opportunity you're chasing down... anything. Write as generously and freely as you would on a private scratchpad - it's the closest thing we have to a shared brain.
2. **Document as much as you can in Customer Analytics:** all of the relevant details, developments, learnings, plans, etc. from your internal threads should have their equivalent version as a Notebook in Customer Analytics. 
3. **Use each other to sense check:** consider having a monthly call where you catch up on all things related to your shared accounts - just talking through what you're thinking about can help reveal parallel work streams. 
4. **Debrief after customer calls:** this is where you'll feel the superpowers that come with a CSM + TAM overlay - give each other feedback, get clear on next steps, and review how the call went. 
5. **Tag team follow ups:** one of you plugs something in the customer channel; the other is aware of this and stands by to chime in with a follow-up to get a response. Works like a charm for unresponsive customers. 
