import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Extension, Node, mergeAttributes, type Editor, type Range } from '@tiptap/core'
import { EditorContent, useEditor } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import { Placeholder } from '@tiptap/extensions'
import Image from '@tiptap/extension-image'
import Mention from '@tiptap/extension-mention'
import Suggestion, { type SuggestionOptions, type SuggestionProps } from '@tiptap/suggestion'
import { IconChevronDown, IconEye, IconPalette, IconPeople } from '@posthog/icons'

const previewWidths = { Desktop: '100%', '600 px': 600, '375 px': 375, '320 px': 320 } as const
import OSButton from 'components/OSButton'
import { blockClassName, useCountUp } from './Widgets'

// A real TipTap editor laid out like the app's email editor (EmailDocumentEditor): a floating insert toolbar,
// "/" for blocks, "{{" for variables, a selection toolbar, Edit and Preview, and a Style panel.

const audienceFilters = [
    { label: 'Active in the last 30 days', share: 0.55 },
    { label: 'On the free plan', share: 0.71 },
    { label: 'Used shared folders', share: 0.18 },
]

const variables = [
    { id: 'person.first_name', value: 'Jane' },
    { id: 'person.properties.files_shared', value: '214' },
    { id: 'person.properties.plan', value: 'Free' },
    { id: 'person.properties.company', value: 'Hedgebox Labs' },
]

const hogImage = 'https://res.cloudinary.com/dmukukwp6/image/upload/cloud_hog_katy_237c11a9fe.png'

type MenuItem = { title: string; run: (editor: Editor, range?: Range) => void }

const blockItems: MenuItem[] = [
    { title: 'Text', run: (e, r) => chain(e, r).setParagraph().run() },
    { title: 'Heading 1', run: (e, r) => chain(e, r).setHeading({ level: 1 }).run() },
    { title: 'Heading 2', run: (e, r) => chain(e, r).setHeading({ level: 2 }).run() },
    { title: 'Image', run: (e, r) => chain(e, r).setImage({ src: hogImage, alt: 'A hedgehog' }).run() },
    {
        title: 'Button',
        run: (e, r) =>
            chain(e, r)
                .insertContent({ type: 'emailButton', attrs: { label: 'Read more' } })
                .run(),
    },
    { title: 'Divider', run: (e, r) => chain(e, r).setHorizontalRule().run() },
    { title: 'Bullet list', run: (e, r) => chain(e, r).toggleBulletList().run() },
    { title: 'Numbered list', run: (e, r) => chain(e, r).toggleOrderedList().run() },
    { title: 'Quote', run: (e, r) => chain(e, r).toggleBlockquote().run() },
    {
        title: 'Unsubscribe link',
        run: (e, r) =>
            chain(e, r).insertContent('<p><a href="#">Unsubscribe</a> · <a href="#">Manage preferences</a></p>').run(),
    },
]

function chain(editor: Editor, range?: Range) {
    const c = editor.chain().focus()
    return range ? c.deleteRange(range) : c
}

// The email button block, like the app's email-canvas-button.
const EmailButton = Node.create({
    name: 'emailButton',
    group: 'block',
    atom: true,
    draggable: true,
    addAttributes: () => ({ label: { default: 'Click me' } }),
    parseHTML: () => [{ tag: 'p[data-email-button]', priority: 60 }],
    renderHTML: ({ node, HTMLAttributes }) => [
        'p',
        mergeAttributes(HTMLAttributes, { 'data-email-button': '', class: 'email-canvas-button-row' }),
        ['a', { class: 'email-canvas-button', href: '#' }, node.attrs.label],
    ],
})

// Both menus share one popup, which the suggestion plugin drives through this setter.
type MenuState = { items: { title: string; pick: () => void }[]; rect: DOMRect | null; index: number } | null
type MenuSetter = (update: (state: MenuState) => MenuState) => void
type MenuControl = { set: MenuSetter; current: MenuState }

