import React from 'react'
import Link from 'components/Link'
import { DocLinks } from 'components/Products/DocsLinks'
import { docsMenu } from '../../../../navs'
import { SectionComponentProps } from '../types'

const Docs = ({ id, productData }: SectionComponentProps) => {
    const productHandle = productData?.slug
    const productName = productData?.name
    if (!productHandle || !productName) return null

    const menu =
        docsMenu.children.find(({ name }: { name: string }) => name.toLowerCase() === productName.toLowerCase())
            ?.children || []

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="text-3xl font-bold text-primary mt-0 mb-3">Explore the docs</h2>
            <p className="text-base text-secondary leading-relaxed m-0 mb-4">
                Get a more technical overview of how everything works{' '}
                <Link to={`/docs/${productHandle}`} state={{ newWindow: true }} className="font-semibold underline">
                    in our docs
                </Link>
                .
            </p>
            <DocLinks menu={menu} />
        </section>
    )
}

export default Docs
