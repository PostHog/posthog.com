---
title: Guide for doing PostHog talks and demos IRL
sidebar: Handbook
showTitle: true
---

You volunteered or have been asked  to speak at a dev meetup, give a demo at a conference, or present PostHog to a virtual or in-person audience. Maybe you said yes before you thought too hard about it. That's fine — good talks happen this way. This guide is for preparing and delivering your talk.

>For examples from other speaker, reference slides from [previous talks](#examples-from-previous-talks). **Have any questions?** Ask in [#team-irl-events](https://posthog.slack.com/archives/C0AB78YBCNA) or ping whoever put you up to this.

## **1. Know your room before you write a word**

Before you build anything, answer three questions:

**Who's in the room?** A meetup for early-stage founders is different from a Clickhouse conference. Find out: their [persona](/handbook/who-we-build-for). Are they product engineers or founders? What sized team do they work at? What stack? What company stage? Also, how many people will be in the room? Ask the organizer — they want your talk to land too.

**What format are you filling?** Confirm the exact setup:

* Length (20 minutes including Q&A? 45 minutes? Lightning talk?)  
* Slides, live demo, or both?  
* Will you have reliable Wi-Fi, or should you run demos locally?  
* Microphone or projecting your voice?  
* Is it recorded?

**What else is on the agenda?** If you're one of four speakers, you don't want to cover the same ground as the person before you. Get the full lineup.

## **2. How we talk about PostHog (and how we don't)**

No talk should ever be a blatant product or company pitch. Whatever your audience, they didn’t come to this event to receive a pitch (anyone can visit [PostHog.com](http://posthog.com) themselves.)

The PostHog voice in talks:

* **Let the work speak.** Lead with what you built, what broke, what you learned. PostHog appears naturally because you work here and we love to dogfood.   
* **Share real lessons.** The interesting part of any content is the thing that went wrong, the assumption you had to throw out, the number that surprised you, the unpopular opinion.   
* **Have opinions.** "Here's what I think about this" is more useful than "there are tradeoffs on both sides." Take a position, avoid hedging.  
* **Be inclusive with language.** Avoid jargon that excludes people who aren't already PostHog users. Assume the audience is smart, not that they're familiar.

If you finish writing your talk and the word "PostHog" only comes up three times, that's probably good.

## **3. Build the talk around one true thing**

[Kelsey Hightower](https://bsky.app/profile/kelseyhightower.com) — a best in class technical speaker — doesn't use slides as a crutch. He treats his talk like a live demonstration of a belief. Every word moves toward a single point.

**Pick your one true thing → build evidence for it → show it working live**

That's the whole structure. You don't need five points. One claim and the proof. Good examples of what a "one true thing" sounds like:

* *What we learned from pivoting 5 times before reaching PMF*  
* *Lessons from a year of building AI agents in production*  
* *Why we stopped writing unit tests for our data pipeline (and what we do instead)*  
* *How we cut our onboarding drop-off by 60% without a redesign*

Notice what these have in common: they're useful to the audience whether or not PostHog exists.

## **4. Your demo is the talk**

Software demos should tell a story, not show features. The biggest mistake we can make demoing PostHog at events is simply narrating the UI instead of showing a problem being solved.

**Bad:** "So here's the dashboard. You can see we have charts. This one is a trend. This one is a funnel..."

**Good:** "We shipped a new onboarding flow last Tuesday. By Wednesday I was looking at this drop-off and thinking something was wrong. Here's what I found." Then show *that*.

Pick one real scenario — something that happened at PostHog related to your work, or something a real user told you. Build the entire demo around it.

### **Demo setup checklist:**

* \[ \] Use a demo project, not a live account with customer data  
* \[ \] Pre-load data that looks real — sparse data makes features look broken  
* \[ \] Disable notifications on your laptop  
* \[ \] Silence your phone  
* \[ \] Bookmark your demo URL — don't type it live  
* \[ \] Know what happens if Wi-Fi dies (screenshots as backup)  
* \[ \] Zoom your browser to 125–150% so the back row can read it  
* \[ \] Test the projector before anyone arrives

If you’re pre-recording your demo, [\#team-youtube](https://posthog.slack.com/archives/C01R387F6H5), has created [this helpful guide](https://docs.google.com/document/d/1gmfeiL9ARsBQVPzvIl9gL-HnkxxzNqRkeTY3HCLZmus/edit?tab=t.0).

## **5. Building your slides**

A few principles for building out slides:

* Before the slides, start on paper or in a notes app and build out your talk outline  
* PostHog talks use our [standard slide template](https://www.figma.com/slides/buiAgxPjrzpuZyvilFJadI/PH-slide-deck-template?node-id=1-20157&t=ZtCfzbtzRzwfVTry-0) in Figma. [Here’s a guide](https://share.zight.com/kpu21RG9) on how to use it.   
* Code on slides: use a large font (24pt minimum), a dark background, and only show the lines that matter. If you're pasting a full file, you've already lost.  
* One idea per slide. If you're writing full sentences, you're writing speaker notes, not a slide. If applicable, allow memes to replace text.   
* If a slide doesn't support the one true thing you identified in step 3, cut it.  
* Speaking of speaker notes, you will save yourself time and head space if you always have notes.

For feedback on design or help with navigating the [PostHog brand assets](https://posthog.com/handbook/company/brand-assets) ([Hoggies](https://www.figma.com/design/I0VKEEjbkKUDSVzFus2Lpu/Hoggies?node-id=2226-55&t=1sj1GezTKuCfaybF-1) included), stop by [\#team-marketing](https://posthog.slack.com/archives/C08CG24E3SR)

## **6. Practice out loud. Twice minimum.**

Reading your talk in your head doesn't count. Your mouth is slower than your brain. The [VM Brasseur public speaking guide](https://github.com/vmbrasseur/Public_Speaking) has a useful rule: practice until the words feel *boring* to you. If they still feel fresh and interesting when you say them, you haven't done it enough.

Two run-throughs, out loud, at speaking pace, with your actual demo running.

**The “cut” rule:** If you stumble on a section more than twice in practice, that section is probably bad. Rehearsal reveals structural problems — stumbling usually means the logic isn't clear, not that you need to practice more. Stop, figure out *why* it's hard to say, and fix the content.

## **7. The first 60 seconds are everything**

Open with something that makes the room lean in:

* An uncomfortable question: *"How many of you are flying blind on what users do after signup?"*  
* A specific number: *"We had 847 session replays from one user in a single session. Here's why."*  
* A short story: *"A customer emailed us asking why their funnel had 0% conversion. The button said 'Sumbit'."*

Don't introduce yourself first. The host does that. You start with the thing. Then you can re-introduce yourself to set the context of why you’re the person qualified to speak on this subject. 

## **8. Prepare to not know something**

We always want to encourage Q&A after our talks as it builds conversation and connection. Someone will ask a question you can't answer. Don't bullshit. The right response: *"I don't know — but here's how I'd find out, and I'll follow up with you."* Then actually follow up.

If you receive a question that you believe is off-topic or unfitting for the setting, you can let the asked know this and express an interest in moving on to the next one.

## **9. After the talk**

* **Express an willingness to keep the conversation going** - by letting the audience know that you (and any other team members in the room) are sticking around to chat more.
* **Write down the questions you couldn't answer** — do this right away so you don't forget and can focus on interacting with attendees the remainder of the event.
* **Tell the marketing team** — a 2-line Slack in [#team-irl-events](https://posthog.slack.com/archives/C0AB78YBCNA) with the event recap, approximate audience size, and any interesting take-aways.   
* **Share your slides** — Share them on social, QR code, email, path of least resistance. Don't make people hunt.

---

## Examples from previous talks:

* Feb 2026 - <TeamMember name="Emanuele Capparelli"/> - [Lisbon SaaS Founders Presentation](https://pitch.com/v/lisbon-saas-founder-x-posthog-x-supabase-hgnmr3)  
* Feb 2026 - <TeamMember name="Michael Matloka"/> - [10 learning from launching an agentic AI product at scale](https://www.figma.com/slides/zMNBsNihNxKyS6z7sSwiRK/10-learnings-from-launching-an-agentic-AI-product-at-scale?t=6hlWStUDlHsITOKo-6)  
* Nov 2025 - <TeamMember name="James Hawkins"/> - [How to build a cult](https://drive.google.com/file/d/1BMgl2y817m5t43D6NCr9hstnGO1kKxJy/view)  
* Oct 2025 - <TeamMember name="Joshua Snyder"/> - [Code that fixes itself](https://docs.google.com/presentation/d/1sYsmTPugdttQqshPa6yIKQcUu5Rje3-fPMbRGtyrfZg/edit?slide=id.p#slide=id.p)  
* Oct 2024 - <TeamMember name="Michael Matloka"/> - [Parsing at the speed of light](http://figma.com/slides/y0rMgEaWbYe0nSpEhWkyY6/Parsing-at-the-speed-of-metal?node-id=1-536&t=uiCktez3IWxAKI8D-0) 