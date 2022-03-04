---
title: How-to build a ClickHouse container image for ARM64
sidebar: Handbook
showTitle: true
---

The majority of the PostHog development team use the new Apple MacBook laptops with M1/ARM64. As an official image for this architecture doesn't exist yet (see [#22222](https://github.com/ClickHouse/ClickHouse/issues/22222)) we need to build it ourself. Please use this image only for local development.

> Note: If you are not @harry or @guido you'll likely not need to build the image as the infrastructure team is responsible to take care of it and push the image to to DockerHub (so that you can directly pull it and use it).

### Build
1. checkout the ClickHouse repo: `git clone git@github.com:ClickHouse/ClickHouse.git`
1.  ```shell
    cd ClickHouse/docker/server

    CLICKHOUSE_VERSION="21.11.11.1"
    docker build . \
        --network host \
        --build-arg single_binary_location_url="https://builds.clickhouse.com/master/aarch64/clickhouse" \
        --build-arg version="$CLICKHOUSE_VERSION" \
        -t "posthog/clickhouse:$CLICKHOUSE_VERSION"
    ```

### Publish
Once the build process is completed, please spin up the stack locally and run the test suite. After you've verified all the tests are passing, you can push the image to our DockerHub repo [posthog/clickhouse](https://hub.docker.com/repository/docker/posthog/clickhouse) by running:
```shell
CLICKHOUSE_VERSION="21.11.11.1"
docker image push "posthog/clickhouse:$CLICKHOUSE_VERSION"
```
