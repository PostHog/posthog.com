---
title: Exporting a blog post image from Figma
sidebar: Handbook
showTitle: true
---

## Overview

Blog post images are created in [Figma](https://www.figma.com/file/nG3Iil1pLraQ6VTqhsk2FT/Blog?node-id=470%3A2064). The image appears at the top of each blog post, above the headline.

### Dimensions

Open graph images are `1200x630`. (This is approximately double the size they'll be displayed at, making them look nice and crisp on hi-resolution screens.)

## Export an image from Figma

### Initial setup

Install the [TinyImage Compressor](https://www.figma.com/community/plugin/789009980664807964) Figma plugin.

### Now let's export that image

1. Open the [Art Requests](https://www.figma.com/file/HwUmk7WqccLkGgNNGAs4zN/Art-requests) Figma file.
1. Create a Frame at `1200x630`.
2. Paste (or design) content into frame and make sure artwork fills the entire frame.
3. Ensure frame doesn't have a border.
4. Rename the frame of the image to closely match the blog post title in a slug format. (Ex: `writing-for-developers`, where we remove capital letters and punctuation, and replace spaces with hyphens. This will become the filename that is uploaded to the server.) It's best to omit articles (a, and, the).
5. Choose an export option (1x, PNG) but _don't_ export the image.
6. Select the frame and go to `Plugins > TinyImage Compressor`.
7. Make sure only the _one_ image is selected. (Sometimes it will select multiple images by default.)
8. Keep the default quality (90) and choose `Compress images (1)`
9. Save the image and add it to the issue.

The image should be uploaded by the person creating the blog post.

## Adding to a blog post

1. Upload the file to `/contents/images/blog`
1. Use the `featuredImage` field that appears in the meta information of the post like in [this example](https://github.com/PostHog/posthog.com/blob/master/contents/blog/100-times-more-events.md).
1. Make sure the filename matches the reference to the image in the .md file.
