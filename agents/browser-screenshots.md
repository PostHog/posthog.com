# Browser screenshots

Every visual change needs before/after screenshots in four states: light and dark, narrow window and wide window. Anything that moves needs a before/after GIF as well. This guide explains how to capture them, and how to put them in the PR.

Read [the reviewer's guide](reviewers-guide.md) for the grid the images go into.

## Two ways to drive a browser

| Tool | Use it for | Weakness |
|---|---|---|
| Claude Chrome extension | Hover states, nested menus, GIFs of motion, anything a real browser must paint | The window will not always resize, so you cannot control the viewport width |
| Headless puppeteer (`puppeteer` is a devDependency) | Exact viewport widths, scripted before/after runs, reading console errors | Old bundled Chromium. It does not paint nested menus |

Neither tool covers every case. Expect to use both: puppeteer for the narrow and wide grid, the extension for menus and hover states.

## Capture the before state first

The dev server hot-reloads, so you can move between the two states with `git stash`:

```bash
git stash push -m "wip" <your changed files>   # before state
# ... capture ...
git stash pop                                  # after state
# ... capture ...
```

Wait for the rebuild between the two. Name the files so the pair is obvious: `before-<area>-<mode>-<width>.png`.

## Open the page you changed

Most pages open as a window on the desktop. **Do not navigate straight to the URL** – for a windowed page that renders the bare desktop with no window. Use the keyboard shortcut instead:

| Page | Shortcut |
|---|---|
| Display options | `,` |
| Keyboard shortcuts | `.` |
| Wallpaper cycle | `\` |

Other pages list their shortcut in the `shortcut` field in `src/components/TaskBarMenu/menuData.tsx`. If a page has no shortcut, open it the way a user does: click through from the desktop or the nav.

## Headless puppeteer

The bundled browser has a few traps. This recipe avoids all of them:

```js
const puppeteer = require('puppeteer')
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const page = await browser.newPage()
page.on('dialog', (d) => d.accept().catch(() => {}))   // an unhandled beforeunload hangs the run
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(e.message))

await page.setViewport({ width: 640, height: 860 })    // 640 narrow, 1440 wide

// Seed both keys. Set only one and the page theme and the color-mode control disagree.
await page.evaluateOnNewDocument((mode) => {
    localStorage.setItem('theme', mode)
    localStorage.setItem('siteSettings', JSON.stringify({ colorMode: mode, theme: mode }))
}, 'dark')

await page.goto('http://localhost:8001/', { waitUntil: 'domcontentloaded', timeout: 60000 })
await sleep(9000)                                       // hydration; see the note below
```

Four rules for this recipe:

1. **Use `domcontentloaded`, never `networkidle2`.** The site never goes idle, so `networkidle2` times out every time. Follow the navigation with a sleep of about 9 seconds to let the app hydrate.
2. **Open a fresh page for every screenshot.** A second `goto` in a page that already hydrated hangs on `beforeunload`.
3. **Dismiss the cookie banner** before you shoot, or it covers the bottom right of every image.
4. **Do not paint nested menus with this tool.** The submenu opens – `data-state` reads `open` and the element reports a real bounding box – but it never appears in the image. Use the extension for those.

## The Chrome extension

Hover, do not click, to open a submenu. A click on the sub-trigger toggles it shut again.

```
1. click the parent menu       (for example "More" in the menubar)
2. wait ~2s
3. hover the sub-trigger row   (for example "Things that spark joy")
4. wait ~2s
5. screenshot with save_to_disk
```

Give each step time. A click that lands before the app hydrates does nothing, and the menu stays shut.

`resize_window` reports success but may leave the viewport unchanged, because page zoom decouples the window width from `innerWidth`. Check `innerWidth` in the page before you trust a narrow capture from this tool. When it does not move, take the narrow captures with puppeteer instead.

## Changes that move

A still cannot show a transition, and a reviewer should not have to run the branch to see one. If your change alters anything that moves – an animation, a transition, a hover reveal, a drag, a scroll behavior, a loading state – attach a GIF of it.

**A GIF is extra, not instead.** The four-state before/after grid is still required. The GIF shows the motion; the stills show the result at rest.

Reach for a GIF when the change alters:

- an animation or transition (duration, easing, direction, what animates)
- a hover or focus reveal
- a drag, resize, or snap interaction
- a scroll-linked effect
- a loading, skeleton, or empty-to-filled state

A single still is enough for layout, color, spacing, and copy.

### Capturing one

The Chrome extension records directly – its `gif_creator` captures frames while you drive the page. Take a few extra frames at each end, or the loop reads as a jump cut.

Otherwise record the screen and convert. With `ffmpeg`, generating a palette first is what keeps UI grays from banding:

```bash
ffmpeg -i recording.mov \
  -vf "fps=12,scale=800:-1:flags=lanczos,split[a][b];[a]palettegen[p];[b][p]paletteuse" \
  -loop 0 motion.gif
