import React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/Layout'

export default function SdkReference({ pageContext }) {
    const { name, description, version, fullReference, regex } = pageContext
    console.log(fullReference)

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">SDK Reference: {fullReference.name}</h1>
                {fullReference.description && <p className="mb-6">{fullReference.description}</p>}
                {fullReference.version && (
                    <p className="text-sm text-gray-600 mb-6">Version: {fullReference.version}</p>
                )}

                {mdxData?.body && (
                    <div className="mb-8">
                        <MDXProvider components={components}>
                            <MDXRenderer>{mdxData.body}</MDXRenderer>
                        </MDXProvider>
                    </div>
                )}

                {fullReference.classes &&
                    Object.entries(fullReference.classes).map(([className, classData]) => (
                        <div key={className} className="mb-8 border-b pb-6">
                            <h2 className="text-2xl font-semibold mb-2">{classData.name}</h2>
                            {classData.description && <p className="mb-4">{classData.description}</p>}

                            {classData.extendsClass && (
                                <p className="text-sm text-gray-600 mb-4">Extends: {classData.extendsClass}</p>
                            )}

                            {classData.classMembers && classData.classMembers.length > 0 && (
                                <div className="mt-4">
                                    <h3 className="text-xl font-medium mb-3">Methods</h3>
                                    <div className="space-y-4">
                                        {classData.classMembers.map((member, index) => (
                                            <div key={index} className="bg-gray-50 p-4 rounded">
                                                <h4 className="font-mono font-bold">{member.name}</h4>
                                                {member.description && <p className="mt-1">{member.description}</p>}
                                                {member.type && (
                                                    <p className="text-sm text-gray-600 mt-1">Type: {member.type}</p>
                                                )}
                                                {member.parameters && member.parameters.length > 0 && (
                                                    <div className="mt-2">
                                                        <h5 className="font-medium">Parameters:</h5>
                                                        <ul className="list-disc pl-5 mt-1">
                                                            {member.parameters.map((param, pIndex) => (
                                                                <li key={pIndex}>
                                                                    <span className="font-mono">{param.name}</span>
                                                                    {param.optional && (
                                                                        <span className="text-gray-500">
                                                                            {' '}
                                                                            (optional)
                                                                        </span>
                                                                    )}
                                                                    {param.type && (
                                                                        <span className="text-gray-600">
                                                                            : {param.type}
                                                                        </span>
                                                                    )}
                                                                    {param.description && (
                                                                        <span> - {param.description}</span>
                                                                    )}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                                {member.example && (
                                                    <div className="mt-2">
                                                        <h5 className="font-medium">Example:</h5>
                                                        <pre className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto">
                                                            <code>{member.example}</code>
                                                        </pre>
                                                    </div>
                                                )}
                                                {member.sources && member.sources.length > 0 && (
                                                    <div className="mt-2">
                                                        <h5 className="font-medium">Source:</h5>
                                                        <ul className="list-disc pl-5 mt-1">
                                                            {member.sources.map((source, sIndex) => (
                                                                <li key={sIndex}>
                                                                    {source.fileName && (
                                                                        <span className="font-mono">
                                                                            {source.fileName}
                                                                        </span>
                                                                    )}
                                                                    {source.line && (
                                                                        <span className="text-gray-600">
                                                                            {' '}
                                                                            (line {source.line})
                                                                        </span>
                                                                    )}
                                                                    {source.url && (
                                                                        <a
                                                                            href={source.url}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="text-blue-600 hover:underline ml-2"
                                                                        >
                                                                            View source
                                                                        </a>
                                                                    )}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
            </div>
        </Layout>
    )
}
