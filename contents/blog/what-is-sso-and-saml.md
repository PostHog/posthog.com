---
date: 2022-10-31
title: What is SSO and why you should enable it for PostHog
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/posthog-blog-image.png
featuredImageType: full
category: Using PostHog
tags:
  - Explainers
---

Existing at an intersection of convenience and security, single sign-on (SSO) authentication is used and appreciated by both IT teams _and_ everyday users — which is why we strongly recommend setting it up on new PostHog instances. In this article we’ll explain what SSO and SAML are, and why you should use it.

> **Ready to get started?** Check [PostHog’s authentication docs](/manual/sso) for instructions on setting up SSO and SAML. 

## What is SSO?
SSO stands for Single Sign-On. It enables users to login to services without entering a service-specific password — instead, access is validated by their access to a secondary system or domain. Ever logged into a website using your Google or Facebook account? _That’s_ SSO. 

Administrators and IT teams often encourage SSO for security purposes, as it ensures only authorized users can access an account. A simple username and password often isn't secure enough. We use SSO at PostHog for this reason and offer support for it via authorized email domains and certain third-party providers — namely Google, GitLab, and GitHub.

PostHog also offers [just-in-time provisioning](/manual/sso#just-in-time-user-provisioning), which automatically creates a new account whenever new users access PostHog — provided that they have a valid email address and SSO provider, of course.

## What is SAML?
SAML, on the other hand, stands for Security Assertion Markup Language. It’s one of the underlying technologies which makes SSO possible and enables team members to use a single set of login credentials across multiple systems. In PostHog, you can use multi-tenant SAML to support many authentication servers at once and integrate Identity Providers, such as OneLogin or Okta. 

> Some SSO and SAML features are intended for use in large organizations and are only available on Enterprise or paid PostHog plans. For a comprehensive explanation of which features are available on each plan, refer to the [authentication docs](/manual/sso).

## Why is SSO useful for teams??

SSO and SAML are typically useful for three main reasons… 

- They make logging in to services easier for users (fewer passwords to remember)
- They make managing accounts easier for IT teams (fewer passwords to reset)
- They make it harder to engage in bad practices (fewer shared passwords)

Additionally, SSO and SAML may be required in some organizations which need to comply with regulations that govern how users are provisioned and access is tracked. For this reason, some SSO and SAML features are limited to users on paid or Enterprise plans. 

## How to set up SSO and SAML on PostHog

SSO is available for all versions of PostHog, including self-hosted deployments — however some SSO features, such as Google SSO, are limited to paid or Enterprise plans because they are intended for use in large organizations. 

Likewise, SAML features are intended for use in large teams and therefore only available on Enterprise plans. 

For more information about which SSO and SAML features are available for which PostHog plans, and instructions on how to set up third-party SSO providers, check [the PostHog SSO docs](/manual/sso). 
