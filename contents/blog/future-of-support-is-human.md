---
title: Stop adding AI between you and your customers
date: 2026-05-25
author:
  - abigail-richardson
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/519290681_b3c074ed_f976_4e91_8c37_498387c9dbe1_a48312c745.png
category: Startups
tags:
  - Guides
  - Support
  - AI
---

"Support is expensive – put a chatbot in front of it." 

You've heard it a thousand times, and for a while it's where the whole industry was heading. It was backwards then, and it gets more backwards by the day. 

Here's the bet I'd make instead: as AI eats the easy parts of support, support should be *more* human and more *technical* than ever – an engineer, not a friendly face on top of the machine. The more your customers live inside AI, the more they'll want a technical human when something breaks.

## The evolution of support, in three eras

1. Then. Customers do all their work as humans. They write code, build charts, dig through data, make decisions. When something breaks, they write to a person, and a person writes back. Support is human-to-human because everything is human-to-human.

2. Now. AI shows up in customer workflows, but humans still do most of the work. Support, meanwhile, sits where it always has: treated as a cost to keep down. AI gives companies a new lever to pull: stick a chatbot in front of the queue, deflect as many tickets as you can, and hire fewer people. AI becomes a wall between the customer and the team.

3. Next – where we're heading. AI does more and more of the customer's actual work. It analyzes the data. It builds the chart. It writes the code. It [tells them what to focus on next](/blog/self-driving-product). The customer's job becomes reviewing AI output, redirecting it, and deciding what to ship.

The industry expectation is that support follows the same curve: more AI work *means* more AI support. 

That's backwards. If your customer spends all day talking to AI, the last thing they want when something goes wrong is to talk to another one. They want a person who can actually understand the problem, fix it, and makes them feel looked after rather than processed.

The deeper customers go into AI, the more problems call for a human on the other end – and a more technical one than support has ever needed.

## Why "AI as blocker" was always a bad idea

As our support team lead, I've been asked plenty of times what I think of putting AI in front of our support queue. I've always said no. Not because AI isn't useful, but because there's a difference between AI as a tool and AI as a gate.

A gate is something you have to get past, and it frustrates customers. Support chatbots only handle the simple stuff – the questions already answered in the docs – so anyone with a harder problem learns to type "agent" or "human" three times to reach actual help. No one is trying to be deliberately frustrating, it's just what happens when a harder problem runs into a wall built for easy ones. 

Most companies don't realize the frustration they're creating. They look at the numbers, see fewer tickets coming in, and read it as a good sign: customers must be doing fine. Companies call it "deflection." Customers call it being ignored.

The result is the same either way: some people get frustrated and give up on raising a ticket at all. They quietly churn, and you've lost them without ever getting the chance to speak.

Why do companies let it get that far? Because of a framing that's been around forever: support is a cost line item, something to minimize, alongside cloud spend and office snacks. Support has nearly always been filed under cost and almost never under revenue – and that's the mistake.

The value support creates is nearly impossible to put on a dashboard. A support engineer who genuinely understands your customer can be the reason someone *doesn't* churn – they can take a customer who decided to leave and turn them around, because for once an interaction made them feel understood. That's revenue. It just never shows up with support's name attached. And it runs the other way too: a bad support experience can undo everything else the company does well – the great product, the smooth onboarding, the clever marketing – because the support conversation is the moment a customer finds out whether you actually care when it counts. You can do a hundred things right and one bad interaction undoes it all.

Done well, support is one of the strongest competitive advantages a company has. It's the part of the experience people actually remember, and often the reason they stay and tell other people to come along. But it only works that way when customers can reach you. No one recommends a company because they have really great AI support.

## What support engineers actually do in an AI-first world

If most of the customer's day is AI, what does their support engineer's day look like? Three things, mostly.

### 1. Explaining why the AI was right

Sometimes the AI gave a perfectly accurate answer and the customer still wrote in, because the answer didn't *click* for them. Different people learn differently. The job here is to understand the answer deeply enough to rebuild it – the analogy they need, the example from their own data, the diagram nobody else would draw for them. The AI was right. The explanation needed a human – a technical one.

### 2. Pointing at AI the customer didn't know they had

A surprising number of tickets are answerable by a tool or skill that already exists and the customer just didn't know was there, or one we've only just shipped – since we're constantly building new tools and skills for features across the platform. "You can ask [PostHog AI](/ai) to do that," "there's already a skill for this," or "you can do this directly in [PostHog Code](/code)" are all perfectly reasonable responses and a useful signal that we need to do better at making those capabilities discoverable. A human does both at once: solves it for the person in front of them, and notices it's a pattern worth fixing.

### 3. Diagnosing where the AI fell down

