---
title: Recordings
sidebar: Docs
showTitle: true
---

Recordings allows you to record users navigating through your website and play back the individual sessions to watch how real users use your product. 


![Recording example](../../images/features/session-recording/session-recording.gif)


## Using recordings

Recordings can only be used with our [JavaScript library](/docs/integrate/client/js) and requires the feature to be enabled in PostHog's Project Settings (`/project/settings`). Once enabled, the JS library will start recording sessions by default. 

<blockquote class="warning-note">
Please note recordings does not work if you send data using Segment's SDK as this data is not collected. If you use Segment, you may want to add the PostHog library too (make sure to only send regular event data from one source).
</blockquote>

Recordings can be toggled on and off in the JS library by appropriately setting the [config](/docs/integrate/client/js/#config). Users who opt out of event capturing will not have their sessions recorded.

To watch recordings, you can either visit the 'Recordings' page or click on any data point in an insight and from the list of persons related to that data point. This is specially useful in funnels, where you can **watch recordings of users who converted or dropped off.**

When watching recordings, you can change the speed as well as select the option 'skip inactive' - this will skip chunks of the recording where the user was inactive on the page. 

## Ignoring sensitive elements

If recording your application may capture sensitive user information, you need to update your codebase to prevent PostHog from capturing this during session recordings.

To do so, you should add the CSS class name `ph-no-capture` to elements which should not be recorded. This will lead to the element being replaced with a block of the same size when you play back the recordings. Make sure everyone who watches recordings in your team is aware of this, so that they don't think your product is broken when something doesn't show up!

Additionally, when dealing with inputs, if you wish to still capture the input box but not its contents, you can use the class name `ph-ignore-input` instead.


