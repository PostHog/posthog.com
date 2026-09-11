// Wistia keeps a player registered and its timers running until remove() is called.
// A wrapper that only detaches the container leaves the vendor script firing events
// at DOM nodes that no longer exist, which throws inside Wistia's own event relay.
// remove() takes the embed element with it.
export function removeWistiaPlayer(player: { remove?: () => void } | null | undefined): void {
    if (!player) return

    try {
        player.remove()
    } catch {
        // The player can already be gone. Teardown must not throw.
    }
}
