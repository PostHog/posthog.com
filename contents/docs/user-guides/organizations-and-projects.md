---
title: Organizations and projects
sidebar: Docs
showTitle: true
---

PostHog gives you tools for data access control and logical separation of data: organizations and projects.

## Organizations

An organization is the highest abstraction level within a PostHog instance. It's made up of projects (see more on them [below](#projects)) and members.
Most commonly a PostHog organization represents a real-world company or other type of isolated grouping.

To switch between organizations, to open the current organization's settings, or to create a new organization, use the account dropdown on the right of the top bar.

> **Note:** As a PostHog Cloud user, you can create, manage, and join organizations without limits. For self-hosted PostHog, however, multiple organizations belong to our premium team-oriented offering. To use this feature, [contact us for a self-hosted license](/pricing).

### Notifications

By default every time a member joins an organization in an [email-enabled PostHog instance](/docs/self-host/configure/email) (including PostHog Cloud), all existing members of the organization get notified about this with an email. This increases security by making it explicit who gains access to your product data.

If you'd rather not get such notifications, you can disable them in the "Notification Preferences" section of organization settings.

### Adding new members

Any organization member can create organization invites. Such an invite is valid **for 3 days** after creation and **only for the specified email**.
In an [email-enabled PostHog instance](/docs/self-host/configure/email) (including PostHog Cloud) the invite is sent automatically to the specified email. If the PostHog instance can't send emails, remember to share the invite link yourself.

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

By default all organization members have access to all its projects. Their permissions are then dicated by their organization-wide access level.

This makes for the smoothest collaboration. However, if you require access to data to be more granular, see [private projects](#private-projects).

### Access levels

There are three access levels in PostHog: Member, Administrator, and Owner.
Please note that an organization must have one and only one Owner.

See permissions at each level below:

| | Member (base level) | Administrator | Owner |
| --- | --- | --- | --- |
| Viewing and querying project data | ✅ | ✅ | ✅ |
| Inviting new members | ✅ | ✅ | ✅ |
| Billing management | ✅ | ✅ | ✅ |
| Project creation and deletion | ❌ | ✅ | ✅ |
| Project settings management (incl. [project-specific memberships](#project-based-permissioning)) | ❌ | ✅ | ✅ |
| Organization settings management (incl. memberships) | ❌ | ✅ | ✅ |
| Leaving the organization | ✅ | ✅ | ❌ |
| Transferring ownership | ❌ | ❌ | ✅ |
| Organization deletion | ❌ | ❌ | ✅ |

Access levels can be viewed and changed in the Members section of organization settings.

### Private projects

If you'd like to restrict access to data within the organization to only those who need it, you can make a project _private_. Projects with this setting enabled become **secret by default and invite-only** (except for Administrators and the Owner, who get access implicitly).

Any Administrator or Owner can make a project private or open at any time in the Access Control section of project settings.

Regular organization Members can be made project Administrators, giving them elevated permissions just inside the project.

> **Note:** Private projects belong to our premium team-oriented offering. To use this feature, [set up PostHog Cloud billing](https://app.posthog.com/organization/billing) or [contact us for a self-hosted license](/pricing).
