import React from 'react'
import Link from '../../components/Link'
import SEO from '../../components/seo'
import Parameters from '../../components/SdkReferences/Parameters'
import { SingleCodeBlock } from '../../components/CodeBlock'
import { getLanguageFromSdkId } from '../../components/SdkReferences/utils'
import ReaderView from 'components/ReaderView'
import { useApp } from '../../context/App'

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
    slugPrefix: string
}

export default function SdkType({ pageContext }: { pageContext: PageContext }) {
    const { menu } = useApp()
    const { typeData, version, id, types, slugPrefix } = pageContext

    // Get the language for this SDK type
    const sdkLanguage = getLanguageFromSdkId(id)

    return (
        <ReaderView parent={menu.find(({ name }) => name === 'Docs')}>
            <SEO title={`${typeData.name} - PostHog`} />
            <div>
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
                            slugPrefix={slugPrefix}
                            params={typeData.properties}
                            title="Properties"
                            validTypes={types}
                            includeId={true}
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
        </ReaderView>
    )
}
