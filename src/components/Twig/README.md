# Twig embeds

`TwigEmbed` displays the real Twig application in a titled, scrollable iframe. Posthog.com owns
only the surrounding guide text and figure captions. Twig owns all controls, listings,
instrumentation state, and results. There are no copies of its UI or reducer in this site.

## Routes

- `/`: the full website for the introduction.
- `/embed/stay-filters/fixed`: the native filter lab, starting before applying the fixed-value code.
- `/embed/stay-filters/clicked`: the corrected-code exercise, starting before applying the code.

The exercise routes use Twig's Discover, FilterLab, and FilterInspector components. Changes to
those components apply to both the website and guide embeds. Each iframe has an independent run.

## Preview and deployment

Development defaults to `http://localhost:3000`. Run Twig alongside the Gatsby server.
Production defaults to `https://twig.com`. Set `GATSBY_TWIG_URL` to a deployed Twig preview
when reviewing the guide before the Twig PR lands. Deploy the embed routes before publishing
the guide against the production URL. No shared npm package is required by posthog.com.

## Verification

In the fixed-value lab, apply the code and click Forest, then Coast on the actual catalog.
Both selections must update the listings, while the second event incorrectly records Forest.
Inspect the difference: this exercise must stop at the mismatch, with no repair or lab picker.
Continue reading should focus and scroll to the guide's explanation of the fix.
In the clicked-value embed, apply the corrected code, click Forest and Coast, and inspect the
matching events. Continue reading returns to the prose immediately after that figure.
Reset exercise stays in the same exercise and clears its events. Markers and stay-detail links
are unavailable in these bounded exercises; the full website retains normal navigation.

The iframe sends a `twig:continue` message with its exercise ID only after inspection. The
wrapper checks the sending window, Twig origin, and exercise ID before moving to its configured
reading anchor. It never accepts a navigation URL from the iframe. The prose remains freely scrollable.
