---
title: Small teams
sidebar: Handbook
showTitle: true
hideAnchor: false
---

PostHog is structured for speed, autonomy and innovation.

Many traditional organizations have big, separate functions. You have a product team, an engineering team, customer support, and so on. This slows things down when you scale because there are more layers of communication and complex approval chains. This stifles innovation because you have to get your boss to talk to someone else's boss to get work done. It also means that people can't really see the impact of their work.

PostHog started off as a completely flat company with one big goal: to increase the number of successful products in the world.

As we are getting bigger, we anticipate that it will get harder for people to see the direct impact of their work, which reduces the sense of ownership.

We have therefore introduced small teams. These are designed to each operate like a startup. We maintain our full org chart <PrivateLink url="https://ops.posthog.dev/org-chart">in our ops platform</PrivateLink>.

## How it works

-   The overall goal for a small team is to own an area of the product/company and be as close to its own startup as possible, with only a handful of centralized processes.
-   A small team should _strictly_ be between 2-6 people.
-   A small team has a team lead responsible for its performance - whoever is most appropriate depending on what the team is working on. This does _not_ mean the most experienced person on the team.
-   A small team must have a customer (internal or external).
-   There may be certain functions where at our current stage we don't need a small team yet.
-   Each small team runs its own retrospective + sprint every week. This must be done transparently.
-   A small team has the final call in which of its features get into production, with no need for external QA/control - within our existing release schedule.
-   A small team will, at some stage, be able to create its own pricing.
-   A small team is responsible for talking to users, documenting what they build, and ensuring their features are highlighted in releases.

## What does owning an area of the product mean?

The product small team is responsible for everything related to their area, particularly:

1. Usage
2. Quality
3. Revenue

## What actions should the small teams be doing for their area?

Each quarter:

1. Create good quarterly goals

During the quarter:

1. Maintain a prioritized roadmap to help them achieve their objectives
2. Speak to customers
3. Monitor relevant metrics including those covering Usage, Quality and Revenue
4. Triage and fix related bugs
5. Assist the support hero in answering related questions
6. Collaborate with other small teams such as marketing
7. Become power users of their area of PostHog and use PostHog in their processes

## What is the role of the team lead?

Overall, the team lead is responsible for ensuring the above happens. They should focus on enabling the team to solve these tasks together rather than trying to do it all themselves.

Team leads do not necessarily = managers. Read more about [how we think about management](/handbook/company/management).

