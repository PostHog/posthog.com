---
date: "2022-03-22"
title: "Improving PostHog deployments"
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ../images/blog/launch-week-teaser.jpeg # TODO
featuredImageType: full
categories: ["Engineering", "Product updates", "Launch week"]
author: ["harry-waye", "guido-iaquinti"]
---

When PostHog was born in 2020, it was a simple Python application (Django + Celery) backed by a PostgreSQL datastore. Troubleshooting was easy, while the low barrier of entry meant fast adoption and more feedback on where to take the product.

TODO: <insert diagram of event data flow from [here](https://www.google.com/url?q=https://posthog.com/handbook/engineering/databases/event-ingestion&sa=D&source=docs&ust=1647446368828545&usg=AOvVaw31KohI1YJiLlpt2SX8wP8P)>

This was great at the start, but it couldn't last. More customers meant more data to ingest and analyze. Our ingestion couldn’t keep up with the volumes of events we were receiving, and our event queries using PostgreSQL were slow. If we wanted PostHog to scale, we had to revisit our stack:

TODO: <insert slowly moving hedgehog image>

Introducing Kafka helped us to decouple our data streams and our processing pipeline, while [ClickHouse helped us to deliver very fast queries](/blog/clickhouse-announcement) on a large volume of data and more horizontal scaling capabilities. These additions helped us scale, but they came at a cost: complexity.

Here's a quick breakdown:

* We now have additional distributed services like Kafka, ClickHouse and Zookeeper to deploy and manage.

* Each additional dependency requires considerations in terms of monitoring, migrations, upgrades, durability among others.

* ClickHouse is powerful but relatively new compared to PostgreSQL, very few people know or have experience with managing a ClickHouse cluster.

* ClickHouse is a relatively new product. Whereas tooling around PostgreSQL is very mature, we need to do some of the heavy lifting ourselves with ClickHouse.

* Simple operations such as application deployments or database upgrades have become complex automations

To address this complexity and make PostHog easier to deploy, maintain and use for anyone, we gave ourselves two goals:

1. Improve our test framework
2. Improve built-in monitoring

This post is all about how we approached these goals, and our long-term roadmap for improving PostHog deployments.

To self-host PostHog, it is still possible to use docker-compose for the evaluation stage, but what about the move into production? We currently offer an abstraction system built on top of the [Kubernetes](https://kubernetes.io/) platform via [Helm](https://helm.sh/). We’ve built on top of Kubernetes because although for many scenarios it is overkill, it allows us to focus on one abstraction but target any cloud provider that has a Kubernetes offerings. Currently we support AWS, Azure (alpha), Digital Ocean and Google Cloud Platform.


## Goal 1: Improve test framework

In order to give us confidence that every self-hosted installation is reliable and we iterate fast, we needed to significantly improve our testing frameworks.
Kubernetes resources are usually represented as YAML objects, while Helm helps us to define, install, upgrade and package them via a template engine.

In order to make sure those resources are defined, installed and upgrade correctly across different cloud platforms, Kubernetes versions and deployment scenarios, we’ve introduced several layers of testing, each of which with a specific goal:

* lint tests (via Helm lint): to verify if the Helm templates can be rendered without errors
* unit tests (via [`quintush/helm-unittest`](https://github.com/quintush/helm-unittest)): to verify if the rendered Helm templates are behaving as we expect

* integration tests:

    * [`kubetest`](https://github.com/vapor-ware/kubetest): to verify if applying the rendered Helm templates against a Kubernetes target cluster gives us the stack we expect (example: are the disks encrypted? Can this pod communicate with this service?)

    * [`k6`](https://k6.io/): HTTP test used to verify the reliability, performance and compliance of the PostHog installation (example: is the PostHog ingestion working correctly?)

    * `e2e - k3s`: to verify Helm install/upgrade commands on a local k3s cluster

    * `e2e - Amazon Web Services`, `e2e - DigitalOcean`, `e2e - Google Cloud Platform`: to verify Helm install command on the officially supported cloud platforms

Thanks to those layers, we can now detect scenarios like:

* template is invalid

* template is valid, but it didn’t get rendered as we expect

* template is valid and got rendered as we expect but doesn’t work on a specific Kubernetes version

* template is valid and got rendered as we expect, works on all supported Kubernetes version, but it doesn’t work on a specific implementation of a cloud provider

TODO: <insert cherry-picks of non-trivial CI failures>

Those tests are helping us to identify and fix several bugs in our implementation, catching regressions before code gets released and enabling us to iterate faster than ever.

For more information about the technical implementation, take a look [here](https://github.com/PostHog/charts-clickhouse#testing).


## Goal 2: Improve built-in monitoring

When you can successfully deploy a stack you are only half way in the journey. Making sure your stack is properly monitored is key in order to run and maintain a successful installation.

To simplify this task for our self-hosting users, in the last couple of months we’ve improved the built-in monitoring we provide as part of PostHog by leveraging best in class open source components like Grafana, Prometheus and various service exporters.

We create new templated dashboards, when we identify better metrics to monitor and techniques to debug an installation and make them available to everyone in the next release.

Thanks to this work, you can now get critical  insights about the majority of PostHog services by simply enabling the monitoring features in the Helm chart (see our [docs](https://posthog.com/docs/self-host/deploy/configuration) for more info).


## What’s next?

Improving deployments for PostHog Cloud and our self-hosting customers is an effort we will keep investing in. Here's a sneak peak at some of the projects in our roadmap:

- keep improving our chart to align to Kubernetes best practices

- add support for more cloud platforms

- enhance our observability stack by integrating [OpenTelemetry](https://opentelemetry.io/) across all our components and systems

> Interested on chatting about those topics? Send us an email: [engineering@posthog.com](mailto:engineering@posthog.com)_ # TODO: verify this is a valid email or [join our community Slack](/slack).
