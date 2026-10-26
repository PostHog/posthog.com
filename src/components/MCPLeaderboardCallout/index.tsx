/**
 * MCPLeaderboardCallout
 *
 * "Ad" callout that sends readers to /mcp/leaderboard. Same shape as TraceExplorerCallout
 * (contents/docs/ai-observability/installation/_snippets/trace-explorer-callout.tsx):
 * flat brand surface, copy on the left, hoggie on the right, stacks under 560px of container width.
 * Capped at 680px wide so the hog sits next to the copy instead of at the far edge.
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
                <div className="mlc-text">
                    <h3 className="mlc-heading">We just had to rank the robots</h3>
                    <p className="mlc-body">
                        Watch agents fight over who calls the PostHog MCP the most. The agents did not ask for this, but
                        the humans are having fun watching it.
                    </p>
                    <div className="mlc-actions">
                        <OSButton asLink to="/mcp/leaderboard" variant="primary" size="md">
                            MCP Leaderboard
                        </OSButton>
                    </div>
                </div>

                <HedgehogBasketballCoach
                    title="A hedgehog basketball coach spinning a ball, holding a clipboard"
                    className="mlc-hog"
                />
            </div>
        </aside>
    )
}

const CSS = `
.mlc-wrap{container-type:inline-size; margin:24px 0}
/* Lemon comes from @posthog/brand/colors. Text and lines use the site's primary text color. */
.mlc-root{
  --mlc-bg:${colors.lemon.lighter};
  --mlc-line:rgb(var(--text-primary) / .2);
  --mlc-text:rgb(var(--text-primary));
  position:relative; display:flex; align-items:center; gap:24px; box-sizing:border-box;
  max-width:680px; padding:24px 28px; background:var(--mlc-bg);
  border:1px solid var(--mlc-line); border-radius:8px; color:var(--mlc-text);
}
.dark .mlc-root{
  --mlc-bg:var(--mlc-dark-bg);                     /* posthog.com light-12 token, set on .mlc-wrap */
}
.mlc-text{flex:1 1 auto; min-width:0; display:flex; flex-direction:column; gap:8px}
.mlc-heading{margin:0; font-family:"RoundHog", sans-serif; font-size:24px; line-height:1.2; font-weight:800; color:var(--mlc-text)}
.mlc-body{margin:0; font-size:15px; line-height:1.5; color:var(--mlc-text)}
.mlc-actions{margin-top:8px; display:flex; flex-wrap:wrap; gap:8px}

/* Hog beside the copy, vertically centered on it. */
.mlc-hog{flex:none; display:block; width:150px; height:auto; margin:-8px 0}

/* Narrow: stack, hog centered under the copy. */
@container (max-width: 559px){
  .mlc-root{flex-direction:column; align-items:stretch; padding:20px}
  .mlc-heading{font-size:22px}
  .mlc-hog{align-self:center; width:130px; margin:0 0 -8px}
}
`
