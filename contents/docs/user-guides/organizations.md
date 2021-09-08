---
title: Organizations
sidebar: Docs
showTitle: true
---

For a user experience that scales for all your needs, PostHog implements the concept of organizations.
An organization is the largest building block of PostHog's structure: it contains projects and is made up of one or more PostHog users.

## Projects

By default an organization only has the default project. For more on projects [take a look at their dedicated page](/docs/user-guides/projects).

### Segregating data into multiple projects

The data you send to one project is completely segregated from the others, which requires you to have a think about what data should go where. In general, we recommend using multiple projects to do the following, for example:

- Keep data from different environments separate (e.g. dev, prod, and staging): You don't want your staging data mixed with data from real users!
- Completely separate products: If you have a mobile app and a web app for the same product, it makes sense to keep all this data in one project, so you can analyze users across these different facets of the same product. However, if your company has multiple standalone products, you should probably consider having a project per product.

## Cloud vs. self-hosted

On PostHog Cloud, billing is per-organization with premium features pertaining specifically to the billed organization.
As for PostHog Cloud users, they may belong to any number of organizations at the same time, from none to multiple.

Self-hosted PostHog works a bit differently, though practically it's very similar: billing is per-instance, but a self-hosted instance can only have a single organization. As self-hosted users can only belong to the single company organization, they can easily be accounted for.

## New accounts

As a brand new PostHog user you'll always find yourself in a single organization upon account creation. If you've joined from an invite, that will be the organization you've been invited to. Otherwise a new organization will be created just for you, based on the company name you provided when creating the account.

## Members and permissioning

An organization can have any number of members, besides the constraint that there always must be a single Owner.

Members have varying access levels with different implications. From the bottom up:

1. **Member** – plain organization member:
  - has full access to analytics features
  - can create projects, but not delete them
  - can leave the organization
  - can invite others, but not remove them
  - has access to billing management


2. **Administrator** – high-level organization member, like Member plus:
  - can delete projects
  - cam manage access levels of all members besides themselves and the Owner
  - can remove other members


3. **Owner** – unique top-level organization member, like Administrator plus:
  - can delete the organization
  - cannot leave the organization
  - can pass ownership to someone else, ridding themselves of ownership

## Invitations

Any organization member can create organization invites. Such an invite is valid for 3 days after creation and **only for the specified email**.

If there's no account associated with that email, the invited person will have to create an account. Otherwise they'll be able to join with their existing account.

Newly-joined users get the basic Member access level.

> **Note:** As a PostHog Cloud user, you can create, manage, and join organizations without limits forever. However multiple organizations per self-hosted PostHog instance belong to our premium team-oriented offering. To use this feature, [contact us](https://share.hsforms.com/1-IVCY9gNRvaZBajMt_UPIg4559u) for a self-hosted license.
