---
title: Communication
sidebar: Handbook
showTitle: true
---

## Introduction

We're an all-remote company that allows people to work from almost anywhere in the world. With team members across several countries, it's important for us to practice clear communication in ways that help us stay connected and work more efficiently.

To accomplish this, we use **asynchronous communication as a starting point** and stay as open and transparent as we can by communicating through public issues, merge requests and (minimally) Slack.

## Effective & Responsible Communication Guidelines

1. **Assume Positive Intent.** Always being with a position of positivity and grace.
1. **Form An Opinion.** We live in different locations and often have very different perspectives. We want to know your thoughts, opinions, and feelings on things.
1. **Feedback is Essential.** Help everyone up their game, in a direct but constructive way.

## External communication

There are 8 key practices to consider during any meeting. They are the following:

1. Video Calls - If this is your first time meeting a customer/prospect/partner/etc., turn on your camera when you login to Zoom. This will help to make the customer/prospect feel more comfortable as they are certain your undivided attention is geared towards them.
1. Agenda - Always have an agenda prepped and ready to go. Share this with your audience. Make sure that everything on the agenda is accurate and ask if there’s anything missing that needs to be addressed during this call or for the future. When there is no agenda, it translates to you not caring.
1. 70/30 Rule - Ask open ended questions that leave the audience talking 70% of the time, while you are talking 30% of the time. Please note that this varies based on the type of meeting that you are conducting. Be conscious of what questions needs to be asked and to capture those items.
1. Take Notes - Effective note-taking is a valuable skill that will help you retain and recall any important details. Be the person who remembers all the details of your audience's needs.
1. Adapt to Audience Tone - Before going into the business portion of your meeting, evaluate first the tone of the audience. Adapt your tone accordingly in order to appeal to various types of personalities.
1. Mid-call - Half-way through the meeting, check in with your audience. Ask them what their thoughts are on the progression of this meeting and if what you're presenting is on the right track. This helps both you and the audience by re-aligning expectations and making sure the meeting is going the right direction. 
1. Pre-Close Summary - 10 Minutes (1-hour meetings) or 5 minutes (30 minute meetings) prior to ending the call, ask the audience to build out an agenda for the next step or meeting. This helps to secure next steps and to ensure there are no balls dropped.
1. Post Meeting Action - Immediately write down notes and next steps and input into proper directory (Google Drive, Hubspot, etc.).

## Everything starts with a Merge Request

It's best practice to start a discussion where possible with a Merge Request (MR) instead of an issue. An MR is associated with a specific change that is proposed and transparent for everyone to review and openly discuss. The nature of MRs facilitate discussions around a proposed solution to a problem that is actionable. An MR is actionable, while an issue will take longer to take action on.

1. Always **open** an MR for things you are suggesting and/or proposing. Whether something is not working right or we are iterating on new internal process, it is worth opening a merge request with the minimal viable change instead of opening an issue encouraging open feedback on the problem without proposing any specific change directly. Remember, an MR also invites discussion, but it's specific to the proposed change which facilitates focused decision.
1. Starting with a Merge Request is part of Handbook First and helps ensure the handbook is up-to-date when a decision is made.
1. Merge Requests, by default are **non-confidential**. However, for things that are not public by default please open a confidential issue with suggestions to specific changes that you are proposing. When possible, consider not including sensitive information so the wider community can contribute.
1. Not every solution will solve the problem at hand. Keep discussions focused by **defining the problem first** and **explaining your rationale** behind the Minimal Viable Change (MVC) proposed in the MR.
1. Be proactive and consistent with communication on discussions that have external stakeholders such as customers. It's important to keep communication flowing to keep everyone up to date. MRs can appear stale if there aren't recent discussions and no clear definition on when another update will be provided, based on feedback. This leaves those subscribed in the dark, causing unnecessary surprise if something ends up delayed and suddenly jumps to the next milestone. It is important that MRs are closed in a timely manner through approving or rejecting the open requests.
1. Have a **bias for action** and don't aim for consensus. Every MR is a proposal, if an MRs author isn't responsive take ownership of it and complete it. Some improvement is better than none.
1. **Cross link** issues or other MRs with related conversations. Put the link at the top of each MR's description with a short mention of the relationship (Report, Dependency, etc.) and use one as the central one and ideally close the alternate if duplicate.
1. If submitting a change for a feature, **update the description with the final conclusions** (Why an MR was rejected or why it was approved). This makes it much easier to see the current state of an issue for everyone involved in the implementation and prevents confusion and discussion later on.
1. Submit the **smallest** item of work that makes sense. When proposing a change, submit the smallest reasonable commit, put suggestions for other enhancements in separate issues/MRs and link them.
1. Do not leave MRs open for a long time. MRs should be **actionable** -- stakeholders should have a clear understanding of what changed and what they are ultimately approving or rejecting.
1. Make a conscious effort to **prioritize** your work. The priority of items depends on multiple factors: Is someone waiting for the answer? What is the impact if you delay it? How many people does it affect, etc.?
1. When submitting a MVC, **ask for feedback** from your peers. For example, if you're a designer and you propose a design, ping a fellow designer to review your work. If they suggest changes, you get the opportunity to improve your design and propose an alternative MR. This promotes collaboration and advances everyone's skills.
1. Respond to comments within a **threaded discussion**. If there isn't a discussion thread yet, you can use the reply to comment button from the comments to create one. This will prevent comments from containing many interweaves discussions with responses that are hard to follow.
1. Create a **Work In Progress (WIP)** merge request to prevent an accidental early merge. Only use WIP when merging it would **make things worse**, which should rarely be the case when contributing to the handbook. Most merge requests that are in progress don't make things worse, in this case don't use WIP, if someone merges it earlier than you expected just create a new merge request for additional items. Never ask someone to do a final review or merge something that still have WIP status, at that point you should be convinced it is good enough to go out.
1. If any follow up actions are required on the issue after the merge request is merged (like reporting back to any customers or writing documentation), avoid auto closing the issue.

