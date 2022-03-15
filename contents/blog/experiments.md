---
date: 2022-03-21
title: What launching Experimentation taught us about running effective A/B tests
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: ["neil-kakkar"]
featuredImage: ../images/blog/posthog-engineering-blog.png
featuredImageType: full
---

We just launched our Experimentation suite, and there's a ton we learned about running successful experiments.

It was a no brainer product decision: Since you're already analysing your data in PostHog, and you're already using feature flags to roll out new features, why not have the capability to test how well these features are doing?

Experiments allow you to choose a target metric, choose specific people to run this experiment on, and estimate how long this experiment would run for.

![PostHog - Experiment Creation](../images/blog/experimentation/experiment-creation.png)

Thanks to feature flags, you can then easily validate whether each variant looks good, launch your experiment, and wait for data to come in. Once data starts trickling in, we run a Bayesian analysis to give a probability for each variant being the best, a graph of how things are looking for each variant, and whether the results are significant or not.

![PostHog - Experiment Results](../images/blog/experimentation/experiment-results.png)

Well, that's enough about how experiments work. If you're interested in the technical details, check out the user guide. (TK: link) For now, let's get into three interesting things we learned about running successful experiments.


## Choosing the right metric is hard

Let's say you're running an experiment to optimise the number of times people interact with PostHog graphs. Specifically, you're testing out different layouts for funnels, horizontal and vertical, and want to find which one leads to more interactions.

Now, you can choose two metrics:

1. Number of interactions across all graphs, not just funnels.
2. Number of interactions for funnels.

Which one do you choose?

Note that you're choosing the total interactions here, not unique interactions. Which means if one person clicks on the funnel three times, that counts as 3 interactions for either metric, as it should.

There's a big problem with metric #1: It's global, and a lot more susceptible to things out of our control. For example, if Trends power users are somehow assigned to the control group, you'll unfortunately have a big skew towards control which has nothing to do with the different funnel layouts.

This is indeed something we noticed: The more specific the metric, the fewer outside factors affect your result. Focusing on local optimisation gives you better local information.

At the same time, you don't want to discard second order effects. What if the horizontal funnel layout prevents users from switching to other graphs? This might increase funnel interactions (local metric #2 increases), but at a severe cost to the global metric (#1).

To solve this problem, we introduced secondary metrics. We encourage making the main metric as the local metric, and then allow the option of having a few secondary metrics. We don't do significance analysis on these secondary metrics, but show the metric values for each variant, so you can ensure that there's no huge drop in global metrics while deciding on results.

Another advantage of local metrics over global is that it can be hard to reliably move global metrics[^2], and thus local metrics allow you to see changes faster, since they're smaller scoped, and thus move quicker.

[^2]: Depends a lot on how big and mature your product is, and how many sub features it has. If there's only one thing the app does, the local metric is the global metric.

## Experiment results aren't set in stone

So, you just finished running the experiment above, and the results are in. Horizontal funnel layout had 1000 interactions, while vertical funnel layout had 1200. The results ended up being significant, with vertical funnel layout being 20% better.

All well and good... except this goes against everything you know about using your own product. You find the vertical view congested, hard to parse, and sort of terrible.

Do you blindly trust the data, or your intuition?

Both have issues. Your intuition might be how you see the world, but not necessarily how people who use the product see the world. At the same time, what if there was a bug in the vertical layout implementation, which counted each interaction twice? Thus, the real number could've been 600, instead of 1200, which massively changes your product direction.

I'd recommend neither blindly trusting the data, nor your intuition. Experiments show you what is happening, but can't answer why. The real institutional knowledge comes with answering the why, and building up  an accurate model of who your users are, what they need, and how they interact with your product.

To answer the why, you need to talk through the causes. <a target='_blank' rel="noopener" href='https://neilkakkar.com/Bayes-Theorem-Framework-for-Critical-Thinking.html'> Create hypotheses about why this is happening</a> , watch user session recordings, and then make a call about what you want to do.

That is, bring data to conversations, but also talk through causes.

## Changing environments can invalidate experiment results

So, you've finally gotten results for the experiment above, and figured out why they're like this. Turns out, the vertical layout promotes interaction as it allows users to see all steps of the funnel in one go, click on the steps that seem surprising, see the persons involved in that step, watch their recordings, etc. etc. While the horizontal is a bit more frustrating to see all this information at a glance, causing faster bounces.

That's a model that keeps on giving, even when things change.

Let's say its now three months in the future, and you've done a design revamp. Horizontal bars are thinner now, while vertical bars are thicker. As a result, horizontal funnels fit in cleanly on screen, while vertical funnels don't.[^4]

You could run an experiment again to find if user preferences have changed, but if your model is right, interactions should start going down, and you can make the call to revert back to a horizontal layout.

[^4]: A bit contrived, but easier to keep this blogpost manageable without explaining the ins and outs of PostHog graphs :). Also, don't tell our designer, they'll scream if they hear of this design revamp.

All this is trying to say is experiment results don't stand the test of time, and reiterates the importance of extracting a useful model out of your experiment results.


## Bonus: Experimentation for web products is very different from clinical trials

Another interesting thing we learned is that we can't simply run experiments for web products like we do a clinical trial. Rigor is important, but if it takes you a year to make up your mind about a vertical vs horizontal layout, you'll be in trouble.

This kind of rigor makes sense when you're developing a new drug: there's lives at stake, and mistakes do result in casualties. Thankfully, human biology is reliably consistent, so it's not like dopamine will start causing convulsions any time soon.

By contrast, web products are much lower stakes, and are present in an ever changing environment. Culture and individual preferences can change rapidly, and the cost of getting experiments wrong isn't too high, you can easily revert them later on.

Thus, moving quickly trumps rigor in web product experiments.

We built experiments with this in mind. It's a web product, built for products that move quickly. That's all for this post, we'd love to have you try Experiments out, and tell us what you learn :)
