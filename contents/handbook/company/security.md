---
title: Security & Privacy
sidebar: Handbook
showTitle: true
---

It is critical that everyone in the PostHog team follows these guidelines. We take people not following these rules very seriously - it can put the entire company and all of our users at risk if you do not.

## Overview

By offering a self-hosted product analytics solution, PostHog goes further than any other product analytics provider towards protecting end user data. By enabling customers to host PostHog on their own infrastructure, we aren't able to see end user data. This makes PostHog the ideal solution for customers who have GDPR, HIPAA, SOC 2 or CCPA obligations themselves. 

Nevertheless, we maintain a robust security program that follows best practice, and in order to meet the needs of our PostHog Cloud customers, whose product analytics data we do host on their behalf. PostHog Cloud customers own the data they send to us for processing. We collect and analyze data about the use of PostHog Cloud by our customers, but that data does not include the data that customers send to us to process on their behalf.

This page covers SOC 2, GDPR, CCPA and HIPAA compliance. In future, we may consider obtaining ISO27001 certification. 

## SOC 2

We are in the process of obtaining our SOC 2 certification, and we monitor compliance via Drata. Our latest [security report](https://app.drata.com/security-report/805315dd-8452-461b-850d-fb1957ecb803/f665f462-0677-46cd-b183-36ebdeec8a30) is publicly available. 

### Policies

We have a number of policies in place to support SOC 2 compliance. All team members have been invited to Drata to review these and to complete security training as part of onboarding. Additionally, all team members undergo background checks when starting at PostHog. 

Our policies are stored on Drata, so this section of the Handbook just serves to make these policies publicly available for potential customers:

- [Acceptable Use Policy](https://drive.google.com/file/d/1rZknmogF7B3KVxWqOAl278bUckWDv92v/view?usp=sharing)
- [Asset Management Policy](https://drive.google.com/file/d/14Z3Isvffwg7Y8X_ZHMvp_7gdvDujAwRe/view?usp=sharing)
- [Backup Policy](https://drive.google.com/file/d/19fKnj20U48rmkDPpes2wA_hK7hYH45aP/view?usp=sharing)
- [Business Continuity Plan](https://drive.google.com/file/d/1sJWpNr9U2aONrKOJyrbgKqxDi-h8Z3hx/view?usp=sharing)
- [Code of conduct](https://drive.google.com/file/d/1qVtkxDBmKCMFUX3cgichKEsW0IylliQG/view?usp=sharing)
- [Data Classification Policy](https://drive.google.com/file/d/1VFoba8mrDiTHo0A0po1hLWWZ5gsfTSM6/view?usp=sharing)
- [Data Deletion Policy](https://drive.google.com/file/d/1FBNFBC0lZHi6VE1z-PYjlYHzERIkKBmX/view?usp=sharing)
- [Data Protection Policy](https://drive.google.com/file/d/1C-P0QxxaayEHgOdoUEiSvwY_VwriaFHo/view?usp=sharing)
- [Disaster Recovery Plan](https://drive.google.com/file/d/1VGOGvRE22NDsN0SV32ZtG27gNLJWVqbN/view?usp=sharing)
- [Encryption Policy](https://drive.google.com/file/d/1mX9s8gRRpOs7UpdZ48KGyCErL8a3DfZD/view?usp=sharing)
- [Incident Response Plan](https://drive.google.com/file/d/1Dnj_gELBJTMlqTagGs3Mv8JWMbaLXM54/view?usp=sharing)
- [Information Security Policy](https://drive.google.com/file/d/1Z2S-yl0jBPLVdl_0Qwc5kyIF3Dj3ypTp/view?usp=sharing)
- [Password Policy](https://drive.google.com/file/d/1Z2S-yl0jBPLVdl_0Qwc5kyIF3Dj3ypTp/view?usp=sharing)
- [Physical Security Policy](https://drive.google.com/file/d/17JkSfMC7ILuAm3YjZRCTB7i8eWLtkuN3/view?usp=sharing)
- [Responsible Disclosure Policy](https://drive.google.com/file/d/1ag8F2OA3FYUwRRAGbzMrDw1XV1QoqhNg/view?usp=sharing)
- [Risk Assessment Policy](https://drive.google.com/file/d/1mnqKDqZTjOI4EJhpbpbjcVmLzCMhZDki/view?usp=sharing)
- [Software Development Lifecycle Policy](https://drive.google.com/file/d/1FU8quDWJi66bJnAKc-9ZPPfL7Skp07n9/view?usp=sharing)
- [System Access Control Policy](https://drive.google.com/file/d/1jxiy9OpS4aCllDQJk88emnihWKUv6Uyq/view?usp=sharing)
- [Vendor Management Policy](https://drive.google.com/file/d/1AQxJ9k4V6kXzECdyS2Fn5h-BcXrgQQDi/view?usp=sharing)
- [Vulnerability Management Policy](https://drive.google.com/file/d/1bUxuBvTCAzMasG39ShtfnUjRm_2gM1Q3/view?usp=sharing)

These policies are also relevant for GDPR (see below). 

## GDPR

For the purposes of GDPR, customers use PostHog in one of two ways:

- PostHog Cloud
- Self-hosting and managing a PostHog instance (PostHog Open Source, PostHog Scale and PostHog Enterprise)

If a customer is using PostHog Cloud, then PostHog is acting as **Data Processor** and the customer is the **Data Controller**. We have some GDPR obligations to the customer's end users here. 

If a customer is self-hosting PostHog then they are both the **Data Processor** _and_ the **Data Controller** because they are responsible for their PostHog instance. We do not have access to any of their user data, so we do not have specific GDPR obligations to the customer's end users here. Self-hosting PostHog is great for customers as well, as they don't need to enter into a DPA with us. 

### PostHog's obligations as a Data Processor

We have reviewed our architecture, data flows and agreements to ensure that our platform is GDPR compliant. PostHog Cloud does not directly interact with our customers’ end users, nor does the platform automatically collect personal data. However, our customers might collect and send personal data to PostHog for processing. 

PostHog does not require personally identifiable information or personal data to perform product analytics, and we provide extensive controls for customers wishing to minimize personal data collection from their end users. We provide separate guidance for our customers on how to use PostHog in a GDPR-compliant way in our [Docs](/docs/integrate/gdpr). 

Additional measures:

- We enter into Data Process Agreements (DPAs) with PostHog Cloud customers when requested - [our standard agreement is here](https://docs.google.com/document/d/1xfpP1SCFoI1qSKM6rEt9VqRLRUEXiKj9_0Tvv2mP928/edit?usp=sharing). We maintain a register of all DPAs we have entered into. 
- If data transfer is required from the United Kingdom, EU or EEA to our US-West based AWS environment, we rely on [EU Standard Contractual Clauses](https://docs.google.com/document/d/1reTUk6VTsTLo1ErNYn-Tdmj_ETo8QYNH6tNCaebDwpE/edit?usp=sharing) (SCCs). 
- We are registered with the Information Commissioner's Office in the United Kingdom as Hiberly Ltd., which is the legal name for our UK entity. 
- A list of sub-Processors is maintained as part of our [Privacy Policy](https://posthog.com/privacy) - we keep this to a strict minimum.
- We maintain an extensive security policies to ensure we are managing data responsibly (see above).  

Charles is our assigned Data Protection Officer and is responsible for overseeing compliance. 

### Self-hosted access for diagnostic purposes

On the very rare occasions that a customer who is self-hosting PostHog wants to give us voluntary access to their data for diagnostic or customer support purposes, then we will enter into a DPA first. If the PostHog team member being given access is based in the US, then we will include SCCs. Access can only be given for the minimum length of time required to resolve the issue. We will ask the customer to sign a mutual NDA as well. 

## CCPA

Under the California Consumer Privacy Act (CCPA), PostHog as a Service Provider to PostHog Cloud customers only. This is similar to the Processor definition under GDPR. 

We give all PostHog customers the tools to easily comply with their end users' requests under CCPA, including deletion of their data. Instructions are the same as those under GDPR, and are available in our [Docs](/docs/integrate/gdpr). 

We receive data collected by our customers from end-users and allows them to understand usage metrics of their products. We don't access customer end-user data unless instructed by a customer, and customer data is never sold to third parties. We do not have access to data collected by our customers who are using a self-hosted version of PostHog from end-users at all, unless they give us access to their instance. 

## HIPAA 

Self-hosting PostHog makes it very easy for customers processing Protected Health Information (PHI) to stay HIPAA-compliant. Our [guide to HIPAA-compliant analytics](/blog/hipaa-compliant-analytics) explains how they can get set up.

We only support the use of a self-hosted version of PostHog for companies with HIPAA obligations. As such, we do not recommend the use of PostHog Cloud in this particular case, nor do we enter into Business Associate Agreements (BAA) to do so. 
