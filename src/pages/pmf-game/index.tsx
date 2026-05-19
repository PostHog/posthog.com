import React, { useState, useCallback, useEffect } from 'react'
import SEO from 'components/seo'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { GameState, GameActions, SceneId, Resource, SavedResource, ChecklistItem } from '../../data/pmf-game/types'
import { LEVELS, getLevelById, getInitialLevelProgress } from '../../data/pmf-game/levels'
import TitleScene from 'components/pmf-game/TitleScene'
import Sidenav from 'components/pmf-game/Sidenav'
import OverworldScene from 'components/pmf-game/OverworldScene'
import LevelScene from 'components/pmf-game/LevelScene'

const STORAGE_KEY = 'posthog-pmf-game-state'

const loadGameState = (): GameState | null => {
    // Using manual localStorage instead of kea-localstorage for now because kea is harder to work with than useState
    // And we don't need that complexity just yet
    if (typeof window === 'undefined') return null
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (!saved) return null
        const parsed = JSON.parse(saved)

        if (parsed.inventory && Array.isArray(parsed.inventory)) {
            parsed.inventory = parsed.inventory.map((item: SavedResource) => ({
                ...item,
                savedAt: item.savedAt ? new Date(item.savedAt) : new Date(),
            }))
        }
        return parsed
    } catch (error) {
        console.warn('Failed to load game state from localStorage:', error)
        return null
    }
}

const saveGameState = (state: GameState): void => {
    if (typeof window === 'undefined') return
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (error) {
        console.warn('Failed to save game state to localStorage:', error)
    }
}

// Find checklist item data including level ID and completeness state
const findChecklistItemWithLevel = (
    itemId: string,
    gameState: GameState
): { levelId: string; item: ChecklistItem } | null => {
    for (const level of LEVELS) {
        const item = level.checklistItems.find((item) => item.id === itemId)
        if (item) {
            const levelProgress = gameState.levels[level.id]
            const currentItem = levelProgress?.checklistItems.find((i) => i.id === itemId)

            return {
                levelId: level.id,
                item: currentItem || item,
            }
        }
    }
    return null
}

