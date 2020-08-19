---
title: Deploying to Google Cloud
sidebar: Docs
showTitle: true
---
<br>


## Why Google Computing Services

[Google Computing Services](https://cloud.google.com/), also known as GCS or Google Cloud, is one of the most well-established Cloud Providers. GCS has a rather intuitive integrated dashboard, as well as an extensive Free Trial.
<br>

### Deploying to GCS

To deploy on Google Cloud, our suggested method is deploying with Docker, which we'll explain in detail on this page. If you would rather not use Docker, you can consider [deploying from source](/docs/deployment/deploy-source), as well as other providers with one-click installs, like [Heroku](/docs/deployment/deploy-heroku) or [AWS](/docs/deployment/deploy-aws).
<br>

## Docker Install: Virtual Machine Setup

The first thing you'll need is a [GCS Account](https://console.cloud.google.com/freetrial). Once you have that up and running, you're good to go!
<br>

### Step-By-Step

1. Access your [Console](https://console.cloud.google.com/)
1. On the left-hand sidebar, head over to 'Compute' and hover over 'Compute Engine'. This should bring up a submenu where you can click 'VM Instances' at the top.
1. On the 'VM Instances' page, click 'Create'
1. Set up your desired configuration. We'll be using the 'Ubuntu 18.04' boot disk for this tutorial. The default on GCS is Debian, and you can change that by clicking 'Change' uder the 'Boot disk' section. 

You will also want to allow HTTP and HTTPS Traffic. It is recommended to set security preferences and allowed IPs for these ports. 

Finally, for the server specifications, we recommend a config with about the following specs for a medium volume instance:
    - 4GB of RAM
    - 2 CPUs
    - 50GB of storage

However, this will vary based on the volume you're expecting. If you're expecting a low volume, a lighter instance may do just fine. Conversely, if you are expecting high volume, you should probably scale up from the specs above.

1. Click 'Create' at the bottom once you're done with the configuration steps
1. Once your instance is live, that means you're ready to move on to the next tutorial.

#### Docker Installation

On the page for your instance, you can choose how to access it. Clicking SSH will take you to a virtual terminal in your browser where you can interact with the virtual machine. However, you may want to SSH in from your own terminal. In this case, you need to follow [this tutorial](https://cloud.google.com/compute/docs/instances/connecting-advanced#provide-key) to provide you Public Key to the VM Instace.

1. After accessing the instance, install [Docker Engine](https://docs.docker.com/engine/install/ubuntu)
1. Then install [Docker Compose](https://docs.docker.com/compose/install/)
1. [Setup Docker to run without root priviledges](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user) (optional but strongly recommended)
1. You should already have `git` installed. In that case, skip this step. Otherwise, install `git`:
```bash
sudo apt-get update && sudo apt-get install git
```
1. To clone the PostHog repository and enter the new directory, run: 
```bash
git clone https://github.com/posthog/posthog.git && cd posthog
```
1. You'll then need to generate a `SECRET_KEY` that is unique to your instance. 

    **⚠️ Note: Do not use our placeholder key! Read more about the importance of this key [here](/docs/configuring-posthog/securing-posthog).**

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

<br>

## Important Points

#### ⚠️ Never, Ever, Run PostHog Without TLS/SSL
PostHog needs to run on HTTPS because:
 
 a) It will fail<br>
 b) It is a **grave security concern and potentially illegal**

#### Check Your Firewall/Security Group if You Cannot Connect to a Port

If you are unable to connect to a certain port, this might be due to the firewall or security group settings for your VM Instance.

##### UFW Firewal Issues

Generally, this is a matter of running:

```bash
sudo ufw allow <PORT> && sudo ufw reload
```
To check that the changes were applied, run: 
```bash
sudo ufw status
```

You can read [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu-18-04) for more information.

##### VPC Firewall Issues

Here's a [good GCS Tutorial](https://cloud.google.com/vpc/docs/firewalls) about this.

<br>

## Upgrading Docker on Azure

See [this PostHog tutorial](/docs/deployment/deploy-docker#upgrading-docker) about upgrading your PostHog version with Docker.
<br>

## Useful Tutorials
<br>

#### - [Suggested NGINX Configuration for PostHog](/docs/configuring-posthog/running-behind-proxy)

#### - [Securing PostHog](/docs/configuring-posthog/securing-posthog)

#### - [Scaling PostHog](/docs/configuring-posthog/scaling-posthog)

