import teamCrestsJson from '@data/people-team-crests.json'
import type { TeamCrests } from '~/data-layer/queries/people'

// Crests are Cloudinary uploads.
const teamCrests = teamCrestsJson as Record<keyof TeamCrests, `https://res.cloudinary.com/${string}`>

/** Team name -> crest URL. */
export default function useTeamCrestMap(): typeof teamCrests {
    return teamCrests
}
