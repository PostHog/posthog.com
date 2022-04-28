---
date: 2021-03-23
title: The startup ops toolkit
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: ["charles-cook"]
categories: ["Startups", "Inside PostHog"]
---

Ok, so you’ve read *Zero to One* and *The Hard Thing About Hard Things*, but what are all the boring admin things that are actually going to drain 40% of your time which no one has told you about?

<iframe src="https://giphy.com/embed/j6wvxJLueHV10lATCF" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/usnationalarchives-archivesgif-youinpublicservice-publicservice-j6wvxJLueHV10lATCF">via GIPHY</a></p>

More importantly, what is your ops stack you can use to streamline and automate these?

This article assumes you work at a US company, but most of it applies to any country. I won’t offer multiple options here - these are the tools that we have settled on using at PostHog after a bunch of trial and error (and tedious customer demos). 

By using these, hopefully I can save you a bunch of time and precious $$$ trying to figure out how to put together contracts, pay people on time, manage your money and comply with laws you are only just finding out exist.

## Hiring people

You’re going to be hiring people either as permanent employees or as contractors. You will need the appropriate contract, and a system for automatically paying them.

<iframe src="https://giphy.com/embed/l0G18S6f5RfkI8JNK" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/season-12-the-simpsons-12x14-l0G18S6f5RfkI8JNK">via GIPHY</a></p>

### Permanent employees (US)

Orrick have a <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.orrick.com/en/Total-Access/Tool-Kit/Start-Up-Forms/Employment-and-Consultant">handy free set of templates</a> you can use!

You need both an Offer Letter and a Confidential Information and Invention Assignment Agreement. The CIIAA means that your employees agree that their work is confidential and whatever they build at work is owned by the company. Not having this = major problems in future, especially for fundraising.

Do _not_ pay a lawyer to create contract templates for you - it is a fantastic waste of money better spent when you need them to handle your next funding round.

I like <a target="_blank" rel="noopener noreferrer nofollow" href="https://gusto.com/">Gusto</a> a lot for managing US payroll. They make the process pretty seamless for you and your new hire, offer tantalizing discounts for early stage startups, and integrate things like tax reporting, healthcare benefits and mandatory insurance quite nicely. Their phone support is great, but avoid email or chat. Gusto charge us $39/month plus $6 per employee.

> Time suck alert - you will need to register in the relevant state _before_ you can hire someone and onboard them onto Gusto. Online state registration laws vary and all of their websites are garbage. <a target="_blank" rel="noopener noreferrer nofollow" href="https://agent.middesk.com/">Middesk</a> can handle this for you on a pay as you go basis and will save you 3+ hour each time. If you want to go further, we use their new $2k/quarter unlimited state filing and reporting service which is a huge time saver. You will forget a state's tax filing deadline and get fined - better to outsource the problem. 

### Contractors (Global)

<a target="_blank" rel="noopener noreferrer nofollow" href="https://www.letsdeel.com/">Deel</a> is the way to go. They cover pretty much any country and currency you’ll need, handle all the compliance stuff for you, and generally make the process way more pleasant than it has any right to be. People complain that their support has worsened as they've experienced massive growth, but I still find them very responsive and helpful. It’s one of my favorite ops products. Deel charge $35/month per contractor, and they also handle monthly payroll. 

### Permanent employees (non-US)

Assuming you don't have a legal entity in every country, you'll need to use an Employer of Record service to hire permanent employees internationally. Deel also offer this service - it might _feel_ steep at $599/month per employee, but it's honestly worth it (and they undercut other providers last time I checked). The process is pretty straightforward and self-serve. Couple of things to note:
- EOR means that technically you contract with Deel and then the employee has a contract with Deels employer of record service. 
- Some countries limit how long you can employ someone in this way (e.g. Germany). After that, you may need to set up a legal entity anyway.
- You'll need to pay a deposit up front of the first month's salary.

Again, Deel will handle all things payroll. 

## Managing your money

There are basically two sides to finance - accounting and budgeting. You know this already from YC’s <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.startupschool.org/">Startup School</a>, of course. Managing your money can be very stressful, especially as not having it means that everything else you're trying to do becomes kinda irrelevant...

<iframe src="https://giphy.com/embed/o2xbqBmHbQAbm" width="480" height="269" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/move-donald-trump-o2xbqBmHbQAbm">via GIPHY</a></p>

### Accounting

For your accounting, you'll want to do the bare minimum to be legally compliant and not sued by the IRS; and have financial reports to look at so you can nod and go ‘hm, yes we are still burning money at an alarming rate.’ Unless you are a finance-driven business, the first 2 years are _not_ the time to be optimizing your financial reporting. 

We use <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.tryfondo.com/">Fondo</a> and they are unbelievably good (US only). They become your outsourced finance team, and you submit everything through a shared Slack channel with them or via an online portal, which is remarkably straightforward to use. Fondo will handle your tax returns, annual filing and also send you monthly management reports. They charge on a sliding scale based on your expenses, so I’m not sharing what we pay here for confidentiality reasons.

> Time suck alert - there is no need to do bookkeeping in Xero or QuickBooks yourself - it is not a good use of your time, even if it is slightly cheaper. I know some founders who still do this even after they have hired an ops person. Baffling. 

### Budgeting & Forecasting

Don’t spend _too_ much time making financial forecasts at an early stage - your priority should be to put together something credible to make sure you don’t run out of money in 6 months. For the first 1-2 years, investors need you to have some idea of what's going on financially, but it's a complete waste of time to pretend you have a detailed view of what will happen. However, as you start to approach $1m ARR, you should have a reasonably detailed view of what you want the next 2 years to look like, with something highly speculative 3-5 years out. 

