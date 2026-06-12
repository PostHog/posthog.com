---
title: How to pitch self-driving
sidebar: Handbook
showTitle: true
---

This is a living page for how we pitch PostHog as a self-driving product. We're still early, so treat this as a starting point and iterate on it as we practice the pitch and learn what lands.

### The core pitch

Keep it simple. Something like this:

> PostHog already has all the behavioral data about how people use your product. We turn that data into signals, feed those signals to an agent running in a sandbox, and it automatically opens PRs that improve your product. That's a self-driving product, and the more you put into PostHog, the better the signals get.

That last line is the flywheel line. Every event, flag, and replay you capture sharpens the signals the agent works from, so more data in means better PRs out.

### Why it works

The pitch resonates because the customer connects the dots themselves. You don't have to convince anyone that behavioral data is valuable, because they already believe it. You're just showing them the obvious next step, which is that data shouldn't sit in a dashboard waiting for a human to act on it. It should drive changes to the product directly.

When it goes well, the customer arrives at the conclusion before you finish. We've seen this play out on an [on-site](/handbook/growth/sales/customer-onsites): as the pitch unfolded the team worked through it out loud, described the exact signals use case back to us, and then started sequencing their own rollout, ending with asking whether they should do a Fable 5 audit of all their instrumentation first to make sure they're tagging everything and getting as much as possible into PostHog.

When the customer starts planning their instrumentation rollout unprompted and immediately, you know pitch has landed!

### How to run it

- **Lead with the data they already have.** Start from the behavioral data they're capturing in PostHog today, not from the agent. The agent is the payoff, not the opener.
- **Draw the line from data to PR.** Walk through it: data goes to signals, signals to an agent in a sandbox, and the agent to PRs that ship improvements. Let them follow the chain rather than asserting the conclusion.
- **Land the flywheel.** Make sure they leave understanding that more data means better signals means better PRs. This is what turns it from a feature into a reason to instrument everything.
- **Let them sequence the rollout.** The strongest outcome is the customer proposing their own instrumentation audit. When they get there, help them plan it, since that's the start of the flywheel.

### How to frame it

These are framings that help the pitch land. Reach for them when a customer needs help picturing what self-driving actually means for their team.

- **Autonomy from instruction, not from the engineer.** Self-driving means the bots don't need to be told every step, not that they ship without you. Nothing gets Yolo-merged without your approval, so the engineer stays in control.
- **Robots do maintenance, humans do creative work.** Bots are great at fixing bugs and making optimizations, while people are best at building new features. Self-driving is compelling because it puts maintenance mode on autopilot and frees you up to be in build mode.
- **It belongs in a shared workspace.** The Slack app is a hit because it brings self-driving behavior into a space the whole team shares. Marketers can prompt work, engineers can help steer it, and everyone gets to feel like an F1 driver.
- **It's more than cruise control.** Agentic workflows from other companies are basically cruise control, keeping you in the lane you already picked. Self-driving takes you down a road you didn't know was there.

### Iterating on this page

We're actively refining this pitch. If you run it and learn something, whether what resonated, what fell flat, or a better way to frame the flywheel, add it here so the whole team gets sharper.
