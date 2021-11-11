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
      type SidebarsJson implements Node {
        docs: [SidebarNav]
        handbook: [SidebarNav]
      }
      type SidebarNav {
        children: [SidebarNav]
        name: String
        url: String
      }
      type Plugin implements Node {
        name: String,
        url: String,
        description: String,
        verified: Boolean,
        maintainer: String,
        displayOnWebsiteLib: Boolean,
        type: String
        markdown: File @link(from: "markdown___NODE")
        logo: File @link(from: "logo___NODE")
        slug: String
      }
    `)
}
