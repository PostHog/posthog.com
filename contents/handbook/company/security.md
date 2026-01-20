---
title: Security & Privacy
sidebar: Handbook
showTitle: true
---

It is critical that everyone in the PostHog team follows these guidelines. We take people not following these rules very seriously - it can put the entire company and all of our users at risk if you do not.

## Overview

We maintain a robust security program that follows best practice in order to meet the needs of our PostHog Cloud customers, making PostHog the ideal solution for customers who have GDPR, SOC 2, or CCPA obligations themselves. PostHog Cloud customers own the data they send to us for processing. We collect and analyze data about the use of PostHog Cloud by our customers, but that data does not include the user data that customers send to us to process on their behalf. 

This page covers SOC 2, GDPR, and CCPA compliance.

For information about security advisories and CVEs, see our [advisories & CVEs page](/handbook/company/security-advisories).

## Multi-factor authentication 

We enforce the use of hardware security keys wherever we can. Every team members gets two of these, most commonly:

- One [YubiKey 5C Nano](https://www.yubico.com/gb/product/yubikey-5-series/yubikey-5c-nano/) for use with the work computer (can be left plugged in most of the time)
- One [YubiKey 5C NFC](https://www.yubico.com/gb/product/yubikey-5-series/yubikey-5c-nfc/) (or [YubiKey 5Ci](https://www.yubico.com/gb/product/yubikey-5-series/yubikey-5ci/) to be on the safe side, if you have an older iPhone model) for use with mobile devices, and as backup

Please enable security keys for Google Workspace, MacOS, AWS, 1Password (or whatever password manager you use) and GitHub at the very least. You can also use the Yubikeys to protect personal accounts. If you are new, please do this within your first month so you don't get locked out.

Google recently changed its settings for 2FA and Yubikeys and you may struggle to link your Yubikeys to your Google account. Go [here to find out about the change](https://joshua.hu/enrolling-hardware-keys-2fa-google-workspace) or use this direct link to head [straight to this page where](https://myaccount.google.com/signinoptions/two-step-verification?flow=sk&opendialog=addsk) you can register your Yubikeys. 

> **YubiKey tip:** Avoid spamming OTPs if you accidentally touch your YubiKey by installing the [YubiKey Manager](https://www.yubico.com/support/download/yubikey-manager/) or by running `brew install ykman && ykman config usb --disable OTP`

## SOC 2
import SOC2 from './_snippets/soc2.mdx'

<SOC2 />

These policies are also relevant for GDPR (see below). 

## GDPR

For the purposes of GDPR, customers use PostHog in one of two ways:

- PostHog Cloud
- Self-hosting a hobbyist PostHog instance

If a customer is using PostHog Cloud, then PostHog is acting as **Data Processor** and the customer is the **Data Controller**. We have some GDPR obligations to the customer's end users here. 

If a customer is self-hosting PostHog then they are both the **Data Processor** _and_ the **Data Controller** because they are responsible for their PostHog instance. We do not have access to any of their user data, so we do not have specific GDPR obligations to the customer's end users here. 

### PostHog's obligations as a Data Processor

We have reviewed our architecture, data flows and agreements to ensure that our platform is GDPR compliant. PostHog Cloud does not directly interact with our customers’ end users, nor does the platform automatically collect personal data. However, our customers might collect and send personal data to PostHog for processing. 

PostHog does not require personally identifiable information or personal data to perform product analytics, and we provide extensive controls for customers wishing to minimize personal data collection from their end users. We provide separate guidance for our customers on how to use PostHog in a GDPR-compliant way in our [Docs](/docs/privacy/gdpr-compliance). 

**Technical and Organizational Measures ('TOMs')**

- We maintain an extensive security policies to ensure we are managing data responsibly - [see above](/handbook/company/security#policies).  
- We enter into Data Processing Agreements ('DPAs') with PostHog Cloud customers when requested - [you can generate a DPA here](/dpa). We maintain a register of all DPAs we have entered into. 
- Customers can choose whether to host data on our AWS servers in the EU (eu-central-1 in Germany) or the US (us-east-1 in Virginia). If data transfer is required from the United Kingdom, EU, or EEA to our US based AWS environment, we rely on [EU Standard Contractual Clauses](https://docs.google.com/document/d/1reTUk6VTsTLo1ErNYn-Tdmj_ETo8QYNH6tNCaebDwpE/edit?usp=sharing) (SCCs). 
- We are registered with the Information Commissioner's Office in the United Kingdom as Hiberly Ltd., which is the legal name for our UK entity. 
- A list of sub-Processors is maintained as part of our [DPA](/dpa) - we keep this to a strict minimum.
- Our [Data Processing Register](https://docs.google.com/spreadsheets/d/1HRBhfYINn8jAgwzggVfVH0ttaCfUC18SFAWHU1cjejg/edit#gid=1554885211) is available for viewing by any interested party upon request. 

Charles Cook (VP Operations) is our assigned Data Protection Officer and is responsible for overseeing compliance. Customers can email privacy@posthog.com for any questions relating to GDPR or privacy more generally. 

## CCPA

Under the California Consumer Privacy Act (CCPA), PostHog as a Service Provider to PostHog Cloud customers only. This is similar to the Processor definition under GDPR. We include a CCPA Addendum in our [Privacy Policy](/privacy). 

We give all PostHog customers the tools to easily comply with their end users' requests under CCPA, including deletion of their data. We provide separate guidance for our customers on how to use PostHog in a CCPA-compliant way in our [Docs](/docs/privacy/ccpa-compliance). 

We receive data collected by our customers from end-users and allow them to understand usage metrics of their products. We don't access customer end-user data unless instructed by a customer, and customer data is never sold to third parties. We do not have access to data collected by our customers who are using a self-hosted version of PostHog from end-users at all, unless they give us access to their instance. 

## Pen tests

We conduct these annually, most recently in May 2025 - you can find the report in [our Trust Center](https://trust.posthog.com/?itemUid=2aafaddd-5329-45e2-a37e-cf6979191ad4&source=search).

## Responsible disclosure

Security vulnerabilities and other security related findings can be reported via our [vulnerability disclosure program](https://bugcrowd.com/engagements/posthog-vdp-pro) or by emailing security-reports@posthog.com. Valid findings will be rewarded with PostHog swag.

For information about current and past security advisories and CVEs, see our [advisories & CVEs page](/handbook/company/security-advisories).

## Reporting phishing

If you receive a phishing email/text/whatsapp, it's useful to report it to the security team so that they can make other employees aware. Take a screenshot and post it in `#phishing-attempts`. You may be asked to forward the email to [security-internal@posthog.com](mailto:security-internal@posthog.com) for further inspection.

## Secure communication (aka preventing social engineering)

We follow several best practices to combat social engineering attacks. See [Communication Methods](/handbook/company/communication#communication-methods) for more information.

## Impersonating users

To provide a great customer experience, PostHog employees may occasionally need to access customer data or log in as a user (i.e. *impersonate* them). We allow this access when it's necessary to deliver our service, following these guidelines:

1. **Only impersonate when there’s a clear, demonstrable benefit for the customer.**  
   For example, to investigate an incident, resolve a support issue, or review a customer’s setup to give recommendations on how to use PostHog more successfully.

2. **Do not make any changes to a customer’s setup without explicit consent.**
   Exceptions to this are cases where we are reacting to incidents or bad configurations that are negatively impacting PostHog services in order to protect ourselves _and_ the customer.

3. **Ask for permission whenever possible.**  
   While this isn’t always feasible, such as during an active incident, it’s best practice to inform the customer before accessing their account.
   When a customer raises a support ticket, we take this as consent to be able to impersonate their account and investigate based on the contents of the ticket. Customers will not be actively asked for permission by our support engineers when they are investigating a ticket, and the customer should inform us in the ticket if they explicitly do not wish for our support engineers to access their account.

4. **Use good judgment.**  
   If you’re unsure whether impersonation is justified, or if a customer might object, either seek their consent or find another way to get the information (for example, by checking our internal PostHog instance).
