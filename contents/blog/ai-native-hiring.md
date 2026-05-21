---
title: Being AI-native matters more than experience
date: 2026-05-19
author:
  - fraser-hopper
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/Blog_Job_Posts_70bb45215b.png
category: Startups
tags:
  - Guides
  - Ops
  - AI
  - Culture
  - Hiring 
---

In Q2 2026, our [Ops & Finance team](/teams/people) caved and said what we'd been thinking for a while: when it comes to hiring, AI-native beats experience.

Not "experienced person who uses AI." Not "senior hire with AI on the JDs as a nice-to-have." AI-native, full stop. Years of experience are now the tiebreaker between two AI-native candidates, not the gate that decides who gets to the table.

At our Q2 planning, we made the decision that every team member needed to be using agents and LLMs to improve their workflows. This is where the AI-native person cooks. 

AI-native sounds lovely, but it's also a buzzword. This post is meant to show you what it means in practice and how we are implementing it into Ops & Finance at PostHog. 

## Is hiring for AI-natives actually any different? 

Standard hiring advice for ops roles is still in the pandemic era. Find people who know what they are doing. Except now, you have to put “comfortable working with AI” in your job descriptions. Why else did we all sign off those huge AI budgets, right? If you're good at your job and you use AI to be more productive, great – you're probably 20% faster than the colleague who doesn't.

Being AI-native isn't just a layer on top of a job. It's a totally different version of it. The AI-native accountant doesn't do accounting + AI. They produce the same work but 5x faster and with way better controls in place. 

We aren't just letting anybody through the door. The person still needs to actually be an `[insert job title]`, they can't just be an AI junkie who fancies being an accounting manager.

## What does this look like in reality

From an Ops perspective, we have three examples:

### 1. Ops manager

A traditional excellent [ops manager](/founders/first-ops-hire) is a hero. They are everywhere. They are the glue. This person is successful because they care, are reliable, and can go really wide on tasks. They think of everything that needs to go on an onboarding checklist, tag the right people, and chase them up continually until it's done. However, things fall through the cracks and they get blocked whilst waiting for others. 

The AI-native ops manager spins up a Slack bot that pushes tasks to owners, nudges them when something's due, and escalates when it's overdue. They build an offer-letter generator for the talent team that hooks into employment contract generation across the 30+ countries PostHog hires in — fully automated, end to end.

Shoutout <TeamMember name="Tara Alcantarilla-Howard" photo /> and <TeamMember name="Carol Donnelly" photo />.

### 2. Talent partner

A traditional talent partner is always on. They're on the frontline internally and externally, managing lots of people, having difficult conversations, and smiling through all of it. They work late doing calls to find the right person, chase feedback from hiring managers, and reply to rejected candidates at 11pm. They often burn out quickly. 

The AI-native talent partner creates a feedback summary generator that takes all the feedback on why we won’t pass somebody, runs it through an agent that knows our tone of voice and delivers solid, friendly and accurate feedback to candidates. They use the Ashby MCP server to pull all the qualitative feedback on our strongest performing hires and run analysis in Claude to show us the trends of people that do great at PostHog. They also run the same analysis on hires that have not worked out and how that matched the feedback from our hiring process.

Did you know that people who talk fast usually really succeed at PostHog? Talk fast, think fast. We found that out from an AI-native talent partner. 

Shoutout <TeamMember name="Rune Povlsen" photo />.

### 3. Finance manager - accounting

On day 30, a traditional [finance manager](/founders/startup-finance-without-finance) has created a nice close checklist, spent 3 days reviewing last month’s financials, and written a management report by hand that needs proof-reading before going out to the company. They spend more time creating financials than helping the business make the content of them better. 

The AI-native finance manager, by day 30, has a recurring close-checklist agent that can read the GL, flag variances over a set amount, and post them direct to Slack. They’ve also got your ERP hooked up to an MCP and has a dope skill that creates the most fire finance update you’ve seen. They’ve also knocked up an accounts receivable agent that is sending personalized emails following up with overdue invoices and tagging the right person when it needs a human. Cash in the bank quicker. 

Shoutout <TeamMember name="Janani K" photo /> and <TeamMember name="Ahmed Amaar" photo />.

## The failure modes of hiring AI-natives

These roles don't create some kind of AI-eutopia, there are still risks which we need to take seriously. 

- When it comes to accounting, you still need qualified accountant signoff, and we still need to pass an audit, so we still rely on years of experience and certain credentials. 

- We also only consider people that also show good judgement when it comes to things like relationships and taste. These things are particularly important at PostHog. 

- There is a risk you fill the team with people who can’t function without the tools at their disposal, this over-reliance on AI is also a failure mode. 

- AI-native and AI-curious are very different. Plenty of people have a Claude subscription and can prompt a chat but don’t understand workflows and artifacts. This differential is important, we’ll talk about how to screen for this below

## How do you actually find people like this

Everybody says they are AI-native so how do you actually find the [cracked people](/founders/cracked-manifesto) amongst the noise. The [PostHog hiring process](/handbook/people/hiring-process) is more or less split in two. We have three interviews that are all about if you can do all of the above in theory. 

We ask questions like: 

- **Walk me a through a workflow you built or replicated**: what does it do? what was the aim for it? how did it improve things (faster, more accurate, less human interaction)? 

- **What’s the best AI workflow you’ve stolen from somebody else?** Nobody actually knows what we are doing but we all steal the cool stuff from each other. 

- **What’s the biggest failed experiment you’ve had with AI?** We assess how much people are pushing themselves. We’ve all failed somewhere, the first board pack my agents created would have had PostHog shutdown.

After these first 3 stages, we do our SuperDay. This shows that the person can do the role in practice. It involves them building something for us during the day. 

We recently hired for a payroll manager and we asked candidates to build a workflow to deliver a flux analysis on payroll runs. The great submissions built a proper workflow that allowed you to input the two Excel files of payroll data and get an output flagging the errors. This could be a Python script or a web app, we just wanted something that produced a repeatable process that a non-payroll expert can use. The weak submissions were screen recordings of someone asking ChatGPT basic questions.

It’s important at this stage to get the details. You want to see the prompts, the skills files, info on the agents. The details here matter. You also want to make sure they can explain this to you via some kind of recording or live in a call. Fluency of tools is also important as we’re not testing on a specific stack. It is a strong signal if the person is using multiple different tools, rather than gating themselves on one, it shows they’ve pushed themselves to learn more.

## What a company of AI-native hires looks like

Conventional wisdom says ops headcount is about 8-10% of a well run company. PostHog currently operates with it at 6% and we don't think we need to grow the team anytime soon. We feel we can do much more with less now.

The practical result: PostHog's hiring plan for the next 2-3 years is smaller than it would have been a year ago. Not because we're growing slower. Because each AI-native hire is cracked enough that we need fewer of them. 

We don't know yet what people will do with the time saved by AI. The optimistic version is the 3 hours a day you save get reinvested into building, learning the fundamentals, and finally writing your own Python scripts. The pessimistic version is Parkinson's law eats it and we all just have more meetings.

We're betting on the optimistic version. The AI-native person has just had an explosion of resourcefulness, and we want a whole company of them.

If that sounds like fun, believe it or not, [we're actually still hiring](/careers).
