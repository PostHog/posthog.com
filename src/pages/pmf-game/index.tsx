import React, { useState, useCallback } from 'react'
import SEO from 'components/seo'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { GameState, GameActions, SceneId, Resource, SavedResource } from './data/types'
import { LEVELS, getLevelById, getInitialLevelProgress } from './data/levels'
import TitleScene from './components/TitleScene'
import Sidenav from './components/Sidenav'
import OverworldScene from './components/OverworldScene'
import LevelScene from './components/LevelScene'

export default function PMFGame(): JSX.Element {
    const [gameState, setGameState] = useState<GameState>({
        currentScene: 'title',
        levels: getInitialLevelProgress(),
        lives: 3,
        inventory: [],
        selectedCharacter: 'default',
    })

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
                item.id === itemId ? { ...item, completed: true } : item
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
                    <main data-scheme="primary" className="@container flex-1 bg-primary relative h-full">
                        <ScrollArea className="h-full">{renderScene()}</ScrollArea>
                    </main>
                </div>
            </div>
        </>
    )
}
