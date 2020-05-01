# Contributing to PostHog

We love contributions to PostHog, big or small.


# Reporting bugs or issues

Bug reports help us make PostHog better for everyone. When you create a big, the description will automatically be filled with a template that makes is very clear what we'd like you to add.

Please search within our issues before raising a new one to make sure you're not raising a duplicate.

!> If you've found a security issue, please email us directly at [hey@posthog.com](mailto:hey@posthog.com) instead of raising an issue.


# Writing code 

## Deciding what to work on

We maintain [a list of good first issues](https://github.com/PostHog/posthog/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) that are a great way to get started contributing to PostHog. You can also pick up any other open tickets, though they may be more or less scoped.

Outside of tickets, if there are small improvements to layout, text or functionality, feel free to raise a PR directly.

If you're planning to work on a bigger feature, and it's not in the list of issues, please raise an issue first so we can check whether that feature makes sense for PostHog as a whole.

## Testing

We expect all backend code to have corresponding tests. You can run the tests by running `bin/tests`. To specify a specific test (rather than running all tests) you can run `bin/tests posthog.api.test.test_action` for example.

At the moment, we do not have many frontend tests. Do make sure that each page you've touched (or that uses a component you touched) still functions as expected.

## Branch and commit message

If your pull request is related to an issue, please mention that issue in the pull request: `git checkout -b 263-logout-button`

In your initial commit message, mention the issue number again: `git commit -m "Closes #263 adds logout button"`. This way the corresponding ticket will automatically be closed once your pull request gets merged.

## Review process

When we review a PR, we'll look at the following things:
- Does the PR actually solve the issue?
- Does the solution make sense?
- Will the code perform with millions of events/users/actions?
- Are there tests and do they test the right things?
- Are there any security flaws?

Things we do not care about during review
- Syntax. If we're arguing about syntax, that means we should install a code formatter

Once that's done, we'll also QA your pull request.

## 🎉

You're done! Your code will be included in the next release of PostHog.
