import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'gatsby'
import { useLocalAuth } from '../../hooks/useLocalAuth'

export interface AdminCommentItem {
    id: string
    postSlug: string
    parentId?: string | null
    content: string
    createdAt: string
    authorType: 'user' | 'admin' | 'guest'
    userId?: string
    authorName: string
    authorEmail: string
    notifyReplies: boolean
    status: 'approved' | 'pending' | 'spam'
}

export default function CommentsEditor() {
    const { user } = useLocalAuth()
    const [comments, setComments] = useState<AdminCommentItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [authorTypeFilter, setAuthorTypeFilter] = useState<'ALL' | 'guest' | 'user' | 'admin'>('ALL')

    // Reply state
    const [replyingId, setReplyingId] = useState<string | null>(null)
    const [replyText, setReplyText] = useState('')
    const [sendingReply, setSendingReply] = useState(false)

    const showToast = (text: string, type: 'success' | 'error' = 'success') => {
        setStatusMsg({ text, type })
        setTimeout(() => setStatusMsg(null), 4000)
    }

    const loadAllComments = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch('/api/comments?action=all')
            if (!res.ok) throw new Error(`HTTP error ${res.status}`)
            const data = await res.json()
            setComments(data.comments || [])
        } catch (err: any) {
            console.error('Failed to load comments:', err)
            setError(err.message || 'Gagal memuat komentar.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadAllComments()
    }, [])

    const filteredComments = useMemo(() => {
        return comments.filter((c) => {
            if (authorTypeFilter !== 'ALL' && c.authorType !== authorTypeFilter) {
                return false
            }
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase()
                const matchName = c.authorName.toLowerCase().includes(q)
                const matchEmail = c.authorEmail.toLowerCase().includes(q)
                const matchContent = c.content.toLowerCase().includes(q)
                const matchSlug = c.postSlug.toLowerCase().includes(q)
                return matchName || matchEmail || matchContent || matchSlug
            }
            return true
        })
    }, [comments, searchQuery, authorTypeFilter])

    const handleDelete = async (id: string) => {
        if (!window.confirm('Hapus komentar ini beserta seluruh balasannya?')) return

        try {
            const res = await fetch(`/api/comments?id=${encodeURIComponent(id)}`, {
                method: 'DELETE',
            })
            if (!res.ok) throw new Error(`HTTP error ${res.status}`)
            showToast('Komentar berhasil dihapus.')
            await loadAllComments()
        } catch (err: any) {
            showToast(`Gagal menghapus: ${err.message}`, 'error')
        }
    }

    const handleSendAdminReply = async (parentComment: AdminCommentItem) => {
        if (!replyText.trim()) {
            alert('Silakan tulis isi balasan.')
            return
        }

        setSendingReply(true)
        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    postSlug: parentComment.postSlug,
                    parentId: parentComment.id,
                    content: replyText.trim(),
                    authorType: 'admin',
                    userId: user?.id,
                    authorName: user?.name || 'Administrator',
                    authorEmail: user?.email || 'admin@posthog.local',
                    notifyReplies: true,
                }),
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Gagal membalas komentar')

            showToast('Balasan admin berhasil dipublikasikan!')
            setReplyingId(null)
            setReplyText('')
            await loadAllComments()
        } catch (err: any) {
            showToast(`Error: ${err.message}`, 'error')
        } finally {
            setSendingReply(false)
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#1E1F24] p-4 rounded-xl border border-[#E5E7EB] dark:border-[#374151] shadow-sm">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FEE2E2] dark:bg-[#7F1D1D] text-[#DC2626] dark:text-[#FCA5A5] flex items-center justify-center font-bold text-lg border border-[#FCA5A5] dark:border-[#991B1B]">
                        💬
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-[#111827] dark:text-[#FFFFFF]">Moderasi Komentar Blog</h2>
                        <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                            Kelola diskusi pengunjung (user terdaftar &amp; tamu) di seluruh postingan blog
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <select
                        value={authorTypeFilter}
                        onChange={(e) => setAuthorTypeFilter(e.target.value as any)}
                        className="px-3 py-1.5 text-xs bg-white dark:bg-[#141416] text-[#111827] dark:text-[#FFFFFF] border border-[#D1D5DB] dark:border-[#4B5563] rounded-md focus:outline-none focus:border-[#F54E00] focus:ring-1 focus:ring-[#F54E00]"
                    >
                        <option value="ALL">Semua Tipe Pengirim</option>
                        <option value="guest">Hanya Tamu (Guest)</option>
                        <option value="user">Hanya Member Terdaftar</option>
                        <option value="admin">Hanya Administrator</option>
                    </select>

                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari komentar / artikel..."
                        className="w-48 sm:w-60 px-3 py-1.5 text-xs bg-white dark:bg-[#141416] text-[#111827] dark:text-[#FFFFFF] placeholder-[#9CA3AF] dark:placeholder-[#6B7280] border border-[#D1D5DB] dark:border-[#4B5563] rounded-md focus:outline-none focus:border-[#F54E00] focus:ring-1 focus:ring-[#F54E00]"
                    />

                    <button
                        onClick={loadAllComments}
                        title="Segarkan daftar komentar"
                        className="p-1.5 text-[#111827] dark:text-[#FFFFFF] bg-white dark:bg-[#141416] hover:bg-[#F3F4F6] dark:hover:bg-[#2A2B32] rounded border border-[#D1D5DB] dark:border-[#4B5563] transition text-sm"
                    >
                        &#8635;
                    </button>
                </div>
            </div>

            {/* Comments List */}
            {loading ? (
                <div className="p-12 text-center text-[#6B7280] dark:text-[#9CA3AF] animate-pulse">Memuat komentar...</div>
            ) : error ? (
                <div className="bg-[#FEF2F2] dark:bg-[#451A1A] p-6 rounded-lg border border-[#FCA5A5] dark:border-[#991B1B] text-center">
                    <p className="text-[#991B1B] dark:text-[#FCA5A5] font-semibold">{error}</p>
                    <button
                        onClick={loadAllComments}
                        className="mt-3 px-4 py-1.5 text-xs bg-[#F54E00] text-white rounded font-bold hover:bg-[#D44300]"
                    >
                        Coba Lagi
                    </button>
                </div>
            ) : filteredComments.length === 0 ? (
                <div className="bg-white dark:bg-[#1E1F24] p-12 text-center rounded-xl border border-[#E5E7EB] dark:border-[#374151] shadow-sm">
                    <p className="text-[#6B7280] dark:text-[#9CA3AF] text-sm">Tidak ada komentar yang ditemukan.</p>
                </div>
            ) : (
                <div className="bg-white dark:bg-[#1E1F24] rounded-xl border border-[#E5E7EB] dark:border-[#374151] shadow-sm overflow-hidden divide-y divide-[#E5E7EB] dark:divide-[#374151]">
                    <div className="px-5 py-3 bg-[#F9FAFB] dark:bg-[#141416] text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] flex justify-between">
                        <span>Menampilkan {filteredComments.length} dari {comments.length} komentar</span>
                        <span>Terbaru di atas</span>
                    </div>

                    {filteredComments.map((cmt) => (
                        <div key={cmt.id} className="p-5 hover:bg-[#F9FAFB]/60 dark:hover:bg-[#141416]/50 transition space-y-2.5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div className="flex items-center space-x-2.5">
                                    <div className="w-8 h-8 rounded-full bg-[#FEE2E2] dark:bg-[#7F1D1D] text-[#DC2626] dark:text-[#FCA5A5] font-bold text-xs flex items-center justify-center border border-[#FCA5A5] dark:border-[#991B1B]">
                                        {cmt.authorName.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-bold text-xs text-[#111827] dark:text-[#FFFFFF]">
                                                {cmt.authorName}
                                            </span>
                                            <span
                                                className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                                    cmt.authorType === 'admin'
                                                        ? 'bg-[#FEE2E2] text-[#B91C1C] dark:bg-[#7F1D1D] dark:text-[#FCA5A5]'
                                                        : cmt.authorType === 'user'
                                                        ? 'bg-[#DBEAFE] text-[#1D4ED8] dark:bg-[#1E3A8A] dark:text-[#BFDBFE]'
                                                        : 'bg-[#F3F4F6] text-[#4B5563] dark:bg-[#2A2B32] dark:text-[#D1D5DB]'
                                                }`}
                                            >
                                                {cmt.authorType}
                                            </span>
                                            <span className="text-[#9CA3AF] text-xs">&bull;</span>
                                            <span className="text-[#6B7280] dark:text-[#9CA3AF] text-xs font-mono">
                                                {cmt.authorEmail}
                                            </span>
                                        </div>
                                        <div className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] flex items-center gap-2 mt-0.5">
                                            <span>
                                                Artikel:{' '}
                                                <Link
                                                    to={`/blog/${cmt.postSlug}`}
                                                    target="_blank"
                                                    className="text-[#F54E00] dark:text-[#FF7A45] font-semibold hover:underline"
                                                >
                                                    /blog/{cmt.postSlug} &nearr;
                                                </Link>
                                            </span>
                                            <span>&bull;</span>
                                            <span>{new Date(cmt.createdAt).toLocaleString()}</span>
                                            {cmt.notifyReplies && (
                                                <span className="text-[#059669] dark:text-[#34D399] text-[10px] font-medium">
                                                    ✓ Notifikasi aktif
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 self-end sm:self-auto">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setReplyingId(replyingId === cmt.id ? null : cmt.id)
                                            setReplyText('')
                                        }}
                                        className="px-2.5 py-1 text-xs font-semibold text-[#111827] dark:text-[#FFFFFF] bg-[#F3F4F6] dark:bg-[#2A2B32] hover:bg-[#E5E7EB] dark:hover:bg-[#34353E] rounded border border-[#D1D5DB] dark:border-[#4B5563] transition"
                                    >
                                        {replyingId === cmt.id ? 'Tutup Balas' : '↳ Balas'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(cmt.id)}
                                        className="px-2.5 py-1 text-xs font-semibold text-[#DC2626] dark:text-[#F87171] bg-[#FEE2E2] dark:bg-[#7F1D1D]/40 hover:bg-[#FCA5A5] dark:hover:bg-[#7F1D1D] rounded border border-[#FCA5A5] dark:border-[#991B1B] transition"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>

                            {/* Comment text */}
                            <p className="text-xs text-[#111827] dark:text-[#E5E7EB] leading-relaxed whitespace-pre-wrap pl-10">
                                {cmt.content}
                            </p>

                            {/* Inline Admin Reply Box */}
                            {replyingId === cmt.id && (
                                <div className="ml-10 mt-2 p-3.5 bg-[#F9FAFB] dark:bg-[#141416] border border-[#FCA5A5] dark:border-[#7F1D1D] rounded-lg space-y-2">
                                    <div className="text-xs font-bold text-[#F54E00] dark:text-[#FF7A45] flex items-center gap-1.5">
                                        <span>🛡️ Balas sebagai Administrator:</span>
                                    </div>
                                    <textarea
                                        rows={2}
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder={`Tulis balasan untuk ${cmt.authorName}...`}
                                        className="w-full px-3 py-2 text-xs bg-white dark:bg-[#1E1F24] text-[#111827] dark:text-[#FFFFFF] border border-[#D1D5DB] dark:border-[#4B5563] rounded focus:outline-none focus:border-[#F54E00] focus:ring-1 focus:ring-[#F54E00]"
                                    />
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            type="button"
                                            onClick={() => setReplyingId(null)}
                                            className="px-3 py-1 text-xs text-[#6B7280] hover:text-[#111827] dark:text-[#9CA3AF] dark:hover:text-[#FFFFFF]"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="button"
                                            disabled={sendingReply}
                                            onClick={() => handleSendAdminReply(cmt)}
                                            className="px-3.5 py-1 text-xs font-bold text-white bg-[#F54E00] hover:bg-[#D44300] disabled:opacity-50 rounded transition shadow-sm"
                                        >
                                            {sendingReply ? 'Mengirim...' : 'Kirim Balasan'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
