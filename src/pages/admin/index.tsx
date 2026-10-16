import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Link } from 'gatsby'
import MenuEditor from '../../components/Admin/MenuEditor'
import DesktopEditor from '../../components/Admin/DesktopEditor'
import PagesEditor from '../../components/Admin/PagesEditor'
import AuthorsEditor, { AuthorItem } from '../../components/Admin/AuthorsEditor'
import CommentsEditor from '../../components/Admin/CommentsEditor'
import UsersEditor from '../../components/Admin/UsersEditor'
import { useLocalAuth } from '../../hooks/useLocalAuth'

interface PostSummary {
    filename: string
    slug: string
    title: string
    date: string
    category: string
    tags: string[]
    author: string[] | string
    featuredImage?: string
    description?: string
    size?: number
    updatedAt?: string
}

interface PostDetail {
    filename: string
    slug: string
    frontmatter: {
        title?: string
        date?: string
        author?: string[] | string
        category?: string
        tags?: string[]
        featuredImage?: string
        featuredImageType?: string
        description?: string
        [key: string]: any
    }
    content: string
}

const COMMON_CATEGORIES = [
    'PostHog news',
    'Engineering',
    'Product',
    'Product growth',
    'Inside PostHog',
    'CEO diaries',
    'Startups',
    'Using PostHog',
    'General',
]

const COMMON_AUTHORS = [
    { handle: 'james-hawkins', name: 'James Hawkins' },
    { handle: 'tim-glaser', name: 'Tim Glaser' },
    { handle: 'yakko-majuri', name: 'Yakko Majuri' },
    { handle: 'mo-shehu', name: 'Mo Shehu' },
    { handle: 'james-temperton', name: 'James Temperton' },
    { handle: 'joe-martin', name: 'Joe Martin' },
    { handle: 'andy-vandervell', name: 'Andy Vandervell' },
    { handle: 'ian-vanagas', name: 'Ian Vanagas' },
    { handle: 'raquel-smith', name: 'Raquel Smith' },
    { handle: 'marcus-hyett', name: 'Marcus Hyett' },
]

