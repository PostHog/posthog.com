---
title: Deploying to AWS
sidebarTitle: AWS
sidebar: Docs
showTitle: true
tags:
    - aws
---

## Why AWS

AWS provides a similar containerized PostHog environment to [Docker deployment](/docs/self-host/deploy/docker). Through the use of AWS Fargate, we are able to provide a *"pay for what you use"* platform to prevent you from overpaying!

Likewise, we maintain a CloudFormation [config](https://github.com/PostHog/deployment/blob/master/aws/cloudformation/ecs/posthog.yaml) to deploy PostHog with Redis and Postgres on an AWS stack.

> If you're new to CloudFormations and want to learn more and how to use them, check out these [AWS Docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/GettingStarted.Walkthrough.html).

## CloudFormation Install (Recommended)

Jump straight in:

[![Launch AWS Stack](../../../../src/images/deploy-button-aws.svg)](https://console.aws.amazon.com/cloudformation/home#/stacks/new?stackName=Posthog&templateURL=https://deployments-posthog.s3-us-west-2.amazonaws.com/cloudformation/ecs/fargate/posthog.yaml)

1. After clicking "Next" you'll have the option to review the parameters. You will need to update these if you want to modify default behaviors, get alarms, or setup SMTP configs as described below.

1. Review the rest of the Configuration Wizard pages

1. (Optional) On the 'Review Stack' page you can click **estimate cost** to get an estimate of how much your specific config will cost per month. The default configs cost about ~\$27 USD per month

1. If you are ready, click **Create Stack**!

1. Once deployment completes look under **Outputs** for `ExternalUrl`

1. Review all parameters in the config and ensure everything is nominal.

1. If you filled out Alarm email, then check your email to confirm SNS subscription. 

### Adding TLS/SSL support

> You should _definitely_ setup TLS ([Read more](#important-points))!

1. Go to 'Services' > 'EC2' > 'Load balancers'

1. Navigate to 'Public load balancer' > 'Listeners'

1. Add a listener for the protocol HTTPS, import or add your SSL certificate

1. After verifying it works, you can disable insecure access by removing the listener for port 80 (HTTP).

While not required for setup, at a later date you may wish to add another listener to redirect HTTP requests to HTTPS for convenience. See more details on [Amazon's docs](https://aws.amazon.com/premiumsupport/knowledge-center/elb-redirect-http-to-https-using-alb/).

## Updating AWS Fargate

Do this to get the latest and greatest version of posthog. Follow these steps:

1. Open up your AWS console to [ECS management page](https://console.aws.amazon.com/ecs/)

1. Make sure you have your Region set to the correct region.

1. In the navigation pane, choose **Clusters**.

1. On the **Clusters** page, select the name of the cluster running PostHog

1. On the cluster page select the services tab

1. Check the box on the left of the PostHog service and click the **Update** button above

1. On the **Configure Service** page, PostHog's service information is already pre-populated. You **MUST** check **Force New Deployment** to instruct ECS to pull a new container from the Docker repository. From there make any relevant changes to the configuration if you want to. If all that is needed is an update proceed to **Next Step**

1. Review the **Configure Deployments** page and then proceed to **Next Step**

1. Review the **Configure Networks** configs and then proceed to **Next Step**

1. Click **Update Services** to 🚢 the newest version of PostHog to your ECS cluster!

You can find more details on Amazon's Docs for [Elastic Container Service](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/update-service.html).
<br />

## Updating Cloudformation template
> ⚠️ This may remove your RDS instance and your data with it. Please be sure to make a backup of your RDS instance before you proceed.
> You can read more about this and how to snapshot RDS on [AWS docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html)


Do this to update parameters: to scale different services up/down, update who gets alarms, SMTP or more.

1. Go to the CloudFormation page on your AWS [console](https://console.aws.amazon.com/cloudformation/)

2. Find your stack, select it, click update

3. Select replace current template and use this url: `https://deployments-posthog.s3-us-west-2.amazonaws.com/cloudformation/ecs/fargate/posthog.yaml`

4. Review parameters and other pages and update stack.

## AWS Deployment with Docker

If instead of using our CloudFormation config or AWS Marketplace app you would rather go through the deployment yourself, here's how to do it. We'll be using Docker for this tutorial but you could also [deploy from source](/docs/self-host/deploy/source) if you wanted to.

#### EC2 Setup

0. Ensure you're logged in to AWS 
1. Access your [AWS EC2 Dashboard](https://console.aws.amazon.com/ec2/v2/home)
1. Click the 'Launch Instance' button 
1. Select your AMI. For this tutorial, we'll be using the _Ubuntu Server 18.04 LTS (HVM)_
1. You will be prompted with a page to choose your instance type. We recommend a config with about the following specs for a medium volume instance:
    - 4GB of RAM
    - 2 CPUs
    - 50GB of storage

However, this will vary based on the volume you're expecting. If you're expecting a low volume, a lighter instance may do just fine. EC2 has a free tier available and this might be suitable for users not expecting to do heavy load analytics yet, as well as those with little website traffic. Conversely, if you are expecting high volume, you should probably scale up from the specs above.

1. Click 'Review and Launch'
1. Once your instance is live, you should get a notification. That means you're ready to move on to the next tutorial.

## Running PostHog Behind a Proxy or Load Balancer

If you're running PostHog behind a proxy or load balancer like [ELB](https://aws.amazon.com/elasticloadbalancing/?elb-whats-new.sort-by=item.additionalFields.postDateTime&elb-whats-new.sort-order=desc), you need to set the `IS_BEHIND_PROXY` environment variable to `True`.

For more information, visit our [dedicated page for running PostHog behind a proxy](/docs/self-host/configure/running-behind-proxy).

#### Docker Installation

0. SSH into your EC2 instance by using the IP provided on your console instead of `<YOUR_IP>`. On a terminal, this should look something like this:
```bash
ssh ubuntu@<YOUR_IP>
```

If you downloaded a new key during the creation of the Virtual Machine, you may need to run:
```bash
ssh -i path/to/your/key.pem <username>@<YOUR_IP>
```
1. After accessing the instance, install [Docker Engine](https://docs.docker.com/engine/install/ubuntu)
1. Then install [Docker Compose](https://docs.docker.com/compose/install/)
1. [Setup Docker to run without root privileges](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user) (optional but strongly recommended)
1. Install `git`:
```bash
sudo apt-get update && sudo apt-get install git
```
1. To clone the PostHog repository and enter the new directory, run: 
```bash
git clone https://github.com/posthog/posthog.git && cd posthog
```
1. You'll then need to generate a `SECRET_KEY` that is unique to your instance. 

    **⚠️ Note: Do not use our placeholder key! Read more about the importance of this key [here](/docs/self-host/configure/securing-posthog).**

    First, run: `openssl rand -hex 32`. This will generate a new key for you. You'll need this in the next step.

    Then, open the `docker-compose.yml` file with the command: `nano docker-compose.yml`

    Lastly, substitute `"<randomly generated secret key>"` for the key you got from the key generation command.

    This means the `SECRET_KEY: "<randomly generated secret key>"` line will end up looking something like this (with your key, of course):

    ```
    SECRET_KEY: "cd8a182315defa70d995452d9258908ef502da512f52c20eeaa7951d0bb96e75"
    ```

1. Then, to run PostHog, do:
```bash
docker-compose up -d
```
1. You're good to go! PostHog should be accessible on the domain you set up or the IP of your instance.

<blockquote class='warning-note'>

**Important:** If you do not have a TLS/SSL certificate set up for your domain/IP, accessing the address of your PostHog instance _will not work_. To get around this, you need to edit the `docker-compose.yml` file manually and add the environment variables   `DISABLE_SECURE_SSL_REDIRECT: 'true'` and `SECURE_COOKIES: 'false'` under `services > web > environment`. This is a manual process because PostHog should not be run without a certificate (i.e. over HTTP). 

Doing this and restarting the service will allow you to access PostHog over HTTP, but might require configuring browser settings to allow HTTP traffic depending on what browser you use. 

</blockquote>

<br />

## Important Points

#### ⚠️ Never, Ever, Run PostHog Without TLS/SSL
PostHog needs to run on HTTPS because if it doesn't:
 
 a) It will fail<br />
 b) Your user data will be at risk

#### Check Your Firewall/Security Group if You Cannot Connect to a Port

If you are unable to connect to a certain port, this might be due to the firewall or security group settings for your EC2 Instance.

##### Firewal Issues

Generally, this is a matter of running:

```bash
sudo ufw allow <PORT> && sudo ufw reload
```
To check that the changes were applied, run: 
```bash
sudo ufw status
```

You can read [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu-18-04) for more information.

##### Security Group Issues

Here's a [good AWS Tutorial](https://aws.amazon.com/premiumsupport/knowledge-center/connect-http-https-ec2/) about this.

<br />

## Upgrading Docker on AWS

See [this PostHog tutorial](/docs/self-host/deploy/docker#upgrading-docker) about upgrading your PostHog version with Docker.
<br />

## Useful Tutorials
<br />

###### - [Suggested NGINX Configuration for PostHog](/docs/self-host/configure/running-behind-proxy)

###### - [Securing PostHog](/docs/self-host/configure/securing-posthog)

###### - [Scaling PostHog](/docs/self-host/configure/scaling-posthog)
