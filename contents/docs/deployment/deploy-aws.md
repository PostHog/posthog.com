---
title: Deploying to AWS
sidebar: Docs
showTitle: true
---

## Why AWS

AWS provides a similar containerized PostHog environment. Through the use of AWS fargate, we are able to provide a *"pay what you use"* platform to prevent overpaying!

Likewise, we maintain a CloudFormation [config](https://github.com/PostHog/deployment/blob/master/aws/cloudformation/ecs/posthog.yaml) to deploy Posthog with Redis and Postgres on an AWS stack.

> If you're new to CloudFormations and want to learn more and how to use them, check out these [AWS Docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/GettingStarted.Walkthrough.html).

## Step By Step Installation

1. Go to the CloudFormation page on your AWS [console](https://console.aws.amazon.com/cloudformation/)

2. Click **Create Stack -> With New Resources (standard)**

3. Select template source as **Amazon S3 URL** and use this url: `https://deployments-posthog.s3-us-west-2.amazonaws.com/cloudformation/ecs/fargate/posthog.yaml`

4. Choose a Stack Name and review the Parameters. You will need to update these if you want to modify default behaviours or setup SMTP configs as described below

5. Review the rest of the config wizard pages

6. On the Review stack page you can click **estimate cost** to get an estimate of how much your specific config will cost per month. The default configs cost about ~\$27 USD a month

7. If you are ready, click **Create Stack**!

8. Once deployment completes look under **Options** for the Publicly facing ELB Host

9. Review all parameters in the config and ensure eveything is nominal

>_Definitely_ setup for TLS (Transport Layer Security)! Once you have TLS setup for your ELB (Elastic Load Balancing) you should disable insecure access via HTTP by removing the evironment variable `DISABLE_SECURE_SSL_REDIRECT=1` from the Task definition in ECS and deploying the updated Task definition revision.
