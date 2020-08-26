# Documentation Style Guide

## Purpose

The purpose of this document is to define unified standards and guidelines for contributors to the PostHog Docs. 

As a developer-focused product, PostHog depends on its documentation to provide a good experience to users who wish to use our product. Thus, it is important that our Documentation is complete, concise, and well-written.

Hence, this guide aims to provide some basic guidelines for those wishing to contribute to the Documentation.

## Guidelines

### Golden Rule: Assume Nothing (Almost)

Assume as little as possible about your reader regarding the topic at hand. Whenever possible, you should provide links to other Docs and pages which describe how to download, update, and debug certain tools, so that your reader can easily solve an issue without having to go out searching on their own.

Regarding this point, there is a tradeoff. You do not want your text to get too long by teaching your reader how to turn on their laptop (they hopefully have that down), but you do want to instruct them on anything that is **essential** for completing a certain action. 

It is dangerous to assume that because something is obvious to you, it will also be obvious to your reader - just keep that in mind.

### Additional Suggestions

**Use American English**

PostHog is a a global company, with a team distributed across the world. As a result, to keep our communication consistent, we use American spelling for our Documentation.

**Use the Oxford comma for lists** 

Example: Write "bananas, apples, and oranges", not "bananas, apples and oranges".

**Capitalize the names of tools, protocols, and technologies**

Example: Write "Redis server", not "redis server".

**Capitalize acronyms**

Example: Write "URLs", not "urls". 

On another note, try to avoid acronyms unless they're so common that it's weird not to. For example, Hyper Text Transfer Protocol is a weird way to say HTTP.

**Capitalize every word in a title (except for prepositions)**

Example: Write "Documentation Style Guide" instead of "Documentation style guide". 

"Style Guide **for** Documentation" is fine, however.

**Adhere to the style standards of each programming language**

In code snippets, you should follow the conventions of the language the code is written in.

Example: Use `camelCase` for JavaScript, and `snake_case` for Python variables names.

**Where there is a Call to Action, always provide a link**

When you write: "You can contact us to learn more", make sure to provide the reader with the means to do so immediately. This could be a link to another page or an email address, for example. 

Making sure readers always have immediate access to the next suggested step significantly enhances the reading experience. This way, a reader doesn't have to scour the website to find where the hell the link to the Slack group is.

**Use in-line code for everything that is found somewhere on the code**

Rule of thumb: If it has an underscore, put a backtick around it. 

Examples: `API_KEY`, `distinct_id`, `reset()`.

**Avoid repetition of terms**

Example: "We believe this because we believe …"

**Avoid `mailto` links**

They're mostly annoying, not helpful.
