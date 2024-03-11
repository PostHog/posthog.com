---
date: 2021-01-19
title: Array 1.20.0
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/array/default.png
featuredImageType: standard
category: PostHog news
tags:
  - Product updates
  - Release notes
---

We're back! 2020 was a hectic year for us and our team put in a whole lot of effort to get PostHog to where it is now. As such, we shut down PostHog for 2 weeks to give everyone a chance to recharge (with a rotation in place to make sure nothing burned down). 

2021 is now here and we're kicking off with some awesome new features. Behold...

## Release Notes

> If you're self-hosting and want to upgrade for a better experience with nicer features, remember to [update your PostHog instance](/docs/runbook/upgrading-posthog).

### [Apps, Apps, and more Apps](/plugins)

![Plugin Library Screenshot](https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/plugin-library.png)

A lot has been happening on our Apps front. 

Besides a whole bunch work to deliver performance improvements and mature the PostHog Apps ecosystem, we have two major changes being introduced with this new PostHog version:

**A shiny new apps library**

We have released a [apps library](/product) where you can browse through all the apps built by our core team and community, and made sure the library is populated with apps! Thus, we now have integrations that support getting data from GitHub and GitLab, or sending data over to BigQuery and Hubspot, for example. 

We're working to make apps available on Cloud, but, in the meanwhile, if you're self-hosting, do check out our apps and let us know what you think!

**Apps can now access persistent storage**

Up until now, app builders would have noticed that the `cache` could have been used to store data in-memory using Redis, but we now also support `storage`, which allows apps to store data in a persistent form, opening up a lot of new use cases for you to explore.

### [Static Cohorts](https://github.com/PostHog/posthog/pull/2932)

![Static Cohorts Screenshot](https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/static-cohorts.png)

In addition to our standard dynamic cohorts (periodically updated based on the definition), PostHog now support static cohorts - groups of users that don't update. 

To create a static cohort, head over to 'People' -> 'Cohorts' and, when creating a new cohort, select 'Upload CSV'. This CSV file should have a single column with either the user's `distinct_id` or `email`. 

This way, you can import data from outside sources into a PostHog cohort more easily, as well as turn your dynamic cohorts into static ones by first exporting them. You could, for example, add your Mailchimp subscribers list as a static cohort.

### [Sortable Funnel Steps](https://github.com/PostHog/posthog/pull/2862)

![Sortable Funnels Screenshot](https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/funnel-step-reordering.png)

As of this new release, when you head over to Funnels in PostHog, you will see 3 dots next to each funnel step. By dragging these 3 dots up and down you can now re-order your funnel's steps, for example if you made a mistake, or want to explore different funnel structures. 

This was a feature that was consistently requested by the PostHog community, and we'd like to also shoutout [@glmaljkovich](https://github.com/glmaljkovich) for helping us build it!

### [PostHog Bookmarklet](https://github.com/PostHog/posthog/pull/2774)

![Bookmarklet Gif](https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/bookmarklet.gif)

To try out the PostHog snippet without having to update anything on your codebase, you can make use of our bookmarklet, which you can find over in 'Project Settings'.

This lets you capture events in your website without any code, and we've been using it actively during our demos!

### [Sessions List now loads 10x faster](https://github.com/PostHog/posthog/pull/2934)

Since joining us, Karl has been submitting performance improvement after performance improvement.

This time, as session recordings are being used more and more by our users, it was time to speed up the loading of the sessions list, which now loads 10x faster!

