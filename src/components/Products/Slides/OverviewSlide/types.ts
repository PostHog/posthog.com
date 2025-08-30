export interface OverviewSlideProps {
    productName: string
    overview?: {
        title?: string
        description?: string
        textColor?: string
    }
    screenshots?: {
        [key: string]: {
            src: string
            srcMobile?: string
            alt?: string
            classes?: string
            imgClasses?: string
            classesMobile?: string
            imgClassesMobile?: string
        }
    }
    color: string
    Icon?: React.ComponentType<any>
    hog?: {
        src: string
        alt?: string
        classes?: string
    }
}
