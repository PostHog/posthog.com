# Blog assets

Read this guide when you write a blog post. It is the home for all guidance about blog assets. At this time, it covers only the main image.

## Main image

The main image (`featuredImage`) shows at the top of the post, above the headline. It is also the Open Graph image. For the full frontmatter, read [metadata](../contents/handbook/content/metadata.md).

### Use the generator first

For each new blog post, use the blog image generator to make a first version (v0) of the main image. This is the preferred path. Do not use the generator if the author already has a custom image.

The generator does not make the final image. It gives the author a start point. The author changes the card in the generator, then exports it.

### Make the generator link

The generator is a Claude artifact: https://claude.ai/artifact/S4HMrMHA8g5SmmwewkKQbm

To fill the fields and start the generator automatically, add `#new-` to the URL, followed by a UTF-8 JSON object in hex. Query parameters (`?title=…`) do not work, because artifact links send only the `#` fragment to the page.

The JSON object has two keys:

- `title` – the `title` from the post frontmatter
- `description` – one sentence that tells what the post is about. Most blog posts do not have a `description` field, so write the sentence from the post text.

This command makes the link:

```bash
node -e 'const [title, description] = process.argv.slice(1); console.log("https://claude.ai/artifact/S4HMrMHA8g5SmmwewkKQbm#new-" + Buffer.from(JSON.stringify({ title, description }), "utf8").toString("hex"))' "Post title" "One sentence about the post"
```

### Give the link to the author

You cannot export the image from the generator. Give the link to the author in your reply, and put it in the PR description. The author then:

1. Opens the link. The generator makes the card.
2. Changes the card until it is correct.
3. Exports the card as a 1200x630 PNG and adds it to the post. Read [exporting a blog post image](../contents/handbook/marketing/exporting-blog-post-image.md).

### Set the frontmatter

- Set `featuredImage` to the image URL, and set `featuredImageType: full`.
- If the card shows the headline, do not set `ogImage: generated`. That setting draws the title on top of the image, so the title shows two times.
