---
title: Single sign-on authentication
sidebar: Docs
showTitle: true
---

If you want to make it really easy for your users to log in, or have some compliance requirements around user access / provisioning you can add one-click login with single sign-on (SSO). In addition to supporting log in with third-party providers, we also allow automatic provision of users. This means that your team members can create their account self-serve (see below).


<table>
    <thead>
        <tr>
            <td>Provider</td>
            <td>Login</td>
            <td>Automatic user provisioning</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="#github">GitHub</a></td>
            <td>✅</td>
            <td>✅</td>
        </tr>
         <tr>
            <td><a href="#gitlab">GitLab</a></td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td><a href="#google">Google</a> (🔒 Premium)</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
    </tbody>
</table>


### Automatic user provisioning

When you enable automatic user provisioning you set a list of **whitelisted domains**. Whenever a user logs in for the first using the third-party provider you enabled, if their provider-validated email address matches your whitelisted domain, an account will be automatically created for them in the organization.

To enable this, navigate to your organization settings (/organization/settings#domain-whitelist) and add the domains for which you want to enable automatic user provisioning.


## Providers

PostHog currently supports the following SSO providers. Looking for a different provider? [Reach out](https://posthog.com/support) we might be able to help!


<blockquote>
Please note that you will <b>not</b> be able to use SSO with the first user of your instance. You will have to create a user with a regular password and you will later be able to log in with SSO (even for that first user).
</blockquote>

### GitHub

1. Go to <a href='https://github.com/settings/applications/new' target='_blank'>Register a new OAuth application</a>

> If you want to have this application as part of an organisation, you'll need to go to your organization's settings -> OAuth apps -> New OAuth App.

2. Register your application
    - `Homepage URL` needs to be the url of your PostHog instance
    - `Autherization callback URL` needs to be the url of your PostHog instance + `/complete/github/`

3. Find your `Client ID` and `Client Secret`

4. Add those two settings as `SOCIAL_AUTH_GITHUB_KEY` and `SOCIAL_AUTH_GITHUB_SECRET` and restart your server.

5. When logging in, or signing up to a team you can now log in using PostHog!

> We don't support logging in with GitHub when setting up PostHog for the very first time.

### GitLab

1. Go to `Settings -> Applications` in your GitLab instance (<a href='https://gitlab.com/profile/applications' target='_blank'>click here for GitLab.com</a>)

2. Register your application
    - Redirect URI needs to be the url of your PostHog instance + `/complete/github/`
    - Tick `read_user` as scope.

3. Find your `Application ID` and `Secret`

4. Add those two settings as `SOCIAL_AUTH_GITLAB_KEY` and `SOCIAL_AUTH_GITHUB_SECRET`. If you're hosting GitLab yourself you'll also need to add `SOCIAL_AUTH_GITLAB_API_URL`, which is the full URL to your GitLab instance.


### Google

<blockquote class="warning-note">
<b>Please note SSO with Google is a 🔒 premium feature in PostHog</b> and requires either a PostHog Cloud plan (with a credit card registered) or a Scale plan.
</blockquote>

To set up Google SSO please follow these instructions:

1. Go to the "Google Developer Console" at <a href="https://console.cloud.google.com/apis/dashboard" target="_blank" rel="noopener noreferrer">https://console.cloud.google.com/apis/dashboard</a>. Be sure to select the proper Google account and the right project for your app (or create one if you don't have it).
2. Navigate to the [Credentials](https://console.cloud.google.com/projectselector2/apis/credentials) section.
3. Click on "Create credentials" and select "OAuth client ID" to generate your credentials.
    - On Application Type select "Web application" and enter a meaningful name (e.g. PostHog Self-hosted).
    - On the "Authorized JavaScript origins" section add the root domain (with protocol) for your PostHog instance (e.g. `https://app.posthog.com`)
    - On the "Authorized redirect URIs" section add the following URI (**replace with your hostname**): `https://{hostname}/complete/google-oauth2/`.
    - Click on Save.
4. You will now get a "Client ID" and "Client secret". Set those as [environment variables](/docs/self-host/configure/environment-variables) `SOCIAL_AUTH_GOOGLE_OAUTH2_KEY` and `SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET` respectively.
5. **Additional**. If this is your first time setting SSO for this project, you may need to set up some additional configuration for your OAuth Consent Screen. We **highly recommend you only enable internal access** (if it makes sense for you), as it'll make things more secure and the verification process faster. Check out <a href="https://support.google.com/cloud/answer/10311615" target="_blank" rel="noopener noreferrer">Google's official docs</a> to learn more.
