---
title: How Gankster leveled up retention with Max AI
customer: Gankster
logo: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/gankster_0cb7aed231.png
logoDark: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/gankster_0cb7aed231.png
featuredImage: >-
  TBD
industries:
  - Gaming
users:
  - Engineering
  - Growth
  - Marketing
toolsUsed:
  - Max AI
  - Session replays
  - Product analytics
date: 2025-06-15
---

If you’ve ever played League of Legends with randoms then you’ll know exactly what we’re talking about when we say that competitive gaming communities can be unpleasant places to be. Thankfully, Gankster is on a mission to change that by helping like-minded players connect in games like DOTA2, Valorant, and Rocket League. 

“You can look at us as a social network for gamers,” says Gankster CTO and co-founder, Idan Amir. “Gankster is the place you go to find someone you actually want to play with in games like Fortnite or League of Legends. You can, for example, rate the people you play with after a match and screen teammates so you don’t end up playing up with someone who always bails after 5 minutes.”

This matters, says Idan, because as a data-driven team they’ve discovered players have a +24% chance of winning a game if they play with people they actually know.

“We’re incredibly data-driven,” agrees co-founder Dan Rosenhain. “That was actually how we discovered PostHog too. I was looking for a lightweight, self-hosted analytics solution — but I quickly realized a cloud solution would work better and that we needed more features. Since then, PostHog has become a core part of how we operate.”

### Using product analytics and session replays together

After adopting PostHog for product analytics, Gankster’s usage quickly grew as the team took advantage of how interoperable PostHog is. Session replays, for example, enable the team to jump effortlessly from a chart of events to a video of that event occurring — giving them a contextual understanding of what the data says. 

“We’ve started doing more with A/B experiments too,” says Dan. “Lately feature flags have become very important for us too and we use them for rolling out translation features because we can target the flag by geo. We also use them to control how adverts are displayed on our free version, or to target new releases by cohorts.”

Cohorts are especially useful for Gankster, as every time the team launches a new feature they’ll set up cohorts to segment users by their adoption rate and discovery path. Armed with this, Dan can create insights to track retention and discover new opportunities. Often, he uses SQL insights to create bespoke visualizations. 

“SQL is a pain sometimes,” admits Dan. “We have a shared Slack channel with PostHog engineers for support questions and I often hammer them with questions so I can identify how we can best hook in new users. Max AI has made this a lot easier lately though.”

### Improving user retention with Max AI
Max AI, the AI product manager available both in PostHog and our docs, can quickly draft SQL queries for Dan, as well as search existing insights or create dashboards. Like other AI tools, it isn’t perfect — but for an engineer like Dan who can validate the work it’s an effective shortcut to the information he needs. 

“I get close to breaking up with Max sometimes,” says Dan. “Yesterday we had a rough day together trying to make some particularly big queries. But it’s still in beta right now and it’s recently been getting a lot better.”

Creating insights in this way, the team has found some surprising ways to boost retention. Analyzing active users, for example, recently revealed an unexpected nuance that led to changes across the entire sign-up flow.

“Users basically have a choice when they start to either create a group, or join one,” says Dan. “We found out that users who create groups tend to make a lot of noise and then leave, but the people who stick around are the ones who join a group. Our most loyal users are the ones who join more groups than they create.”

In other words, while creating a group might seem like a more intentional user event, what actually matters is the speed at which Gankster can create a positive experience. 

“So, we shifted things around. We made it _harder_ to create a group where before it was very easy. We added more friction there and added automations so it’s faster to get into a game after signing up. This led to a huge bump in our retention rate, with a flat 5% improvement across the board.”

“We’ve made these sort of discoveries multiple times thanks to having all our data in PostHog — and this is why we’re always so data driven. When you’re making changes that drive a 5% improvement, you only need a few wins before things really start to snowball.”
