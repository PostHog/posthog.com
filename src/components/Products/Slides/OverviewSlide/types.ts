export interface OverviewSlideProps {
    productName: string
    overview?: {
        title?: string
        description?: string
        textColor?: string
    }
    screenshots?: Array<{
        src: string
        alt: string
        classes?: string
    }>
    color: string
    Icon?: React.ComponentType<any>
    hog?: {
        src: string
        alt: string
        classes?: string
    }
}
