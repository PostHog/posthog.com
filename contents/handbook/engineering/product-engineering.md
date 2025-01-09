---
title: How to do product, as an engineer
sidebar: Handbook
showTitle: true
---

## Good product engineers, bad product engineers

**Good product engineers:**
* Ship quickly so they have a fast feedback loop
* Understand the company strategy, and prioritize based on this _and_ what they believe users want
* Can easily propose ideas for what to build
* Make sure the things they've built are being used
* Follow up after they've built something to improve it if needed
* Are good at descoping things and getting products or features into people's hands quickly
* Have users that they're friendly with
* Manage to build things without lots of internal meetings

**Bad product engineers**
* Consider research something that takes two weeks rather than two hours
* Can't explain our company strategy
* Can't explain who their product is built for
* Don't know their product's competitors
* Only work on things they've been told to work on
* Don't know the names of any of their users
* Never challenge why they're being told to work on something
* Don't talk to users about what they're going to build, or what they've built
* Don't track if the things they've built are being used
* Spend 6 months on a huge feature before a user can try it
* Never remove features or complexity, often by shipping features that aren't used and leaving them
* Focus on internal alignment over company strategy and what users need

## How to

### Validate ideas

Despite what the industry tells you, it's debatable how well you can validate ideas up front (see: the number of startups that think they'll succeed based on user interviews then find they can't get any users). Just shipping is often the best way to validate an idea. When we built PostHog, Tim and James had to pivot 5 times – despite getting positive feedback on new ideas almost _every time_. Talking to users upfront can probably help remove totally stupid ideas fast, but for the majority of ideas "this could work", it only has a limited amount of benefit in our experience.

This gives you the best evidence (do people _actually_ use it, and what do they think), but _potentially_ at the highest cost as you have to build it! The challenge with this approach is making sure you de-scope the first version of the product or feature enough that users will at least try to use it, so you get enough signal that they care, without damaging our brand because the experience is so poor.

So, when you ship something:

