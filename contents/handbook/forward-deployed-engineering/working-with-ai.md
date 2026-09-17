---
title: How FDE works with AI
sidebar: Handbook
showTitle: true
---

What you ship is your responsibility, whether AI generated all, most, or none of it.

We'd be at a disadvantage if we didn't use AI, but using it badly could put us at even more of a disadvantage.

Customers trust us enough to delegate their work to us, so we should only delegate work to systems worthy of our customers' trust. Using AI well means engineering that delegation. We need to become _delegation engineers_.

Our work with AI aims to create better outcomes for customers by finding new ways to use technology, increasing how much we can safely and effectively delegate, and deciding what should always stay human.

## Principles for working with AI

These principles come from real work. If real work shows a better way, take it.

- [You're still the driver](#youre-still-the-driver): Prior context can inform your judgment, but it can't answer for your decisions or what you ship.
- [Understand before you delegate](#understand-before-you-delegate): Delegate only problems you understand to systems you trust.
- [Use the right tool for the job](#use-the-right-tool-for-the-job): Use AI to accelerate better solutions, not to retrace solved problems.
- [Use skills for R&D](#use-skills-for-rd): Start with a skill before building infrastructure.
- [Automate the periphery](#automate-the-periphery): Attention is a resource. Don't spend it on work we can automate.
- [Trust is the quality bar](#trust-is-the-quality-bar): In a compounding system, trust is infrastructure.
- [Know your audience](#know-your-audience): Humans and agents don't read with the same eyes.

### [You're still the driver](/handbook/values#youre-the-driver)

Prior context can inform your judgment, but it can't answer for your decisions or what you ship.

When real work exposes a gap, use your judgment and improve the system.

If your contribution stops at applying an existing standard as written, you're operating at the level we aim to automate. You should be able to explain why the decision makes sense for the problem in front of you.

Ask:

- Would I be happy put my name on this if the customer read it today?
- Did I check what my agents produced, or only that they finished?
- Is this right for this problem, or just what a tool, standard, or previous project told me to do?

### Understand before you delegate

Delegate only problems you understand to systems you trust.

For PostHog products our customers use directly, we should be able to solve the problem ourselves before asking AI to solve it.

You don't need to know every implementation detail. You do need to know what cannot break, how the system can fail, and whether you're okay with those failures.

Ask:

- Can I solve this myself, or judge the solution confidently?
- What would make the answer wrong?
- Why should I or anyone else trust this system's output?
- What can it access or change?
- How can it fail, and how will we notice?

### Use the right tool for the job

Use AI to accelerate better solutions, not to retrace solved problems.

LLMs are great for exploration, batch processing, transformation, search, and places where a fuzzy answer is useful. Human judgment matters when the answer is ambiguous, consequential, or depends on taste and direction.

If we keep solving the same problem, we should eventually stop making a model figure it out from scratch. If the same input should give us the same answer, turn what we've learned into a query, validator, calculation, test, or another tool agents can call.

Ask:

- Does this actually need inference?
- Should a human make this decision?
- Have we learned enough to make this deterministic?
- Am I using AI because it's better here, or because it's available?

### Use skills for R&D

Start with a skill before building infrastructure.

Think of a skill as pulling experience out of our heads and our work. We combine what we've learned and give it back to everyone. Sometimes the skill becomes the solution. Sometimes it teaches us what we should build instead.

If no one is using a skill, that's a signal. Maybe it isn't good, the problem isn't important enough, it creates more friction than it removes, or a skill simply isn't the right tool.

Ask:

- What really needs inference?
- What should just be a lookup?
- Can we make the fuzzy parts better with defaults or tests?

### Automate the periphery

Attention is a resource. Don't spend it on work we can automate.

If something depends on everyone remembering to do it, eventually someone won't.

The same goes for safeguards. If a check matters every time, put it in the workflow.

Ask:

- What do people keep forgetting?
- What are we still doing by hand?
- Can the system handle it while the work is happening?
- Does automating it save more than it costs to maintain?

### Trust is the quality bar

In a compounding system, trust is infrastructure.

We're all about [compounding](/handbook/forward-deployed-engineering/how-we-work#improvement-loop) at FDE. Our work and systems build on previous contributions.

In a recent experiment, we started using validated schemas and tagged blocks in our records to generate deterministic reports for stakeholders: no tokens, no hallucinations. That only works if we can trust what people put in.

Trust is essential when building AI-native systems, so treat this as an axiom. Expect strong pushback when your contributions can't clear our trust bar.

Trust should also be cheap to check. If someone has to retrace your investigation to trust a claim, you're making them do your work. When you make a claim, link data to queries, code to exact lines, and behavior to tests.

Ask:

- What proves this claim?
- Can someone verify or falsify it quickly?
- Is this the right source for this kind of claim?

### Know your audience

Humans and agents don't read with the same eyes.

[Get to the point](/handbook/content/posthog-style-guide#get-to-the-point). Give people what they need first, and make the proof easy to find. Adapt to how they prefer to communicate and work. When people are already overloaded, less is more.

Agents need provenance, evals, invariants, structured context, and detail to keep working when requirements change and there's no one around who can decide.

Ask:

- Who is consuming this?
- What do they actually need from me?
- Should this even be writing?
- Do they need the context, or just the conclusion and next step?
- What should stay available for inspection without becoming required reading?

## The work moves

AI makes execution easier, but our work isn't done. The puzzle pieces have moved.

We hear people say they're losing interest because coding isn't the same anymore. Perhaps we've spent so long treating code as the work that we're confusing the tool with the problem, the classic hammer sees nails problem.

We now get to ask some fascinating questions. How does a statement stay true as it moves through a chain of agents? What failures are acceptable? How should knowledge be structured for agent consumption and human trust? How is human attention changing, and what should we build differently because of it?

AI is extremely good at derivative innovation, building on top of existing ideas. But creating new paradigms, new infrastructure, and things that don't yet have a name or concept is the spark with which humans ignite the engine of progress.
