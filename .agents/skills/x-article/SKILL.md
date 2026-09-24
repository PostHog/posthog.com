---
name: x-article
description: Convert a posthog.com blog or newsletter post into a markdown file formatted for posting as an X (Twitter) Article. Strips frontmatter, promotes the title to an H1, remaps headings to X's two heading levels (subheadings + bold), downloads all post images into a numbered folder, and appends a subscribe CTA for newsletters. Use when the user wants to copy a post from contents/blog/ or contents/newsletter/ into X Article format.
---

# Format a post for an X Article

X Articles only support two heading levels ("heading" and "subheading") plus bold text, and images must be uploaded one at a time. This skill produces a clean markdown file and a folder of ordered images so the user can copy/paste text and drag images in order.

The user will provide a post — a slug, a filename, or a path under `contents/blog/` or `contents/newsletter/`: $ARGUMENTS

## Step 1: Locate the source

Find the source file under `contents/blog/` or `contents/newsletter/` (extension may be `.md` or `.mdx`). If the argument is ambiguous or matches multiple files, ask which one. Note whether it came from `blog` or `newsletter` — the CTA in Step 4 only applies to newsletters.

Read the full file.

## Step 2: Set up the output

Derive `{slug}` from the source filename (without extension). Create the output folder `x-articles/{slug}/` (relative to repo root) and an `images/` subfolder inside it.

## Step 3: Write `x-articles/{slug}/article.md`

Transform the source body into the article file:

1. **Remove the frontmatter** (everything between the opening and closing `---`).
2. **Remove MDX `import` lines** and any other JSX/component noise that won't render as plain text (e.g. `<NewsletterForm />`, `<ProductComparisonTable .../>`, wrapping `<div>`s). If a component can't be represented as text, drop it. Images inside components are still handled in Step 4.
3. **Title → H1.** Take the `title` from the frontmatter and put it as a single `# Title` at the very top of the file.
4. **Remap headings** (because X collapses everything to two levels):
   - `##` → `#`
   - `###` → `##`
   - `#### Heading` → `**Heading**` (bold paragraph, heading text only)
   - Leave `#####`+ as bold too.
5. **Keep all body text, links, lists, blockquotes, code blocks, and footnotes verbatim.** X has no relative-link context, so prefix any relative links (e.g. `/blog/...`, `/feature-flags`) with `https://posthog.com`.
6. **Replace each image with a numbered marker.** Walk the body top to bottom and replace every image (see Step 4 for what counts as an image) with a line like:

   ```
   [IMAGE 1: alt text]
   ```

   Numbered in document order starting at 1. This tells the user which downloaded image goes where.

## Step 4: Download the images

Collect every image URL in document order. Images appear as:

- Markdown: `![alt](https://res.cloudinary.com/.../upload/.../file.jpg)`
- Components: `imageLight="https://res.cloudinary.com/..."` (and `imageDark=` — prefer `imageLight`; skip the dark duplicate)
- Raw `<img src="...">`

Cloudinary URLs may contain transformation segments between `/upload/` and the filename (e.g. `/upload/q_auto,f_auto/file.jpg` or `/upload/w_1600,c_limit,q_auto,f_auto/file.jpg`). Download the URL **as-is** — the transformations are harmless.

Do **not** download the `featuredImage` from frontmatter unless it also appears in the body.

For each image in order, save it to `x-articles/{slug}/images/{n}.{ext}` where `{n}` matches the `[IMAGE n: ...]` marker and `{ext}` is the original extension from the URL (jpg, png, gif, webp). Download with:

```bash
curl -sSL -o "x-articles/{slug}/images/{n}.{ext}" "{url}"
```

Run the downloads and verify each file is non-empty (a failed Cloudinary fetch returns a tiny error body). Report any that failed.

## Step 5: Newsletter CTA

If — and only if — the source was a **newsletter**, append this to the very bottom of `article.md`:

```markdown
> Subscribe to [build mode](https://newsletter.posthog.com/subscribe), our newsletter, to get more writing like this.
```

## Step 6: Report

Tell the user:
- The output path `x-articles/{slug}/article.md`
- How many images were downloaded (and where), and flag any failures
- A reminder that `[IMAGE n: ...]` markers in the text show where each numbered image goes
