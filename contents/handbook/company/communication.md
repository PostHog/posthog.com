---
title: Communication
sidebar: Handbook
showTitle: true
---

## Introduction

With team members across several countries, it's important for us to practice clear communication in ways that help us stay connected and work more efficiently.

To accomplish this, we use **asynchronous communication as a starting point** and stay as open and transparent as we can by communicating on GitHub through public issues and pull requests, as well as in our PostHog User and internal Slack.

## Our communication values

1. **Assume positive intent.** Always coming from a position of positivity and grace.
1. **Form an opinion.** We live in different locations and often have very different perspectives. We want to know your thoughts, opinions, and feelings on things.
1. **Feedback is essential.** Help everyone up their game in a direct but constructive way.

## Golden rules

1. Use **asynchronous communication** when possible: pull requests (preferred) or issues. Announcements happen on the appropriate Slack channels and [people should be able to do their work without getting interrupted by chat](https://m.signalvnoise.com/is-group-chat-making-you-sweat-744659addf7d#.21t7089jk).
1. Discussion in GitHub issues or pull requests is preferred over everything else. If you need a response urgently, you can Slack someone with a link to your comment on an issue or pull request, asking them to respond there. However, be aware that they still may not see it straight away (and that's OK in our book).
1. You are not expected to be available all the time. There is **no** expectation to respond to messages outside of your planned working hours.
1. It is 100% OK to ask as many questions as you have - please ask in public channels! If someone sends you a handbook link, that means they are proud that we have the answer documented - they don't mean that you should have found that yourself or that this is the complete answer. If the answer to a question isn't documented yet please immediately make a pull request to add it to the handbook in a place you have looked for it.
1. When someone asks for something, reply back with a deadline or by noting that you already did it. Answers like: 'will do', 'OK', or 'it is on my todo list' are not helpful. If it is a small task for you but will unblock someone else, consider spending a few minutes to do the task so the other person can move forward.
1. By default, avoid creating private groups for internal discussions.

## Public by default

We make things public by default because [transparency](/handbook/company/culture#transparency) is core to our culture. The kinds of information we share falls into one of three buckets:

- _Public_ - most things, including our product, roadmap, handbook and strategy.
- _Shared internally_ - almost everything else, such as financial performance, security, fundraising and recruitment.
- _Private internally_ - personal team information, i.e. compensation, disciplinary issues.

Information that is not publicly shared is in areas with complex signals that can impact our ability to sell, raise money or are inappropriate to share more widely for personal privacy reasons.


We have two repos to centralize and document private internal communication. These are the source of truth for any internal information, and anything that should be written down (as established in these guidelines) should live in these repos or (better) in this Handbook, not on Slack. This will make it easier when having to search for older stuff, sharing context between public and internal repos, and for newcomers to have all information they might need readily available.

### Company Internal
Repository can be found in https://github.com/PostHog/company-internal

Documents any company-wide information that can't be share publicly within People, Ops, Legal, Finance or Strategy.

**Examples of information that should go here:**
- ✅ Hiring plans and discussions _before_ we post a job ad
- ✅ People discussions, e.g. benefits, pensions, share options, org structure
- ✅ Onboarding/offboarding checklists
- ✅ Non-engineering team sprint planning (as these will often be a mix of public and private tasks and we don't want to restrict people)
- ✅ Sensitive discussions about future positioning, customer strategy, fundraising, board meetings
- ✅ [Sometimes] Discussions about replacing or adding tools, services, and systems that we use

For company-related issues that _can_ be discussed publicly, these should go in the `meta` repo which can be found in https://github.com/PostHog/meta/

**Examples of information that should NOT go here:**
- ❌ Any information that should be public (see guidelines on [public by default](/handbook/company/communication#public-by-default)), this should go in the public repositories (`posthog`, `posthog.com`, `meta`, ...). Things like:
  - Some marketing campaigns where it doesn't matter if our competitors see it; retros after campaigns
  - Offsite planning and retros
  - Discussions about future positioning and strategy that will end up in the Handbook anyway
  - Discussions about tools where there isn't a security risk and it interfaces with our customers (e.g. marketing, customer support)
  - Generally anything that will end up in the Handbook anyway, including culture and values discussions
- ❌ Bug reports, security issues, or any other engineering-related discussions. These should go in the [Product Internal](#product-internal) repo.
- ❌ Billing issues, product or growth discussions. These should go in the [Product Internal](#product-internal) repo.


### Product Internal
Repository can be found in https://github.com/PostHog/product-internal

Contains internal information related to the PostHog product. Documents any non-public information (as established in these guidelines) that specifically relates to engineering, product, growth or design.

This repository was introduced to aid maintenance and day-to-day usage of internal repositories. Having these discussions together with the company-wide information proved unwieldy. More context on [this decision](https://github.com/PostHog/company-internal/issues/262).

<blockquote>
Please be sure to read the README of the repo for guidelines on how to file specific issues.
</blockquote>


**Examples of information that should go here:**
- ✅ Vulnerabilities (security bugs) reports
- ✅ Bug reports where most of the context of the report depends on customer's PII. *Some bug reports require screenshots, recordings, or some other information that contains PII and as such can't be public.*
- ✅ Post-mortems on outages, or other issues affecting a large portion of customers. The results of these should usually be made public though.
- ✅ Documentation of internal infrastructure, where if it was public knowledge could provide valuable information to an attacker.
- ✅ Experiment (A/B testing) results.
- ✅ Product or growth strategy discussions (unless they should be public).
- ✅ Interview exercises or questions for engineering, product, growth or design tasks that should not be public.
- ✅ Documentation of engineering or product requirements documents that can't be public (these should be quite rare).
- ✅ Billing or pricing-related discussions that is not yet public.

**Examples of information that should NOT go here:**
- ❌ Any information that should be public (see guidelines on [public by default](/handbook/company/communication#public-by-default)), this should go in the public repositories (`posthog`, `posthog.com`, `meta`, ...).
- ❌ Any internal information that does not fall under the scope of purely engineering, product, growth or design. This should go in the [Company Internal](#company-internal) repo if private or `meta` if public. 
- ❌ Bug reports that don't contain any PII or where the PII only contains supporting information. In this case, file the bug under the relevant public repo and add a protected link to the additional information (e.g. a private Slack link, or a link to this repo).

## Written communication

### GitHub

#### Everything starts with a pull request

It's best practice to start a discussion where possible with a Pull Request (PR) instead of an issue. A PR is associated with a specific change that is proposed and transparent for everyone to review and openly discuss. The nature of PRs facilitate discussions around a proposed solution to a problem that is actionable. A PR is actionable, while an issue will inevitably lead to a longer period before the problem is addressed.

Always open a PR for things you are suggesting and/or proposing. Whether something is not working right or we are iterating on new internal process, it is worth opening a pull request with the minimal viable change instead of opening an issue encouraging open feedback on the problem without proposing any specific change directly. Remember, a PR also invites discussion, but it's specific to the proposed change, which facilitates focused decisions.

By default, pull requests are **non-confidential**. However, for things that are not public please open a confidential issue with suggestions to specific changes that you are proposing. When possible, consider not including sensitive information so the wider community can contribute.

Not every solution will solve the problem at hand. Keep discussions focused by _defining the problem first_ and _explaining your rationale_ behind the Minimal Viable Change (MVC) proposed in the PR. Have a bias for action and don't aim for consensus - some improvement is better than none.

#### Issues

GitHub Issues are useful when there isn't a specific code change that is being proposed or needed. For example, you may want to start an issue for tracking progress or for project management purposes that do not pertain to code commits. This can be particularly useful when tracking team tasks and creating issue boards.

However, it is still important to maintain focus when opening issues by defining a single specific topic of discussion as well as defining the desired outcome that would result in the resolution of the issue. The point is to not keep issues open-ended and to prevent issues from going stale due to lack of resolution. For example, a team member may open an issue to track the progress of a blog post with associated to-do items that need to be completed by a certain date (e.g. first draft, peer review, publish). Once the specific items are completed, the issue can successfully be closed.

> **Note:** If you're new to using GitHub, [check out this handy primer](/handbook/company/new-to-github) - it's specific to how we use GitHub at PostHog. You'll learn the key concepts and how to manage notifications. It's important, as this is where the bulk of our company-wide communication happens. (Think of GitHub notifications as a replacement for your work email.)

### Product definitions & decisions

It's best practice to get feedback from other members of the team when making a product decision or defining a complex problem that needs to be solved. This may start with an Issue, but it's essential that these do not spiral out of control - as soon as an issue has more than 5 comments, it becomes difficult for someone to "catch up". To avoid this problem, when we're documenting a decision or a definition for a project or project, we should start with a Pull Request.

You should start by adding a "request for comments" (RFC) markdown file into to a public repo (e.g. posthog/meta), here's a template (https://github.com/PostHog/meta/pull/19) and adding people you need feedback from as a reviewer. On the rare occasion that this cannot be public, create the PR in the product-internal repo.

If you see an Issue which is spiraling out of control with comments, you are empowered to call this out and direct the owner of the Issue to move this to a PR.

When a decision is fully aligned on, the PR should be merged.

#### Keeping on top of reviews, issues and notifications

Keeping track of everything that's happening in GitHub can be daunting, but it's important to make sure your team receives reviews and feedback on a timely manner.

To keep on top of this, we suggest going through issues where you've been mentioned regularly. Some tricks which can help are:
- [Turning on GitHub email notifications](https://docs.github.com/en/github/managing-subscriptions-and-notifications-on-github/configuring-notifications) and using filters to file them away.
- [Using the GitHub notifier extension.](https://chrome.google.com/webstore/detail/notifier-for-github/lmjdlojahmbbcodnpecnjnmlddbkjhnn?hl=en)

#### Tip for easy searching through everything

To search all code, PRs and issues every written at PostHog you can search everything in the PostHog organization on Github. To do that can go to [github.com/posthog](https://github.com/posthog) and search in the top left corner.

For extra convenience, you can also add this search as a 'search engine' in Chrome. That way you can type in `ph <tab>` and instantly find anything. To do that, follow these steps:

1. Hit `command` + `,` in your browser
1. Type `search`, find "manage search engines"
1. Click "add" next to "other search engines"
1. For "Search engine" type in `github posthog organization`
1. For "keyword" type in `ph`
1. For "url" copy in `https://github.com/search?q=org%3Aposthog+%s&type=issues`

You can now type `ph` + `tab` into your browser and search issues directly

### Slack

Slack is used for more informal communication, or where it doesn't make sense to create an issue or pull request. Use your judgment to determine the appropriate channel, and whether you should be chatting publicly (default) or privately.

Also keep in mind that, as an open source platform, PostHog has contributors who don't have access to Slack. Having too much context in a private location can be detrimental to those who are trying to understand the rationale for a certain decision.

**Slack etiquette**

Slack is used differently in different organizations. Here are some guidelines for how we use Slack at PostHog:

1. Keep `#general` open for company-wide announcements.
1. `@channel` or `@here` mentions should be reserved for urgent or time-sensitive posts that require immediate attention by everyone in the channel. (Examples: changing a meeting invite URL just before a meeting, or soliciting urgent help for a service disruption, where you're not sure who is immediately available)
1. Make use of threads when responding to a post. This allows informal discussion to take place without notifications being sent to everyone in the channel on every reply.
1. When possible, summarize multiple thoughts into a single message instead of sending multiple messages sequentially.

### Google Docs and Slides

Never use a Google Doc / Slides for something non-confidential that has to end up on the website or this handbook. Work on these edits via commits to a pull request. Then link to the pull request or diff to present the change to people. This prevents a duplication of effort and/or an out of date handbook.

We mainly use Google Docs to capture internal information like meeting notes or to share company updates and metrics. We always make the doc accessible so you can comment and ask questions.

Please avoid using presentations for internal use. They are a poor substitute for a discussion on an issue. They lack the depth, and don't add enough context to enable asynchronous work.

When giving a talk which requires a presentation, use [Pitch](https://pitch.com) to build your slides. (It offers more control over design than Google Slides.) They also have a [desktop app](https://pitch.com/download). We don't (yet) have templates configured, but you can draw from existing slides in other presentations - just copy/paste into your own presentation and modify accordingly. If you'd like assistance with slide design (or using Pitch), talk to Cory.

James (H) and Cory are admins on the Pitch account. Because Pitch charges per seat, we remove users who only need periodic access but can easily re-add when needed.

### Email

1. Internal email should be avoided in nearly all cases. Use GitHub for feature / product discussion, use Slack if you cannot use GitHub, and use Google Docs for anything else.
1. The only uses we have for internal email are:
   - Obtaining approvals for legal things
   - Sending some types of more official company documents (e.g. job offers, payroll forms)
   - Communicating with external partners

### Writing style

1. We use American English as the standard written language in our public-facing comms, including this handbook. This extends to date formats (September 4, 2021) and defaulting pricing to the US Dollar ($42).
1. Do not use acronyms when you can avoid them. Acronyms have the effect of excluding people from the conversation if they are not familiar with a particular term.
1. Common terms can be abbreviated without periods unless absolutely necessary, as it's more friendly to read on a screen. (Ex: _USA_ instead of _U.S.A._, or _vs_ over _vs._)
1. We use the [Oxford comma](https://www.grammarly.com/blog/what-is-the-oxford-comma-and-why-do-people-care-so-much-about-it/).
1. Do not create links like "here" or "click here". All links should have relevant anchor text that describes what they link to. Using meaningful links is important to both search engine crawlers (SEO) and people with accessibility issues.
1. We use sentence case for titles.
1. When writing numbers in the thousands to the billions, it's acceptable to abbreviate them (like 10M or 100B - capital letter, no space). If you write out the full number, use commas (like 15,000,000).


## Internal meetings

PostHog uses [Zoom](https://zoom.us/) for video communications. Zoom also has useful plugins for [Google Calendar](https://chrome.google.com/webstore/detail/zoom-scheduler/kgjfgplpablkjnlkjmjdecgdpfankdle?hl=en-US) and Slack which you may wish to use.

Use video calls if you find yourself going back and forth in an issue/via email or over chat. Sometimes it is still more valuable to have a 40+ message conversation via chat as it improves transparency, is easy to refer back to, and is friendlier to newcomers getting up to speed.

1. Most scheduled meetings should have a Google Doc linked or a relevant GitHub issue. This contains an agenda, including any preparation materials.
1. Please click 'Guests can modify event' so people can update the time in the calendar instead of having to reach out via other channels. You can configure this to be checked by default under [Event Settings](https://calendar.google.com/calendar/r/settings).
1. Try to have your video on at all times because it's much more engaging for participants. Having pets, children, significant others, friends, and family visible during video chats is encouraged - please introduce them!
1. As a remote company we are always striving to have the highest fidelity, collaborative conversations. Use of a headset with a microphone, is strongly recommended - use your company card if you need.
1. Always advise participants to mute their mics if there is unnecessary background noise to ensure the speaker is able to be heard by all attendees.
1. You should take notes of the points and to-dos during the meeting. Being able to structure conclusions and follow-up actions in real time makes a video call more effective than an in-person meeting. If it is important enough to schedule a meeting, it is important enough to have taken notes.
1. We start on time and do not wait for people. People are expected to join no later than the scheduled minute of the meeting, and we don't spend time bringing latecomers up to speed.
1. It can feel rude in video calls to interrupt people. This is because the latency causes you to talk over the speaker for longer than during an in-person meeting. You should not be discouraged by this, as the questions and context provided by interruptions are valuable.
1. We end on the scheduled time. Again, it might feel rude to end a meeting, but you're actually allowing all attendees to be on time for their next meeting.
1. It is unusual to smoke or vape in an open office, and the same goes for video calls - please don't do this out of respect for others on the call.

For external meetings, the above is also helpful. We also have separate guidance on [how to run a great demo](/handbook/growth/sales/demos).

### Indicating availability

1. Put your planned away time including holidays, vacation, travel time, and other leave in your own calendar.
1. Set your working hours in your Google Calendar - you can do this under _Settings_ > _Working Hours_. This is helpful as we work across different timezones.

### Google Calendar

We recommend you set your Google Calendar access permissions to 'Make available for PostHog - See all event details'. Consider marking the following appointments as 'Private':

1. Personal appointments
1. Particularly confidential & sensitive meetings with third-parties outside of PostHog
1. 1-1 performance or evaluation meetings
1. Meetings on organizational changes

### Calendly

We use Calendly for scheduling external meetings, such as demos or product feedback calls. If you need an account, ask Charles to invite you to the PostHog team account. 
