import React from 'react'
import { cn } from '../../../utils'

const Emphasis = ({ className, children }: { className: string; children: React.ReactNode }): JSX.Element => (
    <span className={cn('rounded-md px-1 @xl:whitespace-nowrap', className)}>{children}</span>
)

export default Emphasis
