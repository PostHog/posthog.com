---
title: Dashboard templates
sidebar: Handbook
showTitle: true
---

Dashboard templates simultaneously showcase the use cases of PostHog and make it easier for users to get started. You can find a full list of them on the [templates page](/templates).

This is "internal" documentation to show PostHog staff how to add new global templates.

Let us know [on this GitHub issue](https://github.com/PostHog/posthog/issues/12732) if you'd like to see templates that are private for your team.

## Creating a new dashboard template

1. Create your dashboard with all the insights you want on it. Be sure to add descriptions to both.

2. Open the dashboard dropdown, click “Save as template.”

3. Add variables as objects with the format below. Reference them in your template by adding the ID in curly brackets, like `{SIGNUPS}`, to replace the placeholder event.

```json
"variables": [
  {
    "id": "SIGNUPS",
    "name": "Signups",
    "type": "event",
    "default": {},
    "required": true,
    "description": "The event you use to define a user signing up"
  }
],
```

4. Once done, click “Create new template.” Test that it works in the team project.

5. Create a dashboard image in Figma in the [Hoggies](https://www.figma.com/design/I0VKEEjbkKUDSVzFus2Lpu/Hoggies?node-id=1-196&t=UZQMXMddH0DMLxqX-0) file. Make the size of image small (like 396x208). Export and upload to Cloudinary.

6. With the URL, go to [templates tab](https://us.posthog.com/dashboard?tab=templates) under dashboards, click the three dots to the far right of your template, and click “Edit.” Add the URL to the `image_url` field and press **Update template**.

7. For the website, copy the same hedgehog as a small square thumbnail image (400x400) with a transparent background. Export and upload to Cloudinary.

8. While you are in Figma, create a 1920x1080 feature image with a couple of the insights. Export and upload to Cloudinary.

9. In the `posthog.com/contents/templates` folder, copy another `.mdx` file from another template, and modify for your new template. Add the thumbnail and feature images you uploaded to Cloudinary.

10. Open a pull request.

11. Once merged, click the three dots on the far right again, and click “Make visible to everyone.”

12. To add to EU Cloud, click the three dots to edit the template and copy the JSON. Go to the [PostHog EU Cloud instance](https://eu.posthog.com/project/1/dashboard), create a new blank dashboard, click "Save as template", paste the JSON (minus `deleted`, `created_at`, `created_by`, `team_id`, and `scope`), and "Create new template." Add `image_url`, edit, and test if needed. Finally, make visible to everyone.

## Removing a dashboard template

If you ever need to remove a dashboard template, you need to:

1. Open [the templates list](https://us.posthog.com/project/2/dashboard?tab=templates)
2. Click on the three dots to the right of the template you want to remove and then click **Make visible to this team only**. This is a required step before you can delete it.
3. Click on the three dots again and then click **Delete Dashboard**.

Be sure of what you're doing as this is a non-reversible action.