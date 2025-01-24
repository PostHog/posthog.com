import axios from 'axios'

// Helper function to get company logo URL
async function getCompanyLogo(company: string): Promise<string | null> {
    try {
        // Try to get the company's homepage
        const response = await axios.get(`https://${company}.com`)
        const baseUrl = `https://${company}.com`

        // Try favicon patterns first
        const faviconPatterns = [
            /<link[^>]*rel="icon"[^>]*href="([^"]*)"/,
            /<link[^>]*rel="shortcut icon"[^>]*href="([^"]*)"/,
            /<link[^>]*rel="favicon"[^>]*href="([^"]*)"/,
        ]

        // Helper function to resolve relative URLs
        const resolveUrl = (path: string): string => {
            if (path.startsWith('http')) return path
            if (path.startsWith('//')) return 'https:' + path
            if (path.startsWith('/')) return baseUrl + path
            return baseUrl + '/' + path
        }

        // Try favicons
        for (const pattern of faviconPatterns) {
            const match = response.data.match(pattern)
            if (match && match[1]) {
                const faviconUrl = resolveUrl(match[1])
                console.log(`Found favicon for ${company}:`, faviconUrl)

                // Verify the favicon URL is accessible
                try {
                    await axios.head(faviconUrl)
                    return faviconUrl
                } catch (e) {
                    console.log(`Favicon not accessible for ${company}, trying next option`)
                    continue
                }
            }
        }

        // If no favicon found or accessible, try OpenGraph image
        const ogImageMatch = response.data.match(/<meta[^>]*property="og:image"[^>]*content="([^"]*)"/)
        if (ogImageMatch && ogImageMatch[1]) {
            const ogImageUrl = resolveUrl(ogImageMatch[1])
            console.log(`Found OG image for ${company}:`, ogImageUrl)

            // Verify the OG image URL is accessible
            try {
                await axios.head(ogImageUrl)
                return ogImageUrl
            } catch (e) {
                console.log(`OG image not accessible for ${company}, trying next option`)
            }
        }

        // Try direct favicon.ico as last resort
        const directFaviconUrl = `${baseUrl}/favicon.ico`
        try {
            await axios.head(directFaviconUrl)
            console.log(`Found direct favicon.ico for ${company}:`, directFaviconUrl)
            return directFaviconUrl
        } catch (error) {
            console.log(`No direct favicon.ico found for ${company}`)
        }

        console.log(`No logo found for ${company}`)
        return null
    } catch (error) {
        console.error(`Error fetching logo for ${company}:`, error)
        return null
    }
}

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

    const company = req.query.company || 'supabase'

    try {
        // Get jobs data
        const response = await axios.get(`https://jobs.ashbyhq.com/${company}`)
        const match = response.data.match(/window\.__appData\s*=\s*({[^;]+})/)
        if (!match) {
            throw new Error(`Could not find job data in response for ${company}`)
        }

        const jobData = JSON.parse(match[1])
        const jobs = jobData?.jobBoard?.jobPostings || []

        // Try to get company logo
        const logo = await getCompanyLogo(company)

        const jobsWithLogo = jobs.map((job) => ({
            ...job,
            company,
            logo,
            link: `https://jobs.ashbyhq.com/${company}/${job.id}`,
        }))

        res.status(200).json({
            success: true,
            jobs: jobsWithLogo,
        })
    } catch (error) {
        console.error(`API Error for ${company}:`, error)
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