Once a new team lead is appointed, or a small team is created, team leaders take on additional responsibilities that are defined in [the new small team template within the new org change issue](https://github.com/PostHog/company-internal/issues), along with a checklist of actions. The dropdown of actions appears when you create a new issue and select the "org change" template and you simply delete the non-relevant sections of the checklist.

Team leads also take on a range of broader responsibilities that revolve around releasing new features and communicating with other teams. Some helpful guidelines on what team leads should be taking responsibility for are listed below.

### Setting up support processes

Setting up support processes is a team lead responsibility, but if you need any assistance just contact the Support team directly.

Team leads are responsible for creating Slack channels for their support function and ensuring integration with Zendesk, so that the team can be alerted to support issues. Once the support process is set up, team leads are responsible for ensuring a sustainable and fair support rotation and setting up SLA and support hero notifications.

Further details on how to do this are available in [the new org change template](https://github.com/PostHog/company-internal/blob/master/.github/ISSUE_TEMPLATE/org-change.yml).

### Launching new products and features

It's the responsibility of the team lead to keep Marketing and Billing teams informed about product progress, so that product marketers can coordinate launches and the Billing team can implement pricing.

For a complete walkthrough of the product lifecycle (from initial setup through GA), see [releasing new products and features](/handbook/product/releasing-new-products-and-features) and use [the new product RFC template](https://github.com/PostHog/requests-for-comments/blob/main/.github/ISSUE_TEMPLATE/new-product.md).

Some guidelines on how to do this are below, but if in doubt team leads should always aim to overcommunicate with Marketing and Billing teams.

### Adding ideas to the roadmap

-   [ ] As soon as you start seriously planning a new product, add it to [the in-app feature preview roadmap](https://posthog.com/docs/feature-flags/early-access-feature-management) as a `concept`.
-   [ ] Inform the marketing teams a new roadmap item is available via the #team-marketing channel

### Launching a new beta

-   [ ] As soon as user opt-in is available, move your roadmap item from `concept` to `beta`
-   [ ] Ensure your opt-in beta has a feedback link and docs link
-   [ ] Inform the marketing teams a new beta is available via the #team-marketing channel

### Launching a new product

**Typically, you must give at least 2-3 weeks notice of a product launch and you should reach out directly to marketing team leads if this is not possible.**

-   [ ] [Create a new launch plan issue](https://github.com/PostHog/meta/issues/new?template=launch-plan-.md)
-   [ ] Continue to communicate timelines / updates in the Slack channel created

## How do small teams and product managers work together?

With our engineering-led culture, the engineers on the small team are normally responsible for their area of the product.

We have a small number of product managers who support the product small teams in achieving their goals. This includes helping with prioritization, creating/updating dashboards, competitors analysis, speaking to customers etc. However, having product managers doesn't mean that the engineers can abdicate these responsibilities. The engineers should be the experts of the product they are building and their customers.

Additionally, the product managers should pay particular attention to cross-team alignment.

## How do small teams and designers work together?

Similar to product, designers support small teams. [Read our guide](/handbook/engineering/product-design) for engineers on how to work with design.

## Managing larger cross-team projects

Each project should be owned by an individual within a single small team. However, some projects affect multiple other teams and require their support. For example, the performance work owned by Karl in product analytics requires support from the pipeline and infrastructure team.

For these projects, we recommend the individual owning it write a "Status update" every 2 weeks on slack and add a link to this update in the "Updates on bigger projects that affect multiple teams" section of the all hands doc. These status updates might include: what's been done since the last update, any blockers, and what are the next steps.

## Small teams intros

Every small team should have an agreed charter which should include:

-   Mission
-   Long term goals
-   Description of what the team does
-   Target customer
-   Who is on the team
-   Key metrics

These should all be visible in the Handbook, updated when changes are made & confirmed ahead of each quarter so everyone is on the same page.

## List of small teams

See the [list of all small teams](/small-teams).

## Forming new small teams

We have a defined [process for proposing changes to teams](/handbook/company/team-changes), or creating a new team.

Once a decision is made, the following happens:

-   [ ] Ops team updates the [Org Chart](https://app.deel.com/organization-chart/organization/834ac289-7c04-4d93-91f0-8922c5664b77?groupBy=group-by-report) in Deel.
-   [ ] Ops creates an issue with [the new org change template](https://github.com/PostHog/company-internal/blob/master/.github/ISSUE_TEMPLATE/org-change.yml) and assigns the team lead
-   [ ] Exec informs everyone else in the company in the next all hands session.

The small teams template contains a list of tasks for the Ops team and the team lead. 

These include standard tasks, such as creating Slack groups and a team page to ensure the team can communicate efficiently.

## FAQ

### Who do small teams report to? How does this work with management?

The team lead has the final say in a given small team's decision-making - they decide what to build / work on.

Each person's line manager is their role's functional leader (if possible). For example, engineers, no matter which small team they're in, will report to an engineer. 

It's important to note that [management at PostHog](/handbook/company/management) is very minimalistic – it's critical that managers don't set tasks for those in small teams.

Think of the small team as the company you work for, and your line manager as your coach.

### Can someone be in multiple small teams?

Only if they're in some kind of supportive role. For example, product managers and designers can be attached to more than one team, but product engineers should never be in more than one team because this acts against proper ownership.

### Who is in a small team?

No more than 6 people, but that's the only rule. It could be any group of people working together.

### Will this lead to inconsistent design?

Eventually, yes. Other companies have a UX team that build components for everyone to use. Since we currently use [Ant Design](https://ant.design/), we don't need this just yet.

### Can I still [step on toes](/handbook/company/values)?

Yes. In fact, it's actively encouraged. 

We still expect people to have an understanding of the entire company and what various people are working on. In engineering, we still expect you to understand how the entire system works, even if you're only working on infrastructure. You can only do your job well if you understand how it fits in with other parts of the system.

You're actively encouraged to raise pull requests or propose changes to stuff that doesn't have anything to do with your small team.

### Can people change teams?

We try to keep moves infrequent and when needed. We anticipate moving people roughly every 3-9 months. We'd rather hire new people than create gaps by shifting people around.

There are two scenarios that will trigger a move:

-   The small team may realize they no longer need someone, or that they could really do with someone currently in another small team internally.
-   An individual team member may wish to move in order to develop their skills or experience.

It is **very important** to raise any desire for a team change with your relevant [teams/blitzscale](Blitzscale team) member early. Any changes are at their discretion, as their job is to ensure that our small teams continue to function and that any moves fit into our current hiring plans. They will also have the best context about which teams you may be a good fit for, based on your skillset but also each team's needs. Please don't go talking to other teams directly first, as it makes it harder to manage everyone's expectations. 

### Aren't most small teams way too small?

In general, no – it's surprisingly great how much just 2-6 people can get done.

If more mature product areas cannot cope with the workload, small teams will clarify where we need to hire too. In fact, it'll make sure we keep the scrappy fun side of working here as we get bigger. A team doesn't _have_ to be six people.

### How does hiring in the small team work?

The small team is responsible for creating roles for those that they need.

We have a centralized team that will then help you hire.

James and Tim used to interview every candidate because it's a standard startup failure for founders to get too removed from hiring. We've relaxed this so that someone Team Blitzscale always interviews candidates, normally whichever team member sponsors the team the candidate will be joining.

Regardless of the team, we aim to retain a high bar for new hires. In the words of James Greenhill: "If it's not a hell yes, it's a hell no." See [how we hire](/handbook/people/hiring-process) for more on this. 

### How do we create new teams, or make changes to existing teams?

See [how we make team changes](/handbook/company/team-changes) for a more detailed breakdown of the process.

### Does a small team have a budget?

Spend money when it makes sense to do so. See our [general policy on spending money](/handbook/people/spending-money).

### How do you keep the product together as a company?

James and Tim are ultimately responsible for us having (i) no gaps in product (ii) eliminating duplicate work (iii) making sure all small teams are working on something rational. This is how we manage the product.

### How do you stop duplicate work?

James and Tim have the ultimate responsibility to make sure we don't build the same thing in two different teams, or that we don't accidentally compete with each other internally.

By keeping communication asynchronous and transparent, this is made much easier to do than is typical at other organizations.

### Can a small team "own" another small team?

Not for now, no. Perhaps when we're much larger this is something to think about.
