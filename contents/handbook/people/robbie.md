# How we built web analytics
ALternative: Why product analytics are more expensive/harder than web analytics
Alternative: How we improved performance and pricing for web analytics
Why web analytics is 4x cheaper than product analytics

Last month we finally launched web analytics. You would think for a company that does product analytics, adding web analytics would be straight-forward and quick. Alas, this is not the case. It took @Robbie a year to get it done, and it's not because he's lazy. Product analytics fundamentally requires a different architecture to web analytics. I

Web analytics is a fundamentally different problem to product analytics. t's more expensive (4x more times expesnsive) and slower, which means we're less performance and more expensive than products that focus solely on web analytics (e.g. Plausible, Fathom. Add link to comparison)

In this post we dive into why that is and how we solved it so that we can price competitively to plausible and others.

## Web analytics vs product analytics
// todo make heading more interesting.

In product analytics, you're trying to understand how people are using your app. You care about things like retention, churn, feature usage etc.

In web analytics, you're trying to understand whose visiting your marketing website and how they're interacting with it. You care about things like page views, unique visitors,bounce rate, top sources of traffic, top pages etc.

The differences between these two means that in product analytics you care about **individual useres** and their behavior, so it's important to identify users e.g. B2B saas apps are interested in how admins use the product.

In web analytics you're more interested in their aggregate behavior (their identities don't matter). It doesn't matter who the users are, it's just about the data itself.

These differences mean that for product analytics it's important to identify and track individual users over time, whereas in web analytics you're only the current session and the user is not identified

<todo add diagram of events. For product you have person in the middle and events associated to them. In web analytics, you just have events with no person in the middle>

So web analytics is a different problem to product analytics.

The implications of this means that the cost of running product analtyics is higher, which leads us to the next higher

## 1. Why product analytics are more expensive than web analytics

## 2. Why product analytics perforamnce is slower

## Our solution

### 1. How we reduced costs

### 2. How we improved performance



## Why we didn't have it up until now

Higher expectations from users: Google analytics is quick, instant, and free. Whereas there was never an equivalent for google

Query performance. People have different expectations. For product analytics , it’s fine to wait 10s, because queries are more complex. Whereas web analytics queries are simpler, so the expectation from users is that its faster



We started as a product analytics tool

Most web analytics tools will use a lot of sampling. It easy for them to because their data-model allows. (How their database is laid out).
e.g. a users identity never changes over time. But in posthog you can identify, log out etc. So identity changes. So it’s much harder for us to sample.

Basically with Clickhouse, its OLAP database (online analytical processing database) versus OLTP which is like postresges. ITs very good at making changes at one row of data. You want this for apps e.g. change a user’s profile picture

Whereas with click house you can’t make really make changes to a single row, because everything is stored in a single block (called a granule) (which is read only), so you have change the entire block, which is an expensive operation 

The way sampling works is that it would pick 1% of the granules. The problem with this, is that if you wanted to sample by person ID, which changes 

OLTP have indexes. In Clickhouse you dont have indexes (you only have the order they are laid out. You only have one of these!)), you only have the order. So if the index was person ID. You would be able to sample, but only if it never changed. But if it’s an index it can’t change, because then it would move block, which is an expensive operation. 
So every time someone calls identify, we would have to rewrite tons of data 

So this is why its hard to do this sampling for product analytics tools

There are ways around it:
- E.g. limit how often and when you can call identify

**Why doesn’t plausible or vercel have this problem?**
They dont have a changing identity. You can’t have an identify function. So they can use user ID (called visit “hash”) as their sample key (the thing you are sampling by) 

Say person ID never changed, the person ID would be index.
Each granule has 8000 users. You would just use those 

IF something has an index, it shouldn’t change. In Postgres you can change index

So because we have a distinct ID with mappings .
You can’t use It for sampling. You’d chop user sessions . E.g. you’d get a session split when you call identify 

Without sampling, performance is worse. IT can be a lot. 

What sampling do they apply? Robbie will find out

