import React, { useState, useEffect, useMemo } from 'react'

export interface AuthorItem {
    handle: string
    name: string
    role?: string
    link_type?: string
    link_url?: string
    profile_id?: number
    image?: string
}

export default function AuthorsEditor({ onAuthorCreated }: { onAuthorCreated?: () => void }) {
    const [authors, setAuthors] = useState<AuthorItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
    const [searchQuery, setSearchQuery] = useState('')

    // New author modal / form state
    const [isAdding, setIsAdding] = useState(false)
    const [formName, setFormName] = useState('')
    const [formHandle, setFormHandle] = useState('')
    const [formRole, setFormRole] = useState('')
    const [formLinkType, setFormLinkType] = useState('linkedin')
    const [formLinkUrl, setFormLinkUrl] = useState('')
    const [saving, setSaving] = useState(false)

    const showToast = (text: string, type: 'success' | 'error' = 'success') => {
        setStatusMsg({ text, type })
        setTimeout(() => setStatusMsg(null), 4000)
    }

    const loadAuthors = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch('/api/admin-authors')
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            const data = await res.json()
            setAuthors(data.authors || [])
        } catch (err: any) {
            console.error('Failed to load authors:', err)
            setError(err.message || 'Gagal memuat data author')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadAuthors()
    }, [])

    const filteredAuthors = useMemo(() => {
        if (!searchQuery.trim()) return authors
        const q = searchQuery.toLowerCase()
        return authors.filter(
            (a) =>
                a.name.toLowerCase().includes(q) ||
                a.handle.toLowerCase().includes(q) ||
                (a.role && a.role.toLowerCase().includes(q))
        )
    }, [authors, searchQuery])

    const handleNameChange = (val: string) => {
        setFormName(val)
        const autoHandle = val
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
        setFormHandle(autoHandle)
    }

    const handleSaveAuthor = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formName.trim()) {
            alert('Nama author wajib diisi.')
            return
        }

        const handle = (formHandle.trim() || formName.trim())
            .toLowerCase()
            .replace(/[^a-z0-9\-]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')

        setSaving(true)
        try {
            const res = await fetch('/api/admin-authors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formName.trim(),
                    handle,
                    role: formRole.trim() || 'Author',
                    link_type: formLinkUrl.trim() ? formLinkType : undefined,
                    link_url: formLinkUrl.trim() || undefined,
                }),
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Gagal menyimpan author')

            showToast(`Author "${formName}" berhasil ditambahkan!`)
            setIsAdding(false)
            setFormName('')
            setFormHandle('')
            setFormRole('')
            setFormLinkUrl('')
            await loadAuthors()
            if (onAuthorCreated) onAuthorCreated()
        } catch (err: any) {
            showToast(`Error: ${err.message}`, 'error')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="space-y-6">
            {/* Notification Toast */}
            {statusMsg && (
                <div
                    className={`p-4 rounded-lg text-sm font-medium border flex items-center justify-between ${
                        statusMsg.type === 'success'
                            ? 'bg-green-50 dark:bg-green-950/60 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
                            : 'bg-red-50 dark:bg-red-950/60 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                    }`}
                >
                    <span>{statusMsg.text}</span>
                    <button
                        onClick={() => setStatusMsg(null)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                        &times;
                    </button>
                </div>
            )}

            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#1E1E1E] p-4 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center font-bold text-lg">
                        ✍️
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-gray-900 dark:text-white">Authors & Penulis</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Kelola daftar author lokal yang dapat dipilih untuk artikel blog
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari author / handle..."
                            className="w-56 px-3 py-1.5 text-xs bg-white dark:bg-[#18181b] text-black dark:text-white placeholder-[#9ca3af] dark:placeholder-[#71717a] border border-[#d1d5db] dark:border-[#3f3f46] rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-2 top-1.5 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            >
                                &times;
                            </button>
                        )}
                    </div>

                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="px-3.5 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded shadow-sm transition flex items-center space-x-1"
                    >
                        <span>{isAdding ? 'Tutup Form' : '+ Tambah Author'}</span>
                    </button>
                </div>
            </div>

            {/* Add Author Form */}
            {isAdding && (
                <div className="bg-white dark:bg-[#1E1E1E] rounded-lg border border-red-200 dark:border-red-900/50 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            Tambah Author Baru
                        </h3>
                        <span className="text-xs text-gray-400">Tersimpan ke database lokal (authors.json)</span>
                    </div>

                    <form onSubmit={handleSaveAuthor} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">
                                    Nama Lengkap <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formName}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                    placeholder="e.g. Budi Santoso"
                                    required
                                    className="w-full px-3 py-2 text-sm bg-white dark:bg-[#18181b] text-black dark:text-white placeholder-[#9ca3af] dark:placeholder-[#71717a] border border-[#d1d5db] dark:border-[#3f3f46] rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">
                                    Handle / Slug Unik <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formHandle}
                                    onChange={(e) => setFormHandle(e.target.value)}
                                    placeholder="budi-santoso"
                                    required
                                    className="w-full px-3 py-2 text-sm bg-white dark:bg-[#18181b] text-black dark:text-white placeholder-[#9ca3af] dark:placeholder-[#71717a] border border-[#d1d5db] dark:border-[#3f3f46] rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 font-mono text-xs"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">
                                    Jabatan / Role
                                </label>
                                <input
                                    type="text"
                                    value={formRole}
                                    onChange={(e) => setFormRole(e.target.value)}
                                    placeholder="e.g. Content Writer, Engineer"
                                    className="w-full px-3 py-2 text-sm bg-white dark:bg-[#18181b] text-black dark:text-white placeholder-[#9ca3af] dark:placeholder-[#71717a] border border-[#d1d5db] dark:border-[#3f3f46] rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">
                                    Tipe Link (Opsional)
                                </label>
                                <select
                                    value={formLinkType}
                                    onChange={(e) => setFormLinkType(e.target.value)}
                                    className="w-full px-3 py-2 text-sm bg-white dark:bg-[#18181b] text-black dark:text-white border border-[#d1d5db] dark:border-[#3f3f46] rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    <option value="linkedin">LinkedIn</option>
                                    <option value="twitter">Twitter / X</option>
                                    <option value="github">GitHub</option>
                                    <option value="website">Website</option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">
                                    URL Profil / Medsos (Opsional)
                                </label>
                                <input
                                    type="url"
                                    value={formLinkUrl}
                                    onChange={(e) => setFormLinkUrl(e.target.value)}
                                    placeholder="https://..."
                                    className="w-full px-3 py-2 text-sm bg-white dark:bg-[#18181b] text-black dark:text-white placeholder-[#9ca3af] dark:placeholder-[#71717a] border border-[#d1d5db] dark:border-[#3f3f46] rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setIsAdding(false)}
                                className="px-3 py-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-4 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded shadow-sm transition"
                            >
                                {saving ? 'Menyimpan...' : 'Simpan Author'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Authors Grid */}
            {loading ? (
                <div className="p-12 text-center text-gray-400 dark:text-gray-500">Memuat data author...</div>
            ) : error ? (
                <div className="bg-red-50 dark:bg-red-950 p-6 rounded-lg border border-red-200 dark:border-red-800 text-center">
                    <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
                    <button
                        onClick={loadAuthors}
                        className="mt-3 px-4 py-1.5 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Coba Lagi
                    </button>
                </div>
            ) : filteredAuthors.length === 0 ? (
                <div className="bg-white dark:bg-[#1E1E1E] p-12 text-center rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
                    <p className="text-gray-500 text-sm">Tidak ada author yang cocok dengan pencarian "{searchQuery}".</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredAuthors.map((author) => {
                        const initial = author.name ? author.name.charAt(0).toUpperCase() : 'A'
                        return (
                            <div
                                key={author.handle}
                                className="bg-white dark:bg-[#1E1E1E] rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-red-400 dark:hover:border-red-600 transition shadow-sm flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center space-x-3 mb-2.5">
                                        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 flex items-center justify-center font-bold text-base border border-red-200 dark:border-red-800 shrink-0">
                                            {initial}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h4 className="font-bold text-sm text-gray-900 dark:text-white truncate">
                                                {author.name}
                                            </h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                {author.role || 'Author'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-[11px]">
                                        <span className="font-mono text-gray-400 dark:text-gray-500 truncate">
                                            @{author.handle}
                                        </span>
                                        {author.link_url && (
                                            <a
                                                href={author.link_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-red-600 dark:text-red-400 hover:underline capitalize"
                                            >
                                                {author.link_type || 'Link'} &nearr;
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
