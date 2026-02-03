---
title: How startup secondaries actually work
date: 2026-02-05
author:
  - charles-cook
showTitle: true
rootpage: /blog
sidebar: Blog
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-engineering-blog.png
featuredImageType: full
category: Startups
tags:
  - Guides
  - Explainers
  - Culture
  - People
---

Secondaries - so hot right now. For those not in the loop, a secondary stock sale or ‘secondary’ is where existing stockholders of a private company sell their stock to someone else. This is great for founders and employees - and early investors! - because they can realize some value in their stock without having to wait for some mythical IPO or (gasp) acquisition to happen. 

We’ve done two rounds of secondary sales at PostHog as part of our Series C and D, and we learned a *lot* of important details about how this stuff actually works. However, nobody is writing about this in any detail. Today I’m sharing those details with you. 

> This guide is mainly written for founders and employees at US-based startups, so I’m going to assume you already understand what things like stocks, options and strike prices are. If you don’t, [this primer may help](/handbook/people/share-options). And it goes without saying, this post is 1000% not legal advice!

## Why should I care?

The age of "get to $100m ARR and IPO at a $5bn valuation" is very much over. The emerging trend is now for the most successful startups to get very large while staying private \- this allows them to keep control and not have to deal with things like public reporting requirements and stock prices. [OpenAI](https://www.cnbc.com/2025/10/02/openai-share-sale-500-billion-valuation.html) and [Stripe](https://www.cnbc.com/2025/02/27/stripes-valuation-climbs-to-91point5-billion-in-secondary-stock-sale-.html) are two well-known examples, but even relatively smaller companies like [Notion](https://www.notion.com/en-gb/blog/gic-sequoia-index-purchase-notion-shares) and [ElevenLabs](https://elevenlabs.io/blog/announcing-an-employee-tender) are doing it. And of course, PostHog. 

As startups stay private for longer, [more investor money](https://www.industryventures.com/insight/2023-2025e-how-big-is-the-secondary-market-for-venture-capital/) is flooding into secondaries - it’s a virtuous cycle. This is great for founders - they can now unlock liquidity for early employees so they don’t have to leave once their options have vested, while not feeling as much short-medium term pressure to realize a traditional exit. Instead, founders can focus on building the largest possible company while maximizing control. 

## How are secondaries priced?

When investors buy stock, most of the time they are buying _preferred_ stock in a primary financing. This means that a new type of stock is being created for that particular round, and they come with extra rights. However, the stock that founders and employees sell in a secondary are _ordinary_ stock, which don’t come with these rights, and are just transferred to the investor - no new stock is created. 

These are the normal ways to deal with this when you do a round of funding:

- Investors buy and hold ordinary stock, paying the preferred price. This is the best move, but you need to be in a strong position with an oversubscribed round to pull this off.   
  - The cleanest way to do this is to have investors who are only buying secondary, rather than splitting primary and secondary across everyone.   

- Investors buy and hold ordinary stock, but at a discount to the preferred price - the market standard is usually 20%.  

- Investors buy ordinary stock at no discount, and that stock then convert to preferred afterwards. This can be a win-win BUT be careful of these gotchas:  
  - Something called [QSBS](https://carta.com/uk/en/learn/startups/tax-planning/qsbs/) comes into play - ask your lawyer. This is a very technical piece of tax law that your investors will really, really care about.   
  - You will increase your pref stack - more investors at the front of the queue to get paid out in a future liquidity event.   
  - If you have an EMI plan in the UK, timing and order here is really important - ask a UK lawyer or you risk tanking your entire EMI scheme. 

> This is all assuming that you are doing primary and secondary financing at the same time - later on I’ll talk about why you might want to split them. 

## How to offer them to employees

This is the fun part. It’s also the bit that caused us the most angst. “Who do we let sell? How much can they sell? How long should they have been here? Do we set a $ cap? Will the team become demotivated if they sell too much? Will they not care if they sell too little?”

The most important thing is to have a basic set of rules you apply, so that you are taking the judgement out of it. These are the rules we settled on - feel free to copy them or modify to create your own:

- Only open to all current employees. This was part admin, part fairness.   
  - On the admin side, you will be chasing your team _a lot_ to let you know what they want to do, sign documents, reply to boring questions about admin etc. This is wayyy easier to do if they still work at the company.   
  - We also wanted to reward people who had stuck around at PostHog, as we’re still a relatively young company.   

- Employees can sell up to 20% of their vested stock.   
  - 20% felt like a reasonable number - enough to make a difference in your life, but not enough to retire.   
  - Vested meant that only folks who had been with us > 1 year could sell stock (because of our 1-year vesting cliff), which again seemed fair. 

If you are the lucky person responsible for running this process internally, some other important things to consider. This is all stuff your lawyers are experts on, so talk to them:

- There is a *huge* difference in the amount of (paper)work when < 10 people sell stock vs > 10. This figure includes your founders, if they are participating.   
  - Fewer than 10 people selling? You can just do this directly through your lawyers, it’s extra paperwork but it’s pretty straightforward. This is what we did the first time.   
  - More than 10 people selling? You are now doing an SEC-regulated tender offer, and will need to use a platform like [Carta](https://carta.com/) to manage the sale. This adds about 4 weeks to the process because you need to have the tender open for a minimum period, and Carta will charge a % of the proceeds as their fee (try to get buyers to pay for this or at least split the cost between buyers and sellers.)  

- There are a few different ways the mechanics of exercising the stock options works.  
  - If your employees hold ISOs, they should exercise the options first themselves, ie. they wire your company money, and then sell. This is better tax-wise for the employee.   
  - If they hold ISOs but can’t afford to exercise, then they should do cashless exercise, where the amount the employee pays to exercise is just deducted from the proceeds you send them, ie. they don’t send any money.   

- We had employees transacting directly with investors in the paperwork - your lawyers will handle all this.   
  - An alternative is to have your company buy all the stock from employees and then transact with investors - again your lawyers will advise mechanically what makes the most sense. 

The bit that no one tells you? Be prepared to spend half your time managing _internal_ comms. Most of your team will have no idea how this stuff works. You will have to answer what you think are extremely basic questions, and have to chase a million times for bank details, addresses, signatures etc. Be patient!

>  If you are letting > 10 people sell, I strongly recommend you keep your primary and secondary financing rounds completely separate. It will slow down and complicate your primary financing round otherwise. 

## Employees, this bit is for you

You may have read all of the above and thought "wow everyone is doing secondaries." The reality is they are still extremely rare, though growing in popularity! However, these are a few things you might want to consider up front:

- *Tax tax tax tax*. If you work somewhere where a secondary is on the horizon, get a tax accountant lined up now. It will be 4x more stressful if you’re trying to do this at the same time as all the other paperwork.   

- In the US and some other countries, early exercise can have tax benefits - google "83(b)" and then _please talk to an accountant._   

- If you work for a US startup but live outside the US, get an account set up that can receive USD like [Wise](https://wise.com/) or similar and then transfer out from there. Do not just have the money wired straight to your local currency account. For our non-US employees, this took 10min and literally saved them $000s. 

Finally, if you are interviewing for jobs and [asking good questions](/founders/what-to-ask-in-interviews), secondary strategy is probably more important than exit strategy in 2026. It is probably more useful to ask about how they think about secondaries and control more generally than "so, when’s that IPO happening?"

## Further reading

- [32 things we’ve learned about building a startup that scales](/newsletter/building-a-startup-that-scales)
- [43 things we've learned about hiring at PostHog](/newsletter/43-lessons-about-hiring-for-startups)
- [Job interview questions engineers should ask (but don't)](/newsletter/job-interview-questions-engineers)

<NewsletterForm />
