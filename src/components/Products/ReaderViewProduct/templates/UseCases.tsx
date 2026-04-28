import React from 'react'
import OSTable from 'components/OSTable'
import UseCaseSubmission from '../UseCaseSubmission'
import { SectionComponentProps } from '../types'

// TODO: source from productData.useCases when generalizing this template across products.
const columns = [
    { name: 'Role', width: 'minmax(150px,auto)', align: 'left' as const },
    { name: 'Use cases', width: 'minmax(auto,1fr)', align: 'left' as const },
]

const rows = [
    ['Product Engineers', "Debug production issues that can't be reproduced locally"],
    ['Support', 'Pinpoint the source of issues with visual verification and console logs'],
    ['PMs & Designers', 'Spot friction, dead ends, and rage clicks'],
    ['Growth', 'Investigate funnel drop-off and onboarding bleed'],
    ['QA', 'Validating releases by watching real users instead of staged flows'],
].map(([role, useCase]) => ({
    cells: [{ content: role }, { content: useCase }],
}))

const UseCases = ({ id, productData }: SectionComponentProps) => {
    const { name } = productData ?? {}

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="mb-8">Who is it for?</h2>
            <p>{name} is used across teams depending on your role.</p>
            <OSTable
                columns={columns}
                rows={rows}
                size="sm"
                rowAlignment="top"
                width="full"
                className="@2xl/reader-content-container:max-w-3xl"
            />
            <div className="mt-4">
                <UseCaseSubmission productName={name} productSlug={productData?.slug} />
            </div>
        </section>
    )
}

export default UseCases
