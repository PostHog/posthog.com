---
title: How FDE works with AI
sidebar: Handbook
showTitle: true
---

We'd be at a disadvantage if we didn't use AI, but using it badly could put us at even more of a disadvantage. LLMs are great for exploration, batch processing, transformation, search, and anywhere a fuzzy answer is useful. We use them to speed up better solutions, not to solve the same problem again from scratch.

You're responsible for what you ship, whether AI generated all, most, or none of it, no exceptions.

Customers place their trust in us when they delegate their work to us. So we should only delegate that work to systems that deserve our customers' trust. Using AI well means treating delegation itself as an engineering discipline.

## Principles for working with AI

We wrote these principles from actually doing the work – if doing the work teaches you something better, go with that.

- [You're still the driver](#youre-still-the-driver): Would I be happy to put my name on this if the customer read it today?
- [Understand before you delegate](#understand-before-you-delegate): Could I solve this myself, or at least tell when the answer is wrong?
- [Use the right tool for the job](#use-the-right-tool-for-the-job): Am I using AI because it's better here, or because it's available?
- [Use skills for R&D](#use-skills-for-rd): Do other FDEs face this problem, and what is the skill teaching us about the solution?
- [Automate repetitive work](#automate-repetitive-work): What do we lose when this doesn't get done?
- [Trust is the measure](#trust-is-the-measure): Can someone check this claim quickly without redoing my work?
- [Know your audience](#know-your-audience): What does this reader need from me, and is writing the right format for it?

### [You're still the driver](/handbook/values#youre-the-driver)

Would I be happy to put my name on this if the customer read it today?

If we can follow a standard exactly as written, we should automate it. You're here to evolve our standards. When real work exposes a gap, use your judgment and improve the system.

### Understand before you delegate

Could I solve this myself, or at least tell when the answer is wrong?

Delegate only problems you understand to systems you trust. For PostHog products, we should be able to solve the problem ourselves before using AI.

You don't need to know every implementation detail. You do need to know what cannot break, how the system can fail, and whether you're okay with those failures.

### Use the right tool for the job

Am I using AI because it's better here, or because it's available?

Using your judgment also means choosing the right tool, and knowing when work stays human: when the answer is ambiguous, consequential, or depends on taste and direction.

If we keep solving the same problem, we should stop relying on a model to figure it out from scratch. Some questions should become hardcoded checks like queries or scripts.

### Use skills for R&D

Do other FDEs face this problem, and what is the skill teaching us about the solution?

Skills allow us to combine and share our best experiences. Sometimes the skill becomes the solution, but often it uncovers what we should build.

If no one is using a skill, that's a signal. Maybe it isn't good, the problem isn't important enough, it creates more friction than it removes, or a skill simply isn't the right tool.

### Automate repetitive work

What do we lose when this doesn't get done?

If something depends on memory, someone will forget. Logging tasks takes seconds, but skip it and the team loses visibility.

AI helps us automate work we always assumed had to be manual. You can use agents to infer tasks from your work, so that overhead disappears entirely. Automate work when the cost of skipping it is higher than the cost to maintain the automation.

### Trust is the measure

Can someone check this claim quickly without redoing my work?

At FDE, our work [compounds](/handbook/forward-deployed-engineering/how-we-work#improvement-loop). That only works if we can trust past contributions, so we treat trust as a quality signal and measure it against our contracts.

Trusted records unlock new work. In a recent experiment, we used validated schemas and tagged blocks in our records to generate deterministic reports for stakeholders: no tokens, no hallucinations.

So make your work visible and cheap to check. Someone should be able to use, review, or challenge it without retracing your investigation. When you make a claim, link data to queries, code to exact lines, and behavior to tests. That's how AI-generated output becomes something we can trust and learn from.

### Know your audience

What does this reader need from me, and is writing the right format for it?

[Get to the point](/handbook/content/posthog-style-guide#get-to-the-point). Give people what they need first. Adapt to how they prefer to communicate and work. When people are already overloaded, less is more.

Agents need a different kind of writing: provenance, evals, invariants, structured context, and enough detail to keep working when requirements change and nobody is around to decide.

## The work moves

AI makes execution easier, but our work isn't done. The puzzle pieces have moved. Creating new paradigms, new infrastructure, and things that don't have a name yet is still the spark humans bring.
