import React from 'react'
import { Link } from 'gatsby'
import { DocLinks } from 'components/Products/DocsLinks'

interface DocsSlideProps {
    productHandle: string
    docsMenu: any[]
}

export default function DocsSlide({ productHandle, docsMenu }: DocsSlideProps) {
    return (
        <div className="h-full p-8">
            <h2 className="text-4xl font-bold text-primary mb-2 text-center">Explore the docs</h2>
            <p className="text-xl text-secondary max-w-4xl mx-auto mb-8 text-center">
                Get a more technical overview of how everything works{' '}
                <Link to={`/docs/${productHandle}`} state={{ newWindow: true }}>
                    in our docs
                </Link>
                .
            </p>
            <DocLinks menu={docsMenu} />
        </div>
    )
}
