---
title: Prioritization
sidebar: Handbook
showTitle: true
---

As there is a lot of autonomy at PostHog, it's useful to have a common framework for how to make prioritization decisions.


## Our mission

> Our mission is to increase the number of successful products in the world.

To achieve this, we will need revenue to be able to re-invest into making a better product.

## Our Vision (for 2023)

“Everyone building a product has a clear path to making it successful without losing control of their data”

## Our current focus / milestone

We're currently focused on ["Nailing Funnels"](/handbook/strategy/strategy)

## How do we shift focus between priorities?

We want to move fast and make sure we’re always focused on building what pushes us towards our vision. However, we also recognize that rapidly changing course or excessively pivoting can lead to incomplete or ineffective features and be demotivating.

We’re always looking to make the right decisions for the long term. However, we don’t believe in planning too far ahead as we’re continuously gathering new context.

After we’ve made significant progress towards our current milestone we will build a clear understanding of what we need to focus on next and why, at the end of each sprint we’ll ask ourselves if we’re likely to achieve the goal of our current milestone in the coming sprint. If so, we’ll also start preparing the context we need to move on to our next focus in the following sprint. 


## How is our product/market fit?

Below is a table of how we see our product-market fit for various sizes of companies and various job roles.

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
        <td style="background:var(--warning)">Too technical<br />Feature set / integrations</td>
        <td style="background:var(--warning)">Too technical<br />Feature set / integrations</td>
        <td style="background:var(--warning)">Too technical<br />Feature set / integrations</td>
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
        <td style="background:var(--muted)"></td>
        <td style="background:var(--warning)">SOC 2<br />VPC</td>
    </tr>
</table>
</span>


As you can see, we have good product-market fit with engineers generally, and specifically for enthusiasts and startups. 

## Value

Now let's look at how building things for the different size companies helps us achieve our two goals:

1. Increase the number of successful products in the world
2. Increase revenue so we can re-invest in #1

Given scores from 1-5, here's how each type of company stacks up against those two values.

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
        <td>Successful products</td>
        <td>Low (1/5)</td>
        <td>Very high (5/5)</td>
        <td>High (4/5)</td>
        <td>Low (1/5)</td>
    </tr>
    <tr>
        <td>Revenue</td>
        <td>Low (1/5)</td>
        <td>Mid (2/5)</td>
        <td>High (4/5)</td>
        <td>Very high (5/5)</td>
    </tr>
    <tr>
        <th>Combined</th>
        <th>Low (1/5)</th>
        <th>High (3/5)</th>
        <th>High (3.5/5)</th>
        <th>High (3/5)</th>
    </tr>
</table>
</span>

## Putting it together

When thinking of building a new feature, we can combine the product-market fit table and the priority table into one.

We have three options for each box:
- Deprecate: stop supporting
- Maintain: fix bugs but don't introduce new features
- Grow: fix bugs, do marketing and make PostHog easier to get started with but don't build new features.
- Build: all of the above + building new features specifically for these categories

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
        <td>Engineers</td>
        <td style="background:var(--muted)" rowspan="3">Maintain</td>
        <td style="background:var(--success)">Build</td>
        <td style="background:var(--success)">Build</td>
        <td style="background:var(--success)">Build</td>
    </tr>
    <tr>
        <td>Non-technical roles</td>
        <td style="background:var(--muted)">Maintain</td>
        <td style="background:var(--muted)">Maintain</td>
        <td style="background:var(--muted)">Maintain</td>
    </tr>
    <tr>
        <td>Analysts</td>
        <td style="background:var(--muted)">Maintain</td>
        <td style="background:var(--success)">Build</td>
        <td style="background:var(--success)">Build</td>
    </tr>
    <tr>
        <td>Enterprise procurement</td>
        <td style="background:var(--muted)" colspan="3">N/A</td>
        <td style="background:var(--success)">Build</td>
    </tr>
</table>
</span>


## Comparing features

If you're trying to decide between two things to work on, a useful exercise can be the following:

1. Estimate the number of successful products that could come out of each category globally (example numbers given)
2. Estimate the amount of revenue we could grab from those categories (example numbers given)
3. Estimate how many of the successful products we could create if we had this feature
4. Estimate how much revenue we could get if we had this feature
5. Repeat steps 1-4 for the feature you're trying to compare

For example, for our virtual private cloud feature we came up with the following numbers:

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
        <td>Global successful products</td>
        <td>10m</td>
        <td>1m</td>
        <td>10k</td>
        <td>10k</td>
    </tr>
    <tr>
        <td>Global revenue</td>
        <td>$0</td>
        <td>$240m</td>
        <td>$500m</td>
        <td>$4B</td>
    </tr>
    <tr>
        <td>Additional successful products from feature</td>
        <td>0%</td>
        <td>5%</td>
        <td>5%</td>
        <td>10%</td>
        <th>51.5k</th>
    </tr>
    <tr>
        <td>Additional revenue from feature</td>
        <td>0%</td>
        <td>15%</td>
        <td>15%</td>
        <td>30%</td>
        <th>$1,311m</th>
    </tr>
</table>
</span>

The point of this exercise is not to come up with the 'correct' numbers. The point is to go through a thought exercise that'll help you figure out the impact of what you're working on.

The idea also isn't that you should do this for every feature you build. Instead, you'll now have a framework for how to think about the impact of what you're building.
