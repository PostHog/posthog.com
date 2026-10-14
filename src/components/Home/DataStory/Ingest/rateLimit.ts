export class TokenBucket {
    private readonly capacity: number
    private readonly refillPerSecond: number
    private tokens: number
    private refilledAt: number | null = null

    constructor(capacity: number, refillPerSecond: number) {
        this.capacity = capacity
        this.refillPerSecond = refillPerSecond
        this.tokens = capacity
    }

    take(now: number): boolean {
        if (this.refilledAt !== null) {
            const refill = ((now - this.refilledAt) / 1000) * this.refillPerSecond
            this.tokens = Math.min(this.capacity, this.tokens + refill)
        }
        this.refilledAt = now
        if (this.tokens < 1) {
            return false
        }
        this.tokens -= 1
        return true
    }
}
