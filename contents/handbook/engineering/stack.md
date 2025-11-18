---
title: Tech stack
sidebar: Docs
showTitle: true
---

> **Note:** This page refers to our [main product repository](https://github.com/PostHog/posthog), not our website. 

### Frontend

- Web framework/library: [React](https://reactjs.org/)
- State management: [Redux](https://redux.js.org/) + [Kea](https://github.com/keajs/kea)
- Layout/components: [Ant Design](https://ant.design/)

### Backend

- Framework: [Django](https://www.djangoproject.com/)
- High scale services: [Rust](https://www.rust-lang.org/)
- Databases: [PostgreSQL](https://www.postgresql.org/) and [ClickHouse](https://clickhouse.tech/)
- Task queue/event streaming: [Redis](https://redis.io/) and [Apache Kafka](https://kafka.apache.org/)
- Task Worker: [Celery](https://docs.celeryproject.org/), [Temporal](https://temporal.io/) and [Dagster](https://dagster.io/)

### Testing

- Frontend E2E tests: [Cypress](https://www.cypress.io/)
- Backend tests: [Pytest](https://docs.pytest.org/en/stable/getting-started.html) and [Django's built-in test suite](https://docs.djangoproject.com/en/3.1/topics/testing/)
### Additional tools

- CI/CD: [GitHub Actions](https://github.com/features/actions)
- Containerization: [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- Linter (frontend): [ESLint](https://eslint.org/)
- Formatter (backend): [Black](https://pypi.org/project/black/)


### Workflow orchestration

We used to use Celery as our task worker, but it has consistently proven to be unreliable at our scale. We have legacy jobs running on Celery, but new jobs should NOT use it, and teams should consider moving away from it for critical applications.

We use both **[Temporal](https://temporal.io/)** and **[Dagster](https://dagster.io/)** for different types of workflow orchestration, each chosen for their specific strengths.

#### When to use each tool

We tend to use **Dagster for internal jobs**, whereas **Temporal is used for user-facing jobs**. This is not a one-size-fits-all solution, and you can follow a different approach.

You can look at the problem from the requirements for your jobs:

1. **Is it mission-critical with complex failure scenarios?** → Temporal
2. **Do you need exactly-once guarantees?** → Temporal
3. **Do you need complex retry policies?** → Temporal
4. **Is it a long-running stateful workflow?** → Temporal
5. **Is it primarily about data transformation and dependencies?** → Dagster
6. **Do you need rich data lineage and testing?** → Dagster

#### Where do we use Temporal and Dagster?

These are examples of where we use Temporal and Dagster at PostHog. Hopefully, these can serve as anecdotal examples to help you pick between Temporal and Dagster for your application. This list is not exhaustive.

**Temporal**: Batch exports, data warehouse source syncing, AI platform task generation  
**Dagster**: Exchange rate tracking, one-off production management commands (better monitoring than Django's management commands), web analytics data pre-processing
