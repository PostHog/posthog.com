// eslint-disable-next-line node/no-unpublished-require
const { buildSite } = require('../../../helpers')

jest.setTimeout(120_000)

describe('A site using netlify-plugin-gatsby-cache', () => {
    it('warns when running a build', async () => {
        const { logs, success } = await buildSite()
        expect(success).toBeTruthy()
        expect(logs.stderr).toMatch(
            "The plugin 'netlify-plugin-gatsby-cache' is no longer required and should be removed."
        )
    })
})
