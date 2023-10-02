---
date: 2022-05-04
title: The ops toolkit for early-stage startups
author:
  - charles-cook
featuredImage: ../images/blog/posthog-release-notes-blog.png
featuredImageType: full
tags:
  - Founders
  - Ops & finance
---

Ok, so you’ve read *Zero to One* and *The Hard Thing About Hard Things*, but what are all the boring admin things that are actually going to drain 40% of your time which no one has told you about?

More importantly, what is the ops stack you can use to streamline and automate these?

**TL;DR:** It’s [Deel](https://www.letsdeel.com/) + [Gusto](https://gusto.com/) + [Fondo](https://www.tryfondo.com/) + [Pry](https://pry.co/) + [Brex](https://www.brex.com/) + [some free contract templates](https://www.orrick.com/en/Total-Access/Tool-Kit/Start-Up-Forms/Employment-and-Consultant) + [Google Sheets/Docs](https://docs.google.com/) + [Workable](https://www.workable.com/) + [Hubspot](https://www.hubspot.com/) + [CharlieHR](https://www.charliehr.com/). 

This guide assumes you work at a US company, but most of it applies to any country, and it's split into three core sections: [hiring people](/blog/startup-ops-toolkit#1-hiring-people), [managing your money](/blog/startup-ops-toolkit#2-managing-your-money) and [keeping yourself organized](/blog/startup-ops-toolkit#3-keeping-yourself-organized).

I won't offer multiple options here – it's not that kind of guide. Just know that these are the tools we use at PostHog after two years or so of trial and error, and more than a few tedious customer demos.

So, read on if you want to learn how to put together contracts, pay people on time, manage your money and comply with laws you are only just finding out exist.

I recommend you do. Obviously.

> [Charles Cook](/community/profiles/254) is VP, Operations & Marketing at PostHog, leading operations, marketing, people, finance, and legal. All the fun stuff, basically. He also runs our monthly book club, BookHogs.

## 1. Hiring people

You’re going to be hiring people either as permanent employees or as contractors. You will need the appropriate contract, and a system for automatically paying them.

<iframe src="https://giphy.com/embed/l0G18S6f5RfkI8JNK" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

### Permanent employees (US)

You need both an Offer Letter and a Confidential Information and Invention Assignment Agreement. The CIIAA means that your employees agree that their work is confidential and whatever they build at work is owned by the company. Not having this = major problems in future, especially for fundraising.

Do _not_ pay a lawyer to create contract templates for you – it is a fantastic waste of money better spent when you need them to handle your next funding round. Orrick has a [handy free set of templates](https://www.orrick.com/en/Total-Access/Tool-Kit/Start-Up-Forms/Employment-and-Consultant) you can use!

I like [Gusto](https://gusto.com/) a lot for managing US payroll. It makes the process pretty seamless for you and your new hire, offer tantalizing discounts for early stage startups, and integrate things like tax reporting, healthcare benefits and mandatory insurance quite nicely. The phone support is great, but avoid email or chat. Gusto charges us $39/month plus $6 per employee.

> **Time suck alert:** You will need to register in the relevant state _before_ you can hire someone and onboard them onto Gusto. Online state registration laws vary and all of their websites are garbage. [Middesk](https://agent.middesk.com/) can handle this for you on a pay as you go basis and will save you 3+ hours each time. If you want to go further, we use its new $2k/quarter unlimited state filing and reporting service, which is a huge time saver. You will forget a state's tax filing deadline and get fined – better to outsource the problem. 

### Contractors (Global)

[Deel](https://www.letsdeel.com/) is the way to go. It covers pretty much any country and currency you’ll need, handles all the compliance stuff for you, and generally make the process way more pleasant than it has any right to be. People complain that the support has worsened as it's experienced massive growth, but I still find them very responsive and helpful. It’s one of my favorite ops products. Deel charges $35/month per contractor, and it also handles monthly payroll. 

### Permanent employees (non-US)

Assuming you don't have a legal entity in every country, you'll need to use an Employer of Record (EOR) service to hire permanent employees internationally. Deel also offers this service – it might _feel_ steep at $599/month per employee, but it's honestly worth it and it undercuts other providers last time I checked. 

The process is pretty straightforward and self-serve, but here are a few things to note:
- EOR means that technically you contract with Deel and then the employee has a contract with Deel's employer of record service. 
- Some countries limit how long you can employ someone in this way (e.g. Germany). After that, you may need to set up a legal entity anyway.
- You'll need to pay a deposit up front of the first month's salary.

Again, Deel will handle all things payroll.

> PostHog is a comprehensive open-source analytics platform that helps you understand what you're users are really doing. You can self-host it on your own infrastructure, or use our full-managed Cloud service. [Learn more about using PostHog](/product).   

## 2. Managing your money

There are basically two sides to finance – accounting and budgeting. You know this already from YC’s [Startup School](https://www.startupschool.org/), of course. Managing your money can be very stressful, especially as not having it means that everything else you're trying to do becomes kinda irrelevant...

<iframe src="https://giphy.com/embed/o2xbqBmHbQAbm" width="480" height="269" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

### Accounting

For your accounting, you'll want to do the bare minimum to be legally compliant and not sued by the IRS; and have financial reports to look at so you can nod and go "hmm, yes we are still burning money at an alarming rate." Unless you are a finance-driven business, the first 2 years are _not_ the time to be optimizing your financial reporting. 

We use [Fondo](https://www.tryfondo.com/) (US only) and it is unbelievably good . It becomes your outsourced finance team, and you submit everything through a shared Slack channel with them or via an online portal, which is remarkably straightforward to use. Fondo will handle your tax returns, annual filing and also send you monthly management reports. It charges on a sliding scale based on your expenses, so I’m not sharing what we pay here for confidentiality reasons.

> **Time suck alert:** There is no need to do bookkeeping in Xero or QuickBooks yourself – it is not a good use of your time, even if it is slightly cheaper. I know some founders who still do this even after they have hired an ops person. Baffling. 

### Budgeting & Forecasting

Don’t spend _too_ much time making financial forecasts at an early stage – your priority should be to put together something credible to make sure you don’t run out of money in 6 months. For the first 1-2 years, investors need you to have some idea of what's going on financially, but it's a complete waste of time to pretend you have a detailed view of what will happen. However, as you start to approach $1m ARR, you should have a reasonably detailed view of what you want the next 2 years to look like, with something highly speculative 3-5 years out. 

[Pry](http://pry.co/) has been a game-changer for helping us build our forecasts. Yes, we all know you can “just” do it in Excel (which you will want to do if you have a finance background), but a tool like Pry makes it so much easier to build and share your plan. And you can skip the 2 years chained to your desk at Goldman! 

Pry connects seamlessly with your accounting software (Quickbooks, Xero) as well as most banks, and you then just fill out assumptions manually or using simple formulae. It also has neat dashboards for visualizing everything, comparing budget vs. actuals, and scenario modeling. It was recently acquired by Brex, so I'd expect to see its pricing and branding change a bit. 

Be responsive when it comes to re-forecasting – don't just rigidly stick to an arbitrary annual or quarterly process because it's 'standard practice'. We review budget vs. actuals monthly, and then reforecast as and when it feels appropriate. 

### Where to put the money

Put it in [Brex](https://www.brex.com) (US only). Brex also makes it incredibly easy to manage virtual credit cards, and the built-in expense management negates the need for something like Expensify. It doesn’t charge you anything.

In Europe, [Revolut](https://www.revolut.com/) is about the only digital bank that gets anywhere near Brex features-wise, although I find its platform a lot buggier.

> **Time suck alert:** I know what you're thinking – surely there's somewhere I can put my money to get some interest? The reality is that shopping around furiously to find some paltry 0.75% interest rate is highly unlikely to make any difference to your burn rate, and you're better off (unless you have $20m+) prioritizing having your cash easily accessible vs. trying to optimize for returns. I am not a financial advisor though – you should talk to one if you decide this is important.

## 3. Keeping yourself organized

<iframe src="https://giphy.com/embed/xT1XGOGdyDrL2BTfxK" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

Now you've organized the two most important things (people, money), it's time to get the rest of your company running smoothly. Defining ops as ‘anything that is not building the product or talking to customers’, here is the list of other things you'll need to think about:

- [Workable](https://www.workable.com/) for **recruitment**. $99 per role per month, pay as you go. Once you're hiring 3+ people a month, consider upgrading your account.
 
- [HubSpot](https://www.hubspot.com/) for **sales and CRM**. Various tiers and combos available, starting from free. Free doesn’t mean you should start there, though. We like its Marketing Starter and Sales Pro products.
 
- [Charlie](https://www.charliehr.com/) for **HR** things like recording salaries, time off, and contact details. $6 per employee per month. Charlie's UI looks janky, but it works. If you only have US-based employees, Gusto can do this for you too.
 
- Protecting your **IP** - unless you are doing R&D, you really just need to focus on trade marks. This is a reasonably complicated area I've written a [separate guide](https://posthog.com/blog/registering-trademarks) for.
 
- Managing your **cap table** in Excel is very 2011. We use [LTSE Equity](https://equity.ltse.com/) (formerly Captable.io). If you're a startup, they'll usually import your Excel and get you all set up for free.

- You will almost certainly need various types of **insurance** – use [Embroker](https://www.embroker.com/) for this. Specifically, you should probably get D&O/Management Liability, Errors & Omissions, and Cyber Liability coverage. Don't double pay and get Workers Comp – this can be done through Gusto. 

For **business planning** (setting OKRs etc.), I’m yet to find a tool that genuinely convinces me of its value over a well-organized Google Sheet. The number one challenge I’ve found is effectively communicating and tracking the output of business planning, and non-ops people _really_ don’t like having to use another platform to track what they’re doing.

### Dealing with stock options

Annoyingly, dealing with stock options is one of those slightly manual things you'll still need lawyers to help you with:
- Your lawyers will set up your stock option scheme for you, including the agreement templates.

- Before giving out options, you'll need to do a 409A valuation – these cost ~$1,000 each time, though LTSE Equity will throw in your first one for free when you subscribe. Each valuation lasts 12 months. Bear in mind that signing a term sheet effectively invalidates your current 409a valuation.
 
- Allocate your share options in batches, as you'll need a board consent signed each time. Your lawyers will write this for you. 

- Once you've received board approval, it's time to send out all the paperwork to your team. You _can_ do this yourself based on your templates, but this is one area where we run it through our lawyers because getting it wrong can be very costly...

- I guarantee you will now spend 80% of the process chasing your team for their signatures. 

- Record all the share options you've allocated in LTSE Equity. 

> **Time suck alert:** When you're choosing your first tool, just pick the first one that you find that you like. Don't waste your time trying our 3-4 different tools and comparing them – it _really_ doesn't matter if you go for Greenhouse or Lever over Workable when you are a 20 person company. Save tool optimization for after the Series B. 

## What next?

Congrats, you have hopefully saved a bunch of precious time and mental energy that can now be used on building the product, talking to customers, recruiting and creating (presumably) massive hype in the metaverse.

You should probably document all this stuff in your handbook! Don't have one yet? Feel free to [copy ours](https://posthog.com/handbook).

_Enjoyed this? Subscribe to our [newsletter](https://newsletter.posthog.com/subscribe) to hear more from us twice a month!_

