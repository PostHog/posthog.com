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