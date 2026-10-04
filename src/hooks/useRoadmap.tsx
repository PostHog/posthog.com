import teamRoadmapsJson from '@data/roadmap-team-roadmaps.json'
import type { TeamRoadmaps } from '~/data-layer/queries/roadmap'

export type Roadmap = TeamRoadmaps[number]['roadmaps'][number]

const teams = teamRoadmapsJson as TeamRoadmaps

/** Small teams with their in-progress roadmap items (projected, not complete). */
export const useRoadmap = (): TeamRoadmaps => teams
