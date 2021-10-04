---
title: 3. Getting Started
sidebar: Handbook
showTitle: true
hideAnchor: true
---

## First goals

1. Set up your dev environment and configure with your IDE
2. Get PostHog running locally on Postgres: [http://localhost:8000](http://localhost:8000). You'll need postgres, redis, celery, and django running.
3. Successfully run PostHog tests: `bin/tests posthog` (which omits ClickHouse tests)
4. Create [your first PR](https://github.com/PostHog/posthog/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) 
   and have it be approved. If you work for PostHog someone (Tim or small team lead) will suggest the 
   first assignment.

If you work for PostHog, check this [GitHub Setup advice](/handbook/engineering/notes/github)

## Suggested learning roadmap

1. [Setup your local dev environment](/docs/contribute/developing-locally)
2. Ask your [PostHog Buddy](/handbook/people/onboarding#posthog-buddy) for a product walk-thru. It's important to get to know the product you are building. I recommend doing this before you become deeply involved in it's internal design. This is a great time to view our product through the eyes of our users.
3. [Review PostHog Project structure](/docs/contribute/project-structure)
4. Learn [React](https://reactjs.org/docs/hello-world.html), [Redux](https://redux.js.org/introduction/core-concepts), and [Kea](https://kea.js.org/docs/introduction/what-is-kea) - If you're experienced with frontend frameworks I suggest going directly to Kea.
5. Take a brief overview of [Python](https://learnxinyminutes.com/docs/python/).
6. Complete [Django Tutorial 1-5 of 7 parts, skip 6+](https://docs.djangoproject.com/en/3.1/intro/tutorial01/). If you're interested in learning more about Django, pick a copy of [Django book](https://www.feldroy.com/products/two-scoops-of-django-3-x). The company will happily pay for this since they [believe in training us to do our jobs with excellent](https://posthog.com/handbook/people/training). Great place to work, right?
   
**[Next: Developer Workflow](developer-workflow)**

