import { graphql, useStaticQuery } from 'gatsby'

export type SqueakProfile = {
    squeakId: number
    firstName: string
    lastName: string
    companyRole?: string
    color?: string
    avatar?: { formats?: { thumbnail?: { url?: string } }; url?: string }
}

type RawProfile = {
    squeakId: number
    firstName: string
    lastName: string
    companyRole?: string
    color?: string
    avatar?: { formats?: { thumbnail?: { url?: string } }; url?: string }
}

export function useSqueakProfiles(): SqueakProfile[] {
    const data = useStaticQuery(graphql`
        {
            profiles: allSqueakProfile {
                nodes {
                    squeakId
                    firstName
                    lastName
                    companyRole
                    color
                    avatar {
                        url
                        formats {
                            thumbnail {
                                url
                            }
                        }
                    }
                }
            }
        }
    `)
    return (data.profiles.nodes as RawProfile[]).filter((p) => p.firstName)
}

export function searchProfiles(profiles: SqueakProfile[], query: string): SqueakProfile[] {
    if (!query.trim()) return profiles.slice(0, 12)
    const q = query.toLowerCase().trim()
    const scored = profiles
        .map((p) => {
            const full = `${p.firstName} ${p.lastName || ''}`.toLowerCase()
            if (full === q) return { p, score: 0 }
            if (full.startsWith(q)) return { p, score: 1 }
            if (full.includes(q)) return { p, score: 2 }
            return null
        })
        .filter((x): x is { p: SqueakProfile; score: number } => !!x)
        .sort((a, b) => a.score - b.score)
        .slice(0, 12)
    return scored.map((x) => x.p)
}

export function profileAvatarUrl(p: SqueakProfile, prefer: 'full' | 'thumb' = 'full'): string | undefined {
    if (prefer === 'thumb') return p.avatar?.formats?.thumbnail?.url || p.avatar?.url
    return p.avatar?.url || p.avatar?.formats?.thumbnail?.url
}
