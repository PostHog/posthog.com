---
title: Preparing for the engineering SuperDay
sidebar: Handbook
showTitle: true
hideAnchor: true
---

If you've been invited to a PostHog SuperDay, here's what to expect and how to set yourself up for success.

## What the SuperDay looks like

The SuperDay is a paid full day of work ($1,000 USD). You'll receive a project task at the start of your day and submit your work at the end. The project is the main focus -- you'll build something from scratch, tailored to the role you're applying for. Expect to spend the majority of your day on it.

Scheduled throughout the day, you'll also have:

- **A debugging session (45 min)** -- a separate pairing session where you'll work through bugs and features in an existing codebase with an interviewer. This is a different codebase from your project.
- **A check-in call** -- your SuperDay buddy (the same engineer available to help you in Slack) will review your project progress partway through the day, ask about your decisions, and offer feedback.
- **A short chat with a co-founder or exec** -- a brief conversation about culture and motivation.

You'll also have access to a dedicated Slack channel with the team throughout the day. Use it -- share progress, ask questions, surface blockers.

## The project

### What we're evaluating

#### Shipping and execution

The scope of the task is deliberately broad, so you have room to make prioritization choices. You won't finish everything -- that's expected. We want to see how you decide what matters most.

Strong candidates ship a working core feature early, then layer on improvements. They make deliberate choices about what to build and what to skip, and they can explain why. A functional product that solves the core problem well beats a half-finished product that tries to do everything.

#### Technical depth

We care about the quality of what you build. This means thoughtful architecture decisions, clean code, sensible error handling, and attention to edge cases in the data you're working with.

The best candidates go beyond surface-level implementation. They notice patterns and anomalies in the data. They think critically about whether their solution is actually correct.

#### Product sense

PostHog engineers are product engineers. We want to see you think about the person using what you're building. Is the interface intuitive? Does the output actually help someone make a decision? Would you be proud to demo this to a customer?

Think about the *utility* of what you're building.

#### Problem-solving and creativity

The strongest SuperDay submissions show candidates who thought deeply about the problem. They adapted when something wasn't working and found ways to make the tool more useful beyond the basic requirements. For example, if the core task asks you to visualize data, a strong candidate might notice something interesting in the data itself -- an unexpected pattern, a segment that behaves differently -- and surface that insight in the product. That kind of curiosity matters more than adding extra UI polish.

We notice when someone asks "what would actually help a user here?" and lets that guide what they build next.

### How to prepare for the project

- **Use tools you know well.** You can use whatever technologies you're comfortable with. Pick tools you're productive in so you can move fast.
- **Think about data.** You'll be working with a dataset. Before jumping into code, spend time understanding what the data looks like, what stories it tells, and where it might have quirks. The best candidates treat the data as a first-class part of the problem.
- **Get comfortable explaining your decisions.** During the check-in call, we'll ask about the choices you made. Why this architecture? Why this feature first? What would you do differently with more time? Reflect on your decisions as you go.

### During the day

- **Communicate proactively.** Share progress updates and blockers in Slack. Ask clarifying questions early if something is ambiguous. Don't wait until you're stuck for hours.
- **Commit regularly.** We'll review your git history. Frequent, meaningful commits show us how you work, how you think, and how you build incrementally.
- **Prioritize ruthlessly.** Build the core feature first and get it working end to end. Then improve it. Then add more. Resist the urge to gold-plate any single piece before the whole thing works.
- **Take feedback seriously.** At the check-in, your interviewer will offer suggestions. We pay attention to whether those suggestions show up in your final submission. This is a signal of how you'd work with teammates day to day.

## The debugging session

### What to expect

You'll join a live coding environment with an interviewer and work through a series of problems in an unfamiliar codebase. The problems range from fixing bugs to improving performance to implementing a small feature. You won't know the codebase in advance -- that's the point.

You're allowed to use Google for reference, but we ask that you don't use AI tools – we want to see how _you_ think about debugging. Treat the interviewer like a colleague -- you can ask them questions, think out loud, and discuss approaches.

### How to prepare

- **Practice reading other people's code.** Pick an open-source project you've never seen, find a bug report, and try to trace the issue through the codebase. Building a mental model of an unfamiliar system is the core skill here.
- **Brush up on debugging fundamentals.** Understand how to trace request flows through a web application. Be comfortable reading error messages, stack traces, and logs. Know how to isolate problems systematically rather than guessing.

### During the session

- **Read the README first.** Take a few minutes to read the documentation and understand the system before touching anything. Candidates who jump straight into code without understanding the architecture tend to struggle.
- **Form a hypothesis before changing things.** Resist the urge to start editing code immediately. Think about what might be going wrong, then go looking for evidence.
- **Narrate your thinking.** Talk through your thought process, even when you're uncertain. Saying "I think the problem might be here because..." goes a long way. The interviewer can only follow reasoning they can hear.
- **Verify your fixes.** After making a change, confirm it works and check that you haven't broken something else.
- **Ask questions.** The interviewer is there to help. Treat them like a colleague you're pairing with.

## What not to worry about

- **Perfection.** We don't expect you to finish everything. We care about the quality of what you ship, the decisions you make, and how you work under constraints.
- **Specific technologies.** Use whatever stack you're strongest in for the project. For the debugging session, you'll work with what's already there -- we're evaluating your problem-solving ability.
- **Getting stuck.** Everyone gets stuck. What matters is what you do next. Ask questions. Try a different approach. Talk through what you're thinking.

## A note on AI tools

You can use AI tools during the project portion of the day -- we know this is how many engineers work. But you need to *understand* what you've built. During the check-in, we'll ask you to walk through your architecture, explain your decisions, and reason about your code. If you can't defend and explain your solution, it won't matter how polished it looks.

For the debugging session, we ask that you don't use AI tools beyond basic autocomplete. We want to see how you reason about code.

## What comes next

After the SuperDay, everyone involved will leave their feedback. We aim to get back to you with a decision within 48 hours. You can read more about the [full interview process here](/handbook/people/hiring-process).

If you've made it this far, good luck -- we're rooting for you.
