---
date: 2022-08-05
title: Speeding up PostHog builds with Depot
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - kyle-galbraith
  - jacob-gillespie
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-engineering-blog.png
featuredImageType: full
category: Engineering
---

PostHog recently swapped out Docker for Depot in their container image builds within GitHub Actions. The results are outstanding, taking the average build time from 16 minutes to 3 minutes. Building the PostHog images via `depot build` instead of `docker build` is over five times faster, so PostHog invited us — the founders of Depot — to share more about how Depot works and will benefit the PostHog community.

## How does Depot work?

[Depot](https://depot.dev) is a managed container build service which runs both Intel and Arm builder machines so you can build native container images for both architectures. Each instance runs [BuildKit](https://github.com/moby/buildkit), the modern engine that backs `docker build` with four CPUs, 8GB of RAM, and a persistent 50GB NVMe cache disk. Depot fully manages the lifecycle of project builder instances; today, Depot launches builder machines in AWS and Fly.io.

The `depot build` CLI implements the same options as `docker build` for easy adoption. By offloading the build to a remote Depot builder, the build can make use of the centralized persistent cache, so build steps that are unchanged can be instantly reused. Remote builds also are not limited by local resource constraints like CPU, RAM, or network.

One of the most common use-cases for Depot is accelerating Docker image builds in CI providers like GitHub Actions. We often see a 2-3x speedup when using Depot, compared to the standard `docker/build-push-action` action.

Builds in GitHub Actions can be slow for a few primary reasons:

1. Not making use of the layer cache to skip unnecessary steps.
2. Using the layer cache requires saving and loading the cache before and after the build, which can be slow as cache sizes increase.
3. Resources like total cache size and available CPUs are constrained in the Actions environment.

Assuming that a build uses `cache-from` and `cache-to` to cache layers, the biggest bottlenecks afterwards are the last two reasons. Saving and loading the cache to tarballs is slow, and the time taken to restore the cache can often outweigh the potential speedups of having the cache at all. And GitHub Actions only provides two CPUs today for the build to use.

## Depot and PostHog

At Depot, we use PostHog to track our core product metrics; builds started and completed per week, build time in minutes, what versions of our `depot` CLI are running in the wild, etc. It's quite the universal tool, and we would recommend it to just about anyone.

We also maintain several [benchmarks of popular open-source projects](https://depot.dev/#benchmarks), including PostHog, to help us gauge the performance of Depot. The benchmarks compare the speed of container builds on GitHub Actions with and without Depot, for each new commit to the upstream project. We generally see a 2-3x speedup with Depot.

PostHog was one of the projects we [selected to benchmark](https://depot.dev/benchmark/posthog), and we observed average build times of only three minutes with Depot's remote builders. At the time, PostHog's own build workflows took around 16 minutes for the same build.

So, we reached out to Tim at PostHog to show him the benchmark results and suggest that we use Depot for PostHog. Tim suggested we open a pull request implementing the switch.

## Switching PostHog builds from Docker to Depot

We created a new PostHog Depot organization and opened a [pull request](https://github.com/PostHog/posthog/pull/10002) to begin building the PostHog Docker image with Depot. There's some interesting details in the pull request discussion, but the basic implementation was:

1. Install the Depot CLI with the [`depot/setup-action`](https://github.com/depot/setup-action).
2. Replace `docker/build-push-action` with [`depot/build-push-action`](https://github.com/depot/build-push-action), which implements the same inputs but uses `depot build` for the build:

   ```diff
   name: Build and push latest
   id: docker-latest
   -uses: docker/build-push-action@v2
   +uses: depot/build-push-action@v1
   with:
       context: .
       push: true
       tags: posthog/posthog:latest
   ```

At the time, we supported authentication via a personal access token, provided in a `DEPOT_TOKEN` environment variable. However we [discovered a workflow problem](https://github.com/PostHog/posthog/pull/10002#issuecomment-1138399413) that needed to be solved; workflows triggered by a `pull_request` event from a forked repository don't have access to repository secrets, as they are considered untrusted.

Initially we thought that we could use [GitHub's OIDC tokens](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect) instead. This would allow our `depot/build-push-action` to exchange a temporary token provided by GitHub for a temporary Depot token, and then use that token to authenticate with Depot. We implemented this authentication mechanism then discovered that, unfortunately, GitHub will not issue OIDC tokens for `pull_request` events from forked repositories (only pull requests from within the same repository).

In the end, we opted to use Depot for all builds for `push` events but continue using `docker` for `pull_request` events. This isn't the most performant option, but it appears to be what's possible today with GitHub's limitations.

However, we could still use OIDC token authentication for all the `push` builds and avoid the static `DEPOT_TOKEN` environment variable entirely. Securely authenticating the build request with an OIDC token required adding the repository as a trust relationship in the Depot project, then adjusting the workflow permissions to allow retrieving the token:

```diff
name: Docker FOSS release image
on:
    push:
        tags:
            - '*.**'

jobs:
    build-push:
        name: Build & push Docker release image
        runs-on: ubuntu-20.04
+       permissions:
+           contents: read
+           id-token: write
        steps:
            - ...
```

The `depot/build-push-action` action handles exchanging the temporary token provided by GitHub for a temporary Depot token and providing that token to the build.

## The results

Before switching to Depot, builds using `docker build` took over [16 minutes to complete](https://github.com/PostHog/posthog/runs/7139660078?check_suite_focus=true):

![GitHub Actions Docker Build](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/speeding-up-posthog-builds-with-depot/posthog-docker-build.png)

After switching to `depot build`, those same builds took only [three minutes on average](https://github.com/PostHog/posthog/runs/7545904011?check_suite_focus=true):

![GitHub Actions Depot Build](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/speeding-up-posthog-builds-with-depot/posthog-depot-build.png)

A 5x speed up with very little change to the existing workflow, just one line if we don't include the OIDC improvement.

The improvement here is deceptively huge. A 16-minute build that is run 20 times a day can account for over 5 hours of build time, slowing down progress. Faster builds mean less time waiting, fewer interruptions, and faster feedback and deploys. By switching to [Depot](https://depot.dev), PostHog can get more done, iterate faster and fix bugs without interruptions.

