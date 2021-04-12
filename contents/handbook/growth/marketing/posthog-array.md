---
title: PostHog Array
sidebar: Handbook
showTitle: true
---

<br />

The PostHog Array is our Newsletter and Blog for new releases. It serves 2 purposes:
- Letting the community know that a new version has been released and what new features and functionality they can expect if they update. This makes the platform more valuable and builds word of mouth growth.
- Encouraging users to take part in the community.

This section of the Handbook will guide you through generating the PostHog Array when PostHog is releasing a new version.

## 1. What has happened since the last release?

As part of releasing a new version you will need to figure out what has been [updated in the new release.](../engineering/release-new-version)

- `git log --pretty=format:%s [old-version]..head` will give you the pull requests that are new, you will need to split them into 4 categories:

- Release notes:
	- Updates that fit this category are front-end changes that introduce new or updated functionality and new libraries or integrations (including community ones).
- Performance Updates:
	- Updates that fit this category will be back-end changes that have improved performance (this could be speed or logic, performance is somewhat subjective) and select bug fixes that can be considered impactful to PostHog UX.
- Changelog updates:
	- Updates that fit this category are bug fixes not included in the above or minor performance updates.
- Non-Changelog updates:
	- Updates that serve no impact on PostHog, examples include the PR to update the Changelog, or bump version PRs.

If there are any new integration libraries - these won't appear above (since they go into their own repos). You need to double check if we built support for any new languages by looking or asking :)

## 2. Write the PostHog Array

### How to Write

* Run ```git clone https://github.com/posthog/posthog.com```
* Create a branch for the new post ```git checkout -b posthog_array_VERSION```
* Run ```cd posthog.com/contents/blog```
* Run ```touch the-posthog-array-[NEW VERSION].md```
* You now need to edit the file you just created above, with content as per the instructions below. It's easiest to copy a previous week and delete out the content to get the formatting right (of images and the header).
* When it's saved, you need to add the post link to ```src/sidebars.json```, in order for it to appear in the navigation.
* You also need to update the link on the homepage "What's New" section. go to ```src/pages/index.js``` to edit this.
* Run ```gatsby develop``` from the root folder to check the formatting works, and visit ```localhost:8000``` in your browser.
* If everything looks good, create a commit and message with ```git add .``` then ```git commit -m "your message"```.
* Now it's time to push the branch to GitHub. Run ```git push --set-upstream origin posthog_array_VERSION```.
* Go to GitHub and create a pull request to merge the branch you just made with master. Request James Hawkins as the reviewer.

Refer to more information on [updating our documentation](/docs/updating-documentation), if you are wondering how to use images correctly.

### Content

The first section should always include links to the PostHog Docs regarding [upgrading](/docs/configuring-posthog/upgrading-posthog).

The sections are as follows, with images and GIFs being preferred in all PostHog updates and some performance updates:
- Release notes
- Performance updates
- Favorite issue
- PR of the week
- Repo round up
- PostHog News

Favorite issues should be selected for enhancements brought up by new users, or particularly in-depth discussions on how to solve specific problems.

PR of the week should highlight a contributor we are particularly thankful for putting the effort in to create a pull request.

Repo round up should be 3 interesting repositories that may have come from Hacker News, GitHub Trending or other source that week.

PostHog News can cover any news about PostHog the company or any of its employees.

## 3. Distributing the PostHog Array

Check with Tim that the new version has been released and Docker images have been built and published.

Copy the content into our Mailchimp campaign and send to subscribers as well as posting on Twitter, Linkedin, and HackerNews.

You should find a high quality hedgehog image (2,000px wide) for the above. The image needs to be available for commercial use without attribution, with [Unsplash](https://unsplash.com/) being a good source for this.
