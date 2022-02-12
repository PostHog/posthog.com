module.exports = exports.createResolvers = ({ createResolvers }) => {
    const resolvers = {
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
