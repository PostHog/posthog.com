---
title: Exporting a blog post image from Figma
sidebar: Handbook
showTitle: true
---

## Overview

Blog post images are created in [Figma](https://www.figma.com/file/nG3Iil1pLraQ6VTqhsk2FT/Blog?node-id=470%3A2064). The image appears at the top of each blog post, above the headline. It's also used as the [Open Graph image](/blog/dynamic-open-graph-images).

### Dimensions

Open Graph images are `1200x630`, so we stick with those dimensions to keep this simple. (This is approximately double the size they'll be displayed at, making them look nice and crisp on HiDPI screens.)

## Export an image from Figma

1. Custom blog art lives in Figma: [Art board &rarr; Blog](https://www.figma.com/file/HwUmk7WqccLkGgNNGAs4zN/Art-board?node-id=0%3A1)
2. Make sure artwork fills the entire frame.
3. Ensure frame doesn't have a border.
4. Rename the frame of the image to closely match the blog post title in a slug format. (Ex: `writing-for-developers`, where we remove capital letters and punctuation, and replace spaces with hyphens. This will become the filename that is uploaded to the server.) It's best to omit articles (a, and, the).
5. Export the image as a PNG (at 1x).
9. Save the image and add it to the issue.

The image should be uploaded by the person creating the blog post.

## Adding to a blog post

1. Upload the file to `/contents/images/blog`.
1. Make sure the filename matches the reference to the image in the .md file.
