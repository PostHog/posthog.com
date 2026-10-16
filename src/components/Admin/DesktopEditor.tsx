import React, { useState, useEffect } from 'react'
import { useSiteSettings, DesktopIconConfig } from '../../hooks/useSiteSettings'
import { AppIcon } from '../OSIcons'

const AVAILABLE_ICONS = [
    { name: 'doc', label: 'Document / Markdown' },
    { name: 'folder', label: 'Product Folder' },
    { name: 'notebook', label: 'Docs / Notebook' },
    { name: 'typewriter', label: 'Typewriter / Blog' },
    { name: 'pricing', label: 'Pricing Calculator' },
    { name: 'spreadsheet', label: 'Spreadsheet / Data' },
    { name: 'posthog', label: 'PostHog Logo' },
    { name: 'forums', label: 'Community / Forum' },
    { name: 'games', label: 'Retro Games' },
    { name: 'photobooth', label: 'Photobooth' },
    { name: 'video', label: 'Video Player' },
    { name: 'canvas', label: 'Canvas / Design' },
    { name: 'contact', label: 'Contact Phone' },
    { name: 'envelope', label: 'Envelope / Newsletter' },
    { name: 'invite', label: 'Invite / Team' },
    { name: 'bookmark', label: 'Bookmark' },
    { name: 'report', label: 'Report / Chart' },
    { name: 'script', label: 'Script / Code' },
    { name: 'shoppingBag', label: 'Shopping / Merch' },
    { name: 'trash', label: 'Trash / Bin' },
    { name: 'hedgehog_mode', label: 'Hedgehog Mode' },
    { name: 'hogpaint', label: 'HogPaint' },
    { name: 'hogwars', label: 'HogWars' },
    { name: 'presentation', label: 'Presentation' },
    { name: 'compass', label: 'Compass Tour' },
    { name: 'map', label: 'Roadmap' },
    { name: 'pdf', label: 'PDF Document' },
    { name: 'handbook', label: 'Handbook' },
    { name: 'computerCoffee', label: 'Coffee Break' },
]