Sampling is only applied at query time. But all events are captured. - https://plausible.io/docs/dashboard-faq#does-plausible-do-data-sampling 


## What is the difference and  between web analytics and product analytics

Myabe have a list of things web analytics cares about vs product analytics care about
e.g. which metrics, actions, visitors, bounce rate, churn .
For the web analytics, you dont need to identify a user. You can just use the session. For product naalytics, its important to know who the user is


Maybe we need a heading ## Why is there a differnece
- What’s the different between web analytics and product analytics
**The value of individual user is much higher product analytics than web analytics**


What exactly each are.
Why there is a difference between web and product costs (use OLAP database), but expesnive to write. ALso, sorting is hard. with multiple sessions


Web analytics is more standardized/opionated. So our user experience wasnt great
We’re known to be a complicated tool. Having web analytics means people can use posthog in minutes without having everything set up

Why can you be more opinionated with web analytics than product analytics? There’s more common ground. Product analytics are more bespoke to the product. Some may care more about retention, or activation. Whereas web analytics you kind of just care about number of users etc (look up this part in video of how Robbie phrased it)




## Problem 1 : Pricing

**How much does Postgres contribute to costs? Exactly percentages. Find out**


Why is it expensive to process profile 
- It’s hard to update things in click house and hard to do something that only affects one row (we talked about this earlier). So we store them in Postgres
    - Remember, reading and writing Is expensive because you need to read the whole block (granule) and then rewrite the whole thing)
- If you care about person processing, ordering matters e.g. you might have this event sets the initial URL, but this later event need to have that person properties 
- There’s also ways to merge users which can be difficult 
- Pipeline team can tell you. Basically it increases length of the cue
- Person properties can change a lot. It could be every event causes an update.
- They change every session. e.g. the most recent refferer changes. We store this in Postgres in and not in clikchouse
- TLDR: Postgres is extra work. A lot of the costs of the events come here. Why though? (Ask pipeline though)

our solution:
What breaks 
- So introduced anonymous events. Which doesn’t do person processing, so no Postgres. Which means it’s cheaper for us. 

**Since we dont need to set person properties (but we do still have other properties) on events themselves, we dont care about the order. e.g. in product analytics , you can filter events  by initial current url, but not possible in web analytics and you dont need it**

Plausible has session properties. They do it at session-level not person level.

Order of events doesn’t matter for session properties. We use click house for this. Session properties only change in a specific way. We either care first or last value. e.g. for referring domain, or session ending. Then we only care about first or last value.

For example, initial url example. (add diagram for this)


So introduced anonymous events. Which doesn’t do person processing, so no Postgres. Which means it’s cheaper for us. Up to 4x cheaper.


## Problem 2: Performance
Robbie built initalial dashboard to get a feel for it:
- Our starting point was bad. We just used 10 queries  with product analytics 

Build a dashboard.
e.g. make a graph of unique users. We can put topline stats, like (visitors, pageviews etc.). you write them using HogQL.
The first version was just a dashboard, which contained the same stuff. It was to get a sense internally if it was useful, the right direction 



### WHy we can't do sampling
- Sampling is the easiest way. That’s what plausible and vercel scale about 20 million page views.
    - This is next step. We need to figure out how to use sampling on an identity that can change. I think we can just store all the older data with person-ids . So we only sample older data but not newer one (so you can’t)

### What we did instead
How did you fix query performance
- Our starting point was bad. We just used 10 queries  with product analytics 
    - 
- Starting point was to play around with sampling, but we couldn’t use it for the reasons we discussed above. Session duration would be wrong.
- So I threw it out for now (and we don’t do it).. We still have to think about it for upgrade works for

- Then I created sessions table in clickhouse. Aggregate information for a single session - precompute it ahead of time. It’s faster to query since you dont need to query every event, you just look at the session. So you dont need to do this at query time
- This sped up some queries

- Next steps
    - Loading all the data on the page is one pass, instead of 10 separate queries
    - Combininng should take a bit longer (getting first data on the page), but massively speed up getting all data on the page

- Its twice as fast as it used to be

# End result

We should show pricing comparison on other websites