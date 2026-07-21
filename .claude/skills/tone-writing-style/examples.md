# Examples

Good vs. bad examples by surface. Use these as calibration when drafting or critiquing.

## Product page hero

### Bad (generic SaaS)
> **The all-in-one analytics platform for modern teams**
> Empower your developers to make data-driven decisions with our comprehensive suite of powerful tools. PostHog seamlessly integrates with your existing stack to unlock insights and drive growth.

What's wrong: every B2B SaaS site says this. No specific claim, no concrete features, lots of hedge words ("empower", "comprehensive", "powerful", "seamlessly", "unlock", "drive growth"). Could be any product.

### Good (PostHog voice)
> **The single platform to analyze, test, observe, and deploy new features**
> Product analytics, session replays, feature flags, A/B testing, error tracking, surveys, and a CDP. One platform, one bill, one team to learn.

What's right: names actual products, makes a structural claim ("one platform, one bill"), no hedge words, specific.

## Blog post intro

### Bad
> In today's fast-paced world of software development, AI-powered tools are becoming increasingly important. As teams look to ship faster, they need solutions that can keep up with the demands of modern engineering. In this post, we'll explore how PostHog Code can help your team stay ahead.

What's wrong: throat-clearing, no opinion, "in today's fast-paced world" is a banned phrase, "we'll explore" is filler, no concrete claim.

### Good
> Most "AI coding tools" know your codebase. They don't know your product — what's broken, what's slow, what users actually do. That's a big gap, and it's why PostHog Code exists.

What's right: starts with a take, names a real gap, gets to the point in three sentences, has a clear thesis.

## Tagline

### Bad
> Empower your team to build better products, faster.

What's wrong: empty. Could be Asana, Linear, Notion, anything.

### Good
> Knows your product, not just your codebase.

What's right: specific contrast, a real claim, mirrors a category convention to subvert it.

## Button labels

### Bad
- "Click here to learn more"
- "Get started today!"
- "Discover the power of PostHog"

### Good
- "Read the docs"
- "Try PostHog free"
- "See pricing"
- "Install the SDK"

What's right: action verbs, specific destination, no hype.

## Microcopy / empty states

### Bad
> No data yet! Connect your application to start gathering powerful insights.

### Good
> No events yet. Once you install the SDK, they'll show up here.

What's right: states the actual condition, names the action, no marketing.

## Feature announcement

### Bad
> We're thrilled to announce the launch of our revolutionary new AI assistant! This game-changing tool will transform the way you build software, leveraging cutting-edge machine learning to deliver unprecedented insights.

What's wrong: every superlative in the book, zero specifics, performative excitement.

### Good
> PostHog Code is now in beta. It's an agentic editor that reads your PostHog data — errors, events, flags — alongside your code. So when it suggests changes, it's grounded in what's actually happening in production, not just what your repo looks like.
>
> Available today for self-serve customers. Cloud and local execution. No waitlist.

What's right: states what it is, what it does differently, who can use it, no hype words.

## Refactor patterns

### "Empower" / "enable" → name the action
- Before: "PostHog empowers developers to ship faster."
- After: "PostHog gives developers session replays, error tracking, and flags. They ship faster because they don't have to switch tools."

### Abstract benefit → concrete feature
- Before: "Powerful analytics for modern teams."
- After: "Funnels, retention, paths, lifecycle, and SQL. All in one place."

### Hedge → assert
- Before: "PostHog can help you understand your users better."
- After: "PostHog tells you what users do, where they drop off, and why."

### "It's not just X, it's Y" used too often → vary the structure
- Before: "It's not just analytics. It's a platform. It's not just data. It's insight."
- After: "It started as analytics. Now it's a full data stack — warehouse, CDP, replays, flags, errors. Same platform, same bill."

### Vague value-gesturing → name the specific thing
- Before: "Recording rules narrow your capture to what's actually useful."
- After: "Recording rules let you capture by event, URL, or user property."
- Before: "Get the insights that actually matter to your team."
- After: "Get retention curves, funnel drop-offs, and lifecycle stages — broken out by cohort."

The diagnostic: anytime you write "actually" or "really" in front of a noun ("actually useful", "really matters"), stop and name the noun's content. Those intensifiers are almost always papering over a missing specific.

## When playfulness is right

PostHog's voice tolerates wordplay and dry humor — but it has to be earned. Examples that work:

- The BC/AD ("Before Code / After Data") framing for PostHog Code
- The hedgehog mascot's voice in error states
- Self-aware jokes about being a B2B SaaS company

What doesn't work:
- Forced casualness ("Yo, devs!")
- Excessive emoji
- Memes that age poorly
- Humor that gets in the way of the actual point

When in doubt: the joke should make the copy clearer or more memorable, not slow it down.

## Quick rewrite drill

Take this paragraph and apply the rules:

> "Our cutting-edge platform empowers modern engineering teams to seamlessly leverage data-driven insights. With our comprehensive suite of powerful tools, you can unlock the full potential of your product and drive growth at scale."

Stripped:
> "PostHog gives engineering teams the tools they need."

Stripped further with specificity:
> "PostHog: analytics, replays, flags, errors, surveys, and SQL. One platform."

That's roughly the journey from generic SaaS to PostHog voice.
