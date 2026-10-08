import { SQUEAK_HOST } from 'lib/strapi'
import type { Placement } from './layout'

export type Laptop = { placements: Placement[]; maxStickers: number }
export type PlacementRequest = { stickerId: number; x: number; y: number; rotation: number; requestId: string }

export async function laptopRequest<T>(
    path: string,
    token?: string | null,
    body?: PlacementRequest | Record<string, never>
): Promise<T> {
    const response = await fetch(`${SQUEAK_HOST}/api/${path}`, {
        method: body ? 'POST' : 'GET',
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(body ? { 'Content-Type': 'application/json' } : {}),
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
        signal: AbortSignal.timeout(15000),
    })
    const result = await response.json()
    if (!response.ok)
        throw Object.assign(new Error(result.error?.message || 'Could not load your stickers. Please try again.'), {
            status: response.status,
        })
    return result.data
}
