import PostLayout from 'components/PostLayout'
import { dataPipelines, docsMenu } from '../navs'
import React from 'react'
import Layout from 'components/Layout'
import { graphql } from 'gatsby'
import APIExamples from 'components/Product/Pipelines/APIExamples'
import Configuration from 'components/Product/Pipelines/Configuration'

export default function DataPipelineDestination({
    data,
}: {
    data: { postHogDestination: { name: string; description: string; inputs_schema: any; id: string } }
}): JSX.Element {
    const {
        postHogDestination: { name, description, inputs_schema, id },
    } = data

    return (
        <Layout
            parent={docsMenu}
            activeInternalMenu={docsMenu.children.find((child) => child.name === 'Data pipelines')}
        >
            <PostLayout title={name} menu={dataPipelines.children} menuWidth={{ left: 400 }} hideSidebar hideSurvey>
                <h1>{name}</h1>
                <div className="article-content">
                    <p>{description}</p>
                    <h2>Configuration</h2>
                    <Configuration inputs_schema={inputs_schema} />
                    <APIExamples initialOpen id={id} name={name} inputs_schema={inputs_schema} type="destination" />
                </div>
            </PostLayout>
        </Layout>
    )
}

export const query = graphql`
    query ($id: String!) {
        postHogDestination(id: { eq: $id }) {
            id
            name
            description
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
