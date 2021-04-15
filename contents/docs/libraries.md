---
title: Libraries
sidebar: Docs
showTitle: true
---

PostHog provides multiple libraries to send events from your app to your PostHog instance.

We have put a significant effort into providing as many of these libraries as possible, in order to make your experience better.

Our goal is for users to be able to integrate PostHog with their language and framework of choosing, without having to adapt their stack.

## Libraries

**All of PostHog's libraries support event capturing and user identification.**

However, certain features like session recording are only available with our JavaScript library. Refer to the table below for an overview of the functionality in each of our libraries.

|                     Library                     |  Type  |  Maintainer  | Autocapture | Session Recording | Feature Flags |
| :---------------------------------------------: | :----: | :----------: | :---------: | :---------------: | :-----------: |
|        [JavaScript](/docs/libraries/js)         | Client | PostHog Team |      ✅      |         ✅         |       ✅       |
|        [NodeJS](/docs/libraries/python)         | Server | PostHog Team |      ❌      |         ❌         |       ❌       |
|        [Python](/docs/libraries/python)         | Server | PostHog Team |      ❌      |         ❌         |       ✅       |
|       [Android](/docs/libraries/android)        | Client | PostHog Team |      ❌      |         ❌         |       ❌       |
|           [iOS](/docs/libraries/ios)            | Client | PostHog Team |      ❌      |         ❌         |       ❌       |
|       [Flutter](/docs/libraries/flutter)        | Client | PostHog Team |      ❌      |         ❌         |       ❌       |
|  [React Native](/docs/libraries/react-native)   | Client | PostHog Team |      ❌      |         ❌         |       ❌       |
|           [PHP](/docs/libraries/php)            | Server | PostHog Team |      ❌      |         ❌         |       ❌       |
|          [Ruby](/docs/libraries/ruby)           | Server | PostHog Team |      ❌      |         ❌         |       ❌       |
|          [Golang](/docs/libraries/go)           | Server | PostHog Team |      ❌      |         ❌         |       ❌       |
|        [Elixir](/docs/libraries/elixir)         | Server |  Community   |      ❌      |         ❌         |       ❌       |
| [Nim](https://github.com/Yardanico/posthog-nim) | Server |  Community   |      ❌      |         ❌         |       ❌       |


## Integrations

|                    Integration                     |                                          Description                                           |    Maintainer    | Sends data to PostHog? | Pulls data from PostHog? |
| :------------------------------------------------: | :--------------------------------------------------------------------------------------------: | :--------------: | :--------------------: | :----------------------: |
|          [Sentry](/docs/libraries/sentry)          | A two-way integration to get PostHog user data into Sentry and Sentry exceptions into PostHog. |   PostHog Team   |           ✅            |            ✅             |
|         [Segment](/docs/libraries/segment)         |                    Integration to use PostHog as a destination in Segment.                     |   PostHog Team   |           ✅            |            ❌             |
|       [RudderStack](/docs/libraries/sentry)        |                  Integration to use PostHog as a destination in RudderStack.                   | RudderStack Team |           ✅            |            ❌             |
|           [Slack](/docs/libraries/slack)           |             PostHog webhooks to receive messages in Slack when an action happens.              |   PostHog Team   |           ❌            |            ✅             |
| [Microsoft Teams](/docs/libraries/microsoft-teams) |        PostHog webhooks to receive messages in Microsoft Teams when an action happens.         |   PostHog Team   |           ❌            |            ✅             |
|          [Gatsby](/docs/libraries/gatsby)          |                    A wrapper over `posthog-js` provided as a Gatsby plugin.                    |    Community     |           ✅            |            ❌             |
|      [Docusaurus](/docs/libraries/docusaurus)      |                  A wrapper over `posthog-js` provided as a Docusaurus plugin.                  |    Community     |           ✅            |            ❌             |

## Plugins

Visit our [plugins library](/plugins) for more information.
