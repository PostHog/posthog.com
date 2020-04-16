---
title: Menu Items
sidebar: Docs
showTitle: true
---
## Introduction

The menu items are showing on the top right of the website (currently have `Docs` and `Blog`).

It is automatically generated base on `menuItems.json` file under the folder `/src/menuItems`, which contains name and link of the item.

### Example

See the current file. `Docs` is linked directly to the markdown page, and `Blog` is linked to a custom page under `/src/components/pages`.

```sh
# /src/menuItems/menuItems.json
[
  {
    "name": "Docs",
    "link":  "/docs/get-started/introduction"
  },
  {
    "name": "Blog",
    "link": "/blog"
  }
]
```
