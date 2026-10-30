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

// Canonical definitions live in lib/strapi so it can type UserData.wallet without
// importing from components/. Re-exported here for existing importers.
export type { TransactionMetadata, Transaction, Wallet } from 'lib/strapi'