export default function PMFGame(): JSX.Element {
    const [gameState, setGameState] = useState<GameState>(() => {
        const saved = loadGameState()
        if (saved) {
            // Ensure all levels exist and checklist items are up-to-date
            const initialProgress = getInitialLevelProgress()
            const mergedLevels: typeof initialProgress = {}

            // Merge saved progress with current level definitions
            for (const levelId of Object.keys(initialProgress)) {
                const initial = initialProgress[levelId]
                const savedLevel = saved.levels[levelId]

                if (!savedLevel) {
                    // New level that wasn't in saved state
                    mergedLevels[levelId] = initial
                } else {
                    // Merge checklist items: use current definitions but preserve completion state
                    const mergedChecklistItems = initial.checklistItems.map((item) => {
                        const savedItem = savedLevel.checklistItems.find((s) => s.id === item.id)
                        return savedItem ? { ...item, completed: savedItem.completed } : item
                    })
                    const completedCount = mergedChecklistItems.filter((item) => item.completed).length
                    const progress =
                        mergedChecklistItems.length > 0
                            ? Math.round((completedCount / mergedChecklistItems.length) * 100)
                            : 0

                    mergedLevels[levelId] = {
                        ...savedLevel,
                        checklistItems: mergedChecklistItems,
                        progress,
                    }
                }
            }

            return {
                ...saved,
                levels: mergedLevels,
            }
        }
        return {
            currentScene: 'title',
            levels: getInitialLevelProgress(),
            lives: 3,
            inventory: [],
            selectedCharacter: 'default',
        }
    })

    // Parse URL parameters and mark checklist items as completed (triggered by clicking "complete quest" buttons in the app)
    useEffect(() => {
        if (typeof window === 'undefined') return

        const params = new URLSearchParams(window.location.search)
        const completedParam = params.get('completed')

        if (!completedParam) return

        // Handle multiple values (comma-separated or multiple params)
        const completedIds = params
            .getAll('completed')
            .flatMap((val) => val.split(','))
            .map((id) => id.trim())

        if (completedIds.length === 0) return
        const completedItemsWithLevelId = completedIds
            .map((id) => findChecklistItemWithLevel(id, gameState))
            .filter((item) => item !== null)

        completedItemsWithLevelId.forEach((itemWithLevelid) => {
            if (itemWithLevelid.item.completed) return
            completeChecklistItem(itemWithLevelid.levelId, itemWithLevelid.item.id)
        })

        // Remove completed parameters from URL after processing
        params.delete('completed')
        const newSearch = params.toString()
        const newUrl = newSearch
            ? `${window.location.pathname}?${newSearch}${window.location.hash}`
            : `${window.location.pathname}${window.location.hash}`

        window.history.replaceState({}, '', newUrl)
    }, [])

    // Save to localStorage whenever gameState changes
    useEffect(() => {
        saveGameState(gameState)
    }, [gameState])

    // Navigation actions
    const navigateToScene = useCallback((scene: SceneId) => {
        setGameState((prev) => ({ ...prev, currentScene: scene }))
    }, [])

    const navigateToOverworld = useCallback(() => {
        setGameState((prev) => ({ ...prev, currentScene: 'overworld' }))
    }, [])

    // Progress actions
    const completeChecklistItem = useCallback((levelId: string, itemId: string) => {
        setGameState((prev) => {
            const levelProgress = prev.levels[levelId]
            if (!levelProgress) return prev

            const updatedItems = levelProgress.checklistItems.map((item) =>
                item.id === itemId ? { ...item, completed: !item.completed } : item
            )
            const completedCount = updatedItems.filter((item) => item.completed).length
            const progress = Math.round((completedCount / updatedItems.length) * 100)

            return {
                ...prev,
                levels: {
                    ...prev.levels,
                    [levelId]: {
                        ...levelProgress,
                        checklistItems: updatedItems,
                        progress,
                    },
                },
            }
        })
    }, [])

    const completeLevel = useCallback((levelId: string) => {
        setGameState((prev) => {
            const levelProgress = prev.levels[levelId]
            if (!levelProgress) return prev

            // Find next level to unlock
            const currentLevelIndex = LEVELS.findIndex((l) => l.id === levelId)
            const nextLevel = LEVELS[currentLevelIndex + 1]

            const updatedLevels = {
                ...prev.levels,
                [levelId]: { ...levelProgress, completed: true, progress: 100 },
            }

            if (nextLevel) {
                updatedLevels[nextLevel.id] = {
                    ...prev.levels[nextLevel.id],
                    unlocked: true,
                }
            }

            return { ...prev, levels: updatedLevels }
        })
    }, [])

    const unlockLevel = useCallback((levelId: string) => {
        setGameState((prev) => ({
            ...prev,
            levels: {
                ...prev.levels,
                [levelId]: { ...prev.levels[levelId], unlocked: true },
            },
        }))
    }, [])

    // Inventory actions
    const saveResource = useCallback((resource: Resource) => {
        setGameState((prev) => {
            if (prev.inventory.some((r) => r.id === resource.id)) return prev
            const savedResource: SavedResource = { ...resource, savedAt: new Date() }
            return { ...prev, inventory: [...prev.inventory, savedResource] }
        })
    }, [])

    const removeFromInventory = useCallback((resourceId: string) => {
        setGameState((prev) => ({
            ...prev,
            inventory: prev.inventory.filter((r) => r.id !== resourceId),
        }))
    }, [])

    // Lives actions
    const loseLife = useCallback(() => {
        setGameState((prev) => ({ ...prev, lives: Math.max(0, prev.lives - 1) }))
    }, [])

    const gainLife = useCallback(() => {
        setGameState((prev) => ({ ...prev, lives: Math.min(3, prev.lives + 1) }))
    }, [])

    const actions: GameActions = {
        navigateToScene,
        navigateToOverworld,
        completeChecklistItem,
        completeLevel,
        unlockLevel,
        saveResource,
        removeFromInventory,
        loseLife,
        gainLife,
    }

    // Render the current scene
    const renderScene = () => {
        const { currentScene, levels } = gameState

        switch (currentScene) {
            case 'title':
                return <TitleScene onStart={() => navigateToScene('overworld')} />
            case 'overworld':
                return <OverworldScene levels={levels} onSelectLevel={navigateToScene} />
            case 'level1':
            case 'level2':
            case 'level3':
            case 'level4':
            case 'level5': {
                const levelData = getLevelById(currentScene)
                const levelNumber = parseInt(currentScene.replace('level', ''), 10)
                if (!levelData) return null
                return (
                    <LevelScene
                        level={levelData}
                        levelNumber={levelNumber}
                        progress={levels[currentScene]}
                        onSaveResource={saveResource}
                        onCompleteChecklist={(itemId) => completeChecklistItem(currentScene, itemId)}
                        savedResourceIds={gameState.inventory.map((r) => r.id)}
                    />
                )
            }
            default:
                return null
        }
    }

    const showSidenav = gameState.currentScene !== 'title'

    return (
        <>
            <SEO
                title="The Product Market Fit Game"
                description="Achieve your wildest dreams: product market fit."
                image={`/images/og/default.png`}
            />
            <div className="@container w-full h-full flex flex-col min-h-1">
                <div data-scheme="secondary" className="flex flex-col @3xl:flex-row flex-grow min-h-0 h-full">
                    {/* Left Sidebar */}
                    {showSidenav && (
                        <aside
                            data-scheme="secondary"
                            className="@3xl:w-64 bg-primary border-t @3xl:border-t-0 @3xl:border-r border-primary h-full prose prose-sm dark:prose-invert flex-shrink-0"
                        >
                            <ScrollArea className="h-full">
                                <Sidenav gameState={gameState} actions={actions} />
                            </ScrollArea>
                        </aside>
                    )}

                    {/* Main Content */}
                    <main
                        data-scheme="primary"
                        className="@container flex-1 bg-primary relative h-full overflow-hidden"
                        id="pmf-game-main"
                    >
                        <ScrollArea className="h-full">{renderScene()}</ScrollArea>
                    </main>
                </div>
            </div>
        </>
    )
}
