---
title: Working with our AI platform
sidebar: Handbook
showTitle: true
---

## Technical overview

Almost every team either is, or needs to, build AI features. As a result, we have a platform approach so that we can reuse work when everyone contributes towards our AI features. For example, we want to avoid multiple filtering experiences. Just like how we shipped HogQL instead of everyone writing their own queries.

Interfaces, applications, integrations, context and existing products all work together.

NB this stuff is all very newly being built, so the ownership is somewhat chaotic. It will get easier to have appropriate teams as we start to mature out each of these areas. Please bear with us.

### Interfaces

- Max
  - Lets users ask questions or request Max does things in a chat interface, embedded into the main product
  - Owned by Max AI team
- Wizard (CLI)
  - This is one of the ways we onboard new customers - they are offered an "AI Install Wizard". It sets PostHog up in their codebase automatically.
  - Owned by Growth team
  - Future: this should become part of a product team, not the growth team. It should continuously update the codebase on a cron job not just on initial account creation.
- Tasks
  - Takes ideas from Session Summaries and Error tracking, and converts these into high quality prompts and ultimately pull requests, which get shipped agentically (via Claude CLI at the moment). Automates the actual product building.
  - Owned by LLM Analytics team
  - Future: this should be its own team. PostHog Rules - ways of adjusting how automated it is / the workflow. Setting up experiments/feature flags automatically. Too much stuff to list.

### Applications

- Session summaries
  - Watch and summarize one or many session recordings at once to look for things like UX issues. These can then be used to do things like generate Tasks.
  - Owned by Max AI team
- Deep research
  - Inside Max, you can dig recursively to deeply understand a problem like "investigate the conversion rate of my pricing page".
  - Owned by Max AI team
  - Future: many more template types for different styles of problems users may have, letting users ask follow up questions to the research, giving it access to session recording
- Coding
  - Integrates with Tasks to ship the code to complete the tasks. We are using 3rd party coding agents - Claude right now.
  - Owned by LLM Analytics team

### Integrations - interface between products and AI stack

- MCP
  - Every existing _product_ team at PostHog, for example feature flags, should work by making their product available as a tool to our MCP. Our interfaces and applications can then work directly with this layer.
  - Owned by Growth Team
  - Future: this should be part of an AI platform team (and rebrand Max team to that)

### Context

- Context
  - We store information about the user, driven by clarification questions from the user through Max right now
  - Owned by Max AI team
  - Future: creating an MD file that outlines the main _features_ of the customer's product

### Existing products

Too many to list, but ie surveys, product analytics, session replay, feature flags, experiments...

## How to work with the Max AI team

**Products already integrated with Max always have a supporting engineer assigned on the Max team.**

This naturally distributes AI knowledge throughout the organization, while ensuring high-quality AI features that integrate properly with the platform. Implementing something new, missing features in the Max API, or seeing failures? Your supporting engineer is your go-to! Tag them directly on your PRs and questions.

**If your team is integrating AI features for the first time – the Max AI team will do their best to assign a supporting engineer.**

Just message about your plans in the #team-max-ai channel in Slack. 

| Product | Supporting engineer on the Max AI team |
| --- | --- |
| Product analytics | <TeamMember name="Emanuele Capparelli" /> |
| Data warehouse | <TeamMember name="Michael Matloka" /> |
| Session replay | <TeamMember name="Alex Lebedev" /> |
| CDP | <TeamMember name="Georgiy Tarasov" /> |
| _Insert your team_ | [**Shoot #team-max-ai a message!**](https://posthog.slack.com/archives/C06NZEZ7V3Q) |

### Getting started

If you need AI capabilities for your product area:

1. **Reach out early**: Contact the Max AI team lead at #team-max-ai in Slack to discuss your requirements
2. **Define the use case**: Be specific about what AI functionality you need, or consult with us if you're trying to flesh out ideas
3. **Plan the collaboration**: Work with the Max AI team to determine the best approach (e.g., sending an engineer to your team for a sprint or a few sprints vs. building the feature in Max AI directly without your involvement, or you just being able to do it solo)
4. **Coordinate sprints**: Align on timing and resource allocation if needed. This shouldn't feel like a heavyweight process, if it is - we should change it

### Best practices

- **Start small**: Begin with simple AI features and iterate based on user feedback. A lot of automation can be broken down into smaller, automatable steps!
- **Avoid death by random AI widgets - maintain consistency**: Ensure AI features follow PostHog's design patterns and user experience standards. Max AI team can help if you are missing a UX pattern.

## Resources

- [Max AI team page](/teams/max-ai)
- [Max AI objectives](/teams/max-ai/objectives)
- [Max AI documentation](/docs/max-ai)

## Contact

For questions about working with Max AI, ask in the `#team-max-ai` Slack channel.
