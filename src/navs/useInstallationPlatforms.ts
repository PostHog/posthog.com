import { useStaticQuery, graphql } from 'gatsby'
import { docsMenu } from './index'

interface InstallationPlatform {
    url: string
    label: string
    image?: string
    icon?: string
}

function getSidebarOrder(sidebarPath: string): string[] {
    const sections: any[] = (docsMenu as any).children || []
    const fullPath = `/${sidebarPath}`
    const productPath = `/${sidebarPath.split('/').slice(0, 2).join('/')}`

    for (const section of sections) {
        if (section.url === productPath) {
            const installationSection = section.children?.find((child: any) => child.url === fullPath)

            if (installationSection?.children) {
                return installationSection.children
                    .filter((child: any) => child.url && child.url !== fullPath)
                    .map((child: any) => child.url)
            }
        }
    }

    return []
}

export default function useInstallationPlatforms(basePath: string, titleSuffix?: string): InstallationPlatform[] {
    const { allMdx } = useStaticQuery(graphql`
        query {
            allMdx(filter: { frontmatter: { title: { ne: null } } }) {
                nodes {
                    slug
                    frontmatter {
                        title
                        imageUrl
                        iconName
                    }
                }
            }
        }
    `)

    const pathPattern = new RegExp(`^${basePath}/[^/]+$`)

    const result = allMdx.nodes
        .filter((node: any) => {
            if (!pathPattern.test(node.slug)) return false
            if (node.slug === basePath || node.slug.endsWith(`${basePath}/index`)) return false
            return true
        })
        .map((node: any) => {
            let label = node.frontmatter.title

            if (titleSuffix) {
                const suffixRegex = new RegExp(`\\s+${titleSuffix}.*$`, 'i')
                label = label.replace(suffixRegex, '').trim()
            }

            const platform: InstallationPlatform = {
                label,
                url: `/${node.slug}`,
            }

            if (node.frontmatter.imageUrl) {
                platform.image = node.frontmatter.imageUrl
            } else if (node.frontmatter.iconName) {
                platform.icon = node.frontmatter.iconName
            }

            return platform
        })

    const sidebarOrder = getSidebarOrder(basePath)

    if (sidebarOrder.length > 0) {
        return result.sort((a: InstallationPlatform, b: InstallationPlatform) => {
            const indexA = sidebarOrder.indexOf(a.url)
            const indexB = sidebarOrder.indexOf(b.url)

            if (indexA !== -1 && indexB !== -1) return indexA - indexB
            if (indexA !== -1) return -1
            if (indexB !== -1) return 1
            return 0
        })
    }

    return result
}
