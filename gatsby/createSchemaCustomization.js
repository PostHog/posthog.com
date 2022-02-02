module.exports = exports.createSchemaCustomization = async ({ actions }) => {
    const { createTypes } = actions
    createTypes(`
      type Mdx implements Node {
        contributors: [Contributors]
        frontmatter: Frontmatter
      }
      type Frontmatter {
        authorData: [AuthorsJson] @link(by: "handle", from: "author")
      }
      type Replies {
        name: String
        rawBody: String
        imageURL: String
      }
      type Question implements Node {
        rawBody: String
        name: String
        slug: [String]
        imageURL: String
        replies: [Replies]
        avatar: File @link(from: "avatar___NODE")
      }
      type Reply implements Node {
        avatar: File @link(from: "avatar___NODE")
        name: String
        fullName: String
        authorData: AuthorsJson @link(by: "slack_username", from: "name")
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
      type Jobs implements Node {
        id: String
        title: String
        full_title: String
        shortcode: String
        application_url: String
        state: String
        department: String
        department_hierarchy: [WorkableDepartmentHierarchy]
        url: String
        application_url: String
        shortlink: String
        location: WorkableLocation
        created_at: String
      }
      type WorkableDepartmentHierarchy {
        id: Int
        name: String
      }
      type WorkableLocation {
        location_str: String
        country: String
        country_code: String
        region: String
        region_code: String
        city: String
        zip_code: Int
        telecommuting: Boolean
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
      type NavsJsonMainSubItemsSectionsItems implements Node {
        icon: String,
        title: String,
        url: String,
        badge: String
      }
    `)
}
