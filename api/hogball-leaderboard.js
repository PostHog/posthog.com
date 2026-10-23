// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getLeaderboard, LEADERBOARD_CACHE_CONTROL } = require('./_hogball-leaderboard')

const handler = async (req, res) => {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET')
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        res.setHeader('Cache-Control', LEADERBOARD_CACHE_CONTROL)
        return res.status(200).json(await getLeaderboard(process.env))
    } catch (error) {
        console.error('Error fetching the Hogball leaderboard:', error)
        return res.status(502).json({ error: 'Failed to fetch the Hogball leaderboard' })
    }
}

// CommonJS (not `export default`) so the Gatsby dev middleware can require() this
module.exports = handler