* Consider what you are trying to learn (if anything, importantly – many things are so obvious like fixing a well-defined bug, you aren't trying to learn anything) product-wise.

* Descope it as much as possible to reduce the cost _you_ incur upfront of building it.

* Judge for yourself if and how to limit brand damage (your options are one or more things like - internal use first, a feature flag rollout, messaging a couple of friendly users, not marketing it or limiting the marketing, or shooting for Minimum Lovable Product instead of Minimum Viable Product).

* Follow up... figure out if / why it is or is not being used, and iterate. If you've shipped early, it'll be crappy so _will need more work_ as you figure out what users want.

Just shipping makes sense when it's very obviously in line with our company strategy (which is generally proven), and you can descope it successfully. This is almost _everything_ that you may ever build here. The key is to manage the rollout carefully.

Products at PostHog generically go through three phases, and considering your phase is important when you ship new features:

#### 1. Pre PMF at PostHog

* We only build things that _already_ have successful competitors with real revenue. The implication is that "just build it" works disproportionately well because other people have already figured out that new product X has product market fit.

* The challenge is therefore figuring out if _PostHog's_ users base will want the new product, as we already know the product is useful.

#### 2. Figuring out PMF at PostHog

- This is where we are getting our very first paying customers.

- The product focus is making sure people are _delighted_ with the above features. Maybe there are bugs or maybe there are too many gaps with competitors still for people to pay. Focus on how happy users are and why / why not. Keep an eye on early revenue data too - are people willing to pay, or are they churning?

#### 3. Post PMF at PostHog

* This is where we're scaling the number of free and paid users.

* Features at this stage either fall into:
  * (i) gaps with competitive products that we've not prioritized so far, probably based on feature requests from users, in which case the risk of them not being useful for users is prettty low or...
  * (ii) totally innovative things like new UX driven by our take on AI, or a new way to access data (like Hog or HogQL), or an integrated experience that no one else can offer because they don't have all the tools in one. In these cases, it is _more important_ to consider how your products are being used as you are more likely to build something that isn't useful (but at this stage, it's fine and encouraged to innovate)

There are plenty of other techniques, that you can do in parallel to get a signal on a new idea:

* **Use the public roadmap.** If you have a rough idea, create a GitHub issue and create an item on posthog.com/roadmap. This will gauge demand.

* **Ask internally for help.** There are lots of people that can help you. The CS team talk to users all the time, the support team have a strong sense of pain points, other product engineers have all talked to users, James and Tim have a broader view of how PostHog is doing, the marketing team can help you get usage or validate demand.

* **Interviews.** Our Product Managers regularly run interviews, ask to be included and give a heads up what you're trying to learn about, or just message users directly! You can even embed your calendar in our surveys product to book your own user interviews. You will need lots of existing potentially relevant customers for this to make sense, since response rates are typically low.

* **Listen to the internet.** We have a #brand-mentions channel in Slack that monitors for social mentions by customers, or get us to post a question here if you need.

* **Seek internal feedback.** We dogfood all our own products to grow our company, so ask for _internal_ relevant users.

### Ship things iteratively and follow up

* Use staggered rollouts: we have a product _designed_ to help you do this. Depending on how risky a new feature is, start with internal users, or 
* Data: check if the thing you just built is being used. Remember to add some events.
* Session replay: watch users using your thing. This can often highlight confusing UX.
* Interviews
* Support
* Listen to the internet

### Iterate with users

A note on attitude first - any kind of feedback, bug report, complaint or usage is a gift from users. It's easy to get dismissive or frustrated when people don't "do what we want"! Worst case scenario is that we get ignored.

Handling users well is really important. If we do a good job responding to feedback:

1. The product improves because we do a better job at building what users want.
2. We get marketing benefits because the user will be impressed and will tell their friends.
3. We get more feedback because it teaches people that we listen and that we care.

Tone matters a lot. Whenever you are messaging a user, please consider:

* They're on the internet, so you are competing with cat videos. It better be compelling.
* They receive loads of outreach from people. If you send something generic, it will get auto filtered out by their brain.

So, how do you make yourself compelling to engage with?

The tone is your starting point. Send something informal and human. You are explicitly trying to avoid sounding like a mega corporation that treats users like numbers. You are a human, your users are human. Be friendly, light hearted and fun. Make it clear the message isn't automated if you can.

If you _must_ automate messages for whatever reason, make them quirky and informal and human. "Yo I'm Manoel, my job at PostHog is making sure mobile users are happy. It looks like this includes you! I build X, Y, Z here – is there any chance we could talk about X new thing? Here's my calendar or respond and we'll find time!" sort of vibe. Don't make messages long if you want people to do something – one or two sentences.

The medium matters. The easier something is to spam, the harder it is to get hold of people. For example, email gets ignored far more than Slack or X.

Response times are very important. If you can catch someone _whilst_ you're top of mind, you are likely to get 20x the response rate. That means within a minute or two of receiving a message. There is a huge drop off if you don't respond for 30+ minutes. Obviously this isn't always possible, but take opportunities if you happen to be online at the same time as someone you need feedback from. I once ran a call center – if we phoned someone who made an enquiry within 5 minutes, it was 9x more likely we'd get hold of them.

Closing the loop is the final point. If a user gives feedback or asks for something, you should ultimately respond with:

* A PR (which will likely delight them)
* A roadmap item / issue they can follow (hey this is awesome, I want to do it, this is so you can follow progress)
* A reason why we can't do their thing

Closing the loop with the above shows people we've listened and considered their points carefully, and that we respect their opinion. This means they will continue to give us feedback.

### Talk to users

If you're talking to a user, there are some basic principles if you want to be a good product engineer.

Use a lot of open ended questions. Ask things like:

* Do you understand your user behavior? Why / why not?
* What do you want to know about how a feature is used?
* If I could build one thing for you right now, what would it be?

Look for evidence that users have _actually done anything_ about the problems they say they have. 

People want to be likable, so they'll often say they want what you're working on, even if they don't. Lots of features or products are nice-to-have versus must have. When something is a nice-to-have, people will act interested but won't get around to actually using it. 

Ask things like:

* Have you tried to solve this problem before? What did you do?
* How important is this issue compared to other things you have to work on?
* Has your company spent money trying to solve this before?

[Write down every interview](https://docs.google.com/document/d/1762fbEbFOVZUr24jQ3pFFj91ViY72TWrTgD-JxRJ5Tc/edit). This helps us come back as the rest of the team, or you, consider other products or features in future.