function suggestionRender(
    menu: React.MutableRefObject<MenuControl>,
    toItems: (props: SuggestionProps<any>) => NonNullable<MenuState>['items']
) {
    return (): ReturnType<NonNullable<SuggestionOptions['render']>> => {
        let current: NonNullable<MenuState>['items'] = []
        const show = (props: SuggestionProps<any>) => {
            current = toItems(props)
            menu.current.set(() => ({ items: current, rect: props.clientRect?.() ?? null, index: 0 }))
        }
        return {
            onStart: show,
            onUpdate: show,
            onExit: () => menu.current.set(() => null),
            onKeyDown: ({ event }) => {
                if (event.key === 'Escape') {
                    menu.current.set(() => null)
                    return true
                }
                if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                    const step = event.key === 'ArrowDown' ? 1 : -1
                    menu.current.set((s) => s && { ...s, index: (s.index + step + s.items.length) % s.items.length })
                    return true
                }
                if (event.key === 'Enter') {
                    const s = menu.current.current
                    s?.items[s.index]?.pick()
                    return !!s?.items.length
                }
                return false
            },
        }
    }
}

const initialContent = `
<h1>Ask anyone for files</h1>
<p>Hi <span data-type="mention" data-id="person.first_name"></span>, you've shared <span data-type="mention" data-id="person.properties.files_shared"></span> files this year. Now you can ask for them too: send a link, and anyone can upload straight to your folder, <strong>no account needed</strong>.</p>
<p data-email-button label="Try file requests"></p>
<p></p>
`

// The app's default email styles.
const buttonColor = '#2F80FA'
const font = 'Arial, sans-serif'
const width = 560
const pageBg = '#f4f4f2'
const bodyBg = '#ffffff'
const textColor = '#222222'
const fontSize = 16
const buttonRadius = 6

const canvasCss = `
.email-canvas .ProseMirror { outline: none; }
.email-canvas .ProseMirror > * + * { margin-top: 0.75em; }
.email-canvas .ProseMirror h1 { font-size: 28px; line-height: 1.2; font-weight: 700; margin: 0; }
.email-canvas .ProseMirror h2 { font-size: 22px; line-height: 1.25; font-weight: 700; margin: 0; }
.email-canvas .ProseMirror p { margin: 0; }
.email-canvas .ProseMirror a { color: var(--email-link); text-decoration: underline; }
.email-canvas .ProseMirror ul { list-style: disc; padding-left: 1.4em; }
.email-canvas .ProseMirror ol { list-style: decimal; padding-left: 1.4em; }
.email-canvas .ProseMirror blockquote { border-left: 3px solid #ddd; padding-left: 12px; color: #555; }
.email-canvas .ProseMirror hr { border: 0; border-top: 1px solid #ddd; margin: 16px 0; }
.email-canvas .ProseMirror img { max-width: 100%; border-radius: 8px; }
.email-canvas .ProseMirror code { background: #f2f2f2; border-radius: 4px; padding: 0 4px; font-size: 0.85em; }
.email-canvas .ProseMirror .ProseMirror-selectednode { outline: 2px solid var(--email-button-background); outline-offset: 2px; }
.email-canvas .email-canvas-button-row { padding: 8px 0; }
.email-canvas .email-canvas-button { display: inline-block; padding: 12px 24px; font-weight: 600; line-height: 1.2; color: #fff !important; text-decoration: none !important; background: var(--email-button-background); border-radius: var(--email-button-radius); }
.email-canvas .email-variable { display: inline-flex; padding: 0 4px; font-family: monospace; font-size: 0.85em; color: #333; background: #f2f2f2; border: 1px solid #ddd; border-radius: 4px; }
.email-canvas .ProseMirror p.is-empty::before { content: attr(data-placeholder); color: #aaa; float: left; height: 0; pointer-events: none; }
`

function previewHtml(html: string): string {
    return html.replace(/<span[^>]*data-id="([^"]+)"[^>]*>.*?<\/span>/g, (_, id) => {
        return `<strong>${variables.find((v) => v.id === id)?.value ?? ''}</strong>`
    })
}

