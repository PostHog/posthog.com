---
title: 'Logos & hedgehogs'
sidebar: Handbook
showTitle: true
hideAnchor: false
---

> **Want to use our hedgehogs for your community event or article?** We have [a huge library of them you can use](https://www.figma.com/design/I0VKEEjbkKUDSVzFus2Lpu/Hoggies?node-id=2226-55&t=1sj1GezTKuCfaybF-1). Can't see what you need? [Let us know](mailto:joe@posthog.com)! Please don't use AI art though. We're quite particular about our illustrations and AI just doesn't get it right.

## Logo and brand usage for third-parties

We’re really happy people want to build on top of PostHog, but we want to keep it clear when something is made by us or made by someone else. If you've built a third-party app on top of PostHog or want to partner with us in some way, here is some high-level guidance for you to bear in mind.

-   We're _generally OK_ with people using the PostHog name to describe compatibility. For example, you can say your product "works with PostHog," is "built for PostHog" or "built on PostHog".

-   We're _not OK_ with people using the PostHog name to make it look like your project is made by, endorsed by, or is officially partnered with PostHog if it isn't. So for example, while "Desktop Studio for PostHog" would be fine, "Official PostHog Desktop Studio" or "PostHog Desktop Studio" would not be.

-   You can use our logo or brand assets only in unmodified form, and not as the main branding for your own project. However, you may not use our hedgehog mascot or other illustrative brand assets in any commercial or marketing materials without explicit permission, as this can imply endorsement and confuse people. You cannot make it seem like your product is an official PostHog product, or that we've endorsed your product or partnered with you if we haven't. Please make sure that logo, brand asset and name usage are consistent with the rules we've laid out in this page.

We don't like doing it, but if we spot some name, brand asset or logo usage that are inconsistent with our guidelines or brand, we will reach out to try to get that sorted out, so please try to be thoughtful about branding and try to be consistent with the guidelines we've set out here. If you have questions, please reach out to us at `marketing@posthog.com` for clarification.

## Briefing external vendors

When you bring in an external party to produce brand work – a print vendor, a video production company, a hotel, a conference AV team – send them this guide. Key things to brief them on:

1. The PostHog visual style (see [visual identity](/handbook/brand/visual-identity))
2. Logo files (provide SVG, not PNG, as source)
3. Color palette (provide hex values)
4. Typography (provide font files or specify licensed fonts)
5. Illustration style (share examples from posthog.com and Figma)
6. What "not on-brand" looks like (blobs, stock art, generic SaaS layouts)

Avoid pairing the logomark with the "PostHog" wordmark in regular text that isn't part of the logo itself.

## Logo

If you're looking for the PostHog logo, you came to the right place. Please keep the logo intact. SVG is always preferred as it will infinitely scale with no quality loss.

Each logo below is rendered live from our [`@posthog/brand`](https://github.com/PostHog/brand) library — the single source of truth for the mark — so it always matches the current logo. Click any format to download it (logos are transparent; the previews sit on a solid background color). If you're building a PostHog UI, import the parametric `<Logo>` component from `@posthog/brand` directly rather than downloading a file, and browse every lockup at [brand.posthog.com](https://brand.posthog.com). A flat 4-color/CMYK (`print`) variant is also available from the library for print vendors.

<BrandLogos />

### When to use each logo

-   **Full-color** is the primary logo — use it by default.
-   On **dark backgrounds, always use the white logo** — never the full-color version.
-   On **light backgrounds, prefer the full-color logo**, and only reach for the black logo when a single-color mark is required.
-   Use the **print (4-color)** version only for print or other limited-palette contexts where the gradient can't be reproduced.
-   Use the **logomark** on its own only at small sizes — favicons, app icons — where the full lockup won't fit and the overlapping gradients would get too busy.
-   The **stacked** lockup is for portrait or square placements where the landscape lockup is too wide.

_Never_ modify the colors in the logomark (for example, don't recolor the hedgehog's face white on a dark background — use the white logo instead).

The padded PNGs help when uploading to a third-party service with no control over margin around the logo, and the @2x versions are for [hi-dpi (or "Retina") screens](https://en.wikipedia.org/wiki/Retina_display) — include them when a service accepts both.

> **Using an older version?** These logos come straight from the [`@posthog/brand`](https://github.com/PostHog/brand) library, so this page always reflects the current mark. If you have an older PostHog logo saved locally (e.g. a square font or sharp-edged logomark), please replace it with the current version from this page.

### Squeak

<PrivateLink url="https://github.com/PostHog/company-internal/blob/master/Squeak_OTF.zip">Squeak</PrivateLink> is used in informal settings, generally accompanied by hedgehog artwork.

#### Usage guidelines

-   When used for headlines or at larger sizes, use the `Bold` variant
-   Only for small (description) text, use the `Normal` variant in regular casing. Never use for more than a couple lines of text in a row.
-   Always use uppercase letters
-   Letter spacing: -2%
-   Line height: 100% (generally)

#### Examples

<ImageSlider>

![Squeak font example](https://res.cloudinary.com/dmukukwp6/image/upload/squeak_example_37b83e4cde.jpg)

![Squeak font example](https://res.cloudinary.com/dmukukwp6/image/upload/squeak_example_2_4323797eb0.png)

![Squeak font example](https://res.cloudinary.com/dmukukwp6/image/upload/squeak_example_3_d367809597.png)

</ImageSlider>

### Loud Noises

<PrivateLink url="https://github.com/PostHog/company-internal/blob/master/fonts/LOUD_NOISES.ttf">Loud Noises</PrivateLink> is used for quotes in hedgehog artwork.

#### Usage guidelines

-   Only use for quotes in hedgehog artwork or where hedgehogs are otherwise communicating something
-   Only use uppercase

#### Example

Loud Noises is used in the sign the hedgehog is holding:

![](https://res.cloudinary.com/dmukukwp6/image/upload/loud_noises_5919818659.png)

---

If you have questions about which font to use, please ask in <PrivateLink url="https://posthog.slack.com/archives/C01V9AT7DK4">#team-website</PrivateLink> - don't just do what feels right to you!


## Colors

We have two color schemes (light and dark mode), but primarily use light mode.

We use the same set of colors, and only swap out a couple hues depending on the color scheme.

Colors denoted with an asterisk (\*) are the same between palettes.

| Name                        | Light mode                                                      | Dark mode                                                       |
| --------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| Text color (at 90% opacity) | <span style="color:#151515; font-size: 20px">■</span> `#151515` | <span style="color:#EEEFE9; font-size: 20px">■</span> `#EEEFE9` |
| Background color            | <span style="color:#EEEFE9; font-size: 20px">■</span> `#EEEFE9` | <span style="color:#151515; font-size: 20px">■</span> `#151515` |
| Accent                      | <span style="color:#E5E7E0; font-size: 20px">■</span> `#E5E7E0` | <span style="color:#2C2C2C; font-size: 20px">■</span> `#2C2C2C` |
| Dashed divider line         | <span style="color:#D0D1C9; font-size: 20px">■</span> `#D0D1C9` | <span style="color:#4B4B4B; font-size: 20px">■</span> `#4B4B4B` |
| Red\*                       | <span style="color:#F54E00; font-size: 20px">■</span> `#F54E00` |                                                                 |
| Yellow                      | <span style="color:#DC9300; font-size: 20px">■</span> `#DC9300` | <span style="color:#F1A82C; font-size: 20px">■</span> `#F1A82C` |
| Blue\*                      | <span style="color:#1D4AFF; font-size: 20px">■</span> `#1D4AFF` |                                                                 |
| Gray\*                      | <span style="color:#BFBFBC; font-size: 20px">■</span> `#BFBFBC` |                                                                 |
| Links                       | Use Red                                                         |                                                                 |

### Use `opacity` over more colors

When possible, use opacity to modify colors. This allows us to use fewer colors in our palette, which is light years easier when working with two color schemes.

| Paragraph text | `rgba($value, 90%)`                 |
| -------------- | ----------------------------------- |
| Links          | `rgba($value, 95%)` (and semibold)  |
| Links:hover    | `rgba($value, 100%)` (and semibold) |

## Presentations

We use [Pitch](https://pitch.com) for polished presentations (like when giving a talk). Read more about this in our [communication guidelines](/handbook/company/communication#google-docs-and-slides).

## Illustration guide

Our hedgehog mascot is called Max and we're quite particular about how he (or any of his hoggy pals) are illustrated. We're exploring AI tools for internal use, but currently ask that you don't use AI tools to create your own hedgehog art. Instead, you can follow the guidelines below, or [create a new art request](/handbook/brand/art-requests).  

![How to draw a hedgehog](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/hog_guide_1_2fab7b9cb6.png)

If Max is drawn in color he should always have a beige body with brown spines, arms, and legs. His arms should only bend once in the middle and he doesn't have fingers unless swearing or pointing. His feet are stubby by design and his snout lines should be visible unless obscured by a mask or beard. His expression comes mainly from his eyebrows. 

![Draw the rest of the hedgehog](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/hog_guide2_d61482248f.png)

He should be outlined with a strong, black monoline with consistent thickness. He should always face left, right, or straight-on but shouldn't be drawn with a side profile or from behind as he's self-conscious.

> A more detailed version of this guide is <PrivateLink url="https://www.figma.com/file/I0VKEEjbkKUDSVzFus2Lpu/Hoggies?type=design&node-id=0-1&mode=design&t=H3ElmuzbLMFp4qP7-0">available on Figma</PrivateLink> for team members.

## Hedgehog library

For team members we keep all our currently approved hedgehogs <PrivateLink url="https://www.figma.com/file/I0VKEEjbkKUDSVzFus2Lpu/Hoggies?type=design&node-id=0-1&mode=design&t=H3ElmuzbLMFp4qP7-0">in this Figma file</PrivateLink>. This enables us to look through the library of approved hogs, and to export them at required sizes without relying on the design team.

Here's how:

1. Open the Figma file. You can manually browse, or use `Cmd + F` to search based on keywords such as 'happy', 'sad', or 'will smith'.
2. Select the hog you want. If needed, adjust the size using the 'Frame' menu in the top of the right-hand sidebar.
3. At the bottom of the right-hand sidebar, select the file type you need in the 'Export' menu, choose `@2x`, then select 'Export [filename]' to download the image.

If you can't find a suitable hog, you can [request one from the design team](/handbook/brand/art-requests).

> Non-team members can find some of the most-used hogs to download on [our press page](/media).
