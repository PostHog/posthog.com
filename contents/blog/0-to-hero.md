---
date: 2024-01-30
title: "How to get your first 10, 50, 100, 1000 and 100,000 users"
rootPage: /blog
category: PostHog news
author: ["james-hawkins"]
featuredImage: ../images/blog/posthog-company-culture-blog.png
featuredImageType: full
---

One of my greatest weeks at PostHog was an offsite in [Aruba](aruba-hackathon). As much as I love a Caribbean paradise, it wasn't for the reason you expect.

In 2023, we were having a great year in the face of most of [tech struggling](https://www.theatlantic.com/ideas/archive/2023/01/tech-recession-layoffs-google-facebook-microsoft/672798/), and we wanted something to celebrate. We knew there wouldn't be any big external milestones - like a fundraise for example - to break up the year, and we had a _ton_ of stuff we expected our team to build. We therefore wanted to have a bit of a celebration of how things were going. So we increased the offsite budget, went for a fairly fancy hotel in the Caribbean.

As fun as that sounds - a core part of my job is making sure we don't run out of money. Alas.

We turned up and I felt a little *guilty*. The lobby had a _boat_ in it, there was a _private beach_, you could drink _infinite piña coladas_. Add those up, and I knew we were spending $100K more than we _needed_ to.

As any right-minded founder would:

1. I compartmentalized my feelings
2. I kept refreshing our revenue dashboard

Our growth had been really consistently increasing each month, and it turned out that the month of our offsite was no exception. It turned out that within ~2 days we'd increased our annual recurring revenue enough to pay for the _entire_ trip. I didn't feel guilty at all. 

This so clearly demonstrated to me the efficiency of our business model - the entire team can be relaxing on a beach and making money whilst not working. Passive income baby! The reason this happens is that PostHog is a 100% inbound company - we've consistently put useful and cool stuff online (like our products or our content), and because we've done a remarkable-enough job of those things, we now just need to keep building on these to grow through word of mouth. It means we don't need people constantly cold emailing or calling to find more business.

If you fast forward today, >900 companies a week now sign up to PostHog, from hobbyists to Fortune 500s.

<PUT IN GRAPH OF WEEKLY COMPREHENSIVE ORG SIGNUPS>

## Prerequisites

* If you want to go fast, go alone. If you want to go far, go together. You are going to have to handle a literally-endless series of problems. Find a friend! 
* The ability to ship and get users for new products very fast, from scratch. If you're doing software, you must be very, very good at shipping and marketing software quickly. Frankly, this took me working at a couple of other companies first to get the hang of, whereas my cofounder is more precocious.
* An [idea](https://www.ycombinator.com/library/8g-how-to-get-startup-ideas) of what to work on. Hopefully a good one.

A note on terminology - I've used the word "users", for B2B software, I'd treat this as "organizations". The numbers are a little approximate, but what matters is each stage and the sequence of goals that you must achieve, in the given order.

## Getting to 10 users / does the product actually function

This was the hardest part.

For every stage of a startup, the earlier you are, the higher the chance of failure. With this in mind, you must be totally geared around failing fast. Hence the prerequisites above.

So, we set off doing this... We wound up [pivoting (ie failing) five times](pivot-to-posthog) before we landed on PostHog. We met the prerequisites!

For PostHog specifically, we wanted to quickly figure out if anyone cared.

To test this, we had a plan, that was designed to take one month (so we wouldn't waste longer):
1. we got friends up and running first
1. we checked people can get up and running by themselves and if other people would use it
1. then do a bigger launch - [HackerNews](https://news.ycombinator.com), to see if our target audience really cared

We designed how we worked and the company (products, marketing, pricing, support, how my cofounder and I worked together - everything) to get through the above successfully.

On the product side, we decided to focus on open source adoption and not revenue. I researched multi billion dollar open source companies and couldn't find a single example where they monetized in the first five years. I did this by cold messaging founders asking for advice and from what I could gather online. This meant we didn't have to worry about building a payment flow, we'd have slightly lower user expectations, and we wouldn't need to figure out how to convert people to paying us from an open source product. However, this wouldn't be good advice universally. We were going to compete in a very crowded market of tools - with multiple competitors doing around $100M in revenue. That meant we could be confident we'd find a way to monetize. We also were happy with a VC model, and weren't bootrapping - so we could afford to do this. Had we been building into a new market, with less validation from competitors, or bootstrapping, then charging money sooner would have been important. Our challenge was _standing out_, and being developer focused / open source we thought (correctly, thankfully) would achieve this. And it was fun.

We set the product up to be quick to deploy - we created a Heroku one click deployment. Later on, we realized this was a mistake - we wound up eventually focusing on cloud adoption for most users. If I started again, I'd have a cloud product too even if it took a week or two longer. Finally, we picked a permissive license (MIT) because we wanted to see if enterprises would use it, and we felt they'd have rules around using non-permissive open source licenses, so we wanted to get rid of any risk they wouldn't use it.

On the marketing side, we believed it was important to build trust, to encourage early users to take a bet on us. The foundation of trust is transparency, so we built a public handbook (and it has been a joy to maintain and expand as we've gotten a lot bigger). We ran a [Hacker News premortem](hacker-news-premortem) too.

Marketing didn't need to be scalable to get the first 10 users. I asked my friends, only with the goal of building it _for_ someone with a real product (as we felt this would surface lots of edge cases etc, instead of us building it all locally at first).

And, hey, this wouldn't be PostHog unless I got real specific - so I'm going to tell you how I _actually_ do this. Just start at the top and work you way down until you get 10 people to use your product:

* whoever springs to mind first, as you likely know them the best
* go through your whatsapp / texts
* go through your linkedin, searching for people who are your first degree connections
* go through your linkedin, looking for people who've ever worked at the same places you've worked

You are unlikely to be self serve at this stage - if you are being very fast, you probably don't have the ability to create a new user without manually editing the database, so we would set people up over Slack / Whatsapp or physically with them. We did as much in person as we could.

To learn from users at this stage - talk to them, watch them use the product if they're friendly enough, use session replay and error tracking tools.

## Getting to 50 users / can people self serve (if doing product led growth) and does anyone care

Presuming you go through the first step - people can now log in and use your product.

Now you need to figure out if someone who _doesn't know you_ (i) cares enough to use it, (ii) can get up and running self-serve and (iii) if they will come back repeatedly.

This is where we failed with several previous ideas. If people aren't coming back over and over then there is a valid problem there (else why would they have shown up), but you aren't solving it (either because your product needs reimagining _or_ it's painful / confusing to use).

Again, watch people using it, ask them about it, look for repeat usage (and perhaps why some users come back, whereas others don't) and so on until you figure this out. If you can't, then start over with a new idea. And don't become a [solution looking for a problem](https://en.wikipedia.org/wiki/Wikipedia:Solutions_looking_for_a_problem) - which you are likely to do due to your human instinct for loss aversion (unless you're ChatGPT reading this).

## Getting to 100 users - make some noise online about your product and figure out what is causing your growth

It was time for our bigger launch - we posted on Hacker News, it went well (because we'd achieved the other steps first), and this got us well past this number.

After the massive bump on launch day, however, it was clear that we were still getting users

<Put in some kind of graph to show this>

This phase is about figuring out what's working, and if you have a useful product you'll start seeing people slowly recommending your tool so you'll likely just get some growth without doing much marketing.

Haphazardly, we did experiment with one marketing channel (largely because I'm not good at coding so figured I could help out this way...). To do this, I first considered our users - engineers. I guess they wouldn't appreciate being sold to but that they would find following our journey interesting. After all, the only topic I really get, is our own company. So I wrote about what my cofounder and I were up to - how we pivoted lots of times, or what it was like going to San Francisco for YC. This got us a couple more hits on the front page of Hacker News and thus we still do that to this day. So much so that to this day, now with over 50,000 companies using us, and I'm writing this blog post - as the CEO, at half midnight.

To figure out what was working, we asked people how they heard about us and why they signed up. More specific still, we'd ask and track this question on every call we did, but we also ask people when they sign up via a text area (do *not* make this a selection, you want to see what people write unprompted). It turned out that word of mouth growth was the majority. We started asking people _why_ they had been recommended our product. That turned out to be more helpful - _today_ that list looks like this:

* All the tools in one
* Pricing
* Developer focus / brand
* Support

With a list like this, you can do _more of these things_. For example, we're now working to make PostHog cheaper (whereas most companies try to increase prices over time, we're adding more products, we're writing way more content and doing brand better, and we're investing more in support).)

## Getting to 1,000 users - do more of what is working, and clarify your ICP

Some users now probably adore your product, others may be indifferent. The key is to figure what is different between the two types. This is [how to find your Ideal Customer Profile](creating-ideal-customer-profile), and [why your Ideal Customer Profile matters](https://newsletter.posthog.com/p/defining-our-icp-is-the-most-important) so much.

In practise, we were at a larger user number before we focused on revenue _but_ if I were to repeat this process I'd have done so a little sooner as we've changed [how we finance the business](https://posthog.com/handbook/people/finance), so we'd have always had better control of the business.

We did this later than 1,000 users, but I'd advocate for doing it here - it's probably time to figure out your business model properly (you should do this _way_ earlier if you aren't totally certain you'll be able to make money with your idea).

We started off thinking it'd look like this:

* open source to give away value to the masses
* paid self hosted version for big companies that didn't want to send data to a 3rd party

This worked fairly well, we started growing quickly. However, at greater scale, we got stuck in k8s and infrastructure hell with high volume customers. Having tried hard to make it work, it became obvious that we should focus on cloud.

However, the cloud would have been very competitive for us. To stand out, however, we realized we could focus on building all the products in one (we started as product analytics, but we now have also got session replay, a/b testing, feature flags, a basic warehouse, a basic customer data platform and user surveys). The key was to not try to also go upmarket so people would have simpler needs. We would struggle to replace Snowflake in a Fortune 500, but we could provide a warehouse for a 30 person startup, with simpler needs - for example.

To do these early sales, I tried the following:

* talk to users that were already in the product about our paid offering and gauging interest
* creating a pricing page on our website, listing out our paid extra features and embedding my calendar into it (then gradually making this self serve over time)

When someone booked a call, I'd see which extra features they really cared about, and if they wanted to buy.

When we realized that we were focusing 100% on engineers, we designed our pricing model for them. We wanted to make it self serve and transparent. In early pricing discussions, I negotiated ad-hoc with customers, eventually according to an internal doc, which I iterated until it felt consistently right, then I made this public and let people self serve. Every time we made it easier to self serve, we got a higher conversion rate. Engineers really don't want to waste time on calls or negotiating with vendors.

We started hitting app performance issues pretty rapidly, so we had to refactor the entire product from a simple postgres backend to ClickHouse too. That was painful but totally worth it.

## Bonus: Getting to 100,000 users - scale the business to match your demand

... and we kept going. The principles of how we grow are the same - word of mouth and content marketing, but the business has scaled up a little.

We added more engineers. We wanted to build more and more products, and we wanted to stay on top of refactoring, bugs and performance. It's around 70% of our team. We think it's important we keep this percentage very high so we never stop adding more products in.

We sprinkled some folk into marketing. We had so much coming out, we struggled

We worked really hard on our website too. We built something world class and we're now known for this. It's a core part of our brand. We just do most pages better than the vast, vast majority of people on the internet. Design here has an _increasing_ return on investment once you're above average.

I fundraised so we could afford all of the above, but eventually we flipped to running near profitably and hiring more organically when we saw our revenue growing. This means we're never subject to the incentives of an external investor - so we can always ensure we ship more products. I think we could have entirely skipped fundraising or could have only done a seed round - I'd play this differently in future, now I have more confidence.

We hired a couple of folk into ops - a recruiter, an ops lead, an exec assistant and a VP Ops (who also leads sales and marketing, that's a topic for another day).

We scaled support. We got to 100,000 sign ups _before_ we added _anyone_ in support. The process evolved like this:

* My cofounder did all support
* Our engineers would rotate who did support
* Our engineers would rotate who did support on their products
* We hired a support engineer to answer and triage tickets for our mature products

It started feeling obvious we should have a small growth team too. We had to build a billing system that could cope with a different pricing scheme for every product, credits and much more. Plus we wanted to iterate our pricing over time, own and run experiments around our activation, and quite a bit more. 

## and there were are

There's a reason each step gets easier and easier - if you build something people want, the rest is kind of obvious. The problems get far more constrained. No more existential crises!