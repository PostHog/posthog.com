import React from 'react'

interface ZoomHoverProps {
    size?: 'xs' | 'sm' | 'md' | 'lg'
    width?: string
    display?: 'block' | 'inline-flex'
    className?: string
    children: React.ReactNode
}

const ZoomHover: React.FC<ZoomHoverProps> = ({
    size = 'sm',
    width = 'inline-flex',
    display,
    className = '',
    children,
}) => {
    const sizeClasses = {
        // note: these are sorta backwards. choose a button based on your button's size.
        // eg: if you have a extra large button, you want it to move less on hover/click so use 'lg'
        xs: 'hover:top-[-.5px] active:top-[.5px]',
        sm: 'hover:top-[-.5px] active:top-[.5px]',
        md: 'hover:top-[-.5px] active:top-[.5px]',
        lg: 'hover:-top-px active:top-[.5px]',
    }

    const widthClass = width === 'auto' ? 'w-auto' : width === 'full' ? 'w-full' : width
    const displayClass = display || (width === 'full' ? 'block' : 'inline-flex')
    const classes = `${widthClass} ${displayClass} relative ${sizeClasses[size]} ${className}`

    return <div className={classes}>{children}</div>
}

export default ZoomHover
