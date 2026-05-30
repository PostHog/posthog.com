export type SceneId = 'title' | 'overworld' | 'level1' | 'level2' | 'level3' | 'level4' | 'level5'

export interface ChecklistItem {
    id: string
    label: string
    completed: boolean
}

export interface LevelProgress {
    unlocked: boolean
    completed: boolean
    progress: number // 0-100
    checklistItems: ChecklistItem[]
}

export interface Resource {
    id: string
    type: 'blog' | 'video' | 'customer-story' | 'product' | 'handbook'
    title: string
    description: string
    url: string
    image?: string
    icon?: string // Icon name from @posthog/icons (e.g., 'IconGraph')
    iconColor?: string // CSS color for the icon (e.g., '#3b82f6')
    company?: string // For customer stories and products
    quote?: string // For customer stories
}

export interface Quest {
    id: string
    title: string
    description: string
    command?: string // For CLI commands like npx wizard
    completed: boolean
}

export interface HoverCharacter {
    image: string
    dialogue: string
    name?: string // Character name for the dialogue
}

export interface LevelData {
    id: string
    name: string
    theme: string
    description: string
    illustration?: string
    quest: Quest
    products?: Resource[]
    resources: Resource[]
    checklistItems: ChecklistItem[]
    maxWisdom?: string // Tip from Max the hedgehog
    hoverCharacter?: HoverCharacter // Character that appears on hover in overworld
}

export interface SavedResource extends Resource {
    savedAt: Date
}

export interface GameState {
    currentScene: SceneId
    levels: Record<string, LevelProgress>
    lives: number
    inventory: SavedResource[]
    selectedCharacter: string
}

export interface GameActions {
    navigateToScene: (scene: SceneId) => void
    navigateToOverworld: () => void
    completeChecklistItem: (levelId: string, itemId: string) => void
    completeLevel: (levelId: string) => void
    unlockLevel: (levelId: string) => void
    saveResource: (resource: Resource) => void
    removeFromInventory: (resourceId: string) => void
    loseLife: () => void
    gainLife: () => void
}
