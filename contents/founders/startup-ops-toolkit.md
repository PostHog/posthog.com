---
date: 2023-12-13
title: The ops toolkit for early-stage startups (2024 edition)
author:
  - charles-cook
featuredImage: ../images/blog/posthog-release-notes-blog.png
featuredImageType: full
tags:
  - Founders
  - Ops & finance
crosspost:
  - Blog
---

Ok, so you’ve read *Zero to One* and *The Hard Thing About Hard Things*, but what are all the boring admin things that are actually going to drain 40% of your time which no one has told you about?

More importantly, what is the ops stack you can use to streamline and automate these?

This guide assumes you work at a US company, but most of it applies to any country, and it's split into three sections: 

- [Hiring people](/blog/startup-ops-toolkit#1-hiring-people),
- [Managing your money](/blog/startup-ops-toolkit#2-managing-your-money)
- [Keeping yourself organized](/blog/startup-ops-toolkit#3-keeping-yourself-organized)

I won't offer multiple options here – it's not that kind of guide. Just know that these are the tools we use at PostHog after three years or so of trial and error, and more than a few tedious customer demos. Based on my experience at PostHog and other startups, these tools should serve you from making your first hire through to 100 people – it's surprising how little you need to change things up here. 

So, read on if you want to learn how to put together contracts, pay people on time, manage your money and comply with laws you are only just finding out exist.

> [Charles Cook](/community/profiles/254) is VP Marketing & Ops at PostHog, leading operations, marketing, people, finance, and legal. All the fun stuff, basically. As PostHog's first non-product hire, he used these tools to do the work of 5ish people for a long time. 

## 1. Hiring people

You’re going to be hiring people either as permanent employees or as contractors. You will need the appropriate contract, and a system for automatically paying them.

### Permanent employees (US)

You need both an Offer Letter and a Confidential Information and Invention Assignment Agreement. The CIIAA means that your employees agree that their work is confidential and whatever they build at work is owned by the company. Not having this = major problems in future, especially for fundraising.

Do _not_ pay a lawyer to create contract templates for you – it is a fantastic waste of money better spent when you need them to handle your next funding round. Orrick has a [handy free set of templates](https://www.orrick.com/en/Total-Access/Tool-Kit/Start-Up-Forms/Employment-and-Consultant) you can use!

I like [Gusto](https://gusto.com/) a lot for managing US payroll. It makes the process pretty seamless for you and your new hire, offer tantalizing discounts for early stage startups, and integrate things like tax reporting, healthcare benefits, 401k, and mandatory insurance nicely. The phone support is great, but avoid email or chat. Gusto charges us $40/month plus $6 per employee for the basic plan.

> **Time suck alert:** You will need to register in the relevant state _before_ you can hire someone and onboard them onto Gusto. Online state registration laws vary and all of their websites are garbage. [Middesk](https://agent.middesk.com/) can handle this for you on a pay as you go basis and will save you 3+ hours each time.

### Contractors (Global)

[Deel](https://www.letsdeel.com/) is the way to go. It covers pretty much any country and currency you’ll need, handles all the compliance stuff for you, and generally make the process way more pleasant than it has any right to be. People complain that the support has worsened as it's experienced massive growth, but I still find them very responsive and helpful. It’s one of my favorite ops products. Deel charges $49/month per contractor, and it also handles monthly payroll. 

### Permanent employees (non-US)

Assuming you don't have a legal entity in every country, you'll need to use an Employer of Record (EOR) service to hire permanent employees internationally. Deel also offers this service – it might _feel_ steep at ~$599/month per employee (depending on country), but it's honestly worth it and it undercuts other providers last time I checked. 

The process is pretty straightforward and self-serve, but here are a few things to note:
- EOR means that technically you contract with Deel and then the employee has a contract with Deel's employer of record service. 
- Some countries limit how long you can employ someone in this way (e.g. Germany). After that, you may need to set up a legal entity anyway.
- You'll need to pay a deposit up front of the first month's salary.

Again, Deel will handle all things payroll. We don't use Deel for US payroll (yet) because it's very new and Gusto is cheap. We might in 2025. 

> Don't forget that hiring someone doesn't just mean paying their salaries - you need to add things like social security payments, pension contributions etc. on top of that! This varies by country, but as a rough guide you should add ~15% to someone's salary to get their 'fully loaded' cost. 

## 2. Managing your money

There are basically two sides to finance – accounting and budgeting. You know this already from YC’s [Startup School](https://www.startupschool.org/), of course. Managing your money can be very stressful, especially as not having it means that everything else you're trying to do becomes kinda irrelevant...

### Accounting

For your accounting, you'll want to do the bare minimum to be legally compliant and not sued by the IRS; and have financial reports to look at so you can nod and go "hmm, yes we are still burning money at an alarming rate." Unless you are a finance-driven business, the first 2 years are _not_ the time to be optimizing your financial reporting. 

We use [Fondo](https://www.tryfondo.com/) (US only) and they are unbelievably good. Fondo become your outsourced finance team, and you submit everything through a shared Slack channel with them or via an online portal, which is remarkably straightforward to use. Fondo will handle your tax returns, annual filing and also send you monthly management reports. They charge on a sliding scale based on your expenses. 

> **Time suck alert:** There is no need to do bookkeeping in Xero or QuickBooks yourself – it is not a good use of your time, even if it is slightly cheaper. I know of founders who still do this even after they have hired an ops person. Baffling. 

### Budgeting & Forecasting

Don’t spend _too_ much time making financial forecasts at an early stage – your priority should be to put together something credible to make sure you don’t run out of money in 6 months. For the first 1-2 years, investors need you to have some idea of what's going on financially, but it's a complete waste of time to pretend you have a detailed view of what will happen. However, as you start to approach $1m ARR, you should have a reasonably detailed view of what you want the next 2 years to look like, with something wildly speculative 3 years out.

[Pry](http://pry.co/) (now part of Brex) has been a game-changer for helping us build our forecasts. Yes, we all know you can “just” do it in Excel (which you will want to do if you have a finance background), but a tool like Pry makes it so much easier to build and share your plan with non-finance people. And you can skip the 2 years chained to your desk at Goldman Sachs! You can start with their cheapest plan at $45/mo. 

Pry connects with your accounting software (Quickbooks, Xero) as well as most banks, and you then just fill out assumptions manually or using simple formulae. It also has neat dashboards for visualizing everything, comparing budget vs. actuals, and scenario modeling. I love Pry so much that I actually [wrote a guide](/founders/startup-finance-without-finance) about how we use it to run finance at PostHog – without a finance person. 

Be responsive when it comes to re-forecasting – don't just rigidly stick to an arbitrary annual or quarterly process because it's 'standard practice'. We review budget vs. actuals monthly, and then reforecast as and when it feels appropriate. 

### Where to put the money

Put it in [Brex](https://www.brex.com) (US only). Brex also makes it incredibly easy to manage virtual credit cards, and the built-in expense management negates the need for something like Expensify. It doesn’t charge you anything. They make distributing your cash between a current account and MMFs (basically low-risk interest bearing funds) very easy too.

In Europe, [Revolut](https://www.revolut.com/) is about the only digital bank that gets anywhere near Brex features-wise, although I find its platform a lot buggier. We're basically waiting for Brex to launch in Europe so we can shut down our Revolut account as they're not actually a real bank in the UK (so no deposit protection). 

> **Addendum:** You might want a backup account in case Brex goes down, à la Silicon Valley Bank. In the beginning, Brex _should_ be fine as your deposit is insured up to $6m. Beyond that, you may want an account with a more boring bank as backup. Bear in mind that the onboarding process will be totally horrific, consisting of 70-page forms and onboarding calls. We actually tried this with JP Morgan Chase and then reverted back to [Mercury](https://mercury.com/) because the experience was so bad. 

## 3. Keeping yourself organized

Now you've organized the two most important things (people, money), it's time to get the rest of your company running smoothly. Defining ops as ‘anything that is not building the product or talking to customers’, here is the list of other things you'll need to think about:

- [Workable](https://www.workable.com/) for **recruitment**. $149 per month, includes 2 roles. Once you're hiring 3+ people a month, consider upgrading your account or moving to something like Ashby. But Workable is great to start quickly with and served us well for quite a while. 
 
- [HubSpot](https://www.hubspot.com/) for **sales and CRM**. Various tiers and combos available, starting from free. Free doesn’t mean you should start there, though. We like its Marketing Starter and Sales Pro products.
 
- [Deel](https://www.deel.com/) for **HR** things like recording salaries, time off, and contact details. Free. We put everyone's details in their HR bit (called Deel Engage), irrespective of where they live. This is our system of record for all team details. 
 
- Protecting your **IP** - unless you are doing R&D, you really just need to focus on trade marks. This is a reasonably complicated area I've written a [separate guide](https://posthog.com/blog/registering-trademarks) for.
 
- Managing your **cap table** in Excel is very 2011. We use [LTSE Equity](https://equity.ltse.com/). If you're a startup, they'll usually import your Excel and get you all set up for free. You can also do your 409a valuations through them. 

- You will almost certainly need various types of **insurance** – use [Embroker](https://www.embroker.com/) for this. Specifically, you should probably get D&O/Management Liability, Errors & Omissions, and Cyber Liability coverage. Don't double pay and get Workers Comp for the US here – this can be done through Gusto. 

For **business planning** (setting objectives etc.), I’m yet to find a tool that genuinely convinces me of its value over a well-organized Google Sheet. The number one challenge I’ve found is effectively communicating and tracking the output of business planning, and non-ops people _really_ don’t like having to use another platform to track what they’re doing.

### Dealing with stock options

Annoyingly, dealing with stock options is one of those slightly manual things you'll still need lawyers to help you with:
- Your lawyers will set up your stock option scheme for you, including the agreement templates.

- Before giving out options, you'll need to do a 409A valuation – these cost ~$1,000 each time, though LTSE Equity will throw in your first one for free when you subscribe. Each valuation lasts 12 months. Bear in mind that signing a term sheet effectively invalidates your current 409a valuation.
 
- Allocate your share options in batches, as you'll need a board consent signed each time. Your lawyers will write this for you. 

- Once you've received board approval, it's time to send out all the paperwork to your team. You _can_ do this yourself based on your templates, but this is one area where we run it through our lawyers because getting it wrong can be very costly... Get them to set it up in LTSE Equity and then send out the paperwork from there. 

- I guarantee you will now spend 80% of the process chasing your team for their signatures. 

## What next?

Congrats, you have hopefully saved a bunch of precious time and mental energy that can now be used on building the product, talking to customers, recruiting and creating (presumably) massive hype in the AI chatbot space.

- You should probably document all this stuff in your handbook! Don't have one yet? Feel free to [copy ours](/handbook).
- We've written a step-by-step [guide to startup finance](/founders/startup-finance-without-finance  in detail – without hiring a finance person. 
- At some point you'll want to [make your first ops hire](/founders/first-ops-hire).
