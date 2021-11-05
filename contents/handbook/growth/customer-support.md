---
title: Customer support
sidebar: Handbook
showTitle: true
---

## We aim to delight

You can build a good company by focusing on getting lots of customers. To build a great company, you must delight your existing customers. This means that the journey doesn't simply end once we sign up a user - even more important is to ensure that PostHog is consistently delivering value for them. 

## How we ensure customer delight at PostHog

### It's easy for customers to reach us

We have a few different routes for users to contact us. As an open source company, our bias is towards increasing the bandwidth of communication with our users and making it easy for them to reach us. We do not believe in putting up barriers by saying they can only reach us through a dedicated support email address, for example. 

These are the ways in which customers can currently reach us, in order of popularity:

- **Slack** - our active [PostHog Users Slack](https://posthog.com/slack) community frequently post questions
- **Email** - a user may email hey@posthog.com with a specific support query
- **GitHub** - sometimes users ask about the progress of [certain issues](https://github.com/PostHog/posthog) that are important to them

### Tutorials and workshops

Product analytics are only as valuable as the questions you ask. We’re committed to helping teams of all sizes learn how to ask the right questions to grow their product. To this end, we’re constantly producing new content in the form of [tutorials](https://posthog.com/docs/tutorials), [blog posts](https://posthog.com/blog), and [videos](https://www.youtube.com/channel/UCn4mJ4kK5KVSvozJre645LA). 

#### Product analytics worksheet
We've created a [Product Metrics Worksheet](https://docs.google.com/document/d/1mXKS08ngcJlbJdaYihikHO7RDY8dbxyChmsUneOwrfw/edit?usp=sharing) that systematically lays out how to define, implement, and track core product and business metrics (Acquisition, Activation, Retention, Referral, Revenue) all within PostHog.

This worksheet is available for everyone to use and is designed to help all teams (even ones that aren't using PostHog! *yet*).

For [Scale](/pricing#scale) customers, we include a complementary workshop where we work with all the stakeholders to go through this worksheet, define these metrics, and create dashboards in PostHog.

### No dedicated support people

We intentionally have not hired a single person dedicated to customer support. The direct interaction between our engineering team and our users is _hugely_ valuable, and an important part of building trust in our community is the ability for users to talk directly with the people who are actually building the product. 

Providing support is a responsibility shared across our team - we expect everyone to jump in and help a user if you see they have a question or problem (though obviously not at the same time!) Once you have made the initial contact or response, it is your responsibility to see it through or explicitly hand over to someone else if they are better-equipped to help. 

This does mean sometimes that, especially when we are particularly busy, customer success can take a bit of a back seat. 

This is why, in addition, one person takes on the **Support Hero** role each two week sprint. This is a rotating responsibility, where the person involved spends a significant chunk of their time responding to support queries across Slack, email and Papercups, and sharing that feedback with the team and/or building features and fixes in response. We have found that each stint as Support Hero has thrown up a lot of really valuable feedback. 

[Click here to see learn more about **Support Hero**.](/handbook/engineering/support-hero)

### Simple, lightweight tools

We go to where our users are. That means **we respond in the same channel that they reached out to**, rather than trying to funnel them somewhere else.

We use [Papercups](https://papercups.io/) as our internal platform to get an overview of our support requests. This ensures that we don't miss anyone, especially when their request is passed from one person to another at PostHog, or if they message us over the weekend. If customer success is part of your role, you should have received an invite to join as part of your onboarding - if you didn't, ask Charles. 

The first time you sign into Papercups, please make sure you include your name and [profile picture](https://posthog.com/handbook/company/team) so our users know who they are chatting to!

A quick overview of Papercups' main features:

- _Main conversations view_: when you sign into Papercups, you can either [view all conversations](https://app.papercups.io/conversations/all), or just those [assigned to you](https://app.papercups.io/conversations/me). If you are the first person to respond to a query, you will be automatically assigned that conversation. Don't forget to close a conversation by ticking the box in the top right when you are done, so we know which queries have been resolved!  
- _Slack integration (1)_: You can reply directly to PostHog app questions either in the Papercups app itself or in the private _customer support_ channel in the [PostHog Users Slack](http://posthog.com/slack) - both work.
- _Slack integration (2)_: In the PostHog Users Slack, messages posted in the _general_ and _feedback_ channels are also synced with the Papercups app. As above, this means you can reply to users in that Slack channel directly or in Papercups. Please try to reply in a Slack thread to any questions. This makes it easier for other users to navigate the channel without a lot of noise, and also prevents Papercups creating a new conversation for each response (as Papercups treats each thread in Slack as a conversation).
- _Email integration_: Any emails that come into hey@ get synced with Papercups and Slack, so you can reply on either of those platforms, or directly to the email. If you reply via email, please make sure you at least bcc hey@ so we know that someone has responded!
- _Notes_: You can leave a 'Private Note' in the right hand pane in Papercups if you need to make a note of something for future reference, e.g. a relevant GitHub issue.
- _Sharing_: If you click 'Share Conversation' at the bottom of the right hand pane in the Papercups app, you can link directly to a conversation. This is useful for sharing context with other team members.
- _Analytics_: 'Reporting' in the left hand panel shows some interesting analytics, such as how many queries we're receiving, average response time etc. We don't report on these yet as we're still figuring out the best way for us to do support. 

Papercups are an open source company, so if there are any additional features you'd like to see then you can check out their [repo on GitHub](https://github.com/papercups-io/papercups/issues). They are building new features quickly, so it's worth checking in to see what new functionality is available from time to time.  

## Some useful questions to ask

The below questions are evolving so please add more as they come up!

### Set up

- Has the customer logged in?
- Has the customer added their team?
- Are events coming into the platform on a recurring basis?
- Are identify calls being made so user profiles are being created?
- Are additional relevant user properties being sent?
- Has the customer set up actions?
- Has the customer set up funnels?
- Has the customer created or modified a dashboard?
- Has the customer used the toolbar?
- Has the customer gotten PostHog into production?
- If applicable, has the customer removed any test data?
- If applicable, is the customer using feature flags?

### Training and support

- Does their team have enough general product analytics experience?
- Has their team received a demo of the product?
- Has everyone on the team used the product at least once?
- Does the customer's team know where to find our use case guides?
- Have we told the customer where to get support?
- Have we set up a joint Slack channel with the customer?

### Providing more value over time

- Have we added their whole team to our email newsletter?
- Are we monitoring the customer's usage on a dashboard at a team level?
    - Is the customer generally above 80% usage for their current plan?
- Have we set up a quarterly catchup with the customer to talk about roadmap/issues/expansion?
    - Has their team had a good experience asking for help or reporting issues to us?
- Is the customer using PostHog on a weekly / monthly basis?
