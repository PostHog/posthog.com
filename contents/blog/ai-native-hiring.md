---
title: Being AI-native matters more than being experience
date: 2026-05-19
author:
  - fraser-hopper
showTitle: true
rootPage: /blog
sidebar: Blog
hideAnchor: true
featuredImage: >-
 
featuredImageType: full
category: Startups
tags:
  - Guides
  - Ops
  - AI
  - Culture
  - Hiring 
---

In Q2 2026, we finally caved and admitted what we knew for a while. That AI-native candidate are the preferred candidate when it comes to hiring our Ops & Finance roles. Whilst we’d been very pro AI-native candidates for a long time in both our technical & non-technical roles, we finally hit the point where it’s no longer a toss up between seniority & slope, it was all-in on the AI-pilled hiring plan. 

AI-native sounds lovely, and it also sounds like a buzzword, so this is meant to show you what we mean by AI-native and how I am implementing it into Ops & Finance. We’ll also cover the reality that it’s not perfect. 

## Why have you actually done this? 

Here’s the 411:

1. AI-native means a team member treat agents and LLMs as their default. This is where they cook. 
2. Every role we have in Ops & Finance now has to be using AI and automation in their daily workflows
3. Years of experience do still matter and often correlate to stronger candidates. 
4. Years of experience are now used as a tiebreaker between ai-native candidates rather than a moat
5. The person still needs to actually be an [insert job] they can’t just be an ai junkie who fancies being an accounting manager
6. This isn’t bullet-proof, there are still downsides

## Is hiring for AI-natives actually any different? 

Standard hiring advice for Ops roles is still in the pandemic era. Find people who know what they are doing. Except now, you have to put “comfortable working with AI” on your job descriptions, right? Why else did we all sign off those huge AI budgets, right? If you're good at your job and you use AI to be more productive, great — you're probably 20% faster than the colleague who doesn't.

Being AI-native isn’t just a layer on top of a job. It’s a totally different version of it. The AI-native accountant doesn’t do accounting + ai. They produce the same work but 5x faster and with way better controls in place. 

Hold up, wait a minute. Stop just saying AI and actually tell me what people are doing. 

## What does this look like in reality

Well from an Ops perspective I have three examples:

* Ops Manager
* Talent Sourcer 
* Finance Manager - accounting

### 1. Ops manager

A traditional excellent Ops manager is a hero. They are everywhere, they are the glue. Lots of people don’t know why they are great but they know they are important. This person is successful because they care and they are reliable and they can go really wide on tasks but most of it is manual, they think of everything that needs to go on an onboarding checklist, tags the right people and chases them up continually until it’s done. Everybody loves this person. However, things fall through the cracks and they get blocked whilst waiting for others. 

The ai-native ops manager spins up a slack bot that pushes tasks to owners, nudges them when something's due, and escalates when it's overdue. They build an offer-letter generator for the talent team that hooks into employment contract generation across the 30+ countries posthog hires in — fully automated, end to end.

Shoutout <TeamMember name="Tara Alcantarilla-Howard" photo /> and <TeamMember name="Carol Donnelly" photo />.

### Talent partner

A traditional talent partner is always on. They're at the coalface internally and externally, managing lots of people, having difficult conversations, smiling through all of it. They work late doing calls to find the right person, chase feedback from hiring managers, and reply to rejected candidates at 11pm. They often burn out, quickly. 

The AI-native talent partner creates a feedback summary generator that takes all the feedback on why we won’t pass somebody, runs it through an agent that knows our tone of voice and delivers solid, friendly and accurate feedback to candidates. They build an Ashby MCP to pull all the qualitative feedback on our strongest performing hires and run analysis in Claude to show us the trends of people that do great at PostHog. They also run the same analysis on hires that have not worked out and how that matched the feedback from our hiring process.

Did you know that people who talk fast usually really succeed at PostHog. Talk fast, think fast. We found that out from an AI-native talent partner. 

Shoutout <TeamMember name="Rune Povlsen" photo />.

### 3. Finance manager - accounting

A traditional finance manager on day 30 has created a nice close checklist and has spent 3 days reviewing last month’s financials and written a  management report by hand that needs proof-reading before going out to the company. They spend more time creating financials than helping the business make the content of them better. 

The AI-native finance manager by day 30 has a recurring close-checklist agent that can read the GL, flag variances over a set amount, and post them direct to slack. They’ve also got your ERP hooked up to your MCP and has a dope skill that creates the most fire finance update you’ve seen. They’ve also knocked up an accounts receivable agent that is sending personalised emails following up with overdue invoices andand tagging the right person when it needs a human.. Cash in the bank quicker. 

Shoutout <TeamMember name="Janani K" photo /> and <TeamMember name="Ahmed Amaar" photo />.

## Have you really solved hiring forever, spoiler alert: no

This isn’t some kind of AI-eutopia, there are still risks which we need to take seriously. 

- When it comes to accounting you still need qualified accountant signoff, and we still need to pass an audit, so we still rely on years of experience and certain credentials. 
- We also only consider people that also show good judgement when it comes to things like relationships & taste. These things are particularly important at PostHog. 
- There is a risk you fill the team with people who can’t function without the tools at their disposal, this over-reliance on AI is also a failure mode. 
- AI-native and AI-curious are very different. Plenty of people have a claude subscription and can prompt a chat but don’t understand workflows and artefacts. This differential is important, we’ll talk about how to screen for this below

## How do you actually find people like this

Everybody says they are AI-native these days so how do you actually find the cracked people amongst the noise. The PostHog hiring process is more or less split in two. We have three interviews that are all about if you can do all of the above in theory. 

You’ll want to ask questions like: 

- **Walk me a through a workflow you built or replicated**: what does it do? what was the aim for it? how did it improve things (faster, more accurate, less human interaction)? 

- **What’s the best AI workflow you’ve stolen from somebody else?** (Nobody actually knows what we are doing but we all steal the cool stuff from each other) 

- **What’s the biggest failed experiment you’ve had with AI?** You want to assess how much people are pushing themselves. We’ve all failed somewhere, the first board pack my agents created would have had PostHog shutdown.

After these first 3 stages we do our SuperDay. At this stage we want to see that the person can do the role in practice. Here we want to set a task for them to build something for us during the day. 

We recently hired for a payroll manager and we asked candidates to build a workflow to deliver a flux analysis on payroll runs. The great submissions built a proper workflow that allowed you to input the two excels of payroll data and get an output flagging the errors. This could be a python script, a web app just something that produced a repeatable process that a non-payroll expert can use. The weak submissions were screen recordings of someone asking chatgpt basic questions.

It’s important at this stage to get the details, you want to see the prompts, the skills files, info on the agents. The details here matter, you also want to make sure they can explain this to you via some kind of recording or live in a call. You want to see fluency of tools as well, we’re not testing on a specific stack. It is a strong signal if the person is using multiple different tools, rather than gating themselves on one, it shows they’ve pushed themselves to learn more. 

## Where is this all heading?

The practical result: PostHog's hiring plan for the next 2-3 years is smaller than it would have been a year ago. Not because we're growing slower. Because each ai-native hire is cracked enough that we need fewer of them. What we don't yet know is what people do with the time. The optimistic version is the 3 hours a day you save get reinvested — into building, into learning the fundamentals, into finally writing your own python. the pessimistic version is Parkinson's law eats it and we all just have more meetings.

we're betting on the optimistic version. the ai-native person has just had an explosion of resourcefulness, and we want a whole company of them.

if that sounds like fun, believe it or not, [we're actually still hiring](/careers).


