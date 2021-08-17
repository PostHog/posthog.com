---
title: Strategy overview
sidebar: Handbook
showTitle: true
---

## TL;DR
Our mission is to “Increase the number of successful products in the world”.

We started by building an open-source product analytics platform with all the basic things you'd need to understand user behavior - funnels, trends, session recordings, feature flags and many more features. Within a year we had thousands of customers using us and we started generating revenue.

Our next step on our journey is to prove a deeper level of product-market fit with 5 reference customers. Today we're closest to product market fit with products which need to self-host and are in the growth phase of their lifecycle; they need us to absolutely "Nail Funnels" in order to make their products successful.

### Context

We’ve grown a lot, but it’s clear that the many of our users use us *despite* a bad experience - bugs, instability, lots of maintenance or confusing UX. This is a great problem to have. It means we’re solving a hair on fire problem - product analytics that you can self host.

For any company, nothing matters more than product market fit. If we get that right, it’ll be much easier for customer success, marketing or - in future - sales teams to succeed.

Rather than trying to please everyone, we decided to focus on delighting a handful of companies first. We jumped straight into looking for ‘the Big 5’ companies that at first appeared similar but then realized they’re using us to solve very different needs.

The proposed strategy below focuses on a long term direction and a shorter term first milestone along the way to get us to product market fit, based on needs instead. We would love your feedback.


### Mission

**_“Increase the number of successful products in the world”_**


### Long Term Vision (for 2023)

**_“Everyone building a product has a clear path to making it successful without losing control of their data”_**

This means engineers can install PostHog and within a few hours, qualitative and quantitative data will be captured from their product, audience and any other data sources they have (playing nicely with data warehouses).

PostHog will surface this data at the right time to anyone involved in building the product (PMs, Engineers, Support) to make their own well-informed decisions and safely release changes, validate and realize the opportunities identified.

It will be a “no brainer” for anyone to use PostHog with any product they are building.


### Target Audience (for 2021)

Our customers are a combination of users, businesses and the products themselves. In order to understand where we should focus our efforts, below is a proposed breakdown of our target audience based on attributes of a product. 

**Product Data Protection Level**



*   **Bespoke:** Product data needs to be stored on bespoke infrastructure (e.g. not AWS, GCP) controlled by the owner, they may also have other bespoke requirements around dedicated support, SLAs and limitations on services communicating outside their network
*   **Controlled:** Product data must be stored on infrastructure controlled by the owner on standard infrastructure (e.g. AWS, GCP, etc)
*   **Cloud:** Product data must be secure but can be stored on infrastructure owned by PostHog

**Product Lifecycle Stage**



*   **Introduction:** A new product with a small number of early adopters using it, yet to achieve product market fit
*   **Growth:** A product which has found initial product market fit with a limited audience and focused on expanding their reach
*   **Maturity:** A product which has saturated its audiences and is focused on retaining users
*   **Decline:** A product which is losing market share and needs to be phased out or pivoted

<table>
  <tr>
   <td rowspan="4" >
<strong>Data Protection Level</strong>
   </td>
   <td><strong>Bespoke</strong>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><strong>Controlled</strong>
   </td>
   <td>
   </td>
   <td>Focus
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><strong>Cloud</strong>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td><strong>Introduction</strong>
   </td>
   <td><strong>Growth</strong>
   </td>
   <td><strong>Maturity</strong>
   </td>
   <td><strong>Decline</strong>
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td colspan="5" ><strong>Product Lifecycle Stage</strong>
   </td>
  </tr>
</table>


**Why focus on Controlled Data / Growth Products?**

There are a number of reasons to focus on these types of products:



1. We have early validation that we have a unique advantage over competitors for businesses requiring controlled data because of our open source approach
2. We’re seeing early traction in this segment: “Driving activation through funnel optimization” is the primary activity for most growth products, today our “funnels” feature has the strongest engagement (49% more discovered learnings than trends, with a similar number of unique users)
3. If successful at getting to PMF with this focus segment; PostHog will move into this segment ourselves, this puts us a step ahead when it comes to growth since we will be able to validate our product, move extremely fast and leverage the benefits directly
4. Products in this phase **need** great analytics to be successful, products in the introduction phase rely more on qualitative data from early adopters (which we’re not well-positioned to solve today)

**What are the core needs for Controlled Data / Growth Products?**



