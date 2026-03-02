# PostHogCode

Marketing component for the Code page, styled to look like the PostHog Code desktop app interface.

## Architecture

Renders an internal chrome that mimics the real PostHog Code app layout. No `<Editor />`, `<Reader />`, or `<Presentation />` wrapper.

### Components

| Component | File | Description |
| --------- | ---- | ----------- |
| `PostHogCode` | `index.tsx` | Main layout with state (active section, sidebar toggle, input) |
| `CodeHeader` | `CodeHeader.tsx` | 36px header bar with sidebar toggle and section title |
| `CodeSidebar` | `CodeSidebar.tsx` | Left sidebar (260px) with section navigation styled as a task list |
| `CodeConversation` | `CodeConversation.tsx` | Main chat area rendering conversation items |
| `CodeEditor` | `CodeEditor.tsx` | Message input at bottom (interactive) |

### Data

`data.tsx` contains static content as `Section[]`. Each section has:
- `id` – unique identifier
- `title` – shown in sidebar and header
- `icon` – displayed next to the title in the sidebar
- `conversation` – array of `ConversationItem` (user, tool, think, agent messages)

### Styling

Maps PostHog Code app styling to posthog.com Tailwind tokens:

| Real app | posthog.com | Usage |
| -------- | ----------- | ----- |
| `bg-gray-1` | `bg-accent` | Backgrounds |
| `border-gray-6` | `border-input` | Borders |
| Berkeley Mono | `font-code` | All text |
| `text-gray-10/11/12` | `text-muted/secondary/primary` | Text hierarchy |

### Related files

- `src/pages/code/index.tsx` – Page that embeds `<PostHogCode />` in the Code interface section
