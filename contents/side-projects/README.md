# Side projects

This folder contains PostHog team side projects displayed in the gallery at `/side-projects`.

## Adding your side project

The easy way, if you're a PostHog team member: sign in to your community profile, open [/side-projects](https://posthog.com/side-projects), and click **Add a project**. You can upload a featured image right in the form, and it prefills the MDX file on GitHub – committing it there opens the pull request for you. An **Edit** button on each project page works the same way for updates.

Or by hand:

1. Create a new folder with your project name (use kebab-case)
2. Add an `index.mdx` file with your project details
3. Open a PR to the posthog.com repo

## Frontmatter schema

```yaml
---
title: Your Project Name
date: 2026-08-06  # when the project was added - newest first in the gallery
description: A brief one-liner that appears on the gallery card
projectThumbnail: https://example.com/thumbnail.png  # URL for gallery card image
featuredImage: ./featured.png  # Optional larger image for detail page
projectAuthor: Your Name
authorGitHub: your-github-username
alumni: true  # optional - list under "PostHog Alums" (auto-detected from team membership otherwise)
teamLink: /teams/your-team  # optional - links to your PostHog team page
githubUrl: https://github.com/your-username/your-repo  # optional - if the source is public
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
- **projectAuthor**: Your name – use the same name as your community profile, so the gallery can link to it and show your avatar and role

### Optional fields

- **projectThumbnail**: URL for the gallery card image (YouTube thumbnails, GitHub raw URLs, or Cloudinary URLs work well). Without one, the gallery generates card art from your project title and community profile
- **featuredImage**: Larger image shown on the detail page
- **authorGitHub**: Your GitHub username (fallback avatar and profile link)
- **teamLink**: Link to your PostHog team page
- **githubUrl**: Link to the source code
- **liveUrl**: Link to a live demo

## Thumbnail options

- **YouTube**: `https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg`
- **GitHub raw**: `https://raw.githubusercontent.com/org/repo/main/image.png`
- **Cloudinary**: `https://res.cloudinary.com/dmukukwp6/image/upload/...`
- **Static file**: Add to `/static/images/side-projects/` and reference as `/images/side-projects/filename.png`

## Alumni

Projects by former team members live in a collapsed "PostHog Alums" section at the bottom of the gallery. This is automatic: creators whose community profile no longer belongs to a small team count as alumni. Set `alumni: true` or `alumni: false` in frontmatter to override.

## Tags

The gallery ranks tag filters by how many projects use them and folds near-duplicate tags into a canonical set (see `TAG_ALIASES` in `src/components/SideProjects`), so reuse an existing tag before inventing a new one. Common ones:

- `open-source` – Public source code
- `python` / `typescript` / `javascript` / `go` – Language/runtime
- `cli` – Command-line tools
- `web-app` – Web applications
- `games` – Games of any kind
- `ai` / `ai-observability` / `mcp` – AI/ML projects
- `data` – Data analysis/visualization projects
- `demo` – PostHog feature demonstrations
- `developer-tools` – Tools for developers
- `self-hosted` – Things you run yourself