1. We need to keep our data on our own infrastructure to protect our customers
2. We need to optimize our onboarding funnel to grow our product
3. We need to clearly share our findings to drive high quality decisions
4. We need reliable information to be confident in the decisions we make
5. We need analysis to be fast to keep pace with our growing business


### First Milestone (Now until Early August)

In order to achieve product market fit with this segment we need to start by solving a limited number of problems exceptionally well for a small number of customers (5) and then expand.

The proposed timeline for the first milestone coincides with the next board meeting, our goals should be realistic but ambitious so we should aim for a 50% chance of hitting them by this date.

These goals and key results are suggestions for now, teams across the company should be empowered to jointly identify, set and achieve their own goals to optimize for overall progress  towards our mission.

**Goals**



*   **We have 5 reference customers in our focus segment**
    *   **Setting up and maintaining PostHog continuously on customer controlled infrastructure is fast and easy**
        *   Key Results, for example: P90 deployment time < 5minutes
        *   Key Results, for example: P90 troubleshooting/upgrading/maintenance time < 5 minutes / month
    *   **Our customers deeply understand their activation funnel to grow their product**
        *   Key results, for example: Achieve high product maturity for 5 key “growth jobs” (see below for example)
    *   **Our customers have a rapid and reliable experience**
        *   Key results, for example: P95 end-to-end query time for funnels &lt; 3 seconds, no usability bugs filed

**One Sentence Version**

To get 5 reference customers in the controlled data / growth product segment we need to nail funnels.

**Two Word Version**

“Nail Funnels”

### Milestone 2 (Early August Onwards)

After nailing funnels, our primary focus should transition to _Diagnosing Causes_, since our customers will now be able to understand when problems are happening with their nailed funnels but to address these issues they must go one step deeper and understand why they are occurring.

In parallel we should spin-up evergreen investments around growth and our core platform (Performance, Reliability and Extensibility) to ensure we are reaching as many organizations as possible (increasing the number of successful products in the world) and so we don’t lose trust with existing users due to issues underpinning our platform.

**One Sentence Version**
Nailing funnels means people will find problems with their products, next we need to enable them to _Diagnose Causes_ so they can fix these problems and make their product successful.

**Two Word Version**
Nail Diagnosis

## Why should we focus on Diagnosing Causes?


* Our current focus on funnels is generating significant demand from users for going deeper, to understand why people are and are not successful (we’re seeing a number of customer requests in this direction)
* We currently have a number of tools in our suite (e.g. sessions, trends, paths) that can be evolved and tightly integrated to enable our users to go deeper and understand why issues are occurring
* We have seen demand for experimentation capabilities, but the value of experiments are heavily constrained by the quality of the hypothesis people can generate from diagnosing causes


## What are the needs of our target audience?

At a very high level these are the core needs to solve for and some examples of what that might look like in practice.


<table>
  <tr>
   <td><strong>Priority</strong>
   </td>
   <td><strong>Description of Need</strong>
   </td>
   <td><strong>Current progress</strong>
   </td>
   <td><strong>Unique ability to execute</strong>
   </td>
  </tr>
  <tr>
   <td>P0
   </td>
   <td>Understand what users were doing when they dropped-off <em>(e.g. reliable session recording and playback, seamless to find the right sessions, etc.)</em>
   </td>
   <td>Mid
   </td>
   <td>Very High
   </td>
  </tr>
  <tr>
   <td>P0
   </td>
   <td>Understanding what successful and unsuccessful users have in common
<p>
<em>(e.g. correlation of events and user properties with success and failure)</em></p>
   </td>
   <td>Low
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>P1
   </td>
   <td>Understand what events might have caused the user to drop-off
<p>
<em>(e.g. reviewing prioritized events from around the time of drop-off)</em></p>
   </td>
   <td>Mid
   </td>
   <td>Mid
   </td>
  </tr>
  <tr>
   <td>P1
   </td>
   <td>Understand what path people took before and after they were successful or unsuccessful
<p>
<em>(e.g. extended and enhanced paths capability)</em></p>
   </td>
   <td>Mid
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>P1
   </td>
   <td>Backtest hypothesis to build supporting evidence
<p>
<em>(e.g. ad-hoc trends queries leverage insights found)</em></p>
   </td>
   <td>Mid
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>P2
   </td>
   <td>Collect all evidence together into shareable hypotheses
   </td>
   <td>Low
   </td>
   <td>Mid
   </td>
  </tr>
</table>

We should use this grid as a starting point to prioritize building out detailed problems to solve for users.
