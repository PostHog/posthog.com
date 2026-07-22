# Side projects

This folder contains PostHog team side projects displayed in the gallery at `/side-projects`.

## Adding your side project

1. Create a new folder with your project name (use kebab-case)
2. Add an `index.mdx` file with your project details
3. Open a PR to the posthog.com repo

## Frontmatter schema

```yaml
---
title: Your Project Name
description: A brief one-liner that appears on the gallery card
projectThumbnail: https://example.com/thumbnail.png  # URL for gallery card image
featuredImage: ./featured.png  # Optional larger image for detail page
projectAuthor: Your Name
authorGitHub: your-github-username
teamLink: /teams/your-team  # optional - links to your PostHog team page
githubUrl: https://github.com/your-username/your-repo
liveUrl: https://your-demo.com  # optional - if you have a live demo
filters:
  tags:
    - relevant-tag-1
    - relevant-tag-2
---
```

### Required fields

- **title**: The name of your project
- **description**: A short description (shown on gallery cards)
- **projectAuthor**: Your name
- **githubUrl**: Link to the source code

### Optional fields

- **projectThumbnail**: URL for gallery card image (YouTube thumbnails, GitHub raw URLs, or Cloudinary URLs work well)
- **featuredImage**: Larger image shown on the detail page
- **authorGitHub**: Your GitHub username (shows your avatar)
- **teamLink**: Link to your PostHog team page
- **liveUrl**: Link to a live demo

## Thumbnail options

- **YouTube**: `https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg`
- **GitHub raw**: `https://raw.githubusercontent.com/org/repo/main/image.png`
- **Cloudinary**: `https://res.cloudinary.com/dmukukwp6/image/upload/...`
- **Static file**: Add to `/static/images/side-projects/` and reference as `/images/side-projects/filename.png`

## Common tags

- `ai-observability` – Projects using PostHog AI Observability
- `python` / `typescript` / `node` – Language/runtime
- `cli` – Command-line tools
- `web-app` – Web applications
- `demo` – PostHog feature demonstrations
- `data` – Data analysis/visualization projects
- `ai` – AI/ML projects
