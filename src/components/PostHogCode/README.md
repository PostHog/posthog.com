# PostHogCode

Marketing page for PostHog Code (`/code`) styled to look like the PostHog Code desktop app.

## Architecture

This is an "app-less" window (no `<Editor />`, `<Reader />`, or `<Presentation />` wrapper). The component renders its own internal chrome that mimics the real PostHog Code desktop app layout.

### Components

| Component | File | Description |
|-----------|------|-------------|
| `PostHogCode` | `index.tsx` | Main layout with state management (active section, sidebar toggle) |
| `CodeHeader` | `CodeHeader.tsx` | 36px header bar with sidebar toggle and section title |
| `CodeSidebar` | `CodeSidebar.tsx` | Left sidebar (260px) with section navigation styled as a task list |
| `CodeConversation` | `CodeConversation.tsx` | Main chat area rendering static conversation items |
| `CodeEditor` | `CodeEditor.tsx` | Decorative message input at bottom (non-functional) |

### Data

`data.tsx` contains all static content structured as `Section[]`. Each section has:
- `id` - unique identifier
- `title` - shown in sidebar and header
- `icon` - displayed next to the title in the sidebar
- `conversation` - array of `ConversationItem` objects (user messages, tool calls, think blocks, agent messages)

### Styling

Maps the real PostHog Code app's Radix Themes styling to posthog.com's Tailwind tokens:

| Real App | posthog.com | Usage |
|----------|-------------|-------|
| `bg-gray-1` | `bg-accent` | Backgrounds |
| `border-gray-6` | `border-input` | Borders |
| `--accent-9` | `border-red dark:border-yellow` | User message left border |
| Berkeley Mono | `font-code` | All text |
| `text-gray-10/11/12` | `text-muted/secondary/primary` | Text hierarchy |

### Adding content

To add or modify sections, edit `data.tsx`. Each conversation item type renders differently:

- `user` - Gray background with accent left border, medium weight text
- `tool` - Muted text with tool icon, shows tool name and detail string
- `think` - Bordered box with brain icon and "Thinking..." label
- `agent` - Plain prose with JSX content (headings, lists, code, links)

### Related files

- `src/pages/code/index.tsx` - Gatsby page that renders `<PostHogCode />`
- `src/context/App.tsx` - Window settings for `/code` route (900x600 min, 1200x900 max)
- `src/components/Desktop/index.tsx` - Desktop icon entry in `useProductLinks()`
- `src/hooks/useProduct.ts` - Product metadata (handle: `twig`, slug: `code`)
