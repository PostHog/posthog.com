import React, { useState, useEffect } from 'react'
import { Link, navigate } from 'gatsby'
import { useLocalAuth } from '../hooks/useLocalAuth'
import SEO from '../components/seo'

interface CommentItem {
    id: string
    postSlug: string
    content: string
    createdAt: string
    authorName: string
    authorEmail: string
    authorType: string
}

export default function AccountPage() {
    const { user, isLoggedIn, isAdmin, logout, loading } = useLocalAuth()
    const [myComments, setMyComments] = useState<CommentItem[]>([])
    const [loadingComments, setLoadingComments] = useState(false)

    useEffect(() => {
        if (!loading && !isLoggedIn) {
            navigate('/login?redirect=/account')
        }
    }, [loading, isLoggedIn])

    // Load comments written by this user
    useEffect(() => {
        if (!user) return
        setLoadingComments(true)
        fetch('/api/comments?action=all')
            .then((r) => r.json())
            .then((data) => {
                const all: CommentItem[] = data.comments || []
                const mine = all.filter(
                    (c) =>
                        c.authorEmail.toLowerCase() === user.email.toLowerCase() ||
                        (c as any).userId === user.id ||
                        c.authorName.toLowerCase() === user.name.toLowerCase()
                )
                setMyComments(mine)
            })
            .catch((e) => console.error('Error fetching comments:', e))
            .finally(() => setLoadingComments(false))
    }, [user])

    if (loading || !user) {
        return (
            <div className="min-h-screen bg-[#F3F4F6] dark:bg-[#121214] flex items-center justify-center p-4">
                <div className="text-gray-500 animate-pulse text-sm">Memuat profil akun...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#F4F4F0] dark:bg-[#121214] text-[#111827] dark:text-[#FFFFFF] flex flex-col justify-between p-4 sm:p-6 font-sans">
            <SEO title={`Profil Akun: ${user.name} - PostHog`} />

            {/* Header */}
            <div className="max-w-4xl w-full mx-auto flex items-center justify-between pb-6 border-b border-[#E5E7EB] dark:border-[#374151]">
                <Link to="/" className="flex items-center space-x-2 text-[#F54E00] font-extrabold text-xl tracking-tight">
                    <span className="text-2xl">🦔</span>
                    <span className="text-[#111827] dark:text-[#FFFFFF]">PostHog</span>
                </Link>

                <div className="flex items-center space-x-3 text-xs">
                    <Link
                        to="/blog"
                        className="px-3 py-1.5 bg-white dark:bg-[#2A2B32] hover:bg-[#F3F4F6] dark:hover:bg-[#34353E] text-[#111827] dark:text-[#FFFFFF] rounded-md border border-[#D1D5DB] dark:border-[#4B5563] font-medium transition"
                    >
                        Lihat Blog
                    </Link>
                    {isAdmin && (
                        <Link
                            to="/admin"
                            className="px-3 py-1.5 bg-[#F54E00] hover:bg-[#D44300] text-white rounded-md font-bold transition shadow-sm"
                        >
                            Admin Suite &rarr;
                        </Link>
                    )}
                    <button
                        onClick={() => {
                            logout()
                            navigate('/login')
                        }}
                        className="px-3 py-1.5 text-[#DC2626] dark:text-[#F87171] hover:underline font-semibold"
                    >
                        Keluar (Logout)
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-4xl w-full mx-auto my-8 space-y-6">
                {/* Profile Banner */}
                <div className="bg-white dark:bg-[#1E1F24] rounded-xl border border-[#E5E7EB] dark:border-[#374151] shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
                    <div className="w-20 h-20 rounded-full bg-[#FEE2E2] dark:bg-[#7F1D1D] text-[#DC2626] dark:text-[#FCA5A5] flex items-center justify-center font-bold text-3xl border border-[#FCA5A5] dark:border-[#991B1B] shrink-0">
                        {user.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                            <h1 className="text-2xl font-bold text-[#111827] dark:text-[#FFFFFF] truncate">{user.name}</h1>
                            <span
                                className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider self-center sm:self-auto ${
                                    user.role === 'admin'
                                        ? 'bg-[#FEE2E2] text-[#B91C1C] dark:bg-[#7F1D1D] dark:text-[#FCA5A5]'
                                        : 'bg-[#DBEAFE] text-[#1D4ED8] dark:bg-[#1E3A8A] dark:text-[#BFDBFE]'
                                }`}
                            >
                                {user.role === 'admin' ? '🛡️ Administrator' : '👤 Komunitas User'}
                            </span>
                        </div>
                        <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-mono mt-1">
                            Username: @{user.username} &bull; Email: {user.email}
                        </p>
                        <p className="text-xs text-[#4B5563] dark:text-[#D1D5DB] mt-3 leading-relaxed">
                            {user.role === 'admin'
                                ? 'Sebagai Administrator, Anda memiliki hak penuh untuk mengelola artikel blog, laman mandiri, menu navigasi, dan seluruh komentar lokal.'
                                : 'Sebagai pengguna terdaftar, profil Anda otomatis digunakan saat menulis komentar di artikel blog tanpa perlu mengisi nama dan email ulang.'}
                        </p>
                    </div>
                </div>

                {/* Account Details & Activity */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Information Card */}
                    <div className="bg-white dark:bg-[#1E1F24] rounded-xl border border-[#E5E7EB] dark:border-[#374151] p-6 shadow-sm space-y-4">
                        <h2 className="text-sm font-bold text-[#111827] dark:text-[#FFFFFF] uppercase tracking-wider">
                            Informasi Akun
                        </h2>
                        <div className="space-y-3 text-xs">
                            <div>
                                <span className="text-[#6B7280] dark:text-[#9CA3AF] block text-[11px]">Nama Tampilan:</span>
                                <span className="font-semibold text-[#111827] dark:text-[#FFFFFF]">{user.name}</span>
                            </div>
                            <div>
                                <span className="text-[#6B7280] dark:text-[#9CA3AF] block text-[11px]">Username:</span>
                                <span className="font-mono text-[#111827] dark:text-[#FFFFFF]">@{user.username}</span>
                            </div>
                            <div>
                                <span className="text-[#6B7280] dark:text-[#9CA3AF] block text-[11px]">Alamat Email:</span>
                                <span className="text-[#111827] dark:text-[#FFFFFF]">{user.email}</span>
                            </div>
                            <div>
                                <span className="text-[#6B7280] dark:text-[#9CA3AF] block text-[11px]">Hak Akses (Role):</span>
                                <span className="font-semibold text-[#111827] dark:text-[#FFFFFF] capitalize">
                                    {user.role}
                                </span>
                            </div>
                        </div>

                        <div className="pt-2 border-t border-[#E5E7EB] dark:border-[#374151] space-y-2">
                            <Link
                                to="/users"
                                className="block text-center py-2 px-3 text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] bg-white dark:bg-[#2A2B32] border border-[#D1D5DB] dark:border-[#4B5563] hover:bg-[#F3F4F6] dark:hover:bg-[#34353E] rounded-lg transition"
                            >
                                👥 Direktori Pengguna &rarr;
                            </Link>
                            <Link
                                to="/blog"
                                className="block text-center py-2 px-3 text-xs font-bold text-white bg-[#F54E00] hover:bg-[#D44300] rounded-lg transition shadow-sm"
                            >
                                Jelajahi Artikel Blog &rarr;
                            </Link>
                        </div>
                    </div>

                    {/* Comments Activity */}
                    <div className="md:col-span-2 bg-white dark:bg-[#1E1F24] rounded-xl border border-[#E5E7EB] dark:border-[#374151] p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-bold text-[#111827] dark:text-[#FFFFFF] uppercase tracking-wider flex items-center gap-2">
                                <span>💬</span> Komentar Saya ({myComments.length})
                            </h2>
                            <span className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">Diskusi yang Anda ikuti</span>
                        </div>

                        {loadingComments ? (
                            <div className="p-8 text-center text-xs text-[#6B7280] dark:text-[#9CA3AF]">Memuat riwayat komentar...</div>
                        ) : myComments.length === 0 ? (
                            <div className="p-8 text-center border border-dashed border-[#D1D5DB] dark:border-[#4B5563] rounded-lg">
                                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                                    Anda belum menulis komentar di artikel blog manapun.
                                </p>
                                <Link
                                    to="/blog"
                                    className="mt-2 inline-block text-xs font-semibold text-[#F54E00] dark:text-[#FF7A45] hover:underline"
                                >
                                    Buka blog dan mulai berdiskusi &rarr;
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                                {myComments.map((cmt) => (
                                    <div
                                        key={cmt.id}
                                        className="p-3.5 rounded-lg border border-[#E5E7EB] dark:border-[#374151] bg-[#F9FAFB] dark:bg-[#141416] text-xs space-y-1.5"
                                    >
                                        <div className="flex items-center justify-between text-[11px]">
                                            <Link
                                                to={`/blog/${cmt.postSlug}`}
                                                className="font-bold text-[#F54E00] dark:text-[#FF7A45] hover:underline truncate max-w-xs"
                                            >
                                                /blog/{cmt.postSlug} &nearr;
                                            </Link>
                                            <span className="text-[#6B7280] dark:text-[#9CA3AF] font-mono">
                                                {new Date(cmt.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-[#111827] dark:text-[#E5E7EB] whitespace-pre-wrap">
                                            {cmt.content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="max-w-4xl w-full mx-auto text-center pt-6 text-xs text-[#6B7280] dark:text-[#9CA3AF] border-t border-[#E5E7EB] dark:border-[#374151]">
                PostHog User Portal &bull; Sistem Akun &amp; Komentar Lokal
            </div>
        </div>
    )
}
