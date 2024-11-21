import axios from 'axios'

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function scrape(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET')
        res.status(405).json({ success: false, message: 'Method not allowed' })
        return
    }

    // Get company from query parameters
    const company = req.query.company || 'supabase'

    try {
        // Use the company parameter in the URL
        const response = await axios.get(`https://jobs.ashbyhq.com/${company}`)

        // Log which company we're fetching
        console.log(`Fetching jobs for ${company}`)

        // Extract the window.__appData object
        const match = response.data.match(/window\.__appData\s*=\s*({[^;]+})/)
        if (!match) {
            throw new Error(`Could not find job data in response for ${company}`)
        }

        // Parse the job data
        const jobData = JSON.parse(match[1])
        const jobs = jobData?.jobBoard?.jobPostings || []

        // Log the extracted jobs
        console.log(`Found ${jobs.length} jobs for ${company}`)

        res.status(200).json({
            success: true,
            jobs: jobs,
            company: company, // Include company in response for debugging
        })
    } catch (error) {
        // Detailed error logging
        console.error(`API Error for ${company}:`, {
            message: error.message,
            name: error.name,
            stack: error.stack,
            response: error.response?.data ? 'Has response data' : 'No response data',
            status: error.response?.status,
        })

        res.status(500).json({
            success: false,
            message: `Error scraping jobs for ${company}`,
            details: error.message,
        })
    }
}

const ATS_PATTERNS = [
    {
        name: 'Greenhouse',
        pattern: /greenhouse\.io/i,
        boardPattern: /greenhouse\.io\/[^/]+$/i,
    },
    {
        name: 'Lever',
        pattern: /lever\.co/i,
        boardPattern: /lever\.co\/[^/]+$/i,
    },
    {
        name: 'Workday',
        pattern: /myworkdayjobs\.com/i,
        boardPattern: /myworkdayjobs\.com\/[^/]+$/i,
    },
]
