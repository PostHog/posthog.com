---
title: Deploying to Linode
sidebar: Docs
showTitle: true
---

## Prerequisites

- A [Linode](https://linode.com) account.

## Linode Installation

We have a Linode StackScript available, which deploys and installs PostHog on any Linode running Ubuntu/Debian.

1. Visit your Linode Dashboard and navigate to StackScripts.
1. Click `Create New StackScript`.
1. You may assign it any label (e.g. `PostHog`).
1. Under `Target Images` you may select any version of Ubuntu or Debian (although we recommend using Ubuntu 20.04 LTS).
1. Copy the contents of our [StackScript.sh](https://github.com/PostHog/deployment/tree/master/linode) into `Script`.
1. Click `Save`.
1. Click on your newly created PostHog StackScript and click `Deploy New Linode`.
1. Once your Linode is created, you should be able to visit the server address in a web browser and see a working PostHog instance.


## Updating your PostHog

1. Open your Linode dashboard.
1. Navigate to your PostHog installation and click **Launch Console**.
1. Once launched, enter your login information which may be as user: `root`.
1. Run the PostHog **StackScript** in your home `~` directory.
```
./StackScript
```
1. Exit Console and your instance should be updated to the latest PostHog release.
