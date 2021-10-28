---
title: Coding conventions
sidebar: Docs
---

In this page you can find a collection of guidelines, style suggestions, and tips for making contributions to the codebase.

### Logging
As a general rule, we should have logs for every expected and unexpected actions of the application, using the appropriate _log level_.

#### Levels
A _log level_ or _log severity_ is a piece of information telling how important a given log message is:

* `DEBUG`: should be used for information that may be needed for diagnosing issues and troubleshooting or when running application
in the test environment for the purpose of making sure everything is running correctly
* `INFO`: should be used as standard log level, indicating that something happened
* `WARN`: should be used when something unexpected happened but the code can continue the work
* `ERROR`: should be used when the application hits an issue preventing one or more functionalities from properly functioning

#### Format
`django-structlog` is the default logging library we use (see [docs](https://django-structlog.readthedocs.io/en/latest/)).
It's a _structured logging_ framework that adds cohesive metadata on each logs that makes it easier to track events or incidents.

Structured logging means that you don’t write hard-to-parse and hard-to-keep-consistent prose in your logs
but that you log events that happen in a context instead.

```python
import structlog
logger = structlog.get_logger(__name__)
logger.debug("event_sent_to_kafka", event_uuid=str(event_uuid), kafka_topic=topic)
```
will produce:
```console
2021-10-28T13:46:40.099007Z [debug] event_sent_to_kafka [posthog.api.capture] event_uuid=017cc727-1662-0000-630c-d35f6a29bae3 kafka_topic=default
```
As you can see above, the log contains all the informations needed to understand the app behaviour.

#### Security
Don’t log sensitive information. Make sure you never log:

* authorization tokens
* passwords
* financial data
* health data
* PII (Personal Identifiable Information)

### Testing
* All new packages and most new significant functionality should come with unit tests
* significant features should come with integration and/or end-to-end tests

#### Unit tests
A good unit test should:
* focus on a single use-case at a time
* have a minimal set of assertion per test
* demonstrate every use case. The thumb rule is: if it can happen, it should be covered

#### Integration tests
Integration tests should ensure that the feature works end-to-end. They must cover all the important use cases of the feature.
