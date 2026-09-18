import { useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import useProduct from './useProduct'
import { skillsData, IncomingSkill } from './skillsData'
import {
    SkillResourceRef,
    ResolvedResource,
    toolStringToResource,
    mcpToolToProductHandle,
    resolveSkillResource,
    resolveSkillResources,
    fallbackResolvedResource,
} from './skillsResourceRegistry'

export type { SkillResourceRef, ResolvedResource } from './skillsResourceRegistry'

export type Skill = {
    id: string
    name: string
    /** Company stage: MVP | Startup | Scale | Enterprise */
    stage: string
    /** Departments / personas this skill serves (also the department dimension) */
    tags: string[]
    description: string
    resources: SkillResourceRef[]
    /** Ordered PostHog MCP tool handles */
    flow: string[]
    example_prompts?: string[]
}

/** A canonical agent skill ingested from the monorepo (`products/<product>/skills/<name>/SKILL.md`). */
export type AgentSkill = {
    product: string
    name: string
    description: string
    sourcePath: string
    mcpTools: string[]
}

/** Company growth stages, in canonical (non-alphabetical) order. */
export const STAGE_ORDER = ['MVP', 'Startup', 'Scale', 'Enterprise']

export function stageRank(stage: string): number {
    const index = STAGE_ORDER.indexOf(stage)
    return index === -1 ? STAGE_ORDER.length : index
}

export function slugifySkillName(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
}

function splitList(value: string): string[] {
    return value
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean)
}

function normalizeIncomingSkills(raw: IncomingSkill[]): Skill[] {
    const usedIds = new Set<string>()
    return raw.map((skill) => {
        let id = slugifySkillName(skill.name)
        if (usedIds.has(id)) {
            let suffix = 2
            while (usedIds.has(`${id}-${suffix}`)) suffix += 1
            id = `${id}-${suffix}`
        }
        usedIds.add(id)
        return {
            id,
            name: skill.name,
            stage: skill.stage,
            tags: skill.tags,
            description: skill.description,
            resources: splitList(skill.tools_used).map(toolStringToResource),
            flow: splitList(skill.flow),
            example_prompts: skill.example_prompts,
        }
    })
}

export const skills: Skill[] = normalizeIncomingSkills(skillsData)

export function useSkills(): Skill[] {
    return useMemo(() => skills, [])
}

export type OutcomeTreeNode = {
    type: 'department' | 'category' | 'skill'
    id: string
    name: string
    skill?: Skill
    children?: OutcomeTreeNode[]
}

/**
 * Groups skills as department (persona) → stage → skill. A skill appears under
 * every department (tag) it serves, since department and persona are the same
 * concept.
 */
export function buildOutcomeTree(skillList: Skill[]): OutcomeTreeNode[] {
    const departments = new Map<string, Map<string, Skill[]>>()

    for (const skill of skillList) {
        for (const department of skill.tags) {
            if (!departments.has(department)) {
                departments.set(department, new Map())
            }
            const stages = departments.get(department)!
            if (!stages.has(skill.stage)) {
                stages.set(skill.stage, [])
            }
            stages.get(skill.stage)!.push(skill)
        }
    }

    return Array.from(departments.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([department, stages]) => ({
            type: 'department' as const,
            id: slugifySkillName(department),
            name: department,
            children: Array.from(stages.entries())
                .sort(([a], [b]) => stageRank(a) - stageRank(b))
                .map(([stage, stageSkills]) => ({
                    type: 'category' as const,
                    id: `${slugifySkillName(department)}--${slugifySkillName(stage)}`,
                    name: stage,
                    children: stageSkills
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((s) => ({
                            type: 'skill' as const,
                            id: s.id,
                            name: s.name,
                            skill: s,
                        })),
                })),
        }))
}

export type ProductTreeEntry = {
    handle: string
    name: string
    skills: Skill[]
}

export function buildProductTree(skillList: Skill[]): ProductTreeEntry[] {
    const byHandle = new Map<string, Skill[]>()

    for (const skill of skillList) {
        for (const ref of skill.resources) {
            const existing = byHandle.get(ref.handle) || []
            if (!existing.some((s) => s.id === skill.id)) {
                existing.push(skill)
            }
            byHandle.set(ref.handle, existing)
        }
    }

    return Array.from(byHandle.entries())
        .map(([handle, productSkills]) => ({
            handle,
            name: productSkills[0].resources.find((r) => r.handle === handle)?.label || handle,
            skills: productSkills.sort((a, b) => a.name.localeCompare(b.name)),
        }))
        .sort((a, b) => a.name.localeCompare(b.name))
}

export function getRelatedSkills(skill: Skill, allSkills: Skill[], limit = 6): Skill[] {
    const handles = new Set(skill.resources.map((r) => r.handle))
    const tags = new Set(skill.tags)
    const scored = allSkills
        .filter((s) => s.id !== skill.id)
        .map((s) => {
            const overlap = s.resources.filter((r) => handles.has(r.handle)).length
            const sharedTags = s.tags.filter((t) => tags.has(t)).length
            const sameStage = s.stage === skill.stage ? 1 : 0
            return { skill: s, score: overlap * 2 + sharedTags + sameStage }
        })
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)

    return scored.slice(0, limit).map((x) => x.skill)
}

