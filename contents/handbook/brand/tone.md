---
title: Voice & tone
sidebar: Handbook
showTitle: true
---

> Writing for PostHog? Be sure to check out our full [writing style guide](http://localhost:8002/handbook/content/posthog-style-guide).

## The core principle

Write the way you'd explain something to a smart friend, not a business associate you're trying to impress or a prospect you're trying to close.

That means:

- **Clear and simple.** If a simpler word works, use it.
- **Specific.** Concrete nouns and real examples beat abstract claims every time.
- **Direct.** State what the thing is. Don't make the reader infer. Don't use filler words.
- **Honest.** Including about limitations. Developers trust honesty more than polish.
- **Conversational.** Contractions are fine. Starting a sentence with "But" or "And" is fine.
- **No jargon for jargon's sake.** Technical precision when it helps. No buzzwords.

If there's an industry-standard phrase, question if it's actually the best way to describe something – or if somebody came up with it once and then everyone else followed suit. Maybe it makes sense to stick with it, but we also have the unique opportunity to coin a new term if the juice is worth the squeeze.

## What to avoid

### Hedge words and weasel phrases

These make copy feel weak and corporate. Cut them:

| Instead of this         | Consider...                                  |
| ----------------------- | -------------------------------------------- |
| "helps you to"          | just say what it does                        |
| "empowers teams to"     | say what teams can now do                    |
| "enables you to unlock" | say what they get                            |
| "leverages"             | uses                                         |
| "utilize"               | use                                          |
| "streamline"            | speed up / simplify                          |
| "robust"                | strong, solid, or just describe it           |
| "best-in-class"         | show, don't claim                            |
| "holistic"              | comprehensive, or just describe the parts    |
| "seamless"              | describe *why* it's easy                     |
| "synergy"               | (I shouldn't even have to clarify this one.) |

### Passive voice

Active: "PostHog tracks your events."
Passive: "Events are tracked by PostHog."

The active version is shorter, clearer, and more confident.

### Feature-first headlines

"Introducing our new dashboard" says nothing about why anyone should care. Lead with the benefit or the specific capability.

### Forced humor

A joke that has to be explained isn't funny. Humor in PostHog copy works when it's specific, unexpected, and comes from a genuine perspective. It doesn't work when it's "here's a wacky metaphor to make our SaaS product seem fun."

When in doubt, just be clear. Clear beats clever, and makes the genuine humor stand out.

## Voice by surface

The PostHog tone is consistent, but the *register* shifts depending on where we're talking.

### Website & marketing copy

Confident, specific, slightly irreverent. This is where the personality comes through most. Be opinionated. Use short sentences. Don't bury the lead.

*Example lead:* "Product analytics – no BI team required"

Not: "Revolutionizing the future of product analytics"

### Documentation

Precise and friendly. The priority is clarity – someone is trying to do a thing and needs help doing it. Wit is welcome when it fits naturally; never force it. Use second person ("you"). Keep it human.

*Example:* "Add this to your `posthog.init()` call. You only need to do this once."

Not: "Users are required to include the following configuration within their initialization method."

### Product UI

Short, helpful, and human. This is where robotic copy hurts most because people see it when they're trying to accomplish something. Every empty state is an opportunity to spark joy and remind the user that there's a human on the other end. In a world where AI is writing most of our code, this is a simple way to connect on a human level.

*Good empty state:* "No recordings yet. Add the snippet to your site to start capturing sessions."

*Bad empty state:* "No data available for the selected time range."

When writing error messages, consider the mental state of the user. If they're annoyed or frustrated, make sure to not exacerbate the situation.

### Blog posts

Have a point of view. Every post should be arguing something. Lead with the argument. Write for the smart developer friend – they'll call you out if you're vague or you say nothing interesting.

### Social media (X, LinkedIn)

More casual than the website, and more specific. The best PostHog social posts are opinionated, shareable, and say something true and non-obvious. Don't post generic "tips and tricks" content. We don't post content just for the sake of having something to fill up the feed. Don't be a company account that congratulates itself.

### Support & success

Warm, direct, and actually helpful. No scripts. No "I have escalated your inquiry to our team." Talk like a person. Own the problem. Move fast. Humor goes a long way here because the expectation is that a response will be formal and robotic.

### GitHub issues, PRs, meta content

This counts too. PostHog engineers writing a feature spec or a changelog entry are doing brand work. Keep it clear, specific, and human.

## Dos and don'ts with examples

### Headlines

| ✅ Do                                               | ❌ Don't                                            |
| -------------------------------------------------- | -------------------------------------------------- |
| "Feature flags that don't slow you down"           | "Supercharge your feature delivery workflow"       |
| "See exactly what your users are doing"            | "Unlock actionable user insights"                  |
| "Built for engineers who ship fast"                | "The all-in-one platform for modern product teams" |
| "Ship, measure and iterate – all on one platform." | "Streamline your product development lifecycle"    |

### Body copy

| ✅ Do                                                         | ❌ Don't                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| "PostHog stores your data in your own cloud."                | "With PostHog, you can leverage our advanced data sovereignty capabilities." |
| "There's no separate pricing for each tool. Pay for usage across all of them." | "Our holistic pricing model enables teams to seamlessly utilize all of our integrated products." |
| "We wrote this ourselves because existing solutions weren't good enough." | "Drawing on our extensive expertise, we've developed a best-in-class solution." |

### Error messages

| ✅ Do                                                         | ❌ Don't                                          |
| ------------------------------------------------------------ | ------------------------------------------------ |
| "Can't connect. Check your API key and try again."           | "An error has occurred. Please contact support." |
| "This experiment needs at least 100 events before we can calculate significance." | "Insufficient data for statistical analysis."    |

### Emails

| ✅ Do                                              | ❌ Don't                                                      |
| ------------------------------------------------- | ------------------------------------------------------------ |
| "You've been quiet for a bit. Here's what's new." | "We noticed you haven't engaged with our platform recently and wanted to reach out." |