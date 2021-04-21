---
title: Deploying to AWS with Clickhouse
sidebar: Docs
showTitle: true
---

## Why clickhouse on AWS?

This deployment mechanism is targeted towards larger installations (above 2M events/month) which would run into performance and scalability issues using our normal postgres-based deployments by using the highly scalable clickhouse database.

> Warning: This deployment mechanism is still experimental and is not yet publicly accessible

## How it works

On Amazon, we'll give you access to a **cloudformation template** which:
1. Sets up Amazon EKS (Kubernetes service) and deploys a helm chart on it
1. The helm chart will set up all required services, including clickhouse and redis as well as TLS/SSL certificates for letsencrypt
1. Sets up a database in RDS used by posthog
1. All inside a private VPC
1. Optionally sets up a bastion host

## How to install

We'll give you access to a cloudformation template which you can deploy to your selected region as well as a licence key.

1. Select the right region and go to AWS > Cloudformation > Create Stack and use the cloudformation template URL we passed to you
1. After clicking "Next" you'll have the option to review the parameters. You will need to update these to configure your setup.
    1. **Hostname** - Set this to the domain you will be using posthog via.
    1. **HostedZoneName** - If you're using Route53 for DNS, fill this and cloudformation will automatically set up DNS for you
    1. **ImageTag** - Use this to pin to specific releases if you want to avoid automatic updates. You can find our latest releases [here](https://posthog.com/blog), the tag name will be `release-1.xx.x`
    1. **AvailabilityZones** and **NumberOfAZs** - Fill with availability zones in the region.
    1. **NodeInstanceType** - Instance type used by EKS. Choosing a high-powered instance allows for better scaling. The defaults are tuned for medium-sized instances but don't hesitate to ask for help!
1. If you are ready, click Create Stack!
1. Wait for an hour. If all went well, outputs tab will contain next steps.
1. (Only needed not using Route53) set up DNS for hostname.
1. Wait for DNS to propagate and create an account
1. Once all set up, use the licence key we gave you to get full access.

## Common operations

### How to update

Once a new release is out, we'll advertise them in our [blog](https://posthog.com/blog). If you're pinning to a specific release:

1. Go to Cloudformation, edit our stack
1. Use current template
1. Change **ImageTag** to `release-1.xx.x`
1. Click next until the stack is updating

### Checking metrics

The helm chart automatically installs AWS container insights. You can access dashboards it automatically sets up via `Cloudwatch > Container Insights > Performance monitoring`.

The most useful dashboards are:
1. The EKS Cluster one
1. Pods
1. Services

For the posthog namespace.

### Checking logs

The helm chart automatically installs AWS container insights.

You can access application logs via `Cloudwatch > Log groups > posthog/application`.

### Accessing the instance via bastion host

The bastion host has `helm` and `kubectl` installed, which can be useful to debug issues with the cluster.

To update an existing stack to have access:
1. (If needed) Set up a key pair via AWS > EC2 > Key Pairs
2. Find the stack in cloudformation, click update.
3. Change **ProvisionBastionHost** parameter to `Enabled` and set `KeyPairName` to your key pair
4. Click next until the stack is updating.
5. Once stack has been updated, you can see the IP in `Outputs` tab under `34.241.184.89`
6. You can ssh in via `ssh -i path/to/key ec2-user@IP`

> Note: Bastion host counts against your AWS account [instance addressing limit](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-limit)

### Giving posthog team access to the stack

If you're running into trouble with your setup and asking for support, we might ask access to the cluster.

To give us access:
1. [set up bastion host](#accessing-the-instance-via-bastion)
1. Ssh to the IP via `ssh -i path/to/key ec2-user@IP` and add a public key we give you to `~/.ssh/authorized_keys`
1. Send us the IP of the instance once done.