export function EditorBlock(): JSX.Element {
    const [audienceOpen, setAudienceOpen] = useState(false)
    const audienceRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (!audienceOpen) return
        const close = (e: Event) => {
            if (
                e instanceof KeyboardEvent
                    ? e.key === 'Escape'
                    : !audienceRef.current?.contains(e.target as globalThis.Node)
            ) {
                setAudienceOpen(false)
            }
        }
        document.addEventListener('mousedown', close)
        document.addEventListener('keydown', close)
        return () => {
            document.removeEventListener('mousedown', close)
            document.removeEventListener('keydown', close)
        }
    }, [audienceOpen])
    const [on, setOn] = useState([true, false, false])
    const [mode, setMode] = useState<'edit' | 'preview'>('edit')
    const [previewWidth, setPreviewWidth] = useState<keyof typeof previewWidths>('Desktop')
    const [menu, setMenuState] = useState<MenuState>(null)
    const setMenu = useRef<MenuControl>({
        current: null,
        set: (update) => {
            setMenu.current.current = update(setMenu.current.current)
            setMenuState(setMenu.current.current)
        },
    })
    const canvasRef = useRef<HTMLDivElement>(null)
    const people = Math.round(audienceFilters.reduce((n, f, i) => (on[i] ? n * f.share : n), 87655))
    const shownPeople = Math.round(useCountUp(people, 500))
    const activeFilters = audienceFilters.filter((_, i) => on[i])

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({ link: { openOnClick: false } }),
            Placeholder.configure({ placeholder: 'Type / for blocks, or {{ for a variable', showOnlyCurrent: false }),
            Image,
            EmailButton,
            Mention.extend({ name: 'mention' }).configure({
                HTMLAttributes: { class: 'email-variable' },
                renderText: ({ node }) => `{{ ${node.attrs.id} }}`,
                renderHTML: ({ node, options }) => [
                    'span',
                    mergeAttributes({ 'data-type': 'mention', 'data-id': node.attrs.id }, options.HTMLAttributes),
                    `{{ ${node.attrs.id} }}`,
                ],
                suggestion: {
                    char: '{{',
                    allowSpaces: false,
                    items: ({ query }) => variables.filter((v) => v.id.includes(query.trim())),
                    render: suggestionRender(setMenu, (props) =>
                        props.items.map((v: { id: string }) => ({
                            title: v.id,
                            pick: () => props.command({ id: v.id }),
                        }))
                    ),
                },
            }),
            Extension.create({
                name: 'slashCommand',
                addProseMirrorPlugins() {
                    return [
                        Suggestion({
                            editor: this.editor,
                            char: '/',
                            startOfLine: true,
                            items: ({ query }) =>
                                blockItems.filter((b) => b.title.toLowerCase().includes(query.toLowerCase())),
                            command: ({ editor, range, props }) => (props as MenuItem).run(editor, range),
                            render: suggestionRender(setMenu, (props) =>
                                props.items.map((item: MenuItem) => ({
                                    title: item.title,
                                    pick: () => props.command(item),
                                }))
                            ),
                        }),
                    ]
                },
            }),
        ],
        content: initialContent,
    })

    const canvasRect = canvasRef.current?.getBoundingClientRect()

    return (
        <div className={`${blockClassName} !p-0`}>
            <style>{canvasCss}</style>
            {/* One toolbar, then the email as one card: the header fields on top and the body below. */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-t-2xl border-b border-primary px-4 py-3">
                <div>
                    <OSButton size="sm" icon={<IconPalette />} disabled>
                        Styles
                    </OSButton>
                </div>
                <span className="truncate text-center text-sm text-secondary">New: file requests</span>
                <div className="flex items-center justify-end gap-2">
                    <OSButton
                        size="sm"
                        icon={<IconEye />}
                        active={mode === 'preview'}
                        onClick={() => setMode(mode === 'edit' ? 'preview' : 'edit')}
                    >
                        {mode === 'edit' ? 'Preview' : 'Edit'}
                    </OSButton>
                    <OSButton size="sm" variant="secondary" disabled>
                        Test
                    </OSButton>
                    <OSButton size="sm" variant="primary" disabled>
                        Send
                    </OSButton>
                </div>
            </div>

            <div className="relative flex min-h-[38rem]">
                <div
                    ref={canvasRef}
                    // The site opens search on "/" from a document listener, so keep the key inside the editor.
                    onKeyDown={(e) => e.key === '/' && e.nativeEvent.stopPropagation()}
                    className="email-canvas relative min-w-0 flex-1 rounded-b-2xl px-4 py-8 @xl/reader-content:px-10 @xl/reader-content:py-12"
                    style={
                        {
                            background: pageBg,
                            '--email-button-background': buttonColor,
                            '--email-link': buttonColor,
                            '--email-button-radius': `${buttonRadius}px`,
                        } as React.CSSProperties
                    }
                >
                    {mode === 'preview' && (
                        <div className="mb-6 flex justify-center">
                            <div className="flex rounded-md border border-primary bg-white p-0.5 text-xs dark:bg-accent">
                                {(Object.keys(previewWidths) as (keyof typeof previewWidths)[]).map((w) => (
                                    <button
                                        key={w}
                                        type="button"
                                        onClick={() => setPreviewWidth(w)}
                                        className={`rounded px-2.5 py-1 ${
                                            previewWidth === w ? 'bg-accent font-semibold' : 'text-secondary'
                                        }`}
                                    >
                                        {w}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div
                        className="mx-auto overflow-hidden rounded-xl border border-primary shadow-xl transition-[max-width] duration-300"
                        style={{
                            maxWidth: mode === 'preview' ? previewWidths[previewWidth] : width + 160,
                            width: '100%',
                        }}
                    >
                        <div className="relative bg-white px-6 text-sm text-primary dark:bg-accent @xl/reader-content:px-10">
                            <div className="grid grid-cols-[5rem_minmax(0,1fr)] items-center gap-2 border-b border-primary py-3.5">
                                <span className="text-secondary">From</span>
                                <span className="truncate">Hedgebox &lt;hello@hedgebox.net&gt;</span>
                            </div>
                            <div
                                ref={audienceRef}
                                className="grid grid-cols-[5rem_minmax(0,1fr)] items-center gap-2 border-b border-primary py-3"
                            >
                                <span className="text-secondary">To</span>
                                <div className="flex min-w-0 items-center gap-2">
                                    <button
                                        type="button"
                                        aria-expanded={audienceOpen}
                                        onClick={() => setAudienceOpen(!audienceOpen)}
                                        className="inline-flex min-w-0 items-center gap-1.5 rounded-full border border-primary bg-accent py-1 pl-3 pr-2 hover:border-secondary"
                                    >
                                        <IconPeople className="size-4 shrink-0" />
                                        <span className="truncate">{activeFilters[0]?.label ?? 'Everyone'}</span>
                                        {activeFilters.length > 1 && (
                                            <span className="shrink-0 font-semibold">+{activeFilters.length - 1}</span>
                                        )}
                                        <IconChevronDown
                                            className={`size-4 shrink-0 transition-transform ${
                                                audienceOpen ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </button>
                                    <span className="shrink-0 whitespace-nowrap text-secondary">
                                        <strong className="tabular-nums text-primary">
                                            {shownPeople.toLocaleString('en-US')}
                                        </strong>{' '}
                                        people
                                    </span>
                                </div>
                                <AnimatePresence>
                                    {audienceOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -4 }}
                                            className="absolute left-24 top-[6.5rem] z-30 w-72 rounded-md border border-primary bg-white p-3 shadow-xl dark:bg-accent"
                                        >
                                            <strong className="mb-2 block text-xs uppercase text-secondary">
                                                Audience from your product data
                                            </strong>
                                            {audienceFilters.map((f, i) => (
                                                <label
                                                    key={f.label}
                                                    className="flex cursor-pointer items-center gap-2 py-0.5"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={on[i]}
                                                        onChange={() => setOn(on.map((v, j) => (j === i ? !v : v)))}
                                                        className="accent-red"
                                                    />
                                                    {f.label}
                                                </label>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="grid grid-cols-[5rem_minmax(0,1fr)] items-center gap-2 py-3.5">
                                <span className="text-secondary">Subject</span>
                                <span className="truncate">New: ask anyone for files</span>
                            </div>
                        </div>
                        <img
                            src={hogImage}
                            alt=""
                            className="block h-40 w-full object-cover"
                            style={{ background: '#fde68a' }}
                        />
                        <div
                            className="px-8 py-10 @xl/reader-content:px-12"
                            style={{
                                background: bodyBg,
                                color: textColor,
                                fontFamily: font,
                                fontSize,
                                lineHeight: 1.6,
                            }}
                        >
                            {mode === 'edit' ? (
                                <EditorContent editor={editor} />
                            ) : (
                                <div
                                    className="ProseMirror"
                                    dangerouslySetInnerHTML={{ __html: previewHtml(editor?.getHTML() ?? '') }}
                                />
                            )}
                        </div>
                    </div>

                    {editor && mode === 'edit' && (
                        <BubbleMenu editor={editor}>
                            <div className="flex gap-0.5 rounded border border-primary bg-white p-0.5 text-sm text-primary shadow-lg dark:bg-accent">
                                {[
                                    {
                                        label: 'B',
                                        cls: 'font-bold',
                                        run: () => editor.chain().focus().toggleBold().run(),
                                        active: 'bold',
                                    },
                                    {
                                        label: 'I',
                                        cls: 'italic',
                                        run: () => editor.chain().focus().toggleItalic().run(),
                                        active: 'italic',
                                    },
                                    {
                                        label: 'U',
                                        cls: 'underline',
                                        run: () => editor.chain().focus().toggleUnderline().run(),
                                        active: 'underline',
                                    },
                                    {
                                        label: 'S',
                                        cls: 'line-through',
                                        run: () => editor.chain().focus().toggleStrike().run(),
                                        active: 'strike',
                                    },
                                    {
                                        label: 'Link',
                                        cls: '',
                                        run: () =>
                                            editor.chain().focus().toggleLink({ href: 'https://posthog.com' }).run(),
                                        active: 'link',
                                    },
                                    {
                                        label: 'H1',
                                        cls: 'font-semibold',
                                        run: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
                                        active: 'heading',
                                    },
                                ].map((b) => (
                                    <button
                                        key={b.label}
                                        type="button"
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={b.run}
                                        className={`min-w-[1.75rem] rounded px-1.5 py-0.5 ${b.cls} ${
                                            editor.isActive(b.active) ? 'bg-accent' : 'hover:bg-accent'
                                        }`}
                                    >
                                        {b.label}
                                    </button>
                                ))}
                            </div>
                        </BubbleMenu>
                    )}

                    {menu && menu.rect && canvasRect && (
                        <div
                            className="absolute z-20 max-h-72 w-60 overflow-auto rounded-md border border-primary bg-white p-1 text-sm text-primary shadow-xl dark:bg-accent"
                            style={{
                                top: menu.rect.bottom - canvasRect.top + (canvasRef.current?.scrollTop ?? 0) + 4,
                                left: menu.rect.left - canvasRect.left,
                            }}
                        >
                            {menu.items.length === 0 ? (
                                <span className="block px-2 py-1.5 text-secondary">No matches</span>
                            ) : (
                                menu.items.map((item, i) => (
                                    <button
                                        key={item.title}
                                        type="button"
                                        onMouseDown={(e) => {
                                            e.preventDefault()
                                            item.pick()
                                        }}
                                        className={`block w-full rounded px-2 py-1.5 text-left ${
                                            i === menu.index ? 'bg-accent' : 'hover:bg-accent'
                                        } ${item.title.includes('.') ? 'font-code text-xs' : ''}`}
                                    >
                                        {item.title}
                                    </button>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
