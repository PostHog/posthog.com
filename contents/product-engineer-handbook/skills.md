---
title: Things product engineers need to know
sidebar: #TODO
showTitle: true
---

Product engineers are T or M-shaped people – i.e. engineers who have deep knowledge and experience in one or more areas, and broad knowledge of several others.

Some will be better at [talking to users](/newsletter/talk-to-users) than others. Some will be stronger at data analysis. Some will be stronger on the front-end than the back-end.

You don't need to be an expert in everything to be an effective product engineer, but you do need to be proficient in most, and willing to learn the things you don't know. 

Being a fundamentally sound engineer is table stakes for any aspiring product engineer, so this chapter is mostly about less obvious, non-technical skills and knowledge.

## 1. How software businesses work

As a product engineer, you should have a high-level understanding of how software businesses work, so you can properly understand the context in which you're building, and ultimately make good decisions about what to build.

This starts with understanding basic concepts like [product-market fit](/founders/product-market-fit-game), and the difference between an [ideal customer profile](/newsletter/ideal-customer-profile-framework) and a [user persona](/product-engineers/how-to-create-user-personas). It also includes the business metrics that imply or predict the success of a product, like net revenue retention.

You don't need to be an expert in these things or, god forbid, have an MBA, but you do need to understand them at a high level, and actively care about them.

## 2. How to write well

The role of product engineer isn't just about writing code. Writing skills outside of code are often just as important.

A product engineer should be able to write persuasive RFCs to help guide decisions, [coherent goals and plans](/newsletter/quarterly-planning-mistakes), [actionable feedback](/newsletter/how-to-give-feedback), and [helpful documentation](/newsletter/what-nobody-tells-devs-about-docs).

Honing your writing skills means you can work [more asynchronously](/newsletter/how-we-work-async), so you can spend less time in meetings and more time building.

Some engineers might deem this a nice-to-have rather than a must-have skill, but it's essential for a product engineer to have a meaningful impact.

## 3. How to solve real world (and code) problems

Product engineers don't just fix code problems. They fix product and business problems, too. This can take many forms, such as:

### Uncovering and fixing technical issues

Product engineers need to be comfortable using the full gamut of tools available, such as [error tracking](/docs/error-tracking), [logging](/docs/logs), performance monitoring, user feedback, and more to diagnose root causes and find solutions.

### Solving customer problems directly

At its core, being a product engineer is about being obsessed with solving the hair on fire problems of real users, so you need to be comfortable dealing with them directly, digging deep into their real problems, and finding solutions that help them specifically *and* all users generally.

### Decoding growth problems

Sometimes the problem isn't "why does this feature not work?" and more like "why is no one using what I've built?". The job of a product engineer doesn't end with shipping the thing you've built. You also need to own the growth of the products you work on, and constantly look for ways to [increase adoption](/product-engineers/fixing-growth-problems) – e.g. by improving onboarding flows.

This is what "engineering every aspect of the product and what makes it successful" is all about. Product engineers are world-class problem solvers. Sometimes those problems are technical ones, but often they're the real-world problems of users, or business problems only they can solve.

## 4. How to use analytics to understand product usage

If you're going to do the above, you need to be comfortable doing your own analysis. 

At a bare minimum it means you:

* Are familiar with analytics tools, like PostHog's product analytics  
* Can pull together a basic tracking plan for custom events and properties  
* Can explain the most important user events for your product and why  
* Are comfortable creating high-level trend, funnel, retention insights for their product  
* Regularly watch replays of user sessions to understand how they use the product

 At a more advanced level, it could mean:

* Performing deeper analysis by joining multiple data sources  
* Running growth reviews for the products and features you own  
* Writing custom SQL queries to [track activation for their product](/newsletter/wtf-is-activation)

Product engineers don't need to be data-led per se – over relying on data for decisions is a bit of a red flag, actually – but you do need to be comfortable using data tools, and digging into product usage data when it makes sense to do so.

Product managers can and should support this work, but product engineers shouldn't be wholly reliant on them to gather actionable insights. See [The product's engineer's role in the product team](/product-engineer-handbook/product-engineers-vs-product-managers) for more on how product engineers and product managers can work together.

## 5. Technologies beyond languages and frameworks 

Product engineers work across the entire product, which goes beyond traditional tech stacks, so you should know how to:

