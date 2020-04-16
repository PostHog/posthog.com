---
title: Sidebar
sidebar: Docs
showTitle: true
---
## Introduction

The sidebar is automatically generated with a given `sidebar` entry from the current page, where the information are stored in the corresponding markdown file (see [contents](/docs/guide/contents#information-of-the-page)). All the entries of this example are defined in the file `/src/sidebars/sidebars.json`. And it will list all the pages under the given `sidebar` entry.

By default, only the selected page will be expanded on the sidebar.

## Format

All the entries are defined in json format, and it must be an array of objects.

```json
[
  { entry1 },
  { entry2 },
  { entry3 },
  ...
]
```

For each entry object must includes:

* `entry`: used to identify the object and it must be unique
* `name`: the name will be shown on the sidebar (tht root menu name will not be shown)

And for different layouts, it might include:

* `child_entries`: a list of the entries (i.e. SubMenu) under the current entry
* `items`: a list of the post paths

### One-level Example

For single level sidebar (e.g. [blog](/blog/first-blog)), with one entry object:

```json
{
  "entry": "Blog",
  "name": "Blog",
  "items": [
    "blog/first-blog",
    "blog/second-blog"
  ]
}
```

The sidebar only contains two posts (i.e. `items` listed in json). The entry must be the same as `sidebar` defined on the top of contents file (see [contents](/docs/guide/contents#information-of-the-page)).

### Multi-level Example

The current page contains a multiple level of sidebar, and it's defined with three entry objects:

```json
{
  "entry": "Docs",
  "name": "Docs",
  "child_entries": [
    "Get Started",
    "Guide"
  ]
},
{
  "entry": "Get Started",
  "name": "Get Started",
  "items": [
    "docs/get-started/introduction",
    "docs/get-started/quick-start"
  ]
},
{
  "entry": "Guide",
  "name": "Guide",
  "items": [
    "docs/guide/anchor",
    "docs/guide/contents",
    "docs/guide/menu-items",
    "docs/guide/sidebar"
  ]
}
```

If the root entry is `Docs`, the `child_entries` will be added as the SubMenus (i.e. `Get Started` and `Guide`).

It is allowed to contains both `child_entries` and `items` in single entry object, and the posts (i.e. `items`) will be rendered before the SubMenus (i.e. `child_entries`) on the sidebar.

The order of items in the sidebar is based on the order you defined in `child_entries` and `items` in this file.

## Hide Sidebar

If you do not add `sidebar` entry in the markdown file (see [contents](/docs/guide/contents#information-of-the-page)), or set it to null, the sidebar will be hided.
