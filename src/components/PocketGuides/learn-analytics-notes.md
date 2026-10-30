# Learn analytics and Twig handoff

Learn tracking in the website PostHog project records `learn_section_selected` for the sidebar
Overview and hub page links, `learn_chapter_selected` for chapter links, and `learn_resource_selected` for the
agent/story/Twig choices. The agent prompt copy buttons record `learn_prompt_copied`.
These events come from shared components, so every Learn hub sends them with its own `volume`:
`LearnNav` in `buildProductMenuTabs.tsx` (sidebar), `LearnLanding.tsx` (overview),
`AgentPromptsPage.tsx` and `AgentTeachingActions.tsx` (agent page), and `LivePlaygroundPage.tsx`
(Explore Twig). `handOffToTwig` in `learnTracking.ts` holds the Twig handoff, and its
`learn_source` is the volume.
`learn_chapter_engaged` fires once per chapter visit after ten seconds with the tab visible, the
reader window active, and the reader reaching the chapter's end; it is an engagement signal,
not proof of comprehension.
These events include the volume and a short resource, section, or chapter key, without prompt text.
Agent and Twig selections measure the choice to open a resource, not successful use inside it.
The copyable Twig link is the plain Twig URL. Clicking or pressing Enter on Explore Twig
passes the website visitor ID and current session, when available, in a URL fragment only after
`cookie_consent` is `yes` (the older banner) or `acknowledged` (the current toast), and the SDK
confirms that capture is not opted out. Declined, undecided, unrecognized, or unreadable consent
and SDK opt-out use the plain Twig URL without creating a person profile or passing identifiers.
Copying the link or opening it from a context menu reaches Twig without the handoff. Twig
removes the fragment before starting its own analytics, then sends that visitor's Twig learning
events to the website project under the same ID. Twig's own project continues to receive its
usual events.
Existing `$pageview`, `reader_tab_click`, and `pocket_guide_interaction` events cover entry and
in-chapter actions.
