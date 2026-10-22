import names from './names.json'

export type Leader = { name: string; score: number; pending?: boolean }

const pick = (list: string[], random: () => number) => list[Math.floor(random() * list.length)]

// A funny hedgehog pilot name, like "Admiral Pincushion". Players cannot type their own name, so the
// leaderboard can only show names from this list.
export const randomPilot = (random = Math.random): string => `${pick(names.first, random)} ${pick(names.last, random)}`
