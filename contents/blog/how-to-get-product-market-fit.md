---
date: 2023-01-19
title: Complete guide - how to get product market fit
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories: ["CEO diaries", "Inside PostHog", "Startups"]
author: ["james-hawkins"]
featuredImage: ../images/blog/posthog-ceo-diary-blog.png
featuredImageType: full
---

The best analogy I can think of for getting to product market fit is playing a game of [snakes and ladders](https://en.wikipedia.org/wiki/Snakes_and_ladders). You can fail in multiple places and need to drop back a step, or even pivot completely. It's pretty damn unlikely it'll take you in a straight line.

The _only_ objective that matters _before_ you have product market fit, is _getting_ product market fit. Hence this guide.

This guide is based on what we learned at PostHog going first through 5 or 6 pivots, then growing zero to $MM in revenue, and 20K+ customers who are focused on achieving this or scaling afterwards. It also incorporates what we've seen from ~40 [YCombinator](https://ycombinator.com/) startups that we've had calls with to consult them on this topic!

# The Product Market Fit Game

## Level 0 - Choosing a problem to work on

Start by solving a problem you've had yourself. It needs to be a big problem, that you've actually tried to solve too - if it's something you've never attempted to fix, then it isn't a big enough problem.

Some people spend months or years thinking about their idea and make no actual progress as a result. You learn more by trying something out than hypothesizing. If you fail, try something else!

The type of idea you have will greatly influence your life.

If you work on a problem that others tackle, you are likely to find it easier to validate the problem, but your solution must be very different - if you want to build a venture scale business, then your solution must be 10x better or 10x cheaper for significant numbers of people to use or pay for it.

Alternatively, if you work on a problem no one has tackled, then you mus Overall, though, competition will likely have very li

Be especially wary about building what's trendy. Be wary that you'll feel pressure from some VCs to work on the latest technology, and you'll see other companies in the trendiest spaces raising a bunch of money and getting PR. Do not be fooled - neither of these things mean success. This will put you in the "solution finding a problem" category, which doesn't work. Of course, there are exceptions - the flipside is that a fundamental shift in technology may unlock the ability to solve problems that were previously unsolved. However, it means you are a solution looking for a problem, and that hardly ever works. 

Write down every single customer conversation. Be thorough. It's easy to get recency bias or you may want to come back to a detail that didn't seem important at the time. We built a Google Doc over 100 pages long in the first few weeks of doing this.

## Level 1 - Validating the problem and getting users to talk to you

Now that you _think_ there is a problem, you should start seeing if others see the same issue. To get meetings, prioritize:

1. people that you're buddies with "hey Joe, can I ask a favor"
1. people that you have worked with before - similar message to above
1. people that follow you on social media... if you have them!
1. people that have worked at the places you've worked with before "hey I'm also an alum of X"
1. introductions to people that are relevant via your friends or colleagues that already know them
1. people in professional networking groups. You'll need to give/take here. Figure out where these are - sometimes it's Slack, sometimes it's a paid network (like [Pavilion](www.joinpavilion.com)), sometimes it's meetups or forums
1. cold outreach (LinkedIn is probably easiest, if your target audience are there, since you can filter on job title - however, this also means very low response rates since everyone is doing it)

When you're trying to get these calls, there are some important tips:

- be concise. 2-3 lines max. A wall of text is self-interested, and most people won't read it.
- be clear what you want. Do not say you're looking for feedback then in practise use every call as a sales pitch - it's misleading, it means you'll be pitching rather than focussing on blunt feedback, and it's unlikely you'll manage to skip all the way to the sales step in one go. By listening and responding to what you hear well, when - later in the process - you start to pitch, you're far more likely to have success.

Avoid heavily automated outreach like the plague, at this stage. It's a waste of energy. Sure, hustle and send a lot of messages but don't set up dedicated software to mass email thousands of people - if you need to go to extremes to get anyone to talk to you, you're already in a failure mode because it shows you that no one cares.

Consider that you'll get different responsiveness from different groups of users. For example, you may find it impossible to get cold outreach to work for C level executives at a bank. Even if you've something that could help them - they are inundated with sales messages and you're getting lost in the noise. If you think your product is targeted at a particularly competitive group of people to get in front of, cold outreach may more or less stop working entirely. If your product _only_ works for Fortune 500s, I'd question if it's a good idea to build unless you've already got a huge network.

When users talk to you - beware that many will show interest out of politeness, or because they genuinely _could_ see themselves using your product one day. Neither will help you get actual usage. [The Mom Test](https://www.momtestbook.com/) provides plenty more information here if you want to learn more. If the problem is a high priority one to solve, then your potential users will have already gone to considerable lengths to solve it. In the words of Dalton Caldwell, our partner during the batch, "if a company has a crappy self built system that they're reliant on, there's probably a good business to be built providing exactly that product". In the early days of PostHog, we found that teams were building their own analytics infrastructure, instead of using the existing SaaS products, for more control of their data - invariably it was hideously complex to build, and underwhelming.

Try to find as specific a problem as you can. The clearer the problem is, the simpler it'll be for you to validate and solve it.

There's only so much you can validate in this way. You will get the clearest lessons from seeing if people _actually_ use, return to and pay for, your product. Do not lose too much time to validation in advance - this should be a quick, intense period.

At PostHog, we found it helpful to have Tim (my cofounder) coding constantly whilst I spend most of my time getting feedback in the early days. We were willing to throw away all our work. And we did, through five or six pivots. Having one of us constantly building meant we could validate more clearly by seeing if the most excited users would use our products, much more quickly.

If there's an obvious desire from the user to see if you can solve their problem, be ultra-accessible to these early potential users. People's emails are filled with junk, and they feel weirdly formal. Instead, get your customer setup on WhatsApp or in a private Slack channel or Discord as you share your solution with them. This communication will be critical throughout the rest of the levels.

You need to try to get out of this role into level 2 as quickly as possible - validating by seeing if users try to use it, instead of using only the conversations you're having. I'd advocate one cofounder focuses on this, whilst the other is continuously building then throwing things away as needed. To give a real-life example, Tim and I spent about 1 week in level 1 on average.

### Failure modes

Work your way from top to bottom:

* You aren't trying
  * Solution: set a goal for how many meetings you want to get. I tried to get 2 meetings a day. If you live in a tech hub (which I'd encourage in the early days at least), go to all of these in person. Most communication is non verbal, so it'll make it easier to learn what people are thinking.
* You aren't being clear what the problem is
  * Solution: make sure you can describe your product in one, very short sentence. Practise this over and over again. Similarly, a lot of people look at much larger competitors that use confusing enterprise terminology.
* You are talking to the wrong stakeholders
  * Solution: why did you have this problem, but those speaking to you don't?
* The problem you want to solve isn't there
  * Solution: pivot. Find a new problem to solve.

## Level 2 - Getting users to use your product

!> You need to _keep_ talking to users throughout this step for feedback, but now you can validate better since you've some kind of product to show people.

The goal here is to see if people actually care, as quickly as possible. No matter how excited you got after interviewing people about their problems, there's no substitute for seeing what people _do_ instead of what they _say_. With one of the ideas Tim and I worked on before we pivoted to PostHog, we had 15 companies who "wanted to try it". We built a product, sent the invite link to them - and only _one_ even clicked the link and started using it. It's a good thing we hadn't spent 6+ months building the "perfect" product before this happened.

The most obvious users to start with here are those that you've already met during Level 1. During these calls, you should have been identifying a _problem_ that these users have. Now you have a _solution_ you should email them saying so!

## Failure modes

These are all the reasons why users may not be using your product:

* Users have no idea what your solution is, so they think it could be a waste of time.
  * Even if your product is free, people's time is not. The more senior your likely users, the stronger this effect. Can you work with someone that _reports_ to the person you were targeting to get things setup? If you struggle to get responsiveness, start questioning if something else on this causing issues - even a senior stakeholder will put in work to solve a major problem.
  * The way you explain your product matters. If it's complicated, people won't understand it. Describe it like you would when speaking to a friend.
  * Ask users if the above is why they didn't start using it. Demonstrate you are open to direct feedback in your message or on a call.
* Users are sceptical your solution will solve the problem, so there's no point trying.
  * You may lack credibility. This is where design matters. If your website is a mess, your emails and the way you present yourself feel like you don't have it together, then another business won't want to spend time with you. At best, it'll be a waste of time, at worst, your product may be insecure or could cause them issues. Hopefully, during Level 0, you picked this idea because you've encountered it personally. That might mean you're well-qualified to solve it for others. Clarify your credentials, if relevant and impressive, when you interact with them. You are unlikely to get any feedback along these lines - as users probably won't want to tell you this, so they may go silent or - worse - they may give you misleading feedback that it's something else.
  * If, from your website, email or interactions with users, they disagree with your approach - then they're likely not to bother trying it. "Software can't solve a people problem", for example. "AI looks cool but won't work in real-life applications because it's not accurate enough".
* Users cannot access your solution.
  * Here's what happened with the very first PostHog users. Double/triple check it's possible to start using your product.

![a whatsapp screenshot of our first potential user telling us the login page was broken](../images/02/Screenshot-2020-02-25-at-21.52.15.png)

* Users are worried about using your solution.
  * Does your solution require, for example, a lot of personal or private company data to operate? Seek feedback "hey, I saw you've not used it yet - could I get some really blunt feedback. Did something put you off?" Can you reduce how much data you need access to, or can you make your product, website and approach feel more mature to signify competence?
* Users don't want to solve this problem. Many problems aren't high priority.
  * Pivot to a new problem. Back to Level 0.
* Users don't really have the problem you thought they had from your interviews.
  * Pivot to a new problem. Back to Level 0.

## Level 3 - Making sure users are using your product repeatedly

Hooray, so people are showing up. Now you need to see if they're coming back or not. Figure out what your expected frequency is for usage, and check if that's roughly how often users are using your product. Users will return if you can repeatedly solve a problem for them.

!> tools like PostHog will show you exactly _how_ users are using your product in this situation.

Avoid relying on things like reminder emails to log back into your product - if it takes this sort of effort to retain users, then the root cause is that the product isn't valuable, not that you're not reminding people to use it.

Once you've got some usage happening, measure which features are being used the most. You should also watch users using your product. This is another place we can help you through session recordings - is it what you expect? If you can see users getting confused as they do this.

Start "closing the loop" with users. This is a simple process to improve your product. It goes like this:

* User uses product
* You get feedback
* You build new feature based on the above or you reject their feedback
* You go back to the user with the outcome of the above (like a link or gif to a new feature, or a clarification question)
* Repeat the above

Cycling through the above is the way to cement your product market fit - it also brings a ton of benefits:

* it means that you will demonstrate users that you listen to their feedback so that you get more feedback.
* your product will get better - you should weight user feedback very heavily compared to your instincts around what to build.
* it will bring you more users through word of mouth. The one thing you can compete on is speed - you can outperform any competitors by providing a ridiculously excellent experience to your early users. So they will tell their friends.

## Failure modes

* Users aren't activating. This means although they _signed up_, they aren't managing to _configure_ / really get started with your product properly. Therefore they _never_ get any value from it.
  * Activate your users manually. The classic example is the founders of Stripe [used to visit their first users in person](http://paulgraham.com/ds.html#Manual) to integrate their product for them. Do things that don't scale. The bonus of this approach is that you'll get deeper customer interaction, so you'll learn more and you'll get a better relationship which will help you get more feedback.
  * Or make your activation simpler.
* You are getting conflicting feedback on what to build.
  * Go to Level 4, this will help clarify which users are your Ideal Customer Profile, and which aren't. Hopefully this exercise will help you pick a clearer direction. 
* Your product isn't solving your users' problem, hence there is no point coming back.
* Your product is painful to use.
  * Get feedback from users.
* Your users don't need to login repeatedly.
  * Perhaps you've completely automatically solved the problem now with no further user work. Proceed to Level 4 and validate this by seeing if they will pay for it.
* Your users used the product as you'd hope, but they don't experience this problem very often.
  * Proceed to Level 4. It may be hard to get significant revenue for an infrequent problem, or it may be that you don't experience much demand. If it was extremely hard finding the first users _and_ it's hard to charge much for the product, this problem isn't a big enough one - go back to Level 0.

## Level 4 - Your first 5 reference customers

This will help you get your first customer and then it'll help you figure out your Ideal Customer Profile.

* Write down needs, behaviors and attributes your customers have in common
* For example, we looked at...

TODO INSERT WHAT WE USED HERE and the giant spreadsheet


# Designing your company to do the above as easily as possible

## Deciding to work with a cofounder

If you're looking to build a huge, VC backed company, please just do this. It'll take a long time, there will be thousands of decisions to take. The only true way to fail is to give up. With the right person, you're more likely to persist with two people.

For a SaaS business, there are some principles I'd follow:

* ideally _both_ of you are technical. You need a machine than can rapidly get through the levels above - and your ability to ship software quickly is going to be the biggest blocker in the early days.
* critical: at least _one_ of you must be happy doing sales _most_ of the time. You don't need experience here, but you must embrace this challenge. There is a lot of sales in startups - recruiting early users, a team, investors and so on.
* critical: you _both_ must be happy to talk to users.

You are getting committed to something that may outlast the average marriage. Let that sink in. Your goal is never to be right, it's to get good at figuring problems out together.

Treat each other as partners. Failure mode is when the CEO bosses the CTO around and makes all the decisions. Then you aren't cofounders.

## How to work together in the early days 

Live together. For those that this is the most painful (I'm looking at you, people with families), living together for a set period allows you to focus on getting things off the ground when your ability to get work done is the bottleneck for everything. One of the most impactful things about doing YC was having a socially exceptable excuse to do nothing other than work for 3 months. It was unsustainable 

Define your roles clearly - divide and conquer. Tim wrote code, I did _literally_ everything else - finding users, the website, product design in Figma, and grocery shopping. Try not to interrupt each other - we wrote up discussion topics during the day and then went through them together when we both weren't trying to get something else done.

Weekly sprints. This makes you prioritize what to work on. They shouldn't be longer as that's too slow. Any faster means you'll spend too much time talking and not doing. The latter gives you the clearest lessons.

Daily standups. This makes you accountable to getting your work done. List out what you got done yesterday and what you plan to do today.

Optimize for not breaking up. I'm an advocate for 50:50 equity and pay if suggested by the "more experienced" person - this means you're really partners, and it reduces an area that could cause resentment. Any difference in experience will become irrelevant after a few years anyway.

## Spending money

Spend as little as you can, within reason. Mainly, do _not_ hire anyone until you've got product market fit. This simply gives you longer to get there, and if the two of you can't get it, no one else stands a chance.

I'm an advocate for a decent computer and your own room if you're living together. The former means you don't get pulled out of your flow and the latter means some privacy so you can decompress when you really need to. But hey, whatever works for you. Gym membership will be worth it too.

## Motivation

If you aren't excited about what you're working on, pivot. It's as simple as that. You're going to go a lot further if you're working on something that feels like it's _your_ startup versus someone else's.

## Pivots

It feels scary to pivot.

A lot of the hustle/grind culture around startups would make you think that the very best startups took years and years of work to get off the ground. The reality, once we got into YC, was the opposite. It felt like the _majority_ of the best companies there pivoted - most ideas people were working on needed to change.

Whatever you do, if you pivot, is have a clear view of which level you're going back to. Do not try to get an existing solution that you've built to solve a new problem - think through a new problem from scratch.

# Skills you will need

## Design

This, especially applied to your website, is probably more important than you think.



## Building stuff

You are trying to figure out if anyone cares - you are _not_ building something hyperscalable. Use a software stack you've used before, as long as it's reasonably popular. We used django and react in the early days.

That latest sexy javascript framework will _not_ help you hire anyone who cares about what matters.

## Dealing with existing users

We have the concept of closing the loop.

Don't put anything between the person writing the code and your users. This will slow you down and will cause confusion.

## Pivoting

It's normal. Since most startups fail, you're probably doing something wrong if you _don't_ pivot. The media would make you think that building a startup requires years of grinding away on the same idea. At PostHog, we pivoted six times in the first six months.

Be decisive.