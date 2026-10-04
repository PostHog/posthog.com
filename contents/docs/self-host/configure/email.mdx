---
title: Configuring email
sidebar: Docs
showTitle: true
---

PostHog's core relies on email messaging for certain functionality. For example:
- Sending a reset link to a user that has forgotten their password.
- Sending an invite link for new team members to join PostHog.


By default, PostHog will **not** send email messages until you enable an SMTP server. We very strongly recommend using an email service to act as email server (see examples below for most common providers). These providers are optimized to maximize email deliverability. 

To prevent spam, most email providers have very complex systems in place that validate a myriad of factors before allowing an email through. Optimizing local servers for this is a bit like reinventing the wheel, so avoid this unless you have a very strong reason not to.

## General configuration

To configure a remote email server, you will need to head over to [Instance settings](/docs/self-host/configure/instance-settings) and set up the following parameters (please note that if you're running PostHog older than 1.33.0, you will need to configure these parameters via [environment variables](/docs/self-host/configure/environment-variables)):
- `EMAIL_HOST`: Defaults to `None`. Hostname to connect to for establishing SMTP connections.
- `EMAIL_PORT`: Defaults to `25`. Port that should be used to connect to the host.
- `EMAIL_HOST_USER`: Defaults to `null`. Credentials to connect to the host.
- `EMAIL_HOST_PASSWORD`: Defaults to `null`. Credentials to connect to the host.
- `EMAIL_USE_TLS`: Defaults to `false`. Whether to use TLS protocol when connecting to the host.
- `EMAIL_USE_SSL`: Defaults to `false`. Whether to use SSL protocol when connecting to the host. If you're using **AWS SES** you should use this instead of TLS.
- `EMAIL_DEFAULT_FROM`: Defaults to `root@localhost`. Email address that will appear as the sender in emails (`From` header).
- `EMAIL_ENABLED`: Defaults to `true`. Whether email service is enabled or not.
- `SITE_URL`: Defaults to `http://localhost:8000`. Not unique to the email service, but it needs to be set for emails to work properly. Principal URL of your PostHog instance.

Sample configuration:
```yaml
EMAIL_HOST: smtp.example.com
EMAIL_PORT: 587
EMAIL_HOST_USER: postmaster@example.com
EMAIL_HOST_PASSWORD: password
EMAIL_USE_TLS: false
EMAIL_USE_SSL: true
EMAIL_DEFAULT_FROM: no-reply@example.com
SITE_URL: https://posthog.example.com
```

The above sample configuration can also be set in your `values.yaml` this way, however configuring your email service with [Instance settings](/docs/self-host/configure/instance-settings) instead is highly recommended (this is because environment variables are only read when there are no values set from the UI/API, i.e. the values set from the UI/API take precedence, as such setting them here can help you ensure you have a single source of truth):
```yaml
email:
  from_email: no-reply@example.com
  host: smtp.example.com
  port: 587
  user: postmaster@example.com
  password: password
  use_tls: false
  use_ssl: true
```

Below you will find details on how to configure the most common email providers (not in any particular order). 

## Twilio's Sendgrid
With Sendgrid you have 2 different configuration options. 

### Option A: Domain authentication (Recommended)
[Domain authentication](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-domain-authentication/#setting-up-domain-authentication) allows you to send emails from any address within your validated domain. It is the best option to guarantee email deliverability because it establishes DNS records on your domain that validate your identity.

1. On sender authentication, select the option to authenticate a domain, you can also go directly to [https://app.sendgrid.com/settings/sender_auth/domain/create](https://app.sendgrid.com/settings/sender_auth/domain/create).

1. Fill out the required details for the domain you wish to configure. We recommend using the default configuration. If you do not use the advanced settings option please be sure to properly configure [DKIM](https://en.wikipedia.org/wiki/DomainKeys_Identified_Mail) and [SPF](https://en.wikipedia.org/wiki/Sender_Policy_Framework) records to ensure deliverability.

1. You will receive now a list of DNS records that need to be added to your domain. After adding them, be sure to verify them on Sendgrid. You are now ready to start sending emails.


### Option B: Single sender authentication
As an alternative you can do [single sender verification](https://sendgrid.com/docs/ui/sending-email/sender-verification/) which is the easiest option to configure. You will only need to be able to receive emails on the address you want to use as sender. **Please note this method is only recommended as a starting point, or for small scale usage.**

1. On sender authentication, select the option to create a new sender profile, you can also go directly to [https://app.sendgrid.com/settings/sender_auth/senders/new](https://app.sendgrid.com/settings/sender_auth/senders/new).

1. Fill out the form with the required details, see an example below.

![Configuring Sendgrid](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/configuring-posthog/sendgrid-2.png)

1. Validate the email address by clicking on the link you will receive.

After you have set up your sending configuration, you can continue below to set up your credentials and configure to send emails with Sendgrid.

1. To create the required credentials, go to Settings > [API keys](https://app.sendgrid.com/settings/api_keys) and click on "Create API key".

1. Set a name for your API key, we recommend using "PostHog", and select the "Restricted Key" option. You will need to enable the "Mail Send" permission as detailed below. Copy the key directly to your instance configuration.

![API Sendgrid](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/configuring-posthog/sendgrid-3.png)

1. With the key you created above, you can now set your instance configuration in PostHog:
    ```yaml
    EMAIL_HOST: smtp.sendgrid.net
    EMAIL_PORT: 587
    EMAIL_HOST_USER: apikey # same for everyone
    EMAIL_HOST_PASSWORD: SG.rqHsfjxZPiqE5lqXTgQ_lz7x7IVLv # obtained from step above
    EMAIL_USE_TLS: true
    EMAIL_USE_SSL: false
    EMAIL_DEFAULT_FROM: hey@example.com # you can define this, just use your domain or single sender address
    SITE_URL: https://posthog.example.com # this is the URL of your instance 
    ```

1. Test your integration! Whenever updating email settings, we will attempt to send you a test email so you can assert everything is working as expected. Please note that if you update these settings via environment variables, you need to restart your server and test sending an email (e.g. request a password reset).
    > Remember that you will need to restart **both your web server and background worker** for this to work properly.


1. As an additional optional step, we recommend turning off 'open & click tracking' to avoid having weird-looking links and increase deliverability (there's little value in having this data). You can do so by going to [tracking settings](https://app.sendgrid.com/settings/tracking).

![Sendgrid Config](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/configuring-posthog/sendgrid-4.png)

## Mailgun
1. After you have created an account, go to Sending > [Domains](https://app.mailgun.com/app/sending/domains), and click on "Add New Domain".
1. Enter a domain name that you own. Using a subdomain is recommended (e.g. `m.posthog.com` instead of `posthog.com`). We strongly recommend selecting "Create DKIM Authority" (and using 2048 bits) to prevent spoofing with your domains (read more about [DKIM](https://en.wikipedia.org/wiki/DomainKeys_Identified_Mail)). See sample configuration below:

    ![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/configuring-posthog/mailgun-1.png)

1. You will now be given instructions to set up certain DNS records in your domain. Please be sure to add **all requested records** to ensure proper email deliverability. If not provided, we also recommend adding the following [SPF](https://en.wikipedia.org/wiki/Sender_Policy_Framework) record to prevent email forgery with your domain.

    ```
    TXT @ v=spf1 include:mailgun.org ~all
    ```

1. Once you have added all records and verify them you can go to the domain settings > "SMTP credentials" section. You then need to create a set of SMTP credentials.

1. With the SMTP credentials, you can now set the required settings for email to work properly. You will also need to obtain the hostname from the credentials page. Your configuration should now look something like this.
    ```yaml
    EMAIL_HOST: smtp.eu.mailgun.org # obtained from credentials page
    EMAIL_PORT: 587
    EMAIL_HOST_USER: postmaster@m.example.com # obtained from credentials page
    EMAIL_HOST_PASSWORD: password # obtained from credentials page
    EMAIL_USE_TLS: true
    EMAIL_USE_SSL: false
    EMAIL_DEFAULT_FROM: hey@example.com # you can define this, just use your domain
    SITE_URL: https://posthog.example.com # this is the URL of your instance
    ```

1. Test your integration! Whenever updating email settings, we will attempt to send you a test email so you can assert everything is working as expected. Please note that if you update these settings via environment variables, you need to restart your server and test sending an email (e.g. request a password reset).
    > Remember that you will need to restart **both your web server and background worker** for this to work properly.


[dkim]: https://en.wikipedia.org/wiki/DomainKeys_Identified_Mail
[spf]: https://en.wikipedia.org/wiki/Sender_Policy_Framework
