---
title: Contents
sidebar: Docs
showTitle: true
hideAnchor: false
---
## Source of contents

  All contents are stored under `/contents`. To change the root path, modify the following part in `gatsby-config.js`, simply by replace the `path` of it.

  ```sh
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `contents`,
      path: `${__dirname}/contents`
    }
  }
  ```

## Information of the page

The information of the page is stored on the top of the markdown files used to generate sidebar, which currently includes the following information:

* `title`: the title of the page
* `showTitle`: show the title on the center at the beginning
* `sidebar`: entry of the sidebar (see [sidebar](/docs/guide/sidebar)).
* `hideAnchor`: hide anchor (false by default)

If you use the default setting, you should have at least one file contains each setting. You can add any additional information and querying with GraphQL. For blog in the example:

* `date`: the date created
* `rootPage`: is used to filter the posts by the root page (i.e. [/blog](/blog))

### Example

The current page have the following information on the top of the file:

```markdown
---
title: Contents
sidebar: Docs
showTitle: true
hideAnchor: false
---
```

## Important to notice

The path of the pages will automatically generated based on the root folder. However, Gatsby will also automatically generate pages under `/src/components/pages`, so you cannot have the markdown file with the same name under the root directory (i.e. `/contents`).
