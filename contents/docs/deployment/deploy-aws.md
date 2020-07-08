---
title: Deploying to AWS
sidebar: Docs
showTitle: true
---

## Why AWS

AWS provides a similar containerized PostHog environment. Through the use of AWS Fargate, we are able to provide a *"pay what you use"* platform to prevent overpaying!

Likewise, we maintain a CloudFormation [config](https://github.com/PostHog/deployment/blob/master/aws/cloudformation/ecs/posthog.yaml) to deploy PostHog with Redis and Postgres on an AWS stack.

> If you're new to CloudFormations and want to learn more and how to use them, check out these [AWS Docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/GettingStarted.Walkthrough.html).

## Step By Step Installation

1. Go to the CloudFormation page on your AWS [console](https://console.aws.amazon.com/cloudformation/)

2. Click **Create Stack -> With New Resources (standard)**

3. Select template source as **Amazon S3 URL** and use this url: `https://deployments-posthog.s3-us-west-2.amazonaws.com/cloudformation/ecs/fargate/posthog.yaml`

4. Choose a Stack Name and review the Parameters. You will need to update these if you want to modify default behaviors or setup SMTP configs as described below

5. Review the rest of the config wizard pages

6. On the Review stack page you can click **estimate cost** to get an estimate of how much your specific config will cost per month. The default configs cost about ~\$27 USD a month

7. If you are ready, click **Create Stack**!

8. Once deployment completes look under **Options** for the Publicly facing ELB Host

9. Review all parameters in the config and ensure everything is nominal

>_Definitely_ setup for TLS (Transport Layer Security)! Once you have TLS setup for your ELB (Elastic Load Balancing) you should disable insecure access via HTTP by removing the environment variable `DISABLE_SECURE_SSL_REDIRECT=1` from the Task definition in ECS and deploying the updated Task definition revision.

## Updating AWS Fargate

To update follow these steps:

1. Open up your AWS console to [ECS management page](https://console.aws.amazon.com/ecs/)

1. Make sure you have your Region set to the correct region.

1. In the navigation pane, choose **Clusters**.

1. On the **Clusters** page, select the name of the cluster running PostHog

1. On the cluster page select the services tab

1. Check the box to the left of the PostHog service and click **Update** button above

1. On the **Configure service** page, PostHog's service information is already pre-populated. You **MUST** check **Force new deployment** to instruct ECS to pull a new container from the Docker repository. From there make any relevant changes to the configuration if you want to. If all that is needed is an update proceed to **Next Step**

1. Review the **Configure deployments** page and then proceed to **Next Step**

1. Review the **Configure networks** configs and then proceed to **Next Step**

1. Click **Update Services** to 🚢 the newest version of PostHog to your ECS cluster!

You can find more details on Amazon's docs for [Elastic Container Service](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/update-service.html)

### Upgrading from before 3 March 2020?

If you last updated PostHog before 3 March 2020, AND you have a lot of events, there is one migration (0027) that might take a long time.

To avoid this, _before_ you migrate, run `python manage.py migrate_elementgroup` to pre-migrate elements across.

If you only have a few thousand events, you probably don't need to worry about this.

## Reach Out!

If you need help on any of the above, feel free to create an issue on [our repo](https://github.com/PostHog/posthog), or [join our Slack](https://join.slack.com/t/posthogusers/shared_invite/enQtOTY0MzU5NjAwMDY3LTc2MWQ0OTZlNjhkODk3ZDI3NDVjMDE1YjgxY2I4ZjI4MzJhZmVmNjJkN2NmMGJmMzc2N2U3Yjc3ZjI5NGFlZDQ) where a member of our team can assist you! Chances are that if you have a problem or question, someone else does too - so please don't hesitate to create a new issue or ask us a question :)

Likewise, if you see a way to better our product or our documentation, feel free to checkout our [contributing docs](/docs/contributing); we would love for you to be a part of our open-source family!
