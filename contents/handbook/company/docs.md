---
title: Documentation
sidebar: Handbook
showTitle: true
---

## Responsibilities

* **Product teams** are responsible for ensuring their docs are up-to-date. This means:
  * Documenting new features when they're launched.
  * Correcting mistakes reported by users.
  * Clarifying documentation based on user feedback and support tickets.
  * Ensuring public betas have documentation which is linked to from feature preview menu

* **Content marketing** is responsible for improving the docs. This means:
  * Reviewing draft documentation created by product teams.
  * Identifying and improving low quality documentation.
  * Ensuring screenshots and other visual elements are up-to-date.
  * Shipping supplementary docs and tutorials based on feedback and emerging use cases.

* **Website & Docs** is responsible for design, organization, and discovery. This means:
  * The design and content of index pages.
  * The overall layout of docs and how they're organized.
  * In-page elements and components – e.g. light and dark mode screenshots.
  * Website search and other elements that help users find the answers they need.

## Frequently asked questions

### I'm really busy, can the content team write docs for me?

No. The content team isn't big enough to own all documentation. It also lacks the context necessary to document new features. First drafts of documentation must always come from the relevant product team.

If you need help updating documentation:

- Write a draft that covers the basics, which the content team can then help review and polish.
- In the event multiple docs pages need updating, create an example of changes needed and then request help to complete the rest.

**Bottom line:** It's much easier for the content team to improve a draft than write completely new documentation, especially when documenting new features. Pull requests > Issues.

### Who should review docs updates?

For larger updates, please tag Lior and/or Ian from the content team, and Cory from the Website & Docs team, in addition to other relevant team members.

### How do I add images to my docs?

If you need to add images to your docs, please [upload them to Cloudinary first](/handbook/engineering/posthog-com/assets) and then embed them into the document. You can embed light mode and dark mode versions of the image using this code snippet:

```jsx
<ProductScreenshot
  imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/add_holdout_light_ce0827be42.png"
  imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/add_holdout_dark_cc687f7688.png"
  classes="rounded"
  alt="Screenshot of the form to create a new holdout"
/>
```
