---
title: Prioritization
sidebar: Handbook
showTitle: true
---

As there is a lot of autonomy at PostHog, it's useful to have a common framework for how to make prioritization decisions.


## Our mission

> Our mission is to increase the number of successful products in the world.

To achieve this, we will need revenue to be able to re-invest into making a better product.

## Our vision (for 2023)

> Everyone building a product has a clear path to making it successful without losing control of their data

## Our current focus / milestone

We're currently focused on ["Diagnosing Causes"](/handbook/strategy/strategy).

## How do we shift focus between priorities?

We want to move fast and make sure we’re always focused on building what pushes us towards our vision. However, we also recognize that rapidly changing course or excessively pivoting can lead to incomplete or ineffective features and be demotivating.

We’re always looking to make the right decisions for the long term. However, we don’t believe in planning too far ahead as we’re continuously gathering new context.

After we’ve made significant progress towards our current milestone we will build a clear understanding of what we need to focus on next and why, at the end of each sprint we’ll ask ourselves if we’re likely to achieve the goal of our current milestone in the coming sprint. If so, we’ll also start preparing the context we need to move on to our next focus in the following sprint. 


## How is our product/market fit?

Below is a table of how we see our product/market fit for various sizes of companies and various job roles.

<span class="table-borders">
<table>
    <tr>
        <td></td>
        <td>Enthusiast</td>
        <td>Startup</td>
        <td>Scaleup</td>
        <td>Enterprise</td>
    </tr>
    <tr>
        <td>Engineers / PMs with technical expertise</td>
        <td style="background:var(--success)"></td>
        <td style="background:var(--success)"></td>
        <td style="background:var(--warning)">Scalability<br />Advanced analytics</td>
        <td style="background:var(--warning)">Scalability<br />Advanced analytics</td>
    </tr>
    <tr>
        <td>Non-technical PMs, marketing, sales, business</td>
        <td style="background:var(--warning)">Too technical</td>
        <td style="background:var(--warning)">Too technical</td>
        <td style="background:var(--warning)">Too technical</td>
        <td style="background:var(--warning)">Too technical</td>
    </tr>
    <tr>
        <td>Analysts</td>
        <td style="background:var(--success)"></td>
        <td style="background:var(--success)"></td>
        <td style="background:var(--warning)">Direct SQL access<br />Plugins for data lakes</td>
        <td style="background:var(--warning)">Direct SQL access<br />Plugins for data lakes</td>
    </tr>
    <tr>
        <td>Enterprise procurement</td>
        <td style="background:var(--muted)"></td>
        <td style="background:var(--muted)"></td>
        <td style="background:var(--warning)">Compliance features<br />Collaboration features</td>
        <td style="background:var(--warning)">SOC 2<br />Compliance features<br />Collaboration features</td>
    </tr>
</table>
</span>

## Prioritization framework


- 🚀 Rocket Discoveries: e.g. Will this increase the total number of Discoveries?
- 🚧 Unblock Focus Customers: e.g. Is this crucial for our focus customers to be successful? (see [Scale features prioritization][scale] for more details).
- 🛡Shield Trust: e.g. Will this increase or retain trust with our users?

## Additional prioritization frameworks

The prioritization framework above covers mostly how we prioritize high-level milestones, but there's other important things to prioritize too.
- Framework for prioritizing bugs is found [here](/handbook/engineering/bug-prioritization).
- Framework for prioritizing Scale features is found [here][scale].

[scale]: /handbook/engineering/scale-features-prioritization