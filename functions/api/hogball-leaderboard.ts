import { GAME_ORIGIN, getLeaderboard, LEADERBOARD_CACHE_CONTROL } from '../../api/_hogball-leaderboard'

export const onRequestGet = async ({ env }: { env: Record<string, string | undefined> }): Promise<Response> => {
    try {
        return Response.json(await getLeaderboard(env), {
            headers: { 'Cache-Control': LEADERBOARD_CACHE_CONTROL, 'Access-Control-Allow-Origin': GAME_ORIGIN },
        })
    } catch (error) {
        console.error('Error fetching the Hogball leaderboard:', error)
        return Response.json(
            { error: 'Failed to fetch the Hogball leaderboard' },
            { status: 502, headers: { 'Access-Control-Allow-Origin': GAME_ORIGIN } }
        )
    }
}
