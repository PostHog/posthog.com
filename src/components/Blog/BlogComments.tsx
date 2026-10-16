import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'gatsby'
import { useLocalAuth } from '../../hooks/useLocalAuth'

export interface CommentItem {
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

interface BlogCommentsProps {
    postSlug: string
    className?: string
}

export default function BlogComments({ postSlug, className = '' }: BlogCommentsProps) {
    const { user, isLoggedIn, isAdmin } = useLocalAuth()

    const cleanSlug = useMemo(() => {
        let slug = postSlug
        if ((!slug || slug === '/' || slug === '/blog') && typeof window !== 'undefined') {
            slug = window.location.pathname
        }
        if (!slug) return ''
        return slug
            .replace(/^\/blog\//, '')
            .replace(/^\//, '')
            .replace(/\/$/, '')
            .trim()
    }, [postSlug])

    const [comments, setComments] = useState<CommentItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

    // Main comment form state
    const [content, setContent] = useState('')
    const [guestName, setGuestName] = useState('')
    const [guestEmail, setGuestEmail] = useState('')
    const [notifyReplies, setNotifyReplies] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    // Inline reply form state
    const [replyingToId, setReplyingToId] = useState<string | null>(null)
    const [replyContent, setReplyContent] = useState('')
    const [replyGuestName, setReplyGuestName] = useState('')
    const [replyGuestEmail, setReplyGuestEmail] = useState('')
    const [replySubmitting, setReplySubmitting] = useState(false)

    const showToast = (text: string, type: 'success' | 'error' = 'success') => {
        setStatusMsg({ text, type })
        setTimeout(() => setStatusMsg(null), 4000)
    }

    const loadComments = async () => {
        if (!cleanSlug) return
        setLoading(true)
        setError(null)
        try {
            const res = await fetch(`/api/comments?postSlug=${encodeURIComponent(cleanSlug)}`)
            if (!res.ok) throw new Error(`HTTP error ${res.status}`)
            const data = await res.json()
            setComments(data.comments || [])
        } catch (err: any) {
            console.error('Failed to load comments:', err)
            setError(err.message || 'Gagal memuat komentar')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadComments()
    }, [cleanSlug])

    // Organize into top-level and nested replies
    const { topLevelComments, repliesMap } = useMemo(() => {
        const topLevel: CommentItem[] = []
        const replies = new Map<string, CommentItem[]>()

        comments.forEach((c) => {
            if (!c.parentId) {
                topLevel.push(c)
            } else {
                const list = replies.get(c.parentId) || []
                list.push(c)
                replies.set(c.parentId, list)
            }
        })

        return { topLevelComments: topLevel, repliesMap: replies }
    }, [comments])

    // Submit main comment
    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!content.trim()) {
            alert('Silakan tulis isi komentar.')
            return
        }

        const authorName = isLoggedIn && user ? user.name : guestName.trim()
        const authorEmail = isLoggedIn && user ? user.email : guestEmail.trim()
        const authorType = isLoggedIn && user ? user.role : 'guest'

        if (!authorName) {
            alert('Nama wajib diisi.')
            return
        }

        if (!authorEmail || !authorEmail.includes('@')) {
            alert('Email yang valid wajib diisi untuk notifikasi.')
            return
        }

        setSubmitting(true)
        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    postSlug: cleanSlug,
                    parentId: null,
                    content: content.trim(),
                    authorType,
                    userId: isLoggedIn && user ? user.id : undefined,
                    authorName,
                    authorEmail,
                    notifyReplies,
                }),
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Gagal mengirim komentar')

