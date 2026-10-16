import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'gatsby'
import { useLocalAuth, LocalUser } from '../../hooks/useLocalAuth'

export interface RegisteredUser {
    id: string
    username: string
    email: string
    name: string
    role: 'admin' | 'user'
    avatar?: string
    createdAt: string
    commentCount?: number
}

export default function UsersEditor() {
    const { user: currentAuthUser } = useLocalAuth()
    const [users, setUsers] = useState<RegisteredUser[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

    // Filter, Search & Sort
    const [searchQuery, setSearchQuery] = useState('')
    const [roleFilter, setRoleFilter] = useState<'ALL' | 'admin' | 'user'>('ALL')
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'comments' | 'name'>('newest')

    // Modals
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [editTarget, setEditTarget] = useState<RegisteredUser | null>(null)
    const [resetPwdTarget, setResetPwdTarget] = useState<RegisteredUser | null>(null)
    const [deleteTarget, setDeleteTarget] = useState<RegisteredUser | null>(null)

    // Form states
    const [createForm, setCreateForm] = useState({
        username: '',
        email: '',
        name: '',
        password: '',
        role: 'user' as 'admin' | 'user',
        avatar: '',
    })

    const [editForm, setEditForm] = useState({
        name: '',
        email: '',
        role: 'user' as 'admin' | 'user',
        avatar: '',
    })

    const [newPassword, setNewPassword] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [copiedEmail, setCopiedEmail] = useState<string | null>(null)

    const showToast = (text: string, type: 'success' | 'error' = 'success') => {
        setStatusMsg({ text, type })
        setTimeout(() => setStatusMsg(null), 4500)
    }

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
            setError(err.message || 'Gagal memuat daftar pengguna')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadUsers()
    }, [])

    // Copy email helper
    const handleCopyEmail = (email: string) => {
        navigator.clipboard?.writeText(email)
        setCopiedEmail(email)
        setTimeout(() => setCopiedEmail(null), 2000)
    }

    // Stats calculations
    const stats = useMemo(() => {
        const total = users.length
        const admins = users.filter((u) => u.role === 'admin').length
        const regularUsers = total - admins
        const activeWithComments = users.filter((u) => (u.commentCount || 0) > 0).length
        return { total, admins, regularUsers, activeWithComments }
    }, [users])

    // Filter & sort users
    const filteredUsers = useMemo(() => {
        return users
            .filter((u) => {
                if (roleFilter !== 'ALL' && u.role !== roleFilter) return false
                if (searchQuery.trim()) {
                    const q = searchQuery.toLowerCase()
                    const matchName = u.name.toLowerCase().includes(q)
                    const matchUser = u.username.toLowerCase().includes(q)
                    const matchEmail = u.email.toLowerCase().includes(q)
                    return matchName || matchUser || matchEmail
                }
                return true
            })
            .sort((a, b) => {
                if (sortBy === 'newest') {
                    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
                }
                if (sortBy === 'oldest') {
                    return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
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

    // Format date in Indonesian
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

    // Create user handler
    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!createForm.username || !createForm.email || !createForm.name || !createForm.password) {
            showToast('Semua kolom bertanda * wajib diisi.', 'error')
            return
        }

        setSubmitting(true)
        try {
            const res = await fetch('/api/auth?action=create_user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(createForm),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Gagal menambahkan pengguna')

            showToast(`Pengguna @${createForm.username} berhasil didaftarkan!`, 'success')
            setShowCreateModal(false)
            setCreateForm({
                username: '',
                email: '',
                name: '',
                password: '',
                role: 'user',
                avatar: '',
            })
            loadUsers()
        } catch (err: any) {
            showToast(err.message, 'error')
        } finally {
            setSubmitting(false)
        }
    }

    // Quick Toggle Role
    const handleToggleRole = async (targetUser: RegisteredUser) => {
        const nextRole = targetUser.role === 'admin' ? 'user' : 'admin'
        const confirmMsg =
            nextRole === 'admin'
                ? `Jadikan @${targetUser.username} sebagai Administrator dengan akses penuh?`
                : `Turunkan @${targetUser.username} menjadi Member biasa?`

        if (!window.confirm(confirmMsg)) return

        try {
            const res = await fetch('/api/auth?action=update_user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: targetUser.id,
                    role: nextRole,
                }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Gagal memperbarui role')

            showToast(`Role @${targetUser.username} diubah menjadi ${nextRole.toUpperCase()}`, 'success')
            loadUsers()
        } catch (err: any) {
            showToast(err.message, 'error')
        }
    }

    // Save Edit Profile Modal
    const handleSaveEdit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!editTarget) return

        setSubmitting(true)
        try {
            const res = await fetch('/api/auth?action=update_user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: editTarget.id,
                    name: editForm.name,
                    email: editForm.email,
                    role: editForm.role,
                    avatar: editForm.avatar,
                }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Gagal memperbarui data pengguna')

            showToast(`Data pengguna @${editTarget.username} berhasil disimpan!`, 'success')
            setEditTarget(null)
            loadUsers()
        } catch (err: any) {
            showToast(err.message, 'error')
        } finally {
            setSubmitting(false)
        }
    }

    // Reset Password Handler
    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!resetPwdTarget || !newPassword) return

        setSubmitting(true)
        try {
            const res = await fetch('/api/auth?action=reset_password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: resetPwdTarget.id,
                    newPassword: newPassword.trim(),
                }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Gagal mereset password')

            showToast(`Password untuk @${resetPwdTarget.username} berhasil diperbarui!`, 'success')
            setResetPwdTarget(null)
            setNewPassword('')
        } catch (err: any) {
            showToast(err.message, 'error')
        } finally {
            setSubmitting(false)
        }
    }

    // Delete User Handler
    const handleDeleteUser = async () => {
        if (!deleteTarget) return

        setSubmitting(true)
        try {
            const res = await fetch('/api/auth?action=delete_user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: deleteTarget.id }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Gagal menghapus pengguna')

            showToast(`Pengguna @${deleteTarget.username} berhasil dihapus.`, 'success')
            setDeleteTarget(null)
            loadUsers()
        } catch (err: any) {
            showToast(err.message, 'error')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="space-y-6">
            {/* Notification Toast */}
            {statusMsg && (
                <div
                    className={`p-4 rounded-lg text-sm font-semibold border flex items-center justify-between shadow-md transition-all ${
                        statusMsg.type === 'success'
                            ? 'bg-[#ECFDF5] dark:bg-[#064E3B] border-[#A7F3D0] dark:border-[#047857] text-[#065F46] dark:text-[#A7F3D0]'
                            : 'bg-[#FEF2F2] dark:bg-[#451A1A] border-[#FCA5A5] dark:border-[#991B1B] text-[#991B1B] dark:text-[#FCA5A5]'
                    }`}
                >
                    <span>{statusMsg.text}</span>
                    <button
                        type="button"
                        onClick={() => setStatusMsg(null)}
                        className="text-xs opacity-70 hover:opacity-100 font-bold px-2 py-0.5 ml-4"
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* Header & Stats Overview */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#E5E7EB] dark:border-[#374151]">
                <div>
                    <h2 className="text-xl font-bold text-[#111827] dark:text-[#FFFFFF] flex items-center gap-2">
                        <span>👥 Daftar Pengguna &amp; Akun Terdaftar</span>
                    </h2>
                    <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                        Kelola akun pengguna, hak akses administrator, reset kata sandi, dan statistik komentar aktif.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Link
                        to="/users"
                        target="_blank"
                        className="px-3 py-1.5 text-xs font-semibold rounded-md border border-[#D1D5DB] dark:border-[#4B5563] text-[#374151] dark:text-[#E5E7EB] bg-white dark:bg-[#2A2B32] hover:bg-[#F3F4F6] dark:hover:bg-[#34353E] transition flex items-center gap-1.5"
                    >
                        <span>Direktori Publik</span>
                        <span>↗</span>
                    </Link>
                    <button
                        type="button"
                        onClick={() => setShowCreateModal(true)}
                        className="px-3.5 py-1.5 text-xs font-bold rounded-md bg-[#F54E00] hover:bg-[#D44300] text-white transition flex items-center gap-1.5 shadow-sm"
                    >
                        <span>➕ Tambah Pengguna</span>
                    </button>
                </div>
            </div>

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-white dark:bg-[#1E1F24] border border-[#E5E7EB] dark:border-[#374151] shadow-xs">
                    <div className="text-xs font-medium text-[#6B7280] dark:text-[#9CA3AF]">Total Terdaftar</div>
                    <div className="text-2xl font-black text-[#111827] dark:text-[#FFFFFF] mt-1">{stats.total}</div>
                    <div className="text-[11px] text-[#4B5563] dark:text-[#D1D5DB] mt-0.5">Semua akun di database</div>
                </div>

                <div className="p-4 rounded-lg bg-white dark:bg-[#1E1F24] border border-[#E5E7EB] dark:border-[#374151] shadow-xs">
                    <div className="text-xs font-medium text-[#F54E00] dark:text-[#FF7A45] flex items-center gap-1">
                        <span>🛡️ Administrator</span>
                    </div>
                    <div className="text-2xl font-black text-[#F54E00] dark:text-[#FF7A45] mt-1">{stats.admins}</div>
                    <div className="text-[11px] text-[#4B5563] dark:text-[#D1D5DB] mt-0.5">Akses penuh admin suite</div>
                </div>

                <div className="p-4 rounded-lg bg-white dark:bg-[#1E1F24] border border-[#E5E7EB] dark:border-[#374151] shadow-xs">
                    <div className="text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1">
                        <span>👤 Member Komunitas</span>
                    </div>
                    <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">{stats.regularUsers}</div>
                    <div className="text-[11px] text-[#4B5563] dark:text-[#D1D5DB] mt-0.5">Akses komentar &amp; akun</div>
                </div>

                <div className="p-4 rounded-lg bg-white dark:bg-[#1E1F24] border border-[#E5E7EB] dark:border-[#374151] shadow-xs">
                    <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <span>💬 Aktif Berdiskusi</span>
                    </div>
                    <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                        {stats.activeWithComments}
                    </div>
                    <div className="text-[11px] text-[#4B5563] dark:text-[#D1D5DB] mt-0.5">Pernah mengirim komentar</div>
                </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-4 rounded-lg bg-white dark:bg-[#1E1F24] border border-[#E5E7EB] dark:border-[#374151] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
                {/* Search */}
                <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#9CA3AF] pointer-events-none">
                        🔍
                    </span>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari berdasarkan nama, @username, atau email..."
                        className="w-full pl-9 pr-4 py-2 text-xs rounded-md bg-white dark:bg-[#141416] text-[#111827] dark:text-[#FFFFFF] placeholder-[#9CA3AF] dark:placeholder-[#6B7280] border border-[#D1D5DB] dark:border-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#F54E00]"
                    />
                </div>

                {/* Filter & Sort Controls */}
                <div className="flex items-center gap-2 flex-wrap">
                    {/* Role Filter */}
                    <div className="flex items-center bg-[#F3F4F6] dark:bg-[#2A2B32] p-0.5 rounded-md border border-[#E5E7EB] dark:border-[#374151] text-xs">
                        <button
                            type="button"
                            onClick={() => setRoleFilter('ALL')}
                            className={`px-2.5 py-1 rounded font-semibold transition ${
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
                            className={`px-2.5 py-1 rounded font-semibold transition ${
                                roleFilter === 'admin'
                                    ? 'bg-white dark:bg-[#1E1F24] text-[#F54E00] dark:text-[#FF7A45] shadow-xs'
                                    : 'text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-[#FFFFFF]'
                            }`}
                        >
                            Admin ({stats.admins})
                        </button>
                        <button
                            type="button"
                            onClick={() => setRoleFilter('user')}
                            className={`px-2.5 py-1 rounded font-semibold transition ${
                                roleFilter === 'user'
                                    ? 'bg-white dark:bg-[#1E1F24] text-blue-600 dark:text-blue-400 shadow-xs'
                                    : 'text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-[#FFFFFF]'
                            }`}
                        >
                            Member ({stats.regularUsers})
                        </button>
                    </div>

                    {/* Sort Dropdown */}
                    <select
                        value={sortBy}
                        onChange={(e: any) => setSortBy(e.target.value)}
                        className="py-1.5 px-3 text-xs rounded-md bg-white dark:bg-[#141416] text-[#111827] dark:text-[#FFFFFF] border border-[#D1D5DB] dark:border-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#F54E00]"
                    >
                        <option value="newest">📅 Terbaru Terdaftar</option>
                        <option value="oldest">📅 Terlama Terdaftar</option>
                        <option value="comments">💬 Terbanyak Komentar</option>
                        <option value="name">🔤 Nama (A - Z)</option>
                    </select>

                    {/* Refresh */}
                    <button
                        type="button"
                        onClick={loadUsers}
                        title="Segarkan data pengguna"
                        className="px-2.5 py-1.5 text-xs rounded-md border border-[#D1D5DB] dark:border-[#4B5563] bg-white dark:bg-[#2A2B32] text-[#374151] dark:text-[#E5E7EB] hover:bg-[#F3F4F6] dark:hover:bg-[#34353E] transition"
                    >
                        🔄
                    </button>
                </div>
            </div>

            {/* Users Table / List */}
            {loading ? (
                <div className="p-12 text-center text-[#6B7280] dark:text-[#9CA3AF] bg-white dark:bg-[#1E1F24] rounded-lg border border-[#E5E7EB] dark:border-[#374151]">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#F54E00] border-t-transparent mb-3"></div>
                    <p className="text-xs">Memuat data pengguna terdaftar...</p>
                </div>
            ) : error ? (
                <div className="p-8 text-center bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-lg text-red-700 dark:text-red-300">
                    <p className="text-sm font-semibold mb-2">Terjadi kesalahan</p>
                    <p className="text-xs mb-4">{error}</p>
                    <button
                        onClick={loadUsers}
                        className="px-4 py-1.5 text-xs font-semibold rounded bg-red-600 hover:bg-red-700 text-white"
                    >
                        Coba Lagi
                    </button>
                </div>
            ) : filteredUsers.length === 0 ? (
                <div className="p-12 text-center bg-white dark:bg-[#1E1F24] rounded-lg border border-[#E5E7EB] dark:border-[#374151] text-[#6B7280] dark:text-[#9CA3AF]">
                    <p className="text-base font-semibold text-[#111827] dark:text-[#FFFFFF] mb-1">
                        Tidak ada pengguna ditemukan
                    </p>
                    <p className="text-xs mb-4">
                        {searchQuery ? `Tidak ada hasil pencarian untuk "${searchQuery}"` : 'Belum ada pengguna terdaftar.'}
                    </p>
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="px-3 py-1.5 text-xs rounded border border-[#D1D5DB] dark:border-[#4B5563] text-[#374151] dark:text-[#E5E7EB] hover:bg-[#F3F4F6] dark:hover:bg-[#2A2B32]"
                        >
                            Reset Pencarian
                        </button>
                    )}
                </div>
            ) : (
                <div className="bg-white dark:bg-[#1E1F24] rounded-lg border border-[#E5E7EB] dark:border-[#374151] overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[#E5E7EB] dark:border-[#374151] bg-[#F9FAFB] dark:bg-[#17181C] text-[11px] font-bold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wider">
                                    <th className="py-3 px-4">Pengguna</th>
                                    <th className="py-3 px-4">Role / Hak Akses</th>
                                    <th className="py-3 px-4">Kontak Email</th>
                                    <th className="py-3 px-4 text-center">Komentar</th>
                                    <th className="py-3 px-4">Bergabung</th>
                                    <th className="py-3 px-4 text-right">Tindakan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E5E7EB] dark:divide-[#374151] text-xs">
                                {filteredUsers.map((u) => {
                                    const isSelf = currentAuthUser?.id === u.id
                                    const isAdminRole = u.role === 'admin'

                                    return (
                                        <tr
                                            key={u.id}
                                            className="hover:bg-[#F9FAFB] dark:hover:bg-[#23242A] transition-colors"
                                        >
                                            {/* Pengguna (Avatar, Nama, Username) */}
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    {u.avatar ? (
                                                        <img
                                                            src={u.avatar}
                                                            alt={u.name}
                                                            className="w-9 h-9 rounded-full object-cover border border-[#D1D5DB] dark:border-[#4B5563]"
                                                        />
                                                    ) : (
                                                        <div
                                                            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white ${
                                                                isAdminRole
                                                                    ? 'bg-gradient-to-tr from-[#F54E00] to-[#FF8A00]'
                                                                    : 'bg-gradient-to-tr from-blue-600 to-indigo-600'
                                                            }`}
                                                        >
                                                            {u.name ? u.name.charAt(0).toUpperCase() : u.username.charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className="font-bold text-[#111827] dark:text-[#FFFFFF] flex items-center gap-1.5">
                                                            <span>{u.name}</span>
                                                            {isSelf && (
                                                                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                                                                    Anda
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] font-mono">
                                                            @{u.username}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Role */}
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    {isAdminRole ? (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FEF2F2] dark:bg-[#451A1A] text-[#F54E00] dark:text-[#FF7A45] border border-[#FCA5A5] dark:border-[#991B1B]">
                                                            <span>🛡️</span>
                                                            <span>Administrator</span>
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                                                            <span>👤</span>
                                                            <span>Member</span>
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Email */}
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-1.5 text-[#374151] dark:text-[#E5E7EB]">
                                                    <span className="font-mono text-[11px]">{u.email}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleCopyEmail(u.email)}
                                                        title="Salin email"
                                                        className="text-[10px] p-1 rounded hover:bg-[#E5E7EB] dark:hover:bg-[#374151] text-[#6B7280] dark:text-[#9CA3AF] transition"
                                                    >
                                                        {copiedEmail === u.email ? '✓' : '📋'}
                                                    </button>
                                                </div>
                                            </td>

                                            {/* Komentar */}
                                            <td className="py-3 px-4 text-center">
                                                <span
                                                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                                                        (u.commentCount || 0) > 0
                                                            ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold'
                                                            : 'text-[#9CA3AF] dark:text-[#6B7280]'
                                                    }`}
                                                >
                                                    <span>💬</span>
                                                    <span>{u.commentCount || 0}</span>
                                                </span>
                                            </td>

                                            {/* Bergabung */}
                                            <td className="py-3 px-4 text-[#4B5563] dark:text-[#D1D5DB] text-[11px]">
                                                {formatDate(u.createdAt)}
                                            </td>

                                            {/* Tindakan */}
                                            <td className="py-3 px-4 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    {/* Toggle Role Button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggleRole(u)}
                                                        title={
                                                            isAdminRole
                                                                ? 'Ubah hak akses menjadi Member'
                                                                : 'Tingkatkan hak akses menjadi Administrator'
                                                        }
                                                        className="px-2 py-1 text-[11px] font-medium rounded border border-[#D1D5DB] dark:border-[#4B5563] bg-white dark:bg-[#2A2B32] text-[#374151] dark:text-[#E5E7EB] hover:bg-[#F3F4F6] dark:hover:bg-[#34353E] transition"
                                                    >
                                                        {isAdminRole ? 'Turunkan ke Member' : 'Jadikan Admin'}
                                                    </button>

                                                    {/* Edit Button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setEditTarget(u)
                                                            setEditForm({
                                                                name: u.name,
                                                                email: u.email,
                                                                role: u.role,
                                                                avatar: u.avatar || '',
                                                            })
                                                        }}
                                                        title="Edit profil pengguna"
                                                        className="px-2 py-1 text-[11px] font-medium rounded border border-[#D1D5DB] dark:border-[#4B5563] bg-white dark:bg-[#2A2B32] text-[#374151] dark:text-[#E5E7EB] hover:bg-[#F3F4F6] dark:hover:bg-[#34353E] transition"
                                                    >
                                                        ✏️ Edit
                                                    </button>

                                                    {/* Reset Password Button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setResetPwdTarget(u)
                                                            setNewPassword('')
                                                        }}
                                                        title="Reset Password"
                                                        className="px-2 py-1 text-[11px] font-medium rounded border border-[#D1D5DB] dark:border-[#4B5563] bg-white dark:bg-[#2A2B32] text-[#374151] dark:text-[#E5E7EB] hover:bg-[#F3F4F6] dark:hover:bg-[#34353E] transition"
                                                    >
                                                        🔑 Reset
                                                    </button>

                                                    {/* Delete Button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => setDeleteTarget(u)}
                                                        title={
                                                            isSelf
                                                                ? 'Anda sedang masuk dengan akun ini'
                                                                : 'Hapus pengguna ini'
                                                        }
                                                        className="px-2 py-1 text-[11px] font-medium rounded border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/60 transition"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* MODAL 1: Tambah Pengguna Baru */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                    <div className="w-full max-w-md bg-white dark:bg-[#1E1F24] rounded-xl border border-[#E5E7EB] dark:border-[#374151] shadow-2xl p-6 text-[#111827] dark:text-[#FFFFFF] animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] dark:border-[#374151]">
                            <h3 className="text-base font-bold flex items-center gap-2">
                                <span>➕ Tambah Pengguna Baru</span>
                            </h3>
                            <button
                                type="button"
                                onClick={() => setShowCreateModal(false)}
                                className="text-xs p-1 text-[#6B7280] hover:text-black dark:text-[#9CA3AF] dark:hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleCreateUser} className="mt-4 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] mb-1">
                                    Username <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={createForm.username}
                                    onChange={(e) =>
                                        setCreateForm({
                                            ...createForm,
                                            username: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''),
                                        })
                                    }
                                    placeholder="contoh: joko_dev"
                                    className="w-full px-3 py-2 text-xs rounded-md bg-white dark:bg-[#141416] text-[#111827] dark:text-[#FFFFFF] border border-[#D1D5DB] dark:border-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#F54E00]"
                                />
                                <span className="text-[10px] text-[#6B7280] dark:text-[#9CA3AF]">
                                    Hanya huruf kecil, angka, dan strip/underscore
                                </span>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] mb-1">
                                    Nama Lengkap <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={createForm.name}
                                    onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                                    placeholder="contoh: Joko Prasetyo"
                                    className="w-full px-3 py-2 text-xs rounded-md bg-white dark:bg-[#141416] text-[#111827] dark:text-[#FFFFFF] border border-[#D1D5DB] dark:border-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#F54E00]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] mb-1">
                                    Alamat Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={createForm.email}
                                    onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                                    placeholder="contoh: joko@example.com"
                                    className="w-full px-3 py-2 text-xs rounded-md bg-white dark:bg-[#141416] text-[#111827] dark:text-[#FFFFFF] border border-[#D1D5DB] dark:border-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#F54E00]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] mb-1">
                                    Password Awal <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={createForm.password}
                                    onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                                    placeholder="Minimal 4 karakter"
                                    className="w-full px-3 py-2 text-xs rounded-md bg-white dark:bg-[#141416] text-[#111827] dark:text-[#FFFFFF] border border-[#D1D5DB] dark:border-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#F54E00]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] mb-1">
                                        Role / Hak Akses
                                    </label>
                                    <select
                                        value={createForm.role}
                                        onChange={(e: any) => setCreateForm({ ...createForm, role: e.target.value })}
                                        className="w-full px-3 py-2 text-xs rounded-md bg-white dark:bg-[#141416] text-[#111827] dark:text-[#FFFFFF] border border-[#D1D5DB] dark:border-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#F54E00]"
                                    >
                                        <option value="user">👤 Member Biasa</option>
                                        <option value="admin">🛡️ Administrator</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] mb-1">
                                        Avatar URL (Opsional)
                                    </label>
                                    <input
                                        type="url"
                                        value={createForm.avatar}
                                        onChange={(e) => setCreateForm({ ...createForm, avatar: e.target.value })}
                                        placeholder="https://..."
                                        className="w-full px-3 py-2 text-xs rounded-md bg-white dark:bg-[#141416] text-[#111827] dark:text-[#FFFFFF] border border-[#D1D5DB] dark:border-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#F54E00]"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5E7EB] dark:border-[#374151]">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2 text-xs font-semibold rounded-md border border-[#D1D5DB] dark:border-[#4B5563] text-[#374151] dark:text-[#E5E7EB] hover:bg-[#F3F4F6] dark:hover:bg-[#2A2B32]"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-5 py-2 text-xs font-bold rounded-md bg-[#F54E00] hover:bg-[#D44300] text-white disabled:opacity-50 transition shadow-sm"
                                >
                                    {submitting ? 'Menyimpan...' : 'Simpan Pengguna'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL 2: Edit Profil Pengguna */}
            {editTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                    <div className="w-full max-w-md bg-white dark:bg-[#1E1F24] rounded-xl border border-[#E5E7EB] dark:border-[#374151] shadow-2xl p-6 text-[#111827] dark:text-[#FFFFFF]">
                        <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] dark:border-[#374151]">
                            <h3 className="text-base font-bold flex items-center gap-2">
                                <span>✏️ Edit Pengguna: @{editTarget.username}</span>
                            </h3>
                            <button
                                type="button"
                                onClick={() => setEditTarget(null)}
                                className="text-xs p-1 text-[#6B7280] hover:text-black dark:text-[#9CA3AF] dark:hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSaveEdit} className="mt-4 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] mb-1">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                    className="w-full px-3 py-2 text-xs rounded-md bg-white dark:bg-[#141416] text-[#111827] dark:text-[#FFFFFF] border border-[#D1D5DB] dark:border-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#F54E00]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={editForm.email}
                                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                    className="w-full px-3 py-2 text-xs rounded-md bg-white dark:bg-[#141416] text-[#111827] dark:text-[#FFFFFF] border border-[#D1D5DB] dark:border-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#F54E00]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] mb-1">
                                    Role / Hak Akses
                                </label>
                                <select
                                    value={editForm.role}
                                    onChange={(e: any) => setEditForm({ ...editForm, role: e.target.value })}
                                    className="w-full px-3 py-2 text-xs rounded-md bg-white dark:bg-[#141416] text-[#111827] dark:text-[#FFFFFF] border border-[#D1D5DB] dark:border-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#F54E00]"
                                >
                                    <option value="user">👤 Member Biasa</option>
                                    <option value="admin">🛡️ Administrator</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] mb-1">
                                    Avatar Image URL
                                </label>
                                <input
                                    type="url"
                                    value={editForm.avatar}
                                    onChange={(e) => setEditForm({ ...editForm, avatar: e.target.value })}
                                    placeholder="https://..."
                                    className="w-full px-3 py-2 text-xs rounded-md bg-white dark:bg-[#141416] text-[#111827] dark:text-[#FFFFFF] border border-[#D1D5DB] dark:border-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#F54E00]"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5E7EB] dark:border-[#374151]">
                                <button
                                    type="button"
                                    onClick={() => setEditTarget(null)}
                                    className="px-4 py-2 text-xs font-semibold rounded-md border border-[#D1D5DB] dark:border-[#4B5563] text-[#374151] dark:text-[#E5E7EB] hover:bg-[#F3F4F6] dark:hover:bg-[#2A2B32]"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-5 py-2 text-xs font-bold rounded-md bg-[#F54E00] hover:bg-[#D44300] text-white disabled:opacity-50 transition shadow-sm"
                                >
                                    {submitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL 3: Reset Password */}
            {resetPwdTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                    <div className="w-full max-w-sm bg-white dark:bg-[#1E1F24] rounded-xl border border-[#E5E7EB] dark:border-[#374151] shadow-2xl p-6 text-[#111827] dark:text-[#FFFFFF]">
                        <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] dark:border-[#374151]">
                            <h3 className="text-base font-bold flex items-center gap-2">
                                <span>🔑 Reset Password</span>
                            </h3>
                            <button
                                type="button"
                                onClick={() => setResetPwdTarget(null)}
                                className="text-xs p-1 text-[#6B7280] hover:text-black dark:text-[#9CA3AF] dark:hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleResetPassword} className="mt-4 space-y-4">
                            <p className="text-xs text-[#4B5563] dark:text-[#D1D5DB]">
                                Masukkan kata sandi baru untuk pengguna{' '}
                                <strong className="text-[#111827] dark:text-[#FFFFFF]">
                                    @{resetPwdTarget.username}
                                </strong>
                                :
                            </p>

                            <div>
                                <input
                                    type="password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Kata sandi baru..."
                                    className="w-full px-3 py-2 text-xs rounded-md bg-white dark:bg-[#141416] text-[#111827] dark:text-[#FFFFFF] border border-[#D1D5DB] dark:border-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#F54E00]"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5E7EB] dark:border-[#374151]">
                                <button
                                    type="button"
                                    onClick={() => setResetPwdTarget(null)}
                                    className="px-4 py-2 text-xs font-semibold rounded-md border border-[#D1D5DB] dark:border-[#4B5563] text-[#374151] dark:text-[#E5E7EB] hover:bg-[#F3F4F6] dark:hover:bg-[#2A2B32]"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-5 py-2 text-xs font-bold rounded-md bg-[#F54E00] hover:bg-[#D44300] text-white disabled:opacity-50 transition shadow-sm"
                                >
                                    {submitting ? 'Memproses...' : 'Perbarui Password'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL 4: Hapus Pengguna Confirmation */}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                    <div className="w-full max-w-sm bg-white dark:bg-[#1E1F24] rounded-xl border border-red-300 dark:border-red-900 shadow-2xl p-6 text-[#111827] dark:text-[#FFFFFF]">
                        <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] dark:border-[#374151]">
                            <h3 className="text-base font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                                <span>⚠️ Konfirmasi Hapus Akun</span>
                            </h3>
                            <button
                                type="button"
                                onClick={() => setDeleteTarget(null)}
                                className="text-xs p-1 text-[#6B7280] hover:text-black dark:text-[#9CA3AF] dark:hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="mt-4 space-y-3">
                            <p className="text-xs text-[#374151] dark:text-[#E5E7EB]">
                                Apakah Anda yakin ingin menghapus akun pengguna{' '}
                                <strong className="text-red-600 dark:text-red-400">
                                    @{deleteTarget.username} ({deleteTarget.name})
                                </strong>
                                ?
                            </p>
                            <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">
                                Tindakan ini bersifat permanen dan tidak dapat dibatalkan.
                            </p>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-[#E5E7EB] dark:border-[#374151]">
                            <button
                                type="button"
                                onClick={() => setDeleteTarget(null)}
                                className="px-4 py-2 text-xs font-semibold rounded-md border border-[#D1D5DB] dark:border-[#4B5563] text-[#374151] dark:text-[#E5E7EB] hover:bg-[#F3F4F6] dark:hover:bg-[#2A2B32]"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteUser}
                                disabled={submitting}
                                className="px-5 py-2 text-xs font-bold rounded-md bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 transition shadow-sm"
                            >
                                {submitting ? 'Menghapus...' : 'Ya, Hapus Akun'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