## Issues

Issues are useful when there isn't a specific code change that is being proposed or needed. For example, you may want to start an issue for tracking progress or for project management purposes that do not pertain to code commits. This can be particularly useful when tracking team tasks and creating issue boards. However it is still important to maintain focus when opening issues by defining a single specific topic of discussion as well as defining the desired outcome that would result in the resolution of the issue. The point is to not keep issues open-ended and to prevent issues from going stale due to lack of resolution. For example, a team member may open an issue to track the progress of a blog post with associated to-do items that need to be completed by a certain date (e.g. first draft, peer review, publish). Once the specific items are completed, the issue can successfully be closed. Below are a few things to remember when creating issues:
 
## Internal Communication

1. All written communication happens in English, even when sent one on one, because sometimes you need to forward an email or chat.
1. Use **asynchronous communication** when possible: merge requests (preferred) or issues. Announcements happen on the appropriate slack channels and [people should be able to do their work without getting interrupted by chat](https://m.signalvnoise.com/is-group-chat-making-you-sweat-744659addf7d#.21t7089jk).
1. Discussion in issues or Merge Requests is preferred over everything else. If you need a response urgently, you can Slack someone with a link to your comment on an issue or merge request, asking them to respond there, however be aware that they still may not see it straight away. See [Slack](/handbook/communication#slack) for more.
1. If you choose to email instead of chat it is OK to send an _internal_ email that contains only a short message, similar as you would use in chat.
1. You are not expected to be available all the time. There is no expectation to respond to messages outside of your planned working hours.
1. Sometimes synchronous communication is the better option, but do not default to it. For example, a video call can clear things up quickly when you are blocked.
1. It is very OK to ask as many questions as you have. Please ask them so many people can answer them and many people see the answer, so use issues or public chat channels instead of private messages or one-on-one emails. If someone sends you a handbook link they are proud that we have the answer documented, they don't mean that you should have found that yourself or that this is the complete answer, feel free to ask for clarification. If the answer to a question isn't documented yet please immediately make a merge request to add it to the handbook in a place you have looked for it. It is great for the person who answered the question to see you help to ensure they have to answer it only once. A merge request is the best way to say thanks for help.
1. If you mention something (a merge request, issue, commit, webpage, comment, etc.) please include a link to it.
1. When someone asks something, give back a deadline or that you did it. Answers like: 'will do', 'OK', 'it is on my todo list' are not helpful. If it is small it's better to spend 2 minutes and do the tasks so the other person can mentally forget about it. If it is large you need to figure out when you'll do it, by returning that information the other person might decide to solve it in another way if it takes too long.
1. Avoid creating private groups for internal discussions.

### Not Public

We make things public by default because [transparency is part of Communication, one of our values](/handbook/values/#communication).

However it is [most important to focus on results](/handbook/values/#results).
So most things are **public** unless there is a reason not to. The following items are not public by default:

1. Security vulnerabilities are not public since it would allow attackers to compromise PostHog installations.
1. Financial information, including revenue and costs for the company, is confidential because we plan to be a public company one day and, as such, need to limit both the timing and content of financial information as investors will use and rely on it one day as they trade in our stock.
1. Deals with external parties like contracts and approving and paying invoices.
1. Content that would violate confidentiality for a PostHog team member, customer, or user.
1. Legal discussions are not public due to the purpose of Attorney-Client Privilege.
1. Some information is kept confidential to protect the privacy, safety, and security of team members and applicants, including applications, background check reports, reference checks, compensation, termination (voluntary and involuntary) details, demographic information, and home address. Whistleblower identity is confidential.
1. Acquisition offers for us are not public since informing people of an acquisition that might not happen can be very disruptive.
1. Acquisition offers we give are not public since the organization being acquired frequently prefers to have them stay private.
1. Customer information is not public since customers are not comfortable with that, and it would make it easier for competitors to approach our customers. If an issue needs to contain _any_ specific information about a customer, including but not limited to company name, employee names, number of users, link to their Hubspot record. When we discuss a competitor (for example in a sales call) this can be public as our competitive advantages are public, but you *must* be truthful - in the long run, we will end up building the best product, in the short run sometimes it may make sense for a customer to use a competitor.
1. Competitive sales and marketing campaign planning is confidential since we want the minimize the time the competition has to respond to it.
1. Plans for reorganizations are not public and on a need-to-know basis within the organization. Reorganizations cause disruption and the plans tend to change a lot before being finalized, so being public about them prolongs the disruption. We will keep relevant team members informed whenever possible.

## Email

1. Internal email usually doesn't make sense in nearly all cases. Use GitHub for feature / product discussion, use Slack if you cannot use GitHub, or Google Docs for anything else (ie planning documents for private information).
1. The only use for internal email is for:
  1. obtaining approvals
  1. sending official company documents/records (ie job offers)

## Slack

Similar to email, we actively discourage the use of Slack as it is one time only communication that isn't leveraged.

Slack is to be used for informal communication only. Only 90 days of activity will be retained. Accordingly, Slack should specifically NOT be used for:
   1. obtaining approvals;
   1. documenting decisions;
   1. storing official company records or documents; or
   1. sharing personal or sensitive information regarding any individuals

#### Are my direct messages and private channel conversations completely private?

In short, no. We fundamentally have access to them, despite not actively doing so.

## Google Docs

Never use a Google Doc / Presentations for something non-confidential that has to end up on the website or the **handbook**. Work on these edits via commits to a merge request. Then link to the merge request or diff to present the change to people. This prevents a duplication of effort and/or an out of date handbook.

### How to deprecate a Google Doc

1. Add 'Deprecated: ' to the start of the title.
1. Remove the content you moved.
1. Add a link to the new location at the beginning of the doc/first slide/first tab.
1. Add a link to the merge request or commit that moved it (if applicable).

## Presentations

1. Please avoid presentations for internal use. They are a poor substitute for a discussion on an issue. They lack the depth, they don't add enough context to enable asynchronous work.

## Scheduling Meetings

1. If you want to ask PostHog team members if they are available for an event please send a calendar invite with Google Calendar using your Google PostHog account to their Google PostHog account. When you add a PostHog team member as a “Guest” in Google Calendar, you can click the See Guest Availability button to check availability and find a time on their calendar.  These calendar invites will automatically show up on all parties calendars even when the email is not opened. It is an easier way to ensure everyone has visibility to the meeting and member’s status. Please respond quickly to invites so people can make necessary plans.
1. Every scheduled meeting should have a Google Doc (for most meetings) linked or a relevant GitHub issue. It should have an agenda, including any preparation materials (can be a presentation). Put the agenda in a Google Doc that has edits rights for all participants (including people not part of PostHog). Link the Google Doc from the meeting invite. Take notes of the points and todos during the meeting. Being able to structure conclusions and follow up actions in realtime makes a video call more effective than an in-person meeting. If it is important enough to schedule a meeting it is important enough to have a Doc linked. If we want to be on the same page we should be looking at that page.
1. If you want to move a meeting just move the calendar appointment instead of reaching out via other channels. Note the change at the top of the description. This is easier because you can just see the new time in the context of your calendar.
1. Please click 'Guests can modify event' so people can update the time in the calendar instead of having to reach out via other channels. You can configure this to be checked by default under [Event Settings](https://calendar.google.com/calendar/r/settings).)

## Indicating Availability

1. Put your planned away time including holidays, vacation, travel time, and other leave in your own calendar.
1. Set your working hours in your Google Calendar settings.

## Video Calls

1. Use video calls if you find yourself going back and forth in an issue/via email
or over chat. Rule of thumb: if you have gone **back and forth 3 times**, it's time
for a video call.
1. Sometimes it's better to _not_ have a video call. Consider these tradeoffs:
   1. It is difficult (or impossible) to multi-task in a video call.
   1. It may be more efficient to have an async conversation in an issue, depending on the topic.
   1. A video call is limited in time: A conversation in an issue can start or stop at any time, whenever there's interest. It is async.
   1. A video call is limited in people: You can invite anybody into an async conversation at any time in an issue. You don't have to know who are the relevant parties ahead of time. Everyone can contribute at any time. A video call is limited to invited attendees (and those who have accepted).
   1. You can easily "promote" an async conversation from an issue to a video call, as needed. The reverse is harder. So there is lower risk to start with an async conversation.
   1. For a newcomer to the conversation, it's easier and more efficient to parse an issue, than read a video transcript or watch it.
   1. Conversations in issues are easily searchable. Video calls are not.
1. Try to have your video on at all times because it's much more engaging for participants
   1. Having pets, children, significant others, friends, and family visible during video chats is encouraged. If they are human, ask them to wave at your remote team member to say "Hi".
1. Google Calendar also has a [Zoom plugin](https://chrome.google.com/webstore/detail/zoom-scheduler/kgjfgplpablkjnlkjmjdecgdpfankdle?hl=en-US) where you can easily add a Zoom link for a video call to the invite
1. For meetings that are scheduled with Zoom:
1. As a remote company we are always striving to have the highest fidelity, collaborative conversations. Use of a headset with a microphone, is strongly suggested.
   1. If other people are using headphones then no-headphones works fine. But if multiple people aren't using headphones you get distractions.
   1. Reasons to use headphones:
      1. Computer speakers can cause an echo and accentuate background noise.
      1. Using headphones decreases the likelihood of talking over one another, enabling a more lively conversation.
      1. Better sound quality, avoiding dynamic volume suppression due to echo cancellation.
   1. Leave the no headphones to:
      1. People who don't have them handy at that time
      1. People from outside the company
   1. Suggested headphone models can be found in the handbook under [spending company money](/handbook/spending-company-money/equipment-examples/#headphones-and-earbuds).
1. [Hybrid calls are horrible](#hybrid-calls-are-horrible)
1. Always be sure to advise participants to mute their mics if there is unnecessary background noise to ensure the speaker is able to be heard by all attendees.
1. We start on time and do not wait for people. People are expected to join no later than the scheduled minute of the meeting (before :01 if it is scheduled for :00). The question 'is everyone here' is not needed.
1. It feels rude in video calls to interrupt people. This is because the latency causes you to talk over the speaker for longer than during an in-person meeting. We should not be discouraged by this, the questions and context provided by interruptions are valuable.
1. We end on the scheduled time. It might feel rude to end a meeting, but you're actually allowing all attendees to be on time for their next meeting.
1. It is unusual to smoke in an open office or video conference, vaping is associated with this. For this reason we ask that you don't vape during calls, and if you absolutely have to, kindly switch your camera off.

## Zoom

PostHog uses [Zoom](https://zoom.us/) for video communications.

## Hybrid calls are horrible

In calls that have remote participants everyone should use have their own equipment (camera, headset, screen).

When multiple people share equipment the following **problems arise for remote participants**:

1. Can't hear the sharing people well.
1. Background noise since the microphone of the sharing people on all the time.
1. Can't clearly see facial expressions since each face takes up only a small part of the screen.
1. Can't easily see who is talking since the screen shows multiple people.
1. Hard getting a word in since their delay is longer than for the sharing people.

The **people sharing equipment also have problems** because they don't have their own equipment:

1. Can't easily screen share something themselves.
1. Trouble seeing details in screen sharing since the screen is further away from them.
1. Can't scroll through a slide deck at their own pace.
1. Sharing people can't easily participate (view or type) in a shared document with the agenda and meeting notes.

The disadvantages for remote people are much greater than for the sharing people and hard to notice for the sharing people.
The disadvantages cause previously remote participants to travel to the meeting to be in person for a better experience.
The extra travel is inefficient since it is time consuming, expensive, bad for the environment, and unhealthy.

Theoretically you can have multiple people in a room with their own equipment but in practice it is much better to be in separate rooms:

1. It is annoying to first hear someone talk in the room and then hear it over audio with a delay.
1. It is hard to consistently mute yourself when not talking to prevent someone else's voice coming through your microphone as well.

## Google Calendar

We recommend you set your Google Calendar access permissions to 'Make available for PostHog - See all event details'. Consider marking the following appointments as 'Private':

1. Personal appointments.
1. Confidential & sensitive meetings with third-parties outside of PostHog.
1. 1-1 performance or evaluation meetings.
1. Meetings on organizational changes.

## Writing Style Guidelines

1. At PostHog, we use American English as the standard written language.
1. Do not create links like "here" or "click here". All links should have relevant anchor text that describes what they link to. Using meaningful links is important to both search engine crawlers (SEO) and people with accessibility issues.
This guidance should be followed in all places links are provided, whether in the handbook, website, Google Docs, or any other content.
1. Do not use acronyms when you can avoid them. Acronyms have the effect of excluding people from the conversation if they are not familiar with a particular term.
