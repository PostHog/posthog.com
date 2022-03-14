---
title: What launching Experimentation taught us about running effective A/B tests
---

PostHog started off with simple product analytics. You want some data analysed, so you ingest this data. PostHog then lets you visualise this, slice it over multiple axes, and helps you answer any product questions you have.

Then came feature flags, which allow you to toggle features on and off, change what users see live.

It was a no brainer then to take the next step and introduce Experimentation. Since you're already analysing your data in PostHog, and are feature flagging new features, why not give the capability to test significant changes as well?

We recently launched Experiments, and there's a ton we learned about running successful experiments. That's what this post is about.

## The Peeking Problem is poorly named

The strawman pop-sci version of the peeking problem goes something like: "You shouldn't look at experiment results while the experiment is running because that can lead to you ending experiments early, when the data is skewed in favour of one variant, thanks to random chance."

However, peeking isn't the problem. The problem is taking action too quickly after peeking.

We built this into our product: Peeking is fun, almost addicting, when you can see your experiment results changing in real time. It gives a sense of excitement, seeing your hypotheses being proven right or wrong. More importantly, it keeps you coming back to the experiment, tracking its progress.

To solve the Taking-action-without-enough-information problem, we made it clear in our UI when it was okay to end an experiment: When results become significant, or the pre-determined duration for peeking has passed.[^1] This changed the conversation from 'peeking early and ending experiment if results look good' to 'waiting for the green light to switch on', and led to an overall much better experience.

[^1]: If you're looking for how we calculate this, see the user guide (TK: link)


## The kind of experiment you run determines how much data you need

PostHog allows running two kinds of experiments:

1. Trend experiments, which work on an absolute count. For example, a target metric like: "Number of people who clicked this specific button" would be a trend experiment. These kind of experiments deal with absolute numbers.

2. Conversion experiments, which work on a relative percentage. These are the traditional popular kind of experiments. "Conversion rate for the sign up -> purchase flow"

Perhaps surprisingly, trend experiments need more data and time to reach significance, versus conversion experiments. The reasoning is a bit complicated, but reach out if you're interested, we'll write an appendix! The short version is: You need 2 dimensions for both, test and control variants to accurately judge experiment results. In conversion experiments, these are people who entered the funnel, and people who exited the funnel. But for trends, you only have one count, the number of people who did the event. The second dimension for trends is exposure: a proxy for how long the experiment has been running. Since this parameter is completely dependent on time, these experiments tend to take a bit longer to reach significance. 

(TK: well, all 4 params are dependent on time in a way, soooo.... this is a bit confusing)

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

To answer the why, you need to talk through the causes. [Create hypotheses about why](https://neilkakkar.com/Bayes-Theorem-Framework-for-Critical-Thinking.html) this is happening, watch user session recordings, and then make a call about what you want to do.

That is, bring data to conversations, but also talk through causes.


## Changing environments can invalidate experiment results

So, you've finally gotten results for the experiment above, and figured out why they're like this. Turns out, the vertical layout promotes interaction as it allows users to see all steps of the funnel in one go, click on the steps that seem surprising, see the persons involved in that step, watch their recordings, etc. etc. While the horizontal is a bit more frustrating to see all this information at a glance, causing faster bounces.

That's a model that keeps on giving, even when things change.

Let's say its now three months in the future, and you've done a design revamp. Horizontal bars are thinner now, while vertical bars are thicker. As a result, horizontal funnels fit in cleanly on screen, while vertical funnels don't.[^4]

You could run an experiment again to find if user preferences have changed, but if your model is right, interactions should start going down, and you can make the call to revert back to a horizontal layout.

[^4]: A bit contrived, but easier to keep this blogpost manageable without explaining the ins and outs of PostHog graphs :). Also, don't tell our designer, they'll scream if they hear of this design revamp.

All this is trying to say is experiment results don't stand the test of time, and reiterates the importance of extracting a useful model out of your experiment results.


## Control for control

5. Control groups? -> All experiments are relative.
  6. Selection bias

TK: I don't remember what this was supposed to be??

Multi armed bandits? -> No, skip.

8. Clinical trials are very different from website changes -->>> hmm condense this. What am I trying to say?


