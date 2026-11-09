/**
 * MCPLeaderboardCallout
 *
 * "Ad" callout that sends readers to /mcp/leaderboard. Laid out like FieldGuideCallout
 * (src/components/FieldGuide/FieldGuideCallout.tsx): full width of its container, hoggie on the left
 * breaking out of the top border, copy in the middle, and the button on the right. Under 576px of
 * container width the button moves below the copy.
 *
 * Brand spec (PostHog design system, checked Oct 2026):
 * - Colors: @posthog/brand lemon lighter surface in light mode; the posthog.com `light-12` token in dark mode.
 * - Text: the site's primary text color (near-black on light, near-white on dark). Lines: that color at 20%.
 *   No glows or soft shadows.
 * - Heading font: RoundHog 800 (site already maps `font-rounded` to RoundHog). Body: site system stack.
 * - Hog: HedgehogBasketballCoach from @posthog/brand/hoggies. Button: OSButton variant="primary".
 *
 * Styles are scoped with an `mlc-` prefix and injected inline, like TraceExplorerCallout.
 *
 * Usage (MDX):
 *   import MCPLeaderboardCallout from 'components/MCPLeaderboardCallout'
 *
 *   <MCPLeaderboardCallout />
 */
import React from 'react'
import { colors } from '@posthog/brand/colors'
import { HedgehogBasketballCoach } from '@posthog/brand/hoggies'
import OSButton from 'components/OSButton'

export default function MCPLeaderboardCallout({ className = '' }: { className?: string }): JSX.Element {
    return (
        // The wrapper is a size container, so the layout follows the reader width, not the viewport.
        <aside
            aria-label="MCP leaderboard"
            className={`not-prose mlc-wrap [--mlc-dark-bg:theme(colors.light-12)] ${className}`}
        >
            <style>{CSS}</style>
            <div className="mlc-root">
                <HedgehogBasketballCoach
                    title="A hedgehog basketball coach spinning a ball, holding a clipboard"
                    className="mlc-hog"
                />
                <div className="mlc-text">
                    <h3 className="mlc-heading">We just had to rank the robots</h3>
                    <p className="mlc-body">
                        Watch agents fight over who calls the PostHog MCP the most. The agents did not ask for this, but
                        the humans are having fun watching it.
                    </p>
                </div>
                <div className="mlc-actions">
                    <OSButton asLink to="/mcp/leaderboard" variant="primary" size="md">
                        MCP Leaderboard
                    </OSButton>
                </div>
            </div>
        </aside>
    )
}

const CSS = `
/* Top padding leaves room for the hog that breaks out of the top border. */
.mlc-wrap{container-type:inline-size; margin:24px 0; padding-top:32px}
/* Lemon comes from @posthog/brand/colors. Text and lines use the site's primary text color. */
.mlc-root{
  --mlc-bg:${colors.lemon.lighter};
  --mlc-line:rgb(var(--text-primary) / .2);
  --mlc-text:rgb(var(--text-primary));
  position:relative; display:flex; align-items:center; gap:16px; box-sizing:border-box;
  min-height:96px; padding:16px 20px 16px 152px; background:var(--mlc-bg);
  border:1px solid var(--mlc-line); border-radius:8px; color:var(--mlc-text);
}
.dark .mlc-root{
  --mlc-bg:var(--mlc-dark-bg);                     /* posthog.com light-12 token, set on .mlc-wrap */
}
.mlc-text{flex:1 1 auto; min-width:0; display:flex; flex-direction:column; gap:4px}
.mlc-heading{margin:0; font-family:"RoundHog", sans-serif; font-size:24px; line-height:1.2; font-weight:800; color:var(--mlc-text)}
.mlc-body{margin:0; font-size:15px; line-height:1.5; color:var(--mlc-text)}
.mlc-actions{flex:none; display:flex}

/* Hog on the left, breaking out of the top border. */
.mlc-hog{position:absolute; top:-32px; left:12px; display:block; width:120px; height:auto}

/* Narrow: smaller hog, button under the copy. */
@container (max-width: 575px){
  .mlc-root{flex-direction:column; align-items:flex-start; gap:12px; padding:16px 16px 16px 112px}
  .mlc-heading{font-size:20px}
  .mlc-hog{top:-24px; left:8px; width:96px}
}
`
