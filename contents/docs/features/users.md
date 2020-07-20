---
title: Users / People
sidebar: Docs
showTitle: true
---

PostHog tracks user behaviour, whether or not the user is logged in and identifiable.

A short video on Users can be found [here](https://youtu.be/8_SsZW1v56Q);

## Viewing User List

Click on 'People' on the left-hand navigation. This will open a submenu containing 'Users', like so:

![People > All Users](../../images/all-users.png)
<br>

After clicking on 'All Users', you will see a list of users, something like this:

![User list](../../images/02/Screenshot-2020-02-09-at-13.47.06.png)
<br>

The first user has had no identifying information pushed to their profile in PostHog. That is why a string appears.

The second user has had their email address passed to PostHog.

## User History

Clicking on an individual user brings up their entire event history:

![User history](../../images/02/Screenshot-2020-02-09-at-13.51.03.png)
<br>

You can go even deeper by inspecting each event individually. Click on the event to bring up the event properties. This shows you the following information:

![Event properties within user history](../../images/event-by-user.png)
<br>

## Deleting User Data

You can also delete data on a user with ease. This can be done if you have created data by yourself for testing purposes or if a user asks you to do so.

When in the user history you can select 'Delete all data on this person' this will delete all information on that user permanently.

![Delete user data](../../images/03/Posthog-16.png)