## Share your feedback
We'd love to hear anything you have to say about PostHog, good or bad. As a thank you, we'll share some awesome [PostHog merch](https://merch.posthog.com).

Want to get involved? [Email us to schedule a 30 minute call](mailto:hey@posthog.com) with one of our teams to help us make PostHog even better!


## Share your feedback
We'd love to hear anything you have to say about PostHog, good or bad. As a thank you, we'll share some awesome [PostHog merch](https://merch.posthog.com).

Want to get involved? [Email us to schedule a 30 minute call](mailto:hey@posthog.com) with one of our teams to help us make PostHog even better!


## Favorite Issue

### [PostHog Development on Apple Silicon](https://github.com/PostHog/posthog/issues/2916)

Are you a person that likes to operate at the bleeding edge of technology? Follow Marius' adventures working with PostHog on an Apple M1 laptop.

## PostHog News

Cory has joined us as a Lead Designer and has already started working on some jaw-dropping designs! Cory lives in an RV with his wife and child, boasting greater home square footage than many apartments in New York or San Francisco. 

He believes pineapple belongs on pizza, and we're now questioning whether we indeed know how to hire.

## Community Shoutouts

Big thanks to the following members of our community who have contributed to PostHog over this release cycle:

- [glmaljkovich](https://github.com/glmaljkovich)
- [tmilicic](https://github.com/tmilicic)
- [c3ho](https://github.com/c3ho)
- [Tbhesswebber](https://github.com/Tbhesswebber)
- [stevenphaedonos](https://github.com/stevenphaedonos)
- [moonrailgun](https://github.com/moonrailgun)
- [Somtom](https://github.com/Somtom)

## Open Roles

Are you a Fullstack Engineer, Senior Engineer, Marketing Lead, Growth Engineer, or Customer Success Lead? 

Or perhaps you're not either but think you'd still be a good fit for PostHog? 

[We want you!](https://posthog.com/careers) 

## Bug Fixes and Performance Improvements

In addition to the highlights listed above, we also merged a bunch of PRs improving PostHog's performance and fixing bugs:


- Sessions filters design [\#2987](https://github.com/PostHog/posthog/pull/2987) ([macobo](https://github.com/macobo))
- Add Community tag to plugins [\#2982](https://github.com/PostHog/posthog/pull/2982) ([yakkomajuri](https://github.com/yakkomajuri))
- Fix prop operator not changing [\#2981](https://github.com/PostHog/posthog/pull/2981) ([EDsCODE](https://github.com/EDsCODE))
- Fix options not loaded [\#2973](https://github.com/PostHog/posthog/pull/2973) ([timgl](https://github.com/timgl))
- Set Once [\#2972](https://github.com/PostHog/posthog/pull/2972) ([mariusandra](https://github.com/mariusandra))
- Support plugins installed from GitLab [\#2970](https://github.com/PostHog/posthog/pull/2970) ([mariusandra](https://github.com/mariusandra))
- Fix muted text color [\#2969](https://github.com/PostHog/posthog/pull/2969) ([paolodamico](https://github.com/paolodamico))
- Lessen the language in the plugin opt-in warning [\#2968](https://github.com/PostHog/posthog/pull/2968) ([mariusandra](https://github.com/mariusandra))
- Enable SSL PostgreSQL configuration through env variables [\#2967](https://github.com/PostHog/posthog/pull/2967) ([tmilicic](https://github.com/tmilicic))
- Order tooltip by volume [\#2960](https://github.com/PostHog/posthog/pull/2960) ([c3ho](https://github.com/c3ho))
- Add "AND" indicator to feature flag filters & update visuals [\#2959](https://github.com/PostHog/posthog/pull/2959) ([paolodamico](https://github.com/paolodamico))
- Capture rageclicks \(via posthog-js\) [\#2957](https://github.com/PostHog/posthog/pull/2957) ([macobo](https://github.com/macobo))
- Trends: small fixes [\#2956](https://github.com/PostHog/posthog/pull/2956) ([macobo](https://github.com/macobo))
- Only cache new items for 1 day [\#2949](https://github.com/PostHog/posthog/pull/2949) ([EDsCODE](https://github.com/EDsCODE))
- Make flag explicit [\#2947](https://github.com/PostHog/posthog/pull/2947) ([EDsCODE](https://github.com/EDsCODE))
- Support multiple action filters in sessions [\#2946](https://github.com/PostHog/posthog/pull/2946) ([macobo](https://github.com/macobo))
- Add missing feature flags [\#2944](https://github.com/PostHog/posthog/pull/2944) ([timgl](https://github.com/timgl))
- Add sharded tables to health checks for app [\#2938](https://github.com/PostHog/posthog/pull/2938) ([fuziontech](https://github.com/fuziontech))
- Refactor & extend backend user identify [\#2937](https://github.com/PostHog/posthog/pull/2937) ([paolodamico](https://github.com/paolodamico))
- Add link to plugin troubleshooting if server offline [\#2936](https://github.com/PostHog/posthog/pull/2936) ([mariusandra](https://github.com/mariusandra))
- Simplify plugin server service definitions [\#2929](https://github.com/PostHog/posthog/pull/2929) ([Twixes](https://github.com/Twixes))
- Remove unnecessary action properties iterating on sessionsparams [\#2926](https://github.com/PostHog/posthog/pull/2926) ([EDsCODE](https://github.com/EDsCODE))
- Switch user prompt location [\#2924](https://github.com/PostHog/posthog/pull/2924) ([EDsCODE](https://github.com/EDsCODE))
- restore path custom events [\#2923](https://github.com/PostHog/posthog/pull/2923) ([EDsCODE](https://github.com/EDsCODE))
- Change datepicker to rangepicker [\#2922](https://github.com/PostHog/posthog/pull/2922) ([EDsCODE](https://github.com/EDsCODE))
- Change color variable for bar color [\#2921](https://github.com/PostHog/posthog/pull/2921) ([EDsCODE](https://github.com/EDsCODE))
- Event must be a string [\#2920](https://github.com/PostHog/posthog/pull/2920) ([mariusandra](https://github.com/mariusandra))
- Fix clearRetention [\#2919](https://github.com/PostHog/posthog/pull/2919) ([mariusandra](https://github.com/mariusandra))
- Update plugin repository URL [\#2918](https://github.com/PostHog/posthog/pull/2918) ([mariusandra](https://github.com/mariusandra))
- Update to renamed @posthog/plugin-server package [\#2917](https://github.com/PostHog/posthog/pull/2917) ([mariusandra](https://github.com/mariusandra))
- Support nodejs 15 [\#2915](https://github.com/PostHog/posthog/pull/2915) ([mariusandra](https://github.com/mariusandra))
- Posthog-js 1.8.3 [\#2913](https://github.com/PostHog/posthog/pull/2913) ([mariusandra](https://github.com/mariusandra))
- Sessions filtering system [\#2912](https://github.com/PostHog/posthog/pull/2912) ([macobo](https://github.com/macobo))
- Fix dashboard colors with non-white backgrounds [\#2911](https://github.com/PostHog/posthog/pull/2911) ([mariusandra](https://github.com/mariusandra))
- Fix errors on demo [\#2909](https://github.com/PostHog/posthog/pull/2909) ([mariusandra](https://github.com/mariusandra))
- Hotfix - Papercups chat collision [\#2908](https://github.com/PostHog/posthog/pull/2908) ([paolodamico](https://github.com/paolodamico))
- Add pinned dashboards to new navigation [\#2906](https://github.com/PostHog/posthog/pull/2906) ([paolodamico](https://github.com/paolodamico))
- Proper interval rounding on normal trends [\#2901](https://github.com/PostHog/posthog/pull/2901) ([EDsCODE](https://github.com/EDsCODE))
- Remove shownas filter and move stickiness/lifecycle into separate insight tabs [\#2899](https://github.com/PostHog/posthog/pull/2899) ([EDsCODE](https://github.com/EDsCODE))
- Upgrade to plugin server 0.6.4 [\#2897](https://github.com/PostHog/posthog/pull/2897) ([mariusandra](https://github.com/mariusandra))
- Update simmer to version without installation warnings [\#2896](https://github.com/PostHog/posthog/pull/2896) ([mariusandra](https://github.com/mariusandra))
- Fix REST hook firing [\#2894](https://github.com/PostHog/posthog/pull/2894) ([Twixes](https://github.com/Twixes))
- Fix REST hook deletion [\#2893](https://github.com/PostHog/posthog/pull/2893) ([Twixes](https://github.com/Twixes))
- Refactor properties\_to\_Q to not be tied to Filter objects [\#2890](https://github.com/PostHog/posthog/pull/2890) ([macobo](https://github.com/macobo))
- Adds backend instrumentation to actions & cohorts [\#2887](https://github.com/PostHog/posthog/pull/2887) ([paolodamico](https://github.com/paolodamico))
- Bump lxml from 4.6.1 to 4.6.2 [\#2886](https://github.com/PostHog/posthog/pull/2886) ([dependabot[bot]](https://github.com/apps/dependabot))
- Separate math aggregates [\#2885](https://github.com/PostHog/posthog/pull/2885) ([EDsCODE](https://github.com/EDsCODE))
- Fix missing action when returning from dashboard [\#2884](https://github.com/PostHog/posthog/pull/2884) ([EDsCODE](https://github.com/EDsCODE))
- Fix sessions length distribution dataindex [\#2883](https://github.com/PostHog/posthog/pull/2883) ([EDsCODE](https://github.com/EDsCODE))
- Fix path loading var name [\#2882](https://github.com/PostHog/posthog/pull/2882) ([EDsCODE](https://github.com/EDsCODE))
- Updated where our enterprise terms are found [\#2881](https://github.com/PostHog/posthog/pull/2881) ([piemets](https://github.com/piemets))
- Re-enable source maps in production.Dockerfile [\#2879](https://github.com/PostHog/posthog/pull/2879) ([mariusandra](https://github.com/mariusandra))
- Update posthog-plugin-server [\#2878](https://github.com/PostHog/posthog/pull/2878) ([Twixes](https://github.com/Twixes))
- Remove ancient ".map" redirect [\#2875](https://github.com/PostHog/posthog/pull/2875) ([mariusandra](https://github.com/mariusandra))
- Add deployment environment variables [\#2874](https://github.com/PostHog/posthog/pull/2874) ([mariusandra](https://github.com/mariusandra))
- Try to fix bgbouncer error in django admin in production [\#2873](https://github.com/PostHog/posthog/pull/2873) ([mariusandra](https://github.com/mariusandra))
- Don't show events in future [\#2871](https://github.com/PostHog/posthog/pull/2871) ([timgl](https://github.com/timgl))
- Really fix event limit [\#2870](https://github.com/PostHog/posthog/pull/2870) ([timgl](https://github.com/timgl))
- Fixes email from address [\#2869](https://github.com/PostHog/posthog/pull/2869) ([paolodamico](https://github.com/paolodamico))
- Limit events correctly [\#2867](https://github.com/PostHog/posthog/pull/2867) ([timgl](https://github.com/timgl))
- Improve action select box - fix css [\#2865](https://github.com/PostHog/posthog/pull/2865) ([macobo](https://github.com/macobo))
- Only grab recent events in Events list [\#2864](https://github.com/PostHog/posthog/pull/2864) ([timgl](https://github.com/timgl))
- Add session recording stats to instance status page [\#2861](https://github.com/PostHog/posthog/pull/2861) ([mariusandra](https://github.com/mariusandra))
- Add missing event name to demo data [\#2860](https://github.com/PostHog/posthog/pull/2860) ([EDsCODE](https://github.com/EDsCODE))
- Instrument toolbar [\#2859](https://github.com/PostHog/posthog/pull/2859) ([paolodamico](https://github.com/paolodamico))
- Add missing paths viz condition [\#2858](https://github.com/PostHog/posthog/pull/2858) ([EDsCODE](https://github.com/EDsCODE))
- Fix bug from query-selector-shadow-dom update [\#2856](https://github.com/PostHog/posthog/pull/2856) ([mariusandra](https://github.com/mariusandra))
- ClickHouse caching [\#2855](https://github.com/PostHog/posthog/pull/2855) ([EDsCODE](https://github.com/EDsCODE))
- Custom NPM packages under @posthog [\#2854](https://github.com/PostHog/posthog/pull/2854) ([mariusandra](https://github.com/mariusandra))
- Index session recording events by team\_id, timestamp [\#2853](https://github.com/PostHog/posthog/pull/2853) ([macobo](https://github.com/macobo))
- Plugin storage model [\#2852](https://github.com/PostHog/posthog/pull/2852) ([mariusandra](https://github.com/mariusandra))
- Tests, fix for createActionFromEvent, clean up sessions query [\#2851](https://github.com/PostHog/posthog/pull/2851) ([macobo](https://github.com/macobo))
- Kill N+1 in sessions\_list [\#2850](https://github.com/PostHog/posthog/pull/2850) ([macobo](https://github.com/macobo))
- Support different Reply-To header for most emails [\#2846](https://github.com/PostHog/posthog/pull/2846) ([paolodamico](https://github.com/paolodamico))
- Quick fix to limit time range on event prop query [\#2844](https://github.com/PostHog/posthog/pull/2844) ([EDsCODE](https://github.com/EDsCODE))
- Fix relative dates filters [\#2843](https://github.com/PostHog/posthog/pull/2843) ([timgl](https://github.com/timgl))
- Refactor useEventListener to TypeScript [\#2841](https://github.com/PostHog/posthog/pull/2841) ([Twixes](https://github.com/Twixes))
- Bump node-notifier from 8.0.0 to 8.0.1 [\#2837](https://github.com/PostHog/posthog/pull/2837) ([dependabot[bot]](https://github.com/apps/dependabot))
- Fix retention entity selection [\#2825](https://github.com/PostHog/posthog/pull/2825) ([timgl](https://github.com/timgl))
- Allow \* in action selector [\#2820](https://github.com/PostHog/posthog/pull/2820) ([macobo](https://github.com/macobo))
- Upgrade Plugin Server [\#2816](https://github.com/PostHog/posthog/pull/2816) ([mariusandra](https://github.com/mariusandra))
- Fix retention filter dashboard items [\#2815](https://github.com/PostHog/posthog/pull/2815) ([macobo](https://github.com/macobo))
- Fix disabling server-side cursors [\#2814](https://github.com/PostHog/posthog/pull/2814) ([macobo](https://github.com/macobo))
- More key feature instrumentation [\#2811](https://github.com/PostHog/posthog/pull/2811) ([paolodamico](https://github.com/paolodamico))
- Make filtering by actions/events in sessions possible [\#2808](https://github.com/PostHog/posthog/pull/2808) ([macobo](https://github.com/macobo))
- Do not use SessionsFilter for insights sessions [\#2807](https://github.com/PostHog/posthog/pull/2807) ([macobo](https://github.com/macobo))
- Clean up prod dockerfile, remove dupe calls [\#2806](https://github.com/PostHog/posthog/pull/2806) ([fuziontech](https://github.com/fuziontech))
- Verbose Yarn build on plugin server build [\#2805](https://github.com/PostHog/posthog/pull/2805) ([fuziontech](https://github.com/fuziontech))
- Make building with yarn more verbose for debugging [\#2804](https://github.com/PostHog/posthog/pull/2804) ([fuziontech](https://github.com/fuziontech))
- plugins debug [\#2803](https://github.com/PostHog/posthog/pull/2803) ([fuziontech](https://github.com/fuziontech))
- Ignore plugins optional deps [\#2801](https://github.com/PostHog/posthog/pull/2801) ([mariusandra](https://github.com/mariusandra))
- Make testing using docker a bit easier with docker-compose for ee [\#2800](https://github.com/PostHog/posthog/pull/2800) ([fuziontech](https://github.com/fuziontech))
- Feature flag Papercups [\#2799](https://github.com/PostHog/posthog/pull/2799) ([paolodamico](https://github.com/paolodamico))
- Fix Docker Build [\#2797](https://github.com/PostHog/posthog/pull/2797) ([mariusandra](https://github.com/mariusandra))
- Generate event\_uuid slightly earlier for plugin server idempotency [\#2796](https://github.com/PostHog/posthog/pull/2796) ([Twixes](https://github.com/Twixes))
- WIP: Try to fix error with DAU breakdown of user properties [\#2793](https://github.com/PostHog/posthog/pull/2793) ([macobo](https://github.com/macobo))
- Whitelist plugins per organization on Cloud [\#2791](https://github.com/PostHog/posthog/pull/2791) ([Twixes](https://github.com/Twixes))
- Allow going from insights -\> sessions \(on cloud\) [\#2790](https://github.com/PostHog/posthog/pull/2790) ([macobo](https://github.com/macobo))
- CHANGELOG fixes [\#2788](https://github.com/PostHog/posthog/pull/2788) ([yakkomajuri](https://github.com/yakkomajuri))
- Insights data instrumentation [\#2787](https://github.com/PostHog/posthog/pull/2787) ([paolodamico](https://github.com/paolodamico))
- Fixes for differences between terraform and GA task-definition [\#2786](https://github.com/PostHog/posthog/pull/2786) ([fuziontech](https://github.com/fuziontech))
- Fix breakdown aggregated value [\#2785](https://github.com/PostHog/posthog/pull/2785) ([EDsCODE](https://github.com/EDsCODE))
- Remove event properties from session filters [\#2784](https://github.com/PostHog/posthog/pull/2784) ([paolodamico](https://github.com/paolodamico))
- Allow Plugins on Cloud [\#2783](https://github.com/PostHog/posthog/pull/2783) ([Twixes](https://github.com/Twixes))
- Fix pie aggregate value [\#2781](https://github.com/PostHog/posthog/pull/2781) ([EDsCODE](https://github.com/EDsCODE))
- Release 1.19.0 [\#2780](https://github.com/PostHog/posthog/pull/2780) ([yakkomajuri](https://github.com/yakkomajuri))
- Hide bar from retention [\#2770](https://github.com/PostHog/posthog/pull/2770) ([yakkomajuri](https://github.com/yakkomajuri))
- Optimize breaking down by event property value [\#2767](https://github.com/PostHog/posthog/pull/2767) ([macobo](https://github.com/macobo))
- MV -\> View for events\_with\_array\_props\_view and remove EVENT\_PROP\_TABLE\_SQL [\#2766](https://github.com/PostHog/posthog/pull/2766) ([fuziontech](https://github.com/fuziontech))
- Move lifecycle tests to separate file [\#2765](https://github.com/PostHog/posthog/pull/2765) ([EDsCODE](https://github.com/EDsCODE))
- Navigation 1775 improvements & fixes [\#2763](https://github.com/PostHog/posthog/pull/2763) ([paolodamico](https://github.com/paolodamico))
- Honor next URL when logged out [\#2757](https://github.com/PostHog/posthog/pull/2757) ([yakkomajuri](https://github.com/yakkomajuri))
- Deploy Plugins to AWS [\#2755](https://github.com/PostHog/posthog/pull/2755) ([mariusandra](https://github.com/mariusandra))
- Add abstract test classes [\#2754](https://github.com/PostHog/posthog/pull/2754) ([EDsCODE](https://github.com/EDsCODE))
- Improved insights history [\#2745](https://github.com/PostHog/posthog/pull/2745) ([timgl](https://github.com/timgl))
- Not-so-big play button [\#2744](https://github.com/PostHog/posthog/pull/2744) ([paolodamico](https://github.com/paolodamico))
- Major filter refactor [\#2736](https://github.com/PostHog/posthog/pull/2736) ([EDsCODE](https://github.com/EDsCODE))
- Fix total aggregate values [\#2723](https://github.com/PostHog/posthog/pull/2723) ([EDsCODE](https://github.com/EDsCODE))
- Zapier updates [\#2686](https://github.com/PostHog/posthog/pull/2686) ([Twixes](https://github.com/Twixes))
- Issue templates plus [\#2681](https://github.com/PostHog/posthog/pull/2681) ([Twixes](https://github.com/Twixes))
- Make Jest tests work better with TypeScript [\#2558](https://github.com/PostHog/posthog/pull/2558) ([Twixes](https://github.com/Twixes))

<ArrayCTA />
