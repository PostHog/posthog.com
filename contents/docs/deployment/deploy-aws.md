---
title: Deploying to AWS
sidebar: Docs
showTitle: true
---

## Why AWS

AWS provides a similar containerized PostHog environment. Through the use of AWS Fargate, we are able to provide a *"pay what you use"* platform to prevent overpaying!

Likewise, we maintain a CloudFormation [config](https://github.com/PostHog/deployment/blob/master/aws/cloudformation/ecs/posthog.yaml) to deploy PostHog with Redis and Postgres on an AWS stack.

> If you're new to CloudFormations and want to learn more and how to use them, check out these [AWS Docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/GettingStarted.Walkthrough.html).

## CloudFormation Install (Recommended)

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

## AWS Marketplace Quick Install

PostHog can be found on the AWS Marketplace. To deploy it, you just need to access the page and follow the steps to configure your instance.

Here's a short step by step tutorial:

0. Ensure you're logged in to AWS 
1. Visit the [PostHog page on the AWS Marketplace](https://aws.amazon.com/marketplace/pp/B089QN5DZM?qid=1595331182232&sr=0-1&ref_=srh_res_product_title) and click 'Continue to Subscribe'
2. You will be prompted with a page to review your subscription. The subscription to PostHog via AWS Marketplace is **free**, so the only thing you'll need to pay for are the AWS Resources you use with your PostHog instance.
3. Once your subscription is ready, you should receive an email about it. You can then view all your subscriptions on the [Your Software page](https://aws.amazon.com/marketplace/library/)
4. From the 'Your Software' page, you should now see PostHog. Click 'Launch Instance' on it. 
5. This will prompt you with the configuration steps before you launch. You should fill this according to your preferences. Regarding the Instance Type, we recommend a config with about the following specs for a medium volume instance:
    - 4GB of RAM
    - 2 CPUs
    - 50GB of storage

However, this will vary based on the volume you're expecting. If you're expecting a low volume, a lighter instance may do just fine. AWS suggests EC2 by default, which has a free tier available. This might be suitable for users not expecting to do heavy load analytics yet, as well as those with little website traffic. Conversely, if you are expecting high volume, you should probably scale up from the specs above.
6. Finish the configuration steps according to your personal preferences. Setting up security groups is probably a good idea.
7. Launch the instance and you're all set!

<br>
