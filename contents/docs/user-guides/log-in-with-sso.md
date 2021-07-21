---
title: Login with SSO
sidebar: Docs
showTitle: true
---

If you want to make it really easy for your users to log in, you can add one-click login with SSO.

PostHog currently supports the following SSO providers:

## GitHub

1. Go to <a href='https://github.com/settings/applications/new' target='_blank'>Register a new OAuth application</a>

> If you want to have this application as part of an organisation, you'll need to go to your organization's settings -> OAuth apps -> New OAuth App.

2. Register your application
    - `Homepage URL` needs to be the url of your PostHog instance
    - `Autherization callback URL` needs to be the url of your PostHog instance + `/complete/github/`

3. Find your `Client ID` and `Client Secret`

4. Add those two settings as `SOCIAL_AUTH_GITHUB_KEY` and `SOCIAL_AUTH_GITHUB_SECRET` and restart your server.

5. When logging in, or signing up to a team you can now log in using PostHog!

> We don't support logging in with GitHub when setting up PostHog for the very first time.

## GitLab

1. Go to `settings -> applications` in your GitLab instance (<a href='https://gitlab.com/profile/applications' target='_blank'>click here for GitLab.com</a>)

2. Register your application
    - Redirect URI needs to be the url of your PostHog instance + `/complete/github/`
    - Tick `read_user` as scope.

3. Find your `Application ID` and `Secret`

4. Add those two settings as `SOCIAL_AUTH_GITLAB_KEY` and `SOCIAL_AUTH_GITHUB_SECRET`. If you're hosting GitLab yourself you'll also need to add `SOCIAL_AUTH_GITLAB_API_URL`, which is the full URL to your GitLab instance.

> We don't support logging in with GitLab when setting up PostHog for the very first time.