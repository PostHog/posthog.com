---
title: Security & Privacy
sidebar: Handbook
showTitle: true
---

It is critical that everyone in the PostHog team follows these guidelines. We take people not following these rules very seriously - it can put the entire company and all of our users at risk if you do not.

## Overview

By offering a self-hosted product analytics solution, PostHog goes further than any other product analytics provider towards protecting end user data. By enabling customers to host PostHog on their own infrastructure, we aren't able to see end user data. This makes PostHog the ideal solution for customers who have GDPR, HIPAA, SOC 2 or CCPA obligations themselves. 

Additionally, we maintain a robust security program that follows best practice in order to meet the needs of our PostHog Cloud customers. PostHog Cloud customers own the data they send to us for processing. We collect and analyze data about the use of PostHog Cloud by our customers, but that data does not include the user data that customers send to us to process on their behalf.

This page covers SOC 2, GDPR, CCPA and HIPAA compliance.

## SOC 2

We have all controls and systems in place ready to obtain our SOC 2 Type 1 certification, and expect this to be granted in Q1 2022. We monitor compliance via Drata. 

Our latest [security report](https://drive.google.com/file/d/1dC7V5L8WJx9WYWV7fEiCTi6-4O7h6Z1i/view?usp=sharing) is publicly available (last updated December 2022). 

### Policies

We have a number of policies in place to support SOC 2 compliance. All team members have been invited to Drata to review these and to complete security training and background checks as part of onboarding.

All of these policies are available for viewing upon request:

- Acceptable Use Policy
- Asset Management Policy
- Backup Policy
- Business Continuity Plan
- Code of Conduct
- Data Classification Policy
- Data Deletion Policy
- Data Protection Policy
- Disaster Recovery Plan
- Encryption Policy
- Incident Response Plan
- Information Security Policy
- Password Policy
- Physical Security Policy
- Responsible Disclosure Policy
- Risk Assessment Policy
- Software Development Lifecycle Policy
- System Access Control Policy
- Vendor Management Policy
- Vulnerability Management Policy

These policies are also relevant for GDPR (see below). 

## GDPR

For the purposes of GDPR, customers use PostHog in one of two ways:

- PostHog Cloud
- Self-hosting and managing a PostHog instance

If a customer is using PostHog Cloud, then PostHog is acting as **Data Processor** and the customer is the **Data Controller**. We have some GDPR obligations to the customer's end users here. 

If a customer is self-hosting PostHog then they are both the **Data Processor** _and_ the **Data Controller** because they are responsible for their PostHog instance. We do not have access to any of their user data, so we do not have specific GDPR obligations to the customer's end users here. Self-hosting PostHog is great for customers as well, as they don't need to enter into a DPA with us. 

### PostHog's obligations as a Data Processor

We have reviewed our architecture, data flows and agreements to ensure that our platform is GDPR compliant. PostHog Cloud does not directly interact with our customers’ end users, nor does the platform automatically collect personal data. However, our customers might collect and send personal data to PostHog for processing. 

PostHog does not require personally identifiable information or personal data to perform product analytics, and we provide extensive controls for customers wishing to minimize personal data collection from their end users. We provide separate guidance for our customers on how to use PostHog in a GDPR-compliant way in our [Docs](/docs/integrate/gdpr). 

Technical and Organizational Measures ('TOMs')

- We maintain an extensive security policies to ensure we are managing data responsibly - [see above](/handbook/company/security#policies).  
- We enter into Data Processing Agreements ('DPAs') with PostHog Cloud customers when requested - [our standard agreement is here](https://docs.google.com/document/d/1xfpP1SCFoI1qSKM6rEt9VqRLRUEXiKj9_0Tvv2mP928/edit?usp=sharing). We maintain a register of all DPAs we have entered into. 
- If data transfer is required from the United Kingdom, EU or EEA to our US-West based AWS environment, we rely on [EU Standard Contractual Clauses](https://docs.google.com/document/d/1reTUk6VTsTLo1ErNYn-Tdmj_ETo8QYNH6tNCaebDwpE/edit?usp=sharing) (SCCs). 
- We are registered with the Information Commissioner's Office in the United Kingdom as Hiberly Ltd., which is the legal name for our UK entity. 
- A list of sub-Processors is maintained as part of our [DPA](https://docs.google.com/document/d/1xfpP1SCFoI1qSKM6rEt9VqRLRUEXiKj9_0Tvv2mP928/edit?usp=sharing) - we keep this to a strict minimum.

Charles Cook (VP Operations) is our assigned Data Protection Officer and is responsible for overseeing compliance. Customers can email privacy@posthog.com for any questions relating to GDPR or privacy more generally. 

### Self-hosted access for diagnostic purposes

On the very rare occasions that a customer who is self-hosting PostHog wants to give us voluntary access to their data for diagnostic or customer support purposes, then we will enter into a DPA first. If the PostHog team member being given access is based in the US, then we will include SCCs. Access can only be given for the minimum length of time required to resolve the issue. We will ask the customer to sign a mutual NDA as well. 

## CCPA

Under the California Consumer Privacy Act (CCPA), PostHog as a Service Provider to PostHog Cloud customers only. This is similar to the Processor definition under GDPR. We include a CCPA Addendum in our [Privacy Policy](/privacy). 

We give all PostHog customers the tools to easily comply with their end users' requests under CCPA, including deletion of their data. We provide separate guidance for our customers on how to use PostHog in a GDPR-compliant way in our [Docs](/docs/privacy/ccpa-compliance). 

We receive data collected by our customers from end-users and allows them to understand usage metrics of their products. We don't access customer end-user data unless instructed by a customer, and customer data is never sold to third parties. We do not have access to data collected by our customers who are using a self-hosted version of PostHog from end-users at all, unless they give us access to their instance. 

## HIPAA 

Self-hosting PostHog makes it very easy for customers processing Protected Health Information (PHI) to stay HIPAA-compliant. Our [guide to HIPAA-compliant analytics](/docs/privacy/hipaa-compliance) explains how they can get set up.

We only support the use of a self-hosted version of PostHog for companies with HIPAA obligations. As such, we do not recommend the use of PostHog Cloud in this particular case, nor do we enter into Business Associate Agreements (BAA) to do so. 
