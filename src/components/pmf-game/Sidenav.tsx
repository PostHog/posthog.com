import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { GameState, GameActions, SavedResource } from '../../data/pmf-game/types'
import { LEVELS } from '../../data/pmf-game/levels'
import PixelBorder from './PixelBorder'
import * as Icons from '@posthog/icons'

const { IconX, IconExternal } = Icons

interface SidenavProps {
    gameState: GameState
    actions: GameActions
}

function NavButton({
    icon,
    iconUrl,
    title,
    subtitle,
    onClick,
    active = false,
}: {
    icon?: string
    iconUrl?: string
    title: string
    subtitle: string
    onClick?: () => void
    active?: boolean
}) {
    return (
        <PixelBorder
            as="button"
            onClick={onClick}
            className={`w-full text-left py-1 px-2 transition-all ${active ? '' : 'hover:scale-[1.02]'}`}
            backgroundColor={active ? '#FEF3C7' : 'white'}
        >
            <div className="flex items-center justify-between">
                <div>
                    <div className={`font-bold text-sm ${active ? 'text-orange' : ''}`}>{title}</div>
                    <div className="text-xs opacity-70">{subtitle}</div>
                </div>

                {iconUrl ? (
                    <img src={iconUrl} alt="" className="m-0 ml-auto" />
                ) : (
                    <span className="text-2xl ml-auto">{icon}</span>
                )}
            </div>
        </PixelBorder>
    )
}

function PixelHeart({ fillPercent }: { fillPercent: number }) {
    const filledColor = '#F54E00'
    const emptyColor = '#e5e7eb'
    const borderColor = '#1d1d1d'

    // Fill from bottom to top based on %
    const fillHeight = (fillPercent / 100) * 9
    const fillY = 10 - fillHeight

    return (
        <svg width="36" height="33" viewBox="0 0 12 11" style={{ imageRendering: 'pixelated' }}>
            {/* Black border - outer edge */}
            <rect x="2" y="0" width="2" height="1" fill={borderColor} />
            <rect x="6" y="0" width="2" height="1" fill={borderColor} />
            <rect x="1" y="1" width="1" height="1" fill={borderColor} />
            <rect x="4" y="1" width="2" height="1" fill={borderColor} />
            <rect x="8" y="1" width="1" height="1" fill={borderColor} />
            <rect x="0" y="2" width="1" height="2" fill={borderColor} />
            <rect x="9" y="2" width="1" height="2" fill={borderColor} />
            <rect x="0" y="4" width="1" height="1" fill={borderColor} />
            <rect x="9" y="4" width="1" height="1" fill={borderColor} />
            <rect x="1" y="5" width="1" height="1" fill={borderColor} />
            <rect x="8" y="5" width="1" height="1" fill={borderColor} />
            <rect x="2" y="6" width="1" height="1" fill={borderColor} />
            <rect x="7" y="6" width="1" height="1" fill={borderColor} />
            <rect x="3" y="7" width="1" height="1" fill={borderColor} />
            <rect x="6" y="7" width="1" height="1" fill={borderColor} />
            <rect x="4" y="8" width="1" height="1" fill={borderColor} />
            <rect x="5" y="8" width="1" height="1" fill={borderColor} />

            {/* Empty heart fill */}
            <rect x="2" y="1" width="2" height="1" fill={emptyColor} />
            <rect x="6" y="1" width="2" height="1" fill={emptyColor} />
            <rect x="1" y="2" width="8" height="2" fill={emptyColor} />
            <rect x="1" y="4" width="8" height="1" fill={emptyColor} />
            <rect x="2" y="5" width="6" height="1" fill={emptyColor} />
            <rect x="3" y="6" width="4" height="1" fill={emptyColor} />
            <rect x="4" y="7" width="2" height="1" fill={emptyColor} />

            {/* Filled portion */}
            <clipPath id={`heartFill-${fillPercent}`}>
                <rect x="0" y={fillY} width="12" height={fillHeight + 1} />
            </clipPath>
            <g clipPath={`url(#heartFill-${fillPercent})`}>
                <rect x="2" y="1" width="2" height="1" fill={filledColor} />
                <rect x="6" y="1" width="2" height="1" fill={filledColor} />
                <rect x="1" y="2" width="8" height="2" fill={filledColor} />
                <rect x="1" y="4" width="8" height="1" fill={filledColor} />
                <rect x="2" y="5" width="6" height="1" fill={filledColor} />
                <rect x="3" y="6" width="4" height="1" fill={filledColor} />
                <rect x="4" y="7" width="2" height="1" fill={filledColor} />
            </g>
        </svg>
    )
}

