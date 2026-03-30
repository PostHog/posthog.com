---
title: Adding company-wide tools and vendors
sidebar: Handbook
showTitle: true
---

## What is it?

In [the software section of our spending money page](/handbook/people/spending-money#software) we say:

> There needs to be a very significant upside to introducing a new piece of software to outweigh its cost.

This is our mechanism for making decisions where we need to assess the cost of introducing a new piece of software.  

It is inspired by [this post on "fad resilience" from Slack](https://slack.engineering/how-big-technical-changes-happen-at-slack/). We want to be able to introduce new tools and services, without introducing overlapping tools and unnecessary complexity.

What makes us fad resilient is that you are free (and encouraged) to try new things. But by introducing new things, you become responsible for rolling them out. And for replacing anything they make obsolete.

## What is it *not*?

This doesn't apply to making "cheap decisions". A cheap decision is one that can be easily completed or reversed, or one that only affects your work not other people's; for those types of decisions you should continue to follow the guidance in the [the software section of our spending money page](/handbook/people/spending-money#software). This is about larger scale, broad based adoption of new company-wide tools, or implementation of vendors that are going to be used in the PostHog product. 

## How does it work?

If you find yourself saying something like:

* "we should use Notion, not Google Docs"
* or "(Haskell|Rust|Chicken) would be a better programming language for us"

Then you need to do the following:

**1. Try the tool in a low-risk context**

Use the tool in a context where it is easily replaced and does not involve sensitive data. If you have doubts about what information can be shared at this stage, check with #legal first. Similar to [a spike](https://wiki.c2.com/?SpikeSolution).

The goal is to:
* Check whether the tool works as well as you expect
* Understand the consequences of introducing it
* Learn what data the tool may have access to
* Give others a way to see it in action

**2. Open an issue in [Company Internal](https://github.com/PostHog/company-internal)**

At the same time open an issue describing why we should adopt the tool. Anyone proposing a new vendor should think about the impact on the *whole* company, not just their team or use case.

You should carefully be thinking about and your proposal should consider the types of things described below:

## What to think about?

**Problem and motivation**
* Why should we introduce this tool now? What problem does it solve?
* How large is the benefit vs. the status quo? Is this solving a real issue or just something interesting to try?
* What existing tools or processes would it replace?
* Could this be solved using an existing tool or by building something directly in PostHog?
   
**Trial/Proof of concept**
* Have you tested the tool in a small, reversible context (spike or sandbox)?
* Can it be evaluated without sending real data?
* What did you learn from the trial?
  
**Data exposure and privacy**
* What type of data would be sent to the tool/vendor and does the benefit justify that risk?

  From least to most sensitive:
  * General data – publicly accessible information
  * Business data – internal PostHog data without customer data
  * Customer data – customer PII (name, email, address, IP addresses, etc.)
  * Customer’s customers’ data – end-user PII

Also consider:
* Where will the data be stored or processed? (significant preference toward EU/US as these jurisdictions are lower risk, well vetted, and have robust privacy frameworks)
* Can we avoid sending customer or end-user PII?
* Can data be aggregated, redacted or irreversibly anonymized before leaving our systems?

**Vendor due diligence**
* Where is the company that provides the proposed tool headquartered and where do they operate?
* Who are their customers? How long have they been around?
* Do they demonstrate a credible security posture (SOC2, GDPR, HIPAA, etc.)?
* Are they a well-established tool in the industry, or something experimental and less well known?
  
**Alternatives and competition**
* Why this tool instead of competitors?
* What other credible options exist and how do they compare (cost, security, reputation, risk)?
* What are other companies in our space using?
  
**Internal impact**
* Have other engineers been consulted about technical impact or prior experience?
* Are relevant teams supportive of introducing this tool?
* Has security/infra reviewed the vendor and given their thoughts on their security posture?
* Has legal chimed in and given their thoughts on risks? Is this tool going to qualify as a subprocessor such that customers will need to be aware we’re sending them data?
* Would using this tool impact how sales pitches the PostHog product to potential customers?
* Does this change anything about how we need to communicate with existing customers (marketing/support)?

**Customer defensibility**
* If a customer asked why we use this tool/vendor and send data to them, could we clearly and transparently justify the decision?
* Would a reasonable customer view this as a standard and responsible choice?

These are guidelines, not a rigid checklist.  The goal is for everyone to be thinking about the overall impact of introducing a new tool, and to allow for a holistic review of the risks against the benefits.
   
Many proposals will not make it past this stage – that's good. We don't want a stack that changes constantly, but we also don't want one that never improves.

## After a decision is made: Review process

Once a decision has been made to adopt a tool/vendor, the person proposing the tool is responsible for coordinating the next steps.

**1. Finalize business terms**

Work with the vendor to negotiate the commercial and business terms, such as:
* Cost
* Number of licenses or usage terms and limits
* Contract length
* Any implementation or onboarding details

Once the business terms are mostly settled, the vendor’s documents will need to go through legal review before anything is signed.

Typically, these includes:
* **Master Services Agreement** – the primary contract governing the relationship.
* **Data Processing Agreement** – required if the vendor processes personal data.
* **Security/compliance documentation** – e.g. SOC 2, ISO certifications, or similar.

As soon as it looks like we intend to move forward with the vendor, post in #legal, and give a heads-up that:
* A decision has been made to use the vendor.
* Business terms are being negotiated.
* Contract documents will be shared for review shortly.
* As much context you can provide as possible to aid in the review.

As soon as documents are available for review, send the documents to #legal (in an editable format such as .docx).

**2. Plan time for legal review**

Legal review usually takes a few business days depending on bandwidth, priorities, and existing obligations, and negotiations may take longer depending on the use case, the vendor’s contract terms and how quickly they review and negotiate proposed changes.
   
Plan accordingly and involve legal early. If you have a deadline for implementing the tool or there is another reason the standard timeline above needs to be expedited, please make sure to let legal know ahead of time.

**3. Additional requirements for Subprocessors**

If a vendor qualifies as a **subprocessor**, the review process will usually be more involved.
   
Generally speaking, a subprocessor is a vendor or tool that is going to be used to processes customer or end-user data as fundamental part of the PostHog product or infrastructure. For example, infrastructure providers (like cloud hosting) or services that process production data are clearly subprocessors.
   
Many internal tools used for productivity or operations (for example, documentation and productivity tools) are not *necessarily* subprocessors.
   
As a rule of thumb, any vendor that needs to have access to customer end-user data in order for a part of the PostHog product to function should raise alarm bells, but if you are unsure whether a tool/vendor qualifies as a subprocessor, always check with #legal early.
   
For new subprocessors:

* Customers must receive 14 days’ notice after the agreement is finalized before the vendor can be used in production.
* Because of this requirement, and because the legal and compliance documents for a subprocessor are generally going to be reviewed with careful detail, implementations involving new subprocessors will likely take additional time.

**4. Using the tool**

Once:
* Legal review is complete.
* Contract documents are finalized and signed.
* Any required subprocessor notice period has passed.
   
...the tool can be used in production.
