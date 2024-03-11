---
date: 2020-11-30
title: Array 1.18.0
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/array/default.png
featuredImageType: standard
category: PostHog news
tags:
  - Product updates
  - Release notes
---

Our primary goals for this release were to iron out bugs and improve the user experience of our Beta features.

As a result, we fixed **a whole lot of stuff**. We merged dozens of PRs with session recording fixes and improvements, and a dozen more with updates to our apps functionality. We also improved things like event ingestion, the UX for feature flags, and our settings for both organizations and projects. You can read through the entire list of fixes [later in this post](#bug-fixes-and-performance-improvements), but beware: it's quite long.

Finally, thank you to everyone who helped us out with feedback and contributions during this release cycle, you help us make PostHog better every day.

## Release Notes

> If you're self-hosting and want to upgrade for a better experience with nicer features, remember to [update your PostHog instance](/docs/runbook/upgrading-posthog).

### [New Event Selection Box](https://github.com/PostHog/posthog/pull/2394)

![Events Box Screenshot](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/array/events-box.png)

We upgraded our event selection box to include actions and events in one, as well as provide smarter recommendations of events and actions you might want to use of based frequently used in queries by you or your team.

### [Improvements to posthog-js](https://github.com/PostHog/posthog-js)

A new version of `posthog-js` is available and we recommend you to update if you've installed it via `npm`. Snippet users have access to the latest version by default.

The new version includes a lot of bugfixes that improve our session recording feature, as well as is significantly lighter, having had [a lot of legacy code removed](https://github.com/PostHog/posthog-js/pull/128). 

R.I.P. to the hundreds of lines of JavaScript that were removed - you will not be missed.

### [Apps are now available on Kubernetes deployments](https://github.com/PostHog/charts/pull/24)

Following feedback from a user, we have now added support for [PostHog Apps](/docs/plugins/overview) to our Helm chart. 

If you're using the chart to deploy PostHog, upgrading to the latest version will give you access to the new app server (Beta).

### [Session Recording Improvements](https://github.com/PostHog/posthog/pulls?q=is%3Apr+is%3Aclosed+session)

Out of the many improvements to session recording, there are some worth mentioning specifically:

- Keyboard shortcuts for the session recording player (`spacebar` to pause/play, `f` to open player in full screen)
- Ability to jump back/forward 8 seconds with the keyboard arrows (or player button)
- Full-screen support for the session recording player without losing the controls bar
- Pause/Play recording when clicking on the video
- Skipping inactivity made clearer with an overlay over the player
- The session recording player is now responsive to the client's screen size
- Incomplete session recordings (i.e. "blank screens") are now hidden from the list 

### [Honorary Mention: Requiring Curly Brackets](https://github.com/PostHog/posthog/pull/2505)

Our codebase now disallows bracket-less control structures, enforcing curly brackets on `if` statements for unbeatable readability. 

As described by Michael, one of our engineers:

_"They don't do anything, yet we thank them for their existence."_

## Share your feedback
We'd love to hear anything you have to say about PostHog, good or bad. As a thank you, we'll share some awesome [PostHog merch](https://merch.posthog.com).

Want to get involved? [Email us to schedule a 30 minute call](mailto:hey@posthog.com) with one of our teams to help us make PostHog even better!

## Favorite Issue

### [Release 1.18.0](https://github.com/PostHog/posthog/issues/2366)

If you didn't already know, in the interest of transparency, we plan our next releases openly on GitHub, so you can always keep up with what we're up to during a release cycle.

## Community Shoutouts

Big thanks to the following members of our community who have contributed to PostHog over this release cycle:

- [samcaspus](https://github.com/samcaspus)
- [satheesh1997](https://github.com/satheesh1997)
- [jessethegame](https://github.com/jessethegame)
- [adamb70](https://github.com/adamb70)
- [ngonik](https://github.com/ngonik)
- [hgezim](https://github.com/hgezim)
- [cpankajr](https://github.com/cpankajr)
- [brianetaveras](https://github.com/brianetaveras)

## Open Roles

Are you a Lead Designer or Fullstack Engineer? 

Or perhaps you're not either but think you'd still be a good fit for PostHog? 

[We want you!](https://posthog.com/careers) 


## Bug Fixes and Performance Improvements

In addition to the highlights listed above, we also merged a bunch of PRs improving PostHog's performance and fixing bugs:

- Update posthog-js to latest, use \(undocumented\) option \_capture\_metrics [\#2561](https://github.com/PostHog/posthog/pull/2561) ([macobo](https://github.com/macobo))
- Cohort search bar fix [\#2557](https://github.com/PostHog/posthog/pull/2557) ([samcaspus](https://github.com/samcaspus))
- Bump posthog-js 1.7.2 [\#2555](https://github.com/PostHog/posthog/pull/2555) ([timgl](https://github.com/timgl))
- Fix posthog identify [\#2552](https://github.com/PostHog/posthog/pull/2552) ([timgl](https://github.com/timgl))
- Update posthog-js [\#2551](https://github.com/PostHog/posthog/pull/2551) ([macobo](https://github.com/macobo))
- Show resolution + duration/date on session player [\#2550](https://github.com/PostHog/posthog/pull/2550) ([macobo](https://github.com/macobo))
- Fix non-null assertion in SessionsPlayerDrawer.tsx [\#2549](https://github.com/PostHog/posthog/pull/2549) ([Twixes](https://github.com/Twixes))
- Don't show session recording play button if no FullSnapshot rrweb events [\#2547](https://github.com/PostHog/posthog/pull/2547) ([macobo](https://github.com/macobo))
- Don't toggle rows when viewing player [\#2546](https://github.com/PostHog/posthog/pull/2546) ([macobo](https://github.com/macobo))
- Closes \#2542 remove send event overlay and replace with warning [\#2544](https://github.com/PostHog/posthog/pull/2544) ([timgl](https://github.com/timgl))
- Closes \#2508 Fix cohort days [\#2543](https://github.com/PostHog/posthog/pull/2543) ([timgl](https://github.com/timgl))
- Move away from ewap to speed up queries [\#2540](https://github.com/PostHog/posthog/pull/2540) ([timgl](https://github.com/timgl))
- Fix Not all users have names [\#2539](https://github.com/PostHog/posthog/pull/2539) ([timgl](https://github.com/timgl))
- UI improvements to sessions page [\#2538](https://github.com/PostHog/posthog/pull/2538) ([paolodamico](https://github.com/paolodamico))
- Removes legacy cloud billing from EE [\#2537](https://github.com/PostHog/posthog/pull/2537) ([paolodamico](https://github.com/paolodamico))
- Fix redirecting to /persons after deleting user [\#2533](https://github.com/PostHog/posthog/pull/2533) ([timgl](https://github.com/timgl))
- Fix flaky demo data test [\#2530](https://github.com/PostHog/posthog/pull/2530) ([macobo](https://github.com/macobo))
- Fix linting errors broken on master [\#2529](https://github.com/PostHog/posthog/pull/2529) ([macobo](https://github.com/macobo))
- Return person data together with session recording [\#2528](https://github.com/PostHog/posthog/pull/2528) ([macobo](https://github.com/macobo))
- Fix /bin/tests [\#2527](https://github.com/PostHog/posthog/pull/2527) ([macobo](https://github.com/macobo))
- Show which heroku processes are optional [\#2526](https://github.com/PostHog/posthog/pull/2526) ([timgl](https://github.com/timgl))
- Fix celery heartbeat bug, Add redis & apps to preflight [\#2520](https://github.com/PostHog/posthog/pull/2520) ([mariusandra](https://github.com/mariusandra))
- Move redis status closer to other fields [\#2519](https://github.com/PostHog/posthog/pull/2519) ([mariusandra](https://github.com/mariusandra))
- Update posthog-js and posthog-react-rrweb-player [\#2518](https://github.com/PostHog/posthog/pull/2518) ([macobo](https://github.com/macobo))
- Show session player icons as greyed out if visited [\#2517](https://github.com/PostHog/posthog/pull/2517) ([macobo](https://github.com/macobo))
- Disable celery heartbeat, gossip and mingle [\#2513](https://github.com/PostHog/posthog/pull/2513) ([mariusandra](https://github.com/mariusandra))
- Closes \#2508 Fix cohorts sessions [\#2512](https://github.com/PostHog/posthog/pull/2512) ([timgl](https://github.com/timgl))
- Increase sentry max string length by a lot [\#2510](https://github.com/PostHog/posthog/pull/2510) ([macobo](https://github.com/macobo))
- Fix entity.py comment [\#2507](https://github.com/PostHog/posthog/pull/2507) ([jessethegame](https://github.com/jessethegame))
- Update posthog-js to 1.7.0 beta-1 [\#2506](https://github.com/PostHog/posthog/pull/2506) ([macobo](https://github.com/macobo))
- Require curly brackets around if statements [\#2505](https://github.com/PostHog/posthog/pull/2505) ([mariusandra](https://github.com/mariusandra))
- typo fix in changelog [\#2504](https://github.com/PostHog/posthog/pull/2504) ([jamesefhawkins](https://github.com/jamesefhawkins))
- Hotfix: fix session recordings [\#2502](https://github.com/PostHog/posthog/pull/2502) ([macobo](https://github.com/macobo))
- Make Plugins page a bit nicer [\#2500](https://github.com/PostHog/posthog/pull/2500) ([Twixes](https://github.com/Twixes))
- Health endpoint to reflect migration status [\#2498](https://github.com/PostHog/posthog/pull/2498) ([fuziontech](https://github.com/fuziontech))
- Fix various caching issues [\#2496](https://github.com/PostHog/posthog/pull/2496) ([timgl](https://github.com/timgl))
- Update PR template style and add Jest checklist item [\#2495](https://github.com/PostHog/posthog/pull/2495) ([Twixes](https://github.com/Twixes))
- Disallow inviteless signup on initiated self-hosted instances [\#2489](https://github.com/PostHog/posthog/pull/2489) ([Twixes](https://github.com/Twixes))
- Enhance webhook integration UX [\#2488](https://github.com/PostHog/posthog/pull/2488) ([Twixes](https://github.com/Twixes))
- Refactor camelCase util with Jest tests [\#2487](https://github.com/PostHog/posthog/pull/2487) ([paolodamico](https://github.com/paolodamico))
- Add Table rowKey where missing and unify style [\#2486](https://github.com/PostHog/posthog/pull/2486) ([Twixes](https://github.com/Twixes))
- Nest endpoints of project-based models under /api/project/ – LITE [\#2485](https://github.com/PostHog/posthog/pull/2485) ([Twixes](https://github.com/Twixes))
- Fix organization/project creation when organization-/project-less [\#2484](https://github.com/PostHog/posthog/pull/2484) ([Twixes](https://github.com/Twixes))
- Project Settings cleanup [\#2483](https://github.com/PostHog/posthog/pull/2483) ([Twixes](https://github.com/Twixes))
- Reworked Teammates page [\#2482](https://github.com/PostHog/posthog/pull/2482) ([Twixes](https://github.com/Twixes))
- Allow for duplicate invites [\#2481](https://github.com/PostHog/posthog/pull/2481) ([Twixes](https://github.com/Twixes))
- 2094 too many distinct [\#2480](https://github.com/PostHog/posthog/pull/2480) ([GalDayan](https://github.com/GalDayan))
- Session player page [\#2479](https://github.com/PostHog/posthog/pull/2479) ([paolodamico](https://github.com/paolodamico))
- Refactor scene configuration logic [\#2478](https://github.com/PostHog/posthog/pull/2478) ([paolodamico](https://github.com/paolodamico))
- Make note that webhook integration is unavailable for Cloud now [\#2476](https://github.com/PostHog/posthog/pull/2476) ([Twixes](https://github.com/Twixes))
- Fix Heroku worker, part 2 [\#2475](https://github.com/PostHog/posthog/pull/2475) ([mariusandra](https://github.com/mariusandra))
- env variable for parallel cohorts [\#2472](https://github.com/PostHog/posthog/pull/2472) ([timgl](https://github.com/timgl))
- Decrease parallel cohorts [\#2471](https://github.com/PostHog/posthog/pull/2471) ([timgl](https://github.com/timgl))
- Use our own session recording player [\#2470](https://github.com/PostHog/posthog/pull/2470) ([macobo](https://github.com/macobo))
- Fix Password Change [\#2467](https://github.com/PostHog/posthog/pull/2467) ([yakkomajuri](https://github.com/yakkomajuri))
- Fix My Settings [\#2465](https://github.com/PostHog/posthog/pull/2465) ([Twixes](https://github.com/Twixes))
- Fix cohort calculation [\#2464](https://github.com/PostHog/posthog/pull/2464) ([timgl](https://github.com/timgl))
- Fix Feature Flags typo [\#2463](https://github.com/PostHog/posthog/pull/2463) ([yakkomajuri](https://github.com/yakkomajuri))
- Fix feature flag not getting created with same team and key after deleting it [\#2461](https://github.com/PostHog/posthog/pull/2461) ([satheesh1997](https://github.com/satheesh1997))
- Fix invalid date format for labels on Windows [\#2456](https://github.com/PostHog/posthog/pull/2456) ([adamb70](https://github.com/adamb70))
- Don't record session player [\#2455](https://github.com/PostHog/posthog/pull/2455) ([timgl](https://github.com/timgl))
- Create DATABASE\_URL if none found [\#2454](https://github.com/PostHog/posthog/pull/2454) ([mariusandra](https://github.com/mariusandra))
- Show gradient on scrollable Select elements [\#2453](https://github.com/PostHog/posthog/pull/2453) ([adamb70](https://github.com/adamb70))
- Docker nodejs support for plugins [\#2452](https://github.com/PostHog/posthog/pull/2452) ([mariusandra](https://github.com/mariusandra))
- Fix plugin server url [\#2451](https://github.com/PostHog/posthog/pull/2451) ([mariusandra](https://github.com/mariusandra))
- Remove `posthog.json` plugin support [\#2449](https://github.com/PostHog/posthog/pull/2449) ([mariusandra](https://github.com/mariusandra))
- Feature flag table improvements [\#2448](https://github.com/PostHog/posthog/pull/2448) ([timgl](https://github.com/timgl))
- Fix small typo on Project Settings view [\#2443](https://github.com/PostHog/posthog/pull/2443) ([ngonik](https://github.com/ngonik))
- Fix cohorts stuck on empty querysets [\#2441](https://github.com/PostHog/posthog/pull/2441) ([timgl](https://github.com/timgl))
- Use posthog-js 1.7.0-alpha.1 [\#2440](https://github.com/PostHog/posthog/pull/2440) ([macobo](https://github.com/macobo))
- Hide Billing Toolbar from PostHog team [\#2439](https://github.com/PostHog/posthog/pull/2439) ([yakkomajuri](https://github.com/yakkomajuri))
- Fix fetch single event clickhouse [\#2436](https://github.com/PostHog/posthog/pull/2436) ([timgl](https://github.com/timgl))
- Fix filtering is not bool [\#2435](https://github.com/PostHog/posthog/pull/2435) ([timgl](https://github.com/timgl))
- Redirect to manage billing view on app [\#2434](https://github.com/PostHog/posthog/pull/2434) ([timgl](https://github.com/timgl))
- Fix aggregates clickhouse [\#2432](https://github.com/PostHog/posthog/pull/2432) ([timgl](https://github.com/timgl))
- Fix StatsD errors on Windows [\#2430](https://github.com/PostHog/posthog/pull/2430) ([adamb70](https://github.com/adamb70))
- Session recording: only check permitted domains if defined [\#2429](https://github.com/PostHog/posthog/pull/2429) ([macobo](https://github.com/macobo))
- Bump posthog-js [\#2427](https://github.com/PostHog/posthog/pull/2427) ([macobo](https://github.com/macobo))
- Create task definition for ECS [\#2424](https://github.com/PostHog/posthog/pull/2424) ([fuziontech](https://github.com/fuziontech))
- Persons list refactor II [\#2423](https://github.com/PostHog/posthog/pull/2423) ([paolodamico](https://github.com/paolodamico))
- Add ee to docker ignore [\#2422](https://github.com/PostHog/posthog/pull/2422) ([timgl](https://github.com/timgl))
- create docker build action [\#2419](https://github.com/PostHog/posthog/pull/2419) ([fuziontech](https://github.com/fuziontech))
- Persons list refactor [\#2418](https://github.com/PostHog/posthog/pull/2418) ([paolodamico](https://github.com/paolodamico))
- Release 1.17.0 [\#2417](https://github.com/PostHog/posthog/pull/2417) ([yakkomajuri](https://github.com/yakkomajuri))
- Remove unused dependencies [\#2416](https://github.com/PostHog/posthog/pull/2416) ([timgl](https://github.com/timgl))
- Fix cohorts [\#2415](https://github.com/PostHog/posthog/pull/2415) ([timgl](https://github.com/timgl))
- Refactor people & users to persons [\#2413](https://github.com/PostHog/posthog/pull/2413) ([paolodamico](https://github.com/paolodamico))
- Fix empty actions in cohorts [\#2411](https://github.com/PostHog/posthog/pull/2411) ([timgl](https://github.com/timgl))
- Last 7 days instead of last week, closes \#2408 [\#2410](https://github.com/PostHog/posthog/pull/2410) ([timgl](https://github.com/timgl))
- Add alt\_host for graceful failover to our secondary clickhouse node [\#2407](https://github.com/PostHog/posthog/pull/2407) ([fuziontech](https://github.com/fuziontech))
- Retention graph and multiple event fix [\#2405](https://github.com/PostHog/posthog/pull/2405) ([EDsCODE](https://github.com/EDsCODE))
- Fix cohorts not being calculated [\#2404](https://github.com/PostHog/posthog/pull/2404) ([timgl](https://github.com/timgl))
- Fix emojis with lz64 encoding [\#2403](https://github.com/PostHog/posthog/pull/2403) ([timgl](https://github.com/timgl))
- Add actions to sidebar [\#2402](https://github.com/PostHog/posthog/pull/2402) ([timgl](https://github.com/timgl))
- Fix navigation with actions & events [\#2401](https://github.com/PostHog/posthog/pull/2401) ([paolodamico](https://github.com/paolodamico))
- Separate endpoint for session recording [\#2398](https://github.com/PostHog/posthog/pull/2398) ([macobo](https://github.com/macobo))
- Use isoformat\(\) for dates in Kafka WAL [\#2396](https://github.com/PostHog/posthog/pull/2396) ([mariusandra](https://github.com/mariusandra))
- Combine events and actions into select box [\#2394](https://github.com/PostHog/posthog/pull/2394) ([timgl](https://github.com/timgl))
- Event usage split clickhouse queries [\#2388](https://github.com/PostHog/posthog/pull/2388) ([timgl](https://github.com/timgl))
- Add feature flag filters and roll out percentage to main table [\#2387](https://github.com/PostHog/posthog/pull/2387) ([GalDayan](https://github.com/GalDayan))
- Fix prop filter not formatting properly [\#2386](https://github.com/PostHog/posthog/pull/2386) ([EDsCODE](https://github.com/EDsCODE))
- Organize logic [\#2358](https://github.com/PostHog/posthog/pull/2358) ([EDsCODE](https://github.com/EDsCODE))
- Improve docker-compose-config experience [\#2266](https://github.com/PostHog/posthog/pull/2266) ([Twixes](https://github.com/Twixes))
- Allow logged in users to join from invite [\#2244](https://github.com/PostHog/posthog/pull/2244) ([Twixes](https://github.com/Twixes))
- Fix sessions on dashboard [\#2214](https://github.com/PostHog/posthog/pull/2214) ([timgl](https://github.com/timgl))
- Separate Plugins dyno for Heroku [\#2213](https://github.com/PostHog/posthog/pull/2213) ([mariusandra](https://github.com/mariusandra))
- Org/projects UX enhancements [\#2145](https://github.com/PostHog/posthog/pull/2145) ([Twixes](https://github.com/Twixes))

<ArrayCTA />

