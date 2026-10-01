import React from 'react'
import { graphql } from 'gatsby'
import MCPLeaderboard from '../../components/MCPLeaderboard'
import { LeaderboardRow } from '../../components/MCPLeaderboard/data'

interface Props {
    data: {
        mcpLeaderboard: {
            rows: LeaderboardRow[]
            queries: { name: string; query: string | null }[]
            fetchedAt: string | null
        } | null
    }
}

export default function MCPLeaderboardPage({ data }: Props): JSX.Element {
    return (
        <MCPLeaderboard
            rows={data.mcpLeaderboard?.rows ?? []}
            queries={data.mcpLeaderboard?.queries ?? []}
            fetchedAt={data.mcpLeaderboard?.fetchedAt ?? null}
        />
    )
}

export const query = graphql`
    {
        mcpLeaderboard {
            rows {
                week
                facet
                grp
                label
                calls_pct
                users_pct
                error_rate_pct
                p50_ms
                p95_ms
                calls_index
                users_index
            }
            queries {
                name
                query
            }
            fetchedAt
        }
    }
`
