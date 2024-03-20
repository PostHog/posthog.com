---
date: 2020-12-15
title: Array 1.19.0
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

This new release is a great mix between old and new, with significant improvements to both our newer features, as well as our core analytics stack. 

Once again, we were heavily driven by feedback, having done a bunch of calls with our users and actively engaging with the PostHog community on Slack and GitHub. Keep the feedback coming!

## Release Notes

> If you're self-hosting and want to upgrade for a better experience with nicer features, remember to [update your PostHog instance](/docs/runbook/upgrading-posthog).

### [Scheduled Apps and Editor](https://github.com/PostHog/posthog/pull/2743)

![App Editor Screenshot](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/array/plugin-editor.png)

We now support scheduled apps that run periodically on a specified time cycle (e.g. minute, hour, day), as well as have a built-in code editor for apps right into the PostHog UI.

With the ability to run tasks in specified time intervals, you can now setup apps that, for example, keep track of external metrics and add this data to PostHog via new events. This is possible because we now [support `posthog.capture` calls inside apps as well](https://github.com/PostHog/posthog-plugin-server/pull/67). 

Some metrics you might want to keep track of are, for example, server performance, GitHub activities (e.g. stars ⭐ ), engagement with your project's social media profiles, and anything else you can think of!

Here's an example to give you an idea:

```js
async function runEveryMinute({ config }) {
    const url = `https://api.github.com/repos/PostHog/posthog`
    const response = await fetch(url)
    const metrics = await response.json()

    posthog.capture('github metrics', {
        stars: metrics.stargazers_count,
        open_issues: metrics.open_issues_count,
        forks: metrics.forks_count,
        subscribers: metrics.subscribers_count
    })
}
```

You can learn more about scheduled apps on the [PR that created them](https://github.com/PostHog/posthog-plugin-server/pull/63), as well as our docs for [building your own app](/docs/plugins/build).

> **Note:** Apps are a Beta feature currently and only available on self-hosted instances. We are working to make it available on PostHog Cloud soon.

### [Lifecycle Analysis](https://github.com/PostHog/posthog/pull/2460)

![Lifecycle Screenshot](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/array/lifecycle.png)

Our 'Trends' tab just got an awesome new feature: lifecycle graphs!

Lifecycle analysis digs deeper into your events and shows you a breakdown of the users who performed the event into new, returning, and resurrecting users. In addition, it also shows you the churn on for the specified time period. 

To use it, select 'Shown As' -> 'Lifecycle' when in the 'Trends' tab.  

### [New Session Recording Compression Scheme](https://github.com/PostHog/posthog/pull/2578)

![Gzip Session Recording Screenshot](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/array/session-recording-gzip.png)

See the image above? That's our event processing time before and after the new compression scheme!

By using gzip-based compression, we have now significantly improved performance both on the client and server, making event processing faster, as well as decreasing the number of session recordings that are lost. Be on the lookout for more green play buttons on your 'Sessions' page now.

Also, while on the topic of session recording, have you been keeping up with the [updates to our player](#session-recording-player-ux-improvements)?

> If you installed `posthog-js` via `npm`, you should update to version 1.8.0 to get access to this update. Snippet users have access to the latest version by default.


### [New Actions UX](https://github.com/PostHog/posthog/pull/2615)

![New Actions UX Screenshot](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/array/actions-ux.png)

This might not be news to all of you, since we have been experimenting with our actions UX using [feature flags](/docs/user-guides/feature-flags). However, we're now rolling out a new UX for creating actions to all PostHog users, so try it out let us know what you think!


### [New operations for numerical properties](https://github.com/PostHog/posthog/pull/2630)

In addition to the average, sum, maximum, and minimum operations available to numerical properties in trends, we now also support median, and 90th, 95th, and 99th percentiles.

## Share your feedback
We'd love to hear anything you have to say about PostHog, good or bad. As a thank you, we'll share some awesome [PostHog merch](https://merch.posthog.com).

Want to get involved? [Email us to schedule a 30 minute call](mailto:hey@posthog.com) with one of our teams to help us make PostHog even better!


## Favorite Issue

### [Session recording player ux improvements](https://github.com/PostHog/posthog/issues/2548)

Our session recording feature is getting better by the day! The latest improvements to our player have made the UX much smoother, and you can keep up-to-date and supply feedback about the player on the issue above.

## PostHog News

Eltje has joined us to lead our efforts on the People & Talent front, bringing some much-needed experience as we grow our team. Like James, she was a professional cyclist before venturing into talent, and she is (unfortunately) a lover of pineapple on pizza.

## Share your feedback
We'd love to hear anything you have to say about PostHog, good or bad. As a thank you, we'll share some awesome [PostHog merch](https://merch.posthog.com).

Want to get involved? [Email us to schedule a 30 minute call](mailto:hey@posthog.com) with one of our teams to help us make PostHog even better!

## Community Shoutouts

Big thanks to the following members of our community who have contributed to PostHog over this release cycle:

- [samcaspus](https://github.com/samcaspus)
- [nrickles3](https://github.com/nrickles3)
- [suresh1999](https://github.com/suresh1999)
- [girlProg](https://github.com/girlProg)

## Open Roles

Are you a Fullstack Engineer, Marketing Lead, or Growth Engineer? 

Or perhaps you're not either but think you'd still be a good fit for PostHog? 

[We want you!](https://posthog.com/careers) 


## Bug Fixes and Performance Improvements

In addition to the highlights listed above, we also merged a bunch of PRs improving PostHog's performance and fixing bugs:

- Hide bar from retention [\#2770](https://github.com/PostHog/posthog/pull/2770) ([yakkomajuri](https://github.com/yakkomajuri))
- Optimize breaking down by event property value [\#2767](https://github.com/PostHog/posthog/pull/2767) ([macobo](https://github.com/macobo))
- Fix Identified persons pagination [\#2756](https://github.com/PostHog/posthog/pull/2756) ([yakkomajuri](https://github.com/yakkomajuri))
- Showcase Feature Flag in HogFlix [\#2750](https://github.com/PostHog/posthog/pull/2750) ([yakkomajuri](https://github.com/yakkomajuri))
- Update to posthog-js@1.8.0 [\#2749](https://github.com/PostHog/posthog/pull/2749) ([macobo](https://github.com/macobo))
- Insights link on event list [\#2748](https://github.com/PostHog/posthog/pull/2748) ([paolodamico](https://github.com/paolodamico))
- Monitor clickhouse parts counts by table [\#2747](https://github.com/PostHog/posthog/pull/2747) ([fuziontech](https://github.com/fuziontech))
- Revert "Add autocapture to selection properties" [\#2746](https://github.com/PostHog/posthog/pull/2746) ([yakkomajuri](https://github.com/yakkomajuri))
- Plugin editor [\#2743](https://github.com/PostHog/posthog/pull/2743) ([mariusandra](https://github.com/mariusandra))
- Make active feature flags more obvious [\#2742](https://github.com/PostHog/posthog/pull/2742) ([timgl](https://github.com/timgl))
- Bump ini from 1.3.5 to 1.3.7 [\#2741](https://github.com/PostHog/posthog/pull/2741) ([dependabot[bot]](https://github.com/apps/dependabot))
- Update to posthog-js@1.8.0.beta-1 [\#2740](https://github.com/PostHog/posthog/pull/2740) ([macobo](https://github.com/macobo))
- New Person Page \(V2\) [\#2738](https://github.com/PostHog/posthog/pull/2738) ([paolodamico](https://github.com/paolodamico))
- Fixes to Persons page 201210 [\#2737](https://github.com/PostHog/posthog/pull/2737) ([paolodamico](https://github.com/paolodamico))
- Plugin server ingestion base [\#2732](https://github.com/PostHog/posthog/pull/2732) ([Twixes](https://github.com/Twixes))
- Fix persons page V2 edge case [\#2731](https://github.com/PostHog/posthog/pull/2731) ([paolodamico](https://github.com/paolodamico))
- Don't calculate broken cohorts [\#2730](https://github.com/PostHog/posthog/pull/2730) ([timgl](https://github.com/timgl))
- Capture plugin installation events [\#2729](https://github.com/PostHog/posthog/pull/2729) ([mariusandra](https://github.com/mariusandra))
- Sessions filtering postgres support [\#2728](https://github.com/PostHog/posthog/pull/2728) ([macobo](https://github.com/macobo))
- Sessions filtering: improve UX [\#2726](https://github.com/PostHog/posthog/pull/2726) ([macobo](https://github.com/macobo))
- Allow filtering sessions by recording duration [\#2721](https://github.com/PostHog/posthog/pull/2721) ([macobo](https://github.com/macobo))
- Restart plugins on error [\#2719](https://github.com/PostHog/posthog/pull/2719) ([mariusandra](https://github.com/mariusandra))
- Report billing usage cron job [\#2716](https://github.com/PostHog/posthog/pull/2716) ([paolodamico](https://github.com/paolodamico))
- Deprecate dashboard item type and move to display [\#2715](https://github.com/PostHog/posthog/pull/2715) ([timgl](https://github.com/timgl))
- Kill /api/event/sessions [\#2714](https://github.com/PostHog/posthog/pull/2714) ([macobo](https://github.com/macobo))
- Update posthog-js to 1.7.3-beta.11 [\#2713](https://github.com/PostHog/posthog/pull/2713) ([macobo](https://github.com/macobo))
- Fix prop filtering when action has props [\#2711](https://github.com/PostHog/posthog/pull/2711) ([EDsCODE](https://github.com/EDsCODE))
- Removes legacy stuff from \#2709 [\#2710](https://github.com/PostHog/posthog/pull/2710) ([paolodamico](https://github.com/paolodamico))
- Refactor /api/signup to Organization [\#2709](https://github.com/PostHog/posthog/pull/2709) ([paolodamico](https://github.com/paolodamico))
- Revert "Update posthog-js to 1.7.3-beta.10" [\#2707](https://github.com/PostHog/posthog/pull/2707) ([macobo](https://github.com/macobo))
- Update posthog-js to 1.7.3-beta.10 [\#2704](https://github.com/PostHog/posthog/pull/2704) ([macobo](https://github.com/macobo))
- Set right concurrency for plugin server on Heroku [\#2703](https://github.com/PostHog/posthog/pull/2703) ([mariusandra](https://github.com/mariusandra))
- Add caching support for recorder.js [\#2702](https://github.com/PostHog/posthog/pull/2702) ([macobo](https://github.com/macobo))
- Support gzip encoding from posthog-js [\#2701](https://github.com/PostHog/posthog/pull/2701) ([macobo](https://github.com/macobo))
- Remove legacy funnel code [\#2700](https://github.com/PostHog/posthog/pull/2700) ([timgl](https://github.com/timgl))
- Fix webpack-dev-server inside Docker [\#2699](https://github.com/PostHog/posthog/pull/2699) ([Twixes](https://github.com/Twixes))
- Purge Porter [\#2698](https://github.com/PostHog/posthog/pull/2698) ([Twixes](https://github.com/Twixes))
- Add autocapture to selection properties [\#2696](https://github.com/PostHog/posthog/pull/2696) ([EDsCODE](https://github.com/EDsCODE))
- Quick fix to migrations [\#2695](https://github.com/PostHog/posthog/pull/2695) ([fuziontech](https://github.com/fuziontech))
- 1842 link to edit cohort [\#2694](https://github.com/PostHog/posthog/pull/2694) ([girlProg](https://github.com/girlProg))
- Add all time support for lifecycle [\#2693](https://github.com/PostHog/posthog/pull/2693) ([EDsCODE](https://github.com/EDsCODE))
- Actually set env var for DISABLE\_SERVER\_SIDE\_CURSORS to True [\#2692](https://github.com/PostHog/posthog/pull/2692) ([fuziontech](https://github.com/fuziontech))
- Add trailing slash to record endpoint [\#2689](https://github.com/PostHog/posthog/pull/2689) ([timgl](https://github.com/timgl))
- Zapier updates [\#2686](https://github.com/PostHog/posthog/pull/2686) ([Twixes](https://github.com/Twixes))
- Cleaned up system status page [\#2682](https://github.com/PostHog/posthog/pull/2682) ([Twixes](https://github.com/Twixes))
- Add command palette badge to new TopNavigation [\#2678](https://github.com/PostHog/posthog/pull/2678) ([Twixes](https://github.com/Twixes))
- DISABLE\_SERVER\_SIDE\_CURSORS to false for pgbouncer friendship [\#2677](https://github.com/PostHog/posthog/pull/2677) ([fuziontech](https://github.com/fuziontech))
- Fix cypress projectSettings [\#2674](https://github.com/PostHog/posthog/pull/2674) ([paolodamico](https://github.com/paolodamico))
- Fix \#2632 \(save dashboards modal\) [\#2673](https://github.com/PostHog/posthog/pull/2673) ([paolodamico](https://github.com/paolodamico))
- Fix 404 [\#2671](https://github.com/PostHog/posthog/pull/2671) ([yakkomajuri](https://github.com/yakkomajuri))
- Actions Table filtering, search and sorting [\#2670](https://github.com/PostHog/posthog/pull/2670) ([timgl](https://github.com/timgl))
- Add clickhouse query for people breakdown [\#2669](https://github.com/PostHog/posthog/pull/2669) ([EDsCODE](https://github.com/EDsCODE))
- New Persons Page [\#2667](https://github.com/PostHog/posthog/pull/2667) ([paolodamico](https://github.com/paolodamico))
- Debug CH queries [\#2666](https://github.com/PostHog/posthog/pull/2666) ([timgl](https://github.com/timgl))
- Fix nan values [\#2665](https://github.com/PostHog/posthog/pull/2665) ([timgl](https://github.com/timgl))
- Fix ee webhook [\#2664](https://github.com/PostHog/posthog/pull/2664) ([timgl](https://github.com/timgl))
- Fix search set when clicking person [\#2663](https://github.com/PostHog/posthog/pull/2663) ([timgl](https://github.com/timgl))
- update url env var for ECS containers [\#2660](https://github.com/PostHog/posthog/pull/2660) ([fuziontech](https://github.com/fuziontech))
- Fix sessions player scrolling issue [\#2659](https://github.com/PostHog/posthog/pull/2659) ([paolodamico](https://github.com/paolodamico))
- Fix: fixes command palette scrolling issue [\#2658](https://github.com/PostHog/posthog/pull/2658) ([suresh1999](https://github.com/suresh1999))
- Fix lifecycle date rounding [\#2657](https://github.com/PostHog/posthog/pull/2657) ([EDsCODE](https://github.com/EDsCODE))
- Update posthog-js to 1.7.3-beta.9 [\#2655](https://github.com/PostHog/posthog/pull/2655) ([macobo](https://github.com/macobo))
- Update posthog-js to 1.7.3-beta.8 [\#2653](https://github.com/PostHog/posthog/pull/2653) ([macobo](https://github.com/macobo))
- Update posthog-js to 1.7.3-beta.7 [\#2652](https://github.com/PostHog/posthog/pull/2652) ([macobo](https://github.com/macobo))
- Separate tooltips for lifecycle [\#2649](https://github.com/PostHog/posthog/pull/2649) ([timgl](https://github.com/timgl))
- Support capturing json event data with content-type text/plain [\#2648](https://github.com/PostHog/posthog/pull/2648) ([macobo](https://github.com/macobo))
- Merge person modal [\#2644](https://github.com/PostHog/posthog/pull/2644) ([timgl](https://github.com/timgl))
- Spy on feature flags 🕵️ [\#2643](https://github.com/PostHog/posthog/pull/2643) ([mariusandra](https://github.com/mariusandra))
- Command palette missing routes & fix [\#2641](https://github.com/PostHog/posthog/pull/2641) ([paolodamico](https://github.com/paolodamico))
- Sessions table improvements 1202 [\#2639](https://github.com/PostHog/posthog/pull/2639) ([paolodamico](https://github.com/paolodamico))
- Stickiness improvement and filter refactor [\#2638](https://github.com/PostHog/posthog/pull/2638) ([EDsCODE](https://github.com/EDsCODE))
- Proposal: When clicking 'add action/event', populate the generated event with last event data [\#2635](https://github.com/PostHog/posthog/pull/2635) ([macobo](https://github.com/macobo))
- Lifecycle prop filtering [\#2634](https://github.com/PostHog/posthog/pull/2634) ([EDsCODE](https://github.com/EDsCODE))
- Add support for median, p90, p95 and p99 math functions [\#2630](https://github.com/PostHog/posthog/pull/2630) ([macobo](https://github.com/macobo))
- Use select for numerical properties [\#2628](https://github.com/PostHog/posthog/pull/2628) ([timgl](https://github.com/timgl))
- Access config to unlock after 15 mins and template [\#2624](https://github.com/PostHog/posthog/pull/2624) ([timgl](https://github.com/timgl))
- Update posthog-js to 1.7.3-beta.6 [\#2623](https://github.com/PostHog/posthog/pull/2623) ([macobo](https://github.com/macobo))
- Update HogFlix style [\#2622](https://github.com/PostHog/posthog/pull/2622) ([yakkomajuri](https://github.com/yakkomajuri))
- Add flags to `bin/docker-worker-celery` [\#2621](https://github.com/PostHog/posthog/pull/2621) ([mariusandra](https://github.com/mariusandra))
- Update posthog-js to next beta [\#2618](https://github.com/PostHog/posthog/pull/2618) ([macobo](https://github.com/macobo))
- Make personal API key capture and decide work with multiple projects [\#2617](https://github.com/PostHog/posthog/pull/2617) ([Twixes](https://github.com/Twixes))
- Add /api/projects/:project\_id/actions/ [\#2616](https://github.com/PostHog/posthog/pull/2616) ([Twixes](https://github.com/Twixes))
- Release actions-ux-201012 [\#2615](https://github.com/PostHog/posthog/pull/2615) ([paolodamico](https://github.com/paolodamico))
- Fixes Link component default behavior [\#2612](https://github.com/PostHog/posthog/pull/2612) ([paolodamico](https://github.com/paolodamico))
- Improved session player navigation [\#2611](https://github.com/PostHog/posthog/pull/2611) ([paolodamico](https://github.com/paolodamico))
- Don't run preview docker build with debug flags [\#2610](https://github.com/PostHog/posthog/pull/2610) ([fuziontech](https://github.com/fuziontech))
- Update session recording settings [\#2609](https://github.com/PostHog/posthog/pull/2609) ([paolodamico](https://github.com/paolodamico))
- Link back to insights from actions [\#2608](https://github.com/PostHog/posthog/pull/2608) ([timgl](https://github.com/timgl))
- Added pre tag to stop the over lay [\#2606](https://github.com/PostHog/posthog/pull/2606) ([samcaspus](https://github.com/samcaspus))
- Update to posthog-js@1.7.3-beta.3 [\#2601](https://github.com/PostHog/posthog/pull/2601) ([macobo](https://github.com/macobo))
- Show all items at date when hovering a LineGraph [\#2600](https://github.com/PostHog/posthog/pull/2600) ([macobo](https://github.com/macobo))
- Log exceptions in production [\#2593](https://github.com/PostHog/posthog/pull/2593) ([timgl](https://github.com/timgl))
- Use last selected dashboard when clicking 'save to dashboard' [\#2591](https://github.com/PostHog/posthog/pull/2591) ([macobo](https://github.com/macobo))
- Add `event \(sum of event\_property\)` to event labels on graphs [\#2583](https://github.com/PostHog/posthog/pull/2583) ([macobo](https://github.com/macobo))
- Issue \#2573, Add django-axes [\#2582](https://github.com/PostHog/posthog/pull/2582) ([nrickles3](https://github.com/nrickles3))
- Remove flake filter by event cypress test [\#2580](https://github.com/PostHog/posthog/pull/2580) ([EDsCODE](https://github.com/EDsCODE))
- 1936 retention graph [\#2578](https://github.com/PostHog/posthog/pull/2578) ([EDsCODE](https://github.com/EDsCODE))
- Revert "Retention graph and multiple event fix" [\#2577](https://github.com/PostHog/posthog/pull/2577) ([EDsCODE](https://github.com/EDsCODE))
- Cohort table improvements [\#2576](https://github.com/PostHog/posthog/pull/2576) ([timgl](https://github.com/timgl))
- DAU breakdown and filter bug [\#2575](https://github.com/PostHog/posthog/pull/2575) ([EDsCODE](https://github.com/EDsCODE))
- Update changelog with events box [\#2574](https://github.com/PostHog/posthog/pull/2574) ([yakkomajuri](https://github.com/yakkomajuri))
- Fix unclickable prop filter [\#2572](https://github.com/PostHog/posthog/pull/2572) ([EDsCODE](https://github.com/EDsCODE))
- Bump version 1.18.0 [\#2570](https://github.com/PostHog/posthog/pull/2570) ([yakkomajuri](https://github.com/yakkomajuri))
- Webhook warning adjustment [\#2568](https://github.com/PostHog/posthog/pull/2568) ([paolodamico](https://github.com/paolodamico))
- Modified drop down [\#2567](https://github.com/PostHog/posthog/pull/2567) ([samcaspus](https://github.com/samcaspus))
- Update posthog-js to 1.7.3-beta.2 [\#2566](https://github.com/PostHog/posthog/pull/2566) ([macobo](https://github.com/macobo))
- Add device type icons to session player page [\#2565](https://github.com/PostHog/posthog/pull/2565) ([paolodamico](https://github.com/paolodamico))
- Hover on new navigation menu items [\#2563](https://github.com/PostHog/posthog/pull/2563) ([paolodamico](https://github.com/paolodamico))
- Update posthog-js to latest, use \(undocumented\) option \_capture\_metrics [\#2561](https://github.com/PostHog/posthog/pull/2561) ([macobo](https://github.com/macobo))
- Show resolution + duration/date on session player [\#2550](https://github.com/PostHog/posthog/pull/2550) ([macobo](https://github.com/macobo))
- Retention graph and multiple event fix [\#2534](https://github.com/PostHog/posthog/pull/2534) ([EDsCODE](https://github.com/EDsCODE))
- Rolling retention widget [\#2522](https://github.com/PostHog/posthog/pull/2522) ([timgl](https://github.com/timgl))
- Make Google login an Enterprise/Cloud feature [\#2501](https://github.com/PostHog/posthog/pull/2501) ([Twixes](https://github.com/Twixes))
- Lifecycle Graph [\#2460](https://github.com/PostHog/posthog/pull/2460) ([EDsCODE](https://github.com/EDsCODE))
- Setup ecs configs for worker process [\#2458](https://github.com/PostHog/posthog/pull/2458) ([fuziontech](https://github.com/fuziontech))
- Remove signup process from cypress [\#2264](https://github.com/PostHog/posthog/pull/2264) ([timgl](https://github.com/timgl))

<ArrayCTA />
