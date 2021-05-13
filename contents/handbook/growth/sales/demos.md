---
title: Demos
sidebar: Handbook
showTitle: true
---

## Giving great demos

Always focus on delivering what the customer needs. Sometimes that will mean sending them to a competitor or turning them down. 

### Initial call

The purpose of this call is to work out what the potential customer needs. 

Don’t be presumptive - ask why they reached out. It’s often a very quick way to understand what they need, but there will likely be adjacent challenges you can also uncover.

You are trying to work out:

- Does the client prefer ease over saving money or vice versa?
- How should the client deploy (i.e. cloud or self-hosted with support). This will depend on their volume and price sensitivity.
- Does our functionality meet their use case? Would it be worth going ahead with what we have now?
- Is the client going to need us to do most of the work? If this is the case, support is really important e.g. because they’re growing very fast.
- How much analytics experience does the client have? More experience means you should focus more on how we are different, less experience means you should try to keep things simple.

As a rule, always understand the context behind the question - it may help you make further useful recommendations.

### Demo

#### Environment

When doing a demo of PostHog, you should prioritize using the following environments:

1. The client's own instance or PostHog Cloud account (if they have one **and** are OK with this). 
   
    This is the best way to do a demo because you can help the client with their exact needs and you show them how to do what they want with their own data, so they immediately see the value.

2. The [PostHog Demo Environment](https://playground.posthog.com)

    The demo instance was designed to be an environment with a significant amount of "good" demo data that showcases the multiple features of PostHog and allows clients to log in and run the demo themselves (while following your instructions).

    To run a demo on the demo environment, you should:

    1. **Have access:** Ask Yakko or James to give you access if you don't have it.
    2. **Invite the client to the instance:** Invite them to the instance so that they can have access themselves without you having to share credentials.
    3. **Guide the client through a demo while they share their screen:** Take them for a spin of the product as you would do if you were the one navigating. But be patient, the client might want to click around and get a feel for PostHog, which is encouraged!
    4. **Revoke their access at the end of the call:** After the call, revoke the client's access to the instance or ask Yakko to do it if you do not have permission.

3. A local environment

    This is best if you have a good set of demo data locally. You can use some our management commands for data generation to do this.

4. PostHog Cloud 

    Only demo using PostHog Cloud (on the PostHog team account) if you really have to. Be careful not to expose sensitive data when doing the demo. 

#### Guidance

Show the client the product. Pause frequently and make sure there are no questions. Ask if the functionality would help them.

Use this to confirm the benefits to the customer that PostHog needs to provide. If you are talking only about feature X does Y, then you’re doing it wrong. "As a Product Manager, I may want to know 'X' about my users, this is how you do that."

### Follow Up

Keep this as quick as possible - if you can follow up immediately / on the same day, do it.

### Feature Requests

Sometimes client calls will highlight features that they would need which we don’t have. Your first step is to work out if what we do will be valuable enough to move forward with. Avoid committing to new functionality unless you’re already about to work on it. It’s better to underpromise and overdeliver.

### Style

* Be passionate: "This is one of my favorite parts of the system", "the neat thing about X is Y"
* Social Proof: If your current users are using something, or if you built something for a really specific reason, let the client know (obviously without naming names). This helps people know they're not the first to use PostHog!
