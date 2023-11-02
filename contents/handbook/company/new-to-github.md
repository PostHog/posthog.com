---
title: A primer on using GitHub at PostHog
showTitle: true
---

<blockquote><p>If you’re new to GitHub, it can be a little confusing. (Heck, I’ve been using GitHub for years and it’s <em>still</em> confusing.) It doesn’t have the best search and notifications can get out of hand — and in general, it can be really intimidating to join a company that uses a tool you’ve never used before as its primary means of communication.</p><p>I wrote this guide to help explain how we work, and how to stay on top of the volume of information that flows through our team's organization on GitHub.</p><p><em>- <a href="/community/profiles/2">Cory Watilo</a>, Lead Designer</em></p><p>P.S. Have questions? Feel free to file an issue on GitHub - I explain how to do this <a href="/handbook/company/new-to-github#filing-an-issue">later in the article</a>!</p></blockquote>

## Key concepts

At its core, GitHub essentially hosts code that helps keep everyone in sync. Each team member can download this code, make changes, and upload their changes back into GitHub.

Code is stored in a “repository” (or “repo” for short) - it’s like a folder for code. (As of writing this, PostHog has [152 repos](https://github.com/posthog) - like the code for [posthog.com](http://posthog.com) and even a repo for internal company discussions that doesn’t actually contain any code.) This is because each repo comes with a handful of collaboration tools. Here’s a list of the key concepts on GitHub:

1. Discussions
2. Issues
3. Projects
4. Pull requests
5. Actions

You can take any task linearly from start to finish using this set of tools, though you don’t have to use them all. (For example, PostHog doesn’t really use Discussions, and Projects are only used by certain teams.) But if you wanted to use the whole suite, here’s how it would work:

1. If you decide you want to change something in the product or website, you could start a *discussion* about it. This is like a casual forum-style conversation. (Again, we don't use these.
2. A discussion can be converted to an *issue*, which is a formalized proposal of the discussion.) People can reply to these posts with feedback.
3. In my workflow, this is a good time to add the issue to a *project*, because it’s something you want to track through to completion. Project boards are a great way to stack-rank tasks (issues), because you can order them in a way that makes sense based upon the project and see everything in one place. This helps keep a team in sync.
4. A *pull request* (also known as a *PR*) references the code that’s changed to solve an *issue*. It’s a way to summarize the changes in code and explain them so others can review them.
5. *Actions* usually occur after you commit code. It makes sure things are working as expected (and that whoever wrote the code didn’t break anything). (Don't worry about these for now.)

You can use any of these features on their own, or use them together. Primarily, PostHog uses issues, pull requests, and actions. If you’re not super familiar with GitHub, just focus on issues and pull requests, as that’s where the bulk of the interesting work happens.

Note: The PostHog handbook covers GitHub issues and pull requests, and suggests [everything should start with a pull request](/handbook/company/communication#github) because it represents one of our values, "[bias for impact](/handbook/company/values#bias-for-impact)".

## Notifications

The best way to stay up-to-date with what happens on GitHub is by subscribing to (following) the areas that are most relevant to what you do. This sends updates to your GitHub notifications.

By default, you’ll receive email notifications for everything you subscribe to. There are a few ways this happens:

1. Creating an issue or pull request
2. Commenting on an issue or pull request
3. “Watching” a repository

As I’m not a huge fan of email, I prefer to visit a centralized place for my GitHub notifications, although many engineers prefer email notifications. Personally, I don’t like GitHub’s [/notifications](https://github.com/notifications) page, as it feels cumbersome (slow) to read through updates. Here are two much better ways to consume GitHub notifications (entirely my opinion):

1. [GitHub’s iPad app](https://apps.apple.com/us/app/github/id1477376905?platform=ipad) - provides an email-like interface that feels a lot more natural to reading notifications github.com/notifications. (If only GitHub had this UI on the web...)
2. [octobox.io](http://octobox.io) - uses the same email-like interface, but in a browser

I have [octobox.io](http://octobox.io) set to my homepage in Chrome, so anytime I want to see my notifications, I just click the Home button and I have one-click access to my work “inbox”.

## Install the GitHub app in Slack

A great way to get realtime updates about what’s happening in GitHub is to install the [GitHub Slack app](https://slack.github.com/) and subscribe to repos. After linking with your Slack account, type `/github subscribe posthog/posthog.com` (org/repo-name) in Slack, for example, to get updates when things happen in the posthog.com repo.

## Finding issues or pull requests

Given the volume of issues and PRs, search will be your best friend. Unfortunately GitHub’s global search leaves something to be desired, so usually the easiest way to find something is to visit a repo, then clicking either [Issues](https://github.com/PostHog/posthog.com/issues) or [Pull requests](https://github.com/PostHog/posthog.com/pulls) (depending on what you're looking for) and searching from there. Type a few keywords, and if you know who authored the issue or PR, apply an author search. (You’ll see GitHub pre-populate search syntax (eg: `is:open is:issue author:corywatilo`), similar to how Gmail’s search works.

## Filing an issue

Issue is the primary method of getting a message in front of the team. Think of it like creating a ticket in a typical project management system. (We prefer issues over Slack messages because it's public and can sync with the rest of our code workflow. You can use Slack if you’d like to bump an issue to a group of people, but link to the issue (or PR) as GitHub acts as our source of truth.)

### Issue templates

Some repos have issue templates set up to make issue creation faster. However, if the issue you’re going to create doesn’t fit into one of these templates, don’t worry about these! Just create a new blank issue.

### Referencing another issue

This isn’t mandatory, but if your issue is related to other (previous) issues, it’s worth cross-linking so others have full context. To cross-link in an issue or PR, type a `#` and either part of an issue’s/PR’s name or number and GitHub will populate a list of items that match.

You can find an issue’s or PR’s number in the URL.

### Writing Markdown

It can take some getting used to if you’ve never written Markdown syntax. Fortunately GitHub makes it easy by providing WYSIWYG buttons. When you press a button like `B`, `I`, or `U`, GitHub will insert the Markdown code required to format your text accordingly.

**Tips for faster writing**

- You can use keyboard shortcuts like you would in a word processor.
- Quickly insert a link by copying it to your clipboard, selecting the word or phrase you’d like to link, then using `Cmd + V`. GitHub will automatically convert the text into a link.
- Create a checklist by typing `- [ ] Your text`. You (and others) can check things off of this list after the issue/PR is created.
- Paste an image from your clipboard directly into an issue/PR. It’s much faster than attaching from your computer. For example, if you’re screenshotting something on a Mac, use `Cmd + Shift + Ctrl + 4` to select part of your screen, then `Cmd + V` into an issue. GitHub will upload the image automatically and add the Markdown embed code for you. Voila!

## Creating a pull request

If you see something minor on [posthog.com](http://posthog.com) (in Handbook or Docs) that needs to be updated, you can easily propose the change by creating a pull request _without_ having to run the full codebase on your computer. (This is a great way to contribute if you're in a less-technical role.) To make a small change, find the *Edit this page* link within the Handbook or Docs which will take you to GitHub where you’ll see the source file. From there, click the pencil icon. (Our Handbook and Docs use the same Markdown format as GitHub’s issue and PR editor, so this should look familiar!)

When you’re done making your changes, be sure to preview what the changes look like (to make sure formatting is accurate). At the bottom of the page, you’ll see a section called *Commit changes*. Here’s how to use it:

- Briefly describe the change you made in the top line
- Optionally add a more detailed description
- Choose “Create a new branch...” and optionally give it a name (but not required)

Clicking *Propose changes* will create a pull request!

### "Closing keywords"

If you’re changing code to address an open issue, you can tell GitHub to automatically close the issue when the PR is merged by using a closing keyword. For example, in your PR description, you can write “Closes #123” (where #123 is an issue number). 

### Requesting a review

Now that your PR is created, you can request a review (best practice) from someone relevant so they can make sure everything looks good and that they agree the change is ready to go live. They’ll be notified of your request. (By the way, you can filter to reviews that others request from you by going to your notifications, then choosing the [Review requested](https://github.com/notifications?query=reason%3Areview-requested) filter.)

### Previewing changes

If you're making changes to posthog.com, you'll be able to see your changes on a "preview" version of the website. It takes 10-20 minutes for this preview to be ready.

(Remember when I said we also use GitHub Actions? It basically runs some automated tests to make sure everything is spelled correctly and that nothing else broke.)

Near the bottom of a pull request page, you'll see a box like this:

![Checks](https://user-images.githubusercontent.com/154479/166337172-e9478e1d-a413-4a4b-93a3-04d151975904.png)

(Note: This box only appears if you're a member of the PostHog GitHub org - it's not available to the public.)

You can click the _Visit Preview_ link in the Vercel bot comment to see the preview.

### Merging changes

Once a team member approves your pull request, you (or they) can publish the changes by clicking the _Squash and merge_ button. It will take another 10-20 minutes for your changes to appear on the site, but they'll go live automatically. At that point, you can send a link to your friends and family and tell them you're a coder now!

## Next steps

This was a primer on using GitHub for communication at PostHog. If you’re interested in making more substantial changes to the website, you can follow our instructions on [how to develop the website.](https://posthog.com/handbook/engineering/posthog-com/developing-the-website) It can take a little work to get your computer set up to run the site from your computer, so don't hesitate to reach out for help if you get stuck – or don't even know where to begin. That's what we're here for!
