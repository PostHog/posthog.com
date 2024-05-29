---
date: 2024-05-28
title: What we built at our Mykonos hackathon
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - james-temperton
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/aruba/beach-hog.jpg
featuredImageType: full
category: Inside PostHog
tags:
  - Offsites
---

Each year, the PostHog team gets together for our all-company offsite. This year, we headed to Mykonos – not to rave, but to code. And to enjoy a cocktail or two in the sun, of course.

As a fully-remote company with 47 misfits spread across ten countries, our offsites are a vital part of our culture. They’re a great way to get to know colleagues better, and the connections formed during offsites bring extra energy and creativity to our work throughout the rest of the year.

Our all-company offsites are a mix of socializing, group activities, strategic sessions, Post-its, workshops, more Post-its, and, the star of the show, the annual PostHog hackathon. Everyone in the company has to pitch a couple of ideas, then we all vote on our favorites, assemble teams, and have a little over a day to go from pitch to demo. 

![PostHog's 2024 offsite in Mykonos](https://res.cloudinary.com/dmukukwp6/image/upload/hackathon2_3d7257a965.jpg)

In some cases, our hackathon projects are ready to ship right away. Some have even become core parts of our product – [session replay](/session-replay) started as a hackathon project, as did our [data warehouse beta](/docs/data-warehouse).

Here’s what we built in Mykonos.

![PostHog's 2024 offsite in Mykonos](https://res.cloudinary.com/dmukukwp6/image/upload/hackathon1_e2aa8bd928.jpg)


## The presidential briefing

<BuiltBy people={['Charles Cook', 'Eric Duong', 'James Hawkins', 'James Temperton']} />

![The presidential briefing](https://res.cloudinary.com/dmukukwp6/image/upload/hackathon_president_73aa5ced1a.png)


As PostHog grows as a company, keeping track of everything that’s happening will get harder. Yes, we [write everything down](/newsletter/remote-working) but that creates a lot of reading, and a lot of noise. The solution? An AI-generated briefing, tailored to each individual team member and their interests.

The presidential briefing was built by scraping PRs and issues from GitHub, along with Slack messages, and then training an LLM to understand what’s interesting and important. The bot then produces a pithy briefing that removes the noise and gives people just the information they need. 

In future, we’d want to add more data sources and build it using Llama to avoid the need to send any data to external companies.

### MykoLogs

<BuiltBy people={["Paul D'Ambra", "Tom Owers", "Ted Kaemming"]} />

MykoLogs is a logging product that integrates with the existing PostHog SDKs, bringing backend logs straight into a shiny new product on PostHog. The best part? You can link backend logs to session recordings through the user’s session ID – letting you debug what was happening on the backend during your user's API requests. MykoLogs plays nicely with all other PostHog products, meaning logs and session replay are now BFFs. Debugging has never been this breezy!

### Our own programming language

<BuiltBy people={["Marius Andra", "Anirudh Pillai"]} />

What’s cooler than having your own query language? Having your own general purpose programming language, of course. That’s literally what we built: PostHog’s first ever programming language, Hog. 

Things moved fast the week after Mykonos: we split up the existing product analytics team and built a new team to productize Hog. We plan to use Hog to build our CDP and messaging products, and might even pivot the entire company around it. It was just another PostHog hackathon, no big deal. Stay tuned for the aftermath.

### RealTimeHog 3000

<BuiltBy people={["James Greenhill", "Zach Waterfield", "Michael Matloka", "Brett Hoerner"]} />

Seeing people using your product live boosts dopamine levels. Probably. PostHog does that – but right now we keep you waiting a bit. Before a PostHog event is available for querying, it goes through our ingestion pipeline, where users are identified and the events themselves enriched. The process takes seconds, rarely a minute – a delay imperceptible in analytical queries, but a dopamine decrease in the live view.

Introducing RealTimeHog 3000, a [livestream](https://github.com/PostHog/livestream) service powering our first truly real-time view of user activity. The process is simple: 

1. Consume the raw events from the same Kafka topic as our ingestion service. 
2. Stream them to you ASAP using server-sent events. 

The lack of person data is a fair trade-off, because it doesn’t get more live than this. User activity appears within milliseconds of happening on the other side of the world.

Speaking of data being processed live, perhaps at some point you’ve wondered if PostHog actually scales, or just talks the talk. To dispel any doubts, we developed one extra feature: an anonymized stream of all events being captured globally, with only the geolocation included. Hundreds of thousands of events per minute, and they look great on a 3D globe on PostHog’s website, where each event is an arc from the user’s location to that of the relevant data center. Global scale, visualized for your pleasure.

![PostHog's 2024 hackathon in Mykonos](https://res.cloudinary.com/dmukukwp6/image/upload/hackathon3_0be5647083.png)

### SupportHog

<BuiltBy people={["Dylan Martin", "Tiina Turban", "Marcus Hof", "Neil Kakkar"]} />

Our support flow currently uses Zendesk and that goes through email. This causes three problems: emails sometimes bounce, there are long delays in checking emails, and it’s really clunky to add other team members via Cc. Simply put, it’s not the most optimal flow. 

Imagine if instead users could view and respond to their open support tickets without ever having to leave PostHog – well, that's exactly what we built.

But that's not all, if you're using Zendesk then you could, in the future, add this view to your customer-facing website with just a few clicks.

### The ~pyramid~ referral scheme

<BuiltBy people={["Ben White", "Raquel Smith", "Joe Martin"]} />

Everyone loves a pyramid scheme, right?! Wait, no, we mean a _referral program._ Ben, Raquel, and Joe worked together to build a referral product right into PostHog. This means we can offer sweet merch, platform credits, good vibes, and other things to loyal PostHog users who lure in their friends and family. 

What’s more, as the referral program product is built right into PostHog, you can build your own for your customers. The system is hooked up to Zapier to automate the process for redeeming codes making the whole thing a doddle. It’s not shipped yet, but we’re close.

### A/B TestHog

<BuiltBy people={["Ian Vanagas", "Juraj Majerik", "Lior Neu-ner"]} />


![A/B TestHog](https://res.cloudinary.com/dmukukwp6/image/upload/abtesthog_e3f93c1afc.png)

Want to know how to improve your website but don’t know where to start? You need A/B TestHog. Enter a website URL, click ‘Analyze’ and an ingenious generative AI system will give you a bunch of recommendations for what A/B tests you might run to take your website to the next level. These are all expertly authored by an AI, and include the goal metrics, secondary metrics, and guardrail metrics and detailed instructions of what to change for your test.

### 10x terms

<BuiltBy people={["Cory Watilo", "Andy Vandervell", "Fraser Hopper"]} />

![Terms, PostHog style](https://res.cloudinary.com/dmukukwp6/image/upload/hackathon_dpyay_53b6334a36.png)

Are you fed up with lawyers making everything so hard to understand? Are you fed up with those nerds in Brussels making us sign DPAs for everything? Not anymore! On PostHog.com, we’ve made all the legal stuff fun – and kept the lawyers happy.

First up, we summarized our [terms](/terms) and [privacy policy](/privacy) in plain English. You can still read the long, legal-y version, but it’s now way easier to understand what it actually means. And we didn’t stop there. 

Then we took on our data processing agreement, or DPA, to create a generator that makes this hugely exciting task even more fun. You can quickly populate your own form, select the data region, and, if you want, add some pizazz with fairy tale or Taylor Swift mode. DPA? [Try DPYAY!](/dpa)

### Managed Reverse Proxy

<BuiltBy people={["Frank Hamand"]} />

Everyone loves ad-blockers. But, for a lot of our customers, they stop data from reaching PostHog. You can already deploy a reverse proxy to PostHog Cloud to get around this, but it’s a somewhat convoluted process that requires you to jump through 16 hoops and login to AWS. [Our docs on this are great](/docs/advanced/proxy), but Frank decided to build a better solution.

During the hackathon, he built the reverse proxy functionality right into PostHog. The option is tucked away in the PostHog settings. Simply add in any domain you control and the system will spit out a CNAME that you then need to set in your DNS provider. Wait a few seconds for the update to happen and voila, the reverse proxy is live.

### HERMES

<BuiltBy people={["Annika Schmid", "Simon Fisher", "Mine Kansu"]} />

At PostHog, we love speaking to our users. Maybe a bit too much. Right now, our master customer interviews doc is 382 pages long and contains almost 200 user interviews. It’s a great resource, but it’s getting a bit unwieldy. But now we’ve entered a bold new era of feedback management at PostHog thanks to HERMES, or, snappily, Holistic Evaluation Repository for Managing Enhancements and Suggestions.

This is effectively a database of user interviews, showing who was interviewed, who they work for, what they do, how much they pay for PostHog, the products they talked to us about, and an AI-generated summary of our user interview notes. The database is searchable and you can easily add new interviews in a couple of clicks.

The database is linked right into PostHog, making it easy to see associated user and organization profiles. It’s also hooked into Vitaly, our customer success tool, to automatically pull in more customer and business information.

HERMES also uses ChatGPT to generate a summary of the features requested during the interview based on the human-authored interview notes. This makes it easy to share actionable feedback from users directly with the product team responsible for that feature. 

As part of the project, we also revamped our system for categorizing and tracking feature requests from customers, making it easier for us to see what people want and prioritize the most important product work.

### Data crunching

<BuiltBy people={["Sandy Spicer", "Tim Glaser"]} />

![Data crunching](https://res.cloudinary.com/dmukukwp6/image/upload/hackathon_datacrunch_525d9e362b.png)


PostHog crunches a lot of data – and sometimes queries can take a while to load. To help users better understand the hard work we’re doing when they make a query, we built a loading bar that shows statistics on the data we’re crunching, and the CPU we’re throwing at each query. The loading bar is fake right now (sorry!), but the data we show is very much real.


### VIP customer lookup

<BuiltBy people={["Simon Fisher"]} />

When a customer reports a problem, we want our engineers to get it fixed as soon as possible – but right now our engineers lack context on which customers to prioritize. Right now, they ping our customer success team on Slack for details on accounts. This isn’t good practice in an [async company](/newsletter/how-we-work-async), especially when this information is already written down somewhere.

Enter the VIP Customer Lookup bot. Ping this clever little Slackbot with any customer ID and it’ll return key details of any account, including the plan they are on, how much money they spend, and who on customer success looks after the account.

### CLI

<BuiltBy people={["Manoel Aranda Neto", "Daniel Esneider"]} />

We build products for engineers, so there’s nothing better than bringing PostHog closer to their natural environment: the terminal.

The PostHog CLI is a command line that allows users to do a few things that are normally tucked away in the PostHog app: creating, reading, updating, deleting, and enabling or disabling feature flags, for example. The PostHog CLI authentication flow is also seamless as it spins up a new browser and allows you to log in with your SSO instead of copying and pasting tokens manually.

In the future, the CLI could be expanded with more features such as creating surveys, and events, installing SDKs automatically, uploading debug symbols, using the CLI as a package, or even as a GitHub action. And, even better, you could do all of that with natural language, no need to memorize all commands by heart.

### 4 years at PostHog

<BuiltBy people={["Coua Phang", "Kendal Hall"]} />

We’re still a young company, but some of our wonderful team members have now been with us for four years or more. So we want to celebrate them. Coua and Kendal came up with a great anniversary gift scheme, meaning our longest-serving colleagues get something special to celebrate. 

This year, Marius, Eric, James G, Lottie, Charles, and Michael all celebrate four years at PostHog and will get to pick between a fancy luggage set (handy for traveling to all-team offsites and other PostHog meet-ups) or a James Hawkins-approved coffee machine.

### Forbidden secret project

<BuiltBy people={["Lior Neu-ner", "Annika Schmid", "Mine Kansu"]} />

If a spinning globe of PostHog events doesn’t convince you we can sell to big enterprises, then our top-secret hackathon project absolutely will. If we ever ship it. Lior, Annika, and Mine use some generative AI magic to create some inspirational quotes from our fearless leader, James Hawkins. 

Soon, when you click on James’ face on our [careers page](https://posthog.com/careers) he’ll deliver some inspirational zingers that he may or may not have never actually said: “Success isn’t just about getting it right, it’s about crushing every misstep. Embrace the grind, celebrate the wins, and conquer the challenges. Challenges are just opportunities in disguise. Turn setbacks into comebacks and keep pushing forward.” Quick, someone get this on LinkedIn.
