import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'gatsby'
import { useLocalAuth } from '../hooks/useLocalAuth'
import SEO from '../components/seo'

interface RegisteredUser {
    id: string
    username: string
    email: string
    name: string
    role: 'admin' | 'user'
    avatar?: string
    createdAt: string
    commentCount?: number
}

export default function UsersDirectoryPage() {
    const { user: currentUser, isLoggedIn, isAdmin } = useLocalAuth()
    const [users, setUsers] = useState<RegisteredUser[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [roleFilter, setRoleFilter] = useState<'ALL' | 'admin' | 'user'>('ALL')
    const [sortBy, setSortBy] = useState<'newest' | 'comments' | 'name'>('newest')

    const loadUsers = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch('/api/auth?action=users')
            if (!res.ok) throw new Error(`HTTP error ${res.status}`)
            const data = await res.json()
            setUsers(data.users || [])
        } catch (err: any) {
            console.error('Failed to load users:', err)
            setError(err.message || 'Gagal memuat direktori pengguna')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadUsers()
    }, [])

    const filteredUsers = useMemo(() => {
        return users
            .filter((u) => {
                if (roleFilter !== 'ALL' && u.role !== roleFilter) return false
                if (searchQuery.trim()) {
                    const q = searchQuery.toLowerCase()
                    return (
                        u.name.toLowerCase().includes(q) ||
                        u.username.toLowerCase().includes(q) ||
                        u.email.toLowerCase().includes(q)
                    )
                }
                return true
            })
            .sort((a, b) => {
                if (sortBy === 'newest') {
                    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
                }
                if (sortBy === 'comments') {
                    return (b.commentCount || 0) - (a.commentCount || 0)
                }
                if (sortBy === 'name') {
                    return a.name.localeCompare(b.name)
                }
                return 0
            })
    }, [users, roleFilter, searchQuery, sortBy])

    const formatDate = (dateStr: string) => {
        if (!dateStr) return '-'
        try {
            const d = new Date(dateStr)
            return d.toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            })
        } catch {
            return dateStr
        }
    }

    return (
        <div className="min-h-screen bg-[#F4F4F0] dark:bg-[#121214] text-[#111827] dark:text-[#FFFFFF] flex flex-col justify-between p-4 sm:p-6 font-sans">
            <SEO title="Direktori Pengguna & Komunitas - PostHog" />

            <div className="max-w-6xl w-full mx-auto flex-1">
                {/* Navigation Header */}
                <div className="flex items-center justify-between pb-6 border-b border-[#E5E7EB] dark:border-[#374151]">
                    <div className="flex items-center space-x-3">
                        <Link to="/" className="flex items-center space-x-2 group">
                            <span className="text-2xl">🦔</span>
                            <span className="font-black text-lg tracking-tight text-[#111827] dark:text-[#FFFFFF] group-hover:text-[#F54E00] transition">
                                PostHog
                            </span>
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-sm font-semibold text-[#4B5563] dark:text-[#D1D5DB]">
                            Direktori Komunitas
                        </span>
                    </div>

                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <Link
                            to="/blog"
                            className="px-3 py-1.5 text-xs font-semibold rounded-md border border-[#D1D5DB] dark:border-[#4B5563] text-[#374151] dark:text-[#E5E7EB] bg-white dark:bg-[#1E1F24] hover:bg-[#F3F4F6] dark:hover:bg-[#2A2B32] transition"
                        >
                            ← Kembali ke Blog
                        </Link>

                        {isLoggedIn ? (
                            <Link
                                to="/account"
                                className="px-3 py-1.5 text-xs font-semibold rounded-md bg-[#F54E00] hover:bg-[#D44300] text-white transition flex items-center gap-1.5 shadow-sm"
                            >
                                <span>👤 Profil Saya</span>
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className="px-3 py-1.5 text-xs font-bold rounded-md bg-[#F54E00] hover:bg-[#D44300] text-white transition shadow-sm"
                            >
                                Masuk / Daftar
                            </Link>
                        )}

                        {isAdmin && (
                            <Link
                                to="/admin"
                                className="px-3 py-1.5 text-xs font-semibold rounded-md border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 hover:bg-amber-100 transition"
                            >
                                🛡️ Admin Suite
                            </Link>
                        )}
                    </div>
                </div>

                {/* Hero Title & Description */}
                <div className="py-8 text-center max-w-2xl mx-auto">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#FEF2F2] dark:bg-[#451A1A] text-[#F54E00] dark:text-[#FF7A45] border border-[#FCA5A5] dark:border-[#991B1B] mb-3">
                        👥 Direktori Anggota
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-black text-[#111827] dark:text-[#FFFFFF] tracking-tight">
                        Daftar Pengguna Terdaftar
                    </h1>
                    <p className="text-sm text-[#4B5563] dark:text-[#D1D5DB] mt-2 leading-relaxed">
                        Daftar anggota dan kontributor yang telah memiliki akun di portal PostHog. Anda dapat melihat
                        profil serta keaktifan berdiskusi di artikel.
                    </p>
                </div>

                {/* Search & Filter Toolbar */}
                <div className="p-4 rounded-xl bg-white dark:bg-[#1E1F24] border border-[#E5E7EB] dark:border-[#374151] mb-6 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="relative flex-1">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#9CA3AF] pointer-events-none">
                            🔍
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari berdasarkan nama, username, atau email..."
                            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-white dark:bg-[#141416] text-[#111827] dark:text-[#FFFFFF] placeholder-[#9CA3AF] dark:placeholder-[#6B7280] border border-[#D1D5DB] dark:border-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#F54E00]"
                        />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        {/* Role filter */}
                        <div className="flex items-center bg-[#F3F4F6] dark:bg-[#2A2B32] p-0.5 rounded-lg border border-[#E5E7EB] dark:border-[#374151] text-xs">
                            <button
                                type="button"
                                onClick={() => setRoleFilter('ALL')}
                                className={`px-3 py-1 rounded font-semibold transition ${
                                    roleFilter === 'ALL'
                                        ? 'bg-white dark:bg-[#1E1F24] text-[#111827] dark:text-[#FFFFFF] shadow-xs'
                                        : 'text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-[#FFFFFF]'
                                }`}
                            >
                                Semua ({users.length})
                            </button>
                            <button
                                type="button"
                                onClick={() => setRoleFilter('admin')}
                                className={`px-3 py-1 rounded font-semibold transition ${
                                    roleFilter === 'admin'
                                        ? 'bg-white dark:bg-[#1E1F24] text-[#F54E00] dark:text-[#FF7A45] shadow-xs'
                                        : 'text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-[#FFFFFF]'
                                }`}
                            >
                                Admin
                            </button>
                            <button
                                type="button"
                                onClick={() => setRoleFilter('user')}
                                className={`px-3 py-1 rounded font-semibold transition ${
                                    roleFilter === 'user'
                                        ? 'bg-white dark:bg-[#1E1F24] text-blue-600 dark:text-blue-400 shadow-xs'
                                        : 'text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-[#FFFFFF]'
                                }`}
                            >
                                Member
                            </button>
                        </div>

                        {/* Sort */}
                        <select
                            value={sortBy}
                            onChange={(e: any) => setSortBy(e.target.value)}
                            className="py-1.5 px-3 text-xs rounded-lg bg-white dark:bg-[#141416] text-[#111827] dark:text-[#FFFFFF] border border-[#D1D5DB] dark:border-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#F54E00]"
                        >
                            <option value="newest">Terbaru Bergabung</option>
                            <option value="comments">Terbanyak Komentar</option>
                            <option value="name">Nama (A - Z)</option>
                        </select>
                    </div>
                </div>

                {/* Grid List */}
                {loading ? (
                    <div className="p-16 text-center text-[#6B7280] dark:text-[#9CA3AF] bg-white dark:bg-[#1E1F24] rounded-xl border border-[#E5E7EB] dark:border-[#374151]">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#F54E00] border-t-transparent mb-3"></div>
                        <p className="text-xs">Memuat daftar anggota...</p>
                    </div>
                ) : error ? (
                    <div className="p-8 text-center bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-red-700 dark:text-red-300">
                        <p className="text-sm font-bold mb-1">Gagal memuat pengguna</p>
                        <p className="text-xs mb-3">{error}</p>
                        <button
                            onClick={loadUsers}
                            className="px-4 py-1.5 text-xs font-semibold rounded bg-red-600 hover:bg-red-700 text-white"
                        >
                            Coba Lagi
                        </button>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="p-16 text-center bg-white dark:bg-[#1E1F24] rounded-xl border border-[#E5E7EB] dark:border-[#374151] text-[#6B7280] dark:text-[#9CA3AF]">
                        <p className="text-base font-bold text-[#111827] dark:text-[#FFFFFF] mb-1">
                            Tidak ada anggota ditemukan
                        </p>
                        <p className="text-xs">
                            {searchQuery ? `Tidak ada hasil pencarian untuk "${searchQuery}"` : 'Belum ada akun terdaftar.'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                        {filteredUsers.map((u) => {
                            const isSelf = currentUser?.id === u.id
                            const isAdminRole = u.role === 'admin'

                            return (
                                <div
                                    key={u.id}
                                    className="p-5 rounded-xl bg-white dark:bg-[#1E1F24] border border-[#E5E7EB] dark:border-[#374151] hover:border-[#F54E00] dark:hover:border-[#FF7A45] transition shadow-xs flex flex-col justify-between"
                                >
                                    <div>
                                        {/* User Header */}
                                        <div className="flex items-start justify-between gap-3 mb-3">
                                            <div className="flex items-center gap-3">
                                                {u.avatar ? (
                                                    <img
                                                        src={u.avatar}
                                                        alt={u.name}
                                                        className="w-12 h-12 rounded-full object-cover border-2 border-[#E5E7EB] dark:border-[#4B5563]"
                                                    />
                                                ) : (
                                                    <div
                                                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base text-white shadow-xs ${
                                                            isAdminRole
                                                                ? 'bg-gradient-to-tr from-[#F54E00] to-[#FF8A00]'
                                                                : 'bg-gradient-to-tr from-blue-600 to-indigo-600'
                                                        }`}
                                                    >
                                                        {u.name
                                                            ? u.name.charAt(0).toUpperCase()
                                                            : u.username.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-bold text-sm text-[#111827] dark:text-[#FFFFFF] flex items-center gap-1.5">
                                                        <span>{u.name}</span>
                                                        {isSelf && (
                                                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                                                                Anda
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-mono">
                                                        @{u.username}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Badge Role */}
                                            {isAdminRole ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF2F2] dark:bg-[#451A1A] text-[#F54E00] dark:text-[#FF7A45] border border-[#FCA5A5] dark:border-[#991B1B]">
                                                    🛡️ Admin
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                                                    👤 Member
                                                </span>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div className="text-xs text-[#4B5563] dark:text-[#D1D5DB] font-mono truncate mb-3">
                                            📧 {u.email}
                                        </div>
                                    </div>

                                    {/* Stats Footer */}
                                    <div className="pt-3 border-t border-[#E5E7EB] dark:border-[#374151] flex items-center justify-between text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                                        <div>
                                            Bergabung:{' '}
                                            <strong className="text-[#374151] dark:text-[#E5E7EB]">
                                                {formatDate(u.createdAt)}
                                            </strong>
                                        </div>
                                        <div className="flex items-center gap-1 font-semibold text-[#111827] dark:text-[#FFFFFF]">
                                            <span>💬</span>
                                            <span>{u.commentCount || 0} komentar</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="max-w-6xl w-full mx-auto pt-6 border-t border-[#E5E7EB] dark:border-[#374151] text-center text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                PostHog Community Members • Offline Data Local Storage
            </div>
        </div>
    )
}
