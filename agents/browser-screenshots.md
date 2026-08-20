# Browser screenshots

Every visual change needs before/after screenshots in four states: light and dark, narrow window and wide window. This guide explains how to capture them, and how to put them in the PR.

Read [the reviewer's guide](reviewers-guide.md) for the grid the images go into.

## Two ways to drive a browser

| Tool | Use it for | Weakness |
|---|---|---|
| Claude Chrome extension | Hover states, nested menus, anything a real browser must paint | The window will not always resize, so you cannot control the viewport width |
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

## Console errors

The PR must state that the console shows no **new** errors. Do not compare against a memorized list of known warnings – that list goes stale. Capture the console on both sides of the `git stash` and compare the two sets. Anything on both sides is pre-existing. Report only what your change added.

## Putting the images in the PR

`gh` cannot attach an image to a PR body on its own. GitHub's uploader is a web endpoint, not part of the REST API. Use the `gh attach` extension, which is listed with the other CLI tools in the [tech stack guide](techstack.md#github-cli):

```bash
gh attach upload <path> --target PostHog/posthog.com#<pr> --format url
```

It prints a URL you embed in the PR body:

```markdown
<img src="https://github.com/PostHog/posthog.com/releases/download/_gh-attach-assets/before-nav-light-wide.png" width="380">
```

Two things to know:

- The command uploads to a release named `_gh-attach-assets` on the target repo, and creates that release the first time it runs. Never delete that release – it would break the images in every PR that uses it.
- Upload the files, then edit the whole body in one pass with `gh pr edit <pr> --body-file <file>`. Keep the body in a file so you can regenerate it.

## Checklist

- [ ] Before and after, for every affected area
- [ ] Light and dark, narrow and wide – four states per area
- [ ] Console compared before and after, not against a remembered list
- [ ] Images uploaded and embedded, not described in words
- [ ] Any state you could not capture named in the "Not tested" line, with the reason
