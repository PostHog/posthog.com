# WizardCTA

Wizard install banner (hedgehog, tan texture background, inline copyable command) used in prose — blog posts, docs — and on the `/r/*` landing pages. Rendered as a global MDX shortcode, so `<WizardCTA />` works in any `.mdx`/`.md` file without an import.

## Usage

Bare, for the default "install PostHog" pitch:

```mdx
<WizardCTA />
```

Every prop is optional and defaults to the copy above, so a post can retarget the banner by editing its own markdown — no new component, no code change:

```mdx
<WizardCTA
    command="ai-observability"
    title="Add LLM observability in one command"
    subtitle="The wizard finds your LLM calls and wires them up for you."
    learnMoreTo="/docs/ai-observability/installation"
/>
```

## Setting the command

Two props, depending on how much of the command you want to own.

**`command` appends a wizard subcommand.** Use this for the normal case — a documented wizard subcommand like `self-driving`, `ai-observability`, or `warehouse` (see [the wizard docs](/docs/ai-engineering/ai-wizard) for the list). You get the copy-button pinning for free: `-y` auto-confirms the npx prompt and `@latest` stops readers running a stale wizard, neither of which clutters the displayed command.

```mdx
<WizardCTA command="self-driving" />   →  shows  npx @posthog/wizard self-driving
                                          copies npx -y @posthog/wizard@latest self-driving
```

**`fullCommand` replaces the command outright.** Whatever you type is what shows in the box and what lands on the reader's clipboard — nothing is appended and nothing is pinned, so include `-y`/`@latest` yourself if you want them. It does not have to be a wizard command at all:

```mdx
<WizardCTA fullCommand="npx -y @posthog/wizard@latest self-driving --debug" />

<WizardCTA fullCommand="pip install posthog" title="Install the Python SDK" />
```

Use `copyCommand` alongside it when the clipboard should differ from the display.

## Replacing the image

`image` swaps the wizard hedgehog for any URL:

```mdx
<WizardCTA image="https://res.cloudinary.com/dmukukwp6/image/upload/some_other_hog.png" />
```

**It scales, but it does not crop.** The image gets the banner's responsive widths (`w-36` up to `w-48`, tracking the banner's own width rather than the viewport's, since the banner sits inside resizable windows), and the height follows whatever aspect ratio you give it. So:

- A roughly square, transparent PNG — like the hedgehogs — drops straight in and needs nothing.
- A markedly wider or taller image still fits the width, but its height changes the banner's height with it. Pass `imageClassName` to size it yourself, e.g. `imageClassName="w-24 @lg:w-32"` for something tall, or a fixed `h-*` plus `object-contain`.
- A photo or an image with a solid background will look wrong against the tan texture. Use a cutout with transparency.

Set `imageAlt` whenever the image conveys meaning. It defaults to the hedgehog's alt text for the default image and to `''` (decorative) for a replacement, so a swapped-in image never inherits a description of a different picture.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `command` | `string?` | – | Wizard subcommand appended to `npx @posthog/wizard`, e.g. `"self-driving"` |
| `fullCommand` | `string?` | – | The entire command, shown and copied verbatim. Overrides `command` and skips the `-y`/`@latest` pinning |
| `copyCommand` | `string?` | – | Clipboard override, if it should differ from what's displayed |
| `title` | `string?` | "Install PostHog with one command" | Bold headline |
| `subtitle` | `string?` | "Paste this into your terminal and make AI do all the work." | Supporting line |
| `image` | `string?` | wizard hedgehog | Image URL; prefer a transparent PNG on Cloudinary |
| `imageAlt` | `string?` | hedgehog alt, or `''` for a replacement | Alt text; set it if the image carries meaning |
| `imageClassName` | `string?` | `w-36 @lg:w-32 @xl:w-40 @2xl:w-48` | Sizing classes, replacing the responsive width defaults |
| `learnMoreTo` | `string?` | `/wizard` | "Learn more" link target under the command |
| `className` | `string?` | – | Extra classes on the outer wrapper |

## Related

- `components/PlatformInstall` — owns command building and the inline button. The displayed command is the clean `npx @posthog/wizard …`; the copied one pins `-y` and `@latest`. Don't assemble command strings here.
- `components/WizardHint` — same visual design, but collapsible and aimed at "there's an automated alternative to this manual setup" moments inside docs.
