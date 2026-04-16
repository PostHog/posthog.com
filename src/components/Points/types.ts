export interface Reward {
    id: string
    handle: string
    title: string
    description: string
    price: number
    image: string
    merchStoreHandle: string | null
    discountAmount: number | null
}

export type RewardCardState = 'idle' | 'confirming' | 'loading' | 'success' | 'error'

export interface TransactionMetadata {
    description?: string
    redemption?: {
        title?: string
        code?: string
    }
    achievement?: {
        iconURL?: string
        title?: string
    }
}
