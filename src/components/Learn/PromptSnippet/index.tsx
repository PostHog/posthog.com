import React from 'react'
import { SingleCodeBlock } from 'components/CodeBlock'
import { cn } from '../../../utils'

export type PromptSnippetProps = {
    /** The prompt's name, shown in the code block's label bar. */
    title: string
    /** The full prompt. The block shows a preview that scrolls, and Copy copies all of it. */
    prompt: string
    /** Runs after the copy button writes to the clipboard, for example to send an analytics event. */
    onCopy?: () => void
    className?: string
}

/**
 * An agent prompt as a compact code block: the site's `SingleCodeBlock`, the same component and settings as the
 * prompts on each `/learn/<product>/agent-prompts-and-mcp` page, with a shorter preview height for a grid.
 * The wrapper classes make the text wrap, remove the block's margins, cap the height with a hidden scrollbar, and show
 * the label (the prompt's title) at full opacity, because here it names the prompt instead of a file.
 */
export default function PromptSnippet({ title, prompt, onCopy, className }: PromptSnippetProps): JSX.Element {
    return (
        <div
            className={cn(
                'min-w-0 [&_.code-block]:my-0 [&_.code-block>div:first-child>.opacity-50]:opacity-100 [&_.code-block_pre]:max-h-36 [&_.code-block_pre]:overflow-y-auto [&_.code-block_pre]:[scrollbar-width:none] [&_.code-block_pre::-webkit-scrollbar]:hidden [&_.min-w-fit]:min-w-0 [&_.whitespace-pre]:whitespace-pre-wrap [&_.whitespace-pre]:break-words',
                className
            )}
        >
            <SingleCodeBlock
                language="text"
                label={title}
                showLabel
                showCopy
                showLineNumbers={false}
                showAskAI={false}
                onCopy={onCopy}
            >
                {prompt}
            </SingleCodeBlock>
        </div>
    )
}
