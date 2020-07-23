---
title: Trials
sidebar: Handbook
showTitle: true
---

## Setting expectations

When companies buy software, it is natural that most will want to de-risk the decision.

There are three key areas:

* Their own team need to be bought in
* The software needs to provide value
* The software needs to work well, and not to create frustration getting it to work

Whilst PostHog is open source and anyone can try it out, this doesn't achieve all the above for many companies, which explains the need for some planning for this process.

PostHog offer a 30 day free trial for customers in this situation. The objective of this trial is to hit the three key areas above.

### 1 - Kick off call

This will happen after two things, usually an initial demo to someone at the company that discovered PostHog or after a user has tried out the software informally themselves from the open source repo and wants to get their company to use it. Always try to understand the context going into the kick off call so we can be as well informed and as helpful as possible.

The goal of this call is to get the customers' team bought in to the concept of using PostHog.

#### Attendees

* A PostHog team member who will be responsible for the client
* A PostHog engineer (ideally someone with experience in the platform being used)
* The business stakeholders from the client. This would typically be a head of engineering and a head of product, and perhaps a head of marketing.
* The person from the client that will do the setup.

#### Agenda

* Use case discussion - make sure we understand the client's objectives
* Quick demo - aim to connect this to the points above as closely as possible, and ask if it would conceptually solve their problems
* Work out how the client would want to deploy at a high level, and make sure we learn what their software is written in so we can send the right docs
* Agree next steps - a set period where we will work to support the potential client very closely, of 30 days, which starts with a set up call.
* Nominate a "project lead" to be the main point of contact at the client

Follow up with:

* Links to relevant parts of our documentation
* A request for email addresses of users they would like invited to the software if possible (so we can create a shared Slack channel, and this list can be used in step 2 below)

### 2 - Set up call

The purpose of this call is to get the client as close to up and running as possible.

* If they have a web based app, we ought to be able to get autocapture up and running.
* If they are on iOS or Android, getting at least some events coming in is a good goal to aim for, as it's then considerably less effort to get from there to more events coming in!

If ahead of the call, the client has already installed everything succesfully, it can be to make sure the dashboards are working properly to help track the metrics needed.

Otherwise, and most frequently, this call will be used to deploy PostHog using screensharing and to get events from the client's app sending into PostHog.

It will feel natural to say to the client "do you want to finish up on your own?" - it's awkward having multiple people watch one developer plug something in. However, it's important to resist this urge as far as possible. You can use downtime in the call to double check on the detail of the use case, or just to make new friends :)

#### Attendees

* A PostHog team member who will be responsible for the client
* A PostHog engineer
* Whoever the client asked to help out from the previous call
* The client project lead

#### Agenda

* Demo product to anyone who hasn't seen it if applicable.
* Get an instance of PostHog deployed if applicable.
* Send first events to PostHog if applicable.
* Get relevant dashboards set up.
* Send login invites to the relevant teams (to ensure adoption during the trial to help de-risk)
* Discuss meeting cadence to ensure the project is succesful

### 3 - Check in calls (after weeks 1, 2 and 3)

During the month, the client may follow several routes:

* Using the tool a lot and having lots of ideas for features they'd like next (Green)
* Using the tool but with a few small issues (Orange)
* Trying to use the tool but getting stuck (Red)
* Not really using the tool at all as they get too busy (Red)

You should do a 15 min check in, and assess if the client is green, orange or red. If they're orange or red, use the call to work out how to improve their likelihood of moving forward. Be transparent with the client - tell them how you'd classify the trial at this stage, and discuss with them how to remediate it.

#### Attendees

* The PostHog team member responsible for the client should attend every time
* A PostHog engineer is optional depending on whether they're needed
* The client project lead
* Over the month, get a range of stakeholders into these calls - it's very easy for someone senior to pushback on a tool if they've not been involved. They may also have interesting and new feature requests to make the tool more valuable too.

After each check in call, an email should be sent to all the stakeholders with a very short summary of what was discussed and an assessment of how things are going, with any actions needed from either side.

#### 4 - Roadmap call (week 2)

After the client has already validated if there is value in the current features and is better versed in PostHog, we should do a roadmap discussion with the client.

This is to help us build a roadmap that fits with what users need, and it helps the client work out if we're a good partner for the long run.

If there are very small items that could deliver a big win, it's worth trying to build this rapidly to demonstrate our ability. Do not promise things to the client though - unless you're happy to be personally responsible for building them, in which case - great!

To do this call, run a high level discussion first - we're generally interesting in helping engineering teams get access to user data, and then

#### Agenda

* This should start with a discussion, starting at a high level
* Get a sense of any use cases the tool isn't delivering for the client BEFORE showing them our current thoughts. Ask if it's ok to do this.
* We can then open up the GitHub issues and add more detail to these

#### Attendees

* This should be the same as in the kick off call

#### 5 - Pilot wrap up (end of trial)

It is up to the PostHog team member responsible for the client to decide if this is needed based on the client's progress.

## FAQ

### Can we do a PostHog trial without going into production?

A 30 day trial isn't going to work well without any production data - it won't be able to show any compelling user insight without having user data in the platform. It is, however, possible to apply PostHog to just a small part of a client's app or to part of their website.
