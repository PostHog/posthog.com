---
date: 2022-11-18
title: How to run finance at your startup without hiring a finance person
author:
  - charles-cook
featuredImage: ../images/blog/equity.png
featuredImageType: full
tags:
  - Founders
  - Finance & ops
  - Being a founder
---

We run finance at PostHog without a dedicated finance person. This is a comprehensive, step-by-step guide to do just that. If you implement _everything_ below, it should take one person a week to complete. 

The aim? To get your financial ops running on autopilot as much as possible, through a combination of useful tools and a sensible, repeatable process. 

Who knows, maybe you'll actually _look forward_ to digging into your finances on a regular basis, rather than breaking out in a cold sweat every time your investors ask you for an update?

## Who is this for?

Startups with 5 to 100 employees who are early stage or have reached [product-market fit](/blog/how-to-product-market-fit). 

If you are fewer than five people, I'd suggest just doing the accounting bit (so you don't go to jail) and stop there so you can focus on building your product. 

> Looking for a more generalist ops guide instead for things like hiring, payroll, and expense management? Check out our [startup ops toolkit](https://posthog.com/blog/startup-ops-toolkit) instead. 

## What you'll need

- A bank account
- Google Sheets
- A [Pry](https://pry.co/) account for financial planning
- A [QuickBooks](https://quickbooks.intuit.com/) account for accounting
- A person who is responsible for owning this area of your business – probably the ops person or a financially-inclined co-founder.

> Who to bank with is not covered in this guide, but please pick something startup-appropriate like Brex or Mercury in the US, or Revolut in Europe.

## Keeping score (aka Accounting)

<iframe src="https://giphy.com/embed/26nfp8HGGHLPGY2KQ" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

Ok, let's start with the good stuff. You need to hire an accountant. Specifically, you need [Fondo](https://www.tryfondo.com/). They will handle:

- **Bookkeeping:** This means they record all money that goes in and out of your company in QuickBooks and assign it to the right place, such as marketing, hosting etc.

- **Financial reports:** Monthly, quarterly, and annual financial reports. More on these in a minute. 

- **Tax filing:** There are a myriad of state and federal taxes to pay. You _will_ forget the deadlines. Don't do this yourself because the fines are brutal if you are late.
 
- **Tax credits:** Exciting bonus money the government gives back to you if you fill out enough forms. Pay Fondo a commission and they will do it for you – it's basically free money. 

(At this point, you'll probably want to step out of this guide, contact Fondo, and then come back. I'll wait.)

The next step here is to set your accountant up with the necessary access to your QuickBooks account, probably your bank account(s), and things like Stripe. They will tell you what they need. 

### Monthly accounting process

Once you're all set up, this is how we run our accounting process each month:

1. Around the 20th of the month, we receive a monthly financial report from Fondo with a bit of explanatory blurb. Typically this will include a few questions about where to categorize certain transactions – answer these asap.
 
2. We read the report carefully. Is there anything that doesn't make sense? You should be able to explain every big change you see from the previous month. If you can't, log into QuickBooks and look at your [Sales](https://app.qbo.intuit.com/app/sales) or [Expenses](https://app.qbo.intuit.com/app/expenses) tabs.
 
3. If there are any changes needed, ask Fondo to make them – we usually have at least a couple each month.
 
4. Compare how you did against your budget – we'll get to this later. 

5. Share the report with your _entire_ team, and include a bit of commentary. This is a great habit to get into, as it gives transparency and encourages people to ask questions, which keeps you honest!

### How to read your financial report

Your report (sometimes referred to as 'management accounts') will comprise three parts. Rather than listing out what every line item means, I'm just going to include particularly important or non-obvious things you should look out for:

#### Profit and loss (aka 'income statement')

- Revenue looks obvious, but make sure you only talk about 'real' revenue from sales, and not things like bank account interest or merch. 

- Cost of Goods Sold is also called COGS. This is where your hosting costs should go if you are a SaaS business.

- When people say 'startups aren't profitable', they are talking about 'Net profit' (sometimes called 'Net income'), not 'Gross profit'. If you see a positive 'Gross profit' number, that is normal – do not get excited!

- You should spend 80% of your effort here making sure you understand your expenses.

- Startups and VCs are obsessed with talking about 'EBITDA' and 'your path to EBITDA-positive'. 'Net operating income' or 'Operating income' is a good enough proxy for this. Don't worry about calculating it. 

#### Balance sheet

- For an early-stage startup, this report basically only tells you how much money you have in the bank. You should not be waiting once a month for your accountant to tell you this!

- If you have a foreign subsidiary, you might see an 'intercompany transfer' in there – i.e. money you've sent from your parent to subsidiary company to cover things like payroll. When it comes to tracking performance vs. your budget, this can be messy (see below!).

#### Cash flow statement

- This, again, isn't very interesting for an early-stage startup (unless you are in fintech/hardware)

- The main number that you're interested in here is 'Net cash increase for period' (or similar title) as this is what is also often referred to as 'burn'.

### General tips

- Your accountants are not mind readers – if there is an unusual transaction they haven't seen before, you'll need to explain to them what it's for. 

- Be super clear with reporting timeline expectations from your accountant and agree these up front. Similarly, when they need stuff from you, ask them for a deadline – some of these are actually real, legal deadlines!

- Ask for quarterly and annual reports to be generated, not just monthly. You'll need these for random things like investor data requests throughout the year. 

- If you are a B2B SaaS company, ask your accountant to put your hosting costs in COGS ('cost of goods sold') not IT expenses. Otherwise it'll look like you have a ridiculous 99% profit margin or something.
 
- If you pay a year up front for an annual subscription, make sure your accountants 'amortize' this over the whole year. This means they'll put 1/12 of the annual cost into each month's expenses. They should also do this if a customer pays an annual contract up front, but you'll need to tell them this because... not mind readers, remember?
 
- You may hear 'accruals' vs. 'cash'-based accounting floating around. 'Accruals' means you record the revenue when you issued the invoice; 'cash' means you record it when the money hits your bank account. We use accruals-based accounting, which is usually the sensible choice for B2B SaaS. 

## Predicting the future (aka Financial Planning)

<iframe src="https://giphy.com/embed/Dps6uX4XPOKeA" width="480" height="366" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

I lied when I said accounting was the good stuff: _this_ is the good stuff. Let's get our Wall Street on. 

Go to your account in [Pry](https://pry.co/) and connect Pry to your QuickBooks account, which should be straightforward. You can also connect your bank accounts directly if you want to – I like this because it means that Pry always has the latest bank account balances in one place, which is easier than logging into each one and adding up the total. 

Once you've got your historical accounts (aka 'actuals') showing in Pry, it's time to build our financial plan. We're going to do three things:

- A simple **revenue forecast** – we'll use Google Sheets then connect this to Pry
- A simple **expense forecast** – we'll use Google Sheets then connect this to Pry
- A **hiring plan** – in Pry itself

Before you start, [make a copy of this handy template](https://docs.google.com/spreadsheets/d/1ft0rTdvGHvSD4EOOl-bhNiQLtFdWdyLwrEnvLFq5Wxc/edit?usp=sharing) – this is an adapted version of the actual sheet we use at PostHog. 

> Do you have a US parent company and a foreign subsidiary? We do! This complicates things quite a bit as you need _two_ companies set up in QuickBooks, but you can only hook up one company to Pry to compare budget vs. actuals. The solution is to set up an account with [JustConsolidate](https://www.justconsolidate.com/), which will combine your accounts into one _new_ company in QuickBooks. Then you can hook up that company to Pry. Not a perfect solution, as you'll only be able to see balances in Pry, but I'd strongly recommend doing this instead of just hooking up your US company to Pry. Get your accountant to set up JustConsolidate for you, as they'll get it right (for a one-off fee).

#### Revenue forecast

You'll see the 'Revenue' tab is filled with dummy data. Feel free to adapt this as you need for your business – you might just need one line at this stage!

(I prefer to model this stuff in Sheets, as Pry's 'Models' functionality is much slower and less intuitive.)

Feel free to extend the model as far out as you like – at PostHog, we don't go further than three years out, and really it's only the next 12-24 months we really care about trying to get right.

Finally, click Data -> Named Ranges and then select the cells where your total MRR is displayed (in the template, that's cells B19 to AE19). Call it something sensible like 'Total MRR'.  

Once you're done, this is how to get it into Pry: 

- Go to Models -> Revenue

- Next to 'Inputs', hit '+' and select the 'Import' option

- The first time you do this, you'll need to click 'Connect New Account' to give Pry access to your Google account

- Then select the relevant spreadsheet you want to import

- You'll want to import the MRR 'Range' you previously created - just pull in the 'Total MRR' line

- This should now show up in your model Input on the left hand side

- Create a new formula, call it something like 'MRR' and set it to just be equal to the Total MRR input

- In the right hand pane, create a new Output, select your new formula from the drop down menu and map it to 'Income' or 'Revenue'

Phew! If you make changes to your Google Sheet in the future, remember to come back to this Model page and click the refresh button in the top left to make sure Pry is pulling your very latest data. Don't worry – Google Sheets will automatically update your Named Ranges as well if you add any new rows, so it won't break your Pry model. 

If this has worked, you should see all the revenue being projected forward in your main Financials tab in Pry. 

#### Expenses forecast

Shockingly, you'll find this under the Expenses tab in the sheet. COGS, aka hosting costs if you're SaaS, is the most important thing here. Other expenses outside of employees aren't going to change your runway very much. 

It is _not_ worth getting super detailed mapping out every single expense on this tab. 

Finally, click Data -> Named Ranges and then create a named range for _each_ of your expense line items. Again, call them something sensible so you can find them in Pry easily. 

Once you're done, this is how to get it into Pry: 

- Go to Models -> Expense

- Next to 'Inputs', hit '+' and select the 'Import' option

- Select the same Google Sheet again

- Import each 'Range' you created in your Google Sheet

- These should now show up in your model Input on the left hand side

- Create a new formula for each range, and set each value to just be equal to the input you've imported (ie. create a formula called 'IT Expense' = 'IT Expense import')

- In the right hand pane, create a new Output for each line item – map each formula output to the relevant item in your budget

Pheww! Again, make sure you refresh the inputs on this Model page if you make changes to your Google Sheet in the future.

If this has worked, you should see all the expenses being projected forward in your main Financials tab in Pry as well.

> A note on scenarios: these are a really important part of our financial planning process, and are easy to build in Pry. In particular, we regularly check our '[default alive](http://www.paulgraham.com/aord.html)' scenario to ensure we're on track. I'll cover this topic in a future post. 

#### Hiring plan

Finally, head over to Pry's 'Hiring Plan' tab. This section is pretty straightforward – fill in your current team, plus projected future hires. In theory you could do this in Sheets as well and import again, but I like the fine-grained control in Pry. Plus under the Settings cog, you can do things like add a % for additional tax etc. so you get the fully loaded team member cost, and model future pay rises in. 

You should now have a nice financial plan set up in Pry. I'm not going to cover everything that Pry does in this guide, so I'd recommend you check out [their docs](https://pry.co/docs/introduction) instead. 

### Budget vs. actuals

Once a month, after we've received our monthly financial report from Fondo (remember that?), we review how we performed against our budget in Pry. You can also reallocate revenue and expenses to different categories in Pry by simply dragging and dropping, but be aware that this doesn't change anything in QuickBooks. 

Our process is pleasingly simple:

1. Open up your main Financials view in Pry

2. On the left, select the Planned vs. Actuals tab

3. Next to the name of the month you want to look at, hover over and a little arrow will appear saying 'Set Budget Start Date' – click on it

4. This will then bring up a two column view of the month you are looking at

5. We look at how we performed against our cashflow forecast (seriously, it's basically the only thing we care about)

6. We then scroll through our plan and pay particular attention to anything that looks like it's gone unusually over or under budget – if anything is in the wrong category, you can just drag and drop it into the correct one

We schedule this budget review meeting in for the last week of the month, i.e. after we've received the final financial report from Fondo. This ensures that the latest actuals are reflected in Pry. 

If we find anything particularly unusual, we'll follow up with the relevant team lead to see what's happened. Often, though, you're really going to be looking at one of:

- Marketing spend 
- Hosting costs spiking
- Hiring, either unexpected or more expensive than originally forecast

### General tips

- Be really careful with the slider in your main Financials view in Pry – make sure you're looking at the right actuals before you suddenly panic and think you're running out of money in 2 months!

- Do not have Pry open in two tabs at the same time and make edits in both – it will break. 

- Do not give edit access to your Revenue and Expenses Google Sheet, ever.
 
- Pry's ability to create branches for scenarios and then merge them back into master Git-style is super slick – we use it all the time. 

- Your investors will want to see an ARR overview and P&L summary output in a different output to the one Pry does. I'll cover how we do this in a separate article. 

## Delaying the inevitable (aka Upskilling > Hiring)

<iframe src="https://giphy.com/embed/3ohzAyD4H1klPRUCwU" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

Here are a few tips I've found helpful for upskilling yourself or your team's finance chops – I firmly believe it's really worth understanding these things properly yourself, rather than outsourcing it to a new person. It's a lot to put in the hands of someone you don't know!

- [Do this free course](https://www.coursera.org/specializations/finance-accounting?) – it'll teach you more than you need to know at this stage, but you'll feel more confident you know what you're talking about. And it's cheaper than an MBA!

- Share your monthly accounts internally so people can ask questions. 

- Ask your accountants questions about literally every single thing you don't understand. The more you understand, the easier you're making their lives as well. 

- Prioritize clarity and runway management over 'best practice'. Knowing exactly what is driving your cash burn, and how you can influence it, is way more valuable than learning a bunch of financial jargon and beautifully formatted reports. 

- Lean on your investors for help, _especially_ when it comes to assumptions for your financial model. They have seen dozens of companies like yours, so will be able to tell you if your growth plans are unrealistic, or if a particular metric is looking unusually off. Don't be afraid to ask for help – it shows you're taking this stuff seriously.

So when do you hire this finance person? Broadly speaking, there will be one of two triggers:

- You get to a point where the sheer volume of financial work is enough for your ops person to spend 100% of their time on. This is usually driven by things like international expansion (reporting & tax complexity) or product expansion (different pricing models are hard to forecast).

- You want to go out and fundraise but, no matter how hard you try, you can't put together a coherent financial story about your business.

In either case, I'd recommend you get someone in who has 1-2 years' experience building financial models 24/7 at a top-tier investment bank, but has suddenly seen the light and wants out. Save the CFO hire for pre-IPO, ok?

## Further reading

If you found this useful, we recommend reading our [ops toolkit for early-stage startups](/blog/startup-ops-toolkit) – it'll guide you through setting up similar processes for things like hiring, HR, stock options, and more.

Speaking of hiring, [Creating an employee-friendly startup share option scheme](/blog/equity-share-options-explained) will help you create a share option scheme potential hires will love. 

Once you've hired, read [How to plan a killer company offsite in just 8 weeks](/blog/planning-a-company-offsite) – it's killer.
