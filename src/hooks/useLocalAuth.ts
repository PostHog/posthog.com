import { useState, useEffect, useCallback } from 'react'

export interface LocalUser {
    id: string
    username: string
    email: string
    name: string
    role: 'admin' | 'user'
    avatar?: string
    createdAt?: string
}

const STORAGE_KEY = 'posthog_auth_user'

export function getStoredUser(): LocalUser | null {
    if (typeof window === 'undefined') return null
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
            return JSON.parse(raw)
        }
    } catch (e) {
        console.error('Error reading stored user:', e)
    }
    return null
}

export function setStoredUser(user: LocalUser | null) {
    if (typeof window === 'undefined') return
    try {
        if (user) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
        } else {
            localStorage.removeItem(STORAGE_KEY)
        }
        window.dispatchEvent(new Event('auth_change'))
    } catch (e) {
        console.error('Error saving user to storage:', e)
    }
}

export function useLocalAuth() {
    const [user, setUserState] = useState<LocalUser | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    // Load initial user on mount
    useEffect(() => {
        setUserState(getStoredUser())
        setLoading(false)

        const handleAuthChange = () => {
            setUserState(getStoredUser())
        }

        window.addEventListener('auth_change', handleAuthChange)
        window.addEventListener('storage', handleAuthChange)

        return () => {
            window.removeEventListener('auth_change', handleAuthChange)
            window.removeEventListener('storage', handleAuthChange)
        }
    }, [])

    const login = useCallback(async (usernameOrEmail: string, password: string) => {
        const res = await fetch('/api/auth?action=login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usernameOrEmail, password }),
        })

        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.error || 'Login gagal.')
        }

        const loggedInUser: LocalUser = data.user
        setStoredUser(loggedInUser)
        setUserState(loggedInUser)
        return loggedInUser
    }, [])

    const register = useCallback(
        async (credentials: { username: string; email: string; name: string; password: string }) => {
            const res = await fetch('/api/auth?action=register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            })

            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.error || 'Pendaftaran gagal.')
            }

            const newUser: LocalUser = data.user
            setStoredUser(newUser)
            setUserState(newUser)
            return newUser
        },
        []
    )

    const logout = useCallback(() => {
        setStoredUser(null)
        setUserState(null)
    }, [])

    const updateUser = useCallback((updated: LocalUser) => {
        setStoredUser(updated)
        setUserState(updated)
    }, [])

    const isAdmin = Boolean(user && user.role === 'admin')
    const isUser = Boolean(user && user.role === 'user')
    const isLoggedIn = Boolean(user)

    return {
        user,
        loading,
        isLoggedIn,
        isAdmin,
        isUser,
        login,
        register,
        logout,
        updateUser,
    }
}
