---
title: 'Logos, brand, hedgehogs'
sidebar: Handbook
showTitle: true
hideAnchor: false
---
> Want to add the [PostHog badge](/docs/contribute/badge) to your website? (Did we mention free merch?)

## Logo

If you're looking for the PostHog logo, you came to the right place. Please keep the logo intact. SVG is always preferred as it will infinitely scale with no quality loss.

<OverflowXSection>

| Preview | Name          | Vector | PNG                   | PNG w/ padding*                      |
|---------|---------------|--------|-----------------------|--------------------------------|
| <img src="https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/handbook/company/brand/posthog-logo@2x.png" width="157" />     | Standard logo | <a href="/brand/posthog-logo.svg" download>SVG</a> | <a href="/brand/posthog-logo.png" download>PNG</a> \| <a href="/brand/posthog-logo@2x.png" download>PNG @2x</a> |  <a href="/brand/posthog-logo-padded.png" download>PNG</a> \| <a href="/brand/posthog-logo-padded@2x.png" download>PNG @2x</a> |
| ![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/handbook/company/brand/posthog-logo-black.svg)  | Dark logo | <a href="/brand/posthog-logo-black.svg" download>SVG</a> | <a href="/brand/posthog-logo-black.png" download>PNG</a> \| <a href="/brand/posthog-logo-black@2x.png" download>PNG @2x</a> |  <a href="/brand/posthog-logo-black-padded.png" download>PNG</a> \| <a href="/brand/posthog-logo-black-padded@2x.png" download>PNG @2x</a> |
| ![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/handbook/company/brand/posthog-logo-white.svg)  | Light logo    | <a href="/brand/posthog-logo-white.svg" download>SVG</a> | <a href="/brand/posthog-logo-white.png" download>PNG</a> \| <a href="/brand/posthog-logo-white@2x.png" download>PNG @2x</a> |  <a href="/brand/posthog-logo-white-padded.png" download>PNG</a> \| <a href="/brand/posthog-logo-white-padded@2x.png" download>PNG @2x</a> |
| ![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/handbook/company/brand/posthog-logomark.svg)    | Logomark      | <a href="/brand/posthog-logomark.svg" download>SVG</a> | <a href="/brand/posthog-logomark.png" download>PNG</a> \| <a href="/brand/posthog-logomark@2x.png" download>PNG @2x</a> |  <a href="/brand/posthog-logomark-padded.png" download>PNG</a> \| <a href="/brand/posthog-logomark-padded@2x.png" download>PNG @2x</a> |

</OverflowXSection>

*PNGs with padding are useful when uploading the logo to a third-party service where there is limited control over padding/margin around the logo.

The @2x version of PNGs are designed for [hi-dpi (or "Retina") screens](https://en.wikipedia.org/wiki/Retina_display). When using the logo in third party services that support uploading multiple versions (standard and hi-dpi), please be sure to include the @2x logo as it will appear crisper on newer devices, tablets and high resolution mobile devices.

> **Important:** We updated our logo in 2021. Please be sure to use the _correct_ version. 👇🏼

![Logo usage examples](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/handbook/company/brand/logo-usage.png)

If you have any questions or need clarification about which version to use, ask Cory, or reach out in [our community page](/posts) and we'll be happy to help.

## Typography

We use Displaay's typeface called *Matter SQ*. (SQ = square dots)

### Building for web

On posthog.com, we use the [variable font](https://web.dev/variable-fonts/) version. This allows us to specify our own font weights, which we do for paragraph text.

Context: *Matter Regular*'s weight is `430` and the next step up is *Matter Medium* at `570`, so we use our own weight of `475` for paragraph text.

### Developing locally

Fonts are hosted outside of our posthog.com GitHub repo (due to licensing reasons). To protect the font files, they are restricted to loading on posthog.com and are not currently used for local development. Contributors will see the system default font load in place of Matter.

**Workaround for local development**

Restricted to PostHog employees, it's possible to reference the font locally to see an exact replication of what will be published on posthog.com.

[Layout.scss](https://github.com/PostHog/posthog.com/blob/master/src/components/Layout/Layout.scss) contains some commented out code which can be used, in conjunction with the [variable webfont files](https://github.com/PostHog/company-internal/blob/master/MatterSQVF.zip) (restricted to PostHog organization members). Here's how to use them:

1. Download the webfont files from the zip above
1. Extract the files and place them in `/public/fonts`
1. In `Layout.scss`, comment out the `src` for both fonts with production (Cloudfront) URLs and uncomment the relative URLs.
1. Optionally use `.gitignore` to keep the files locally without inadvertently checking them in

Note: When submitting a PR, be sure to revert changes made to `Layout.scss`

### Designing on desktop

We use 4 cuts of Displaay's *Matter SQ* typeface (SQ stands for square dots):

1. *Bold* (titles and section headers)
2. *Semibold* (paragraphs accompanying headers and paragraph links)
3. *Regular* & *Regular Italic* (paragraph text)

Note that *Regular* and *Regular Italic* are lighter than the font-weight we use on the web, so paragraph text in Figma mockups will look noticeably thinner than how it appears on posthog.com.

When designing ads or other content with non-paragraph text, use *Semibold* instead of *Regular*.

We have a handful of licenses for desktop use of Matter. Contact Cory if you need the desktop fonts (OTFs).

| Name                                  | Weight   | Size       | Letter spacing | Line height |
|---------------------------------------|----------|------------|----------------|-------------|
| h1                                    | Bold     | 64px       | -1%            | 100%        |
| h2                                    | Bold     | 48px       | -1%            | 120%        |
| h3                                    | Bold     | 30px       | -2%            | 140%        |
| h4                                    | Bold     | 24px       | -2%            |             |
| h5                                    | Semibold | 20px       | -2%            |             |
| h6                                    | Semibold | 16px       | 0              |             |
| Paragraphs accompanying large headers | Semibold | 20px       | -1%            | 125%        |
| p                                     | Regular  | 17px       |                | 175%        |
| p (small)                             | Regular  | 15px       |                | 150%        |

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

## Presentations

We use [Pitch](https://pitch.com) for polished presentations (like when giving a talk). Read more about this in our [communication guidelines](/handbook/company/communication#google-docs-and-slides).

## Hedgehog library

For team members we keep all our currently approved hedgehogs [in this Figma file](https://www.figma.com/file/I0VKEEjbkKUDSVzFus2Lpu/Hoggies?type=design&node-id=0-1&mode=design&t=H3ElmuzbLMFp4qP7-0). This enables us to look through the library of approved hogs, and to export them at required sizes without relying on the design team.

Here's how:
1. Open the Figma file. You can manually browse, or use `Cmd + F` to search based on keywords such as 'happy', 'sad', or 'will smith'.
2. Select the hog you want. If needed, adjust the size using the 'Frame' menu in the top of the right-hand sidebar. 
3. At the bottom of the right-hand sidebar, select the file type you need in the 'Export' menu, choose `@2x`, then select 'Export [filename]' to download the image.

If you can't find a suitable hog, you can [request one from the design team](/handbook/design/art-requests). 

> Non-team members can find some of the most-used hogs to download on [our press page](/media).
