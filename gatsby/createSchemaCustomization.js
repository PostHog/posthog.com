module.exports = exports.createSchemaCustomization = async ({ actions, schema }) => {
    const { createTypes } = actions
    createTypes(`
    type Mdx implements Node {
      frontmatter: Frontmatter
      avatar: File @link(from: "avatar___NODE")
      teamMember: Mdx
      name: String
      childMdx: Mdx
      ts: Date
    }
    type MdxFields {
      slug: String
      contributors: [Contributors]
      appConfig: [AppConfig]
    }
    type AppConfig {
      key: String
      name: String
      required: Boolean
      type: String
      hint: String
      description: String
    }
    type Contributors {
      avatar: File @link(from: "avatar___NODE")
      url: String
      username: String
      teamData: TeamData
    }
    type Frontmatter {
      authorData: [AuthorsJson] @link(by: "handle", from: "author")
      badge: String
    }
    type Replies {
      name: String
      rawBody: String
      imageURL: String
      subject: String
    }
    type Question implements Node {
      rawBody: String
      name: String
      slug: [String]
      imageURL: String
      replies: [Replies]
      avatar: File @link(from: "avatar___NODE")
      childrenReply: Mdx
    }
    type Reply implements Node {
      avatar: File @link(from: "avatar___NODE")
      name: String
      fullName: String
      subject: String
    }
    type TeamData {
      name: String
      jobTitle: String
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
    type NavsJsonMainSubItemsSectionsItems implements Node {
      icon: String,
      title: String,
      url: String,
      badge: String
    }
    type ApiEndpoint implements Node {
      id: String,
      name: String,
      url: String,
      items: String,
    }
    type ApiComponents implements Node {
      id: String,
      components: String,
    }
    type Integration implements Node {
      url: String,
      name: String,
      description: String,
      verified: Boolean,
      maintainer: String,
      imageUrl: String,
    }
    type Plugin implements Node {
      name: String,
      url: String,
      description: String,
      verified: Boolean,
      maintainer: String,
      displayOnWebsiteLib: Boolean
      type: String,
      markdown: File,
      logo: File,
      slug: String,
      imageLink: String,
    }
  `)
    createTypes([
        schema.buildObjectType({
            name: 'Mdx',
            interfaces: ['Node'],
            fields: {
                isFuture: {
                    type: 'Boolean!',
                    resolve: (source) => new Date(source.frontmatter.date) > new Date(),
                },
            },
        }),
    ])
}
