import React, { useRef, useEffect } from 'react'

interface CodeEditorProps {
    value: string
    onChange: (value: string) => void
    onSubmit: (value: string) => void
    disabled?: boolean
}

export default function CodeEditor({ value, onChange, onSubmit, disabled }: CodeEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        const el = textareaRef.current
        if (!el) return
        el.style.height = 'auto'
        el.style.height = `${el.scrollHeight}px`
    }, [value])

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if ((e.key === 'Enter' && !e.shiftKey) || (e.key === 'Enter' && (e.metaKey || e.ctrlKey))) {
            e.preventDefault()
            if (value.trim() && !disabled) {
                onSubmit(value)
            }
        }
    }

    return (
        <div className="border-t border-input shrink-0 bg-primary">
            <div className="mx-auto max-w-[750px] p-2">
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    rows={1}
                    placeholder="Type a message... @ to mention files, / for skills"
                    className="w-full resize-none overflow-hidden rounded-sm border border-input bg-primary px-3 py-2.5 text-sm text-primary font-code placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-input disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <div className="flex items-center gap-2 mt-1 px-1">
                    <span className="text-[10px] text-muted font-code">plan mode</span>
                    <span className="text-[10px] text-muted font-code opacity-50">
                        Enter to send · Shift+Enter for new line
                    </span>
                </div>
            </div>
        </div>
    )
}
