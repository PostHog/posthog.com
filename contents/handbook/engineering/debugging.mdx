---
title: Breaking glass to debug production
sidebar: Handbook
showTitle: true
---

We've all been there. Something was just merged and now there is a bug that you are having a real hard time pinning down.
You hate to do it...but you need to get on a prod box to see what's going on. _SHAME_

![Shame bell](https://media0.giphy.com/media/vX9WcCiWwUF7G/200.gif)

### Step 1

Make sure that you have `awscli` installed locally on your computer.

For macOS you should [brew install](https://formulae.brew.sh/formula/awscli) it:

```bash
brew install awscli
```

#### Configure AWS CLI

```bash
aws configure
```

From here follow the wizard and enter your AWS Key ID and Secret Key. You should default to `us-east-1` as your region.

### Step 2

You'll need to make sure that you have the [Session Manager plugin for AWS ClI](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html) installed.
Follow the steps below (for macOS) to install the [Session Manager plugin](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html) using the bundled installer.

#### Download the bundled installer.

```bash
curl "https://s3.amazonaws.com/session-manager-downloads/plugin/latest/mac/sessionmanager-bundle.zip" -o "sessionmanager-bundle.zip"
```

#### Unzip the package.

```bash
unzip sessionmanager-bundle.zip
```

#### Run the install command.

```bash
sudo ./sessionmanager-bundle/install -i /usr/local/sessionmanagerplugin -b /usr/local/bin/session-manager-plugin
```

### Step 3

Go to the ECS console in AWS. Select the `posthog-production-cluster` and then select the service that you would like to exec into (most likely a `web` or `worker` task).
From that service select a currently running task. **IT MUST BE RUNNING AND STABLE**. If the service is flapping this will not help you.

Copy the _TASK ID_. We'll be using that later.

### Step 4

#### Exec into the container

Plug the Task ID (from the previous step) into the following command and get to work slacker!
(You may also need to change the container name depending on the service you are hoping into)

```bash
aws ecs execute-command  \
    --region us-east-1 \
    --cluster posthog-production-cluster \
    --task <TASK_ID from earlier> \
    --container posthog-production \
    --command "/bin/bash" \
    --interactive
```

If you need a Django shell, just run the following after connecting

```bash
python manage.py shell_plus
```

If all of this fails reach out to the engineer on call.