```

Keep them small. The upload limit is 10 MB and a full-width capture reaches it quickly:

- 2–5 seconds. Trim to the moment that changed.
- Crop to the affected area, not the whole desktop.
- 800px wide is plenty. 12 fps is plenty for UI motion.
- Show the motion once, maybe twice. A long loop is harder to read, not easier.

Capture the before state the same way, with the same `git stash` trick as the stills. A motion change needs a before GIF too – "it feels smoother now" is not reviewable.

## Console errors

The PR must state that the console shows no **new** errors. Do not compare against a memorized list of known warnings – that list goes stale. Capture the console on both sides of the `git stash` and compare the two sets. Anything on both sides is pre-existing. Report only what your change added.

## Putting the images in the PR

Use `gh pr-assets`. It takes a local file and prints markdown you can paste straight into the PR body.

```bash
gh extension install PostHog/gh-pr-assets --pin v1.0.0   # once
gh pr-assets image --alt "nav after, dark, wide" after-nav-dark-wide.png
```

The first run prints a warning and uploads nothing. Read it, then re-run the same command with `--yes` to confirm:

> Uploads land in a **public** repo, [PostHog/pr-assets](https://github.com/PostHog/pr-assets), and are **permanent**. URLs are pinned to a commit sha, so they keep serving even after the file is deleted. Never upload customer data, secrets, or internal information.

For a screenshot of this public marketing site that is a non-issue. For anything else, think first. If you are an agent, `--yes` means a person approved these exact files – it is not a flag to bake into a script.

Only the markdown goes to stdout, so you can build the body up as you go:

```bash
gh pr-assets image --yes before-nav-light-wide.png after-nav-light-wide.png >> body.md
```

Several files in one command land in one commit, and the markdown comes back in the order you passed them. Alt text defaults to each file's stem, so name the files well and you can skip `--alt` entirely.

Upload everything first, then apply the body once with `gh pr edit <pr> --body-file body.md`. That way you can regenerate the body without hand-patching it.

### GIFs

A GIF is an image. Upload it the same way, and it animates inline in the PR:

```bash
gh pr-assets image --alt "sidebar transition, after" after-sidebar.gif
```

### Video

`gh pr-assets video` accepts mp4 and webm, but **GitHub renders no player for an uploaded video** – you get a plain link the reviewer has to click. Prefer a GIF for anything short enough to loop.

Use video only for a long walkthrough where a link is acceptable. If you need a real inline player, a human has to drag the file into the comment box by hand; there is no command for that.

### Two things that will not work

- **SVG.** `raw.githubusercontent.com` serves it as `text/plain`, so GitHub refuses to inline it. Export a PNG.
- **Committing the file to this repo.** Screenshots are evidence for a review, not source. They bloat the repo permanently and never get cleaned up.

### Confirming an image renders

Compare the served byte count against the local file:

```bash
curl -sL -o /dev/null -w '%{http_code} %{size_download}\n' "<url>"
```

## Checklist

- [ ] Before and after, for every affected area
- [ ] Light and dark, narrow and wide – four states per area
- [ ] A before/after GIF for anything that animates, hovers, drags, or scrolls
- [ ] Console compared before and after, not against a remembered list
- [ ] Images uploaded with `gh pr-assets` and embedded, not described in words or committed to the repo
- [ ] Any state you could not capture named in the "Not tested" line, with the reason
