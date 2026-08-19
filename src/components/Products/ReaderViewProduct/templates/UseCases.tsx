import React from 'react'
import OSTable from 'components/shared/ui/OSTable'
import CloudinaryImage from 'components/shared/media/CloudinaryImage'
import { SectionHeading } from '../helpers'
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
    const useCases: UseCasesData | undefined = productData?.useCases
    const rows = useCases?.rows ?? []
    // The table caps out well short of the column, so the product hog fills the
    // gap on the right. Desktop only – on mobile there is no gap to fill.
    const hog = productData?.hogs?.default

    if (!rows.length) return null

    const tableRows = rows.map(([role, useCase]) => ({
        cells: [{ content: role }, { content: useCase }],
    }))

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <SectionHeading lede={useCases?.intro}>Who is it for?</SectionHeading>
            {/* The hog column is a fixed width, so it costs the table 18rem plus
                the gap wherever it appears. `@5xl` is where the container can
                afford that and still leave the table ~44rem – enough to keep the
                use-case cells at one or two lines. Below it the table goes full
                width instead: a squeezed table wraps every cell to three lines,
                which makes it tall, which in turn leaves the hog floating in
                dead space. Both problems are the same problem. */}
            <div className="grid grid-cols-1 gap-6 @5xl/reader-content:grid-cols-[minmax(0,1fr)_18rem] @5xl/reader-content:gap-8 items-stretch">
                <div className="min-w-0">
                    <OSTable columns={columns} rows={tableRows} size="sm" rowAlignment="top" width="full" />
                </div>
                {hog?.src && (
                    // `relative` with no in-flow children means this grid item
                    // contributes zero height to the row, so the row (and this
                    // item, via `items-stretch`) is sized by the table alone –
                    // the image can never end up taller than it, whatever its
                    // native aspect ratio. `object-contain` then fits the image
                    // into that box without distorting it.
                    <CloudinaryImage
                        src={hog.src}
                        alt={hog.alt || `${productData?.name} hedgehog`}
                        className="hidden @5xl/reader-content:block relative"
                        imgClassName="absolute inset-0 size-full object-contain"
                    />
                )}
            </div>
        </section>
    )
}

export default UseCases
