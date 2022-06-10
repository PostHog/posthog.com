---
title: Team Platform
sidebar: Handbook
showTitle: true
hideAnchor: true
---

## People

- James Greenhill (Team lead, Data/Infra Engineer)
- Tiina Turban (Full Stack Engineer)
- Yakko Majuri (Full Stack Engineer)
- Marcus Hyett (Product Manager)
- Guido Iaquinti (Site Reliability Engineer)

## Platform Sub-Team Mission Statements

- **Ingestion:** Provide the best events pipeline in the world.
- **Infrastructure:** Make deploying, scaling, and managing PostHog easy, fast, and reliable.

## Roadmap

### Ingestion

#### 3-year

- Ingest events out of order
- No events left behind (99.99%)
- All events are correct (99.99%)
- The pipeline scales perfectly linearly and intercept is low (smallest instance runs on $5 node)
- Events are ingested and visible in app within 5 seconds p99
- Integrated delightful app developer experience (inside PostHog)
    - CI/CD
    - Testing
    - Synthetic data testing
- Majority of users are using PostHog for their ETL / reverse-ETL workloads 

#### 6 months

- Scalable to 1Bn Persons 🎉
- Ingestion monitoring and management
    - Runbooks, dashboards, and alerts in Grafana on cloud and on self hosted
- Events are ingested and visible in app within 30 seconds p99
- Easy to build a well-tested app (DevEx)
    - Documentation
    - GitHub Template
        - Unit tests
        - Style

See the Ingestion roadmap on the dedicated [Ingestion Team page](/handbook/people/team-structure/ingestion).
### Infrastructure

#### 3-year

- All infrastructure is managed as code
- Cloud is global
- Best in class security and privacy compliance
- Scale beyond 1 Trillion events / month
- Support Non-Cube Deploys 🤖

#### 6 month

- No Heroku
- ClickHouse Upgraded
- Good logging and monitoring
- 5 Billion / month events
- SOC 2 Ready
- All infra is managed as code on prod / staging + EU Ready 🎈
  
## How we work?

### Guidelines

* We work as teams on one goal/project - not having a single person alone working on a goal
* The board should be our source of truth
* We document what we do to share context internally
* We finish what we start, or we don't start it at all
* We continually prioritize
* We prioritize unblocking others
* We have an agenda and follow up on actions from our meetings
* Be frugal

### Standups
We have a Platform wide standup every Monday, Wednesday, and Friday. Standups are an opportunity for us to discuss what we are working on, feedback, and topics we may want other people's opinions on. It is also an important forum to announce that you are blocked or ask for help. Everyone should try to make standups but feel free to drop off if what is being talked about isn't relevant or valuable to you.


### Engineering Planning
We plan our work using a two week sprint with sprint planning and retro meetings on the wednesday before the start of the next print. We primarily use the [Platform project board](https://github.com/orgs/PostHog/projects/10) to communicate what we are working on for the sprint, what is blocked, in review, done, and what we are planning on doing next.

### Sprint Planning
Sprint planning happens every other week the Wednesday before the start of the new sprint and is PostHog engineering wide. We first break out into breakout rooms for Infrastructure and Ingestion and in each we determine what the goals will be for the upcoming sprint. After that we join back into the engineering wide sprint planning we pitch the goals to the entire engineering team, looking for feedback. This is a great opportunity for other teams within the company to raise concerns about things they may be blocked on.

Sub-teams are fluid so members may change from sprint to sprint.

### Retro & Team Planning
After the Eng Sprint Planning meeting the Infrastructure and Ingestion teams will meet up to retro the previous sprint. This is also where we game plan the next sprint in terms of what tasks need to be done to accomplish to goals set in the Engineering Sprint Planning.

While planning we make sure that the teams that we have settled on for Ingestion and Infrastructure have more than one person working on a goal or project in the same timezone. We want to reduce the number of _lone wolfs_ and encourage people to work together and spread context. There are a few benefits to this including shared context, quicker PR approvals, easy rubber ducking, and more trust and camaraderie on the team. 🌞

### Project Boards
We use Github Project boards to organize what work needs to get done for a certain project. During a sprint we may not get an entire project done, but we should set our goals relative to milestones measurable in the project boards.

For example if there is a project that is to re-partition 100 tables, goals set for a sprint could look like:
- `Migrate 50 of the 100 tables`
- `Migration framework is production ready`
- `We have migrated 10% of customers with all 100 tables`

The projects can be viewed as epics if that is what you are used to.

### Team Kanban Board
We use a [Kanban](https://en.wikipedia.org/wiki/Kanban_(development)) style board for each team ([Infrastructure](https://github.com/orgs/PostHog/projects/27/views/1?layout=board) and [Ingestion](https://github.com/orgs/PostHog/projects/28/views/1?layout=board)) to show what we are working on, planning on working on, blocked on, what is in review, and what is done. This provides context on what the operational priorities are for the sprint and what work people can pick up if they have a few extra cycles or are looking for what the most impactful task is at any one moment for them and their sub-team. It's up to the sub-teams to decide what tasks are on deck for each sprint based on the goals that were set for the sprint. We try to keep this as up to date as possible and assign ourselves as owners so that there isn't duplicate work done on the same task and if there is a question about a task we know who to ask.

We also tag the tasks that we set aside for the sprint with the sprint number/name so that we can filter out what is on the board for a quick view of how we are making progress against the sprint goals.

The board also acts as a source of truth for other teams to have a quick check in on the progress of tasks for the sprint, especially if they will be the primary consumers of the product of the task. This works within the team as well.

## Slack channel

[#team-platform](https://posthog.slack.com/messages/team-platform)
