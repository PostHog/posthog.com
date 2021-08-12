import React from 'react'

interface ProductImageProps {
    imageName: string
    className?: string
    width?: string | number
    height?: string | number
    style?: React.CSSProperties | undefined
    alt?: string
    isIcon?: boolean
}

function ProductImage({ imageName, className, width, height, style, alt, isIcon = false }: ProductImageProps) {
    return (
        <img
            src={require(`./images${isIcon ? '/icons' : ''}/${imageName}`)}
            className={className}
            width={width}
            height={height}
            style={style}
            alt={alt}
        />
    )
}

export default ProductImage
