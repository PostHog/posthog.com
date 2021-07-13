---
title: Updating Documentation
sidebar: Docs
showTitle: true
---

This website is based on [Gatsby](https://gatsbyjs.org) and is hosted with [Netlify](https://www.netlify.com/).
<br />


## Finding the Content to Edit

Once you have cloned the repo, the `contents/` directory contains a few key areas:

* `docs/` = all of the documentation for PostHog's platform
* `handbook/` = the PostHog company handbook
* `blog/` = our blog posts

Inside each of these are a series of markdown files for you to edit.

## Deployment

New changes should be created as a Pull Request.

To get changes into production, the website deploys automatically from `master`. The build takes 5-10 minutes.

## Markdown Details

#### Frontmatter

At the top of the file, it is necessary to have the following for the page to appear:

```markdown
---
title: Example Title
sidebar: Example Sidebar
showTitle: true
---
```

The `sidebar` is the sidebar menu that the page will attach to. You can see a list of available sidebars in `/src/sidebars/sidebars.json`. You can choose not to have a sidebar by setting this to `null`.

The property `showTitle` should always be set to `true`.

#### Images / GIFs

For our Markdown, we use [gatsby-remark-copy-linked-files](https://www.gatsbyjs.org/packages/gatsby-remark-copy-linked-files/).

This copies local files linked to/from Markdown files to the root directory.

Place images in `contents/images/`.

To include an image in a markdown file, you can use nice local references, like so:

```markdown
![Twin Peaks](../images/02/IMG_4294-scaled.jpg)
```

Note that it may be necessary to change the folder depending on your file structure. For example, if you needed to go up two directories, this *could* be:

```markdown
![Twin Peaks](../../images/02/IMG_4294-scaled.jpg)
```

Notice the extra ```../```.

For most images, this plugin will automatically generate a range of sizes to optimize for the device and they'll even have a blurry low filesize loading image created to hold the place. Pretty cool.

#### Links to/from the navigation

Once you've made a new markdown file, you should link to it from the sidebar where appropriate.

The sidebar is generated from `/src/sidebars/sidebars.json`.