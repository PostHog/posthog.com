import { graphql } from 'gatsby'
import React from 'react'
import MDXEditor from 'components/MDXEditor'
import Logo from 'components/Logo'
import { JsxComponentDescriptor } from '@mdxeditor/editor'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import { companyMenu } from '../navs'

const jsxComponentDescriptors: JsxComponentDescriptor[] = [
    {
        name: 'HappyHog',
        kind: 'flow',
        props: [],
        Editor: () => (
            <img
                src="https://res.cloudinary.com/dmukukwp6/image/upload/happy_hog_ebc59e4658.png"
                alt="happy hog"
                className="float-right max-w-[400px] max-h-48 -mt-2 -mr-2"
            />
        ),
    },
    {
        name: 'Logo',
        kind: 'flow',
        props: [],
        Editor: () => <Logo noText className="inline-block" />,
    },
]
export default function About({ data }: { data: { mdx: { rawBody: string } } }) {
    return (
        <ReaderView
            leftSidebar={<TreeMenu items={companyMenu.children.map((child) => ({ ...child, children: [] }))} />}
        >
            <MDXEditor jsxComponentDescriptors={jsxComponentDescriptors} body={data.mdx.rawBody} />
        </ReaderView>
    )
}

export const query = graphql`
    {
        mdx(fields: { slug: { eq: "/about" } }) {
            rawBody
        }
    }
`
