import { graphql } from 'gatsby'
import Changelog from '../../templates/Changelog'

export default Changelog

export const query = graphql`
    query ChangelogPageQuery {
        allRoadmap(filter: { complete: { eq: true }, date: { ne: null } }, sort: { fields: date }) {
            nodes {
                id: strapiID
                date
                title
                description
                cta {
                    label
                    url
                }
                media {
                    gatsbyImageData
                }
                profiles {
                    data {
                        id
                        attributes {
                            firstName
                            lastName
                            avatar {
                                data {
                                    attributes {
                                        url
                                    }
                                }
                            }
                            color
                            teams {
                                data {
                                    attributes {
                                        name
                                        miniCrest {
                                            data {
                                                attributes {
                                                    url
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                teams {
                    data {
                        attributes {
                            name
                            miniCrest {
                                data {
                                    attributes {
                                        url
                                    }
                                }
                            }
                        }
                    }
                }
                topic {
                    data {
                        attributes {
                            label
                        }
                    }
                }
                githubUrls
                githubPRMetadata {
                    number
                    html_url
                    additions
                    changed_files
                    comments
                    comments_url
                    commits
                    commits_url
                    deletions
                    review_comments
                    review_comments_url
                    reviews_url
                    commenters {
                        avatar_url
                        html_url
                        login
                        type
                    }
                    reviewers {
                        avatar_url
                        html_url
                        login
                        type
                    }
                    user {
                        login
                        avatar_url
                        html_url
                        type
                    }
                }
            }
        }
        allChangelogVideo(sort: { fields: publishedAt, order: DESC }) {
            nodes {
                id
                videoId
                publishedAt
                title
            }
        }
    }
`
