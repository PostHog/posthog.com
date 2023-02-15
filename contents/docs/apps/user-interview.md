---
title: User Interviewer
github: https://github.com/PostHog/user-interview-app
installUrl: https://app.posthog.com/project/apps?name=user-interview
thumbnail: ../../apps/thumbnails/user-interview.png
tags:
    - user-interview
---

### What does the User Interviewer app do?

This app enables you to send a popup notification to targeted users that invites them to schedule an interview to provide feedback. This app was created by PostHog's product team and is something we use regularly to collect community feedback. 

### What are the requirements for this app?

This app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!


### How do I install this app?

1. Make sure you have enabled `opt_in_site_apps: true` in your posthog-js config.
2. Install the app from the PostHog App Repository
3. Customize the text and theme using the app config
4. Configure the app by creating a feature flag (see below)

That's it!

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for this app](https://github.com/posthog/user-interview-app) is available on GitHub.

### How do I configure the app?

1. Create a feature flag in your PostHog account to control who sees the interview request pop-up. For this example, we'll use the name `user-interview`
2. Set up the filters for the people that you want to speak to. You can create a filter based on properties, such as location or email, but not events. If you want to invite users based on them doing certain actions, you'll need to update the users' property once they've done that action.
3. Additionally, if you want to invite users based on historical actions, create an insight for that action and then use that to create a static cohort.
4. Set the filter `Seen User Interview Invitation - {FEATURE_FLAG_NAME}` to `is not set` so that it doesn't show to users who have seen the user interview already. This property is added once the user has interacted with the popup - either to close it or to book in a time.
5. Add an autorollback based on the pageview where `Current URL` contains `bookedUserInterviewEvent={FEATURE_FLAG_NAME}`. This is where you'll redirect them after they've booked in. Set the average over last 7 days to be 1 for up to 7 interviews to be booked and 2 for up to 14 interviews to be booked.
This requires the `auto-rollback-feature-flags` feature flag to be turned on. Please be aware this is currently in beta. 
6. Create your Calendly event (or other booking link) and
set the redirect after booking to be `{Your app}?bookedUserInterviewEvent={FEATURE_FLAG_NAME}`, e.g. `https://app.posthog.com/home?bookedUserInterviewEvent=user-interview`
7. Add the feature flag and booking link to the app config `interviewConfigs` (you can have multiple feature flags with corresponding booking links by separating them with commas e.g. `interview-high-icp=https://calendly.com/user1/book-high-icp,user-interview=https://calendly.com/user1/user-interview`).
8. Rollout out the feature flag

By default the flags won't be shown to users who have seen a user interview popup within the last 90 days. You can override this with with `minDaysSinceLastSeenPopUp`

### What new properties and events does this app add?

Please check [the Readme in the GitHub repo for a full list](https://github.com/posthog/user-interview-app#tracking-events). 

### Who created this app?

We'd like to thank PostHog team member [Luke Harries](https://github.com/lharries) for creating this app.

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [raise a bug report](https://github.com/posthog/user-interview-app).

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