            showToast('Komentar Anda berhasil dipublikasikan!')
            setContent('')
            if (!isLoggedIn) {
                setGuestName('')
                setGuestEmail('')
            }
            await loadComments()
        } catch (err: any) {
            showToast(`Error: ${err.message}`, 'error')
        } finally {
            setSubmitting(false)
        }
    }

    // Submit inline reply
    const handleSubmitReply = async (parentId: string) => {
        if (!replyContent.trim()) {
            alert('Silakan tulis balasan Anda.')
            return
        }

        const authorName = isLoggedIn && user ? user.name : replyGuestName.trim()
        const authorEmail = isLoggedIn && user ? user.email : replyGuestEmail.trim()
        const authorType = isLoggedIn && user ? user.role : 'guest'

        if (!authorName) {
            alert('Nama wajib diisi.')
            return
        }

        if (!authorEmail || !authorEmail.includes('@')) {
            alert('Email valid wajib diisi untuk notifikasi balasan.')
            return
        }

        setReplySubmitting(true)
        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    postSlug: cleanSlug,
                    parentId,
                    content: replyContent.trim(),
                    authorType,
                    userId: isLoggedIn && user ? user.id : undefined,
                    authorName,
                    authorEmail,
                    notifyReplies: true,
                }),
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Gagal mengirim balasan')

            showToast('Balasan Anda berhasil dikirim!')
            setReplyingToId(null)
            setReplyContent('')
            setReplyGuestName('')
            setReplyGuestEmail('')
            await loadComments()
        } catch (err: any) {
            showToast(`Error: ${err.message}`, 'error')
        } finally {
            setReplySubmitting(false)
        }
    }

    // Delete comment (Admin only or owner)
    const handleDeleteComment = async (id: string) => {
        if (!window.confirm('Hapus komentar ini beserta balasannya?')) return

        try {
            const res = await fetch(`/api/comments?id=${encodeURIComponent(id)}`, {
                method: 'DELETE',
            })
            if (!res.ok) throw new Error(`HTTP error ${res.status}`)
            showToast('Komentar berhasil dihapus.')
            await loadComments()
        } catch (err: any) {
            showToast(`Gagal menghapus: ${err.message}`, 'error')
        }
    }

    const renderCommentBadge = (authorType: string) => {
        if (authorType === 'admin') {
            return (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 uppercase tracking-wider">
                    🛡️ Admin
                </span>
            )
        }
        if (authorType === 'user') {
            return (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 uppercase tracking-wider">
                    👤 Member
                </span>
            )
        }
        return (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#F3F4F6] dark:bg-[#2A2B32] text-[#4B5563] dark:text-[#D1D5DB] border border-[#D1D5DB] dark:border-[#4B5563]">
                Tamu
            </span>
        )
    }

    return (
        <div className={`mt-12 pt-8 border-t border-[#E5E7EB] dark:border-[#374151] not-prose ${className}`}>
            {/* Notification Toast */}
            {statusMsg && (
                <div
                    className={`mb-4 p-3 rounded-lg text-xs font-semibold border flex items-center justify-between ${
                        statusMsg.type === 'success'
                            ? 'bg-[#ECFDF5] dark:bg-[#064E3B] border-[#A7F3D0] dark:border-[#047857] text-[#065F46] dark:text-[#A7F3D0]'
                            : 'bg-[#FEF2F2] dark:bg-[#451A1A] border-[#FCA5A5] dark:border-[#991B1B] text-[#991B1B] dark:text-[#FCA5A5]'
                    }`}
                >
                    <span>{statusMsg.text}</span>
                    <button
                        onClick={() => setStatusMsg(null)}
                        className="text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-[#FFFFFF]"
                    >
                        &times;
                    </button>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                    <h3 className="text-xl font-bold text-[#111827] dark:text-[#FFFFFF] flex items-center gap-2">
                        <span>💬 Diskusi &amp; Komentar</span>
                        <span className="text-sm font-bold px-2 py-0.5 rounded-full bg-[#FEE2E2] dark:bg-[#7F1D1D] text-[#DC2626] dark:text-[#FCA5A5]">
                            {comments.length}
                        </span>
                    </h3>
                    <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                        Tinggalkan tanggapan atau ajukan pertanyaan terkait artikel ini.
                    </p>
                </div>

                <div className="text-xs flex items-center gap-2">
                    {isLoggedIn && user ? (
                        <div className="flex items-center gap-2 bg-[#F9FAFB] dark:bg-[#1E1F24] px-3 py-1.5 rounded-lg border border-[#E5E7EB] dark:border-[#374151]">
                            <span className="text-[#6B7280] dark:text-[#9CA3AF]">Masuk sebagai:</span>
                            <span className="font-bold text-[#111827] dark:text-[#FFFFFF]">{user.name}</span>
                            {renderCommentBadge(user.role)}
                            <Link to="/login" className="text-[#F54E00] dark:text-[#FF7A45] hover:underline text-[11px] ml-1 font-semibold">
                                (Ganti)
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <span className="text-[#6B7280] dark:text-[#9CA3AF]">Mode Tamu (Guest)</span>
                            <Link
                                to={`/login?redirect=/blog/${cleanSlug}`}
                                className="px-2.5 py-1 bg-[#F54E00] hover:bg-[#D44300] text-white rounded text-xs font-bold shadow-sm transition"
                            >
                                Login Akun
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Form Input Komentar Baru */}
            <form
                onSubmit={handleSubmitComment}
                className="bg-white dark:bg-[#1E1F24] rounded-xl border border-[#E5E7EB] dark:border-[#374151] p-5 shadow-sm space-y-4 mb-8"
            >
                <div className="flex items-center justify-between text-xs font-bold text-[#374151] dark:text-[#E5E7EB]">
                    <span>Tulis Komentar</span>
                    <span className="text-[#6B7280] dark:text-[#9CA3AF] font-normal">Mendukung format teks biasa</span>
                </div>

                <div>
                    <textarea
                        rows={3}
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Tuliskan pendapat, koreksi, atau pertanyaan Anda di sini..."
                        className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#141416] text-[#111827] dark:text-[#FFFFFF] placeholder-[#9CA3AF] dark:placeholder-[#6B7280] border border-[#D1D5DB] dark:border-[#4B5563] rounded-lg focus:outline-none focus:border-[#F54E00] focus:ring-1 focus:ring-[#F54E00] transition"
                    />
                </div>

                {/* If Not Logged In, require Name and Email for reply notification */}
                {!isLoggedIn && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div>
                            <label className="block text-xs font-bold text-[#374151] dark:text-[#E5E7EB] mb-1.5">
                                Nama Anda <span className="text-[#DC2626]">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={guestName}
                                onChange={(e) => setGuestName(e.target.value)}
                                placeholder="e.g. Budi Raharjo"
                                className="w-full px-3 py-2 text-xs bg-white dark:bg-[#141416] text-[#111827] dark:text-[#FFFFFF] placeholder-[#9CA3AF] dark:placeholder-[#6B7280] border border-[#D1D5DB] dark:border-[#4B5563] rounded-md focus:outline-none focus:border-[#F54E00] focus:ring-1 focus:ring-[#F54E00] transition"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#374151] dark:text-[#E5E7EB] mb-1.5">
                                Email (Untuk Notifikasi Balasan) <span className="text-[#DC2626]">*</span>
                            </label>
                            <input
                                type="email"
                                required
                                value={guestEmail}
                                onChange={(e) => setGuestEmail(e.target.value)}
                                placeholder="budi@example.com"
                                className="w-full px-3 py-2 text-xs bg-white dark:bg-[#141416] text-[#111827] dark:text-[#FFFFFF] placeholder-[#9CA3AF] dark:placeholder-[#6B7280] border border-[#D1D5DB] dark:border-[#4B5563] rounded-md focus:outline-none focus:border-[#F54E00] focus:ring-1 focus:ring-[#F54E00] transition"
                            />
                        </div>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                    <label className="flex items-center space-x-2 text-xs text-[#4B5563] dark:text-[#D1D5DB] cursor-pointer">
                        <input
                            type="checkbox"
                            checked={notifyReplies}
                            onChange={(e) => setNotifyReplies(e.target.checked)}
                            className="rounded text-[#F54E00] focus:ring-[#F54E00] h-4 w-4"
                        />
                        <span>Beri tahu saya via email jika komentar ini dibalas</span>
                    </label>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-5 py-2 text-xs font-bold text-white bg-[#F54E00] hover:bg-[#D44300] disabled:opacity-50 rounded-lg shadow-sm transition"
                    >
                        {submitting ? 'Mengirim...' : 'Kirim Komentar'}
                    </button>
                </div>
            </form>

            {/* List Komentar */}
            {loading ? (
                <div className="p-8 text-center text-xs text-[#6B7280] dark:text-[#9CA3AF] animate-pulse">Memuat diskusi...</div>
            ) : topLevelComments.length === 0 ? (
                <div className="p-8 text-center bg-white dark:bg-[#1E1F24] rounded-xl border border-dashed border-[#D1D5DB] dark:border-[#4B5563] text-[#6B7280] dark:text-[#9CA3AF] text-xs">
                    Belum ada komentar untuk artikel ini. Jadilah yang pertama berkomentar!
                </div>
            ) : (
                <div className="space-y-4">
                    {topLevelComments.map((comment) => {
                        const replies = repliesMap.get(comment.id) || []
                        const isReplying = replyingToId === comment.id

                        return (
                            <div
                                key={comment.id}
                                className="bg-white dark:bg-[#1E1F24] rounded-xl border border-[#E5E7EB] dark:border-[#374151] p-5 shadow-sm space-y-3"
                            >
                                {/* Comment Header */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-[#FEE2E2] dark:bg-[#7F1D1D] text-[#DC2626] dark:text-[#FCA5A5] font-bold text-xs flex items-center justify-center border border-[#FCA5A5] dark:border-[#991B1B]">
                                            {comment.authorName.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <span className="font-bold text-xs text-[#111827] dark:text-[#FFFFFF]">
                                                    {comment.authorName}
                                                </span>
                                                {renderCommentBadge(comment.authorType)}
                                            </div>
                                            <span className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] font-mono">
                                                {new Date(comment.createdAt).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center space-x-2">
                                        <button
                                            type="button"
                                            onClick={() => setReplyingToId(isReplying ? null : comment.id)}
                                            className="text-xs font-semibold text-[#F54E00] dark:text-[#FF7A45] hover:underline"
                                        >
                                            {isReplying ? 'Batal' : '↳ Balas'}
                                        </button>
                                        {isAdmin && (
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteComment(comment.id)}
                                                className="text-xs text-[#6B7280] hover:text-[#DC2626] ml-2"
                                                title="Hapus komentar (Admin)"
                                            >
                                                🗑️
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Comment Content */}
                                <p className="text-xs text-[#111827] dark:text-[#E5E7EB] leading-relaxed whitespace-pre-wrap pl-11">
                                    {comment.content}
                                </p>

                                {/* Inline Reply Form */}
                                {isReplying && (
                                    <div className="ml-11 mt-3 p-4 bg-[#F9FAFB] dark:bg-[#141416] border border-[#FCA5A5] dark:border-[#7F1D1D] rounded-lg space-y-3">
                                        <div className="text-xs font-bold text-[#374151] dark:text-[#E5E7EB]">
                                            Balas ke <span className="text-[#F54E00] dark:text-[#FF7A45]">{comment.authorName}</span>:
                                        </div>
                                        <textarea
                                            rows={2}
                                            value={replyContent}
                                            onChange={(e) => setReplyContent(e.target.value)}
                                            placeholder="Tulis balasan Anda di sini..."
                                            className="w-full px-3 py-2 text-xs bg-white dark:bg-[#1E1F24] text-[#111827] dark:text-[#FFFFFF] border border-[#D1D5DB] dark:border-[#4B5563] rounded-md focus:outline-none focus:border-[#F54E00] focus:ring-1 focus:ring-[#F54E00] transition"
                                        />

                                        {!isLoggedIn && (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="Nama Anda *"
                                                    value={replyGuestName}
                                                    onChange={(e) => setReplyGuestName(e.target.value)}
                                                    className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-[#1E1F24] text-[#111827] dark:text-[#FFFFFF] border border-[#D1D5DB] dark:border-[#4B5563] rounded"
                                                />
                                                <input
                                                    type="email"
                                                    placeholder="Email (untuk notifikasi) *"
                                                    value={replyGuestEmail}
                                                    onChange={(e) => setReplyGuestEmail(e.target.value)}
                                                    className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-[#1E1F24] text-[#111827] dark:text-[#FFFFFF] border border-[#D1D5DB] dark:border-[#4B5563] rounded"
                                                />
                                            </div>
                                        )}

                                        <div className="flex justify-end space-x-2 pt-1">
                                            <button
                                                type="button"
                                                onClick={() => setReplyingToId(null)}
                                                className="px-3 py-1 text-xs text-[#6B7280] hover:text-[#111827] dark:text-[#9CA3AF] dark:hover:text-[#FFFFFF]"
                                            >
                                                Batal
                                            </button>
                                            <button
                                                type="button"
                                                disabled={replySubmitting}
                                                onClick={() => handleSubmitReply(comment.id)}
                                                className="px-4 py-1 text-xs font-bold text-white bg-[#F54E00] hover:bg-[#D44300] disabled:opacity-50 rounded transition"
                                            >
                                                {replySubmitting ? 'Mengirim...' : 'Kirim Balasan'}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Threaded Replies */}
                                {replies.length > 0 && (
                                    <div className="ml-6 sm:ml-11 pt-2 space-y-3 border-l-2 border-[#FCA5A5] dark:border-[#7F1D1D] pl-4">
                                        {replies.map((reply) => (
                                            <div key={reply.id} className="space-y-1.5">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2">
                                                        <span className="font-bold text-xs text-[#111827] dark:text-[#FFFFFF]">
                                                            {reply.authorName}
                                                        </span>
                                                        {renderCommentBadge(reply.authorType)}
                                                        <span className="text-[10px] text-[#6B7280] dark:text-[#9CA3AF] font-mono">
                                                            {new Date(reply.createdAt).toLocaleDateString('id-ID', {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                            })}
                                                        </span>
                                                    </div>

                                                    {isAdmin && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeleteComment(reply.id)}
                                                            className="text-xs text-[#6B7280] hover:text-[#DC2626]"
                                                            title="Hapus balasan (Admin)"
                                                        >
                                                            🗑️
                                                        </button>
                                                    )}
                                                </div>
                                                <p className="text-xs text-[#111827] dark:text-[#E5E7EB] leading-relaxed whitespace-pre-wrap">
                                                    {reply.content}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