function ProgressHearts({ progress }: { progress: number }) {
    // 3 hearts, 33.33 progress per heart
    const getHeartFill = (heartIndex: number) => {
        const heartStart = heartIndex * 33.33
        const heartEnd = (heartIndex + 1) * 33.33
        if (progress >= heartEnd) return 100
        if (progress <= heartStart) return 0
        return ((progress - heartStart) / 33.33) * 100
    }

    return (
        <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
                {[0, 1, 2].map((i) => (
                    <PixelHeart key={i} fillPercent={getHeartFill(i)} />
                ))}
            </div>
            <span className="text-sm font-bold ml-1">{progress}% complete</span>
        </div>
    )
}

function ChecklistItem({
    item,
    isLast,
    onClick,
}: {
    item: { id: string; label: string; completed: boolean }
    isLast: boolean
    onClick: () => void
}) {
    return (
        <div className="flex">
            {/* Checkbox column with connecting line */}
            <div className="flex flex-col items-center mr-2 w-4">
                <button
                    onClick={onClick}
                    className={`w-4 h-4 border-2 border-black flex-shrink-0 cursor-pointer hover:bg-red-200 transition-colors ${
                        item.completed ? 'bg-red' : 'bg-white'
                    }`}
                />
                {/* Connecting line to next item */}
                {!isLast && <div className="w-0.5 flex-1 min-h-6 bg-black" />}
            </div>
            {/* Label */}
            <div className="text-sm leading-4">
                <span className={item.completed ? 'line-through opacity-50' : ''}>{item.label}</span>
            </div>
        </div>
    )
}

function InventoryItem({
    item,
    onRemove,
    isPermanent = false,
}: {
    item: SavedResource
    onRemove?: () => void
    isPermanent?: boolean
}) {
    const isHandbook = item.id === 'posthog-handbook'

    return (
        <div className="flex items-center gap-2 py-2 px-2 hover:bg-accent/50 rounded transition-colors group">
            {isHandbook && item.image && (
                <img src={item.image} alt="" className="size-5 flex-shrink-0 object-contain" />
            )}
            <a
                href={item.url}
                className="flex-1 min-w-0 text-sm font-medium truncate hover:text-orange flex items-center gap-1"
            >
                {item.title}
                <IconExternal className="size-3 opacity-50 flex-shrink-0" />
            </a>
            {!isPermanent && onRemove && (
                <button
                    onClick={onRemove}
                    className="p-1 hover:bg-red-100 rounded transition-colors flex-shrink-0"
                    title="Remove from inventory"
                >
                    <IconX className="size-4 opacity-40 group-hover:opacity-100" />
                </button>
            )}
        </div>
    )
}

