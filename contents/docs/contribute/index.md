---
title: Contribute to PostHog
sidebarTitle: Overview
sidebar: Docs
showTitle: true
---

We love contributions to PostHog, big or small. Here's what you need to know about contributing to our product:

## Being a part of the community

We have an awesome, diverse, and inclusive community. In order to maintain and grow this, all community members must adhere to our [Code of conduct](/docs/contribute/code-of-conduct).

## Reporting bugs or issues

Bug reports help us make PostHog better for everyone. When you [report a bug](https://github.com/PostHog/posthog/issues/new/choose), the description will automatically be filled with a template that makes is very clear what we'd like you to add.

Before raising a new issue, please [search within existing ones](https://github.com/PostHog/posthog/issues) to make sure you're not creating a duplicate.

<blockquote class='warning-note'>
    <b>Important:</b> If your issue is related to security, please email us directly at <a href="mailto:security@posthog.com">security@posthog.com</a> instead of creating a GitHub issue.
</blockquote>

## Deciding what to work on

We maintain [a list of good first issues](https://github.com/PostHog/posthog/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) that are a great way to get started contributing to the PostHog open-source product analytics platform. You can also pick up any other open tickets, though they may be more complicated to work with. If in doubt, just leave a comment for the author of the issue! Outside of tickets, if there are small improvements to layout, text, or functionality, feel free to create a pull request directly.

You can also [update PostHog's documentation, handbook, or write a blog post](/handbook/engineering/posthog-com/developing-the-website). We maintain [a list of good first issues](https://github.com/PostHog/posthog.com/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) here too. Take a look at our [style guide](https://github.com/PostHog/posthog.com/blob/master/STYLEGUIDE.md) before getting started.

If you're planning to work on a bigger feature that is not on the list of issues, please raise an issue first so we can check whether that feature makes sense for PostHog as a whole.

## Writing and submitting code

Anyone can contribute code to PostHog, including you! To get started, follow our [local development guide](/handbook/engineering/developing-locally). Then, make your change and submit a pull request to the [`posthog` repository](https://github.com/PostHog/posthog). We'll be delighted to review your change.

## Licensing

Most of PostHog's code is under the [MIT license](https://opensource.org/licenses/MIT), as [included in the PostHog repository](https://github.com/PostHog/posthog/blob/master/LICENSE) on GitHub. Code of paid features, however, is covered by a [proprietary license](https://github.com/PostHog/posthog/blob/master/ee/LICENSE).

Any third party components incorporated into our code are licensed under the original license provided by the owner of the applicable component.

It is worth specifically mentioning any components that use LGPL, such as `flake8-import-order@0.18.1` and `psycopg2-binary@2.8.4`. The terms of the LGPL license mean that any changes we make to these libraries need to be shared under LGPL as well.
