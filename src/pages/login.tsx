import React, { useState, useEffect } from 'react'
import { Link, navigate } from 'gatsby'
import { useLocalAuth } from '../hooks/useLocalAuth'
import SEO from '../components/seo'

export default function LoginPage() {
    const { user, isLoggedIn, isAdmin, login, register, logout } = useLocalAuth()
    const [mode, setMode] = useState<'login' | 'register'>('login')

    // Login fields
    const [usernameOrEmail, setUsernameOrEmail] = useState('')
    const [password, setPassword] = useState('')

    // Register fields
    const [regName, setRegName] = useState('')
    const [regUsername, setRegUsername] = useState('')
    const [regEmail, setRegEmail] = useState('')
    const [regPassword, setRegPassword] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [successMsg, setSuccessMsg] = useState<string | null>(null)

    // Redirect parameter support
    const [redirectUrl, setRedirectUrl] = useState<string | null>(null)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search)
            const red = params.get('redirect')
            if (red) setRedirectUrl(red)
        }
    }, [])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccessMsg(null)
        setLoading(true)

        try {
            const loggedInUser = await login(usernameOrEmail, password)
            setSuccessMsg(`Berhasil masuk sebagai ${loggedInUser.name}!`)
            setTimeout(() => {
                if (redirectUrl) {
                    navigate(redirectUrl)
                } else if (loggedInUser.role === 'admin') {
                    navigate('/admin')
                } else {
                    navigate('/account')
                }
            }, 600)
        } catch (err: any) {
            setError(err.message || 'Login gagal. Silakan periksa kembali kredensial Anda.')
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccessMsg(null)
        setLoading(true)

        try {
            const newUser = await register({
                name: regName,
                username: regUsername,
                email: regEmail,
                password: regPassword,
            })
            setSuccessMsg(`Pendaftaran berhasil! Selamat datang, ${newUser.name}.`)
            setTimeout(() => {
                if (redirectUrl) {
                    navigate(redirectUrl)
                } else {
                    navigate('/account')
                }
            }, 700)
        } catch (err: any) {
            setError(err.message || 'Pendaftaran gagal.')
        } finally {
            setLoading(false)
        }
    }

    const quickFillAdmin = () => {
        setMode('login')
        setUsernameOrEmail('admin')
        setPassword('admin')
        setError(null)
    }

    const quickFillUser = () => {
        setMode('login')
        setUsernameOrEmail('user')
        setPassword('user')
        setError(null)
    }

    return (
        <div className="min-h-screen bg-[#F4F4F0] dark:bg-[#121214] text-[#111827] dark:text-[#FFFFFF] flex flex-col justify-between p-4 sm:p-6 font-sans">
            <SEO title="Login & Akun - PostHog" />

            {/* Top Navigation Bar */}
            <div className="max-w-md w-full mx-auto flex items-center justify-between pb-6">
                <Link to="/" className="flex items-center space-x-2 text-[#F54E00] font-extrabold text-xl tracking-tight">
                    <span className="text-2xl">🦔</span>
                    <span className="text-[#111827] dark:text-[#FFFFFF]">PostHog</span>
                </Link>

                <div className="flex items-center space-x-2 text-xs">
                    <Link
                        to="/blog"
                        className="px-2.5 py-1 text-[#4B5563] dark:text-[#D1D5DB] hover:text-[#111827] dark:hover:text-[#FFFFFF] transition"
                    >
                        Blog
                    </Link>
                    <Link
                        to="/admin"
                        className="px-2.5 py-1 text-[#F54E00] dark:text-[#FF7A45] font-semibold hover:underline"
                    >
                        Admin Suite &rarr;
                    </Link>
                </div>
            </div>

            {/* Main Auth Card */}
            <div className="max-w-md w-full mx-auto bg-white dark:bg-[#1E1F24] rounded-xl border border-[#E5E7EB] dark:border-[#374151] shadow-lg p-6 sm:p-8">
                {isLoggedIn && user ? (
                    /* Already logged in view */
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 rounded-full mx-auto bg-[#FEE2E2] dark:bg-[#7F1D1D] text-[#DC2626] dark:text-[#FCA5A5] flex items-center justify-center font-bold text-2xl border border-[#FCA5A5] dark:border-[#991B1B]">
                            {user.name.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <span
                                className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                                    user.role === 'admin'
                                        ? 'bg-[#FEE2E2] text-[#B91C1C] dark:bg-[#7F1D1D] dark:text-[#FCA5A5]'
                                        : 'bg-[#DBEAFE] text-[#1D4ED8] dark:bg-[#1E3A8A] dark:text-[#BFDBFE]'
                                }`}
                            >
                                {user.role === 'admin' ? '🛡️ Administrator' : '👤 Pengguna / User'}
                            </span>
                            <h2 className="text-xl font-bold mt-2 text-[#111827] dark:text-[#FFFFFF]">{user.name}</h2>
                            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-mono mt-0.5">
                                @{user.username} &bull; {user.email}
                            </p>
                        </div>

                        <p className="text-xs text-[#4B5563] dark:text-[#D1D5DB] pt-2">
                            {user.role === 'admin'
                                ? 'Anda memiliki akses penuh ke seluruh pengaturan Admin Suite dan moderasi.'
                                : 'Anda masuk sebagai pengguna biasa. Anda dapat menulis komentar dan mengatur profil.'}
                        </p>

                        <div className="pt-4 space-y-2">
                            {user.role === 'admin' ? (
                                <Link
                                    to="/admin"
                                    className="block w-full py-2.5 px-4 bg-[#F54E00] hover:bg-[#D44300] text-white font-bold text-sm rounded-lg shadow-sm transition"
                                >
                                    Masuk ke Admin Suite &rarr;
                                </Link>
                            ) : (
                                <Link
                                    to="/account"
                                    className="block w-full py-2.5 px-4 bg-[#F54E00] hover:bg-[#D44300] text-white font-bold text-sm rounded-lg shadow-sm transition"
                                >
                                    Profil & Dashboard Akun &rarr;
                                </Link>
                            )}

                            <Link
                                to="/blog"
                                className="block w-full py-2 px-4 bg-[#F3F4F6] dark:bg-[#2A2B32] hover:bg-[#E5E7EB] dark:hover:bg-[#34353E] text-[#111827] dark:text-[#FFFFFF] border border-[#D1D5DB] dark:border-[#4B5563] font-medium text-xs rounded-lg transition"
                            >
                                Jelajahi Artikel Blog
                            </Link>

                            <button
                                onClick={logout}
                                className="block w-full py-2 text-xs text-[#DC2626] dark:text-[#F87171] hover:underline font-semibold"
                            >
                                Keluar (Logout) / Ganti Akun
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Login & Register Forms */
                    <div>
                        {/* Tab Switcher */}
                        <div className="flex border-b border-[#E5E7EB] dark:border-[#374151] mb-6">
                            <button
                                type="button"
                                onClick={() => {
                                    setMode('login')
                                    setError(null)
                                }}
                                className={`flex-1 pb-3 text-sm font-bold transition border-b-2 ${
                                    mode === 'login'
                                        ? 'border-[#F54E00] text-[#F54E00] dark:text-[#FF7A45]'
                                        : 'border-transparent text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-[#FFFFFF]'
                                }`}
                            >
                                Masuk (Login)
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setMode('register')
                                    setError(null)
                                }}
                                className={`flex-1 pb-3 text-sm font-bold transition border-b-2 ${
                                    mode === 'register'
                                        ? 'border-[#F54E00] text-[#F54E00] dark:text-[#FF7A45]'
                                        : 'border-transparent text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-[#FFFFFF]'
                                }`}
                            >
                                Daftar Akun Baru
                            </button>
                        </div>

                        {/* Error & Success Badges */}
                        {error && (
                            <div className="mb-4 p-3 rounded-lg text-xs font-semibold bg-[#FEF2F2] dark:bg-[#451A1A] border border-[#FCA5A5] dark:border-[#991B1B] text-[#991B1B] dark:text-[#FCA5A5]">
                                {error}
                            </div>
                        )}
                        {successMsg && (
                            <div className="mb-4 p-3 rounded-lg text-xs font-semibold bg-[#ECFDF5] dark:bg-[#064E3B] border border-[#A7F3D0] dark:border-[#047857] text-[#065F46] dark:text-[#A7F3D0]">
                                {successMsg}
                            </div>
                        )}

                        {mode === 'login' ? (
                            /* Form Login */
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-[#374151] dark:text-[#E5E7EB] mb-1.5">
                                        Username atau Email
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={usernameOrEmail}
                                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                                        placeholder="admin atau user"
                                        className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#141416] text-[#111827] dark:text-[#FFFFFF] placeholder-[#9CA3AF] dark:placeholder-[#6B7280] border border-[#D1D5DB] dark:border-[#4B5563] rounded-lg focus:outline-none focus:border-[#F54E00] focus:ring-1 focus:ring-[#F54E00] transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-[#374151] dark:text-[#E5E7EB] mb-1.5">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#141416] text-[#111827] dark:text-[#FFFFFF] placeholder-[#9CA3AF] dark:placeholder-[#6B7280] border border-[#D1D5DB] dark:border-[#4B5563] rounded-lg focus:outline-none focus:border-[#F54E00] focus:ring-1 focus:ring-[#F54E00] transition"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-2.5 px-4 bg-[#F54E00] hover:bg-[#D44300] disabled:opacity-50 text-white font-bold text-sm rounded-lg shadow-sm transition"
                                >
                                    {loading ? 'Memproses...' : 'Masuk Sekarang'}
                                </button>
                            </form>
                        ) : (
                            /* Form Register */
                            <form onSubmit={handleRegister} className="space-y-3.5">
                                <div>
                                    <label className="block text-xs font-bold text-[#374151] dark:text-[#E5E7EB] mb-1.5">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={regName}
                                        onChange={(e) => setRegName(e.target.value)}
                                        placeholder="e.g. Alex Pratama"
                                        className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#141416] text-[#111827] dark:text-[#FFFFFF] placeholder-[#9CA3AF] dark:placeholder-[#6B7280] border border-[#D1D5DB] dark:border-[#4B5563] rounded-lg focus:outline-none focus:border-[#F54E00] focus:ring-1 focus:ring-[#F54E00] transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-[#374151] dark:text-[#E5E7EB] mb-1.5">
                                        Username (Unik)
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={regUsername}
                                        onChange={(e) => setRegUsername(e.target.value)}
                                        placeholder="alexpratama"
                                        className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#141416] text-[#111827] dark:text-[#FFFFFF] placeholder-[#9CA3AF] dark:placeholder-[#6B7280] border border-[#D1D5DB] dark:border-[#4B5563] rounded-lg focus:outline-none focus:border-[#F54E00] focus:ring-1 focus:ring-[#F54E00] transition font-mono text-xs"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-[#374151] dark:text-[#E5E7EB] mb-1.5">
                                        Alamat Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={regEmail}
                                        onChange={(e) => setRegEmail(e.target.value)}
                                        placeholder="alex@example.com"
                                        className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#141416] text-[#111827] dark:text-[#FFFFFF] placeholder-[#9CA3AF] dark:placeholder-[#6B7280] border border-[#D1D5DB] dark:border-[#4B5563] rounded-lg focus:outline-none focus:border-[#F54E00] focus:ring-1 focus:ring-[#F54E00] transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-[#374151] dark:text-[#E5E7EB] mb-1.5">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={regPassword}
                                        onChange={(e) => setRegPassword(e.target.value)}
                                        placeholder="Minimal 4 karakter"
                                        className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#141416] text-[#111827] dark:text-[#FFFFFF] placeholder-[#9CA3AF] dark:placeholder-[#6B7280] border border-[#D1D5DB] dark:border-[#4B5563] rounded-lg focus:outline-none focus:border-[#F54E00] focus:ring-1 focus:ring-[#F54E00] transition"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-2.5 px-4 bg-[#F54E00] hover:bg-[#D44300] disabled:opacity-50 text-white font-bold text-sm rounded-lg shadow-sm transition"
                                >
                                    {loading ? 'Mendaftarkan...' : 'Daftar Akun'}
                                </button>
                            </form>
                        )}

                        {/* Quick 1-Click Credentials Helper */}
                        <div className="mt-6 pt-5 border-t border-[#E5E7EB] dark:border-[#374151]">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF] text-center mb-2.5">
                                Akses Cepat Demo (1-Click)
                            </p>
                            <div className="grid grid-cols-2 gap-2.5">
                                <button
                                    type="button"
                                    onClick={quickFillAdmin}
                                    className="py-2 px-3 bg-[#F3F4F6] hover:bg-[#E5E7EB] dark:bg-[#2A2B32] dark:hover:bg-[#34353E] text-[#111827] dark:text-[#FFFFFF] text-xs rounded-lg border border-[#D1D5DB] dark:border-[#4B5563] font-semibold transition text-center shadow-sm"
                                >
                                    🛡️ Akun Admin
                                    <span className="block text-[11px] text-[#4B5563] dark:text-[#D1D5DB] font-mono mt-0.5">
                                        admin / admin
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    onClick={quickFillUser}
                                    className="py-2 px-3 bg-[#F3F4F6] hover:bg-[#E5E7EB] dark:bg-[#2A2B32] dark:hover:bg-[#34353E] text-[#111827] dark:text-[#FFFFFF] text-xs rounded-lg border border-[#D1D5DB] dark:border-[#4B5563] font-semibold transition text-center shadow-sm"
                                >
                                    👤 Akun User
                                    <span className="block text-[11px] text-[#4B5563] dark:text-[#D1D5DB] font-mono mt-0.5">
                                        user / user
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="max-w-md w-full mx-auto text-center pt-6 text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                Sistem Otentikasi Lokal PostHog &bull; Bebas dependensi eksternal
            </div>
        </div>
    )
}
