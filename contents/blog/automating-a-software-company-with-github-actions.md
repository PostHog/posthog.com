---
date: 2022-07-05T00:00:00.000Z
title: Automating a software company with GitHub Actions
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - michael-matloka
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/simpler-self-deployments.png
featuredImageType: full
category: Engineering
tags:
  - Guides
---

When developing software, there's no shortage of work: building new features, fixing bugs, maintaining infrastructure, launching new systems, phasing deprecated solutions out, ensuring security, keeping track of dependencies… Whew. And that's before we get to product, people, or ops considerations.

Some of the above work requires a human brain constantly – software is all 1s and 0s, but in the end it serves human purposes. Without a massive breakthrough in artificial intelligence, figuring out features that compile AND suit human needs programmatically remains a pipe dream.

What about all the tedious tasks though? Running tests, publishing releases, deploying services, keeping the repository clean. Plain chores – boring and following the same pattern every time, but which are still are important.

We don't need intelligence (artificial or otherwise) for those tasks every single time. We just need it once to define the jobs to be done, and have those jobs run based on some triggers. Actually, let's take this further: any programming language you want, any supporting services you need, ready-made solutions up for grabs, and deep integration with the version control platform.

> _This article was originally published in August, 2021. It has been updated to reflect recent product changes_

## Actions 101

This is where GitHub Actions come in. With Actions, you can define per-repository **workflows** which run on robust **runner** virtual machines. They run every time a specific type of event happens – say, a push to `main`, push to a pull request, addition of an issue label, or manual workflow dispatch.

A workflow consists of any number of **jobs**, each job being a series of **steps** that run a shell script _or_ a standalone action. 

