---
date: 2020-10-15T00:00:00.000Z
title: Array 1.15.0
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

Hey there! It's been a while...

With our last release being over a month ago, this new release has the largest changelog to date, with 175 PRs merged to `master` since the last time you heard from us.

However, there is method to the madness: PostHog is now **super scalable**. 

We've been working hard on making PostHog faster and more efficient, and we're happy to announce that our Enterprise Edition is now able to handle massive volumes without breaking a sweat. 

So let's get into it: what does super scalable mean and what else did we do since the last release?

## Release Notes

### [ClickHouse 👆🏠](https://github.com/PostHog/posthog/pulls?page=1&q=is%3Apr+clickhouse+is%3Aclosed)

![ClickHouse Screenshot](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/array/clickhouse.png)
<small class="centered">_A ClickHouse query completing in a fifth of a second (Click image to expand)_</small>


If you've followed our progress on GitHub over the past months, you'll know that ClickHouse has been the talk of the town.

In their own words, ClickHouse is "a column-oriented database management system (DBMS) for online analytical processing of queries (OLAP)". 

Or, in simple terms: it's a **very fast database**.

As you may know, we have been using the well-established and reliable PostgreSQL until now, but from here on out our Enterprise Edition will be using ClickHouse instead. PostgreSQL remains a great option for lower volumes, but, for companies that handle huge event volumes, ClickHouse is a much better choice. 

On our cloud version we handle event numbers in the nine figures, and implementing ClickHouse has drastically reduced the execution time for all of our queries. 

If you're interested in using PostHog with ClickHouse, send us an email at [contact us](https://share.hsforms.com/1-IVCY9gNRvaZBajMt_UPIg4559u) to find out more.

### [Command Palette](https://github.com/PostHog/posthog/pull/1819)

![Command Palette Screenshot](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/array/command-palette.png)

<br />

We're super excited about this. 

Last week we did an internal hackathon and the command palette was one of the awesome projects to come out of it.

Now, when using PostHog, you can press `⌘K` (Mac) or `Ctrl + K` (Windows) to reveal a Spotlight or Superhuman-like command palette that lets you navigate around PostHog mouse-less. In addition to navigation, the command palette also has page-specific commands that let you, for example, change the time range on charts, as well as a way to quickly share feedback with the PostHog team, create an API key, or even do some math with the built-in calculator. 

Eric, Michael, and Paolo got this done in just a few days, and we love it. 

Stay tuned for more exciting features that were built during the hackathon.


### [Backend Feature Flags](https://github.com/PostHog/posthog-python/pull/9)

![Backend Feature Flags Code](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/array/backend-flags.png)


Based on community feedback, we made it easier for feature flags to be integrated with your backend, in addition to our frontend JavaScript implementation.

We've added feature flag support to our [Python Library](https://github.com/PostHog/posthog-python/pull/9), as well as [improved the `/decide` endpoint](https://github.com/PostHog/posthog/pull/1592) used by feature flags to make the API experience better.

We have ourselves been using feature flags with the Python Library to slowly roll out some exciting new features. 

### [Weekly Report Email](https://github.com/PostHog/posthog/pull/1700)

![Weekly Email Screenshot](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/array/weekly-email.png)

To help users keep up with their key metrics in a simple way, we have introduced a weekly email that gives you an overview of your active and churned users over the previous week.

This is in Beta mode and we're expanding its capabilities, but it already gives you a good sense of your performance in terms of users. 

Have you gotten your weekly report yet? 

### [We're Taking Part in Hacktoberfest 2020](/blog/hacktoberfest-2020)

![Hacktoberfest Banner](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/hacktoberfest/hacktoberfest.png)

We're happy to announce that PostHog has joined [Hacktoberfest 2020](https://hacktoberfest.digitalocean.com/).

For those who don't know, Hacktoberfest is an initiative led by DigitalOcean to promote open source projects and foster the overall open 
source community. 