type AllProducts = Array<{
    handle: string
    name: string
    Icon?: React.ComponentType<{ className?: string }>
    color?: string
    slug?: string
}>

export function useResolveSkillResources(refs: SkillResourceRef[]): ResolvedResource[] {
    const allProducts = useProduct() as AllProducts

    return useMemo(() => {
        return refs.map((ref) => {
            const resolved = resolveSkillResource(ref, allProducts)
            return resolved ?? fallbackResolvedResource(ref)
        })
    }, [refs, allProducts])
}

export function useAllProductResources(): ResolvedResource[] {
    const allProducts = useProduct() as AllProducts

    return useMemo(() => {
        const handles = new Set<string>()
        for (const skill of skills) {
            for (const ref of skill.resources) {
                handles.add(ref.handle)
            }
        }
        return Array.from(handles)
            .map((handle) => {
                const ref = { handle }
                return resolveSkillResource(ref, allProducts) ?? fallbackResolvedResource(ref)
            })
            .sort((a, b) => a.name.localeCompare(b.name))
    }, [allProducts])
}

const allAgentSkillsQuery = graphql`
    query {
        allAgentSkill {
            nodes {
                product
                name
                description
                sourcePath
                mcpTools
            }
        }
    }
`

/** Canonical agent skills ingested from the monorepo at build time (may be empty). */
export function useAgentSkills(): AgentSkill[] {
    const data = useStaticQuery(allAgentSkillsQuery)
    return useMemo(() => (data?.allAgentSkill?.nodes ?? []) as AgentSkill[], [data])
}

/** Monorepo product folder → posthog.com product handle (for flow-tool enrichment) */
const FOLDER_TO_HANDLE: Record<string, string> = {
    session_replay: 'session_replay',
    replay: 'session_replay',
    replay_vision: 'session_replay',
    desktop_recordings: 'session_replay',
    session_summaries: 'session_replay',
    error_tracking: 'error_tracking',
    llm_analytics: 'ai_observability',
    ai_observability: 'ai_observability',
    feature_flags: 'feature_flags',
    early_access_features: 'early_access',
    experiments: 'experiments',
    surveys: 'surveys',
    web_analytics: 'web_analytics',
    marketing_analytics: 'web_analytics',
    product_analytics: 'product_analytics',
    core_events: 'product_analytics',
    cohorts: 'product_analytics',
    actions: 'product_analytics',
    event_definitions: 'product_analytics',
    metrics: 'product_analytics',
    persons: 'profiles',
    data_warehouse: 'data_warehouse',
    warehouse_sources: 'data_warehouse',
    data_modeling: 'data_modeling',
    batch_exports: 'data_warehouse',
    exports: 'data_warehouse',
    cdp: 'cdp',
    messaging: 'cdp',
    links: 'cdp',
    logs: 'logs',
    notebooks: 'notebooks',
    dashboards: 'dashboards',
    endpoints: 'endpoints',
    conversations: 'support',
    user_interviews: 'user_interviews',
    tracing: 'trace_monitoring',
}

export type ResolvedFlowTool = {
    tool: string
    product: ResolvedResource | null
}

/**
 * Returns a resolver that maps each `flow` MCP tool to the product it belongs
 * to (icon, color, link). Resolution order: the deterministic prefix map, then
 * any gaps filled from the ingested monorepo skills (tool → product folder).
 */
export function useFlowToolResolver(): (tool: string) => ResolvedFlowTool {
    const allProducts = useProduct() as AllProducts
    const agentSkills = useAgentSkills()

    return useMemo(() => {
        const ingestedToolHandle = new Map<string, string>()
        for (const agentSkill of agentSkills) {
            const handle = FOLDER_TO_HANDLE[agentSkill.product]
            if (!handle) continue
            for (const tool of agentSkill.mcpTools) {
                if (!ingestedToolHandle.has(tool)) ingestedToolHandle.set(tool, handle)
            }
        }

        return (tool: string): ResolvedFlowTool => {
            const handle = mcpToolToProductHandle(tool) ?? ingestedToolHandle.get(tool) ?? null
            const product = handle ? resolveSkillResource({ handle }, allProducts) : null
            return { tool, product }
        }
    }, [allProducts, agentSkills])
}

/** For Fuse search — flatten skill + resolved resource names */
export function skillSearchBlob(skill: Skill, allProducts: Parameters<typeof resolveSkillResource>[1]): string {
    const resolved = resolveSkillResources(skill.resources, allProducts)
    const resourceNames = resolved.map((r) => r.name).join(' ')
    return [
        skill.name,
        skill.description,
        skill.stage,
        skill.tags.join(' '),
        resourceNames,
        skill.resources.map((r) => r.handle).join(' '),
        (skill.example_prompts ?? []).join(' '),
        skill.flow.join(' '),
    ].join(' ')
}
