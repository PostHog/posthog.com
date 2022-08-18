// eslint-disable-next-line node/no-unpublished-require
const { buildSite } = require('../../../helpers')

jest.setTimeout(120_000)
describe('A site with no Gatsby config', () => {
    it('successfully builds', async () => {
        const { success } = await buildSite()
        expect(success).toBeTruthy()
    })
})
