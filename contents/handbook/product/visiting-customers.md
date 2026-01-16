---
title: In-Person Customer Visits
sidebar: Handbook
showTitle: true
---

Right now, PMs conduct a lot of [remote interviews](/handbook/product/user-feedback) with customers about their specific products to bring context to their teams. As the number of PostHog products grows, and as customers increasingly use multiple products together, small teams risk developing a siloed view of how our customers actually use PostHog.

This matters because:

- We lose context on how customers use multiple products together to complete their “job to be done”.
- Teams optimize locally (their feature, their metric) and can accidentally degrade the cross-product experience.
- We miss expansion opportunities because we don’t see how multiple PostHog products are used in the wild.
- We miss important context on how to make a whole organization successful with PostHog, not just a single user or use case.

One partial solution is to **go meet customers in person.**  

The following is a guide to share what has worked, and what hasn't for others who might want to try this out.

## Setting up meetings

1. **Create an open flexible script.**  
   Develop a small, flexible set of questions related to your product area, but keep them broader than your typical product interview. Leave space to understand organizational dynamics, team workflows, and feedback across PostHog’s full product suite. 
   
    Feel free to use interview time to watch customers use PostHog directly, and ask them questions about why they take specific approaches as they navigate around the product.

2. **Pick a metro hub, and research potential customers.**  
   Choose a city with a good number of PostHog customers. Aim to identify ~12–15 customers across different sizes and maturity levels in that region. 15 may sound like a lot but you'll likely only be able to talk to 30% of these customers in the end. 
   
   You should do deep research on each account - take notes of which products, and features our customers are using Vitally (and of course PostHog). Who at those companies is using specific features and have a look a few session recordings. You should refer back to these notes before meeting the customer in person so you are informed.

3. **Coordinate with Sales and Customer Success.**  
   Post in the relevant Sales and Customer Success Slack channels about your plans. Tag the account owners for the customers you’d like to visit. Ask if it’s a good time to reach out, whether they have additional context, or if there are other relevant customers or prospects to reach out to as well.

    >  Hey @[sales/cs members] I’m visiting [City] in 2 weeks and would love to meet some of our customers in person. I was thinking of reaching out to [customer a], [customer b], [customer c] Is now a good time to chat with them? Any other company who uses [product] a good company to go visit?

4. **Join customer Slack connections.**  
   Introduce yourself in each shared channel. A good intro might look like:

   > 👋 Hey everyone! I’m [Your Name] from the PostHog product team — I’m visiting [City] next week and would love to meet some of our customers in person. If you’re up for a chat over coffee or lunch to share feedback on how you use PostHog please let me know

5. **Have your Sales owner tag relevant people** within the customer org in that Slack thread. When the account owner directly tags people, the response rate increases significantly. Here are some examples of what worked:

    > @[relevant customer member] any ideas on who from [customer] may be around and interested in this? We find this kind of thing to be pretty mutually beneficial for us to learn about your needs, but also to help shape our offering as well

    > @[relevant customer member], [Your Name] from the product team is visiting [City] next week. They can visit and help your team better get better set up with [products]
    
    > cc @[relevant customer member]

6. **Schedule meetings.**  
   Send calendar invites to everyone who responds positively. (We have typically found about 30% of outreach resulted in a meeting.)

7. **Remind participants.**  
   Post a friendly reminder in the thread a day before each meeting.

## Conducting meetings

8. **Be flexible.**  
   Some meetings will last 30 minutes, others 2 hours. Lunch-time slots often work well, you can grab food together, build rapport, and then dig in. If other posthog team members are free and local in the area and want to come along, feel free to bring them too.

9. **Bring merch.**  
   Small things like hats or shirts go a long way. Drop a message in [#merch](https://posthog.slack.com/archives/C04DWKH7DM3) and Kendal can help you place an order.


10. **Structure the time.**  
    An effective structure we found was:
    - 20 min casual lunch or intro conversation  
    - 30 min “enablement session” — A place and time for as many of the customers's employees to come ask any PostHog-related questions they’ve been holding onto  
    - 20 min focused discussion — Your prepared questions and reflections. If you have a enablement session you can often sneak these questions in while working with customers.

## After the meetings

11. **Follow up.**  
    Thank them for their time, and if the customers had questions you could not immediately solve in your in person meetings, message and tag employees at PostHog who could help.

12. **Reflect and Share.**  
    You should walk away with a much clearer view of PostHog from your customer’s perspective — not just how they use your product, but why they use PostHog, what types of questions or jobs they are trying to complete with PostHog, and how they use *PostHog as a whole.*

    Share this in the **posthog-feedback channel** or somewhere similar. Feel comfortable sharing a longform write up and tag people and teams that are relevant. Here's an abbreviated example:

    > I had the opportunity to meet multiple customers in person over the last few weeks. I went in with the intention of focusing on data pipelines and messaging. However, I was open to receiving feedback on our entire product suite. 
    > Two interesting customers were [customer a] [customer b]
    > [customer a] does xyz, and currently uses product analytics, session replay, data pipelines, and feature flags. I was able to talk to [customer employee name], who is the head of engineering, as well as another employee who ran a business unit. They were the power users. 
    > They use product analytics in two main ways:
    > 1. Business review. They had a high-level dashboard that was setup earlier and the leadership team would view it every single week, tracking changes in things like MAUs and other business critical product KPIs.
    > 2. Ad hoc product insights. If the GM of one of the product lines had a question that popped up in his mind, he would go to PostHog to try to answer it first.
    > They used insights and dashboards and were pretty comfortable with breakdowns and some of the more advanced features. However, interestingly, they did not use sql queries and they were not aware that you could even use sql either. 
    > Data pipelines was used to inform colleagues of high-value customer interactions in the product. This was done via a Slack destination. This is a very specific job to be done that I've seen in a number of other companies as well.
    > They were particularly interested in organization-level views, specifically:
    > - Organizations who have completed key events
    > - Organizations who have not completed key events
    > The primary complaint and frustration that they had with PostHog product analytics was that it was very difficult to search for people who have not done things or organizations where things have not occurred. 
    > I was surprised that both [customer a] and [customer b] did not know you can use sql insights with product analytics @product-analytics-folks
    > One other thing to note was both customers also did not know where they could find a list of all events, and definitions (I showed them the data management tab). One customer commented it would be good if AI added a description automatically of what each event actually signified, and if there were easy ways to delete old events. Data governance came up a lot even with this mid sized companies
