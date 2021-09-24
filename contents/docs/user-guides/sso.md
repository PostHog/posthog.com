---
title: Single sign-on authentication
sidebar: Docs
showTitle: true
---

If you want to make it really easy for your users to log in, or have some compliance requirements around user access/provisioning you can add one-click login with single sign-on (SSO). In addition to supporting log in with third-party providers, we also allow automatic provision of users. This means that your team members can create their account self-serve (see below).

<table>
    <thead>
        <tr>
            <td>Provider</td>
            <td>Login</td>
            <td>Automatic user provisioning</td>
            <td>Support</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="#github">GitHub</a></td>
            <td>✅</td>
            <td>✅</td>
            <td>PostHog Cloud and self-hosted</td>
        </tr>
         <tr>
            <td><a href="#gitlab">GitLab</a></td>
            <td>✅</td>
            <td>✅</td>
            <td>PostHog Cloud and self-hosted</td>
        </tr>
        <tr>
            <td><a href="#google">Google</a> (🔒 Premium)</td>
            <td>✅</td>
            <td>✅</td>
            <td>PostHog Cloud and self-hosted</td>
        </tr>
        <tr>
            <td><a href="#saml">SAML</a> (🔒 Premium)</td>
            <td>✅</td>
            <td>✅</td>
            <td>Self-hosted <b>only</b></td>
        </tr>
    </tbody>
</table>

### Automatic user provisioning

When you enable automatic user provisioning you set a list of **whitelisted domains**. Whenever a user logs in for the first using the third-party provider you enabled, if their provider-validated email address matches your whitelisted domain, an account will be automatically created for them in the organization.

To enable this, navigate to your organization settings (`/organization/settings#domain-whitelist`) and add the domains for which you want to enable automatic user provisioning.

## Third-party providers

PostHog currently supports the SSO providers listed below.  
Looking for a provider and it's in here? [Reach out to us](https://posthog.com/support), we might be able to help.

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
<b>Please note SSO with Google is a 🔒 premium feature of PostHog</b> and requires either a PostHog Cloud plan (credit card connected) or a PostHog Scale license.
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


## SAML

<blockquote class="warning-note">
<b>Please note SSO with SAML is a 🔒 premium feature of PostHog</b> and requires a <a href="https://posthog.com/pricing" target="_blank" rel="noopener">PostHog Scale</a> license. In addition, <b>SAML is only supported on PostHog self-hosted</b>.
</blockquote>

SAML (Security Assertion Markup Language) enables users to have a single set of credentials to access multiple systems. It also has the benefits of centralizing user management to aid maintenance. If your company has an Identity Provider (IdP) that uses SAML, you can integrate it with PostHog (Service Provider, SP) so your users can authenticate through your SAML portal instead of having an additional password for PostHog.

### Warnings
When using SAML to authenticate your users in PostHog there are a few considerations to keep in mind. Please make sure to read them to avoid any security issues.
1. **Only use SAML with identity providers that validate the user's email address** or in a context where you control a user's email address. When first logging in, we use the email address that the IdP passes to associate with a user. If a user can spoof their email address with your IdP, they'll be able to impersonate your users.
2. Enabling or enforcing **SAML login will not disable Personal API Key usage**. This means that even users can always create a Personal API Key and use it instead of SAML authentication (API-only, not for the app).
3. Our SAML integration only handles authentication and automatic user provisioning. If you remove a user from your IdP, their account will not be removed or disabled from PostHog, they might just be unable to log in (depending on your configuration).
4. When you enable or enforce SAML, any existing user passwords are preserved. This means if you ever want to go back (or something breaks down with your authentication), you can just stop enforcing SAML and you'll be able to log in with your existing credentials.

### Setting up SAML

> SAML requires certain C dependencies that are installed at the OS-level. These dependencies come bundled by default in the main Docker image. If you wish to exclude these dependencies please set environment variable `SAML_DISABLED=1` or build argument `saml_disabled=1`.


<blockquote class="warning-note">
⚠️ SAML is currently <b>not supported on Heroku</b> deployments. We recommend using DigitalOcean, AWS or GCP for enteprise-grade deployments (see <a href="/docs/self-host" target="_blank">deployment docs</a>).
</blockquote>

