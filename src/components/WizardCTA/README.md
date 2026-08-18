# WizardCTA

Wizard install banner (hedgehog, tan texture background, inline copyable command) used in prose — blog posts, docs — and on the `/r/*` landing pages. Rendered as a global MDX shortcode, so `<WizardCTA />` works in any `.mdx`/`.md` file without an import.

## Usage

Bare, for the default "install PostHog" pitch:

```mdx
<WizardCTA />
```

Every prop is optional and defaults to the copy above, so a single post can retarget the command without touching the component:

```mdx
<WizardCTA selfDriving />

<WizardCTA
    command="ai-observability"
    title="Add LLM observability in one command"
    subtitle="The wizard finds your LLM calls and wires them up for you."
    learnMoreTo="/docs/ai-observability/installation"
/>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `command` | `string?` | – | Wizard subcommand appended to `npx @posthog/wizard`, e.g. `"ai-observability"` |
| `selfDriving` | `boolean?` | `false` | Shorthand for `command="self-driving"`; takes precedence over `command` |
| `title` | `string?` | "Install PostHog with one command" | Bold headline |
| `subtitle` | `string?` | "Paste this into your terminal and make AI do all the work." | Supporting line |
| `learnMoreTo` | `string?` | `/wizard` | "Learn more" link target under the command |
| `className` | `string?` | – | Extra classes on the outer wrapper |

## Related

- `components/PlatformInstall` — owns command building and the inline button. The displayed command is the clean `npx @posthog/wizard …`; the copied one pins `-y` and `@latest`. Don't assemble command strings here.
- `components/WizardHint` — same visual design, but collapsible and aimed at "there's an automated alternative to this manual setup" moments inside docs.
