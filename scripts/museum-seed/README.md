# Museum seed data

Real content for [/museum](/museum), ready to load into Strapi. Right now it's one test artifact (The PostHog: London Tabloid Takeover). The other 65 get added once this one looks right on the page.

No images live in this repo. They're all on Cloudinary in the `museum` folder, and `data/assets.json` maps each file to its Cloudinary URL.

## What's in data/

- `categories.json`, `types.json`, `collections.json`: the museum taxonomy (8 categories, the Out of home and Misc types, and the Do more weird and Product launches collections)
- `artifacts.json`: the artifacts, with their hero image, gallery, category, type, collections and related artifacts
- `assets.json`: Cloudinary URL, size and dimensions for every image and video the artifacts use

## Load it into Strapi

You need a local checkout of [squeak-strapi](https://github.com/PostHog/squeak-strapi) on the `posthog/museum-artifacts-exhibits` branch (the museum content types), built with `yarn build`. Then from the posthog.com root:

```bash
STRAPI_DIR=../squeak-strapi node scripts/museum-seed/seed.js
```

It writes to whatever database squeak-strapi's `.env` points at. Images aren't uploaded again. It creates Media Library entries that point at the Cloudinary URLs. Records are matched on slug, so running it twice won't create duplicates.
