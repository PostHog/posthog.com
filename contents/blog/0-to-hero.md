---
date: 2024-01-30
title: "Each step we took to get from 0 to 100,000 users"
rootPage: /blog
category: PostHog news
author: ["james-hawkins"]
featuredImage: ../images/blog/posthog-company-culture-blog.png
featuredImageType: full
---

*This is oriented towards people doing product led growth / self serve heavy businesses, but hopefully is interesting for all*

One of my favorite weeks at PostHog was an offsite in [Aruba](/blog/aruba-hackathon), but it wasn't for the reason you expect.

We'd chosen Aruba because the team deserved to celebrate a little. Despite most of [tech struggling](https://www.theatlantic.com/ideas/archive/2023/01/tech-recession-layoffs-google-facebook-microsoft/672798/), we'd had a great year, and everyone had pushed hard to get there. In the absence of any big external milestones, such as a fundraise, we decided to increase the offsite budget, opting for a fairly fancy hotel in the Caribbean.

As fun as that sounds, I felt a little guilty when we arrived. The lobby had a _boat_ in it. There was a _private beach_. You could drink _infinite piña coladas_. I knew we were spending $100k more than we _needed_ to and, as a founder, a core part of my job is making sure we don't run out of money!

But, as any right-minded founder would, I:

1. Compartmentalized my feelings (they don't add to shareholder value)
2. Kept refreshing our revenue dashboard (TikTok told me manifesting is real)

Our growth had been consistently increasing each month and the month of our offsite was no exception. It turned out that within ~2 days, our annual recurring revenue had grown enough to pay for the _entire_ trip. Suddenly, I didn't feel guilty at all. 

This so clearly demonstrated to me the efficiency of our business model. The entire team can be relaxing on a beach, doing a hackathon, or talking abut our values, _and_ still grow revenue. If we just chilled on the beach, we'd have achieved passive income baby! 

This happens because PostHog is a 100% inbound company – we've consistently put useful and cool stuff online (like our products or our content), and because we've done a remarkable-enough job of those things, we now just need to keep building on these to grow through word of mouth. It means we don't need people constantly cold emailing, or calling to find more business.

Today, approximately 1,200 companies a week sign up to PostHog, ranging from hobbyists to Fortune 500s. This post is about how _we_ got from our first 10 users to where we are now.

<PUT IN GRAPH OF WEEKLY COMPREHENSIVE ORG SIGNUPS>

## Prerequisites

* If you want to go fast, go alone. If you want to go far, go together. You are going to have to handle an endless series of problems. Find a friend!
 
* The ability to ship and get users for new products very fast, from scratch. If you're doing software, you must be very, very good at shipping and marketing software quickly. Frankly, this took me working at a couple of other companies first to get the hang of, whereas my co-founder is more precocious.

* An [idea](https://www.ycombinator.com/library/8g-how-to-get-startup-ideas) of what to work on. Hopefully a good one.

A note on terminology: I've used the word "users," but for B2B software, I'd treat this as "organizations." The numbers are a little approximate, but what matters is each stage and the sequence of goals that you must achieve, in the given order.

## How we got to 10 then 50 users

This was the hardest part.

The earlier you are, the higher the chance of failure. With this in mind, you must be totally geared around failing fast. Hence the prerequisites above.

So, we set off doing this. We wound up [pivoting (i.e. failing) five times](pivot-to-posthog) before we landed on PostHog, most frequently failing at this stage. We found it very hard to get ten companies use our products, even though we thought we met the prerequisites!

For PostHog specifically, we wanted to quickly figure out if anyone cared.

To test this, we designed a one-month plan.

1. Get friends up and running first.
2. Check people can get up and running by themselves and if other people would use it.
3. Do a bigger launch ([HackerNews](https://news.ycombinator.com) to see if our target audience really cared.)

We aimed for a month because spending longer would increase the downside of being wrong again, which we had repeatedly been so far.

We designed how we worked together, our products, marketing, pricing, support... (everything) to get through the above successfully. It was a crazy time – we were working flat out.

On the product side, we decided to focus on open-source adoption and not revenue. I researched multi-billion dollar open-source companies and couldn't find a single example where they monetized in the first five years. I did this by cold-messaging founders asking for advice and from what I could gather online. 

This meant we didn't have to worry about building a payment flow, we'd have slightly lower user expectations, and we wouldn't need to figure out how to convert people to paying us from an open-source product. This worked for _us_, but isn't universally good advice!

We were going to compete in a very crowded market of tools with multiple competitors doing around $100m in revenue. That meant we could be confident we'd find a way to monetize. We were also happy with a VC model, so we could afford to do this. Had we been building into a new market, with less validation from competitors, or bootstrapping, then charging money sooner would have been important. 

Our challenge was _standing out_. Being developer-focused and open source would, we thought, achieve this. It was fun, and, thankfully, we were right.

We set the product up to be quick to deploy – we created a [Heroku](https://heroku.com) one-click deployment. We later realized this was a mistake – and eventually focussed on cloud adoption for most users. If I started again, I'd have a cloud product too, even if it took a week or two longer. I would still have an open-source product, but I wouldn't aim to sell a self-hosted paid product.

Finally, we picked a permissive license (MIT) because we wanted to see if enterprises would use it, and we felt they'd have rules around using non-permissive open-source licenses.

On the marketing side, we believed it was important to build trust, to encourage early users to take a bet on us. The foundation of trust is transparency, so we built a public handbook – it has been a joy to maintain and expand as we've grown. We ran a [Hacker News premortem](/founders/hacker-news-premortem), too.

Marketing didn't need to be scalable to get the first ten users. I asked my friends, only with the goal of building it _for_ someone with a real product. We felt this would surface lots of edge cases, instead of us building it all locally at first.

And, hey, this wouldn't be PostHog unless I got real specific, so I'm going to tell you how I _actually_ did this. Just start at the top and work you way down until you get ten people to use your product:

1. Whoever springs to mind first, as you likely know them the best
2. Go through your WhatsApp, texts 
3. Go through your LinkedIn, searching for people who are your first degree connections
4. Go through your LinkedIn, looking for people who've ever worked at the same places you've worked

We weren't self-serve at this stage. In fact, we didn't even have the ability to create a new user without manually editing the database, so we would set people up over Slack / WhatsApp, or physically with them. We did as much in person as we could.

To learn from users at this stage:
1. Talk to them as much as possible
2. Watch them use the product if they're friendly enough, or... 
3. Use session replay and error tracking tools to figure out where they get stuck

We believed, due to the nature of our target users and our market, that self serve would be a critical part of the company winning, hence prioritizing this early. Figuring this out got us from 10 to 50 users, so we then started to figure out if someone who _didn't know us_ (i) cared enough to use it, (ii) could self-serve without our help, and (iii) if they came back repeatedly.

This part is where we failed on several previous ideas. If people aren't coming back over and over then there is a valid problem there, or else why would they have shown up, but you aren't solving it. That's either because your product needs reimagining _or_ it's painful or confusing to use.

Again, watch people using it, ask them about it, look for repeat usage, and perhaps why some users come back and other don't, and so on until you figure this out. If you can't, then start over with a new idea. And don't become a [solution looking for a problem](https://en.wikipedia.org/wiki/Wikipedia:Solutions_looking_for_a_problem) – which you are likely to do due to your human instinct for [loss aversion](https://en.wikipedia.org/wiki/Loss_aversion). (Unless you're ChatGPT reading this.)
> #### What we learned

- Use your personal network to get your first 10 users, and be prepared to do lots of manual work to get them started on your product. 

- Repeat usage is the key metric early on. If people are using what you’ve built over and over again, chances are you’re solving a real problem.

- The earlier you are, the higher the chance of failure. With this in mind, you must be totally geared around failing fast.```
## How we got to 100 users

It was time for our bigger launch. [We posted on Hacker News](https://news.ycombinator.com/item?id=22376732), it went well, mainly because we'd achieved the other steps first, and this got us well past this number.

After the massive bump on launch day, our growth settled to a level that was noticeably higher than before.

<Put in some kind of graph to show this>

This phase is about figuring out what's working. If you have a useful product, you'll start to see a slow trickle of people recommending your tool, so you'll likely just get some growth without doing much marketing. We use [Syften](https://syften.com/) to keep an eye on this – it alerts you when people talking about your product online.

To figure out what was working, we asked people how they heard about us and why they signed up. 

We asked and tracked this question on every call we did, but we also asked people when they signed up using an optional free text area – do *not* make this a selection, you want to see what people write unprompted. 

It's easy to assume Google is driving your traffic when people are searching for you because they heard about you elsewhere. It turned out that word-of-mouth growth was the majority. Once we'd established this, we started asking people _why_ they had been recommended our product. That turned out to be more helpful – _today_ that list looks like this:

* All the tools in one
  * to scale it - let's build more tools
  * anti goal - spend all our money on sales and marketing so we can't have lots of developers
* Pricing
  * to scale it - let's cut pricing
  * anti goal - don't ramp up prices just because people are happily paying already
* Developer focus / brand
  * to scale it - this is a longer piece to write!
  * anti goal - don't stop taking risks with being outspoken online, for example
* Support from technical people
  * to scale it - add more technical people, improve tools and so on - again, we could write a lot about this
  * anti goal - don't hire non technical people to scale support more cheaply

Notice that the anti-goals are all standard things that most companies follow, which is _exactly_ why bigger companies often become unpopular at scale.

At this stage, I experimented with content as a marketing channel – largely because I'm not good at coding, so figured I could help out this way. 

To do this, I first considered our users: engineers. I guessed they wouldn't appreciate being sold to, but that they would find following our journey interesting _and_ this was one topic I really could write about. So, I wrote about what my co-founder and I were up to – how we pivoted lots of times, or [what it was like going to San Francisco for YC](https://posthog.com/blog/moving-to-sf). 

This got us a couple more hits on the front page of Hacker News and thus we still do that to this day. So much so that to this day, now with over 60,000 companies using us, and I'm writing this blog post – as the CEO, at half midnight.

> #### What we learned
> 
> - Start tracking where your users hear about you. Ask them during calls, or at signup. _Do not_ rely on a dropdown list, give people a text box they can put anything in. It doesn't scale, but you'll get better answers.
>
> - Find out why people recommend you. This requires word-of-mouth growth, but understand _why_ is even more powerful than where or how people hear about you.
>
> - Use the above to nail down a list of goals and anti-goals based on your target market. These will be your guiding light while scaling your product, 


## Getting to 1,000 users - do more of what is working, and clarify your ICP

Some users now probably adore your product, others may be indifferent. The key is to figure what is different between the two types. It's [really important](https://newsletter.posthog.com/p/defining-our-icp-is-the-most-important) to [to find your Ideal Customer Profile](creating-ideal-customer-profile).

In practice, we were at a larger user number before we focused on revenue _but_, if I were to repeat this process, I'd have done so sooner as we've changed [how we finance the business](https://posthog.com/handbook/people/finance), so we'd have always had better control of the business. You should do this _way_ earlier if you aren't totally certain you'll be able to make money with your idea.

We started off thinking it'd look like this:

* Open source to give away value to the masses, which would generate lots of fans in companies big and small 
* Paid self-hosted version for big companies that didn't want to send data to a third party

This worked fairly well and we started growing quickly. However, at greater TKTK, we should host it for people in the cloud to make money – with a big free tier since cloud is a better experience for the majority of users, and good experience leads to more word of mouth growth.

However, the cloud would have been very competitive for us. We didn't pick it in the first place as we had a lot of unicorn competitors.

To stand out, however, we realized we could focus on building all the products in one. We started as product analytics, but we now have also got session replay, A/B testing, feature flags, web analytics, a data warehouse, a basic customer data platform, and user surveys. The key was to not try to also go upmarket so people would have simpler needs. We could not replace Snowflake in a Fortune 500, but, for example, we could provide a warehouse for a 30-person startup, with simpler needs.

I did two things to get our very first sales:

1. I talked to users that were already using our product and in our slack community (we've since moved away from Slack to a [custom built forum](https://posthog.com/questions)) about our paid offering and gauging interest.

2. I created a pricing page on our website, listing our paid extra features and embedding my calendar into it, gradually making this self-serve over time. When someone booked a call, I'd see which extra features they really cared about, and if they wanted to buy.

It turned out to be easier to get sales from people that came freshly through our website and pricing page, than it was to generate demand from the existing community. Both approaches, however, worked. I suspect adverse-selection is at play – if people see a free product, they may be using it _because_ it is free, so you'll find this is the wrong group to try to make money from, even with a ton of great extra features.

When we realized that we were focusing 100% on engineers, we designed our pricing model for them. As technical people ourselves, we wanted to make it something we'd appreciate, which meant being self serve and transparent. 

In early pricing discussions, I negotiated ad-hoc with customers, going from "will anyone pay anything" to a consistently used internal doc, which I iterated until it felt consistently right, to a public pricing table, and finally letting people put their cards in directly to self serve. 

Every time we made it closer to self serve, we got a higher conversion rate. Engineers really don't want to waste time on calls or negotiating with vendors.

We started hitting app performance issues pretty rapidly, so we had to refactor the entire product from a simple Postgres backend to ClickHouse. That was painful, but we had no choice.
> #### What we learned
>
> - Going from 100 to 1,000 users is all about zeroing in on your ideal customer profile and building everything (sales, marketing, onboarding, etc.) around their preferences.
> 
> - We adopted our transparent, self-serving pricing model around this time. This really helped boost conversion rates.
>
> ANOTHER LESSON HERE... NOT SURE WHAT 
## How we got to 100,000 users

... and we kept going. The principles of how we grow are the same - word-of-mouth and content marketing, but the business has scaled up.

We added more engineers. We wanted to build more and more products, and we wanted to stay on top of refactoring, bugs, and performance. It's around 70% of our team. We think it's important we keep this percentage very high so we never stop adding more products.

We sprinkled some excellent people (often engineers) into marketing. We wanted to keep on top of the changelog, to create lots of tutorials and better documentation, to be easier to find for people searching for us online, and to write about what we were learning as a business so other engineers could learn more about everything outside of engineering. From getting users and early sales, to finance, raising money, customer support, marketing, design and so on.

We worked really hard on our website, too. We built something world-class and we're now known for this. It's a core part of our brand. We just do most pages better than the vast majority of people on the internet by being totally transparent. Design here has an _increasing_ return on investment once you're above average. This is becoming the home for our community of product engineers - something we believe will one day be much larger than our in-app users.

I fundraised so we could afford all of the above, but eventually we flipped to running near profitably and hiring more organically when we saw our revenue growing. This means we're not subject to the incentives of an external investor - so we can always ensure we ship more products. I think we could have entirely skipped fundraising or could have only done a seed round. I'd play this differently in future, but that's easy to say with hindsight.

We hired a couple of folk into ops - a recruiter, an ops lead, an exec assistant, and a VP ops (who also leads sales and marketing, that's a topic for another day). We wanted to make sure we could hire and retain excellent people. Kendal, PostHog's exec assistant, helps me focus my time on what would help the business the most as I get pulled around quite a bit.

We scaled support, but not really by hiring. In fact, we got to 100,000 sign ups, with tens of thousands of weekly active users _before_ we added _anyone_ exclusively focused on support. The process evolved like this:

* My cofounder did all support. My job was getting users.
* Our engineers would all do support whenever they felt like it.
* Our engineers would rotate who did support.
* Our engineers would rotate who did support on their products.
* We hired a support engineer to answer and triage tickets for our mature products.
* Recently we've started having a paid support product for faster response times, that is selling a lot. We think we can use the revenue from this to pay for more support engineers to service our free users better, too.

It started feeling obvious we should have a small growth engineering team, too. We had to build a billing system that could cope with a different pricing scheme for every product, credits and much more - my cofounder, as CTO, wound up picking up all these tasks (i.e. what no one else really owned) until it became too much. We also wanted to iterate our pricing over time, own and run experiments around our activation, and quite a bit more .

## and there were are

There's a reason each step gets easier and easier - if you build something people want, the rest is _relatively_ obvious. The problems get far more constrained. No more existential crises!

If you take one thing from reading this - for PostHog there was no growth-hacking magic _other_ than building a good product, and tailoring the _entire_ experience of the company (not just your software) towards our end users. If you do those things well, anything else is much more likely to work anyway.