This is the meatiest of the three, and where I expect most questions will eventually originate. The customer asked AI to do something. AI tried, and it:

- Misread the intent
- Didn't have the right tool
- Pulled from a doc that says the wrong thing
- Gave a plausible-sounding answer that's subtly wrong
- Took the action, but broke something you were hoping it wouldn't
- Ran into a genuine bug in the product itself
- Or it just did something weird

A support engineer has to figure out *which* of those happened, because each one points somewhere different: a better prompt, a new tool, a doc patch, a bug fix, a model issue, or a product gap.

Nobody wants their support engineer to just paste the AI answer back at them. They've already seen that answer. That's why they wrote in. The one thing customers are really after is a real person who understands the problem and cares enough to get it right. Both parts are load-bearing – a technically perfect answer that doesn't land is as useless as a warm one that doesn't actually work.

Notice what none of those three things are: pointing someone at a doc, walking them through a set of steps, or reading from a script. That kind of first-line support is disappearing. AI does it now – either by handing the answer straight to the customer as they work, or by surfacing it for the engineer in seconds. The "here's where that lives in the docs" and "here are the five steps to do this" parts of the job are being automated away from both sides of the support interaction at once.

What's left is the harder part: diagnosis, fixes, and judgment about what actually went wrong and why. So support engineering isn't getting *less* technical as AI gets better – it's getting *more* technical. The bar for a support engineer goes up, not down.

## What we're actually building

So where do we put AI, if not in front of support? Just about everywhere else. We want customers using PostHog AI as much as they like. Increasingly, it's how we expect people to use the product, whether they're asking it questions directly or driving PostHog through the MCP. 

The one place it doesn't belong is between a customer and support. The alternative to a gate isn't no AI – it's optional AI. Let people reach for it when it's the fastest path to an answer, and reach a human the moment they'd prefer one. Same powerful tools, no wall.

The people on our support team are engineers. The job is to understand a problem well enough to fix it yourself, and to be just as good at talking to the human who has it. If a support engineer can create the PR or update the docs, they do – they don't pass that off to an engineering team. That's [the version of support that's worked for us for years](/newsletter/engineers-do-support), and it's the bit I'm least willing to give up.

What's changing is how we *use* AI inside this team. We're moving our support workflow to [PostHog's own support product](/docs/support/start-here), and the value isn't AI-as-frontline – it's AI-as-context.

![Context](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/ticketbigger_a8d15be6e7.png)

Picture the moment a ticket lands. Without help, an engineer has to dig: 

- Who is this person and what org are they in? 
- What did their session look like just before they wrote in? 
- What page were they on when they submitted the ticket? 
- Where were they when the problem actually happened?
- Did they encounter an error? 
- Are they part of an experiment or feature flag rollout we're running?
- What did they already try with PostHog AI before they escalated? 

That's twenty minutes of detective work before the *first* useful sentence gets typed back.

With AI, that context arrives with the ticket. Who they are, what they were doing, the page they were on, the last session replay and [a summary of it](/docs/posthog-ai/session-summaries), the errors thrown, the experiments and flags they're part of, their conversation with PostHog AI captured as [LLM traces in AI observability](/docs/ai-observability/traces), and any relevant [application logs](/logs). AI is *exceptionally* good at this kind of work: gathering, summarizing, surfacing. Then a human reviews it, sanity-checks it, fills in what's missing, and writes a real response.

That's the division of labor I believe in: AI does the context. Humans do the conversation.

And the conversation is the part that matters most. When the detective work is already handled, our engineers get to spend more attention on the person in front of them – being warm, being thoughtful, turning a moment where something broke into one where the customer feels genuinely cared for. That isn't a nice-to-have for us. One of our team values is to *delight users*: not just solve the problem, but leave people feeling helped, valued, and ideally a little surprised by how much we cared.

## What this means for the rest of the industry

If you feel pressure to "AI-ify" the queue, I'd ask: are you adding AI *for the customer*, or are you adding AI *between you and the customer*?

The first one is great. Context engines, search, draft assistance, suggested replies, classification – all good, all making humans faster and better. The second one is the wall, and the wall doesn't age well. As your customers' tolerance for talking to AI all day goes up, their tolerance for being *forced* to talk to AI when they need help goes down.

The future of support, especially for AI-first companies, isn't fewer humans – and it isn't humans kept around to soften the edges of the machine, either. It's *better* humans doing the harder part AI can't touch, with AI handling the boring prep. Those same engineers, freed from the busywork, are also the ones who make you feel like someone's genuinely in your corner. The more of the day your customers spend talking to machines, the more that's worth. That's the bet we're making. So far, our customers seem to agree.
