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
5. Create a dashboard image in Figma in the “[Hoglitos](https://www.figma.com/file/HwUmk7WqccLkGgNNGAs4zN/Art-board?type=design&node-id=15-11&mode=design)” file. Make the size of image small (like 396x208). Export and add to [`posthog.com/static/template_art/`](https://github.com/PostHog/posthog.com/tree/master/static/template_art).
6. For the website, copy the same hedgehog as a small square image with a transparent background. Export and add to `posthog.com/contents/templates/thumbnails/`.
7. While you are in Figma, create a 1920x1080 preview image with a couple of the insights. Export and add to `posthog.com/contents/templates/thumbnails/featured`.
8. In that same `posthog.com/contents/templates` folder, create a new folder for your template, copy an index.mdx file from one of the other folders, and modify for your new template.
9. Open a pull request.
10. Once merged, go to [templates tab](https://us.posthog.com/dashboard?tab=templates) under dashboards, click the three dots to the far right of your template, and click “Edit.” Add an `image_url` using the URL created by adding the image to the `template_art` folder like `https://posthog.com/template_art/analytics-dash.png`. Click “Update template.”
11. Click the three dots on the far right again, and click “Make visible to everyone.”
12. To add to EU Cloud, click the three dots to edit the template and copy the JSON. Go to the [PostHog EU Cloud instance](https://eu.posthog.com/project/1/dashboard), create a new blank dashboard, click "Save as template", paste the JSON (minus `deleted`, `created_at`, `created_by`, `team_id`, and `scope`), and "Create new template." Add `image_url`, edit, and test if needed. Finally, make visible to everyone.
