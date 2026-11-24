---
date: 2024-02-19
title: How we built our onboarding email flow (with actual performance data)
rootPage: /blog
category: Inside PostHog
author:
  - joe-martin
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/blog_onboarding.jpg
featuredImageType: full
ogImage: generated

---

> **Updated July 26, 2024:** Added information about Onboarding 6.0
> **Updated Feb 18, 2025:** Added information about Onboarding 7.0
> **Updated Nov 24, 2026:** Added information about Onboarding 8.0, 9.0, and 10.0

Marketers believe onboarding emails are a powerful tool for driving engagement. Everyone else thinks they're annoying and ineffective. The truth, as always, is a little more complicated.

People, and developers in particular, hate onboarding campaigns because the bad ones are so memorable. And how would you know what "good" looks like without signing up and risking a flood of tedious outreach emails from sales reps?

We don’t do those sorts of outreach emails. This is what we do instead, and how we got there over 10 major iterations. We think it works and we've included performance data so you can judge for yourself.

## Onboarding 1.0: The one where it started costing lots

Back in 2022, our onboarding flow was powered by Mailchimp and was _very_ simple. In fact, nobody actually knew what it looked like. So, I mapped it in [an RFC](https://github.com/PostHog/posthog.com/issues/3202).

![Onboarding 1.0](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/onboarding/onboarding_1.png)
<Caption>The first map we did of what our email onboarding flow looked like</Caption>

We didn’t do welcome emails for new users, and even our monthly changelog emails were only sent to 660 opted-in users. I decided to change this and imported 30,000+ users into that email list. 

The move was covered by our T&Cs and, because it was one email a month about actual product updates, we figured nobody would mind. The good news was that we were right and didn't get a single complaint and only a handful of unsubscribes.

The bad news is that it sent our Mailchimp costs skyrocketing. This is because Mailchimp's pricing is based partly on how many emails you send each month, and it has low limits that make it entirely unsuited for a complex onboarding campaign. We started searching for a platform with more predictable and scalable pricing.

## Onboarding 2.0: The one where we chose a new email tool

Towards the end of 2022, we finally moved off of Mailchimp. We looked at tools such as Braze, Hubspot, and Customer.io, ultimately choosing the latter because it had [more transparent pricing](/blog/transparent-enterprise-pricing) and we had an existing app for pushing data to it. Signing the deal was arduous – Customer.io wanted almost ten separate meetings before they took our money, but at least they didn't send any awful sales outreach emails!

I’d observed from other companies that we needed to at least add a welcome email for new users, and I wanted to add checks after 24, 96, and 168 hours to see if users had ingested events. If yes, we’d send them some basic usage advice. If no, we’d offer them help. This was the very least I felt we could do. 

![Onboarding 2.0](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/onboarding/onboarding_2.png)
<Caption>Onboarding 2.0 added more checks to try and validate ingestion and three simple introductory emails</Caption>

This didn’t perform as well as you’d think, however, mainly because the ingestion checks were unreliable. Users kept complaining about getting the wrong emails, so we threw this all out and moved to a new plan.

> 💡 **Tip:** Something we learned for our welcome email was not to send it immediately after sign-up. The email is meant to give users initial direction, but first they need to set up ingestion – we added a one hour delay so that users can get data to work with first. 

## Onboarding 3.0: The one where we started tracking data

By Q3 2023, we were adding more and more new products to PostHog. We wanted to feature these in our flow, but we were also worried about becoming spammy. Thankfully, now that we had Customer.io in place, we were able to judge this based on the data. 

![Onboarding 3.0](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/onboarding/onboarding_3.png)
<Caption>New emails for 3.0 tried to emphasize what was possible with PostHog, directing users to helpful blog content</Caption>

Our conversion event was a user log-in within one week of opening an email. We hadn’t yet thought of anything better. 

- **Open rate:** 56%
- **Click-through-rate:** 7.4%
- **Unsubscribe rate:** 0.6%

Based on this high open rate and low unsubscribe rate we felt that users didn't mind getting the emails, and the click-through rate suggested they liked what they read. So, we continued adding more messages. 

> **What does good look like for an email onboarding flow?**
> Benchmarks vary wildly by industry, implementation, and product. As a rule though, the guideline benchmarks I use from my experience in other startups are:
>
> - **Open rate:** Anything above 40% is OK. 50% is the goal.
> - **Click-through-rate:** Anything above 4% is OK. 6% is the goal. 
> - **Unsubscribe rate:** Anything below 1% is OK. 0% is the goal.

## Onboarding 3.1: The one where we added personalization

Data is important, but I strongly believe it doesn’t tell the whole story. You also need feedback and intuition. Most of the feedback on our emails came in [3.1](https://github.com/PostHog/meta/issues/127), when we started sending personalized recommendations to users from [my personal email](mailto:joe@posthog.com).

How this works is simple: when a user signs up, they can optionally tell us what their role is. If their `role_at_organization` = `engineer` we trigger an email from me telling them about our newsletter, [build mode](https://newsletter.posthog.com/). 

![Onboarding 3.1](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/onboarding/onboarding_31.png)
<Caption>Onboarding 3.1 was when we really started tailoring emails based on what we knew about users</Caption>

This email performed very well, with a 68% open rate and a 16% CTR. Two emails into the flow and developers were already opting in to _more_ emails! 

Best of all, though, because it was personalized and came from me directly, it also earned a steady trickle of replies. I responded in kind and was able to feed in further improvements, including adding another option for `role_at_organization` = `founder`.

## Onboarding 3.3: The one where we added experiments

In [3.3](https://github.com/PostHog/meta/issues/140), we started running a series of tests and experiments. We removed the `founder` targeted email, which invited teams to join [PostHog for Startups](/startups), because it was _too_ successful and cannibalised revenue.

Most of the tests we ran proved inconclusive, or outright failed. Subtle changes to subject lines or body copy had no noticeable impact. We learned that users did _slightly_ prefer [Lottie’s](/lottie) hedgehog art over screenshots of the app, but the difference was a negligible 1-2% in CTR. 

One successful experiment we did roll out was adding more personalized emails for non-technical users. If `role_at_organization` = `marketing`, `sales` or `product` _and_ a user had not created an [action](/docs/data/actions) within 12 hours, I’d send them another personal tip. These emails averaged a steady 6% CTR and 54% open rate, so we kept them in, but interestingly I didn't see many replies on these messages.

## Onboarding 4.0: The one where we filtered by ICP

[4.0](https://github.com/PostHog/meta/pull/150/) was a massive step up in complexity as a result of our growing number of features. By late 2023 the flow had 28 separate emails, of which users would get a maximum of 6 over several weeks. We still worried this would be too many, but the low (0.4%) unsubscribe rate suggested otherwise.

![Onboarding 4.0](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/onboarding/onboarding_4.png)
<Caption>Onboarding 4.0 split high-ICP users out into their own email flow because our CS team would reach out directly</Caption>

By this point we’d also changed our conversion event to mean a user enabling billing for a product within one week of opening an email - a far better indicator of if the emails are delivering value than simply measuring logins. 

- **Open rate:** 52%
- **Click-through-rate:** 4%
- **Unsubscribe rate:** 0.4%

Around this point we also started filtering out teams in our [ideal customer profile](/newsletter/ideal-customer-profile-framework) (ICP) using a scoring system implemented in Hubspot. If a user scored over a certain threshold they’d be moved out of the usual flow so our <SmallTeam slug="customer-success" /> could reach out directly. We’ve since removed this check because it felt too salesy and didn’t perform well, however. 

## Onboarding 5.0: The gosh-thats-complicated one

The next version was where things got out of hand. It contained over 53 emails and 38 timed events and was, quite simply, a pain in the ass to explain to everyone internally.

The goal of this flow was to focus on [improving activation](/product-engineers/activation-metrics), and build on some parallel improvements to our in-app onboarding flow. When a user signed up to PostHog we asked them to select a product to setup first: analytics, replays, flags, or surveys. [Onboarding 5.0](https://github.com/PostHog/meta/issues/172) builds off that selection by encouraging users to use that product, and then showing how other features can combine with it.

![Onboarding 5.0](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/onboarding/onboarding_5.png)
<Caption>Onboarding 5.0: Messy, complex, and highly personalized to user interests</Caption>

The hope was that this would improve in-app activation, which we roughly define as: 

- **Product analytics:** Events ingested, 1 insight created, 1 dashboard created
- **Session replay:** 5 recordings viewed
- **Feature flags:** 1 feature flag created
- **Surveys:** 1 survey launched

To avoid annoying users, we added a time block based on our activation criteria – if a user hasn’t activated after two emails, we stop sending them emails for six weeks. We also use an unsubscribe notice that tells users how many emails they can typically expect: one email per week, for six weeks.

And as for performance?

- **Open rate:** 50%
- **Click-through-rate:** 2.4%
- **Unsubscribe rate:** 0.4%

## Onboarding 6.0: The one that lasted almost a whole year

The [next version](https://github.com/PostHog/meta/issues/212) was where we decided to simplify things. We stripped out a bunch of the flows which were adding maintenance overheads and bought everything down to a far simpler, linear flow where every email was determined by a simple user choice. Already using session replays? Fine, we'll email you about something else then. 

![Onboarding 6.0](https://res.cloudinary.com/dmukukwp6/image/upload/6_0_workflow_0a235a781a.png)
<Caption>Onboarding 6.0: Simpler. Better. Funnier.</Caption>

It's also where, following some feedback, I decided to more directly embrace the PostHog tone of voice and make everything a little bit more sassy and anarchic. I added things like calling out product names, or the irony of emailing users about an email. I also made liberal use of memes from Lottie. 

![memes](https://res.cloudinary.com/dmukukwp6/image/upload/email_unsub_6015c09eb1.png)

The biggest change, however, was changing just over 50% of the emails to come from me. As in, directly from my email address. Users can (and do) respond to them, and a growing amount of my time is now spent chatting with users over email - time well spent, in other words.

You'd think doing things like actively goading users into unsubscribing would be bad for conversion rates and subscriptions. You'd be wrong. 

- **Open rate:** 52%
- **Click-through-rate:** 3.1%
- **Unsubscribe rate:** 0.3%

## Onboarding 7.0: The one with intent and activation criteria

In 2025, I decided to revisit the onboarding flow with a two main goals. First, I wanted to more actively encourage cross-sell again, but this time with a focus on doing it just for products that combined _really_ well. I'd decided that what held previous attempts at cross-sell back wasn't the idea, but just that the content was a bit m'eh. Secondly, I wanted to design a secondary flow which focused on pulling in feedback for our betas - but that's another story. 

The approach I took was to tie the flow into some new events we had access to that captured which products a user was interested in during their in-app onboarding. Here, we enable users to select multiple products and then funnel them into focusing on the first. That meant it could be the role of email to then encourage activation for the secondary products later. 

The new onboarding features a new loop when users first sign up that assesses whether they've successfully ingested _any_ data across any of our products. If they haven't we first attempt to help them with that before moving on. After they've got data coming in (or they time out on this logic) we move into product emails. First, we look at what their primary product intent was and check if they've successfully activated with that product. If they haven't, we drop them an email to help. If they have, we check if there's a product that may combine well with it and if they've activated that too. If they've activated on everything we want them to, we drop them an email about a higher-level, free feature or beta. 

![email example](https://res.cloudinary.com/dmukukwp6/image/upload/email_example_e36d3308f9.png)
<Caption>Onboarding 7.0: Memes, and a personal touch</Caption>

I've tried to make the emails a lot more fun and anarchic than they were even in Onboarding 6.0, but in 7.0 I also took on feedback from users about the sort of content that would help. A lot of users wanted to know how we personally use PostHog, or what they can learn from other customers. Additionally, 100% of the onboarding emails now come directly from me (albeit still automated) and the emails themselves have a new design which actually works in dark mode. 

At the time of writing it's still a little early to know how successful these new experiments will be, but the early response is positive. After being live for a week this version has already equalled the CTR of the previous version, though the jury remains out on the overall conversion rate. 

## Onboarding 8.0: The one with videos

[Onboarding 8.0](https://github.com/PostHog/requests-for-comments-public/issues/414) rolled in some small, tactical changes to our emails and attempted to build on the cross-sell logic we started in Onboarding 7.0. It also used a lot of videos, as we'd just started building our video team at PostHog and were finally able to create richer assets.

Under the hood, most of the changes were about cross-sell. We extended the cross-sell logic so it ran at every layer of the flow and went three products deep, and added three more cross-sell checks that kicked in after a user's first 30 days. We also moved the add-on email to a more prominent spot (people liked it), added a pricing explanation step, and renamed Max AI to PostHog AI.

As in the previous flow, we used product intent and product activation to try and time messages to users based on what we thought they wanted to set up and what products they were using. This time we'd send them emails with videos about how we used PostHog internally to demonstrate common use cases.

On paper, this sounds great. People love videos, right?

In practice, we quickly got frustrated with it. The videos didn't seem to perform especially well, took too much time to create, and often went out of date as we shipped new features and UI. We became keen to replace the content with something better, especially as we shipped more and more products, the flow got more complex as a result, and the data showed more of a downturn.

- **Open rate:** 42%
- **Click-through-rate:** 2.3%
- **Unsubscribe rate:** 1.2%

## Onboarding 9.0: The last one in Customer.io

Onboarding 9.0 was less of a strategically planned update and more of a reactionary set of changes that increasingly grew in scope. What began as a positioning update as we launched our self-driving features later grew into a much broader set of changes than that implies.

The context here is that the Marketing teams at PostHog came together as a group and decided to make a directed effort to reposition our product. You can read all about that in [Charles' article about the decision](/blog/repositioning-posthog), but the impact on the onboarding flow was expansive.

We started by rewriting every email and funneling users not towards videos and specific products, but to our agentic and [self-driving tools](/self-driving). [Our Slack app](/slack) got a lot of attention (primarily because I'm a habitual user of it internally), as did the then-in-beta [PostHog Desktop app](/desktop).

Beyond the emails themselves, 9.0 was also the last email campaign we built in Customer.io. We'd had a number of issues with Customer.io since adopting the tool, such as a constantly degraded pipeline due to the amount of data we (as a data company) wanted to send and issues with user and org relationship mapping. By the time it came to renew our annual contract we found ourselves paying $5,000 per month in overages and with campaigns increasingly siloed from the data we wanted to use. Negotiations with Customer.io also became lengthy and I was personally disappointed in how slow the MCP and agent tools felt.

Luckily, [I didn't have to look far for an alternative](/workflows).

- **Open rate:** 41%
- **Click-through-rate:** 1.4%
- **Unsubscribe rate:** 1.1%

## Onboarding 10.0: The upcoming one

[Onboarding 10.0](https://github.com/PostHog/marketing/issues/441) is the first flow I built entirely in [PostHog Workflows](/workflows), and the first one I built mostly by talking to an agent.

Before I started, I [asked three lifecycle marketers to roast our lifecycle marketing](/blog/lifecycle-marketing). The clearest advice was to swap our tree of roughly 100 emails for one simple trunk with one goal, so that's what I built.

9.0 pointed people at our agentic tools, but it was still a product tour with extra steps. For 10.0, I picked one north star: get new users to set up [the MCP](/mcp) or use [PostHog AI](/ai). Everything else in the flow exists to get them there, or to make their org a bit healthier along the way.

So, instead of a forest of product paths, every new signup will go down one trunk. It only branches on a handful of things we actually know about them:

- **Data:** Has their org started sending events? If not, we help with setup before anything else.
- **AI use:** Have they used PostHog AI, the MCP, or the Slack app? If so, they skip the emails that nudge them towards it and move through the rest of the flow about three days early.
- **Teammates:** Have they invited anyone, or joined an existing team? If not, we suggest they do. Every plan has unlimited teammates, even the free one.
- **Products:** Do they already use two or more products? If so, they skip the use-case emails.
- **Plan:** Owners and admins with data who aren't paying yet get an email about adding a card and setting a $0 billing limit. Paying orgs skip it.

The use-case emails are where things changed the most. Previous versions tried to sell you on specific products, which is how the cross-sell logic got so tangled in 7.0 and 8.0. Now each email gives you a problem and a prompt to paste into PostHog AI, your own agent, or Slack. Every prompt uses at least two products, so cross-sell is the agent's job now, not mine. Honestly, it's better at it.

Personalization is still light, but it goes further than it used to. Each email uses Liquid to change the copy based on how someone signed up and what role they picked. If you signed up through Claude, Cursor, or Lovable, the welcome email names the tool and tells you how to install PostHog from there. If you're a founder, your use cases are about revenue and retention, not failed network requests.

And yes, it's still fun. There's a hot dog joke, a Chrome extension that lets Max the hedgehog loose on the internet, and an email that promotes our least profitable products because we don't listen to our shareholders. Most footers have their own joke too, mostly at my expense.

![Onboarding 10.0](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/68747470733a2f2f75732d6d656469612e706f7374686f672e636f6d2f75706c6f616465645f6d656469612f30316132306533632d306563622d303030302d383461382d666339643562623231666139_9e66c0c9df.png)

<Caption>Onboarding 10.0 gives users a slightly different path based on if they've been invited, or are a new sign-up</Caption>
### Building it with the MCP

This is the bit I'm most excited about. I built almost all of 10.0 by talking to Claude through the [PostHog MCP](/docs/model-context-protocol). I'd describe a branch or paste in some copy, and the agent would build the step, write the Liquid, and wire it all together. When I wanted to see the result, I asked for a test of every email and every variation, and they landed in my inbox a few minutes later.

It also did the boring checks I'd normally skip. It tested every Liquid branch against real signup data, so we weren't personalizing on properties that don't exist. It regenerated the plain-text version of every email. It even spotted that orgs on one of our paid plans would have got the add-a-card email, which would have been embarrassing. In Customer.io, that sort of audit would have taken me a week and a spreadsheet. Here, it took a few prompts.

### Having all the data

The other big change is that the flow now lives next to the data, not downstream of it. In Customer.io, every signal we wanted to use had to be piped across, mapped to the right user and org, and paid for. We were always working from a partial, slightly stale copy.

In PostHog, the flow can use anything the product already knows: events, person and org properties, and cohorts. That's how 10.0 checks whether an org has ingested data, whether someone has used the MCP, how many products they use, and which plan they're on, at the moment each email is due. No syncing, no overages, and no arguing about which user belongs to which org.

The same goes for measurement. Conversions, opens, and clicks sit in the same place as product usage, so I can see whether someone who got the MCP email went on to use the MCP, not just whether they clicked a link.

At the time of writing, 10.0 hasn't launched yet, so there's no performance data here. I'll add it once there is.

## What we learned

Across the various different versions (and many other smaller iterations) of our email onboarding, there are a few definite things we've learned. 

### Email works for engineers too
As I said at the start, the conventional wisdom is that engineers are particularly skeptical of any marketing activity, and likely to unsubscribe to emails. However, our unsubscribe rates have been consistently low enough to disprove this. If the emails add value for engineers and are [well-written for that audience](/founders/writing-for-developers), they can still be effective. 

### You can send more emails than you think
One of our consistent worries has been that we send too many emails. Again though, the low unsubscribe rate suggests that users aren't getting annoyed by this. The current email flow gives users approximately six emails, yet we've not heard any complaints about this. 

We think the reason for this is...

1. We space emails out quite conservatively. Users will typically only get one email per week, and we are defensive about deviating from this schedule. 

2. We tell users how many emails they'll get. It's added to the welcome email, right next to the unsubscribe button. This means users know we value their time and can unsubscribe _before_ they get annoyed.
 
3. Our emails are actually worth reading. We don't send those awful outreach emails from sales reps, we don't run limited-time discounts, and we don't beg users to pay more. We just tell them how to get more out of PostHog. 

### Users prefer fun visual art to screenshots
I mean, who _wouldn't_ want to look at a cute hedgehog instead of a graph? 

We've run tests on this several times and [Lottie's](/lottie) art is victorious by a small margin every time. 

### Personalization matters
Personalization doesn't mean calling users by their first name using a [liquid](https://customer.io/docs/journeys/using-liquid/) tag and pretending to be best buds. It means providing the right content, at the right time, in the right way. 

We do this in several ways in the latest version – delaying our welcome email, tailoring the emails users receive based on their choices, and sending newsletter invites from my personal address. If nothing else, the replies I frequently receive from users are a testament to how effective this is. 

<NewsletterForm />