As a result, we have now [tagged some good first issues](https://github.com/PostHog/posthog/labels/Hacktoberfest) on our [main repo](https://github.com/PostHog/posthog/) with the <code class="hacktoberfest">Hacktoberfest</code> tag, as these should be suitable issues for first-time contributors. We have also made an effort to document those issues better, so that their scope is clearly defined. 

By submitting a pull request that gets merged for one of these issues (or any other issues on our [main repo](https://github.com/PostHog/posthog)), we will send you some [PostHog merch](https://merch.posthog.com) and you'll be able to count that contribution towards the 4 PRs you need to get the Hacktoberfest shirt.

### [User Interviews](https://calendly.com/posthog-feedback)

We’re working hard to improve PostHog and would love to talk to you about your experience with the product. 

If you're interested in helping us out, you can schedule a quick 30-min call with us [on Calendly](https://calendly.com/posthog-feedback). 

Oh, and we're giving away some awesome [PostHog merch](https://merch.posthog.com) as a thank you!

## Bug Fixes and Performance Improvements

In addition to the main features mentioned above, we also merged over 100 PRs improving PostHog's performance and fixing bugs:

- Add overflow to card body [\#1878](https://github.com/PostHog/posthog/pull/1878) ([EDsCODE](https://github.com/EDsCODE))
- Pinning the dev Dockerfile PostgreSQL and Redis to the production version [\#1877](https://github.com/PostHog/posthog/pull/1877) ([ahtik](https://github.com/ahtik))
- Fix path loading spinner [\#1876](https://github.com/PostHog/posthog/pull/1876) ([EDsCODE](https://github.com/EDsCODE))
- Fix session label hover erroring [\#1874](https://github.com/PostHog/posthog/pull/1874) ([EDsCODE](https://github.com/EDsCODE))
- Add check to event serializer [\#1873](https://github.com/PostHog/posthog/pull/1873) ([EDsCODE](https://github.com/EDsCODE))
- Upgrade cypress, fix and stabilize tests [\#1872](https://github.com/PostHog/posthog/pull/1872) ([macobo](https://github.com/macobo))
- Fix small util bugs [\#1871](https://github.com/PostHog/posthog/pull/1871) ([Twixes](https://github.com/Twixes))
- Mark js\_posthog\_host as safe [\#1868](https://github.com/PostHog/posthog/pull/1868) ([macobo](https://github.com/macobo))
- Destroy lodash [\#1864](https://github.com/PostHog/posthog/pull/1864) ([Twixes](https://github.com/Twixes))
- Use official react-grid-layout [\#1862](https://github.com/PostHog/posthog/pull/1862) ([Twixes](https://github.com/Twixes))
- Fix feature flags test [\#1858](https://github.com/PostHog/posthog/pull/1858) ([yakkomajuri](https://github.com/yakkomajuri))
- Remove redis warning [\#1856](https://github.com/PostHog/posthog/pull/1856) ([timgl](https://github.com/timgl))
- Trim quotes on event properties [\#1852](https://github.com/PostHog/posthog/pull/1852) ([EDsCODE](https://github.com/EDsCODE))
- Reset user session after logging in as another user [\#1850](https://github.com/PostHog/posthog/pull/1850) ([macobo](https://github.com/macobo))
- Fill in person filtering and reintegrate tests [\#1848](https://github.com/PostHog/posthog/pull/1848) ([EDsCODE](https://github.com/EDsCODE))
- Try running review apps in production mode [\#1847](https://github.com/PostHog/posthog/pull/1847) ([Twixes](https://github.com/Twixes))
- Bump drf-exceptions-hog to 0.0.3 [\#1845](https://github.com/PostHog/posthog/pull/1845) ([Twixes](https://github.com/Twixes))
- Experiment: Improving actions UX? [\#1841](https://github.com/PostHog/posthog/pull/1841) ([paolodamico](https://github.com/paolodamico))
- When DEBUG, include posthog.js with local posthog host [\#1840](https://github.com/PostHog/posthog/pull/1840) ([macobo](https://github.com/macobo))
- Trim retention query [\#1839](https://github.com/PostHog/posthog/pull/1839) ([EDsCODE](https://github.com/EDsCODE))
- Add per entity filtering [\#1838](https://github.com/PostHog/posthog/pull/1838) ([EDsCODE](https://github.com/EDsCODE))
- Disable web snippet on DEBUG instances [\#1837](https://github.com/PostHog/posthog/pull/1837) ([Twixes](https://github.com/Twixes))
- Fix distinct id too long [\#1831](https://github.com/PostHog/posthog/pull/1831) ([timgl](https://github.com/timgl))
- Get rid of caching in /decide endpoint [\#1829](https://github.com/PostHog/posthog/pull/1829) ([macobo](https://github.com/macobo))
- Improve event properties display [\#1825](https://github.com/PostHog/posthog/pull/1825) ([timgl](https://github.com/timgl))
- Fix tsconfig.json lib property [\#1818](https://github.com/PostHog/posthog/pull/1818) ([mariusandra](https://github.com/mariusandra))
- Update dockerfile for dev-ing [\#1817](https://github.com/PostHog/posthog/pull/1817) ([fuziontech](https://github.com/fuziontech))
- Fix email test [\#1814](https://github.com/PostHog/posthog/pull/1814) ([timgl](https://github.com/timgl))
- Fix status report period [\#1810](https://github.com/PostHog/posthog/pull/1810) ([Twixes](https://github.com/Twixes))
- Toolbar Shadow Root Support [\#1805](https://github.com/PostHog/posthog/pull/1805) ([mariusandra](https://github.com/mariusandra))
- Change session query to not collect events [\#1802](https://github.com/PostHog/posthog/pull/1802) ([EDsCODE](https://github.com/EDsCODE))
- Fix person querying [\#1797](https://github.com/PostHog/posthog/pull/1797) ([timgl](https://github.com/timgl))
- Add python version to posthog for automated deploys [\#1795](https://github.com/PostHog/posthog/pull/1795) ([fuziontech](https://github.com/fuziontech))
- Always limit events [\#1794](https://github.com/PostHog/posthog/pull/1794) ([timgl](https://github.com/timgl))
- Fix ambiguous timestamp ordering [\#1792](https://github.com/PostHog/posthog/pull/1792) ([timgl](https://github.com/timgl))
- Fix dev docker build [\#1791](https://github.com/PostHog/posthog/pull/1791) ([timgl](https://github.com/timgl))
- Create CODE\_OF\_CONDUCT.md [\#1790](https://github.com/PostHog/posthog/pull/1790) ([yakkomajuri](https://github.com/yakkomajuri))
- Make shared\_dashboards endpoint exempt from x-frame-options header [\#1789](https://github.com/PostHog/posthog/pull/1789) ([yakkomajuri](https://github.com/yakkomajuri))
- Retention date filtering [\#1788](https://github.com/PostHog/posthog/pull/1788) ([EDsCODE](https://github.com/EDsCODE))
- Search for cohorts that contain the given distinctIDs for feature flags [\#1780](https://github.com/PostHog/posthog/pull/1780) ([fuziontech](https://github.com/fuziontech))
- Report all non-DRF exceptions to sentry [\#1773](https://github.com/PostHog/posthog/pull/1773) ([paolodamico](https://github.com/paolodamico))
- Bump posthoganalytics requirement for feature flag bugfixes [\#1772](https://github.com/PostHog/posthog/pull/1772) ([fuziontech](https://github.com/fuziontech))
- Set heroku python runtime to python 3.8.6 [\#1769](https://github.com/PostHog/posthog/pull/1769) ([fuziontech](https://github.com/fuziontech))
- Fix sessions team filtering [\#1766](https://github.com/PostHog/posthog/pull/1766) ([timgl](https://github.com/timgl))
- Add option to delete feature flags [\#1761](https://github.com/PostHog/posthog/pull/1761) ([yakkomajuri](https://github.com/yakkomajuri))
- Test if any filters exist and if they do make sure there are properties to filter on for decide endpoint [\#1759](https://github.com/PostHog/posthog/pull/1759) ([fuziontech](https://github.com/fuziontech))
- Fix demo urls [\#1757](https://github.com/PostHog/posthog/pull/1757) ([mariusandra](https://github.com/mariusandra))
- Change h1 of Live Actions page to "Live Actions" instead of "Events" [\#1756](https://github.com/PostHog/posthog/pull/1756) ([yakkomajuri](https://github.com/yakkomajuri))
- Fix toolbar fade container click block [\#1753](https://github.com/PostHog/posthog/pull/1753) ([mariusandra](https://github.com/mariusandra))
- Bump posthog analytics version [\#1751](https://github.com/PostHog/posthog/pull/1751) ([timgl](https://github.com/timgl))
- Add personal api key [\#1747](https://github.com/PostHog/posthog/pull/1747) ([timgl](https://github.com/timgl))
- 1684 allow ip override [\#1744](https://github.com/PostHog/posthog/pull/1744) ([timgl](https://github.com/timgl))
- Remove Toolbar Dock Mode [\#1733](https://github.com/PostHog/posthog/pull/1733) ([mariusandra](https://github.com/mariusandra))
- Use drf-exceptions-hog package [\#1732](https://github.com/PostHog/posthog/pull/1732) ([paolodamico](https://github.com/paolodamico))
- Disable weekly status report on PostHog Cloud [\#1730](https://github.com/PostHog/posthog/pull/1730) ([Twixes](https://github.com/Twixes))
- Use Django now for tz aware timestamps [\#1728](https://github.com/PostHog/posthog/pull/1728) ([fuziontech](https://github.com/fuziontech))
- Use utcnow\(\). Always default to UTC [\#1727](https://github.com/PostHog/posthog/pull/1727) ([fuziontech](https://github.com/fuziontech))
- Replace uuid4 and uuid1\_macless with UUIDT [\#1726](https://github.com/PostHog/posthog/pull/1726) ([Twixes](https://github.com/Twixes))
- Onboarding improvements [\#1723](https://github.com/PostHog/posthog/pull/1723) ([mariusandra](https://github.com/mariusandra))
- Self-serve billing enrollment & management [\#1721](https://github.com/PostHog/posthog/pull/1721) ([paolodamico](https://github.com/paolodamico))
- Improve Django commands for development [\#1720](https://github.com/PostHog/posthog/pull/1720) ([Twixes](https://github.com/Twixes))
- Do not shadow Kafka default columns \_timestamp and \_offset [\#1718](https://github.com/PostHog/posthog/pull/1718) ([fuziontech](https://github.com/fuziontech))
- Small insights type update [\#1717](https://github.com/PostHog/posthog/pull/1717) ([mariusandra](https://github.com/mariusandra))
- Don't assume that each user belongs to a team [\#1715](https://github.com/PostHog/posthog/pull/1715) ([Twixes](https://github.com/Twixes))
- Fix migration issue [\#1711](https://github.com/PostHog/posthog/pull/1711) ([Twixes](https://github.com/Twixes))
- Update 0085\_org\_models.py [\#1710](https://github.com/PostHog/posthog/pull/1710) ([Twixes](https://github.com/Twixes))
- Fix compatibility with posthog-production [\#1708](https://github.com/PostHog/posthog/pull/1708) ([Twixes](https://github.com/Twixes))
- Random improvements \(merge people, analytics\) [\#1706](https://github.com/PostHog/posthog/pull/1706) ([paolodamico](https://github.com/paolodamico))
- Make production docker-compose.yml generated [\#1704](https://github.com/PostHog/posthog/pull/1704) ([Twixes](https://github.com/Twixes))
- Added docker-compose proxy file [\#1703](https://github.com/PostHog/posthog/pull/1703) ([yakkomajuri](https://github.com/yakkomajuri))
- Fix Master EE code [\#1701](https://github.com/PostHog/posthog/pull/1701) ([mariusandra](https://github.com/mariusandra))
- Send a weekly instance status report \(resolves \#1509\) [\#1683](https://github.com/PostHog/posthog/pull/1683) ([Twixes](https://github.com/Twixes))
- Materialize Views to wrap data coming in from Kafka for Events, Elements, People [\#1678](https://github.com/PostHog/posthog/pull/1678) ([fuziontech](https://github.com/fuziontech))
- refactor how we grab kafka\_host to make it reusable for migrations [\#1677](https://github.com/PostHog/posthog/pull/1677) ([fuziontech](https://github.com/fuziontech))
- Test if person exists before getting from it [\#1676](https://github.com/PostHog/posthog/pull/1676) ([fuziontech](https://github.com/fuziontech))
- Make get\_is\_identified more tolerant of missing person [\#1675](https://github.com/PostHog/posthog/pull/1675) ([fuziontech](https://github.com/fuziontech))
- Organizations – models [\#1674](https://github.com/PostHog/posthog/pull/1674) ([Twixes](https://github.com/Twixes))
- Fix table view sessions [\#1672](https://github.com/PostHog/posthog/pull/1672) ([timgl](https://github.com/timgl))
- Use cached results for funnels [\#1671](https://github.com/PostHog/posthog/pull/1671) ([timgl](https://github.com/timgl))
- Remove default json serializer from kafka\_helper [\#1669](https://github.com/PostHog/posthog/pull/1669) ([fuziontech](https://github.com/fuziontech))
- Put process\_event\_ee back on celery with delay [\#1667](https://github.com/PostHog/posthog/pull/1667) ([fuziontech](https://github.com/fuziontech))
- Show underlying property value type [\#1666](https://github.com/PostHog/posthog/pull/1666) ([Twixes](https://github.com/Twixes))
- Add detailed label to actionstable [\#1653](https://github.com/PostHog/posthog/pull/1653) ([timgl](https://github.com/timgl))
- Added warning for changing feature flag key [\#1646](https://github.com/PostHog/posthog/pull/1646) ([yakkomajuri](https://github.com/yakkomajuri))
- Fix a few "Unchanged files with check annotations" issues [\#1641](https://github.com/PostHog/posthog/pull/1641) ([mariusandra](https://github.com/mariusandra))
- Add "is\_simple\_flag" to Feature flags [\#1639](https://github.com/PostHog/posthog/pull/1639) ([timgl](https://github.com/timgl))
- Fix Cypress tests [\#1635](https://github.com/PostHog/posthog/pull/1635) ([yakkomajuri](https://github.com/yakkomajuri))
- Upgrade Kea and TypeGen to latest versions [\#1634](https://github.com/PostHog/posthog/pull/1634) ([mariusandra](https://github.com/mariusandra))
- Nicer API Failure Errors [\#1633](https://github.com/PostHog/posthog/pull/1633) ([mariusandra](https://github.com/mariusandra))
- Added password strength bar [\#1632](https://github.com/PostHog/posthog/pull/1632) ([yakkomajuri](https://github.com/yakkomajuri))
- Fix optional trailing slash routing [\#1631](https://github.com/PostHog/posthog/pull/1631) ([Twixes](https://github.com/Twixes))
- Remove function call to see impact on performance [\#1627](https://github.com/PostHog/posthog/pull/1627) ([fuziontech](https://github.com/fuziontech))
- Refactor get\_or\_create\_person function in process\_event [\#1626](https://github.com/PostHog/posthog/pull/1626) ([fuziontech](https://github.com/fuziontech))
- Migrate process\_event shared functions to be public [\#1625](https://github.com/PostHog/posthog/pull/1625) ([fuziontech](https://github.com/fuziontech))
- Make hash elements public function on element\_group [\#1622](https://github.com/PostHog/posthog/pull/1622) ([fuziontech](https://github.com/fuziontech))
- Remove Trailing Spaces in Selector Box [\#1621](https://github.com/PostHog/posthog/pull/1621) ([J0](https://github.com/J0))
- Convert private functions to public for ee access [\#1618](https://github.com/PostHog/posthog/pull/1618) ([fuziontech](https://github.com/fuziontech))
- Core action tracking I [\#1612](https://github.com/PostHog/posthog/pull/1612) ([paolodamico](https://github.com/paolodamico))
- Bugfix: Remove celerybeat.pid before starting docker worker [\#1608](https://github.com/PostHog/posthog/pull/1608) ([fuziontech](https://github.com/fuziontech))
- Skip some tests on multitenancy [\#1607](https://github.com/PostHog/posthog/pull/1607) ([paolodamico](https://github.com/paolodamico))
- Add tests for FOSS [\#1600](https://github.com/PostHog/posthog/pull/1600) ([timgl](https://github.com/timgl))
- Typo in licenses.tsx [\#1599](https://github.com/PostHog/posthog/pull/1599) ([jonhyde-legl](https://github.com/jonhyde-legl))
- Fix: Do not load debug\_toolbar when testing [\#1598](https://github.com/PostHog/posthog/pull/1598) ([paolodamico](https://github.com/paolodamico))
- Bump posthog-js 1.4.5 [\#1597](https://github.com/PostHog/posthog/pull/1597) ([timgl](https://github.com/timgl))
- Add statsd to celery tasks and add task to monitor queue size [\#1595](https://github.com/PostHog/posthog/pull/1595) ([fuziontech](https://github.com/fuziontech))
- Papercups identify user [\#1593](https://github.com/PostHog/posthog/pull/1593) ([timgl](https://github.com/timgl))
- Make /decide endpoint more flexible \(pt. 2\) [\#1592](https://github.com/PostHog/posthog/pull/1592) ([yakkomajuri](https://github.com/yakkomajuri))
- Revert "Add monitoring of celery queue size to statsd \(\#1589\)" [\#1591](https://github.com/PostHog/posthog/pull/1591) ([fuziontech](https://github.com/fuziontech))
- Add monitoring of celery queue size to statsd [\#1589](https://github.com/PostHog/posthog/pull/1589) ([fuziontech](https://github.com/fuziontech))
- Noop on celery worker if ee is not enabled [\#1587](https://github.com/PostHog/posthog/pull/1587) ([fuziontech](https://github.com/fuziontech))
- Use celery defaults for concurrency, bumping workers only increased latency of event processing [\#1584](https://github.com/PostHog/posthog/pull/1584) ([fuziontech](https://github.com/fuziontech))
- Increase number of concurrent celery workers in production [\#1583](https://github.com/PostHog/posthog/pull/1583) ([fuziontech](https://github.com/fuziontech))
- Handle the case of invalid json gracefully [\#1581](https://github.com/PostHog/posthog/pull/1581) ([weyert](https://github.com/weyert))
- \#724: Export Events to CSV [\#1580](https://github.com/PostHog/posthog/pull/1580) ([michlsemn](https://github.com/michlsemn))
- Fix and test Team.event\_properties\_numerical [\#1572](https://github.com/PostHog/posthog/pull/1572) ([Twixes](https://github.com/Twixes))
- Explicitly use python-statsd as statsd lib [\#1570](https://github.com/PostHog/posthog/pull/1570) ([fuziontech](https://github.com/fuziontech))
- Remove statsd [\#1568](https://github.com/PostHog/posthog/pull/1568) ([EDsCODE](https://github.com/EDsCODE))
- Downgrade react dom [\#1559](https://github.com/PostHog/posthog/pull/1559) ([timgl](https://github.com/timgl))
- Identify email in frontend [\#1558](https://github.com/PostHog/posthog/pull/1558) ([timgl](https://github.com/timgl))
- Improve API routing [\#1557](https://github.com/PostHog/posthog/pull/1557) ([Twixes](https://github.com/Twixes))
- Fix multiple elementgroup returned [\#1549](https://github.com/PostHog/posthog/pull/1549) ([timgl](https://github.com/timgl))
- Fix team uuid migration [\#1548](https://github.com/PostHog/posthog/pull/1548) ([timgl](https://github.com/timgl))
- Fix property filtering null values [\#1546](https://github.com/PostHog/posthog/pull/1546) ([timgl](https://github.com/timgl))
- Only allow using aggregate functions on numerical properties [\#1536](https://github.com/PostHog/posthog/pull/1536) ([Twixes](https://github.com/Twixes))
- Signup improvements [\#1535](https://github.com/PostHog/posthog/pull/1535) ([paolodamico](https://github.com/paolodamico))
- Changes to make person editable \(resolves \#89\) [\#1491](https://github.com/PostHog/posthog/pull/1491) ([cr33dx](https://github.com/cr33dx))

## Favorite Issue

### [Strategy - open questions](https://github.com/PostHog/posthog.com/issues/444)

Our team has been actively engaged in discussions about company strategy, culture, and values over the past few weeks. 

And, since we value transparency, most of that is openly available for anyone to read, such as our [public strategy](https://posthog.com/handbook/strategy/overview).

## PostHog News

Karl joined our Engineering team last week and hit the ground running from the start, squashing bugs left and right, while helping us build cool new functionality. 

He believes pineapple belongs on pizza, which has further increased the divide within our team.

## Open Roles

Are you a Fullstack Engineer or Frontend Developer? 

Or perhaps you're not either but think you'd still be a good fit for PostHog? 

[We want you!](https://posthog.com/careers) 


## Bonus: ClickHouse in a Nutshell

If you're still a little confused about ClickHouse, this might help:

### Before

<span class='center'>
<iframe src="https://giphy.com/embed/hDMJjUNxLhIjK" width="400" height="400" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</span>

### After

<span class='center'>
<iframe src="https://giphy.com/embed/XmBwOQ9YpXNoCzaPOE" width="400" height="300" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</span>

<ArrayCTA />


