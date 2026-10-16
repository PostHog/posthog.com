import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Link } from 'gatsby'

interface PageSummary {
    filename: string
    slug: string
    title: string
    description?: string
    size: number
    updatedAt: string
}

interface PageDetail {
    filename: string
    slug: string
    frontmatter: {
        title?: string
        sidebar?: string
        showTitle?: boolean
        hideAnchor?: boolean
        description?: string
        [key: string]: any
    }
    content: string
}

export default function PagesEditor() {
    const [view, setView] = useState<'list' | 'editor'>('list')
    const [pages, setPages] = useState<PageSummary[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
    const [searchQuery, setSearchQuery] = useState('')

    // Editor state
    const [isCreating, setIsCreating] = useState(false)
    const [activeFilename, setActiveFilename] = useState<string | null>(null)
    const [editorTitle, setEditorTitle] = useState('')
    const [editorSlug, setEditorSlug] = useState('')
    const [editorSidebar, setEditorSidebar] = useState('Docs')
    const [editorDescription, setEditorDescription] = useState('')
    const [editorContent, setEditorContent] = useState('')
    const [editorMode, setEditorMode] = useState<'split' | 'edit' | 'preview'>('split')
    const [saving, setSaving] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const showToast = (text: string, type: 'success' | 'error' = 'success') => {
        setStatusMsg({ text, type })
        setTimeout(() => setStatusMsg(null), 4000)
    }

    const loadPages = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch('/api/admin-pages')
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            const data = await res.json()
            setPages(data.pages || [])
        } catch (err: any) {
            console.error('Failed to load pages:', err)
            setError(err.message || 'Failed to load pages')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadPages()
    }, [])

    const filteredPages = useMemo(() => {
        if (!searchQuery.trim()) return pages
        const q = searchQuery.toLowerCase()
        return pages.filter(
            (p) =>
                p.title.toLowerCase().includes(q) ||
                p.slug.toLowerCase().includes(q) ||
                p.filename.toLowerCase().includes(q)
        )
    }, [pages, searchQuery])

    const handleCreateNew = () => {
        setIsCreating(true)
        setActiveFilename(null)
        setEditorTitle('')
        setEditorSlug('')
        setEditorSidebar('Docs')
        setEditorDescription('')
        setEditorContent('# New Page\n\nStart writing your page content here...')
        setEditorMode('split')
        setView('editor')
    }

    const handleEditPage = async (page: PageSummary) => {
        setLoading(true)
        try {
            const res = await fetch(`/api/admin-pages?file=${encodeURIComponent(page.filename)}`)
            if (!res.ok) throw new Error(`Failed to load page: ${res.statusText}`)
            const data: PageDetail = await res.json()

            setIsCreating(false)
            setActiveFilename(data.filename)
            setEditorTitle(data.frontmatter.title || page.title)
            setEditorSlug(data.slug.replace(/^\//, ''))
            setEditorSidebar(data.frontmatter.sidebar || 'Docs')
            setEditorDescription(data.frontmatter.description || '')
            setEditorContent(data.content || '')
            setEditorMode('split')
            setView('editor')
        } catch (err: any) {
            showToast(err.message || 'Failed to open page for editing', 'error')
        } finally {
            setLoading(false)
        }
    }

    const handleSavePage = async () => {
        if (!editorTitle.trim()) {
            showToast('Page title cannot be empty', 'error')
            return
        }

        setSaving(true)
        try {
            if (isCreating) {
                const slug = editorSlug.trim() || editorTitle.toLowerCase().replace(/[^a-z0-9_-]/gi, '-')
                const res = await fetch('/api/admin-pages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: editorTitle,
                        slug,
                        content: editorContent,
                        frontmatter: {
                            sidebar: editorSidebar,
                            description: editorDescription,
                        },
                    }),
                })
                if (!res.ok) {
                    const data = await res.json()
                    throw new Error(data.error || 'Failed to create page')
                }
                showToast(`Page "${editorTitle}" created successfully!`, 'success')
                await loadPages()
                setView('list')
            } else {
                if (!activeFilename) throw new Error('No active file to update')
                const res = await fetch('/api/admin-pages', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        filename: activeFilename,
                        title: editorTitle,
                        content: editorContent,
                        frontmatter: {
                            sidebar: editorSidebar,
                            description: editorDescription,
                        },
                    }),
                })
                if (!res.ok) {
                    const data = await res.json()
                    throw new Error(data.error || 'Failed to update page')
                }
                showToast(`Page "${editorTitle}" saved successfully!`, 'success')
                await loadPages()
            }
        } catch (err: any) {
            showToast(err.message || 'Error saving page', 'error')
        } finally {
            setSaving(false)
        }
    }

    const handleDeletePage = async (page: PageSummary) => {
        if (!window.confirm(`Are you sure you want to delete "${page.filename}"? This action cannot be undone.`)) {
            return
        }

        try {
            const res = await fetch(`/api/admin-pages?file=${encodeURIComponent(page.filename)}`, {
                method: 'DELETE',
            })
            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || 'Failed to delete page')
            }
            showToast(`Deleted ${page.filename}`, 'success')
            await loadPages()
            if (view === 'editor' && activeFilename === page.filename) {
                setView('list')
            }
        } catch (err: any) {
            showToast(err.message || 'Error deleting page', 'error')
        }
    }

    const insertMarkdown = (before: string, after: string = '') => {
        const textarea = textareaRef.current
        if (!textarea) return
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const text = textarea.value
        const selected = text.substring(start, end)
        const replacement = before + (selected || 'text') + after
        const newText = text.substring(0, start) + replacement + text.substring(end)
        setEditorContent(newText)
        setTimeout(() => {
            textarea.focus()
            textarea.setSelectionRange(start + before.length, start + replacement.length - after.length)
        }, 0)
    }

    const renderMarkdownPreview = (md: string) => {
        return md
            .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-6 mb-4 text-gray-900 dark:text-white">$1</h1>')
            .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-5 mb-3 text-gray-900 dark:text-white pb-1 border-b border-gray-200 dark:border-gray-800">$1</h2>')
            .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-4 mb-2 text-gray-900 dark:text-white">$1</h3>')
            .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold">$1</strong>')
            .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
            .replace(/`([^`]+)`/gim, '<code class="bg-gray-100 dark:bg-gray-800 text-red-500 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-red-600 dark:text-red-400 underline font-semibold" target="_blank" rel="noopener noreferrer">$1</a>')
            .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-red-500 pl-4 py-1 italic my-3 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/40 rounded-r">$1</blockquote>')
            .replace(/^- (.*$)/gim, '<li class="ml-6 list-disc mb-1">$1</li>')
            .split('\n\n')
            .map((block) => {
                const trimmed = block.trim()
                if (!trimmed) return ''
                if (trimmed.startsWith('<h') || trimmed.startsWith('<blockquote') || trimmed.startsWith('<li')) return trimmed
                return `<p class="mb-4 leading-relaxed text-gray-800 dark:text-gray-200">${trimmed}</p>`
            })
            .join('\n')
    }

    const wordCount = useMemo(() => editorContent.trim().split(/\s+/).filter(Boolean).length, [editorContent])

    return (
        <div>
            {statusMsg && (
                <div
                    className={`fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium transition ${
                        statusMsg.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                    }`}
                >
                    {statusMsg.text}
                </div>
            )}

            {view === 'list' ? (
                <div>
                    {/* Header & Stats */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Static Pages Editor</h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Kelola halaman statis markdown di direktori <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs font-mono">contents/</code> seperti <code className="text-red-500">/about</code>, <code className="text-red-500">/faq</code>, dll.
                            </p>
                        </div>
                        <button
                            onClick={handleCreateNew}
                            className="inline-flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg shadow-sm transition"
                        >
                            + Buat Halaman Baru
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white dark:bg-[#1E1E1E] p-4 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Pages</div>
                            <div className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{pages.length}</div>
                        </div>
                        <div className="bg-white dark:bg-[#1E1E1E] p-4 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Format MDX</div>
                            <div className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                                {pages.filter((p) => p.filename.endsWith('.mdx')).length}
                            </div>
                        </div>
                        <div className="bg-white dark:bg-[#1E1E1E] p-4 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Format MD</div>
                            <div className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                                {pages.filter((p) => p.filename.endsWith('.md')).length}
                            </div>
                        </div>
                        <div className="bg-white dark:bg-[#1E1E1E] p-4 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Folder Target</div>
                            <div className="text-sm font-mono mt-2 font-semibold text-gray-700 dark:text-gray-300 truncate">
                                contents/
                            </div>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Cari judul halaman atau slug..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:max-w-md px-3.5 py-2 text-sm bg-white dark:bg-[#18181b] text-black dark:text-white placeholder-[#9ca3af] dark:placeholder-[#71717a] border border-[#d1d5db] dark:border-[#3f3f46] rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                        />
                    </div>

                    {/* Table */}
                    <div className="bg-white dark:bg-[#1E1E1E] rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 dark:bg-gray-900/50 text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">
                                    <tr>
                                        <th className="px-5 py-3.5 font-semibold">Judul Halaman</th>
                                        <th className="px-5 py-3.5 font-semibold">Slug / URL</th>
                                        <th className="px-5 py-3.5 font-semibold">File</th>
                                        <th className="px-5 py-3.5 font-semibold">Ukuran</th>
                                        <th className="px-5 py-3.5 font-semibold text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={5} className="px-5 py-8 text-center text-gray-500">
                                                Memuat halaman...
                                            </td>
                                        </tr>
                                    ) : filteredPages.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-5 py-8 text-center text-gray-500">
                                                Tidak ada halaman yang cocok.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredPages.map((page) => (
                                            <tr key={page.filename} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition">
                                                <td className="px-5 py-3.5">
                                                    <div className="font-semibold text-gray-900 dark:text-white">
                                                        {page.title}
                                                    </div>
                                                    {page.description && (
                                                        <div className="text-xs text-gray-500 truncate max-w-md mt-0.5">
                                                            {page.description}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-5 py-3.5 font-mono text-xs">
                                                    <a
                                                        href={page.slug}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-red-600 dark:text-red-400 hover:underline inline-flex items-center gap-1"
                                                    >
                                                        {page.slug} &nearr;
                                                    </a>
                                                </td>
                                                <td className="px-5 py-3.5 font-mono text-xs text-gray-600 dark:text-gray-400">
                                                    {page.filename}
                                                </td>
                                                <td className="px-5 py-3.5 text-xs text-gray-500">
                                                    {(page.size / 1024).toFixed(1)} KB
                                                </td>
                                                <td className="px-5 py-3.5 text-right space-x-2">
                                                    <button
                                                        onClick={() => handleEditPage(page)}
                                                        className="px-2.5 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded transition"
                                                    >
                                                        Edit
                                                    </button>
                                                    {!['index.mdx', 'home.mdx', 'about.mdx'].includes(page.filename) && (
                                                        <button
                                                            onClick={() => handleDeletePage(page)}
                                                            className="px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded transition"
                                                        >
                                                            Hapus
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                /* Editor View */
                <div className="bg-white dark:bg-[#1E1E1E] rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3 bg-gray-50/50 dark:bg-gray-900/30">
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => setView('list')}
                                className="px-3 py-1.5 text-xs font-semibold bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded transition"
                            >
                                &larr; Kembali ke Daftar
                            </button>
                            <h3 className="font-bold text-gray-900 dark:text-white">
                                {isCreating ? 'Buat Halaman Baru' : `Edit: ${activeFilename}`}
                            </h3>
                            {!isCreating && (
                                <a
                                    href={`/${activeFilename?.replace(/\.(md|mdx)$/, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-red-600 dark:text-red-400 hover:underline"
                                >
                                    Lihat Live &nearr;
                                </a>
                            )}
                        </div>

                        <div className="flex items-center space-x-3">
                            {/* Mode toggle */}
                            <div className="flex bg-gray-200 dark:bg-gray-800 rounded p-0.5 text-xs font-semibold">
                                <button
                                    onClick={() => setEditorMode('edit')}
                                    className={`px-2.5 py-1 rounded transition ${editorMode === 'edit' ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500'}`}
                                >
                                    Editor
                                </button>
                                <button
                                    onClick={() => setEditorMode('split')}
                                    className={`px-2.5 py-1 rounded transition ${editorMode === 'split' ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500'}`}
                                >
                                    Split
                                </button>
                                <button
                                    onClick={() => setEditorMode('preview')}
                                    className={`px-2.5 py-1 rounded transition ${editorMode === 'preview' ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500'}`}
                                >
                                    Preview
                                </button>
                            </div>

                            <button
                                onClick={handleSavePage}
                                disabled={saving}
                                className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded shadow-sm transition disabled:opacity-50"
                            >
                                {saving ? 'Menyimpan...' : 'Simpan Halaman'}
                            </button>
                        </div>
                    </div>

                    {/* Metadata fields */}
                    <div className="p-6 border-b border-gray-200 dark:border-[#383a42] grid grid-cols-1 md:grid-cols-3 gap-4 bg-white dark:bg-[#202124]">
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider mb-1">
                                Judul Halaman
                            </label>
                            <input
                                type="text"
                                value={editorTitle}
                                onChange={(e) => setEditorTitle(e.target.value)}
                                placeholder="Contoh: Tentang Kami / About Us"
                                className="w-full px-3 py-2 text-sm bg-white dark:bg-[#18181b] text-black dark:text-white placeholder-[#9ca3af] dark:placeholder-[#71717a] border border-[#d1d5db] dark:border-[#3f3f46] rounded focus:outline-none focus:border-red-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider mb-1">
                                Slug / URL
                            </label>
                            <div className="flex items-center">
                                <span className="text-gray-500 dark:text-gray-400 text-sm px-2 bg-gray-100 dark:bg-[#2c2d33] border border-r-0 border-[#d1d5db] dark:border-[#3f3f46] rounded-l py-2">
                                    /
                                </span>
                                <input
                                    type="text"
                                    value={editorSlug}
                                    onChange={(e) => setEditorSlug(e.target.value)}
                                    placeholder="about"
                                    disabled={!isCreating}
                                    className="w-full px-3 py-2 text-sm bg-white dark:bg-[#18181b] text-black dark:text-white placeholder-[#9ca3af] dark:placeholder-[#71717a] border border-[#d1d5db] dark:border-[#3f3f46] rounded-r focus:outline-none focus:border-red-500 disabled:opacity-60"
                                />
                            </div>
                        </div>

                        <div className="md:col-span-3">
                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider mb-1">
                                Deskripsi SEO (Opsional)
                            </label>
                            <input
                                type="text"
                                value={editorDescription}
                                onChange={(e) => setEditorDescription(e.target.value)}
                                placeholder="Deskripsi singkat isi halaman untuk search engine"
                                className="w-full px-3 py-2 text-sm bg-white dark:bg-[#18181b] text-black dark:text-white placeholder-[#9ca3af] dark:placeholder-[#71717a] border border-[#d1d5db] dark:border-[#3f3f46] rounded focus:outline-none focus:border-red-500"
                            />
                        </div>
                    </div>

                    {/* Markdown Toolbar */}
                    {(editorMode === 'edit' || editorMode === 'split') && (
                        <div className="px-6 py-2 bg-gray-100 dark:bg-[#202124] border-b border-gray-200 dark:border-[#383a42] flex flex-wrap items-center gap-1.5 text-xs">
                            <button
                                type="button"
                                onClick={() => insertMarkdown('**', '**')}
                                className="px-2.5 py-1 font-bold bg-white dark:bg-[#2c2d33] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#383a42] rounded border border-gray-300 dark:border-[#383a42] transition"
                                title="Bold"
                            >
                                B
                            </button>
                            <button
                                type="button"
                                onClick={() => insertMarkdown('*', '*')}
                                className="px-2.5 py-1 italic font-bold bg-white dark:bg-[#2c2d33] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#383a42] rounded border border-gray-300 dark:border-[#383a42] transition"
                                title="Italic"
                            >
                                I
                            </button>
                            <button
                                type="button"
                                onClick={() => insertMarkdown('## ')}
                                className="px-2.5 py-1 font-bold bg-white dark:bg-[#2c2d33] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#383a42] rounded border border-gray-300 dark:border-[#383a42] transition"
                                title="Heading 2"
                            >
                                H2
                            </button>
                            <button
                                type="button"
                                onClick={() => insertMarkdown('### ')}
                                className="px-2.5 py-1 font-bold bg-white dark:bg-[#2c2d33] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#383a42] rounded border border-gray-300 dark:border-[#383a42] transition"
                                title="Heading 3"
                            >
                                H3
                            </button>
                            <button
                                type="button"
                                onClick={() => insertMarkdown('> ')}
                                className="px-2.5 py-1 font-semibold bg-white dark:bg-[#2c2d33] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#383a42] rounded border border-gray-300 dark:border-[#383a42] transition"
                                title="Quote"
                            >
                                &ldquo; Quote
                            </button>
                            <button
                                type="button"
                                onClick={() => insertMarkdown('- ')}
                                className="px-2.5 py-1 font-semibold bg-white dark:bg-[#2c2d33] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#383a42] rounded border border-gray-300 dark:border-[#383a42] transition"
                                title="Bullet List"
                            >
                                &bull; List
                            </button>
                            <button
                                type="button"
                                onClick={() => insertMarkdown('`', '`')}
                                className="px-2.5 py-1 font-mono font-semibold bg-white dark:bg-[#2c2d33] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#383a42] rounded border border-gray-300 dark:border-[#383a42] transition"
                                title="Inline Code"
                            >
                                &lt;/&gt;
                            </button>
                            <button
                                type="button"
                                onClick={() => insertMarkdown('[', '](https://)')}
                                className="px-2.5 py-1 font-semibold bg-white dark:bg-[#2c2d33] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#383a42] rounded border border-gray-300 dark:border-[#383a42] transition"
                                title="Link"
                            >
                                &infin; Link
                            </button>
                        </div>
                    )}

                    {/* Editor & Preview Area */}
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-800 min-h-[500px]">
                        {(editorMode === 'edit' || editorMode === 'split') && (
                            <div className={`${editorMode === 'edit' ? 'md:col-span-2' : ''} p-4 flex flex-col`}>
                                <textarea
                                    ref={textareaRef}
                                    value={editorContent}
                                    onChange={(e) => setEditorContent(e.target.value)}
                                    placeholder="Tulis konten halaman di sini menggunakan format Markdown / MDX..."
                                    className="w-full flex-1 min-h-[480px] p-3 font-mono text-sm leading-relaxed bg-transparent focus:outline-none resize-none text-black dark:text-white placeholder-[#9ca3af] dark:placeholder-[#71717a]"
                                />
                            </div>
                        )}

                        {(editorMode === 'preview' || editorMode === 'split') && (
                            <div className={`${editorMode === 'preview' ? 'md:col-span-2' : ''} p-6 overflow-y-auto max-h-[600px] bg-white dark:bg-[#1E1E1E]`}>
                                <div className="text-xs uppercase font-bold text-gray-400 mb-4 pb-2 border-b border-gray-100 dark:border-gray-800">
                                    Live Preview
                                </div>
                                <div
                                    className="prose dark:prose-invert max-w-none text-sm"
                                    dangerouslySetInnerHTML={{ __html: renderMarkdownPreview(editorContent) }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Footer stats */}
                    <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500">
                        <div>{wordCount} words &bull; {editorContent.length} characters</div>
                        <div className="font-semibold text-gray-700 dark:text-gray-300">
                            Disimpan langsung ke <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded font-mono">contents/{activeFilename || `${editorSlug}.mdx`}</code>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
