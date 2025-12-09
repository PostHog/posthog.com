import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type Region, type Space, getRegionById, getSpaceById } from '../data/journeyData'

interface JourneyState {
    // Selection state
    selectedRegionId: string | null
    selectedSpaceId: string | null

    // Progress tracking
    completedSpaces: string[]
    completedChecklistItems: string[]

    // Timestamps
    startedAt: string | null
    lastUpdatedAt: string | null

    // Computed getters (as functions since Zustand doesn't have computed)
    getSelectedRegion: () => Region | null
    getSelectedSpace: () => Space | null
    isSpaceCompleted: (spaceId: string) => boolean
    isChecklistItemCompleted: (itemId: string) => boolean
    getRegionProgress: (regionId: string) => { completed: number; total: number }

    // Actions
    selectRegion: (regionId: string | null) => void
    selectSpace: (spaceId: string | null) => void
    toggleChecklistItem: (itemId: string) => void
    completeSpace: (spaceId: string) => void
    uncompleteSpace: (spaceId: string) => void
    reset: () => void
}

const initialState = {
    selectedRegionId: null,
    selectedSpaceId: null,
    completedSpaces: [],
    completedChecklistItems: [],
    startedAt: null,
    lastUpdatedAt: null,
}

export const useJourneyStore = create<JourneyState>()(
    persist(
        (set, get) => ({
            ...initialState,

            // Computed getters
            getSelectedRegion: () => {
                const { selectedRegionId } = get()
                return selectedRegionId ? getRegionById(selectedRegionId) ?? null : null
            },

            getSelectedSpace: () => {
                const { selectedSpaceId } = get()
                return selectedSpaceId ? getSpaceById(selectedSpaceId) ?? null : null
            },

            isSpaceCompleted: (spaceId: string) => {
                return get().completedSpaces.includes(spaceId)
            },

            isChecklistItemCompleted: (itemId: string) => {
                return get().completedChecklistItems.includes(itemId)
            },

            getRegionProgress: (regionId: string) => {
                const region = getRegionById(regionId)
                if (!region) return { completed: 0, total: 0 }

                const { completedSpaces } = get()
                const completed = region.spaces.filter((space) => completedSpaces.includes(space.id)).length

                return { completed, total: region.spaces.length }
            },

            // Actions
            selectRegion: (regionId) => {
                const now = new Date().toISOString()
                set((state) => ({
                    selectedRegionId: regionId,
                    selectedSpaceId: null,
                    startedAt: state.startedAt ?? now,
                    lastUpdatedAt: now,
                }))
            },

            selectSpace: (spaceId) => {
                const now = new Date().toISOString()
                set((state) => ({
                    selectedSpaceId: spaceId,
                    startedAt: state.startedAt ?? now,
                    lastUpdatedAt: now,
                }))
            },

            toggleChecklistItem: (itemId) => {
                const now = new Date().toISOString()
                set((state) => ({
                    completedChecklistItems: state.completedChecklistItems.includes(itemId)
                        ? state.completedChecklistItems.filter((id) => id !== itemId)
                        : [...state.completedChecklistItems, itemId],
                    lastUpdatedAt: now,
                }))
            },

            completeSpace: (spaceId) => {
                const now = new Date().toISOString()
                set((state) => ({
                    completedSpaces: state.completedSpaces.includes(spaceId)
                        ? state.completedSpaces
                        : [...state.completedSpaces, spaceId],
                    lastUpdatedAt: now,
                }))
            },

            uncompleteSpace: (spaceId) => {
                const now = new Date().toISOString()
                set((state) => ({
                    completedSpaces: state.completedSpaces.filter((id) => id !== spaceId),
                    lastUpdatedAt: now,
                }))
            },

            reset: () => {
                set(initialState)
            },
        }),
        {
            name: 'posthog-journey-progress',
        }
    )
)
