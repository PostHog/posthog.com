import React from 'react'
import OSTable from 'components/OSTable'
import UseCaseSubmission from '../UseCaseSubmission'
import { SectionComponentProps } from '../types'

const columns = [
    { name: 'Role', width: 'minmax(150px,auto)', align: 'left' as const },
    { name: 'Use cases', width: 'minmax(auto,1fr)', align: 'left' as const },
]

interface UseCasesData {
    intro?: string
    rows?: [string, string][]
}

const UseCases = ({ id, productData }: SectionComponentProps) => {
    const { name } = productData ?? {}
    const useCases: UseCasesData | undefined = productData?.useCases
    const rows = useCases?.rows ?? []

    if (!rows.length) return null

    const tableRows = rows.map(([role, useCase]) => ({
        cells: [{ content: role }, { content: useCase }],
    }))

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="mb-8">Who is it for?</h2>
            {useCases?.intro && <p>{useCases.intro}</p>}
            <OSTable
                columns={columns}
                rows={tableRows}
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
