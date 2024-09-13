---
title: Engineering Hiring
sidebar: Handbook
showTitle: true
hideAnchor: true
---

## Engineering hiring at PostHog

Engineers make up around 60% of our team, and we are almost always hiring for Engineering roles. Please check our [careers page](/careers) for our open roles. 

### What we are looking for in engineering hires

Beyond the specific skills listed in the job description, we generally look for: 

*   Experience with relevant technologies (Python or similar, React or similar, something to do with big data is a bonus)
    *   We don't care how many years of professional experience you have, but depending on our current team structure we may be looking for more or less experienced people for a role - if that's the case, we will be explicit in the job spec.
*   Has built something from scratch, ideally with minimal outside help
    *   You may have been the founder of a startup, or built an impressive side project. You may have also worked on a project at work where you were the only developer.
*   Communication skills
    *   More so than other companies, all of our communication is written and public for the world to see. Good written communication is key.
*   User-centric
    *   Our engineering team work very closely with our users - they do customer support, demos, and help with implementation. All potential engineers need to be excited by the prospect of getting to work directly with users.

### Engineering hiring process 

#### Culture interview 

This is the usual first round interview with the People & Ops team. 

#### Technical interview

The [technical interview](/handbook/people/hiring-process#2-technical-interview-with-the-hiring-manager) is an hour-long technical interview with one of our engineers. This might be architecture design or diving more into past technical experiences in more of a workshop style. No whiteboarding or brain teasers. 

> The engineer interviewing you may be shadowed by another PostHog team member – a shadow is someone who listens in, but doesn't participate. This is something we do regularly among technical interviewers, as a way of improving the hiring process.

#### Culture & motivation chat

Congratulations on passing the technical interview! One of our co-founders – [Tim](/tim) or [James](/james), depending on scheduling – would love to learn about your previous experiences and what motivates you.

#### Engineering SuperDay

The final stage of our interview process is the PostHog [SuperDay](/handbook/people/hiring-process#posthog-superday). This is a paid full day of work, which we can flexibly arrange around the candidate's schedule. 

For full-stack roles, the task involves building a small web service (both backend and frontend) over a full day. The task is designed to be _too much_ work for one person to complete in a day, in order to get a sense of their ability to prioritize. 

An engineering SuperDay usually looks like this (_there is a degree of flexibility due to time zone differences)_:

*   An invitation to a personal Slack channel for the SuperDay, which we'll use throughout the day
*   Kick-off session with an engineer
*   Time to focus on the task
*   A "peer interview" with a couple of members of our team, so that both us and the candidate can see if we're a fit
*   A chat with [James](/james) or [Tim](/tim), whoever they didn't meet with in the previous stage
*   Wrapping up – at the end of the work day, they'll send us what they've built, along with a summary

A couple of PostHog engineers will then take a look at the candidate's work, and we'll get back to them with our final decision ASAP (always within a few days).

Overall, candidates should spend at least 80% of their time and energy on the task and less than 20% on meeting people, as we base our decision on their output of the day. However, we encourage everyone to use the Slack channel as much as needed for any questions or problems.

##### SuperDay kick-off call

Each superday starts with a short kick-off call between the candidate and a PostHog engineer. The purpose of this call is to 1) personalize the start of the day, 2) reiterate some context, and 3) give the candidate an opportunity to ask any questions before they dig in.

If you are the interviewer for this call (though it's not an _interview_, really), here's what you need to do:

- In the candidate's Superday slack channel, **turn on notifications for all messages**. As the Superday lead, you're the primary one responsible for answering any questions they have and responding to their comms if needed.
- Follow the steps in the [`interview-test` repository](https://github.com/PostHog/interview-test) to generate the Superday work file for the candidate.
- Send this file to the candidate in their Superday slack channel **30 minutes before the kick-off call**.
   - You can use this language: "Hey {name}! Here's the task for the day. Feel free to read through it before we chat in 30 minutes so I can answer any questions you have. See you soon!"
- During the call, make sure to hit on the following points:
   - Everything necessary to complete the task is in the zip.
      - We've provided some stubbed code for convenience, but it's not required to use this. Use what you are most comfortable with.
   - Today is _mostly_ about showing how much you can build in a day. Optimize for that.
      - We're looking to see reasonable code, but don't feel the need to make it perfect.
      - Feel free to write a test to demonstrate familiarity, but def don't feel the need to test every function.
      - We'll see your product thinking based on what you build - don't spend _too_ much time deciding/documenting what to build.
      - Make sure your calculations are correct.
   - Communicate consistently and don’t get blocked by us. Just use best judgement to keep making progress/decisions. No need for an update every X minutes but good to have some engagement and check in periodically.
   - The time cut-off for the day is flexible, just commit to whatever is a reasonable day's worth of work for you.
   - Don't forget to send us a Loom video at the end of the day to show us what you've built and walk us through anything you feel is worth discussing.
   - Your goal today is to impress us. We've done a lot of these superdays, and people who go the extra mile stand out.
   - Good luck!
