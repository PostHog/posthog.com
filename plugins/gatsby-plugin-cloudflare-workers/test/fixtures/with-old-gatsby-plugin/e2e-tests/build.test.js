// eslint-disable-next-line node/no-unpublished-require
const { buildSite } = require('../../../helpers')

jest.setTimeout(120_000)

describe('A site using gatsby-plugin-netlify-cache', () => {
    it('bails when running a build', async () => {
        const { logs, success } = await buildSite()
        expect(success).toBeFalsy()
        expect(logs.stderr).toMatch(
            "The plugin 'gatsby-plugin-netlify-cache' is not compatible with the Gatsby build plugin"
        )
    })
})
