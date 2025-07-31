import React from 'react'

interface FieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
    legend: string
    children: any
    className?: string
}

export const Fieldset = ({ legend, children, className = '', ...props }: FieldsetProps) => {
    return (
        <fieldset className={`pt-2 px-3 pb-3 border border-primary rounded ${className}`} {...props}>
            <legend className="text-sm bg-primary px-1 -mx-1">{legend}</legend>
            <div className="flex flex-col gap-1">{children}</div>
        </fieldset>
    )
}
