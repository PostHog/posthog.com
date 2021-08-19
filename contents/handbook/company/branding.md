---
title: Branding
sidebar: Handbook
showTitle: true
hideAnchor: true
---

> <em>This page currently refers only to this website (posthog.com). It will later be updated to also include information about app.posthog.com.</em>

## Typography

We use Displaay's font called *Matter SQ*. (SQ = square dots)

### Building for web

On posthog.com, we use Matter's variable font. This allows us to specify our own font weights, which we do for paragraph text.

Context: *Matter Regular*'s weight is `430` and the next step up is *Matter Medium* at `570`, so we use our own weight of `475` for paragraph text.

### Designing on desktop

We use 4 cuts of Displaay's *Matter SQ* typeface (SQ stands for square dots):

1. *Bold* (titles and section headers)
2. *Semibold* (paragraphs accompanying headers and paragraph links)
3. *Regular* & *Regular Italic* (paragraph text)

Note that *Regular* and *Regular Italic* are lighter than the font-weight we use on the web, so paragraph text in Figma mockups will look noticeably thinner than how it appears on posthog.com.

When designing ads or other content with non-paragraph text, use *Semibold* instead of *Regular*.

We have a handful of licenses for desktop use of Matter. Contact Cory if you need the desktop fonts (OTFs).

| Name                                  | Weight   | Size       | Letter spacing |
|---------------------------------------|----------|------------|----------------|
| h1                                    | Bold     | 64px       | -1%            |
| h2                                    | Bold     | 48px       | -1%            |
| h3                                    | Bold     | 30px       | -2%            |
| h4                                    | Bold     | 24px       | -2%            |
| h5                                    | Bold     | 20px       | -2%            |
| h6                                    | Bold     | Not in use |                |
| Paragraphs accompanying large headers | Semibold | 20px       | -1%            |
| p                                     | Regular  | 17px       |                |

## Colors

We have two color schemes (light and dark mode), but primarily use light mode.

We use the same set of colors, and only swap out a couple hues depending on the color scheme.

Colors denoted with an asterisk (*) are the same between palettes.

| Name                        | Light mode | Dark mode |
|-----------------------------|------------|-----------|
| Text color (at 90% opacity) | <span style="color:#151515; font-size: 20px">■</span> `#151515`  | <span style="color:#EEEFE9; font-size: 20px">■</span> `#EEEFE9` |
| Background color            | <span style="color:#EEEFE9; font-size: 20px">■</span> `#EEEFE9`  | <span style="color:#151515; font-size: 20px">■</span> `#151515` |
| Accent                      | <span style="color:#E5E7E0; font-size: 20px">■</span> `#E5E7E0`  | <span style="color:#2C2C2C; font-size: 20px">■</span> `#2C2C2C` |
| Dashed divider line         | <span style="color:#D0D1C9; font-size: 20px">■</span> `#D0D1C9`  | <span style="color:#4B4B4B; font-size: 20px">■</span> `#4B4B4B` |
| Red*                        | <span style="color:#F54E00; font-size: 20px">■</span> `#F54E00`  |           |
| Yellow                      | <span style="color:#DC9300; font-size: 20px">■</span> `#DC9300`  | <span style="color:#F1A82C; font-size: 20px">■</span> `#F1A82C` |
| Blue*                       | <span style="color:#1D4AFF; font-size: 20px">■</span> `#1D4AFF`  |           |
| Gray*                       | <span style="color:#BFBFBC; font-size: 20px">■</span> `#BFBFBC`  |           |
| Links                       | Use Red    |           |


### Use `opacity` over more colors

When possible, use opacity to modify colors. This allows us to use fewer colors in our palette, which is light years easier when working with two color schemes.

| Paragraph text | `rgba($value, 90%)`                 |
|----------------|-------------------------------------|
| Links          | `rgba($value, 95%)` (and semibold)  |
| Links:hover    | `rgba($value, 100%)` (and semibold) |

## Aesthetic

### Buttons

Use fully rounded buttons and centered text.

| Name      | Light color scheme                                                   | Dark color scheme                                                    |
|-----------|----------------------------------------------------------------------|----------------------------------------------------------------------|
| Primary   | Background: <span style="color:#151515; font-size: 20px">■</span> `#151515` <br />Text: <span style="color:#EEEFE9; font-size: 20px">■</span> `#EEEFE9` <br />Border: 2px <span style="color:#151515; font-size: 20px">■</span> `#151515`          | Background: <span style="color:#EEEFE9; font-size: 20px">■</span> `#EEEFE9` <br />Text: <span style="color:#151515; font-size: 20px">■</span> `#151515` <br />Border: 2px <span style="color:#EEEFE9; font-size: 20px">■</span> `#EEEFE9`          |
| Secondary | Background: `transparent` <br />Text: <span style="color:#151515; font-size: 20px">■</span> `#151515` <br />Border: 2px `#151515, 10%` | Background: `transparent` <br />Text: <span style="color:#EEEFE9; font-size: 20px">■</span> `#EEEFE9` <br />Border: 2px <span style="color:#EEEFE9; font-size: 20px">■</span> `#EEEFE9, 10%` |

### Icons

Use filled in icons over outlined icons.
