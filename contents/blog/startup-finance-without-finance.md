---
date: 2022-11-08
title: "How to run finance at your startup without hiring a finance person"
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories: ["Inside PostHog"]
author: ["charles-cook"]
featuredImage: ../images/blog/posthog-engineering-blog.png
featuredImageType: full
---

This is a comprehensive, step-by-step guide to exactly how to run finance like we do at PostHog - without a dedicated finance person. You should be able to pretty much copy and paste this. If you implement _everything_ below, it should take 1 person a week. 

The aim to to get your financial ops running on autopilot as much as possible, through a combination of useful tools and a sensible, repeatable process. Who knows, maybe you'll actually _look forward_ to digging into your finances on a regular basis, rather than breaking out in a cold sweat every time your investors ask you for an update...

## Who is this for?

Startups who are early stage or have reached product-market fit. If you are smaller than 5 people, I'd just do the accounting bit (so you don't go to prison) and stop there so you can focus on building your product. 

If you are 5-99 people, this guide is for you!

> Looking for a more generalist ops guide instead for things like hiring, payroll, and expense management? Check out our (startup ops toolkit)[https://posthog.com/blog/startup-ops-toolkit] instead. 

## What you'll need

- A person who is responsible for owning this area of your business - probably the ops person or a financially-inclined co-founder
- A bank account
- A (QuickBooks)[https://quickbooks.intuit.com/] account for accounting
- A (Pry)[https://pry.co/] account for financial planning
- Google Sheets

## Contents

- Keeping score
- Predicting the future
- Delaying the inevitable
- Hiring the vampire

> Who to bank with is not covered in this guide, but please pick something startup-appropriate like Brex or Mercury in the US, or Revolut in the UK, and you won't go too far wrong. 

## Keeping score - aka Accounting

Ok, let's start with the good stuff. You need to hire an accountant. Specifically, you need [Fondo](https://www.tryfondo.com/). They will handle:

- _Bookkeeping_ - this means they record all money that goes in and out of your company in QuickBooks and assign it to the right place (e.g. marketing, hosting etc.)
- _Financial reports_ - monthly, quarterly, and annual financial reports. More on these in a minute. 
- _Tax filings_ - there are a myriad of state and federal taxes to pay. You _will_ forget the deadlines. Don't do this yourself - the fines are brutal if you are late. 
- _Tax credits_ - exciting bonus money the government gives back to you if you fill out enough forms. Pay Fondo a commission and they will do it for you - it's basically free money. 

(At this point, you'll probably want to step out of this guide, contact Fondo, and then come back. I'll wait.)

The next step here is to set your accountant up with the necessary access to your QuickBooks account and probably your bank account(s) and things like Stripe. They will tell you what they need. 

**Monthly accounting process**

Once you're all set up, this is how we run our accounting process each month:

1. Around the 20th of the month, we receive a monthly financial report from Fondo with a bit of explanatory blurb. Typically this will include a few questions about where to categorize certain transactions - answer these asap. 
2. _Read the report really carefully._ Is there anything that doesn't make sense? You should be able to explain every big change you see from the previous month. If you can't, log into QuickBooks and look at your (Sales)[https://app.qbo.intuit.com/app/sales] or (Expenses)[https://app.qbo.intuit.com/app/expenses] tab. 
3. Compare how you did against your budget - we'll get to this later. 
4. Share the report with your _entire_ team, and include a bit of commentary. This is a great habit to get into, as it gives transparency and encourages people to ask questions, which keep you honest!

**How to read your financial report**

TBD

**General tips**

- Your accountants are not mind readers - they do not have any context about the things your business is doing, so if there is an unusual transaction they haven't seen before, you'll need to explain to them what it's for. 
- Be super clear with reporting timeline expectations from your accountant and agree these up front. Similarly, when they need stuff from you, ask them for a deadline - some of these are actually real, legal deadlines!
- Ask for quarterly and annual reports to be generated, not just monthly. You'll need these for random things like investor data requests throughout the year. 
- If you are a B2B SaaS company, ask your accountant to put your hosting costs in COGS ('cost of goods sold') not IT expenses. Otherwise it'll look like you have a ridiculous 99% profit margin or something. 
- If you pay a year up front for an annual subscription, make sure your accountants 'amortize' this over the whole year. This means they'll put 1/12 of the annual cost into each month's expenses. They should also do this if a customer pays an annual contract up front - but you'll need to tell them this. 
- You may hear 'accruals' vs. 'cash'-based accounting floating around - this basically means you either record the revenue when you issued the invoice vs. when you actually received the cash in the bank. We use accruals-based accounting, which is usually the sensible choice for B2B SaaS. 

## Predicting the future - aka Financial Planning

- Software that makes this easy, aka Pry
- How we have set up Pry - tips and tricks to make this smooth
- Monthly budget vs. actuals review - how to do a good, simple process here
- Board reporting

> A note on consolidated accounts. Only relevant for folks who have a US top co and foreign parent, which is a large % at YC these days - this is weirdly complicated to figure out but easy to once its done. Using JustConsolidate + Pry. 

## How to upskill yourself 

- [Do this course](https://www.coursera.org/specializations/finance-accounting?)
- Share your monthly accounts internally so people can ask questions
- Ask your accountants questions about literally every single thing you don't understand
- Prioritize clarity and runway management over 'best practice'
- Your investors can help here, especially when it comes to assumptions for your model

## When to hire a finance person

- Write something here. 

<NewsletterForm compact />
