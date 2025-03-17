import PostLayout from 'components/PostLayout'
import { dataPipelines, docsMenu } from '../navs'
import React from 'react'
import Layout from 'components/Layout'
import { graphql } from 'gatsby'
import APIExamples from 'components/Product/Pipelines/APIExamples'
import Configuration from 'components/Product/Pipelines/Configuration'

export default function DataPipeline({
    data,
}: {
    data: { postHogPipeline: { name: string; description: string; inputs_schema: any; id: string; type: string } }
}): JSX.Element {
    const {
        postHogPipeline: { name, description, inputs_schema, id, type },
    } = data

    return (
        <Layout
            parent={docsMenu}
            activeInternalMenu={docsMenu.children.find((child) => child.name === 'Data pipelines')}
        >
            <PostLayout title={name} menu={dataPipelines.children} menuWidth={{ left: 400 }} hideSidebar hideSurvey>
                <h1 className="mt-0">{name}</h1>
                <div className="article-content">
                    <p>{description}</p>
                    <h2>Configuration</h2>
                    <Configuration inputs_schema={inputs_schema} />
                    <APIExamples initialOpen id={id} name={name} inputs_schema={inputs_schema} type={type} />
                </div>
            </PostLayout>
        </Layout>
    )
}

export const query = graphql`
    query ($id: String!) {
        postHogPipeline(id: { eq: $id }) {
            id
            name
            description
            type
            inputs_schema {
                key
                type
                label
                secret
                required
                description
            }
        }
    }
`
