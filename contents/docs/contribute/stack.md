---
title: Tech Stack
sidebar: Docs
showTitle: true
---

> **Note:** This page refers to our [main product repo](https://github.com/PostHog/posthog), not our website. 

### Frontend

- Web Framework/Library: [React](https://reactjs.org/)
- State Management: [Redux](https://redux.js.org/) + [Kea](https://github.com/keajs/kea)
- Layout/Components: [Ant Design](https://ant.design/)

### Backend

- Framework: [Django](https://www.djangoproject.com/)
- Databases: [PostgreSQL](https://www.postgresql.org/) and [ClickHouse](https://clickhouse.tech/)
- Task Queue/Event Streaming: [Redis](https://redis.io/) and [Apache Kafka](https://kafka.apache.org/)
- Task Worker: [Celery](https://docs.celeryproject.org/)

### Testing

- Frontend E2E Tests: [Cypress](https://www.cypress.io/)
- Backend Tests: [Pytest](https://docs.pytest.org/en/stable/getting-started.html) and [Django's built-in test suite](https://docs.djangoproject.com/en/3.1/topics/testing/)

### Additional Tools

- Application Monitoring: [Sentry](https://sentry.io/welcome/)
- CI/CD: [GitHub Actions](https://github.com/features/actions)
- Containerization: [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- Linter (Frontend): [ESLint](https://eslint.org/)
- Formatter (Backend): [Black](https://pypi.org/project/black/)

