# PromptSnippet

A compact code block for one agent prompt: the prompt's name in the label bar, a preview of the text, and a copy button. The Learn prompt library (`/learn/prompts`) uses it.

## Design

It is the site's `SingleCodeBlock` from `components/CodeBlock`, with the same settings as the prompts on each `/learn/<product>/agent-prompts-and-mcp` page (`AgentPromptsPage`):

- `language="text"`, no line numbers, no Ask AI button.
- The text wraps, and the block scrolls with a hidden scrollbar.

`PromptSnippet` changes three things, only inside its own wrapper, so other code blocks do not change:

- The preview height is `max-h-36` (about seven lines) instead of `max-h-72`, so a grid of prompts stays compact.
- The block has no top or bottom margin. The grid sets the spacing.
- The label shows at full opacity. `CodeBlock` dims its label because it usually names a file. Here the label is the prompt's title.

## Usage

```tsx
import PromptSnippet from 'components/Learn/PromptSnippet'

<PromptSnippet
    title="Start with your product"
    prompt={fullPromptText}
    onCopy={() => posthog?.capture('learn_prompt_copied', { surface: 'prompt_library' })}
/>
```

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `title` | `string` | The prompt's name, shown in the label bar. |
| `prompt` | `string` | The full prompt. The block shows a preview that scrolls. Copy copies all of it. |
| `onCopy` | `() => void` | Optional. Runs after a copy. Use it for analytics. |
| `className` | `string` | Optional. Classes for the outer wrapper. |