function InventorySlideout({
    inventory,
    onRemove,
    onClose,
    isOpen,
}: {
    inventory: SavedResource[]
    onRemove: (id: string) => void
    onClose: () => void
    isOpen: boolean
}) {
    // Use portal to render into the main game area
    if (typeof document === 'undefined') return null

    const container = document.getElementById('pmf-game-main')
    if (!container) return null

    const hasHandbook = inventory.some((item) => item.id === 'posthog-handbook')

    return createPortal(
        <>
            {/* Backdrop to close when clicking outside */}
            <div
                className={`absolute inset-0 z-40 bg-black/20 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onClose}
            />

            {/* Slideout panel - slides from left edge */}
            <div
                className={`absolute top-0 bottom-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : '-translate-x-[calc(100%+10px)]'
                }`}
            >
                <div className="h-full bg-white w-72 flex flex-col border-r-2 border-black shadow-lg">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-black/10">
                        <span className="font-bold">Inventory</span>
                        <button onClick={onClose} className="p-1 hover:bg-accent rounded">
                            <IconX className="size-4" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-auto p-3">
                        {/* Handbook - shown if user accepted it */}
                        {inventory
                            .filter((i) => i.id === 'posthog-handbook')
                            .map((handbookItem) => (
                                <InventoryItem key={handbookItem.id} item={handbookItem} isPermanent />
                            ))}

                        {/* Divider if there are other items */}
                        {hasHandbook && inventory.length > 1 && <div className="border-t border-black/10 my-2" />}

                        {/* Regular saved items */}
                        {inventory
                            .filter((item) => item.id !== 'posthog-handbook')
                            .map((item) => (
                                <InventoryItem key={item.id} item={item} onRemove={() => onRemove(item.id)} />
                            ))}

                        {inventory.length === 0 && (
                            <p className="text-sm opacity-50 text-center py-4">
                                Your inventory is empty.
                                <br />
                                Save resources with "Read later"
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>,
        container
    )
}

export default function Sidenav({ gameState, actions }: SidenavProps): JSX.Element {
    const [showInventory, setShowInventory] = useState(false)
    const { currentScene, levels, inventory } = gameState
    const isInLevel = currentScene.startsWith('level')
    const currentLevelId = isInLevel ? currentScene : null
    const currentLevel = currentLevelId ? LEVELS.find((l) => l.id === currentLevelId) : null

    // Calculate current level progress based on completed checklist items
    const currentLevelProgress = (() => {
        if (!currentLevelId || !currentLevel) return 0
        const checklistItems = levels[currentLevelId]?.checklistItems || []
        const completedCount = checklistItems.filter((item) => item.completed).length
        const totalCount = checklistItems.length
        return totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
    })()

    return (
        <div className="flex flex-col h-full">
            <button
                onClick={() => actions.navigateToScene('title')}
                className="p-2 text-sm font-bold flex items-center gap-2 text-left opacity-50 hover:opacity-100 transition-opacity"
            >
                ← Exit game
            </button>

            <div className="flex flex-col gap-2 p-2">
                <NavButton
                    iconUrl="https://res.cloudinary.com/dmukukwp6/image/upload/map_d480208b70.svg"
                    title="World Map"
                    subtitle="Select another track"
                    onClick={() => {
                        setShowInventory(false)
                        actions.navigateToOverworld()
                    }}
                    active={currentScene === 'overworld'}
                />
                <NavButton
                    iconUrl="https://res.cloudinary.com/dmukukwp6/image/upload/folder_b86a35bb72.svg"
                    title="Inventory"
                    subtitle={`${inventory.length} saved`}
                    onClick={() => setShowInventory(!showInventory)}
                    active={showInventory}
                />
                <InventorySlideout
                    inventory={inventory}
                    onRemove={actions.removeFromInventory}
                    onClose={() => setShowInventory(false)}
                    isOpen={showInventory}
                />
                <NavButton
                    iconUrl="https://res.cloudinary.com/dmukukwp6/image/upload/classic_5f0ab23b3d.svg"
                    title="Character"
                    subtitle="Change your hedgehog skin"
                />
                <NavButton
                    iconUrl="https://res.cloudinary.com/dmukukwp6/image/upload/compass2_1b70fa4b99.svg"
                    title="You are here"
                    subtitle="Jump ahead at any time"
                />
            </div>

            <div className="flex-1 overflow-auto">
                {isInLevel && currentLevel ? (
                    // In level: Show checklist
                    <div className="p-2">
                        <div className="font-semibold text-sm opacity-50 mb-2">Checklist</div>
                        {currentLevel.checklistItems.map((item, index) => (
                            <ChecklistItem
                                key={item.id}
                                item={levels[currentLevelId!]?.checklistItems[index] || item}
                                isLast={index === currentLevel.checklistItems.length - 1}
                                onClick={() => actions.completeChecklistItem(currentLevelId!, item.id)}
                            />
                        ))}
                    </div>
                ) : null}
            </div>

            {isInLevel && (
                <div className="p-3">
                    <ProgressHearts progress={currentLevelProgress} />
                </div>
            )}
        </div>
    )
}
