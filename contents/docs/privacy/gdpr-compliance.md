---
title: PostHog & GDPR compliance
sidebarTitle: PostHog & GDPR
sidebar: Docs
showTitle: true
---

The [General Data Protection Regulation (GDPR)](https://gdpr.eu/) is a privacy and security law, drafted and passed by the European Union (EU). It imposes obligations onto organizations anywhere, so long as they target or collect data related to people in the EU.

We recommend that you read the full text of the GDPR and seek independent legal advice regarding your obligations. The consequences of violating GDPR are severe.

If you require robust GDPR compliance, we recommend using [PostHog Cloud EU](/eu) – a managed version of PostHog that's hosted on servers based in Frankfurt.

## What data is protected under GDPR?

[Personal data](/blog/what-is-personal-data-pii) is protected under GDPR, which means any information that relates to an individual who can be directly or indirectly identified. Names and email addresses are obviously personal data. Location information, ethnicity, gender, biometric data, religious beliefs, web cookies, and political opinions can also be personal data.

## What is the impact of GDPR on product analytics?

The number one rule is don’t collect, store or use any personal data without a good reason for it, such as:

* The person gave you specific, unambiguous consent to process the data (e.g. they’ve opted in to your marketing email list)

* Processing is necessary to enter into a contract to someone (e.g. you need to do a background check)

* You need to process it to comply with a legal obligation of yours (e.g. you receive an order from the court in your jurisdiction)

* You need to process the data to save somebody’s life (e.g. well, you’ll probably know when this one applies)

* Processing is necessary to perform a task in the public interest or to carry out some official function (e.g. you’re a private garbage collection company)

* You have a legitimate interest to process someone’s personal data. This is the most flexible lawful basis, though the “fundamental rights and freedoms of the data subject” always override your interests, especially if it’s a minor's data

### You must acquire "Unambiguous Consent"

There are specific rules about what consent means; hiding it away on page 73 or of your terms and conditions is not good enough:

* Consent must be “freely given, specific, informed and unambiguous”

* Requests for consent must be “clearly distinguishable from the other matters” and presented in “clear and plain language”

* Data subjects can withdraw previously given consent whenever they want, and you have to honor their decision

* Children under 13 can only give consent with permission from their parent

* You need to keep documentary evidence of consent

So, if you're tracking users in your product using PostHog to improve your product, you should explicitly ask for consent to use this data and explain exactly how you will use it when users sign up for your service.

If you use PostHog with cookies on your website (for logged out users), you should also use a cookie banner to enable people to give and withdraw their consent for using cookies.

### Data must be handled securely

You’re required to handle data securely by implementing “appropriate technical and organizational measures.”

This means both technical measures (like encrypting data) and organizational measures (like staff training and limiting access to personal data).

If you have a data breach, you have 72 hours to tell the data subjects or face penalties. (This notification requirement may be waived if you use technological safeguards, such as encryption, to render data useless to an attacker.)

### You should not transfer EU users' personal data outside the EU

If you are self-hosting PostHog on a server outside the EU and are collecting EU user data, you should anonymize any of those users' personal data. 

If you are using PostHog Cloud US, we also recommend you anonymize any EU user data. 

The PostHog [Property Filter app](https://posthog.com/apps/property-filter) allows you to anonymize user data to ensure you stay compliant with GDPR in both cases. 

## How to set PostHog up for GDPR compliance

GDPR requirements differ depending on how your business interacts with personal data. Companies can be data controllers, data processors, or both a controller and a processor. [Data controllers](https://gdpr-info.eu/art-24-gdpr/) collect their end users’ data and decide why and how it is processed. [Data processors](https://gdpr-info.eu/art-28-gdpr/) are businesses instructed to process customer data on behalf of other businesses.

You will be using PostHog in one of two ways:

1. Hosted and managed by us on PostHog Cloud
2. Self-hosted by you on a private cloud or your own infrastructure

If you are using PostHog Cloud then PostHog is the Data Processor and you are the Data Controller.

If you are self-hosting PostHog then you are both the Data Processor and the Data Controller because you are responsible for your PostHog instance.

### Step 1: Choose a hosting provider

We recommend using PostHog Cloud EU for GDPR compliance, though you can use PostHog Cloud US if you follow additional steps to protect user data. If self-hosting, the steps will depend on where you're hosting your data. 

### Step 2: Deploy PostHog

If using PostHog Cloud EU, simply follow the steps in the onboarding process to start sending events. Read our [integration documentation](/docs/integrate) for more information on sending events to PostHog. 

Deploying PostHog onto your own infrastructure is straightforward and we provide support to help with any issues you encounter. You can follow our [standard deployment guides](https://posthog.com/docs/self-host) to get started.

### Step 3: Security configuration

When setting up a PostHog instance **we strongly recommend that you use HTTPS** to secure data in transmission, whether or not your instance has access to the wider internet. We also have a [guide for securing PostHog](https://posthog.com/docs/self-host/configure/securing-posthog) which you should follow to further protect your instance.

We also strongly recommend that you limit access to PostHog and the infrastructure it is deployed on only to people who are authorized and need to access the data, including shared dashboard links. Although aggregate data in dashboards should not contain personal data, it may be possible for malicious users to infer personal data unless it is evaluated thoroughly via expert determination.

Finally, we advise caution when installing, building and enabling [plugins](/docs/apps) for your PostHog instance. Apps are a great way to share and augment data from your instance with other systems, but it’s essential to ensure you have the proper controls in place when sharing personal data outside of your self-hosted PostHog instance.

### Step 4: Configure consent

Since PostHog automatically captures data which can be personal data, you must provide a mechanism for the consensual capturing of that data. In the GDPR, this is called the [right to be informed](https://gdpr-info.eu/issues/right-to-be-informed/).

Within the consent you should identify the types of personal data that are being processed and what tools are being used to process them:

- **If you are using PostHog Cloud** you should identify PostHog as a tool 
- **If you are self-hosting** you can either not list a tool or provide a generic description such as "Product Analytics".

If a user **opts out** then you must stop data capturing and processing. Here are some ways PostHog makes this possible:

- If posthog-js has been initialized, call `posthog.opt_out_capturing()`. See the [posthog-js docs](https://posthog.com/docs/integrate/client/js#opt-users-out)

- Ensure [posthog-js is configured](https://posthog.com/docs/integrate/client/js#config) not to auto-capture and do not make [capture](https://posthog.com/docs/integrate/ingest-live-data#capture-user-events) calls using the installed PostHog SDK on any client

- Do not load the posthog-js SDK. If you do this you should ensure your application logic always performs conditional checks for the availability of the PostHog SDK. This may not be possible in modern JavaScript applications.

- Do not initialize the posthog-js SDK via the call to `init`. If you do this you should ensure your application logic always performs conditional checks regarding the initialization state of the PostHog SDK.

> **Cookieless Tracking:** It is possible to use PostHog without tracking cookies. In this mode, PostHog doesn't create permanent user profiles. Read [How to use PostHog without cookie banners](/tutorials/cookieless-tracking)

### Step 5: Enable the Property Filter app (optional)

If you are self-hosting PostHog outside the EU, or are using PostHog Cloud US, and are capturing EU users' data, you should enable the [Property Filter app](/apps/property-filter). This will allow you to anonymize user data. 

## Complying with 'right to be forgotten' requests

A user must be able to request that their data be removed from PostHog. How you facilitate that request is up to you. For example, you could accept requests via email or form submission.

You can remove a user from a PostHog instance via the PostHog user interface. To do this:

- Select **Persons** from the left-hand menu
- Search for the person via their unique ID. For example, their email
- Click **view** next to the person within the search results
- Click **Delete this person** to remove them and all their associated data from the PostHog instance. You will be prompted to confirm this action.

### Further reading

- [A simple guide to personal data and PII](/blog/what-is-personal-data-pii)
- [Building a tracking cookies opt out banner in React](/tutorials/react-cookie-banner)
- [How to use PostHog without cookie banners](/tutorials/cookieless-tracking)
