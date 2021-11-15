---
title: Using external providers 
sidebar: Docs
showTitle: true
---

## External providers

In order to reduce the overhead of managing stateful services like PostgreSQL, Kafka, Redis and ClickHouse by yourself, we suggest you to run them _outside_ Kubernetes and offload their provisioning, building and maintenance operations:

| Service  | Provider | Hosted alternative |
|----------|----------|--------------------|
| Postgres | AWS | [RDS](https://aws.amazon.com/rds/postgresql/)|
| Postgres | GCP | [Google Cloud SQL for PostgreSQL](https://cloud.google.com/sql/docs/postgres)|
| Postgres | Azure | [Azure PostgreSQL](https://azure.microsoft.com/en-us/services/postgresql/)|
| Postgres | DigitalOcean | [Managed Postgres](https://www.digitalocean.com/products/managed-databases-postgresql/)|
| Kafka | AWS | [AWS MSK](https://aws.amazon.com/msk/) |
| Kafka | Cloud Agnostic | [Confluent Cloud](https://www.confluent.io/confluent-cloud/)|
| Redis | AWS | [Elasticache Redis](https://aws.amazon.com/elasticache/redis/)|
| Redis | GCP | [Memorystore](https://cloud.google.com/memorystore)|
| Redis | Azure | [Azure Cache](https://azure.microsoft.com/en-us/services/cache/#:~:text=Azure%20Cache%20for%20Redis%20is,benefits%20of%20a%20managed%20service.)|
| Redis | DigitalOcean | [Managed Redis](https://www.digitalocean.com/products/managed-databases-redis/)|
| Redis | Cloud Agnostic | [Redis Enterprise Cloud](https://redis.com/redis-enterprise-cloud/overview/) |
| ClickHouse | Cloud Agnostic | [Altinity Cloud](https://altinity.com/cloud-database/) |

You can use our helm chart to provision these all on Kubernetes but having them live in a managed service will alleviate the overhead of managing those services yourself on Kubernetes. Managing these services on Kubernetes is generally painless, until you are scaling very rapidly or have extremely high throughput and IO.