---
title: How to create great user personas
date: 2023-11-02
author: ["lior-neu-ner"]
showTitle: true
rootpage: /blog
sidebar: Blog
hideAnchor: true
featuredImage: ../images/blog/experiment-hog.jpg
featuredImageType: full
tags:
  - Surveys
  - User research
  - Product engineers
  - Product
---

## What are user personas?

User personas are a generalized way of understanding and talking about the people using your product. This enables you to empathize with them and focus on their needs while you're building for them.

This is different from other personas, like buyer personas or ideal customer profiles (ICPs), who may not actually use your product. 

Here's a quick comparison:

- **ICP:** Customers (companies, teams, or individuals) that buy your product.
- **Buyer:** The person who sign off on the purchase.
- **User:** The people who actually use your product. 

As an example, here's how these different personas look like for our product:

![ICP vs buyer persona vs user persona](../images/blog/how-to-create-personas/posthog-personas-compared.png)

## What makes a good user persona?

A great persona needs three things:

1. **Job Summary** – your user's skills and responsibilities. 
2. **Motivation** – what their goals are.
3. **Frustrations** – what's blocking them from achieving their goals.

If it helps you visualize your user, you can also include other information such as workflows, tools, or jobs to be done.

Below are three examples of what user personas could look like for different companies:

1. **Vercel**'s primary user persona are front-end developers who want simple solutions to deploying and hosting apps.

![Vercel user persona](../images/blog/how-to-create-personas/vercel-persona.png)

2. **Github's**'s primary user persona are software engineers who want an easy way to maintain and collaborate on code.

![Github user persona](../images/blog/how-to-create-personas/github-persona.png)

3. **Asana's**'s primary user persona are project managers who want track tasks and deliver successful projects.

![Asana user persona](../images/blog/how-to-create-personas/asana-persona.png)

If you're looking for more examples, GitLab has published the [16 different user personas they use](https://about.gitlab.com/handbook/product/personas/).

## How to build a user persona step-by-step

### Step 1: Speak to your users

Here are three key questions you need to ask your users:

1. What is your job title?
2. What are you using [name of your product] to do right now?
3. What obstacles do you face when trying to achieve your goals?

This will tell you you who your users are, what motivates them and what their problems are.

The quickest and easiest way to ask these questions is with an [in-product survey](/surveys):

![Example of in-product survey to create a user persona](../images/blog/how-to-create-personas/survey-personas.png)

If you need to go more in-depth, you can also conduct interviews with your users. Good questions to dig into in these interviews are:

- What are your main responsibilities in your current role?
- How do you define success in your role?
- Can you walk me through a typical task or project from start to finish?
- What problem does our product solve for you? Which problems doesn't it solve?
- Why is [name of specific feature] important for you to complete specific tasks?

> Need more tips on how to interview your users? We've written a guide on [how to uncover your users' real problems](https://newsletter.posthog.com/p/how-to-uncover-your-users-real-problems)

### Step 2: Distill their answers

Once you've spoken to your users, the next step is to reshape their answers into something that's easier to understand. 

Do this by grouping responses into categories. What you're looking for are themes in their responses – specifically where 50% or more of users highlight specific problems or needs.

For example, let's say you're building an email client. You ask your receive what obstacles they face when trying to achieve their goals and here's what they:


| Job title | Participant’s answer | Themes |
|--------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|---------------------|
| **CTO** | I get distracted by too many non-priority emails that appear at the top of my inbox. | Email overload, prioritization |
| **CEO** | Notifications don't work properly, so I miss important updates. I end up prioritizing the wrong work | Missed information, prioritization |
| **Founder** | I feel overwhelmed by the volume of emails I receive daily. It's hard to prioritize tasks. | Email overload, prioritization |
| **Developer** | The search function in my email client is too slow, making it hard to find old emails. | Slow search |
| **Head of Product** | Due to the high volume of status updates I get via email, it's challenging to understand the overall project progress. | Email overload, project management |


In the above, we see that your core users are **senior leaders** and the two most common themes are **email overload** and **prioritization**. Thus you'll include this in your user persona.

### Step 3: Combine your data with product analytics

Now that you have your qualitative data, you can combine it with quantitative data to paint a clear picture of your who your users are. 

Product analytics unlocks key insights into how users that match your user persona are using your product, and whether their stated problems and behaviors align with real-world usage.

For example, continuing on our previous example of an email app, we could use product analytics to answer the following questions:

| Theme: Email Overload    |
|----------------------------------------------------------------------------------------------------|
| How many emails do these users receive every day?                                                          |
| How much time do they spend in the app compared to other users?                                    |
| Which folders or categories have the highest volume of unread emails?                              |

| Theme: Prioritization    |
|----------------------------------------------------------------------------------------------------|
| What percentage of users who mention "prioritization" use features related to sorting or flagging emails? |
| Are there features within the product they aren't using that could help address this problem?      |
| How frequently do these users set reminders or snooze emails?                                      |

To help you brainstorm questions to ask for your own product, here's a list of common insights to dig into:

- What percentage of your active users match your user persona?
- How often do they use your product?
- What are their most used features?
- Which features are rarely or never used?
- Are there common drop-off points or areas of friction?
- How do users from different job titles or roles use the product differently?

> 💡 **PostHog Tip:** If you're using PostHog, you can use filters to create a [cohort](/docs/data/cohorts) of users in your user persona. Then, you can easily breakdown your insights using this cohort.


### Step 4: Create a user persona with your findings

The final step is to use what you've learned about your user and create a persona. Summarize your findings into the three key categories we mentioned earlier (job summary, motivations, and frustrations).

Your summary should be detailed enough that it accurately represents your user, but concise enough that it's easily understood by your team.

To illustrate this with an example, below is the completed user persona for our example email app. We created this persona after learning that:

- Our key users are senior executive.
- Email overload is their biggest pain point, and so prioritization is important to them.
- People who complained about email overload were receiving 100 emails a day.

![The user persona for our example email app](../images/blog/how-to-create-personas/email-app-example-persona.png)

> FAQ: How many users is enough

## Next steps

Your user persona is the voice of your user. It should guide your product development and company strategy. 

Incorporate them into team meetings and encourage your team to always ask, "How will this benefit our key user personas?". By doing so, you build a culture of empathy for your users, ensuring that you can build the best products for them.

## Further reading

- [10x engineers talk to users](/product-engineers/10x-engineers-do-user-interviews)
- [How to turn user interviews into actionable snapshots](/product-engineers/interview-snapshot-guide)
- [How to write great product survey questions (with examples)](/product-engineers/product-survey-questions)
