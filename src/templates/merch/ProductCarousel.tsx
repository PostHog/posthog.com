import { GatsbyImage } from 'gatsby-plugin-image'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import React, { useMemo, useState, useEffect } from 'react'
import { cn } from '../../utils'
import { ShopifyProduct } from './types'
import { getProductImages, getShopifyImage, calculateAspectRatioDimensions } from './utils'

type ProductCarouselProps = {
    className?: string
    product: ShopifyProduct
    containerWidth?: number
}

const Image = ({ index, image, title }: { index: number; image: { preview: { image: any } }; title: string }) => {
    const memoizedImage = useMemo(() => {
        const { width, height } = calculateAspectRatioDimensions(image.preview.image, 1500)
        return getShopifyImage({ image: { ...image.preview.image, width, height } })
    }, [image])

    return (
        <div className={`keen-slider__slide number-slide${index}} max-w-full bg-white`}>
            <GatsbyImage className="w-full aspect-square" image={memoizedImage} alt={title} />
        </div>
    )
}

export function ProductCarousel(props: ProductCarouselProps): React.ReactElement | null {
    const { className, product, containerWidth } = props
    const { media, title } = product
    const images = useMemo(() => getProductImages(media), [media])
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created(s) {
            setLoaded(true)
            setTimeout(s.update, 0)
        },
    })

    useEffect(() => {
        setCurrentSlide(0)
        instanceRef.current?.update()
        instanceRef.current?.moveToIdx(0)
    }, [product])

    useEffect(() => {
        if (instanceRef.current && containerWidth) {
            instanceRef.current?.update()
        }
    }, [containerWidth, instanceRef])

    const classes = cn('relative rounded overflow-hidden', className)

    const memoizedImage = useMemo(() => {
        const { width, height } = calculateAspectRatioDimensions(product.featuredMedia.preview.image, 1500)
        return getShopifyImage({ image: { ...product.featuredMedia.preview.image, width, height } })
    }, [product])

    if (!images || images.length === 0) return null

    if (images.length === 1)
        return (
            <GatsbyImage
                className="w-full rounded-md overflow-hidden aspect-square"
                image={memoizedImage}
                alt={product.title}
            />
        )

    return (
        <div className={classes}>
            <div ref={sliderRef} className="keen-slider">
                {images.map((image, i) => {
                    return <Image index={i} image={image} title={title} key={i} />
                })}
            </div>
            {loaded && instanceRef.current && (
                <>
                    <Arrow
                        left
                        onClick={(e) => {
                            e.stopPropagation()
                            instanceRef.current?.prev()
                        }}
                        disabled={currentSlide === 0}
                    />

                    <Arrow
                        onClick={(e) => {
                            e.stopPropagation()
                            instanceRef.current?.next()
                        }}
                        disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
                    />
                </>
            )}
        </div>
    )
}

function Arrow(props: {
    className?: string
    disabled: boolean
    left?: boolean
    onClick: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void
}) {
    const { className, disabled, left } = props

    const classes = cn(
        'relative absolute h-8 w-8 top-1/2 -translate-y-1/2 cursor-pointer left-auto right-2',
        disabled && 'opacity-50',
        left && 'left-2 right-auto',
        className
    )

    return (
        <svg className={classes} onClick={props.onClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            {props.left && <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />}
            {!props.left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
        </svg>
    )
}
