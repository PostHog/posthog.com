---
title: Session Recording
sidebar: Docs
showTitle: true
---
<br />

> **Important:** Our Session Recording functionality is still in **Beta** mode. Please report any issues you find [on GitHub](https://github.com/PostHog/posthog/issues). 

Session recording allows you record users navigating through your website and play back the individual sessions to watch how real users use your product. 


![Retention Page](../../images/features/session-recording/session-recording.gif)


## Using Session Recording

Session recording can only be used with our [JavaScript Integration](/docs/integrations/js-integration) and requires the feature to be enabled in PostHog's Project Settings (`project/settings`). Once enabled, the JS Integration will start recording sessions by default.  

Session recording can be toggled on and off in the JS Integration by appropriately setting the [config](/docs/integrations/js-integration/#config). Users who opt out of event capturing will not have their sessions recorded.

To watch sessions, you can either visit the 'Sessions' page in PostHog ('Events' -> 'Sessions'):

![Session Recording Page Screenshot](../../images/blog/array/session-recording.png)

Or go to an individual user page and select 'Sessions By Day':

![Retention Page](../../images/features/session-recording/person-page.png)

As shown in the screenshots above, sessions that were recorded have a green play button available on the 'Play Session' column, which opens a modal where you can watch the session.

Sessions that can be played back are the ones that contain `$snapshot` events, which is how PostHog stores the session recording data.

When watching sessions, you can change the speed as well as select the option 'skip inactive' - this will skip chunks of the recording where the user was inactive on the page. 


