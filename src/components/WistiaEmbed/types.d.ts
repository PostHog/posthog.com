declare namespace JSX {
    interface IntrinsicElements {
        'wistia-player': React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement> & {
                'media-id': string
                aspect?: string
                autoplay?: string
                muted?: string
                controls?: string
            },
            HTMLElement
        >
    }
}