export default function DesktopEditor() {
    const { desktopIcons, saveDesktopSettings, resetDesktopSettings } = useSiteSettings()
    const [icons, setIcons] = useState<DesktopIconConfig[]>([])
    const [saving, setSaving] = useState(false)
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
    const [filterSection, setFilterSection] = useState<'all' | 'desktop' | 'products' | 'apps'>('all')

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editIndex, setEditIndex] = useState<number | null>(null)
    const [formData, setFormData] = useState<DesktopIconConfig>({
        id: '',
        label: '',
        icon: 'doc',
        url: '/',
        external: false,
        section: undefined,
    })

    // Sync from hook
    useEffect(() => {
        if (desktopIcons && desktopIcons.length > 0) {
            setIcons(JSON.parse(JSON.stringify(desktopIcons)))
        }
    }, [desktopIcons])

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type })
        setTimeout(() => setToast(null), 3500)
    }

    const filteredIconsWithIndex = icons
        .map((icon, originalIndex) => ({ icon, originalIndex }))
        .filter(({ icon }) => {
            if (filterSection === 'all') return true
            if (filterSection === 'desktop') return !icon.section
            return icon.section === filterSection
        })

    const moveIcon = (origIdx: number, direction: 'up' | 'down') => {
        const targetIdx = direction === 'up' ? origIdx - 1 : origIdx + 1
        if (targetIdx < 0 || targetIdx >= icons.length) return
        const newIcons = [...icons]
        const temp = newIcons[origIdx]
        newIcons[origIdx] = newIcons[targetIdx]
        newIcons[targetIdx] = temp
        setIcons(newIcons)
    }

    const deleteIcon = (origIdx: number) => {
        const target = icons[origIdx]
        if (window.confirm(`Hapus icon shortcut "${target.label}"?`)) {
            setIcons(icons.filter((_, i) => i !== origIdx))
        }
    }

    const openAddModal = () => {
        setEditIndex(null)
        setFormData({
            id: `item-${Date.now()}`,
            label: '',
            icon: 'doc',
            url: '/',
            external: false,
            section: filterSection === 'products' ? 'products' : filterSection === 'apps' ? 'apps' : undefined,
        })
        setIsModalOpen(true)
    }

    const openEditModal = (origIdx: number) => {
        setEditIndex(origIdx)
        setFormData(JSON.parse(JSON.stringify(icons[origIdx])))
        setIsModalOpen(true)
    }

    const handleSaveModal = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.label.trim() || !formData.url.trim()) {
            alert('Label dan URL wajib diisi.')
            return
        }

        const formatted: DesktopIconConfig = {
            ...formData,
            label: formData.label.trim(),
            url: formData.url.trim(),
            id: formData.id || formData.label.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        }

        let updated: DesktopIconConfig[]
        if (editIndex !== null) {
            updated = [...icons]
            updated[editIndex] = formatted
        } else {
            updated = [...icons, formatted]
        }

        setIcons(updated)
        setIsModalOpen(false)
    }

    const handleSaveToServer = async () => {
        setSaving(true)
        try {
            await saveDesktopSettings(icons)
            showToast('Konfigurasi Desktop & OS berhasil disimpan ke server!')
        } catch (err: any) {
            showToast(`Gagal menyimpan: ${err.message}`, 'error')
        } finally {
            setSaving(false)
        }
    }

    const handleResetDefault = async () => {
        if (window.confirm('Kembalikan konfigurasi icon desktop ke default PostHog?')) {
            setSaving(true)
            try {
                await resetDesktopSettings()
                showToast('Desktop dikembalikan ke default PostHog!')
            } catch (err: any) {
                showToast(`Gagal mereset: ${err.message}`, 'error')
            } finally {
                setSaving(false)
            }
        }
    }

    return (
        <div className="space-y-6">
            {/* Toast Notification */}
            {toast && (
                <div
                    className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-lg shadow-lg text-white font-medium text-sm flex items-center space-x-2 transition-all ${
                        toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
                    }`}
                >
                    <span>{toast.type === 'success' ? '✓' : '⚠'}</span>
                    <span>{toast.message}</span>
                </div>
            )}

            {/* Header & Actions */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span>🖥️</span>
                        <span>Pengaturan PostHog Desktop &amp; OS</span>
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Kelola icon shortcut layar desktop PostHog OS, dock launcher, pilihan ikon SVG/PNG, serta tautan aplikasinya.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                    <button
                        type="button"
                        onClick={openAddModal}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-lg shadow-sm transition flex items-center gap-1.5"
                    >
                        <span>+</span>
                        <span>Tambah Icon Shortcut</span>
                    </button>
                    <button
                        type="button"
                        onClick={handleResetDefault}
                        disabled={saving}
                        className="px-3.5 py-2 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium text-sm rounded-lg transition"
                    >
                        Reset Default
                    </button>
                    <button
                        type="button"
                        onClick={handleSaveToServer}
                        disabled={saving}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-medium text-sm rounded-lg shadow-sm transition flex items-center gap-1.5"
                    >
                        {saving ? <span>Menyimpan...</span> : <span>Simpan Perubahan</span>}
                    </button>
                </div>
            </div>

            {/* Mini PostHog OS Desktop Simulation Preview */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3 border-b border-gray-100 dark:border-gray-800 pb-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Live Preview Mini Desktop OS
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                        {icons.filter((i) => !i.section).length} Desktop Grid &bull;{' '}
                        {icons.filter((i) => i.section).length} Dock Apps
                    </span>
                </div>

                {/* Simulated Desktop Wallpaper Window */}
                <div className="relative rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 bg-[#EFEFDC] dark:bg-[#1C1C1E] p-4 min-h-[220px] shadow-inner select-none">
                    {/* Simulated Desktop Grid Icons */}
                    <div className="grid grid-flow-col grid-rows-2 auto-cols-[80px] gap-3 mb-10 overflow-x-auto pb-2">
                        {icons
                            .filter((item) => !item.section)
                            .map((item, idx) => (
                                <div
                                    key={item.id || idx}
                                    className="flex flex-col items-center justify-center p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 transition text-center cursor-pointer group"
                                    title={`${item.label} (${item.url})`}
                                >
                                    <div className="w-9 h-9 mb-1 flex items-center justify-center transform group-hover:scale-105 transition-transform">
                                        <AppIcon name={item.icon as any} className="w-8 h-8" />
                                    </div>
                                    <span className="text-[11px] leading-tight font-medium text-gray-800 dark:text-gray-200 line-clamp-1 px-1 rounded bg-white/40 dark:bg-black/30 backdrop-blur-xs">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                    </div>

                    {/* Simulated Dock at bottom */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white/80 dark:bg-black/70 backdrop-blur border border-gray-300 dark:border-gray-700 px-3 py-1.5 rounded-xl shadow-lg flex items-center space-x-2">
                        <div className="flex items-center space-x-1.5 px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-600 dark:text-gray-300">
                            📁 Products ({icons.filter((i) => i.section === 'products').length})
                        </div>
                        <div className="flex items-center space-x-1.5 px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-600 dark:text-gray-300">
                            📦 Apps ({icons.filter((i) => i.section === 'apps').length})
                        </div>
                    </div>
                </div>
            </div>

            {/* Icon Management Table & Filter */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                        <button
                            type="button"
                            onClick={() => setFilterSection('all')}
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                                filterSection === 'all'
                                    ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                            }`}
                        >
                            Semua ({icons.length})
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilterSection('desktop')}
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                                filterSection === 'desktop'
                                    ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                            }`}
                        >
                            Desktop Grid ({icons.filter((i) => !i.section).length})
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilterSection('products')}
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                                filterSection === 'products'
                                    ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                            }`}
                        >
                            Dock: Products ({icons.filter((i) => i.section === 'products').length})
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilterSection('apps')}
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                                filterSection === 'apps'
                                    ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                            }`}
                        >
                            Dock: Apps ({icons.filter((i) => i.section === 'apps').length})
                        </button>
                    </div>

                    <span className="text-xs text-gray-500">
                        Atur urutan dengan tombol ▲ / ▼
                    </span>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {filteredIconsWithIndex.map(({ icon, originalIndex }) => (
                        <div
                            key={icon.id || originalIndex}
                            className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition"
                        >
                            <div className="flex items-center space-x-3.5">
                                {/* Order Controls */}
                                <div className="flex flex-col space-y-1">
                                    <button
                                        type="button"
                                        onClick={() => moveIcon(originalIndex, 'up')}
                                        disabled={originalIndex === 0}
                                        title="Pindah ke Atas"
                                        className="w-6 h-6 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 text-gray-700 dark:text-gray-300 text-xs flex items-center justify-center transition"
                                    >
                                        ▲
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => moveIcon(originalIndex, 'down')}
                                        disabled={originalIndex === icons.length - 1}
                                        title="Pindah ke Bawah"
                                        className="w-6 h-6 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 text-gray-700 dark:text-gray-300 text-xs flex items-center justify-center transition"
                                    >
                                        ▼
                                    </button>
                                </div>

                                {/* Visual AppIcon badge */}
                                <div className="w-11 h-11 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center flex-shrink-0 shadow-xs">
                                    <AppIcon name={icon.icon as any} className="w-8 h-8" />
                                </div>

                                <div>
                                    <div className="flex items-center space-x-2">
                                        <span className="font-semibold text-gray-900 dark:text-white text-base">
                                            {icon.label}
                                        </span>
                                        <span className="text-xs font-mono text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                                            {icon.url}
                                        </span>
                                        {icon.external && (
                                            <span className="text-[10px] bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded font-semibold uppercase">
                                                Eksternal ↗
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                                        <span className="font-mono text-gray-400">icon: {icon.icon}</span>
                                        <span>&bull;</span>
                                        <span className="font-medium text-gray-600 dark:text-gray-300">
                                            Lokasi:{' '}
                                            {!icon.section
                                                ? '🖥️ Desktop Grid'
                                                : icon.section === 'products'
                                                ? '📁 Dock (Products)'
                                                : '📦 Dock (Apps)'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Row Action buttons */}
                            <div className="flex items-center space-x-2 self-end md:self-center">
                                <button
                                    type="button"
                                    onClick={() => openEditModal(originalIndex)}
                                    className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => deleteIcon(originalIndex)}
                                    className="px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Edit / Add Desktop Icon */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-gray-200 dark:border-gray-800 shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                                {editIndex !== null
                                    ? `Edit Shortcut "${formData.label}"`
                                    : 'Tambah Icon Shortcut Baru'}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSaveModal} className="p-6 space-y-4 overflow-y-auto flex-1">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-1">
                                    Label Teks Icon *
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: blog.mdx, Admin Suite, Pricing..."
                                    value={formData.label}
                                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-[#d1d5db] dark:border-[#3f3f46] bg-white dark:bg-[#18181b] text-black dark:text-white placeholder-[#9ca3af] dark:placeholder-[#71717a] focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-1">
                                        URL Link Tujuan *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Contoh: /blog, /pricing, https://..."
                                        value={formData.url}
                                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                        className="w-full px-3.5 py-2 text-sm rounded-lg border border-[#d1d5db] dark:border-[#3f3f46] bg-white dark:bg-[#18181b] text-black dark:text-white placeholder-[#9ca3af] dark:placeholder-[#71717a] focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-1">
                                        Penempatan Lokasi
                                    </label>
                                    <select
                                        value={formData.section || ''}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                section: (e.target.value as any) || undefined,
                                            })
                                        }
                                        className="w-full px-3.5 py-2 text-sm rounded-lg border border-[#d1d5db] dark:border-[#3f3f46] bg-white dark:bg-[#18181b] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        <option value="">🖥️ Desktop Grid Utama</option>
                                        <option value="products">📁 Dock: Products Folder</option>
                                        <option value="apps">📦 Dock: Apps Folder</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 pt-1">
                                <input
                                    type="checkbox"
                                    id="externalLinkCheck"
                                    checked={!!formData.external}
                                    onChange={(e) => setFormData({ ...formData, external: e.target.checked })}
                                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                                />
                                <label htmlFor="externalLinkCheck" className="text-xs text-gray-700 dark:text-gray-300 cursor-pointer">
                                    Buka di tab baru (Tautan eksternal)
                                </label>
                            </div>

                            {/* Visual PostHog Icon Picker */}
                            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-2">
                                    Pilih Icon PostHog (Aktif: <span className="text-red-600 font-mono">{formData.icon}</span>)
                                </label>
                                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-52 overflow-y-auto p-2 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                                    {AVAILABLE_ICONS.map((iconItem) => {
                                        const isSelected = formData.icon === iconItem.name
                                        return (
                                            <button
                                                key={iconItem.name}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, icon: iconItem.name })}
                                                className={`flex flex-col items-center justify-center p-2 rounded-lg border transition ${
                                                    isSelected
                                                        ? 'bg-red-50 dark:bg-red-950/40 border-red-500 ring-2 ring-red-400'
                                                        : 'border-transparent hover:bg-gray-200 dark:hover:bg-gray-800'
                                                }`}
                                                title={iconItem.label}
                                            >
                                                <div className="w-8 h-8 mb-1 flex items-center justify-center">
                                                    <AppIcon name={iconItem.name as any} className="w-7 h-7" />
                                                </div>
                                                <span className="text-[10px] text-gray-600 dark:text-gray-300 truncate w-full text-center">
                                                    {iconItem.name}
                                                </span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition"
                                >
                                    Terapkan Shortcut
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