<a target="_blank" rel="noopener noreferrer nofollow" href="http://pry.co/">Pry</a> has been a game-changer for helping us build our forecasts. Yes, we all know you can “just” do it in Excel (which you will want to do if you have a finance background), but a tool like Pry makes it so much easier to build and share your plan. And you can skip the 2 years chained to your desk at Goldman! 

Pry connects seamlessly with your accounting software (Quickbooks, Xero) as well as most banks, and you then just fill out assumptions manually or using simple formulae. It also has neat dashboards for visualizing everything, comparing budget vs. actuals, and scenario modeling. They were acquired by Brex, so I'd expect to see their pricing and branding change a bit. 

Be responsive when it comes to re-forecasting - don't just rigidly stick to an arbitrary annual or quarterly process because it's 'standard practice'. We review budget vs. actuals each monthly, and then reforecast as and when it feels appropriate. 

## Where to put the money

<iframe src="https://giphy.com/embed/3o6ZtpoNGDS4cZ8GWY" width="480" height="338" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/southparkgifs-3o6ZtpoNGDS4cZ8GWY">via GIPHY</a></p>

Put it in <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.brex.com/">Brex</a>, obviously (US only). They also make it incredibly easy to manage virtual credit cards, and their built-in expense management negates the need for something like Expensify. They don’t charge you anything.

In Europe, <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.revolut.com/">Revolut</a> are about the only digital bank that get anywhere near Brex features-wise, although I find their platform a lot more buggy.

> Time suck alert - I know what you're thinking - surely there's somewhere I can put my money to get some interest? The reality is that shopping around furiously to find some paltry 0.75% interest rate is highly unlikely to make any difference to your burn rate, and you're better off (unless you have $20m+) prioritizing having your cash easily accessible vs. trying to optimize for returns. I am not a financial advisor though - you should talk to one if you decide this is important.

## Keeping yourself organized

Now you've organized the two most important things (people, money), it's time to get the rest of your company running smoothly. Defining ops as ‘anything that is not building the product or talking to customers’, here is the list of other things you'll need to think about:

- <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.workable.com/">Workable</a> for **recruitment**. $99 per role per month, pay as you go. Once you're hiring 3+ people a month, consider upgrading your account. 
- <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.hubspot.com/">HubSpot</a> for **sales and CRM**. Various tiers and combos available, starting from free. Free doesn’t mean you should start there though. We like their Marketing Starter and Sales Pro products. 
- <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.charliehr.com/">Charlie</a> for **HR** things like recording salaries, time off, and contact details. $6 per employee per month. Charlie's UI looks janky, but it works. 
- Protecting your **IP** - unless you are doing R&D, you really just need to focus on trade marks. This is a reasonably complicated area I've written a <a target="_blank" rel="noopener noreferrer nofollow" href="https://posthog.com/blog/registering-trademarks">separate guide</a> for. 
- Managing your **cap table** in Excel is very 2011. We use <a target="_blank" rel="noopener noreferrer nofollow" href="https://equity.ltse.com/">LTSE Equity</a> (formerly Captable.io). If you're a startup, they'll usually import your Excel and get you all set up for free. 
- Dealing with **stock options** is one of those slightly manual things you'll still need your lawyers to help you with:
  - Your lawyers will set up your stock option scheme for you, including the agreement templates.
  - Before giving out options, you'll need to do a 409A valuation - these cost ~$1,000 each time, though LTSE Equity will throw in your first one for free when you subscribe. Each valuation lasts 12 months. Bear in mind that signing a term sheet effectively invalidates your current 409a valuation. 
  - Allocate your share options in batches, as you'll need a board consent signed each time. Your lawyers will write this for you. 
  - Once you've received board approval, it's time to send out all the paperwork to your team. You _can_ do this yourself based on your templates, but this is one area where we run it through our lawyers because getting it wrong can be very costly...
  - I guarantee you will now spend 80% of the process chasing your team for their signatures. 
  - Record all the share options you've allocated in LTSE Equity. 
- You will almost certainly need various types of **insurance** - use <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.embroker.com/">Embroker</a> for this. Specifically, you should probably get D&O/Management Liability, Errors & Omissions, and Cyber Liability coverage. Don't double pay and get Workers Comp - this can be done through Gusto. 

For **business planning** (setting OKRs etc.), I’m yet to find a tool that genuinely convinces me of its value over a well-organized Google Sheet. The number one challenge I’ve found is effectively communicating and tracking the output of business planning, and non-ops people _really_ don’t like having to use another platform to track what they’re doing.

> Time suck alert - when you're choosing your first tool, just pick the first one that you find that you like. Don't waste your time trying our 3-4 different tools and comparing them - it _really_ doesn't matter if you go for Greenhouse or Lever over Workable when you are a 20 person company. Save tool optimization for after the Series B. 

## What next?

Congrats, you have hopefully saved a bunch of precious time and mental energy that can now be used on building the product, talking to customers, recruiting and creating (presumably) massive hype in the metaverse.

You should probably document all this stuff in your handbook! Don't have one yet? Feel free to <a target="_blank" rel="noopener noreferrer nofollow" href="https://posthog.com/handbook">copy ours</a>. 

<iframe src="https://giphy.com/embed/26DNdV3b6dqn1jzR6" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/26DNdV3b6dqn1jzR6">via GIPHY</a></p>

> PostHog is an open source analytics platform you can host yourself. We help you build better products faster, without user data ever leaving your infrastructure.

<ArrayCTA />
