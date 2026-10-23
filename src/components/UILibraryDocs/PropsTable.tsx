import React from 'react'
import { Card } from 'components/UI/Card'
import { surfaceDivider } from 'components/UI/styles'
import type { DocPropsGroup } from './types'

const columns = '@2xl:grid @2xl:grid-cols-[10rem_12rem_6rem_minmax(0,1fr)] @2xl:gap-x-4'

const headerLabel = 'text-[13px] font-semibold text-secondary'

export default function PropsTable({ component, rows }: DocPropsGroup): JSX.Element {
    return (
        <div className="not-prose flex flex-col gap-2">
            <h3 className="m-0 font-code text-[15px] font-semibold">{component}</h3>
            <Card.Root padding="none">
                <div className={`hidden border-b px-3 py-2 ${surfaceDivider} ${columns}`}>
                    <span className={headerLabel}>Prop</span>
                    <span className={headerLabel}>Type</span>
                    <span className={headerLabel}>Default</span>
                    <span className={headerLabel}>Description</span>
                </div>
                {rows.map(({ name, type, defaultValue, description }) => (
                    <div
                        key={name}
                        className={`flex flex-col gap-1 border-b px-3 py-2.5 text-[14px] last:border-b-0 ${surfaceDivider} ${columns}`}
                    >
                        <span className="font-code font-semibold">{name}</span>
                        <span className="break-words font-code text-[13px] text-secondary">{type}</span>
                        <span className="font-code text-[13px] text-secondary">
                            <span className="@2xl:hidden">Default: </span>
                            {defaultValue ?? '–'}
                        </span>
                        <span>{description}</span>
                    </div>
                ))}
            </Card.Root>
        </div>
    )
}
