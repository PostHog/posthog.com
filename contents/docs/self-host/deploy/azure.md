---
title: Deploying to Microsoft Azure
sidebarTitle: Microsoft Azure
sidebar: Docs
showTitle: true
---


## Why Azure

[Microsoft Azure](https://azure.microsoft.com/) is one of the most well-established Cloud Providers. It offers a comprehensive dashboard with simple configuration, as well as an extensive Free Trial.
<br />

### Deploying to Azure

To deploy on Azure, our suggested method is deploying with Docker, which we'll explain in detail on this page. If you would rather not use Docker, you can consider [deploying from source](/docs/self-host/deploy/source), as well as other providers with one-click installs, like [Heroku](/docs/self-host/deploy/heroku) or [AWS](/docs/self-host/deploy/aws).
<br />

## Docker Install: Virtual Machine Setup

The first thing you'll need is a [Microsoft Azure account](https://azure.microsoft.com/en-gb/free/). Once you have that up and running, you're good to go!
<br />

### Step-By-Step

1. Access your [Dashboard](https://portal.azure.com/#home)
1. Click 'Virtual Machine' if it is available on the main screen. Otherwise, click 'Create a Resource' > 'Compute' > 'Virtual Machine'
1. On the 'Virtual Machine' page, click 'Add' on the top right if you were not automatically taken to the creation page
1. Set up your desired configuration. We'll be using the 'Ubuntu Server 18.04 LTS' image for this tutorial. 

    You may also want to enable ports 22, 80, and 443, for SSH, HTTP Traffic, and HTTPS Traffic respectively. It is recommended to set security preferences and allowed IPs for these ports. For this tutorial, you will also need the 'username' you create at this stage, so take note of that.

    Finally, for the server specifications, we recommend a config with about the following specs for a medium volume instance:
    - 4GB of RAM
    - 2 CPUs
    - 50GB of storage

    <br />

    However, this will vary based on the volume you're expecting. If you're expecting a low volume, a lighter instance may do just fine. Conversely, if you are expecting high volume, you should probably scale up from the specs above.

1. Click 'Review + create' once you're done with the configuration steps
1. Once your instance is live, that means you're ready to move on to the next tutorial.

#### Docker Installation

0. SSH into your Virtual Machine by using the IP provided as a resource on your Virtual Machine Console. Use that IP instead of `<YOUR_IP>`, and run the following command on a terminal: 
```bash
ssh <username>@<YOUR_IP>
```
If you downloaded a new key during the creation of the Virtual Machine, you may need to run:
```bash
ssh -i path/to/your/key.pem <username>@<YOUR_IP>
```
1. After accessing the instance, install [Docker Engine](https://docs.docker.com/engine/install/ubuntu)
1. Then install [Docker Compose](https://docs.docker.com/compose/install/)
1. [Setup Docker to run without root privileges](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user) (optional but strongly recommended)
1. You should already have `git` installed. In that case, skip this step. Otherwise, install `git`:
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

## Running PostHog Behind a Proxy or Load Balancer

If you're running PostHog behind a proxy or load balancer, you need to set the `IS_BEHIND_PROXY` environment variable to `True`. Depending on your setup, you might also need to set the `ALLOWED_HOSTS` [environment variable](/docs/self-host/configure/environment-variables).

For more information, visit our [dedicated page for running PostHog behind a proxy](/docs/self-host/configure/running-behind-proxy).

## Important Points

#### ⚠️ Never, Ever, Run PostHog Without TLS/SSL
PostHog needs to run on HTTPS because if it doesn't:
 
 a) It will fail<br />
 b) Your user data will be at risk

#### Check Your Firewall/Security Group if You Cannot Connect to a Port

If you are unable to connect to a certain port, this might be due to the firewall or security group settings for your VM.

##### Firewall Issues

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

Here's a [good Azure Tutorial](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/nsg-quickstart-portal) about this.

<br />

## Upgrading Docker on Azure

See [this PostHog tutorial](/docs/self-host/deploy/docker#upgrading-docker) about upgrading your PostHog version with Docker.
<br />

## Useful Tutorials
<br />

###### - [Suggested NGINX Configuration for PostHog](/docs/self-host/configure/running-behind-proxy)

###### - [Securing PostHog](/docs/self-host/configure/securing-posthog)

###### - [Scaling PostHog](/docs/self-host/configure/scaling-posthog)

