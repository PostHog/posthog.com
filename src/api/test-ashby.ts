import { NextApiRequest, NextApiResponse } from 'next'
import { findNewAshbyJobs, addNewCompaniesToConfig } from '../components/Jobs/jobsAshby'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const logs: string[] = []

    // Capture console.log output
    const originalLog = console.log
    console.log = (...args) => {
        logs.push(args.map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(' '))
        originalLog.apply(console, args)
    }

    try {
        const companies = await findNewAshbyJobs()
        const addedCompanies = await addNewCompaniesToConfig()

        // Restore original console.log
        console.log = originalLog

        res.status(200).json({
            debug: {
                nodeEnv: process.env.NODE_ENV,
                hasApiKey: !!process.env.GATSBY_SCRAPING_BEE_API_KEY,
                apiKeyFirstChars: process.env.GATSBY_SCRAPING_BEE_API_KEY
                    ? process.env.GATSBY_SCRAPING_BEE_API_KEY.substring(0, 4) + '...'
                    : 'none',
                logs: logs,
            },
            companiesFound: companies,
            companiesAdded: addedCompanies,
        })
    } catch (error) {
        // Restore original console.log
        console.log = originalLog

        res.status(500).json({
            error: 'Failed to fetch companies',
            details: error.message,
            debug: {
                nodeEnv: process.env.NODE_ENV,
                hasApiKey: !!process.env.GATSBY_SCRAPING_BEE_API_KEY,
                logs: logs,
                errorMessage: error.message,
                errorStack: error.stack,
            },
        })
    }
}
