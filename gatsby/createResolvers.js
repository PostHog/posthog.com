module.exports = exports.createResolvers = ({ createResolvers }) => {
    const resolvers = {
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
                        name: data?.frontmatter?.name,
                        jobTitle: data?.frontmatter?.jobTitle,
                    }
                },
            },
        },
    }
    createResolvers(resolvers)
}
