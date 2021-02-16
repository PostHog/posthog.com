---
title: Data model
sidebar: Docs
showTitle: true
---


## Event (posthog_event)


| Property | Type | Description |
| --- | --- | --- |
| **team_id** | ForeignKey(Team) | Link to the team |
| **event** | CharField | Name of the event.<br>There are default events that have special meaning within PostHog:<br>- `$pageview` captures a pageview<br>- `$autocapture` anything that was captured automatically by posthog-js. Includes clicks, changes to input and submissions of forms. Probably requires Elements to be created.<br>- `$identify`, which is used in the backend to set Person properties<br>- `$create_alias`, which creates an alias between a previous distinct_id and the current one |
| **distinct_id** | CharField | The unique or anonymous id of the user that triggered the event.<br>NOTE: migration `0024` adds indexes to this, which is necessary for /paths to work reasonably quickly |
| **properties** | JSONField | Any key: value pairs in a dict.<br>- `$current_url` - we use this in a couple of places (like /paths, /events) as the url the user was visiting at that time. |
| **timestamp** | DateTimeField | Defaults to timezone.now if not set |
| **ip** | GenericIPAddressField | IP of the user |
| **elements** | JSONField | Deprecated in favour of the Element model |


## Element
At the moment, we're storing every element for every event, which means there's quite a lot of duplication. This is something that needs to be optimised.


| Property | Type | Description |
| --- | --- | --- |
| **event_id** | ForeignKey(Event) | Link to the event |
| **order** | IntegerField | The order within all of the elements attached to that event. Starting from 0, which is the element that was clicked/interacted with |
| **text** | CharField | All the text nodes of the element concatenated (note: that means text in the elements' children aren't included) |
| **tag_name** | CharField | Tag name of the element, lowercase. (`a`, `button` etc) |
| **href** | CharField | Href attribute of the link<br>(eg. `<a href='https://posthog.com'>`, stored as `https://posthog.com`) |
| **attr_id** | CharField | ID attribute of the element<br>(eg. `<button id="submit-form">`, stored as `submit-form`) |
| **attr_class** | ArrayField(CharField) | List of strings of classes on the element<br>(eg. `<button className='btn btn-sm'>`, stored as `['btn', 'btn-sm']`) |
| **nth_child** | IntegerField | Position of the element<br>(eg. `<div><a>First</a><a>Second</a></div>`, the second `a` would have nth_child=2) |
| **nth_of_type** | IntegerField | Position of the element of its own type<br>(eg. `<div><strong>First</strong><a>Second</a></div>`, the second `a` would have nth_of_type=1) |
| **attributes** | CharField | Any other attribute that wasn't set in the above properties (including data properties) |

