import React, { useEffect, useMemo, useState } from 'react'
import Editor from 'components/Editor'
import {
    JsxComponentDescriptor,
    MDXEditor as MDXEditorComponent,
    frontmatterPlugin,
    headingsPlugin,
    jsxPlugin,
    linkPlugin,
    listsPlugin,
    toolbarPlugin,
    usePublisher,
    applyFormat$,
    currentFormat$,
    useCellValues,
    FORMAT,
    IS_BOLD,
    IS_ITALIC,
    IS_STRIKETHROUGH,
    activeEditor$,
} from '@mdxeditor/editor'
import {
    LexicalEditor,
    REDO_COMMAND,
    UNDO_COMMAND,
    FORMAT_ELEMENT_COMMAND,
    $getSelection,
    $isRangeSelection,
    COMMAND_PRIORITY_CRITICAL,
    CAN_REDO_COMMAND,
    CAN_UNDO_COMMAND,
} from 'lexical'
import { mergeRegister } from '@lexical/utils'
import { navigate } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { useApp } from '../../context/App'

export default function MDXEditor({
    body,
    mdxBody,
    jsxComponentDescriptors = [],
    cta,
}: {
    mdxBody?: string
    body: string
    jsxComponentDescriptors: JsxComponentDescriptor[]
    cta?: {
        url: string
        label: string
    }
}) {
    const [isSSR, setIsSSR] = useState(true)
    const [currentFormat, setCurrentFormat] = useState<FORMAT>(0)
    const [activeEditor, setActiveEditor] = useState<LexicalEditor>()
    const applyFormatRef = React.useRef<((value: any) => void) | null>(null)
    const [currentAlignment, setCurrentAlignment] = useState<'left' | 'center' | 'right' | 'justify'>('left')
    const [canUndo, setCanUndo] = React.useState(false)
    const [canRedo, setCanRedo] = React.useState(false)
    const mdxEditorContainerRef = React.useRef<HTMLDivElement>(null)
    const { websiteMode } = useApp()

    const mdxComponents = useMemo(() => {
        return jsxComponentDescriptors.reduce((acc, descriptor) => {
            acc[descriptor.name] = descriptor.Editor
            return acc
        }, {} as Record<string, React.ComponentType<any>>)
    }, [])

    useEffect(() => {
        if (activeEditor) {
            mergeRegister(
                activeEditor.registerCommand<boolean>(
                    CAN_UNDO_COMMAND,
                    (payload) => {
                        setCanUndo(payload)
                        return false
                    },
                    COMMAND_PRIORITY_CRITICAL
                ),
                activeEditor.registerCommand<boolean>(
                    CAN_REDO_COMMAND,
                    (payload) => {
                        setCanRedo(payload)
                        return false
                    },
                    COMMAND_PRIORITY_CRITICAL
                )
            )

            const removeUpdateListener = activeEditor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    const selection = $getSelection()
                    if (selection && $isRangeSelection(selection)) {
                        const anchorNode = selection.anchor.getNode()
                        const element = anchorNode.getParent()
                        if (element) {
                            const format = element.getFormat()
                            const alignment = format & 0x7
                            setCurrentAlignment(
                                alignment === 1
                                    ? 'left'
                                    : alignment === 2
                                    ? 'center'
                                    : alignment === 3
                                    ? 'right'
                                    : alignment === 4
                                    ? 'justify'
                                    : 'left'
                            )
                        }
                    }
                })
            })
            return () => removeUpdateListener()
        }
    }, [activeEditor])

    useEffect(() => {
        setIsSSR(false)
    }, [])

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const href = (event.target as HTMLElement).closest('a.mdx-editor-link')?.getAttribute('href')
        if (href) {
            navigate(href, { state: { newWindow: true } })
        }
    }

    return (
        <Editor
            type="mdx"
            actionButtons={{
                undo: {
                    onClick: () => activeEditor?.dispatchCommand(UNDO_COMMAND, undefined),
                    disabled: !canUndo,
                },
                redo: {
                    onClick: () => activeEditor?.dispatchCommand(REDO_COMMAND, undefined),
                    disabled: !canRedo,
                },
                bold: {
                    onClick: () => applyFormatRef.current?.('bold'),
                    active: (currentFormat & IS_BOLD) !== 0,
                },
                italic: {
                    onClick: () => applyFormatRef.current?.('italic'),
                    active: (currentFormat & IS_ITALIC) !== 0,
                },
                strikethrough: {
                    onClick: () => applyFormatRef.current?.('strikethrough'),
                    active: (currentFormat & IS_STRIKETHROUGH) !== 0,
                },
                leftAlign: {
                    onClick: () => activeEditor?.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left'),
                    active: currentAlignment === 'left',
                },
                centerAlign: {
                    onClick: () => activeEditor?.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center'),
                    active: currentAlignment === 'center',
                },
                rightAlign: {
                    onClick: () => activeEditor?.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right'),
                    active: currentAlignment === 'right',
                },
            }}
            cta={cta}
        >
            <div onClick={handleClick} ref={mdxEditorContainerRef}>
                {isSSR && mdxBody ? (
                    <MDXProvider components={mdxComponents}>
                        <MDXRenderer>{mdxBody}</MDXRenderer>
                    </MDXProvider>
                ) : (
                    <MDXEditorComponent
                        readOnly={websiteMode}
                        contentEditableClassName="outline-none"
                        markdown={body}
                        lexicalTheme={{
                            link: 'mdx-editor-link cursor-pointer',
                        }}
                        plugins={[
                            headingsPlugin(),
                            frontmatterPlugin(),
                            listsPlugin(),
                            linkPlugin(),
                            jsxPlugin({ jsxComponentDescriptors }),
                            toolbarPlugin({
                                toolbarContents: () => {
                                    const [currentFormat, activeEditor] = useCellValues(currentFormat$, activeEditor$)
                                    const applyFormat = usePublisher(applyFormat$)
                                    useEffect(() => {
                                        applyFormatRef.current = applyFormat
                                    }, [])
                                    useEffect(() => {
                                        setCurrentFormat(currentFormat)
                                    }, [currentFormat])
                                    useEffect(() => {
                                        setActiveEditor(activeEditor)
                                    }, [activeEditor])
                                    return null
                                },
                            }),
                        ]}
                    />
                )}
            </div>
        </Editor>
    )
}