For SAML to work your IdP and PostHog (SP) need to exchange information. To do this, you need to configure some settings in your IdP and on PostHog. Depending on your IdP you might need to pass PostHog information first, or the other way around. See details below.
1. Make sure you have properly set up your `SITE_URL` [environment variable][env-vars] configuration.
2. You will need to be running your PostHog instance over TLS.
3. Register a new SAML 2.0 application with your IdP. If you need to pass PostHog's information to your provider first, set the following values below (alternatively if your IdP supports it, you can obtain our XML metadata from `<yourdomain>/api/saml/metadata/`)
    - **Single Sign On URL** (also called ACS Consumer URL): `<yourdomain>/complete/saml/`
    - **Audience or Entity ID**: _Your Site URL_ value (verbatim)
    - **RelayState**: `posthog_custom`
4. For SAML to work properly with PostHog, we need to receive at least the following information from your IdP in the SAML assertion payload: ID, email and first name. Optionally, you can also pass the last name. By default, PostHog expects these attributes with a certain name, but you can customize it.

<table>
    <tr>
        <td>Attribute</td>
        <td>Default name on PostHog</td>
        <td>Environment variable</td>
        <td>Optional?</td>
    </tr>
    <tr>
        <td>Permanent ID</td>
        <td><code>name_id</code></td>
        <td><code>SAML_ATTR_PERMANENT_ID</code></td>
        <td>❌ No</td>
    </tr>
    <tr>
        <td>Email</td>
        <td><code>email</code></td>
        <td><code>SAML_ATTR_EMAIL</code></td>
        <td>❌ No</td>
    </tr>
    <tr>
        <td>First (Given) Name</td>
        <td><code>first_name</code></td>
        <td><code>SAML_ATTR_FIRST_NAME</code></td>
        <td>❌ No</td>
    </tr>
    <tr>
        <td>Last Name (Surname)</td>
        <td><code>last_name</code></td>
        <td><code>SAML_ATTR_LAST_NAME</code></td>
        <td>✅ Yes</td>
    </tr>
</table>

If your IdP does not send these attributes based on the default name on PostHog you have two options. Either adjust your IdP configuration to send the attributes with PostHog's default name, or set the respective environment variable (as noted above) to the attribute name your provider uses.

3. You will now need to obtain some parameters from your IdP and configure them in PostHog as [environment variables][env-vars]. Depending on your provider, they may only provide this information as an XML metadata file. If this is the case, you can open the file in a text editor and obtain the required values from there.
    - `SAML_ENTITY_ID`: Will be identified as EntityID or IdP issuer. This can vary greatly between providers, but it usually looks like a URL.
    - `SAML_ACS_URL`: The endpoint to which the SAML requests are posted. It's usually called SAML endpoint  or IdP sign-on URL.
    - `SAML_X509_CERT`: The public certificate used to validate SAML assertions from your IdP. It must be in X509 (almost all providers will provide it in this format). If your provider gives you the certificate as a file (usually `.pem`), just open it with a text editor to get the contents. When setting this certificate be sure to keep any spaces and new lines (don't format it). The first and last line of the certificate (`-----BEGIN CERTIFICATE-----`) are optional.

4. Once you've configured all the settings above, you can now visit `<yourdomain>/login/saml/?idp=posthog_custom` (note the trailing slash and the query string) and you should be redirected to your IdP's login page. Upon completion, you'll find yourself in PostHog, fully authenticated.

5. For security reasons, we don't output errors directly in your browser when something goes wrong. If you get an error in the process and you need to debug on PostHog's side you have two options:
    - **Recommended**. Check your app logs (this varies depending on your deployment). Any errors will be logged there.
    - If everything else fails, **temporarily** set environment variable `DEBUG=1`, errors will be fully displayed now in the browser. **Please be sure to remove this once you're done, ugly things can happen if you don't.**

### Enforcing SAML

<blockquote class="warning-note">
Do not enforce SAML until you have tested everything works correctly or you'll be locked out. Disable enforcing and visit <code>/login</code> if you get locked out.
</blockquote>

To remove the burden of having to manage users in multiple places or if your company has certain internal policies or IT compliance requirements, you may want to make sure access to PostHog is limited only through SAML authentication. This is quite easy to accomplish, just set the [environment variable][env-vars]: `SAML_ENFORCED=1`. Only do this after you've made sure SAML works as expected.

Finally, please do consider [warning #2](#warnings) above. Enforcing SAML will **not prevent Personal API Key** usage. It will only disable password-based login.


### SAML user provisioning
When a user (team member) logs in using SAML, we'll use their email address (and IdP's `nameID`, if different from email address) to match with their PostHog account. If the user has no account in your PostHog instance, we'll create one for them. Different from other SSO providers that PostHog supports, users who log in with SAML will **always get an account created.**

By default, users will be signed up to the default organization in the instance. If you want users to be added to a specific organization instead, you can either set a domain whitelist for the relevant org or send an invite to the specific user.

### Example: OneLogin
<div id="onelogin"></div>

#### OneLogin quick setup
You can quickly connect OneLogin and PostHog by using the prebuilt integration.
1. In OneLogin admin, go to Applications and click on "Add App". Search for "PostHog" and create your app.
1. Go to the "Configuration" tab and where it says "PostHog domain name" enter your PostHog's instance domain (as it's also specified in the `SITE_URL` [environment variable][env-vars]), **but don't include any protocol or trailing slashes.** Examples: `playground.posthog.com`, `myposthog.mydomain.com`, `myposthogdomain.com`.
2. Go to the "SSO" tab. This is where you'll obtain the information you need to pass to PostHog.
    - "Issuer URL" needs to be set as `SAML_ENTITY_ID`.
    - "SAML 2.0 Endpoint (HTTP)" needs to be set as `SAML_ACS_URL`.
    - On "X.509 Certificate" click on "View Details". Copy the full certificate and set it as `SAML_X509_CERT`.