export default function BlogAdmin() {
    const { user, isLoggedIn, isAdmin, logout, login, loading: authLoading } = useLocalAuth()
    const [activeTab, setActiveTab] = useState<'posts' | 'pages' | 'authors' | 'comments' | 'users' | 'menu' | 'desktop'>('posts')
    const [view, setView] = useState<'list' | 'editor'>('list')
    const [posts, setPosts] = useState<PostSummary[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [authors, setAuthors] = useState<AuthorItem[]>(COMMON_AUTHORS)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

    // Filters and search
    const [searchQuery, setSearchQuery] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('ALL')
    const [sortBy, setSortBy] = useState<'date_desc' | 'date_asc' | 'title'>('date_desc')
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 15

    // Editor state
    const [isEditing, setIsEditing] = useState(false)
    const [activeFilename, setActiveFilename] = useState<string | null>(null)
    const [editorTitle, setEditorTitle] = useState('')
    const [editorSlug, setEditorSlug] = useState('')
    const [editorDate, setEditorDate] = useState('')
    const [editorCategory, setEditorCategory] = useState('PostHog news')
    const [editorAuthor, setEditorAuthor] = useState('james-hawkins')
    const [isCustomAuthor, setIsCustomAuthor] = useState(false)
    const [customAuthorName, setCustomAuthorName] = useState('')
    const [customAuthorHandle, setCustomAuthorHandle] = useState('')
    const [customAuthorRole, setCustomAuthorRole] = useState('')
    const [editorTags, setEditorTags] = useState('')
    const [editorFeaturedImage, setEditorFeaturedImage] = useState('')
    const [editorDescription, setEditorDescription] = useState('')
    const [editorContent, setEditorContent] = useState('')
    const [editorMode, setEditorMode] = useState<'split' | 'edit' | 'preview'>('split')
    const [saving, setSaving] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const rootRef = useRef<HTMLDivElement>(null)
    const [rootHeight, setRootHeight] = useState<number | undefined>(undefined)

    // Fit container to the visible area below the OS taskbar/window chrome so the bottom isn't clipped
    useEffect(() => {
        const fit = () => {
            if (!rootRef.current) return
            const top = rootRef.current.getBoundingClientRect().top
            setRootHeight(Math.max(300, window.innerHeight - top - 8))
        }
        fit()
        const t = setTimeout(fit, 500)
        window.addEventListener('resize', fit)
        return () => {
            clearTimeout(t)
            window.removeEventListener('resize', fit)
        }
    }, [])

    // Load posts from API
    const loadPosts = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch('/api/admin-posts')
            if (!res.ok) throw new Error(`HTTP error ${res.status}`)
            const data = await res.json()
            setPosts(data.posts || [])
            setCategories(data.categories || [])
            if (data.authors && Array.isArray(data.authors) && data.authors.length > 0) {
                setAuthors(data.authors)
            }
        } catch (err: any) {
            console.error('Failed to load posts:', err)
            setError(err.message || 'Failed to load posts')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadPosts()
    }, [])

    const showToast = (text: string, type: 'success' | 'error' = 'success') => {
        setStatusMsg({ text, type })
        setTimeout(() => setStatusMsg(null), 5000)
    }

    // Filtered & sorted posts
    const filteredPosts = useMemo(() => {
        return posts
            .filter((p) => {
                if (categoryFilter !== 'ALL' && p.category !== categoryFilter) {
                    return false
                }
                if (searchQuery.trim()) {
                    const q = searchQuery.toLowerCase()
                    const titleMatch = p.title.toLowerCase().includes(q)
                    const slugMatch = p.slug.toLowerCase().includes(q)
                    const catMatch = p.category.toLowerCase().includes(q)
                    const tagsMatch = p.tags?.some((t) => t.toLowerCase().includes(q))
                    const authorMatch = Array.isArray(p.author)
                        ? p.author.some((a) => a.toLowerCase().includes(q))
                        : typeof p.author === 'string' && p.author.toLowerCase().includes(q)
                    return titleMatch || slugMatch || catMatch || tagsMatch || authorMatch
                }
                return true
            })
            .sort((a, b) => {
                if (sortBy === 'title') {
                    return a.title.localeCompare(b.title)
                }
                const dateA = a.date ? new Date(a.date).getTime() : 0
                const dateB = b.date ? new Date(b.date).getTime() : 0
                return sortBy === 'date_desc' ? dateB - dateA : dateA - dateB
            })
    }, [posts, searchQuery, categoryFilter, sortBy])

    // Pagination
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1
    const paginatedPosts = useMemo(() => {
        const start = (currentPage - 1) * postsPerPage
        return filteredPosts.slice(start, start + postsPerPage)
    }, [filteredPosts, currentPage])

    // Open editor for new post
    const handleNewPost = () => {
        setIsEditing(false)
        setActiveFilename(null)
        setEditorTitle('')
        setEditorSlug('')
        setEditorDate(new Date().toISOString().slice(0, 10))
        setEditorCategory('PostHog news')
        setEditorAuthor(authors[0]?.handle || 'james-hawkins')
        setIsCustomAuthor(false)
        setCustomAuthorName('')
        setCustomAuthorHandle('')
        setCustomAuthorRole('')
        setEditorTags('')
        setEditorFeaturedImage('')
        setEditorDescription('')
        setEditorContent('# Introduction\n\nWrite your blog post here...\n\n## Section 1\n\nMore details...')
        setView('editor')
    }

    // Open editor for existing post
    const handleEditPost = async (filename: string) => {
        setSaving(true)
        try {
            const res = await fetch(`/api/admin-posts?file=${encodeURIComponent(filename)}`)
            if (!res.ok) throw new Error(`HTTP error ${res.status}`)
            const data: PostDetail = await res.json()

            setIsEditing(true)
            setActiveFilename(filename)
            setEditorTitle(data.frontmatter.title || data.slug)
            setEditorSlug(data.slug)
            setEditorDate(data.frontmatter.date || '')
            setEditorCategory(data.frontmatter.category || 'PostHog news')

            const authorVal = Array.isArray(data.frontmatter.author)
                ? data.frontmatter.author[0] || 'james-hawkins'
                : data.frontmatter.author || 'james-hawkins'

            // Ensure the author exists in current authors list so select can pick it
            setAuthors((prev) => {
                if (!prev.some((a) => a.handle.toLowerCase() === authorVal.toLowerCase())) {
                    const fallbackName = authorVal
                        .split(/[-_]+/)
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(' ')
                    return [...prev, { handle: authorVal, name: fallbackName, role: 'Author' }]
                }
                return prev
            })

            setIsCustomAuthor(false)
            setCustomAuthorName('')
            setCustomAuthorHandle('')
            setCustomAuthorRole('')
            setEditorAuthor(authorVal)

            setEditorTags(Array.isArray(data.frontmatter.tags) ? data.frontmatter.tags.join(', ') : '')
            setEditorFeaturedImage(data.frontmatter.featuredImage || '')
            setEditorDescription(data.frontmatter.description || '')
            setEditorContent(data.content || '')
            setView('editor')
        } catch (err: any) {
            showToast(`Failed to load post: ${err.message}`, 'error')
        } finally {
            setSaving(false)
        }
    }

    // Delete post
    const handleDeletePost = async (filename: string, title: string) => {
        if (!window.confirm(`Are you sure you want to delete post "${title}" (${filename})? This action cannot be undone.`)) {
            return
        }
        try {
            const res = await fetch(`/api/admin-posts?file=${encodeURIComponent(filename)}`, {
                method: 'DELETE',
            })
            if (!res.ok) throw new Error(`HTTP error ${res.status}`)
            showToast(`Post "${title}" deleted successfully!`)
            loadPosts()
        } catch (err: any) {
            showToast(`Failed to delete post: ${err.message}`, 'error')
        }
    }

    // Auto-generate slug from title
    const handleTitleChange = (val: string) => {
        setEditorTitle(val)
        if (!isEditing) {
            const autoSlug = val
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '')
            setEditorSlug(autoSlug)
        }
    }

    // Save post
    const handleSavePost = async () => {
        if (!editorTitle.trim()) {
            alert('Please enter a post title.')
            return
        }

        let finalAuthorHandle = editorAuthor
        let newAuthorPayload: any = undefined

        if (isCustomAuthor) {
            if (!customAuthorName.trim()) {
                alert('Silakan isi nama author baru.')
                return
            }

            finalAuthorHandle = (customAuthorHandle.trim() || customAuthorName.trim())
                .toLowerCase()
                .replace(/[^a-z0-9\-]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '')

            if (!finalAuthorHandle) {
                finalAuthorHandle = `author-${Date.now()}`
            }

            newAuthorPayload = {
                name: customAuthorName.trim(),
                handle: finalAuthorHandle,
                role: customAuthorRole.trim() || 'Author',
            }
        }

        setSaving(true)
        try {
            const tagsArray = editorTags
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean)

            const payload: any = {
                title: editorTitle.trim(),
                slug: editorSlug.trim(),
                date: editorDate,
                author: [finalAuthorHandle],
                newAuthor: newAuthorPayload,
                category: editorCategory,
                tags: tagsArray,
                featuredImage: editorFeaturedImage.trim(),
                description: editorDescription.trim(),
                content: editorContent,
            }

            let res: Response
            if (isEditing && activeFilename) {
                payload.filename = activeFilename
                res = await fetch('/api/admin-posts', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                })
            } else {
                res = await fetch('/api/admin-posts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                })
            }

            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Save failed')

            showToast(isEditing ? 'Post updated successfully!' : 'Post published successfully!')
            setActiveFilename(data.filename)
            setIsEditing(true)
            setIsCustomAuthor(false)
            setEditorAuthor(finalAuthorHandle)
            setCustomAuthorName('')
            setCustomAuthorHandle('')
            setCustomAuthorRole('')
            loadPosts()
        } catch (err: any) {
            showToast(`Save error: ${err.message}`, 'error')
        } finally {
            setSaving(false)
        }
    }

    // Markdown helpers
    const insertMarkdown = (prefix: string, suffix: string = '') => {
        const el = textareaRef.current
        if (!el) return
        const start = el.selectionStart
        const end = el.selectionEnd
        const text = el.value
        const selected = text.substring(start, end)
        const replacement = `${prefix}${selected || 'text'}${suffix}`
        const updated = text.substring(0, start) + replacement + text.substring(end)
        setEditorContent(updated)
        setTimeout(() => {
            el.focus()
            el.setSelectionRange(start + prefix.length, start + prefix.length + (selected ? selected.length : 4))
        }, 50)
    }

    // Simple markdown renderer for live preview
    const renderMarkdownPreview = (md: string) => {
        if (!md) return '<p class="text-gray-400 italic">No content yet...</p>'

        // Escape HTML tags to prevent injection while keeping basic markdown
        let html = md
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')

        // Code blocks
        html = html.replace(/```([a-zA-Z0-9]*)\n([\s\S]*?)```/g, (_, lang, code) => {
            return `<pre class="bg-gray-900 text-gray-100 p-4 rounded-md my-4 overflow-x-auto text-sm"><code>${code.trim()}</code></pre>`
        })

        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 text-red-500 dark:text-red-400 px-1.5 py-0.5 rounded text-sm">$1</code>')

        // Headers
        html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-2 text-gray-900 dark:text-white">$1</h3>')
        html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-3 text-gray-900 dark:text-white">$1</h2>')
        html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-extrabold mt-10 mb-4 text-gray-900 dark:text-white">$1</h1>')

        // Blockquotes
        html = html.replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-yellow-500 pl-4 py-1 italic my-4 text-gray-700 dark:text-gray-300">$1</blockquote>')

        // Images: ![alt](url)
        html = html.replace(/!\[(.*?)\]\((.*?)\)/gim, '<figure class="my-4"><img alt="$1" src="$2" class="rounded-md max-w-full h-auto border border-gray-200 dark:border-gray-800" /><figcaption class="text-xs text-gray-500 mt-1">$1</figcaption></figure>')

        // Links: [text](url)
        html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-red-600 dark:text-red-400 underline font-medium hover:text-red-700">$1</a>')

        // Bold & Italic
        html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>')

        // Horizontal rule
        html = html.replace(/^---$/gim, '<hr class="my-6 border-gray-300 dark:border-gray-700" />')

        // Unordered lists
        html = html.replace(/^\s*[-*]\s+(.*$)/gim, '<li class="ml-4 list-disc">$1</li>')

        // Ordered lists
        html = html.replace(/^\s*\d+\.\s+(.*$)/gim, '<li class="ml-4 list-decimal">$1</li>')

        // Paragraphs: separate by empty lines
        const paragraphs = html.split(/\n\s*\n/)
        return paragraphs
            .map((p) => {
                const trimmed = p.trim()
                if (!trimmed) return ''
                if (trimmed.startsWith('<h') || trimmed.startsWith('<pre') || trimmed.startsWith('<blockquote') || trimmed.startsWith('<figure') || trimmed.startsWith('<hr') || trimmed.startsWith('<li')) {
                    return trimmed
                }
                return `<p class="mb-4 leading-relaxed text-gray-800 dark:text-gray-200">${trimmed}</p>`
            })
            .join('\n')
    }

    const wordCount = useMemo(() => {
        return editorContent.trim().split(/\s+/).filter(Boolean).length
    }, [editorContent])

    const readingTime = Math.max(1, Math.ceil(wordCount / 200))

    if (authLoading) {
        return (
            <div className="min-h-screen bg-[#F4F4F0] dark:bg-[#151515] flex items-center justify-center p-4">
                <div className="text-gray-500 animate-pulse text-sm">Memeriksa hak akses admin...</div>
            </div>
        )
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-[#F4F4F0] dark:bg-[#121214] text-[#111827] dark:text-[#FFFFFF] flex flex-col justify-between p-6 font-sans">
                <div className="max-w-md w-full mx-auto flex items-center justify-between pb-6">
                    <Link to="/" className="flex items-center space-x-2 text-[#F54E00] font-extrabold text-xl">
                        <span>🦔</span>
                        <span className="text-[#111827] dark:text-[#FFFFFF]">PostHog</span>
                    </Link>
                    <Link to="/blog" className="text-xs text-[#4B5563] dark:text-[#D1D5DB] hover:text-[#111827] dark:hover:text-[#FFFFFF]">
                        Ke Blog &rarr;
                    </Link>
                </div>

                <div className="max-w-md w-full mx-auto bg-white dark:bg-[#1E1F24] rounded-xl border border-[#E5E7EB] dark:border-[#374151] shadow-lg p-8 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full mx-auto bg-[#FEE2E2] dark:bg-[#7F1D1D] text-[#DC2626] dark:text-[#FCA5A5] flex items-center justify-center font-bold text-2xl border border-[#FCA5A5] dark:border-[#991B1B]">
                        🛡️
                    </div>

                    <h2 className="text-xl font-bold text-[#111827] dark:text-[#FFFFFF]">
                        {isLoggedIn ? 'Akses Terbatas: Khusus Administrator' : 'Admin Suite Terproteksi'}
                    </h2>

                    <p className="text-xs text-[#4B5563] dark:text-[#D1D5DB] leading-relaxed">
                        {isLoggedIn ? (
                            <>
                                Anda saat ini masuk sebagai user: <strong>{user?.name}</strong> (@{user?.username}).
                                Admin Suite hanya dapat diakses oleh akun dengan hak akses Administrator.
                            </>
                        ) : (
                            'Silakan login menggunakan akun Administrator untuk mengelola seluruh konten, author, dan pengaturan sistem.'
                        )}
                    </p>

                    <div className="pt-3 space-y-2.5">
                        <button
                            type="button"
                            onClick={async () => {
                                await login('admin', 'admin')
                            }}
                            className="w-full py-2.5 px-4 bg-[#F54E00] hover:bg-[#D44300] text-white font-bold text-xs rounded-lg shadow-sm transition flex items-center justify-center space-x-2"
                        >
                            <span>⚡ Masuk Cepat sebagai Admin (admin / admin)</span>
                        </button>

                        <Link
                            to="/login?redirect=/admin"
                            className="block w-full py-2 px-4 bg-[#F3F4F6] dark:bg-[#2A2B32] hover:bg-[#E5E7EB] dark:hover:bg-[#34353E] text-[#111827] dark:text-[#FFFFFF] text-xs font-semibold rounded-lg border border-[#D1D5DB] dark:border-[#4B5563] transition"
                        >
                            Laman Login Akun Lain
                        </Link>

                        {isLoggedIn && (
                            <Link
                                to="/account"
                                className="block w-full py-1.5 text-xs text-[#6B7280] dark:text-[#9CA3AF] hover:underline"
                            >
                                Ke Profil Akun User Saya &rarr;
                            </Link>
                        )}
                    </div>
                </div>

                <div className="max-w-md w-full mx-auto text-center pt-6 text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                    PostHog Admin Suite &bull; Kontrol Penuh Administrator
                </div>
            </div>
        )
    }

    return (
        <div ref={rootRef} style={rootHeight ? { height: rootHeight } : undefined} className="w-full overflow-y-auto overscroll-contain bg-[#F4F4F0] dark:bg-[#151515] text-[#1E1E1E] dark:text-[#EAEAEA] font-sans antialiased">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#1E1E1E]/90 backdrop-blur border-b border-gray-200 dark:border-gray-800 px-4 md:px-8 py-3.5 flex flex-wrap items-center justify-between shadow-sm gap-3">
                <div className="flex items-center space-x-3">
                    <Link to="/" className="flex items-center space-x-2.5 text-gray-900 dark:text-white hover:opacity-80 transition">
                        <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                            P
                        </div>
                        <span className="font-bold text-lg tracking-tight">PostHog</span>
                    </Link>
                    <span className="text-gray-400 dark:text-gray-600 text-sm">/</span>
                    <span className="font-semibold text-sm bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded text-gray-700 dark:text-gray-300">
                        Admin Suite
                    </span>

                    {/* Navigation Tabs */}
                    <div className="hidden sm:flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg ml-2">
                        <button
                            type="button"
                            onClick={() => {
                                setActiveTab('posts')
                                setView('list')
                            }}
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                                activeTab === 'posts'
                                    ? 'bg-white dark:bg-[#2c2d33] text-black dark:text-white shadow-sm font-bold'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
                            }`}
                        >
                            📝 Blog Articles
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setActiveTab('pages')
                            }}
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                                activeTab === 'pages'
                                    ? 'bg-white dark:bg-[#2c2d33] text-black dark:text-white shadow-sm font-bold'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
                            }`}
                        >
                            📄 Pages (/about dll)
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('authors')}
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                                activeTab === 'authors'
                                    ? 'bg-white dark:bg-[#2c2d33] text-black dark:text-white shadow-sm font-bold'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
                            }`}
                        >
                            ✍️ Authors
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('comments')}
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                                activeTab === 'comments'
                                    ? 'bg-white dark:bg-[#2c2d33] text-black dark:text-white shadow-sm font-bold'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
                            }`}
                        >
                            💬 Komentar
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('users')}
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                                activeTab === 'users'
                                    ? 'bg-white dark:bg-[#2c2d33] text-black dark:text-white shadow-sm font-bold'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
                            }`}
                        >
                            👥 Pengguna
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('menu')}
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                                activeTab === 'menu'
                                    ? 'bg-white dark:bg-[#2c2d33] text-black dark:text-white shadow-sm font-bold'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
                            }`}
                        >
                            🧭 Menu Nav
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('desktop')}
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                                activeTab === 'desktop'
                                    ? 'bg-white dark:bg-[#2c2d33] text-black dark:text-white shadow-sm font-bold'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
                            }`}
                        >
                            🖥️ Desktop &amp; OS
                        </button>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    {/* Mobile tabs */}
                    <div className="flex sm:hidden items-center space-x-1 bg-gray-100 dark:bg-[#25262b] p-1 rounded-lg">
                        <button
                            type="button"
                            onClick={() => {
                                setActiveTab('posts')
                                setView('list')
                            }}
                            className={`px-2 py-1 text-xs font-semibold rounded ${
                                activeTab === 'posts' ? 'bg-white dark:bg-[#2c2d33] text-black dark:text-white font-bold' : 'text-gray-500 dark:text-gray-400'
                            }`}
                        >
                            Blog
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('pages')}
                            className={`px-2 py-1 text-xs font-semibold rounded ${
                                activeTab === 'pages' ? 'bg-white dark:bg-[#2c2d33] text-black dark:text-white font-bold' : 'text-gray-500 dark:text-gray-400'
                            }`}
                        >
                            Pages
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('authors')}
                            className={`px-2 py-1 text-xs font-semibold rounded ${
                                activeTab === 'authors' ? 'bg-white dark:bg-[#2c2d33] text-black dark:text-white font-bold' : 'text-gray-500 dark:text-gray-400'
                            }`}
                        >
                            Authors
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('comments')}
                            className={`px-2 py-1 text-xs font-semibold rounded ${
                                activeTab === 'comments' ? 'bg-white dark:bg-[#2c2d33] text-black dark:text-white font-bold' : 'text-gray-500 dark:text-gray-400'
                            }`}
                        >
                            Komentar
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('users')}
                            className={`px-2 py-1 text-xs font-semibold rounded ${
                                activeTab === 'users' ? 'bg-white dark:bg-[#2c2d33] text-black dark:text-white font-bold' : 'text-gray-500 dark:text-gray-400'
                            }`}
                        >
                            User
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('menu')}
                            className={`px-2 py-1 text-xs font-semibold rounded ${
                                activeTab === 'menu' ? 'bg-white dark:bg-[#2c2d33] text-black dark:text-white font-bold' : 'text-gray-500 dark:text-gray-400'
                            }`}
                        >
                            Menu
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('desktop')}
                            className={`px-2 py-1 text-xs font-semibold rounded ${
                                activeTab === 'desktop' ? 'bg-white dark:bg-[#2c2d33] text-black dark:text-white font-bold' : 'text-gray-500 dark:text-gray-400'
                            }`}
                        >
                            OS
                        </button>
                    </div>

                    {activeTab === 'posts' && (
                        view === 'editor' ? (
                            <button
                                onClick={() => setView('list')}
                                className="px-3.5 py-1.5 text-sm font-medium text-black dark:text-white bg-gray-100 dark:bg-[#2c2d33] hover:bg-gray-200 dark:hover:bg-[#383a42] border border-gray-300 dark:border-[#383a42] rounded transition"
                            >
                                &larr; Back to Posts
                            </button>
                        ) : (
                            <button
                                onClick={handleNewPost}
                                className="px-4 py-1.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded shadow-sm transition flex items-center space-x-1.5"
                            >
                                <span>+ Write New Post</span>
                            </button>
                        )
                    )}

                    <Link
                        to={activeTab === 'posts' ? '/blog' : '/'}
                        target="_blank"
                        className="px-3 py-1.5 text-xs font-medium text-black dark:text-white border border-gray-300 dark:border-[#383a42] bg-white dark:bg-[#2c2d33] hover:bg-gray-50 dark:hover:bg-[#383a42] rounded transition flex items-center space-x-1"
                    >
                        <span>{activeTab === 'posts' ? 'View Live Blog' : 'View Live OS'}</span>
                        <span className="text-xs">&nearr;</span>
                    </Link>

                    {/* Admin User Badge and Logout */}
                    <div className="flex items-center space-x-2 bg-gray-100 dark:bg-[#2c2d33] border border-gray-200 dark:border-gray-700 px-2.5 py-1 rounded-md text-xs">
                        <span className="w-5 h-5 rounded-full bg-red-600 text-white font-bold text-[10px] flex items-center justify-center">
                            {user?.name?.charAt(0) || 'A'}
                        </span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200 hidden md:inline truncate max-w-[120px]">
                            {user?.name || 'Admin'}
                        </span>
                        <button
                            onClick={logout}
                            className="text-red-600 dark:text-red-400 hover:underline text-[11px] font-semibold"
                            title="Logout dari Admin Suite"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Notification Toast */}
            {statusMsg && (
                <div
                    className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-md shadow-lg border text-sm font-medium transition-all ${
                        statusMsg.type === 'success'
                            ? 'bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-200 border-green-300 dark:border-green-800'
                            : 'bg-red-50 dark:bg-red-950 text-red-800 dark:text-red-200 border-red-300 dark:border-red-800'
                    }`}
                >
                    {statusMsg.text}
                </div>
            )}

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                {activeTab === 'menu' ? (
                    <MenuEditor />
                ) : activeTab === 'desktop' ? (
                    <DesktopEditor />
                ) : activeTab === 'pages' ? (
                    <PagesEditor />
                ) : activeTab === 'authors' ? (
                    <AuthorsEditor onAuthorCreated={loadPosts} />
                ) : activeTab === 'comments' ? (
                    <CommentsEditor />
                ) : activeTab === 'users' ? (
                    <UsersEditor />
                ) : view === 'list' ? (
                    <div>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <div className="bg-white dark:bg-[#1E1E1E] p-5 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Posts</div>
                                <div className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">{posts.length}</div>
                            </div>
                            <div className="bg-white dark:bg-[#1E1E1E] p-5 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Categories</div>
                                <div className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">{categories.length}</div>
                            </div>
                            <div className="bg-white dark:bg-[#1E1E1E] p-5 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Authors</div>
                                <div className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">{authors.length}</div>
                            </div>
                            <div className="bg-white dark:bg-[#1E1E1E] p-5 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Latest Published</div>
                                <div className="text-xl font-bold mt-2 text-gray-900 dark:text-white truncate">
                                    {posts[0]?.date || 'None'}
                                </div>
                            </div>
                        </div>

                        {/* Search & Filter Toolbar */}
                        <div className="bg-white dark:bg-[#1E1E1E] p-4 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="Search by title, slug, tag, author..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value)
                                        setCurrentPage(1)
                                    }}
                                    className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-[#18181b] text-black dark:text-white placeholder-[#9ca3af] dark:placeholder-[#71717a] border border-[#d1d5db] dark:border-[#3f3f46] rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                                <span className="absolute left-3 top-2.5 text-gray-400 text-sm">&#128269;</span>
                            </div>

                            <div className="flex items-center space-x-3">
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => {
                                        setCategoryFilter(e.target.value)
                                        setCurrentPage(1)
                                    }}
                                    className="px-3 py-2 text-sm bg-white dark:bg-[#18181b] text-black dark:text-white border border-[#d1d5db] dark:border-[#3f3f46] rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    <option value="ALL">All Categories ({categories.length})</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as any)}
                                    className="px-3 py-2 text-sm bg-white dark:bg-[#18181b] text-black dark:text-white border border-[#d1d5db] dark:border-[#3f3f46] rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    <option value="date_desc">Newest First</option>
                                    <option value="date_asc">Oldest First</option>
                                    <option value="title">Title (A-Z)</option>
                                </select>

                                <button
                                    onClick={loadPosts}
                                    title="Refresh post list"
                                    className="p-2 text-black dark:text-white bg-white dark:bg-[#18181b] hover:bg-gray-100 dark:hover:bg-[#27272a] rounded border border-[#d1d5db] dark:border-[#3f3f46] transition"
                                >
                                    &#8635;
                                </button>
                            </div>
                        </div>

                        {/* Posts List / Table */}
                        {loading ? (
                            <div className="bg-white dark:bg-[#1E1E1E] p-12 text-center rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
                                <div className="inline-block animate-spin text-2xl mb-2">&#9696;</div>
                                <p className="text-gray-500 text-sm">Loading blog posts...</p>
                            </div>
                        ) : error ? (
                            <div className="bg-red-50 dark:bg-red-950 p-6 rounded-lg border border-red-200 dark:border-red-800 text-center">
                                <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
                                <button
                                    onClick={loadPosts}
                                    className="mt-3 px-4 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : filteredPosts.length === 0 ? (
                            <div className="bg-white dark:bg-[#1E1E1E] p-12 text-center rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
                                <p className="text-gray-500 text-base">No posts found matching your criteria.</p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('')
                                        setCategoryFilter('ALL')
                                    }}
                                    className="mt-3 px-3 py-1.5 text-sm text-red-600 dark:text-red-400 font-medium hover:underline"
                                >
                                    Clear filters
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-[#1E1E1E] rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                                <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center text-xs text-gray-500 font-medium">
                                    <span>
                                        Showing {paginatedPosts.length} of {filteredPosts.length} posts
                                    </span>
                                    <span>Page {currentPage} of {totalPages}</span>
                                </div>

                                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {paginatedPosts.map((post) => (
                                        <div
                                            key={post.filename}
                                            className="p-5 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2.5 mb-1.5">
                                                    {post.category && (
                                                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900">
                                                            {post.category}
                                                        </span>
                                                    )}
                                                    <span className="text-xs text-gray-500 font-mono">
                                                        {post.date || 'No date'}
                                                    </span>
                                                    <span className="text-xs text-gray-400">&bull;</span>
                                                    <span className="text-xs text-gray-500 truncate max-w-[200px]">
                                                        {Array.isArray(post.author)
                                                            ? post.author
                                                                  .map(
                                                                      (h) =>
                                                                          authors.find(
                                                                              (a) =>
                                                                                  a.handle.toLowerCase() ===
                                                                                  h.toLowerCase()
                                                                          )?.name || h
                                                                  )
                                                                  .join(', ')
                                                            : authors.find(
                                                                  (a) =>
                                                                      a.handle.toLowerCase() ===
                                                                      post.author?.toString().toLowerCase()
                                                              )?.name ||
                                                              post.author ||
                                                              'Unknown'}
                                                    </span>
                                                </div>

                                                <h3
                                                    onClick={() => handleEditPost(post.filename)}
                                                    className="font-bold text-base text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 cursor-pointer truncate"
                                                >
                                                    {post.title}
                                                </h3>

                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                                                    {post.description || post.filename}
                                                </p>

                                                {post.tags && post.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                                        {post.tags.slice(0, 4).map((t) => (
                                                            <span
                                                                key={t}
                                                                className="px-1.5 py-0.5 rounded text-[11px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                                                            >
                                                                #{t}
                                                            </span>
                                                        ))}
                                                        {post.tags.length > 4 && (
                                                            <span className="text-[11px] text-gray-400 self-center">
                                                                +{post.tags.length - 4} more
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center space-x-2 shrink-0">
                                                <button
                                                    onClick={() => handleEditPost(post.filename)}
                                                    className="px-3 py-1.5 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition"
                                                >
                                                    Edit
                                                </button>
                                                <a
                                                    href={`/blog/${post.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-3 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 rounded transition"
                                                >
                                                    View &nearr;
                                                </a>
                                                <button
                                                    onClick={() => handleDeletePost(post.filename, post.title)}
                                                    className="px-2.5 py-1.5 text-xs font-semibold text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded transition"
                                                    title="Delete post"
                                                >
                                                    &#128465;
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination Footer */}
                                {totalPages > 1 && (
                                    <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                                        <button
                                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className="px-3 py-1.5 text-xs font-medium rounded border border-gray-300 dark:border-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800"
                                        >
                                            &larr; Previous
                                        </button>
                                        <div className="text-xs text-gray-500 font-medium">
                                            Page {currentPage} of {totalPages}
                                        </div>
                                        <button
                                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-1.5 text-xs font-medium rounded border border-gray-300 dark:border-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800"
                                        >
                                            Next &rarr;
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    /* Editor View */
                    <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                        {/* Editor Header */}
                        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {isEditing ? `Edit Post: ${editorTitle || editorSlug}` : 'Create New Blog Post'}
                                </h2>
                                <p className="text-xs text-gray-500 mt-1 font-mono">
                                    URL: /blog/{editorSlug || '<slug>'} {activeFilename ? `(${activeFilename})` : ''}
                                </p>
                            </div>

                            <div className="flex items-center space-x-3">
                                {isEditing && editorSlug && (
                                    <a
                                        href={`/blog/${editorSlug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3.5 py-2 text-xs font-semibold text-black dark:text-white border border-gray-300 dark:border-[#383a42] bg-white dark:bg-[#2c2d33] hover:bg-gray-100 dark:hover:bg-[#383a42] rounded-md transition"
                                    >
                                        Live Page &nearr;
                                    </a>
                                )}
                                <button
                                    onClick={() => setView('list')}
                                    className="px-4 py-2 text-xs font-semibold text-black dark:text-white bg-gray-100 dark:bg-[#2c2d33] hover:bg-gray-200 dark:hover:bg-[#383a42] border border-gray-300 dark:border-[#383a42] rounded-md transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSavePost}
                                    disabled={saving}
                                    className="px-5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-md shadow disabled:opacity-50 flex items-center space-x-2"
                                >
                                    {saving && <span className="animate-spin">&#9696;</span>}
                                    <span>{saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Publish Post'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Metadata Fields */}
                        <div className="p-6 bg-gray-50/60 dark:bg-[#202124] border-b border-gray-200 dark:border-[#383a42]">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">Post Metadata</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2">
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">
                                        Post Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={editorTitle}
                                        onChange={(e) => handleTitleChange(e.target.value)}
                                        placeholder="e.g. In-depth: ClickHouse vs PostgreSQL"
                                        className="w-full px-3 py-2 text-sm bg-white dark:bg-[#18181b] text-black dark:text-white placeholder-[#9ca3af] dark:placeholder-[#71717a] border border-[#d1d5db] dark:border-[#3f3f46] rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">
                                        URL Slug <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={editorSlug}
                                        onChange={(e) => setEditorSlug(e.target.value)}
                                        placeholder="clickhouse-vs-postgres"
                                        className="w-full px-3 py-2 text-sm bg-white dark:bg-[#18181b] text-black dark:text-white placeholder-[#9ca3af] dark:placeholder-[#71717a] border border-[#d1d5db] dark:border-[#3f3f46] rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 font-mono text-xs"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">
                                        Publish Date
                                    </label>
                                    <input
                                        type="date"
                                        value={editorDate}
                                        onChange={(e) => setEditorDate(e.target.value)}
                                        className="w-full px-3 py-2 text-sm bg-white dark:bg-[#18181b] text-black dark:text-white border border-[#d1d5db] dark:border-[#3f3f46] rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">
                                        Category
                                    </label>
                                    <select
                                        value={editorCategory}
                                        onChange={(e) => setEditorCategory(e.target.value)}
                                        className="w-full px-3 py-2 text-sm bg-white dark:bg-[#18181b] text-black dark:text-white border border-[#d1d5db] dark:border-[#3f3f46] rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        {COMMON_CATEGORIES.map((c) => (
                                            <option key={c} value={c}>
                                                {c}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <label className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                                            Author / Penulis <span className="text-red-500">*</span>
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsCustomAuthor(!isCustomAuthor)
                                                if (!isCustomAuthor) {
                                                    setCustomAuthorName('')
                                                    setCustomAuthorHandle('')
                                                    setCustomAuthorRole('')
                                                }
                                            }}
                                            className="text-[11px] font-semibold text-red-600 dark:text-red-400 hover:underline"
                                        >
                                            {isCustomAuthor ? '← Pilih dari Daftar' : '+ Tulis Author Baru'}
                                        </button>
                                    </div>

                                    {!isCustomAuthor ? (
                                        <div>
                                            <select
                                                value={editorAuthor}
                                                onChange={(e) => {
                                                    if (e.target.value === '__custom__') {
                                                        setIsCustomAuthor(true)
                                                        setCustomAuthorName('')
                                                        setCustomAuthorHandle('')
                                                        setCustomAuthorRole('')
                                                    } else {
                                                        setEditorAuthor(e.target.value)
                                                    }
                                                }}
                                                className="w-full px-3 py-2 text-sm bg-white dark:bg-[#18181b] text-black dark:text-white border border-[#d1d5db] dark:border-[#3f3f46] rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                            >
                                                <option value="__custom__">
                                                    + Tulis Author Baru (Custom)...
                                                </option>
                                                <optgroup label="Daftar Author Terdaftar">
                                                    {authors.map((a) => (
                                                        <option key={a.handle} value={a.handle}>
                                                            {a.name} {a.role ? `• ${a.role}` : ''} ({a.handle})
                                                        </option>
                                                    ))}
                                                </optgroup>
                                            </select>

                                            {/* Author Preview Badge */}
                                            {(() => {
                                                const cur = authors.find(
                                                    (a) => a.handle.toLowerCase() === editorAuthor.toLowerCase()
                                                )
                                                if (!cur) return null
                                                return (
                                                    <div className="mt-1.5 flex items-center space-x-2 text-[11px] text-gray-500 dark:text-gray-400">
                                                        <span className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                                                            {cur.name}
                                                        </span>
                                                        {cur.role && (
                                                            <span className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 truncate">
                                                                {cur.role}
                                                            </span>
                                                        )}
                                                        <span className="font-mono text-gray-400 dark:text-gray-500 truncate">
                                                            @{cur.handle}
                                                        </span>
                                                    </div>
                                                )
                                            })()}
                                        </div>
                                    ) : (
                                        <div className="p-3 bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/60 rounded-md space-y-2.5">
                                            <div className="flex items-center justify-between text-xs font-semibold text-red-700 dark:text-red-400">
                                                <span>✍️ Tulis Author Baru</span>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsCustomAuthor(false)}
                                                    className="text-[11px] text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline"
                                                >
                                                    Batal
                                                </button>
                                            </div>

                                            <div>
                                                <input
                                                    type="text"
                                                    value={customAuthorName}
                                                    onChange={(e) => {
                                                        const val = e.target.value
                                                        setCustomAuthorName(val)
                                                        const slug = val
                                                            .toLowerCase()
                                                            .replace(/[^a-z0-9]+/g, '-')
                                                            .replace(/^-|-$/g, '')
                                                        setCustomAuthorHandle(slug)
                                                    }}
                                                    placeholder="Nama Lengkap (e.g. Budi Santoso)"
                                                    className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-[#18181b] text-black dark:text-white placeholder-[#9ca3af] dark:placeholder-[#71717a] border border-[#d1d5db] dark:border-[#3f3f46] rounded focus:outline-none focus:ring-1 focus:ring-red-500 font-medium"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <input
                                                        type="text"
                                                        value={customAuthorRole}
                                                        onChange={(e) => setCustomAuthorRole(e.target.value)}
                                                        placeholder="Jabatan/Role (e.g. Engineer)"
                                                        className="w-full px-2 py-1.5 text-xs bg-white dark:bg-[#18181b] text-black dark:text-white placeholder-[#9ca3af] dark:placeholder-[#71717a] border border-[#d1d5db] dark:border-[#3f3f46] rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        type="text"
                                                        value={customAuthorHandle}
                                                        onChange={(e) => setCustomAuthorHandle(e.target.value)}
                                                        placeholder="Handle (e.g. budi-santoso)"
                                                        className="w-full px-2 py-1.5 text-xs bg-white dark:bg-[#18181b] text-black dark:text-white placeholder-[#9ca3af] dark:placeholder-[#71717a] border border-[#d1d5db] dark:border-[#3f3f46] rounded focus:outline-none focus:ring-1 focus:ring-red-500 font-mono"
                                                    />
                                                </div>
                                            </div>

                                            <p className="text-[10px] text-gray-500 dark:text-gray-400">
                                                ✓ Author baru otomatis didaftarkan dan dapat dipilih kembali.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="lg:col-span-2">
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">
                                        Tags (comma-separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={editorTags}
                                        onChange={(e) => setEditorTags(e.target.value)}
                                        placeholder="Engineering, Guides, Product updates"
                                        className="w-full px-3 py-2 text-sm bg-white dark:bg-[#18181b] text-black dark:text-white placeholder-[#9ca3af] dark:placeholder-[#71717a] border border-[#d1d5db] dark:border-[#3f3f46] rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">
                                        Featured Image URL
                                    </label>
                                    <input
                                        type="text"
                                        value={editorFeaturedImage}
                                        onChange={(e) => setEditorFeaturedImage(e.target.value)}
                                        placeholder="https://res.cloudinary.com/..."
                                        className="w-full px-3 py-2 text-sm bg-white dark:bg-[#18181b] text-black dark:text-white placeholder-[#9ca3af] dark:placeholder-[#71717a] border border-[#d1d5db] dark:border-[#3f3f46] rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>

                                <div className="lg:col-span-3">
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">
                                        Description / SEO Summary
                                    </label>
                                    <textarea
                                        rows={2}
                                        value={editorDescription}
                                        onChange={(e) => setEditorDescription(e.target.value)}
                                        placeholder="Short summary for preview cards and search engines..."
                                        className="w-full px-3 py-2 text-sm bg-white dark:bg-[#18181b] text-black dark:text-white placeholder-[#9ca3af] dark:placeholder-[#71717a] border border-[#d1d5db] dark:border-[#3f3f46] rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Editor Controls & Mode Switcher */}
                        <div className="p-3 bg-gray-100 dark:bg-[#202124] border-b border-gray-200 dark:border-[#383a42] flex flex-wrap items-center justify-between gap-3">
                            {/* Markdown Toolbar */}
                            <div className="flex items-center space-x-1">
                                <button
                                    onClick={() => insertMarkdown('**', '**')}
                                    className="px-2.5 py-1 text-xs font-bold bg-white dark:bg-[#2c2d33] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#383a42] rounded border border-gray-300 dark:border-[#383a42] transition"
                                    title="Bold (**text**)"
                                >
                                    B
                                </button>
                                <button
                                    onClick={() => insertMarkdown('*', '*')}
                                    className="px-2.5 py-1 text-xs italic font-bold bg-white dark:bg-[#2c2d33] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#383a42] rounded border border-gray-300 dark:border-[#383a42] transition"
                                    title="Italic (*text*)"
                                >
                                    I
                                </button>
                                <button
                                    onClick={() => insertMarkdown('# ')}
                                    className="px-2.5 py-1 text-xs font-bold bg-white dark:bg-[#2c2d33] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#383a42] rounded border border-gray-300 dark:border-[#383a42] transition"
                                    title="Heading 1"
                                >
                                    H1
                                </button>
                                <button
                                    onClick={() => insertMarkdown('## ')}
                                    className="px-2.5 py-1 text-xs font-bold bg-white dark:bg-[#2c2d33] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#383a42] rounded border border-gray-300 dark:border-[#383a42] transition"
                                    title="Heading 2"
                                >
                                    H2
                                </button>
                                <button
                                    onClick={() => insertMarkdown('### ')}
                                    className="px-2.5 py-1 text-xs font-bold bg-white dark:bg-[#2c2d33] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#383a42] rounded border border-gray-300 dark:border-[#383a42] transition"
                                    title="Heading 3"
                                >
                                    H3
                                </button>
                                <button
                                    onClick={() => insertMarkdown('> ')}
                                    className="px-2.5 py-1 text-xs font-semibold bg-white dark:bg-[#2c2d33] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#383a42] rounded border border-gray-300 dark:border-[#383a42] transition"
                                    title="Quote"
                                >
                                    &ldquo; Quote
                                </button>
                                <button
                                    onClick={() => insertMarkdown('```\n', '\n```')}
                                    className="px-2.5 py-1 text-xs font-mono font-semibold bg-white dark:bg-[#2c2d33] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#383a42] rounded border border-gray-300 dark:border-[#383a42] transition"
                                    title="Code Block"
                                >
                                    &lt;/&gt;
                                </button>
                                <button
                                    onClick={() => insertMarkdown('[', '](https://...)')}
                                    className="px-2.5 py-1 text-xs font-semibold bg-white dark:bg-[#2c2d33] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#383a42] rounded border border-gray-300 dark:border-[#383a42] transition"
                                    title="Link"
                                >
                                    &#128279; Link
                                </button>
                                <button
                                    onClick={() => insertMarkdown('![alt text](', ')')}
                                    className="px-2.5 py-1 text-xs font-semibold bg-white dark:bg-[#2c2d33] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#383a42] rounded border border-gray-300 dark:border-[#383a42] transition"
                                    title="Image"
                                >
                                    &#128247; Image
                                </button>
                                <button
                                    onClick={() => insertMarkdown('- ')}
                                    className="px-2.5 py-1 text-xs font-semibold bg-white dark:bg-[#2c2d33] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#383a42] rounded border border-gray-300 dark:border-[#383a42] transition"
                                    title="List"
                                >
                                    &bull; List
                                </button>
                            </div>

                            {/* View Mode Toggle */}
                            <div className="flex items-center space-x-1 bg-gray-200 dark:bg-[#2c2d33] p-0.5 rounded border border-gray-300 dark:border-[#383a42]">
                                <button
                                    onClick={() => setEditorMode('edit')}
                                    className={`px-2.5 py-1 text-xs font-semibold rounded transition ${
                                        editorMode === 'edit'
                                            ? 'bg-red-600 text-white shadow-sm'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-[#383a42]'
                                    }`}
                                >
                                    Editor Only
                                </button>
                                <button
                                    onClick={() => setEditorMode('split')}
                                    className={`px-2.5 py-1 text-xs font-semibold rounded transition ${
                                        editorMode === 'split'
                                            ? 'bg-red-600 text-white shadow-sm'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-[#383a42]'
                                    }`}
                                >
                                    Split View
                                </button>
                                <button
                                    onClick={() => setEditorMode('preview')}
                                    className={`px-2.5 py-1 text-xs font-semibold rounded transition ${
                                        editorMode === 'preview'
                                            ? 'bg-red-600 text-white shadow-sm'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-[#383a42]'
                                    }`}
                                >
                                    Preview Only
                                </button>
                            </div>
                        </div>

                        {/* Editor & Preview Panes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-800 min-h-[550px]">
                            {/* Editor Pane */}
                            {(editorMode === 'split' || editorMode === 'edit') && (
                                <div className={`${editorMode === 'edit' ? 'col-span-2' : ''} p-4 flex flex-col`}>
                                    <textarea
                                        ref={textareaRef}
                                        value={editorContent}
                                        onChange={(e) => setEditorContent(e.target.value)}
                                        placeholder="Write markdown here..."
                                        rows={25}
                                        className="w-full flex-1 p-3 text-sm font-mono bg-transparent border-0 focus:outline-none resize-none leading-relaxed text-gray-900 dark:text-gray-100"
                                    />
                                </div>
                            )}

                            {/* Preview Pane */}
                            {(editorMode === 'split' || editorMode === 'preview') && (
                                <div
                                    className={`${
                                        editorMode === 'preview' ? 'col-span-2' : ''
                                    } p-6 bg-white dark:bg-[#181818] overflow-y-auto max-h-[650px]`}
                                >
                                    <div className="border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
                                        {editorFeaturedImage && (
                                            <img
                                                src={editorFeaturedImage}
                                                alt="Featured"
                                                className="w-full max-h-56 object-cover rounded-md mb-4"
                                            />
                                        )}
                                        <div className="flex items-center space-x-2 text-xs text-red-600 dark:text-red-400 font-semibold mb-1">
                                            <span>{editorCategory}</span>
                                            <span>&bull;</span>
                                            <span className="text-gray-400 font-normal">{editorDate}</span>
                                        </div>
                                        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
                                            {editorTitle || 'Untitled Blog Post'}
                                        </h1>
                                        {editorDescription && (
                                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 italic">
                                                {editorDescription}
                                            </p>
                                        )}
                                    </div>

                                    <div
                                        className="prose dark:prose-invert max-w-none text-sm md:text-base leading-relaxed"
                                        dangerouslySetInnerHTML={{
                                            __html: renderMarkdownPreview(editorContent),
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Editor Footer Bar */}
                        <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500">
                            <div>
                                {wordCount} words &bull; ~{readingTime} min read
                            </div>
                            <div className="flex items-center space-x-3">
                                <span>Markdown &amp; MDX supported</span>
                                <button
                                    onClick={handleSavePost}
                                    disabled={saving}
                                    className="font-bold text-red-600 dark:text-red-400 hover:underline"
                                >
                                    {saving ? 'Saving...' : 'Save & Publish'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
