---
title: Organizations and projects
sidebar: Docs
showTitle: true
---

For a user experience that scales for all your needs, PostHog implements the concepts of organizations and projects.

## Organizations

An organization is the largest building block of PostHog's structure: it's made up of projects and has PostHog users as members.

Most commonly a PostHog organization represents a real-world company. But this isn't a requirement and you are free to gather people any way you see fit.

As a brand new PostHog user you'll always find yourself in a single organization upon account creation.
If you've joined from an invite, that will be the organization you've been invited to.
Otherwise you'll become the Owner of a new organization created just for you, based on the company name you provided when creating the account.

To switch between organizations, to go the current organization's settings, or to create new projects, use the account dropdown on the right of the top bar.

> **Note:** As a PostHog Cloud user, you can create, manage, and join organizations without limits forever. For self-hosted PostHog, however, multiple organizations belong to our premium team-oriented offering. To use this feature, [contact us](https://share.hsforms.com/1-IVCY9gNRvaZBajMt_UPIg4559u) for a self-hosted license.

### Notifications

By default every time a member joins an organization in an [email-enabled PostHog instance](/docs/self-host/configure/email) (including PostHog Cloud), all existing members of the organization get notified about this with an email. This increases security by making it explicit who gains access to your product data.

If you'd rather not get such notifications however, you can simply disable setting "Email all current members when a new member joins" in section "Notification Preferences" of organization settings.

### Adding new members

Any organization member can create organization invites. Such an invite is valid **for 3 days** after creation and **only for the specified email**.

If there's no account associated with that email, the invited person will have to create an account. Otherwise they'll be able to join with their existing account.

Newly-joined users get the basic Member access level.

## Projects

A project is a silo of data within PostHog. All data belongs to a single project and all queries are project-specific.

Every project has its own distinct write-only token, which you can use to initialize your [integration of choice](/docs/integrate), as well as to connect to our [API](/docs/api). You can always regenerate this token, but keep in mind that the old one will be immediately revoked.

Every new organization (including the one created for you on account creation) comes with a fresh project named "Default Project". You can then rename or delete it as you see fit.

To switch between projects, to go their settings, or to create new projects, use the project switcher in the middle of the top bar. You can also quickly go to the current project's settings from the sidebar.

> **Note:** Multiple projects within an organization belong to our premium team-oriented offering. To use this feature, [set up PostHog Cloud billing](https://posthog.com/pricing) or [contact us](https://share.hsforms.com/1-IVCY9gNRvaZBajMt_UPIg4559u) for a self-hosted license.

### Ways of organizing projects

There are several practical ways of using projects:

- A project per environment – you may want to test out analytics instrumentation in development or staging environments, while keeping that test data separate from production.
- A project per product – if you have several unlinked products, it makes sense to reflect that separation in PostHog too.
- A project per multiple products or the whole company – if your offerring is interlinked or you want to track the user journey holistically (e.g. how many company blog readers convert to paid product users), you can use a single project for all that.

## Permissioning

Each organization member has an organization-wide [access level](#access-levels) dictating their ability to perform certain actions.

By default all organization members have access to all its projects, at their organization-wide access level.
This makes for the smoothest collaboration. However, if you require access to data to be more granular, see section [Per-project access](#per-project-access) below.

### Access levels

There are 3 access levels in PostHog, each with more privileges than the one below it. From the bottom up:

1. **Member** – default level:
  - has full access to analytics features
  - can create projects (if per-project access not enabled), but not delete them 
  - can leave the organization
  - can invite new members to the organization, but not remove them
  - has access to billing management

2. **Administrator** – elevated level, like Member plus:
  - can always create and delete projects
  - cam manage access levels of other members
  - can add and remove other members from projects (if per-project access mode enabled)
  - can remove other members from the organization

3. **Owner** – unique top level, like Administrator plus:
  - can delete the organization
  - cannot leave the organization
  - can pass ownership to someone else, ridding themselves of it

### Per-project access

If you'd like to restrict access to data within the organization to only those who need it, you can easily do that by enabling setting **Per-project access** in organization settings.

With **Per-project access** enabled, nothing changes for organization members at or above Administrator level, but those below – ordinary Members – lose default access to projects.
Access to each project can then be granted individually only for members who need it, in project settings.

In this mode you can also grant members project-specific access level that is _above_ their organization-wide one. In such case they will have privileges of the higher level, but only for that specific project.