* Deploy and monitor services on AWS, GCP, Azure, Vercel, etc.  
* Manage databases, define data models, and optimize query performance   
* Maintain reliable CI/CD pipelines and observability tools  
* Create UIs and designs that are good enough for production  
* Code the core business logic behind billing, permissions, and data collection  
* Integrate APIs and external services with third-party systems like Stripe or Sendgrid  
* Implement customer flows for onboarding, support tickets, and feedback collection

You don’t need deep specialization everywhere, but you do need enough knowledge to move quickly and make informed trad-offs. To put it another way, you need to know enough about these things to be "dangerous". 

Product engineers also need to be practical about choosing the best tool for the job. Sometimes that might mean adopting a new technology, but often it means adopting the boring tech that's well understood, so you can ship something good quickly.  

## 6. Coding with AI

Semantic arguments about what constitutes vibe coding and "real engineering" are a distraction. Ultimately, we're careening toward a future where a majority of software code is AI assisted in some form, and anything that helps a product engineer iterate faster is something you should embrace.

This doesn't invalidate engineering skills and knowledge because not understanding the code an LLM writes is an antipattern. A bad one. Understanding the proper architecture of a software project protects you against the decision-making of the robot. This skill is more essential than ever.

Ultimately, coding with AI is a specific and vital skill because AI can either help you solve problems, or be an active hindrance if used in the wrong way.

## 7. Basic design and UX fundamentals

Product engineers don't need to be genius designers, but you need to be a competent frontend developer with taste and the ability to create coherent user experiences.

This is important because a product engineer should be able to ship without a designer in the loop. At PostHog, designers only get involved in the later stages of feature development, when they want to finesse the experience, or when specifically asked for their input to unpick a difficult design problem.

This isn't without its drawbacks, but you can't be an effective product engineer if you can't ship good experiences autonomously, and this requires an understanding of [basic UX principles](/newsletter/good-taste-great-products) and the ability to ship good user experiences.

## 8. How to safely test in production

The ability to [safely test changes in production](/product-engineers/testing-in-production) is a fundamental part of being a product engineer.

This *does not* mean committing to main every time you make a change, randomly clicking around once the code releases to make sure it works, or shipping code into production without testing it.

It *does* mean using techniques like:

| Real user monitoring | Tracking app, query, and site performance, as well as error rate and logs.  |
| :---- | :---- |
| **Load, spike, soak testing** | Planning for scale by checking code for issues and performance when under a high volume or stressful load. |
| **Shadowing, mirroring, dark launches** | Evaluating new code with duplicated or mirrored production data hidden or separated from users. |
| **Integration testing** | Checking services, features, and infrastructure work together once deployed. |
| **Alerts** | Notifying relevant team members when issues and errors occur. |
| **User analytics** | Uncovering how users are using a product with analytics, session replays, and A/B testing. |
| **Feedback and surveys** | Gathering qualitative feedback about how users' experience with the product. |

And, of course, it requires a familiarity with feature flags tools, and [feature flag best practices](https://posthog.com/docs/feature-flags/best-practices), to make this all happen.

Why is this important? Two reasons, one practical, one philosophical:

1. Testing in production reveals problems with code not surfaced by local testing, so you can find problems and fix them faster. Product engineers should always be optimizing for speed, so testing in production unlocks gains here.

2. Testing in production gets features into the hands of real users faster. Ultimately, a product engineer learns by iterating on user feedback as quickly as possible. It's always best to test the earliest viable version of something with a real person, and testing in production makes this easier.

No matter how hard you try, it's impossible to create a development environment that perfectly mimics the real world.

## 9. How (and when) to run experiments

Product engineers need an experimental mindset generally, so it's useful if you can learn how to run successful product experiments. 

This means being familiar with product experiment tools and core concepts, such as [how to write a good hypothesis, best practices](/newsletter/what-we've-learned-about-ab-testing), and when it's useful (or not) to run an experiment in the first place.

It's an antipattern to test every change you make – it's often best to just ship something – but a product engineer who is comfortable running product experiments is a hugely valuable addition to any team. 

## 10. How to give and receive feedback

[Giving good feedback](/newsletter/how-to-give-feedback) is important in any role, but it becomes acutely critical when you remove processes and rely on trust and feedback to guide people.

Whether it's code reviews, UX feedback, or feedback on plans and goals, a huge part of being a product engineer is [understanding when feedback is useful](/newsletter/collaboration-sucks), and delivering it in a way that it's heard.

Likewise, a product engineer needs to be great at hearing the substance of feedback and digging into root causes, whether that feedback is coming from users or their colleagues.