import React, { useState, useEffect } from 'react'
import { useSiteSettings, MenuItemConfig, MenuItemChild } from '../../hooks/useSiteSettings'

export default function MenuEditor() {
    const { menuItems, saveMenuSettings, resetMenuSettings, loading } = useSiteSettings()
    const [items, setItems] = useState<MenuItemConfig[]>([])
    const [saving, setSaving] = useState(false)
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editIndex, setEditIndex] = useState<number | null>(null)
    const [modalData, setModalData] = useState<{
        name: string
        url: string
        badge: string
        items: MenuItemChild[]
    }>({
        name: '',
        url: '',
        badge: '',
        items: [],
    })

    // Subitem add state inside modal
    const [newSubName, setNewSubName] = useState('')
    const [newSubUrl, setNewSubUrl] = useState('')

    // Sync from hook when loaded
    useEffect(() => {
        if (menuItems && menuItems.length > 0) {
            setItems(JSON.parse(JSON.stringify(menuItems)))
        }
    }, [menuItems])

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type })
        setTimeout(() => setToast(null), 3500)
    }

    // Reorder handlers
    const moveItem = (index: number, direction: 'up' | 'down') => {
        const targetIndex = direction === 'up' ? index - 1 : index + 1
        if (targetIndex < 0 || targetIndex >= items.length) return
        const newItems = [...items]
        const temp = newItems[index]
        newItems[index] = newItems[targetIndex]
        newItems[targetIndex] = temp
        setItems(newItems)
    }

    // Delete item
    const deleteItem = (index: number) => {
        const item = items[index]
        if (window.confirm(`Hapus menu "${item.name}"?`)) {
            const newItems = items.filter((_, i) => i !== index)
            setItems(newItems)
        }
    }

    // Open Modal for Add
    const openAddModal = () => {
        setEditIndex(null)
        setModalData({
            name: '',
            url: '/',
            badge: '',
            items: [],
        })
        setNewSubName('')
        setNewSubUrl('')
        setIsModalOpen(true)
    }

    // Open Modal for Edit
    const openEditModal = (index: number) => {
        setEditIndex(index)
        const item = items[index]
        setModalData({
            name: item.name,
            url: item.url,
            badge: item.badge || '',
            items: item.items ? JSON.parse(JSON.stringify(item.items)) : [],
        })
        setNewSubName('')
        setNewSubUrl('')
        setIsModalOpen(true)
    }

    // Add subitem inside modal
    const handleAddSubItem = () => {
        if (!newSubName.trim() || !newSubUrl.trim()) return
        setModalData({
            ...modalData,
            items: [...modalData.items, { name: newSubName.trim(), url: newSubUrl.trim() }],
        })
        setNewSubName('')
        setNewSubUrl('')
    }

    // Remove subitem inside modal
    const handleRemoveSubItem = (subIndex: number) => {
        setModalData({
            ...modalData,
            items: modalData.items.filter((_, i) => i !== subIndex),
        })
    }

    // Save modal data to local list
    const handleSaveModal = (e: React.FormEvent) => {
        e.preventDefault()
        if (!modalData.name.trim() || !modalData.url.trim()) {
            alert('Nama dan URL menu wajib diisi.')
            return
        }

        const formattedItem: MenuItemConfig = {
            id: editIndex !== null ? items[editIndex].id : modalData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            name: modalData.name.trim(),
            url: modalData.url.trim(),
            ...(modalData.badge.trim() ? { badge: modalData.badge.trim() } : {}),
            ...(modalData.items.length > 0 ? { items: modalData.items } : {}),
        }

        let updated: MenuItemConfig[]
        if (editIndex !== null) {
            updated = [...items]
            updated[editIndex] = formattedItem
        } else {
            updated = [...items, formattedItem]
        }

        setItems(updated)
        setIsModalOpen(false)
    }

    // Save all to server
    const handleSaveToServer = async () => {
        setSaving(true)
        try {
            await saveMenuSettings(items)
            showToast('Konfigurasi menu navigasi berhasil disimpan ke server!')
        } catch (err: any) {
            showToast(`Gagal menyimpan menu: ${err.message}`, 'error')
        } finally {
            setSaving(false)
        }
    }

    // Reset to default
    const handleResetDefault = async () => {
        if (window.confirm('Kembalikan konfigurasi menu ke default bawaan PostHog?')) {
            setSaving(true)
            try {
                await resetMenuSettings()
                showToast('Menu dikembalikan ke default PostHog!')
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

            {/* Header & Action Bar */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span>🧭</span>
                        <span>Pengaturan Menu Navigasi</span>
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Kelola item navigasi utama, sub-menu dropdown, link internal/eksternal, serta urutan tampilannya.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                    <button
                        type="button"
                        onClick={openAddModal}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-lg shadow-sm transition flex items-center gap-1.5"
                    >
                        <span>+</span>
                        <span>Tambah Menu</span>
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

            {/* Live Visual Preview of Navigation Bar */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3 border-b border-gray-100 dark:border-gray-800 pb-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Live Preview Navigasi Header
                    </span>
                    <span className="text-xs text-gray-400 font-mono">Total {items.length} Menu</span>
                </div>
                <div className="bg-[#EFEFDC] dark:bg-[#111111] border border-gray-300 dark:border-gray-700 rounded-lg p-3 overflow-x-auto">
                    <div className="flex items-center space-x-1 min-w-max">
                        <div className="font-bold text-sm px-2 text-red-600 flex items-center gap-1.5 mr-2">
                            <span className="w-5 h-5 rounded bg-red-600 text-white text-xs flex items-center justify-center font-bold">P</span>
                            <span>PostHog</span>
                        </div>
                        {items.map((item, idx) => (
                            <div
                                key={item.id || idx}
                                className="px-2.5 py-1 text-xs font-medium rounded hover:bg-black/5 dark:hover:bg-white/10 text-gray-800 dark:text-gray-200 flex items-center space-x-1 cursor-default border border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                            >
                                <span>{item.name}</span>
                                {item.badge && (
                                    <span className="bg-red-500 text-white text-[10px] px-1 py-0.2 rounded font-bold uppercase">
                                        {item.badge}
                                    </span>
                                )}
                                {item.items && item.items.length > 0 && (
                                    <span className="text-[10px] text-gray-400">▾</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Menu Items Table / Reorder List */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                        Daftar Susunan Menu Navigasi
                    </h3>
                    <span className="text-xs text-gray-500">
                        Gunakan tombol ↑ &amp; ↓ untuk mengatur urutan
                    </span>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {items.map((item, idx) => (
                        <div
                            key={item.id || idx}
                            className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition"
                        >
                            <div className="flex items-start md:items-center space-x-3">
                                {/* Order Controls */}
                                <div className="flex flex-col space-y-1">
                                    <button
                                        type="button"
                                        onClick={() => moveItem(idx, 'up')}
                                        disabled={idx === 0}
                                        title="Pindah ke Atas"
                                        className="w-6 h-6 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 text-gray-700 dark:text-gray-300 text-xs flex items-center justify-center transition"
                                    >
                                        ▲
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => moveItem(idx, 'down')}
                                        disabled={idx === items.length - 1}
                                        title="Pindah ke Bawah"
                                        className="w-6 h-6 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 text-gray-700 dark:text-gray-300 text-xs flex items-center justify-center transition"
                                    >
                                        ▼
                                    </button>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center space-x-2">
                                        <span className="font-semibold text-gray-900 dark:text-white text-base">
                                            {item.name}
                                        </span>
                                        {item.badge && (
                                            <span className="bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 text-xs px-2 py-0.5 rounded-full font-semibold">
                                                {item.badge}
                                            </span>
                                        )}
                                        <span className="text-xs font-mono text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                                            {item.url}
                                        </span>
                                    </div>

                                    {/* Submenus preview */}
                                    {item.items && item.items.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                            <span className="text-xs text-gray-400 font-medium">Sub-menu:</span>
                                            {item.items.map((sub, sIdx) => (
                                                <span
                                                    key={sIdx}
                                                    className="inline-flex items-center text-xs bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700"
                                                >
                                                    {sub.name}
                                                    <span className="ml-1 text-gray-400 text-[10px]">({sub.url})</span>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Row Action buttons */}
                            <div className="flex items-center space-x-2 self-end md:self-center">
                                <button
                                    type="button"
                                    onClick={() => openEditModal(idx)}
                                    className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => deleteItem(idx)}
                                    className="px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Edit / Add Item */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-gray-200 dark:border-gray-800 shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                                {editIndex !== null ? `Edit Menu "${modalData.name}"` : 'Tambah Menu Baru'}
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
                                    Label / Nama Menu *
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: Blog, Pricing, Docs..."
                                    value={modalData.name}
                                    onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
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
                                        value={modalData.url}
                                        onChange={(e) => setModalData({ ...modalData, url: e.target.value })}
                                        className="w-full px-3.5 py-2 text-sm rounded-lg border border-[#d1d5db] dark:border-[#3f3f46] bg-white dark:bg-[#18181b] text-black dark:text-white placeholder-[#9ca3af] dark:placeholder-[#71717a] focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-1">
                                        Badge Label (Opsional)
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Contoh: NEW, BETA, ADMIN"
                                        value={modalData.badge}
                                        onChange={(e) => setModalData({ ...modalData, badge: e.target.value })}
                                        className="w-full px-3.5 py-2 text-sm rounded-lg border border-[#d1d5db] dark:border-[#3f3f46] bg-white dark:bg-[#18181b] text-black dark:text-white placeholder-[#9ca3af] dark:placeholder-[#71717a] focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                            </div>

                            {/* Submenu Management inside Modal */}
                            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-2">
                                    Sub-menu Dropdown ({modalData.items.length})
                                </label>

                                {modalData.items.length > 0 && (
                                    <div className="space-y-2 mb-3 max-h-40 overflow-y-auto pr-1">
                                        {modalData.items.map((sub, sIdx) => (
                                            <div
                                                key={sIdx}
                                                className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs"
                                            >
                                                <div>
                                                    <span className="font-semibold text-gray-900 dark:text-white">
                                                        {sub.name}
                                                    </span>
                                                    <span className="text-gray-400 ml-2 font-mono">
                                                        {sub.url}
                                                    </span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveSubItem(sIdx)}
                                                    className="text-red-500 hover:text-red-700 font-bold px-1"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Add new subitem fields */}
                                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-dashed border-gray-300 dark:border-gray-700 space-y-2">
                                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                        Tambah Sub-menu Link:
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            placeholder="Label sub-menu"
                                            value={newSubName}
                                            onChange={(e) => setNewSubName(e.target.value)}
                                            className="px-2.5 py-1.5 text-xs rounded border border-[#d1d5db] dark:border-[#3f3f46] bg-white dark:bg-[#18181b] text-black dark:text-white placeholder-[#9ca3af] dark:placeholder-[#71717a]"
                                        />
                                        <input
                                            type="text"
                                            placeholder="URL sub-menu"
                                            value={newSubUrl}
                                            onChange={(e) => setNewSubUrl(e.target.value)}
                                            className="px-2.5 py-1.5 text-xs rounded border border-[#d1d5db] dark:border-[#3f3f46] bg-white dark:bg-[#18181b] text-black dark:text-white placeholder-[#9ca3af] dark:placeholder-[#71717a]"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleAddSubItem}
                                        disabled={!newSubName.trim() || !newSubUrl.trim()}
                                        className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 disabled:opacity-40 text-gray-800 dark:text-gray-200 rounded font-medium transition"
                                    >
                                        + Tambahkan ke Sub-menu
                                    </button>
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
                                    Terapkan Menu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
