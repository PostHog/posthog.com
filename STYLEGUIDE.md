# Documentation style guide

## Purpose

This style guide explains our standards and guidelines for contributors to the PostHog documentation.

PostHog is a product for developers, so our documentation is key to a good developer experience. We want it to be complete and concise, well-written, and easy to understand.

## Guidelines

### Golden rule: assume almost nothing

You likely know more than your reader in the area you're writing about. That is why you're documenting it!

As you gain mastery of a product or feature, some things become second nature. You know them without thinking about it. But they weren't so obvious at first. Call these out, and provide links to relevant docs or websites.

Make it easy for your reader to implement their feature or solve their issue, whether they are an expert or just starting out with PostHog.

Of course our audience is developers, so you can assume _some_ baseline knowledge.

### Additional suggestions

**Use American English**

PostHog is a global company. Our team and our customers are distributed around the world. For consistency, we use American English spelling and grammar.

**Use Allowlist/Denylist instead of Whitelist/Blocklist**
This term is clearer, and isn't rooted in the idea that white=good, black=bad. 

**Use the Oxford comma** 

Write "bananas, apples, and oranges", not "bananas, apples and oranges".

Why does this matter? Consider the old joke:

"There are two hard problems in computer science: naming things, cache invalidation, and off by one errors."

That doesn't work without the Oxford. Of course we are not so fussy in real life, but we are persnickety with our documentation.

**Capitalize proper names as appropriate**

Write "Redis server", not "redis server".

**Capitalize acronyms, and link the first use to a definition if they are unfamiliar**

Write "URLs", not "urls".

Many acronyms, like that one, will be familiar to developers. But when in doubt, link the first use of an acronym to its definition.

**Use sentence case for titles**

Write "Documentation style guide", not "Documentation Style Guide". 

**Use sentence case for feature names**
There's [plenty of discussion](https://github.com/PostHog/posthog/issues/7648) about this, but in short: If it's a feature name then it's a proper noun and should NOT be capitalized, e.g. feature flags, group analytics, product analytics.  

**Follow the style standards of each programming language**

In code samples, use the conventions of the language the code is written in.

For example, JavaScript uses `PascalCase` for class/constructor names, and `camelCase` for most other names. Python uses `PascalCase` for classes, and `snake_case` for most other names. And so on.

**Third-party cookies**

We talk a lot about "third-party cookies". And that's how we spell them. Same for "first-party cookies". 

"PostHog doesn't require third-party cookies."

**Always provide a link**

Don't just write "You can contact us to learn more" and not link it to anything.

Write "To learn more, [join our Slack community](https://posthog.com/slack)."

**The backtick is your friend**

Remember to use backticks around inline code snippets, and triple backticks around multiline code samples.

**Do not fear the copyeditor**

Whatever documentation improvement you submit, we are grateful for it. Don't worry if you think it may fall short of any of these recommendations. We are happy to have your assistance in improving our docs, and we will work with you to copyedit your contributions.

**Use analytics platform**

When talking about PostHog in content, substitute references to “product analytics” or “product analytics tool” with the phrase “analytics platform”.

Example: “A data warehouse or product analytics tool like PostHog can be helpful here.” would become “A data warehouse or analytics platform like PostHog can be helpful here.

Exception would be specific references to our product analytics suite (e.g. when comparing rival product analytics tools to our product analytics product).

