---
title: Sales & CS Tools
sidebar: Handbook
showTitle: true
---

## Sales, CS & Onboarding Tools
Here are the common tools the Sales, CS, and Onboarding teams use daily.

### Our canonical call stack

For customer and sales calls, we've standardized on three tools. Use these by default – keeping to one stack means every recording, transcript, and meeting link stays consistent and searchable for the whole team.

- **[Zoom](https://zoom.com/) for meetings** – every customer and sales call runs on Zoom.
- **[Gong](https://us-26000.app.gong.io/home?workspace-id=8823646477612786274) for meeting recordings** – records and stores every call in a shared, searchable library the whole team can review.
- **[Granola](https://www.granola.ai/) for transcripts** – AI-generated notes and transcripts, created on your laptop while you're in the call.

> [BuildBetter](https://app.buildbetter.app) is where we store historical demos and meetings, and some teams still use it day-to-day. For new calls, Gong is the default.

#### Connecting them together

The three tools layer on top of each other: Zoom hosts the call, Gong records it to our shared library, and Granola gives you your own transcript and notes. Set them up in this order:

1. **Zoom** – Run every customer and sales call on Zoom. You'll also need a Zoom Pro account for Gong recording to work – request one via `/zluri` if you don't have it. If you happen to use [Calendly](https://calendly.com/) for scheduling, you can set Zoom as its default location so booked calls land on Zoom automatically, but that's optional.
2. **Gong** – Request access via `/zluri`, then connect it to your calls:
   - Download the [Gong Meeting Manager](https://workspace.google.com/marketplace/app/gong_meeting_manager/779001639133) extension, which triggers a user consent page when you join calls.
   - Connect your Calendly link (if you use one) with the Gong consent page [using this guide on Slack](https://posthog.slack.com/archives/C01MGUHFH6G/p1770157267662229?thread_ts=1770157176.458439&cid=C01MGUHFH6G).
   - Once connected, Gong automatically joins and records your Zoom calls into the shared library.
3. **Granola** – Install the [Granola](https://www.granola.ai/) app and connect it to your calendar. It runs on your laptop and transcribes whatever call you're in (including your Zoom calls), so you get notes and a transcript without adding another bot to the meeting.

### Tools through Google and Single Sign-On (SSO)

- Metabase [US](https://metabase.prod-us.posthog.dev/) and [EU](https://metabase.prod-eu.posthog.dev/)
- PostHog [US](https://us.posthog.com/) and [EU](https://eu.posthog.com/) instances. Login to both as this is needed for admin access
  - [PostHog App + Website](https://us.posthog.com/project/2) reference within PostHog US instance
- [QuoteHog](https://quote.posthog.net/)
- [Salesforce](https://posthog.lightning.force.com/)
- [Vitally](https://posthog.vitally-eu.io/) - once you've logged in once with Google ask your Team Lead to upgrade your role to Team Member
- [PostHog Support](https://us.posthog.com/project/2/support/tickets)
- [Zoom](https://zoom.com/)
- *Note: Add yourself to group emails sent to sales@posthog.com or cs@posthog.com by joining the corresponding Google Group ([sales@](https://groups.google.com/a/posthog.com/g/sales/about) or [cs@](https://groups.google.com/a/posthog.com/g/cs/about)). It's important you don't mark these emails as spam as Google will unsubscribe you from these group emails.*

### Tools requiring approval
You can self-serve access requests to the following tools using Zluri through Slack (type `/zluri` in any channel to start the request)
- [Gong](https://us-26000.app.gong.io/home?workspace-id=8823646477612786274) - our canonical meeting recorder. You'll need a Zoom Pro account too. See [connecting them together](#connecting-them-together) for setup.
- [PostHog Billing](https://billing.posthog.com) 
- [Stripe](https://dashboard.stripe.com/)
- [PandaDoc](https://app.pandadoc.com/)
- [Pitch](https://app.pitch.com/)

### Tools that you may find useful and not required
Unless otherwise indicated, you can self-serve access requests to the following tools using Zluri through Slack (type `/zluri` in any channel to start the request)
- [BuildBetter](https://app.buildbetter.app) for storing historical demos and meetings – some teams still use it
- [Calendly.com](https://calendly.com/) for shared meeting booking links
- [Clay](https://www.clay.com/) for account and contact enrichment
- [In Your Face](https://www.inyourface.app/) (app) don't miss meeting notifications
- [LinkedIn Sales Navigator](https://www.linkedin.com/sales/home) 
- [Loom](https://www.loom.com/) for short videos 
- [Microsoft Teams](https://teams.microsoft.com) - for linking Slack with Teams when customers only use Teams - ask Simon for access
- [Scratchpad](https://www.scratchpad.com/) for AI agents and a friendlier SFDC UI
- [spark](https://sparkmailapp.com/) (app) AI powered inbox
- [Superhuman](https://superhuman.com/) (app) AI powered inbox
- [Wappalyzer](https://www.wappalyzer.com/) for identifying tech stack on customer sites (also as a Chrome/Firefox extension). Credentials in 1Password
- [Alfred](https://alfred.app/) / [Raycast](https://www.raycast.com/) for automated workflows. - Just download and install.
- An IDE, like VS Code, Zed, or Cursor. It will come in handy for coding and development tasks.
- Your next favorite tool!

### Useful Slack channels

- <PrivateLink url='https://posthog.slack.com/archives/C08M011SBCM'>#team-customer-success</PrivateLink> - the Customer Success team.
- <PrivateLink url='https://posthog.slack.com/archives/C09677WV1GW'>#team-new-business-sales</PrivateLink> - the New Business sales team.
- <PrivateLink url='https://posthog.slack.com/archives/C093XHYMGBE'>#team-product-led-sales</PrivateLink> - the Product-led sales team.
- <PrivateLink url='https://posthog.slack.com/archives/C098D86DZDZ'>#team-onboarding</PrivateLink> - the Onboarding team.
- <PrivateLink url='https://posthog.slack.com/archives/C090RCG671C'>#group-cs-sales-support</PrivateLink> - cross-team discussion for everyone who owns customers.
- <PrivateLink url='https://posthog.slack.com/archives/C01MGUHFH6G'>#sales</PrivateLink> - for general sales topics.
- <PrivateLink url='https://posthog.slack.com/archives/C03V7SP3Z3K'>#incidents</PrivateLink> - for notifications of incidents which may impact customers.  Make sure you set this to alert you for every message so that you know when something is up.
- <PrivateLink url='https://posthog.slack.com/archives/C071PGWKBQS'>#sales-alerts</PrivateLink> - automated notifications from Vitally.
- <PrivateLink url='https://posthog.slack.com/archives/C054BJSHG82'>#sales-leads</PrivateLink> -  automated notifications for new sales leads.
- <PrivateLink url='https://posthog.slack.com/archives/C08MYQX74KH'>#legal</PrivateLink> - for requests from our legal folks.
- <PrivateLink url='https://posthog.slack.com/archives/C08UNFX75ST'>#closed-won</PrivateLink> - yay!
- <PrivateLink url='https://posthog.slack.com/archives/C096DC85NH5'>#closed-lost</PrivateLink> - boo!
- <PrivateLink url='https://posthog.slack.com/archives/C09HKF565MZ'>#customer-churn</PrivateLink> - discussion of potential and actual customer churn.
- <PrivateLink url='https://posthog.slack.com/archives/C09HKF565MZ'>#changelog</PrivateLink> - product launches.
- <PrivateLink url='https://posthog.slack.com/archives/C0975UEGHT5'>#today-i-learned</PrivateLink> - where we share our learnings.
- <PrivateLink url='https://posthog.slack.com/archives/C07TQR0V16U'>#ask-max</PrivateLink> - bot focused on internal processes and questions.
- <PrivateLink url='https://posthog.slack.com/archives/C0AP5NXF8D7'>#demo-posthog-anything</PrivateLink> - show off something cool or see how others are demoing things.
- <PrivateLink url='https://posthog.slack.com/archives/C0B5QBS29QU'>#coming-soon</PrivateLink> - see what's coming soon - a schedule of upcoming product launches.
