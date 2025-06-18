import React from 'react'
import Link from '../../components/Link'
import Layout from '../../components/Layout'
import SEO from '../../components/seo'
import PostLayout from '../../components/PostLayout'
import CommunityQuestions from '../../components/CommunityQuestions'
import { docsMenu } from '../../navs'
import Parameters from '../../components/SdkSpecs/Parameters'
import TypeLink from '../../components/SdkSpecs/TypeLink'

interface Property {
    name: string
    type: string
    description: string
    isOptional?: boolean
}

interface TypeData {
    name: string
    description: string
    properties: Property[]
    examples?: string[]
    path: string
}

interface PageContext {
    typeData: TypeData
    version: string
}

export default function SdkType({ pageContext }: { pageContext: PageContext }) {
    const { typeData, version } = pageContext
    const activeInternalMenu = docsMenu.children.find(({ name }) => name === 'Product OS')
    console.log(typeData, version)
    return (
        <Layout parent={docsMenu} activeInternalMenu={activeInternalMenu}>
            <SEO title={`${typeData.name} - PostHog`} />
            <PostLayout
                title={typeData.name}
                questions={<CommunityQuestions />}
                menu={activeInternalMenu?.children || []}
                fullWidthContent={true}
                hideSidebar
            >
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-4">{typeData.name}</h1>
                        {typeData.description && (
                            <p className="text-lg text-gray-600 dark:text-gray-300">{typeData.description}</p>
                        )}
                    </div>
                    <div className="mb-8">
                        <Link
                            to={`https://unpkg.com/posthog-js@${version}/${typeData.path}`}
                            className="text-red hover:text-red-dark"
                        >
                            View in reference
                        </Link>
                    </div>
                    <div className="w-full">
                        <Parameters params={typeData.properties} title="Properties" />
                    </div>
                </div>
            </PostLayout>
        </Layout>
    )
}
