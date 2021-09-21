---
title: Organizations and projects
sidebar: Docs
showTitle: true
---

PostHog gives you tools for data access control and logical separation of data: organizations and projects.

## Organizations

An organization is the largest building block of PostHog's structure: it's made up of projects and has PostHog users as members. 
Each organization member has an organization-wide [access level](#access-levels) dictating their ability to perform certain actions.

Most commonly a PostHog organization represents a real-world company, but this isn't a requirement and you are free to gather people any way you see fit.

As a brand new PostHog user you'll always find yourself in a single organization upon account creation.
If you've joined from an invite, that will be the organization you've been invited to.
Otherwise, you'll become the Owner of a new organization created just for you, based on the company name you provided when creating the account.

To switch between organizations, navigate to the current organization's settings, or to create new projects, use the account dropdown on the right of the top bar.

> **Note:** As a PostHog Cloud user, you can create, manage, and join organizations without limits forever. For self-hosted PostHog, however, multiple organizations belong to our premium team-oriented offering. To use this feature, [contact us for a self-hosted license](/pricing).

### Notifications

By default every time a member joins an organization in an [email-enabled PostHog instance](/docs/self-host/configure/email) (including PostHog Cloud), all existing members of the organization get notified about this with an email. This increases security by making it explicit who gains access to your product data.

If you'd rather not get such notifications, you can disable setting "Email all current members when a new member joins" in the "Notification Preferences" section of organization settings.

### Adding new members

Any organization member can create organization invites. Such an invite is valid **for 3 days** after creation and **only for the specified email**.

If there's no account associated with that email, the invited person will have to create an account. Otherwise, they'll be able to join with their existing account.

Newly-joined users get the basic Member access level.

## Projects

A project is a silo of data within PostHog. All data belongs to a single project and all queries are project-specific.

Every project has its own distinct write-only token, which you can use to initialize your [integration of choice](/docs/integrate), as well as to connect to our [API](/docs/api). You can always regenerate this token, but keep in mind that the old one will be immediately revoked.

Every new organization (including the one created for you on account creation) comes with a fresh project named "Default Project". You can rename or delete it as you see fit.

To switch between projects, navigate to project settings, or to create new projects, use the project switcher in the middle of the top bar. You can also quickly go to the current project's settings from the sidebar.

> **Note:** Multiple projects within an organization belong to our premium team-oriented offering. To use this feature, [set up PostHog Cloud billing](https://app.posthog.com/organization/billing) or [contact us for a self-hosted license](/pricing).

### Ways of organizing projects

There are several practical ways of using projects:

- A project per environment – you may want to test out analytics instrumentation in development or staging environments, while keeping that test data separate from production.
- A project per product – if you have several unlinked products, it makes sense to reflect that separation in PostHog too.
- A project per multiple products or the whole company – if your offering is interlinked or you want to track the user journey holistically (e.g. how many company blog readers convert to paid product users), you can use a single project for all digital assets.

Which way is the best fit for you depends on the characteristics of your product and business.

## Permissions

By default all organization members have access to all its projects, at their organization-wide access level.
This makes for the smoothest collaboration. However, if you require access to data to be more granular, see [Project-based permissioning](#project-based-permissioning) below.

### Access levels

There are three access levels in PostHog, each with more privileges than the one below it. There can be any number of members at each level, except Owner, of which there is always one in the organization.

See permissions at each level below:

| | Member (base level) | Administrator (elevated level) | Owner (unique top level) |
| --- | --- | --- | --- |
| Viewing and querying project data | ✅ | ✅ | ✅ |
| Leaving the organization | ✅ | ✅ | ✅ |
| Inviting new members | ✅ | ✅ | ✅ |
| Billing management | ✅ | ✅ | ✅ |
| Project creation and deletion | ❌ | ✅ | ✅ |
| Project settings management (incl. [project-specific membership](#project-based-permissioning)) | ❌ | ✅ | ✅ |
| Organization settings management (incl. membership) | ❌ | ✅ | ✅ |
| Organization deletion | ❌ | ❌ | ✅ |

Access levels can be viewed and changed in the Members section of organization settings.

In projects with [project-based permissioning](#project-based-permissioning), there's also a Members section in project settings, which pertains to project-specific memberships.

### Project-based permissioning

If you'd like to restrict access to data within the organization to only those who need it, you can use PostHog's project-based permissioning.

**Enable project-based permissioning** is a switch in project settings that can be turned on (or off) at any time by organization-wide Administrators and the Owner.

With project-based permissioning only organization-wide Administrators and the Owner have implicit access to projects.
Lower-level Members need to be added explicitly in project settings. Those that haven't been added cannot access the project at all, in any way.
At the same time project-based permissioning allows you to grant members project-specific access _higher_ than their organization-wide level.

> **Note:** Project-based permissioning belongs to our premium team-oriented offering. To use this feature, [set up PostHog Cloud billing](https://app.posthog.com/organization/billing) or [contact us for a self-hosted license](/pricing).
