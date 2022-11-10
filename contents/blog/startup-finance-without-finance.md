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

## Who is this for?

Startups who are early stage or have reached product-market fit. If you are smaller than 5 people, I'd just do the accounting bit (so you don't go to prison) and stop there so you can focus on building your product. 

If you are 5-99 people, this guide is for you!

> Looking for a more generalist ops guide instead for things like hiring, payroll, and expense management? Check out our [startup ops toolkit](https://posthog.com/blog/startup-ops-toolkit) instead. 

## What you'll need

- A person who is responsible for owning this area of your business - probably the ops person or a financially-inclined co-founder
- A bank account
- A [QuickBooks](https://quickbooks.intuit.com/) account for accounting
- A [Pry](https://pry.co/) account for financial planning
- Google Sheets

## Contents

- Keeping score 
- Predicting the future
- Delaying the inevitable

> Who to bank with is not covered in this guide, but please pick something startup-appropriate like Brex or Mercury in the US, or Revolut in the UK, and you won't go too far wrong. 

## Keeping score - aka Accounting

Ok, let's start with the good stuff. You need to hire an accountant. Specifically, you need [Fondo](https://www.tryfondo.com/). They will handle:

- _Bookkeeping_ - this means they record all money that goes in and out of your company in QuickBooks and assign it to the right place, such as marketing, hosting etc.
- _Financial reports_ - monthly, quarterly, and annual financial reports. More on these in a minute. 
- _Tax filings_ - there are a myriad of state and federal taxes to pay. You _will_ forget the deadlines. Don't do this yourself - the fines are brutal if you are late. 
- _Tax credits_ - exciting bonus money the government gives back to you if you fill out enough forms. Pay Fondo a commission and they will do it for you - it's basically free money. 

(At this point, you'll probably want to step out of this guide, contact Fondo, and then come back. I'll wait.)

The next step here is to set your accountant up with the necessary access to your QuickBooks account and probably your bank account(s) and things like Stripe. They will tell you what they need. 

**Monthly accounting process**

Once you're all set up, this is how we run our accounting process each month:

1. Around the 20th of the month, we receive a monthly financial report from Fondo with a bit of explanatory blurb. Typically this will include a few questions about where to categorize certain transactions - answer these asap. 
2. We read the report really carefully. Is there anything that doesn't make sense? You should be able to explain every big change you see from the previous month. If you can't, log into QuickBooks and look at your [Sales](https://app.qbo.intuit.com/app/sales) or [Expenses](https://app.qbo.intuit.com/app/expenses) tab. 
3. If there are any changes needed, ask Fondo to make them - we usually have at least a couple each month. 
4. Compare how you did against your budget - we'll get to this later. 
5. Share the report with your _entire_ team, and include a bit of commentary. This is a great habit to get into, as it gives transparency and encourages people to ask questions, which keep you honest!

### How to read your financial report

You'll sometimes hear these referred to as 'management accounts' by the way - for our purposes here, you can treat them as the same thing. When you get bigger and fancier, you can produce glossy, proper management accounts that include other nice graphs and metrics, but you don't need those yet. 

Your report will comprise three parts - rather than listing out what every line item means, I'm just going to include particularly important or non-obvious things you should look out for:

- **Profit and loss** - also called 'income statement'
  - Revenue looks obvious, but make sure you only talk about 'real' revenue from sales, and not things like bank account interest or merch. 
  - Cost of Goods sold is also called COGS - as mentioned before, this is where your hosting costs should go if you are a SaaS business. 
  - When people say 'startups aren't profitable' they are talking about 'Net profit' (sometimes called 'Net income'), not 'Gross profit'. If you see a positive 'Gross profit' number, that is normal - do not get excited!
  - You should spend 80% of your effort here making sure you understand your Expenses
  - Startups and VCs are obsessed with talking about 'EBITDA' and 'your path to EBITDA-positive'. 'Net operating income' or 'Operating income' is a good enouch proxy for this. Don't worry about calculating it. 
- **Balance sheet**
  - For an early stage startup, this report basically only tells you how much money you have in the bank. You should not be waiting once a month for your accountant to tell you this!
- **Cash flow statement**
  - This again is not very interesting for an early stage startup (unless you are in fintech/hardware)
  - The main number that you're interested in here is 'Net cash increase for period' (or similar title) as this is what is also often referred to as 'burn'.

### General tips

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

## Delaying the inevitable

Here are a few tips I've found helpful for upskilling yourself or your team's finance chops - I firmly believe it's really worth understanding these things properly yourself, rather than outsourcing it to a new person - it's a lot to put in the hands of someone you don't know!

- [Do this free course](https://www.coursera.org/specializations/finance-accounting?) - it'll teach you more than you usefully need to know at this stage, but you'll feel more confident you know what you're talking about. And it's cheaper than an MBA!
- Share your monthly accounts internally so people can ask questions. 
- Ask your accountants questions about literally every single thing you don't understand. The more you understand, the easier you're making their lives as well. 
- Prioritize clarity and runway management over 'best practice'. Knowing exactly what is driving your cash burn, and how you can influence it, is way more valuable than learning a bunch of financial jargon and beautifully formatted reports. 
- Lean on your investors for help, _especially_ when it comes to assumptions for your financial model. They have seen dozens of companies like yours, so will be able to tell you if your growth plans are unrealistic, or if a particular metric is looking unusually off. Don't be afraid to ask for help - it shows you're taking this stuff seriously!

So when do you hire this finance person? Broadly speaking, there will be one of two triggers:

- You get to a point where the sheer volume of financial work is enough for your ops person to spend 100% of their time on. This is usually driven by things like international expansion (reporting & tax complexity) or product expansion (different pricing models are hard to forecast). 
- You want to go out and fundraise but, no matter how hard you try, you can't put together a coherent financial story about your business.

In either case, I'd recommend you get someone in who has 1-2 years' experience building financial models 24/7 at a top-tier investment bank, but has suddently seen the light and wants out. Save the CFO hire for pre-IPO, ok?

<NewsletterForm compact />
