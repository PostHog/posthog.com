# AIObservability

Product-page sections specific to `/ai-observability` (`src/hooks/productData/ai_observability.tsx` wires them into `productMenu` via the `component` prop).

- `OldWaySection` / `PostHogWaySection` – the "What is this?" pair replacing the old ELI5 paragraph, following the Replay Vision pattern: a Human-actor `FlowDiagram` of the manual debugging loop, then the Machine-actor loop ending in a reviewed PR. Both reuse `components/Code/FlowDiagram` and `components/ReplayVision/sectionHelpers` (`SectionLabel`, `InlineIcon`) rather than duplicating them; if a third product adopts this pattern, promote those helpers out of `ReplayVision/`.

Copy source of truth: `/docs/ai-observability/start-here` and `/docs/self-driving` – the loop steps must match what the product ships (evals, anomaly alerts, signals, inbox, PRs).
