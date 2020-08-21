---
title: Deploying to Digital Ocean
sidebar: Docs
showTitle: true
---
<br>


## Why Digital Ocean

[Digital Ocean](https://digitalocean.com) is one of the most well-established Cloud Providers. Compared to AWS, where the amount of options and configuration can be overwhelming, Digital Ocean is generally simpler to use and faster to get running. 
<br>

### Deploying to Digital Ocean

To deploy on Digital Ocean, our suggested method is deploying with Docker, which we'll explain in detail on this page. If you would rather not use Docker, you can consider [deploying from source](/docs/deployment/deploy-source), as well as other providers with one-click installs, like [Heroku](/docs/deployment/deploy-heroku) or [AWS](/docs/deployment/deploy-aws).
<br>

## Docker Install: Droplet Setup

The first thing you'll need is a [Digital Ocean account](https://cloud.digitalocean.com/registrations/new). Once you have that up and running, you're good to go!
<br>

### Quick Start
When logged in, click 'Create Docker Droplet' on [this page](https://marketplace.digitalocean.com/apps/docker) and follow the steps to create a droplet.
<br>

### Step-By-Step Without Quick Start

If quick start did not work for you, do the following after logging in:

1. Create a new project using the left-hand sidebar on your dashboard
1. Give the project any name you prefer
1. Navigate to your project and click on 'Create Droplet'
1. Look for a Select the 'Marketplace' option on the top right
1. Select the 'Docker' option
1. Follow the steps and define the settings to create the droplet 
   -  The $20.00 droplet configuration should be good for most purposes. It has 4GB of RAM, 2 CPUs, 80GB of storage, and 4TB of transfer. However, if your volume is expected to be low, you should be able to safely pick to a lighter option. Alternatively, if you know your volume will be extremely high out of the gate, you might want to consider a more expensive option.

> **Note**: You may also create your droplet with a plain Ubuntu distribution (or any other distro) without a one-click app. However, the 'Docker' app ships with the Docker engine and Docker Compose by default on Ubuntu 18.04, which can save you a **lot of time** when setting up.

<br>

## Docker Install: Server Setup

Once your droplet is up and running, SSH into it using the IP provided in your dashboard, like so:

```bash
ssh root@<YOUR-IP>
```

Unlike AWS, in Digital Ocean your first SSH will be to the `root` user.

With access to your server, you should then consider a few things to make it more secure:

###### Create a New User

To create a new user, just run (substituting "\<username>" for the name you want to create):

```bash
adduser <username>
```
<br>

Then, give it the ability to run commands with `sudo`:

```bash
usermod -aG sudo <username>
```

Now, switch into the new user and see if you can actually use `sudo` by listing the contents of the `/root` directory:

```bash
su - <username>
```
```bash
sudo ls -la /root
```

You're all set!

###### Running Docker Without Root Priviledges (Sudo)

As it currently stands, we can only run Docker on the new user by using `sudo`. This is not necessarily a good idea. To allow Docker to run without `sudo` on a non-root user, check out [this tutorial by Docker](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user).

<br>

## Deploying PostHog

Once you're done with any additional config you may wish to setup, you can then go on to installing and deploying PostHog. With Docker, this should be quite easy. 

Here's a step-by-step tutorial:

0. You should have `git` installed by default. If you do not, run: 
```bash
sudo apt-get update && sudo apt-get install git
```
1. To clone the PostHog repository and enter the new directory, run: 
```bash
git clone https://github.com/posthog/posthog.git && cd posthog
```
1. If you want to set a specific `SECRET_KEY` (for example if you are migrating from an older version of PostHog) follow these instructions.

    **⚠️ Note: Do not use our placeholder key! Read more about the importance of this key [here](/docs/deployment/securing-posthog).**

    Open the `docker-compose.yml` file with the command: `nano docker-compose.yml`

    Substitute `"<randomly generated secret key>"` for your desired key.

    This means the `SECRET_KEY: "<randomly generated secret key>"` line will end up looking something like this (with your key, of course):

    ```
    SECRET_KEY: "cd8a182315defa70d995452d9258908ef502da512f52c20eeaa7951d0bb96e75"
    ```

1. Otherwise a secret key will be automatically generated. You should leave `SECRET_KEY` unset in `docker-compose.yml` if you do not wish to use a specific secret key.

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

#### Check Your Firewall if You Cannot Connect to a Port

If you are unable to connect to a certain port, this might be due to the firewall settings for your droplet. Generally, this is a matter of running:

```bash
sudo ufw allow <PORT> && sudo ufw reload
```
To check that the changes were applied, run: 
```bash
sudo ufw status
```

You can read [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu-18-04) for more information.
<br>

## Upgrading Docker on Digital Ocean

See [this PostHog tutorial](/docs/deployment/deploy-docker#upgrading-docker) about upgrading your PostHog version with Docker.
<br>

## Useful Tutorials
<br>

#### - Setting Up SSL on Digital Ocean with [NGINX](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04) or [Apache](https://www.digitalocean.com/community/tutorials/how-to-secure-apache-with-let-s-encrypt-on-ubuntu-18-04)

#### - [How to Add Domains to Digital Ocean Projects](https://www.digitalocean.com/docs/networking/dns/how-to/add-domains/)

#### - [Suggested NGINX Configuration for PostHog](/docs/deployment/running-behind-proxy)

#### - [Securing PostHog](/docs/deployment/securing-posthog)

#### - [Scaling PostHog](/docs/deployment/scaling-posthog)














