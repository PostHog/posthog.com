import fetch from 'node-fetch'

export async function findNewAshbyJobs() {
    const apiKey = process.env.GATSBY_SCRAPING_BEE_API_KEY
    const searchQuery = 'site:jobs.ashbyhq.com/* "product engineer"'
    const encodedQuery = encodeURIComponent(searchQuery)
    const googleUrl = `https://www.google.com/search?q=${encodedQuery}`

    try {
        const response = await fetch(
            'https://app.scrapingbee.com/api/v1?' +
                new URLSearchParams({
                    api_key: apiKey || '',
                    url: googleUrl,
                    render_js: 'false',
                    premium_proxy: 'true',
                    custom_google: 'true',
                })
        )

        const responseText = await response.text()

        // Find all Ashby URLs
        const matches = responseText.match(/jobs\.ashbyhq\.com\/([a-zA-Z0-9-]+)/g) || []

        // Extract unique company names and format them as config entries
        const companies = [
            ...new Set(
                matches
                    .map((url) => {
                        const match = url.match(/jobs\.ashbyhq\.com\/([a-zA-Z0-9-]+)/)
                        return match ? match[1].toLowerCase() : null
                    })
                    .filter(Boolean)
            ),
        ]

        // Format the companies as config entries
        const configEntries = companies
            .map(
                (company) => `    {
        name: '${company.charAt(0).toUpperCase() + company.slice(1)}',
        ashbyUrl: '${company.toLowerCase()}',
        engineersDecideWhatToBuild: 'Unclear',
        remoteOnly: 'Unclear',
        exoticOffsites: 'Unclear',
        meetingFreeDays: 'Unclear',
        noProductRequirementDocs: 'Unclear',
        highEngineerRatio: 'Unclear',
        posthogCustomer: 'Unclear',
        hasDeadlines: 'Unclear',
    }`
            )
            .join(',\n')

        console.log('\nNew companies to add to src/data/companies.ts:\n')
        console.log(configEntries)
        console.log('\nAdd these entries to the COMPANIES array in src/data/companies.ts')

        return companies
    } catch (error) {
        console.error('Error searching for Ashby jobs:', error)
        throw error
    }
}
