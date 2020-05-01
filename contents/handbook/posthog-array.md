---
title: PostHog Array
sidebar: Company
showTitle: true
---
The PostHog Array is our release newsletter and blog post, it serves 2 purposes
- Updating the community that a new version has been released and what new features and functionality they can expect if they update.
- Updating the community on PostHog itself, what we have been doing, finding interesting as well as selecting favorite contributions from the community.

This section of the Handbook will guide you through generating the PostHog Array when PostHog is releasing a new version.

## 1. What has happened since the last release?

As part of releasing a new version you will need to figure out what has been [updated in the new release.](https://handbook.posthog.com/#/dev/development-process/release-new-version)

- `git log --pretty=format:%s [old-version]..head` will give you the pull requests that are new, you will need to split them into 4 categories:

- PostHog Updates
	- Updates that fit this category are front-end changes that introduce new or updated functionality and new libraries or integrations (including community ones).
- Performance Updates
	- Updates that fit this category will be back-end changes that have improved performance (this could be speed or logic, performance is somewhat subjective) and select bug fixes that can be considered impactful to PostHog UX.
- Changelog updates
	- Updates that fit this category are bug fixes not included in the above or minor performance updates.
- Non Changelog updates
	- Updates that serve no impact on PostHog, examples include the PR to update the Changelog, or bump version prs

## 2. Write the PostHog Array

Create a new post in the WP PostHog domain, the title is always The PostHog Array followed by the version number. Categrorize this as the Weekly Update. The featured image should be a high quality image of a (cute) Hedgehog with a width of 2000 pixels.

The image needs to be available for commercial use without attribution, [unsplash](https://unsplash.com/) is a good place to use.

The first section should always include links to the PostHog docs regarding [upgrading.](https://docs.posthog.com/#/upgrading-posthog)

The sections are as follows, images and gifs are preferable in all PostHog updates and some performance updates:
- PostHog Updates
- Performance updates
- Favorite issue
- PR of the week
- Repo round up
- PostHog news

Favorite issues should be selected for enhancements brought up by new users, or particlularly in depth discussions on how to solve specific problems.

PR of the week should highlight a contributor we are particularly thankful for putting the effort in to create a pull request.

Repo round up should be 3 interesting repositories that may have come from HN, github trending or other source that week.

PostHog news can cover any news about PostHog the company or any of its employees.

## 3. Distributing the PostHog Array

Check with Tim that the new version has been released and Docker images have been built and publish.

Copy the content into our Mailchimp campaign and send to subscribers as well as posting on Twitter and Linkedin and HN