Standalone actions can be run directly if written in TypeScript, or with the overhead of a Docker container for ultimate flexibility, and a multitude of them is freely available on the [GitHub Marketplace](https://github.com/marketplace?type=actions).

This sounds pretty powerful already. But let's see where all this can take us in practice, with some
concrete examples right out of [PostHog GitHub](https://github.com/PostHog).

> Mind you, similar things can be achieved with competing solutions such as [GitLab CI/CD](https://docs.gitlab.com/ee/ci/) or even [Jenkins](https://www.jenkins.io). GitHub Actions do have a seriously robust ecosystem though, despite being a relative newcomer, and at PostHog we've been avid users of GitHub since its early ARPANET days.

### Unit testing

Unit tests are crucial for ensuring reliability of software - don't skip writing them, but also don't skip _running_ them. The best way to do that is to run them on each PR that is being worked on. That used to be called ["extreme programming"](https://en.wikipedia.org/wiki/Extreme_programming) back in the day, but today it's standard practice as a component of [continuous integration](https://en.wikipedia.org/wiki/Continuous_integration).

Below is a basic Django-oriented workflow that checks whether a database schema migration is missing and then runs tests.

> Note how by defining a **matrix** we make this happen for three specified Python versions in parallel! This way we guarantee support for a range of versions with a single line.

```YAML
on:
    - pull_request

jobs:
    django-tests:
        runs-on: ubuntu-latest
        strategy:
            fail-fast: false
            matrix:
                python-version: ['3.7.8', '3.8.5', '3.9.0']
        steps:
            - name: Check out the repository
            ses: actions/checkout@v2

            - name: Set up Python
              uses: actions/setup-python@v2
              with:
                  python-version: ${{ matrix.python-version }}

            - name: Install pip dependencies
              run: |
                  python -m pip install -r requirements-dev.txt
                  python -m pip install -r requirements.txt

            - name: Check if a migration is missing
              run: python manage.py makemigrations --check --dry-run

            - name: Run unit tests
              run: python manage.py test
```

### End-to-end testing

It's good to have each building block of your software covered with unit tests, but your users need the _whole_ assembled machine to work – that is what end-to-end tests are about.

We use [Cypress](https://www.cypress.io/) to run these on our web app, and while not perfect, [it's been a boon for us](/blog/cypress-end-to-end-tests). Here's the essence of our Cypress CI workflow:

```YAML
on:
    - pull_request

jobs:
    e2e-tests:
        runs-on: ubuntu-latest
        steps:
          - name: Check out the repository
            uses: actions/checkout@v2

          - name: Setup Node.js
            uses: actions/setup-node@v2
            with:
                node-version: 14

          - name: Install dependencies
            run: yarn

          - name: Build and start application
            run: echo "This is where you boot your application for testing"

          - name: Run end-to-end Cypress tests
            uses: cypress-io/github-action@v2

          - name: Archive test screenshots
            if: failure()
            uses: actions/upload-artifact@v2
            with:
                name: screenshots
                path: cypress/screenshots
```

I've skipped app-specific setup steps and services, but there are a couple of interesting things in this:

1. The workflow is made so simple by Cypress's ready-made suite runner action – [`cypress-io/github-action`](https://github.com/marketplace/actions/cypress-io). It smartly takes care of the task including test parallelization and integration with the [Cypress Dashboard](https://www.cypress.io/dashboard) - much better than shell scripts.

2. GitHub Actions have a feature called "artifacts". It's storage provided by GitHub that temporarily stores files resulting from job runs and allows downloading these files. In this case it's screenshots from failed tests that [`actions/upload-artifact`](https://github.com/marketplace/actions/upload-a-build-artifact) uploads for us to view.

### Linting and formatting

Functionality tests verify that things _work_ as expected. It's great to have code that works, but having code that's _written well_ is even greater, otherwise development gets harder and harder over time.

To ensure that we don't add _overly_ messy spaghetti with every new feature, we use:
- linters, for making sure that best practices are used in the code and nothing funky is slipping through

- formatters, for standardizing the look of our code and making it readable.

As with tests, it's great to run this on every PR to keep the quality of code landing in `master` high.

```YAML
on:
    - pull_request

jobs:
    code-quality:
        runs-on: ubuntu-latest
        steps:
            - name: Check out the repository 
              uses: actions/checkout@v2

            - name: Set up Node
              uses: actions/setup-node@v1
              with:
                  node-version: 14

            - name: Install package.json dependencies with Yarn
              run: yarn

            - name: Check formatting with prettier
              run: yarn prettier .

            - name: Lint with ESLint
              run: yarn eslint .
```

> One thing we've not covered yet is what running jobs on every PR gives us in practice.
> It's two things:
> 1. Such jobs become **PR checks**, and they are shown on the PR's page, along with their statuses.
>   ![Bump labels](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/github-actions/pr.png)
> 2. Select PR checks can be made required, in which case merging is prevented until all required checks turn green.

### Keeping stale PRs in check

As our team has grown, so has the number of PRs open across repositories. Especially with our [pull requests over issues](https://posthog.com/handbook/company/values#step-on-toes) approach, some PRs are left lingering for a bit – maybe because the work is blocked by something else, awaiting review, deprioritized, or only a proof-of-concept. 

In any case, the longer a PR sits unattended, the harder it is to come back to, and it just causes more confusion later on.

To minimize that, we've added a very simple workflow to scan PRs for inactivity:

```YAML
name: 'Handle stale PRs'
on:
    schedule:
        - cron: '30 7 * * 1-5'

jobs:
    stale:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/stale@v4
              with:
                  only: pulls
                  stale-pr-message: "This PR hasn't seen activity in a week! Should it be merged, closed, or worked on further? If you want to keep it open, post a comment or remove the `stale` label – otherwise this will be closed in another week."
                  close-pr-message: 'This PR was closed due to 2 weeks of inactivity. Feel free to reopen it if still relevant.'
                  days-before-pr-stale: 7
                  days-before-pr-close: 7
                  stale-issue-label: stale
                  stale-pr-label: stale
```

It looks trivial – it's just one step – but that's because all the heavy lifting is done by the official
[`actions/stale`](https://github.com/marketplace/actions/close-stale-issues) action.

Curiously, while the action can handle stale issues in an analogous way, we've found it to be awfully more noisy than valuable, so we recommend against that. If an old issue is not on our radar at the moment, a bot alert won't make it relevant.

> Wondering what all those `@v1`, `@v2`, `@v4` mean?
>  
> This is simply pinning against Git tags. Because ready-made actions are just GitHub repositories, they are specified the same way as repositories in all other contexts – you can specify a revision (commit hash, branch name, Git tag…) - otherwise the latest revision of the default branch is used.
>  
> Tags are particularly nice, because they are created when publishing a release using GitHub's UI.

### Deploying continuously

We use [continuous deployment](https://www.atlassian.com/continuous-delivery/continuous-deployment) for PostHog Cloud and we've been very happy with the results – our Amazon ECS-based stack is deployed automatically on each push to `master` (in most cases: a PR being merged) and it's made our developer lives so much easier.

The human element is removed from deployment. You can simply be sure that within 20 minutes of merging,
your code be live, every time.

```YAML
on:
    push:
        branches:
            - master

jobs:
    build-and-deploy-production:
        runs-on: ubuntu-latest
        steps:
            - name: Configure AWS credentials
              uses: aws-actions/configure-aws-credentials@v1
              with:
                  aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
                  aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
                  aws-region: us-east-1

            - name: Log into Amazon ECR
              id: login-ecr
              uses: aws-actions/amazon-ecr-login@v1

            - name: Fetch posthog-cloud
              run: |
                  curl -L https://github.com/posthog/posthog-cloud/tarball/master | tar --strip-components=1 -xz --
                  mkdir deploy/

            - name: Check out main repository
              uses: actions/checkout@v2
              with:
                  path: 'deploy/'

            - name: Build, tag, and push image to Amazon ECR
              id: build-image
              env:
                  ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
                  ECR_REPOSITORY: posthog-production
                  IMAGE_TAG: ${{ github.sha }}
              run: |
                  docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG -f prod.web.Dockerfile .
                  docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
                  echo "::set-output name=image::$ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG"

            - name: Fill in the new app image ID in the Amazon ECS task definition
              id: task-def-app
              uses: aws-actions/amazon-ecs-render-task-definition@v1
              with:
                  task-definition: deploy/task-definition.migration.json
                  container-name: production
                  image: ${{ steps.build-image.outputs.image }}

            - name: Fill in the new migration image ID in the Amazon ECS task definition
              id: task-def-migration
              uses: aws-actions/amazon-ecs-render-task-definition@v1
              with:
                  task-definition: deploy/task-definition.migration.json
                  container-name: production-migration
                  image: ${{ steps.build-image.outputs.image }}

            - name: Perform migrations
              run: |
                  aws ecs register-task-definition --cli-input-json file://$TASK_DEFINITION
                  aws ecs run-task --cluster production-cluster --count 1 --launch-type FARGATE --task-definition production-migration
              env:
                  AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
                  AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
                  AWS_DEFAULT_REGION: 'us-east-1'
                  TASK_DEFINITION: ${{ steps.task-def-migrate.outputs.task-definition }}

            - name: Deploy Amazon ECS web task definition
              uses: aws-actions/amazon-ecs-deploy-task-definition@v1
              with:
                  task-definition: ${{ steps.task-def-web.outputs.task-definition }}
                  service: production
                  cluster: production-cluster
```

Every containerized app is structured in its way, so this workflow won't do without your own adjustments,
but it should give you the right idea.

### Verifying build

Docker is now a standard way of building deployment-ready software images. We use it too, quite happily. But we've broken the build a few times - make a mistake somewhere and the image may fail to build. So we've taken to testing image building _ahead_ of time – before `master` is broken – on every PR.

We also _lint_ the Docker files using [`hadolint`](https://github.com/hadolint/hadolint), which has given us really useful tips for maximum reliability of our Docker-based build process.

```YAML
name: Docker

on:
    - pull_request

jobs:
    test-image-build:
        runs-on: ubuntu-latest
        steps:
            - name: Check out the repository
              uses: actions/checkout@v2

            - name: Lint Dockerfiles with Hadolint
              run: |
                  # Install latest Hadolint binary from GitHub (not available via apt)
                  HADOLINT_LATEST_TAG=$( \
                    curl --silent "https://api.github.com/repos/hadolint/hadolint/releases/latest" | jq -r .tag_name \
                  )
                  sudo curl -sLo /usr/bin/hadolint \
                    "https://github.com/hadolint/hadolint/releases/download/$HADOLINT_LATEST_TAG/hadolint-Linux-x86_64"
                  sudo chmod +x /usr/bin/hadolint
                  hadolint **Dockerfile

            - name: Set up QEMU
              uses: docker/setup-qemu-action@v1

            - name: Set up Docker Buildx
              uses: docker/setup-buildx-action@v1

            - name: Build image
              id: docker_build
              uses: docker/build-push-action@v2
              with:
                  push: false

            - name: Echo image digest
              run: echo ${{ steps.docker_build.outputs.digest }}
```

Hint: Since Docker Hub has [removed free autobuilds](https://www.docker.com/blog/changes-to-docker-hub-autobuilds/), but GitHub Actions are still free for public repositories (and with limits for private ones), you can build Docker images and then push them to Docker Hub very similar to the above workflow. Just add the login action [`docker/login-action`](https://github.com/marketplace/actions/docker-login) at the beginning, set `push` to `true`, _et voila_, now you are pushing.

### Putting releases out

Something particularly tedious we eliminated is incrementing package versions. Alright, not really – but the days of having to open `package.json`, edit, commit, push, build, publish, and tag are over.

What gives? Well, these days the only thing an engineer has to do is give their PR the right label:

![Bump labels](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/github-actions/bump-labels.png)

Right after that PR gets merged, the package version gets incremented in `master`:

```YAML
name: Autobump

on:
    pull_request:
        types: [closed]

jobs:
    label-version-bump:
        runs-on: ubuntu-latest
        if: |
            github.event.pull_request.merged
            && (
                contains(github.event.pull_request.labels.*.name, 'bump patch')
                || contains(github.event.pull_request.labels.*.name, 'bump minor')
                || contains(github.event.pull_request.labels.*.name, 'bump major')
            )
        steps:
            - name: Check out the repository
              uses: actions/checkout@v2
              with:
                  ref: ${{ github.event.pull_request.base.ref }}

            - name: Detect version bump type
              id: bump-type
              run: |
                  BUMP_TYPE=null
                  if [[ $BUMP_PATCH_PRESENT == 'true' ]]; then
                      BUMP_TYPE=patch
                  fi
                  if [[ $BUMP_MINOR_PRESENT == 'true' ]]; then
                      BUMP_TYPE=minor
                  fi
                  if [[ $BUMP_MAJOR_PRESENT == 'true' ]]; then
                      BUMP_TYPE=major
                  fi
                  echo "::set-output name=bump-type::$BUMP_TYPE"
              env:
                  BUMP_PATCH_PRESENT: ${{ contains(github.event.pull_request.labels.*.name, 'bump patch') }}
                  BUMP_MINOR_PRESENT: ${{ contains(github.event.pull_request.labels.*.name, 'bump minor') }}
                  BUMP_MAJOR_PRESENT: ${{ contains(github.event.pull_request.labels.*.name, 'bump major') }}

            - name: Determine new version
              id: new-version
              if: steps.bump-type.outputs.bump-type != 'null'
              run: |
                  OLD_VERSION=$(jq ".version" package.json -r)
                  NEW_VERSION=$(npx semver $OLD_VERSION -i ${{ steps.bump-type.outputs.bump-type }})
                  echo "::set-output name=new-version::$NEW_VERSION"

            - name: Update version in package.json
              if: steps.bump-type.outputs.bump-type != 'null'
              run: |
                  mv package.json package.old.json
                  jq --indent 4 '.version = "${{ steps.new-version.outputs.new-version }}"' package.old.json > package.json
                  rm package.old.json

            - name: Commit bump
              if: steps.bump-type.outputs.bump-type != 'null'
              uses: EndBug/add-and-commit@v7
              with:
                  branch: ${{ github.event.pull_request.base.ref }}
                  message: 'Bump version to ${{ steps.new-version.outputs.new-version }}'
```

Here's what this looks like in GitHub's workflow visualization feature:

![Visualization 1. Autobump](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/github-actions/1-autobump.png)

But this is just the starting point, because on every commit to `master` we check whether the version has been incremented - and if it has, all the aforementioned release tasks run automatically.

In fact, there are too many steps to show them all in this post – but I encourage you to take a look at real-world YAML that we use in our JS library's repo: [`cd.yaml`](https://github.com/PostHog/posthog-js/blob/master/.github/workflows/cd.yml). In it, we also use our own GitHub Action (free on the Actions Marketplace) which compares package version between the repository contents and npm: [PostHog/check-package-version](https://github.com/PostHog/check-package-version).

GitHub can also _visualize_ workflows – extremely boring if there's only one job, but here the graph is quite informative. Do keep in mind that this CD process is really an extension of the previous autobump workflow.

![Visualization 2. Autorelease](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/github-actions/2-autorelease.png)

### Fixing typos

This entire website, posthog.com, is stored in a GitHub repository: [PostHog/posthog.com](https://github.com/PostHog/posthog.com). In fact, this very post is nothing more than a Markdown file in the repository's `/contents/blog/` directory.

All in all, we've got quite a bit of copy. All that text is written by humans… And that poses a problem, because humans make mistkes. 

Leters get mixed up, which isn't always easy to spot. It's also a bit of a waste of time for a human to
be spending time looking for that, instead of thinking about the actual style and substance of the text.

For these reasons on every PR we try to fix any typos noticed. For that we use [`codespell`](https://github.com/codespell-project/codespell), in an action looking like this:

```YAML
on:
    - pull_request

jobs:
    spellcheck:
        runs-on: ubuntu-latest
        steps:
            - name: Check out the repository
            - uses: actions/checkout@v2

            - name: Set up Python
              uses: actions/setup-python@v2
              with:
                  python-version: 3.8

            - name: Install codespell with pip
              run: pip install codespell

            - name: Fix typos
              run: codespell ./contents -w

            - name: Push changes
              uses: EndBug/add-and-commit@v7
```

Admittedly, some typos still sneak in occasionally, but this is still very helpful.

### Ensuring PR descriptions

At PostHog, we collectively create lots of PRs daily. One issue we've seen is contributors or team members forgetting to write PR descriptions. This usually results in clarifications that could easily be avoided, and in lost context.

That's why with a simple workflow we created a bot that points out newly-opened PRs that lack a description:

```YAML
on:
    pull_request:
        types: [opened]

jobs:
    check-description:
        name: Check that PR has description
        runs-on: ubuntu-latest

        steps:
            - name: Check if PR is shame-worthy
              id: is-shame-worthy
              run: |
                  FILTERED_BODY=$( sed -r -e '/^(##? )|(- *\[)/d' <<< $RAW_BODY )
                  echo "::debug::Filtered PR body to $FILTERED_BODY"
                  if [[ -z "${FILTERED_BODY//[[:space:]]/}" ]]; then
                      echo "::set-output name=is-shame-worthy::true"
                  else
                      echo "::set-output name=is-shame-worthy::false"
                  fi
              env:
                  RAW_BODY: ${{ github.event.pull_request.body }}

            - name: Shame if PR has no description
              if: steps.is-shame-worthy.outputs.is-shame-worthy == 'true'
              run: |
                  SHAME_BODY="Hey @${{ github.actor }}! 👋\nThis pull request seems to contain no description. Please add useful context, rationale, and/or any other information that will help make sense of this change now and in the distant Mars-based future."
                  curl -s -u posthog-bot:${{ secrets.GITHUB_TOKEN }} -X POST -d "{ \"body\": \"$SHAME_BODY\" }" "https://api.github.com/repos/${{ github.repository }}/issues/${{ github.event.pull_request.number }}/comments"
```

### Syncing repositories

One last case we'll discuss is syncing one repository's contents from another. In our case, we have a main product repo: https://github.com/PostHog/posthog. However, parts of it – enterprise features code – are non-FOSS, which means their code is not under a free license. We are happy to offer a purely FOSS version of PostHog with https://github.com/PostHog/posthog-foss, which is just like the main repo but with non-free portions removed.

Keeping `posthog-foss` in sync with `posthog` manually would be awful work though. So we've automated it:

```YAML
on:
    push:
        branches:
            - master

jobs:
    repo-sync:
        name: Sync posthog-foss with posthog
        runs-on: ubuntu-latest
        steps:
            - name: Sync repositories 1 to 1 - master branch
              if: github.repository == 'PostHog/posthog'
              uses: wei/git-sync@v3
              with:
                  source_repo: 'https://posthog-bot:${{ secrets.POSTHOG_BOT_GITHUB_TOKEN }}@github.com/posthog/posthog.git'
                  source_branch: 'master'
                  destination_repo: 'https://posthog-bot:${{ secrets.POSTHOG_BOT_GITHUB_TOKEN }}@github.com/posthog/posthog-foss.git'
                  destination_branch: 'master'
            - name: Check out posthog-foss
              if: github.repository == 'PostHog/posthog'
              uses: actions/checkout@v2
              with:
                  repository: 'posthog/posthog-foss'
                  ref: master
                  token: ${{ secrets.POSTHOG_BOT_GITHUB_TOKEN }}
            - name: Change LICENSE to pure MIT
              if: github.repository == 'PostHog/posthog'
              run: |
                  sed -i -e '/PostHog Inc\./,/Permission is hereby granted/c\Copyright (c) 2020-2021 PostHog Inc\.\n\nPermission is hereby granted, free of charge, to any person obtaining a copy' LICENSE
                  echo -e "MIT License\n\n$(cat LICENSE)" > LICENSE
            - name: Commit "Sync and remove all non-FOSS parts"
              if: github.repository == 'PostHog/posthog'
              uses: EndBug/add-and-commit@v7
              with:
                  message: 'Sync and remove all non-FOSS parts'
                  remove: '["-r ee/", "-r .github/"]'
                  github_token: ${{ secrets.POSTHOG_BOT_GITHUB_TOKEN }}
            - run: echo # Empty step so that GitHub doesn't complain about an empty job on forks
```

## Automate your day-to-day

Hopefully these real-life examples inspire you to build the right workflow for your work, spending a bit of time _once_ to reap the rewards of saved time indefinitely.

_Enjoyed this? Subscribe to our [newsletter](https://newsletter.posthog.com/subscribe) to hear more from us twice a month!_
