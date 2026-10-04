// People attached to a content entry: its authors (frontmatter `author` handles, joined to
// src/data/authors.json and Squeak profiles) and its git contributors.
import { nodes } from '../../data-layer'
import type { AuthorsJsonNode, GitCommit, GitMetadataNode, SqueakProfileNode } from '../../data-layer/types'

export interface AuthorProfile {
    squeakId: number
    firstName: string | null
    lastName: string | null
    companyRole: string | null
    avatar: { url: string } | null
}

export interface Author {
    id: string
    handle: string
    name: string
    role?: string
    link_type?: string
    link_url?: string
    profile_id?: number
    profile: AuthorProfile | null
}

export interface Contributor {
    username: string
    url: string
    avatar?: string
    profile: AuthorProfile | null
}

function profileOf(profile: SqueakProfileNode | undefined): AuthorProfile | null {
    if (!profile) return null
    const { squeakId, firstName, lastName, companyRole, avatar } = profile
    return { squeakId, firstName, lastName, companyRole, avatar: avatar?.url ? { url: avatar.url } : null }
}

let profilesById: Map<number, SqueakProfileNode> | undefined
let profilesByGithub: Map<string, SqueakProfileNode> | undefined

function profiles() {
    if (!profilesById || !profilesByGithub) {
        const all = nodes<SqueakProfileNode>('SqueakProfile')
        profilesById = new Map(all.map((profile) => [profile.squeakId, profile]))
        profilesByGithub = new Map(
            all.filter((profile) => profile.github).map((profile) => [profile.github!.toLowerCase(), profile])
        )
    }
    return { profilesById, profilesByGithub }
}

export function authorsFor(handles: string[] = []): Author[] {
    const authors = new Map(nodes<AuthorsJsonNode>('AuthorsJson').map((author) => [author.handle, author]))
    return handles.flatMap((handle) => {
        const author = authors.get(handle)
        if (!author) return []
        const profile = author.profile_id ? profiles().profilesById.get(author.profile_id) : undefined
        return [{ ...author, profile: profileOf(profile) }]
    })
}

let gitByPath: Map<string, GitMetadataNode> | undefined

/** Contributors and recent commits for a file path relative to the repo root (contents/...). */
export function gitHistory(filePath: string): {
    contributors: Contributor[]
    commits: GitCommit[]
    lastUpdated?: string
} {
    gitByPath ??= new Map(nodes<GitMetadataNode>('GitMetadata').map((node) => [node.path, node]))
    const history = gitByPath.get(filePath)
    if (!history) return { contributors: [], commits: [] }
    const contributors = history.contributors.map((contributor) => ({
        ...contributor,
        profile: profileOf(profiles().profilesByGithub.get(contributor.url.toLowerCase())),
    }))
    return { contributors, commits: history.commits, lastUpdated: history.gitLogLatestDate }
}
