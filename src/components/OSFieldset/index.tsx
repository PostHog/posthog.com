import React from 'react'

interface FieldsetProps {
    legend: string
    children: any
}

export const Fieldset = ({ legend, children }: FieldsetProps) => {
    return (
        <fieldset className="pt-2 px-3 pb-3">
            <legend className="text-sm">{legend}</legend>
            <div className="flex flex-col gap-1">{children}</div>
        </fieldset>
    )
}
