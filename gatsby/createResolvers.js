module.exports = exports.createResolvers = ({ createResolvers }) => {
    const resolvers = {
        GlossaryJson: {
            page: {
                resolve: async (source, args, context, info) => {
                    const data = await context.nodeModel.runQuery({
                        query: {
                            filter: {
                                fields: {
                                    slug: { eq: source.slug },
                                },
                            },
                        },
                        type: 'Mdx',
                        firstOnly: true,
                    })
                    return data
                },
            },
        },
        Contributors: {
            teamData: {
                resolve: async (source, args, context, info) => {
                    const data = await context.nodeModel.runQuery({
                        query: {
                            filter: {
                                frontmatter: {
                                    github: { eq: source.username },
                                },
                            },
                        },
                        type: 'Mdx',
                        firstOnly: true,
                    })
                    return {
                        name: data && data.frontmatter && data.frontmatter.name,
                        jobTitle: data && data.frontmatter && data.frontmatter.jobTitle,
                    }
                },
            },
        },
        Reply: {
            teamMember: {
                type: `Mdx`,
                resolve: async (source, args, context, info) => {
                    const team = context.nodeModel.runQuery({
                        type: `Mdx`,
                        query: {
                            filter: {
                                frontmatter: { name: { eq: source?.fullName } },
                                fields: { slug: { regex: '/^/team/' } },
                            },
                        },
                        firstOnly: true,
                    })
                    const teamMember = await team
                    return teamMember
                },
            },
        },
    }
    createResolvers(resolvers)
}
