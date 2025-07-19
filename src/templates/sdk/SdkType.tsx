import React from 'react'
import Link from '../../components/Link'
import Layout from '../../components/Layout'
import SEO from '../../components/seo'
import PostLayout from '../../components/PostLayout'
import CommunityQuestions from '../../components/CommunityQuestions'
import { docsMenu } from '../../navs'
import Parameters from '../../components/SdkReferences/Parameters'
import { SingleCodeBlock } from '../../components/CodeBlock'
import { getLanguageFromSdkId } from '../../components/SdkReferences/utils'

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
    example?: string
    path: string
}

interface PageContext {
    typeData: TypeData
    version: string
    id: string
    noDocsTypes: string[]
    types: string[]
}

export default function SdkType({ pageContext }: { pageContext: PageContext }) {
    const { typeData, version, id, types } = pageContext
    const activeInternalMenu = docsMenu.children.find(({ name }): boolean => name === 'Product OS')

    // Get the language for this SDK type
    const sdkLanguage = getLanguageFromSdkId(id)

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
                        {typeData.properties && typeData.properties.length > 0 ? (
                            <Parameters
                                slugPrefix={typeData.path}
                                params={typeData.properties}
                                title="Properties"
                                validTypes={types}
                            />
                        ) : typeData.example ? (
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Example values</h2>
                                <SingleCodeBlock
                                    language={sdkLanguage}
                                    showLabel={true}
                                    showLineNumbers={false}
                                    showCopy={false}
                                >
                                    {typeData.example}
                                </SingleCodeBlock>
                            </div>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">No properties or examples available.</p>
                        )}
                    </div>
                </div>
            </PostLayout>
        </Layout>
    )
}