3. You're good to go! Click on the "Login with SSO" in PostHog's login page or navigate to `<yourdomain>/login/saml/?idp=posthog_custom` to test.

#### OneLogin advanced
Use this option if you want to add additional configurations to your app that are not supported with the default app catalog.

1. In OneLogin admin, go to Applications and click on "Add App".
2. Search for "SAML" and select "SAML Custom Connector (Advanced)". Set name to "PostHog".
3. Go to the "Configuration" tab and edit the following attributes (leave everything else as default)
    - RelayState: Set to `posthog_custom`
    - Audience (EntityID): Set to the exact 
    same value as your `SITE_URL` [environment variable][env-vars].
    - ACS (Consumer) URL Validator: Set to a regex that only matches `<yourdomain>/complete/saml/`. For instance: `^https:\/\/app.posthog.com\/complete\/saml\/$`
    - ACS (Consumer) URL: Set to `<yourdomain>/complete/saml/`.
4. Go to the "Parameters" tab. You will add the following parameters. **Be sure to check "Include in SAML assertion"**.
    - `email` to match the user's email ("Email")
    - `first_name` to match the user's first name ("First Name")
    - `last_name` to match the user's last name ("Last Name")
5. Go to the "SSO" tab. This is where you'll obtain the information you need to pass to PostHog.
    - "Issuer URL" needs to be set as `SAML_ENTITY_ID`.
    - "SAML 2.0 Endpoint (HTTP)" needs to be set as `SAML_ACS_URL`.
    - On "X.509 Certificate" click on "View Details". Copy the full certificate, removing the first and last lines and set it as `SAML_X509_CERT`
6. You're good to go! Navigate to `<yourdomain>/login/saml/?idp=posthog_custom` to test or click on the "Login with SSO" in the login page.


### Example: Okta
We're working with the Okta team to add PostHog to their Integration Catalog and simplify your set up experience. In the meantime, you'll find some pointers on how to connect Okta to PostHog below.

1. In Okta admin, go to Applications and click on "Create App Integration".
2. Select the "SAML 2.0" option. In the next step, set "PostHog" as the name.
3. Fill in the following attributes in the SAML settings. Do not click next yet.
    - In "Single sign on URL" enter `<yourdomain>/complete/saml/`.
    - In "Audience URI (SP Entity ID)" enter the exact same value as your `SITE_URL` environment variable.
    - In "Default RelayState" type `posthog_custom`.
4. In the "Attribute Statements" section, you'll add the following attributes.
    - `email` with value `user.email`
    - `first_name` with value `user.firstName`
    - `last_name` with value `user.lastName`
5. In the final step just select option "I'm an Okta customer adding an internal app".
6. Navigate now to the "Sign On" tab of the application and click on "View Setup Instructions". This is where you'll obtain the information you need to pass to PostHog.
    - "Identity Provider Single Sign-on URL" needs to be set as `SAML_ACS_URL`.
    - "Identity Provider Issuer" needs to be set as `SAML_ACS_URL`.
    - "X.509 Certificate" needs to be set as `SAML_X509_CERT` (removing first and last lines).
7. You're good to go! Navigate to `<yourdomain>/login/saml/?idp=posthog_custom` to test.

[env-vars]: /docs/self-host/configure/environment-variables