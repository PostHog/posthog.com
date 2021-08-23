module.exports = exports.createSchemaCustomization = async ({ actions }) => {
    const { createTypes } = actions
    createTypes(`
      type Mdx implements Node {
        contributors: [Contributors]
      }
      type Contributors {
        avatar: File @link(from: "avatar___NODE")
        url: String
        username: String
      }
    `)
}
