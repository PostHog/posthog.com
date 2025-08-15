# Theming

There are a few ways PostHog.com is customized:

1. Color mode: auto, light (default), dark
1. Theme: Button styles, window colors, desktop icons, desktop icon underlining etc
1. Desktop background: image, background color, desktop icon label backgrounds

<!-- prettier-ignore -->
| Attribute | Location | Contents | Example(s) / Usage | Notes |
|---|---|---|---|---|
| `data-scheme` | Any element | Color theming | `data-scheme="primary" # foreground content`<br>`data-scheme="secondary" # accent content/sidebars`<br>`data-scheme="tertiary" # window header bar`<br><br>`<div data-scheme="secondary" className="text-primary text-primary">` | - Reads the `body` class of `light` or `dark` and switches automatically, ie: no need to use `dark:text-{value}`<br>- Can be nested with a different value |
| `data-skin` | Set on `body` tag | Overall aesthetic, mostly applies to buttons | `data-skin="modern" # default<br>data-skin="classic" # gives pre Mac OS X vibes, visible button outlines, thicker bottom border<br>` | |
| `data-wallpaper` | Set on `body` tag, `data-app="Desktop"` in `Desktop/index.tsx` | - Desktop background color<br>- Desktop background image | `data-wallpaper="keyboard-garden"<br>data-wallpaper="hogzilla"<br>` | - Most backgrounds support light and dark mode |

## Not currently supported

-   Custom desktop backgrounds
-   Changing desktop background and theme styles together

## How it works

Most customization is done with Tailwind.

For example, background images are set in `Desktop/index.tsx` and the `data-wallpaper` attribute is set on the `body` tag. This allows us to make customizations on the desktop and in various places like the taskbar on a per-background basis if needed.
