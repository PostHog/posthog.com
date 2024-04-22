import * as React from 'react'
import { Ref, SVGProps, forwardRef } from 'react'

interface LoaderProps extends SVGProps<SVGSVGElement> {
    className?: string
}

const Loader = (props: LoaderProps, ref: Ref<SVGSVGElement>): JSX.Element => (
    <svg width="24px" height="24px" viewBox="0 0 24 24" ref={ref} {...props}>
        <title>loader</title>
        <g id="icon/loader" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <path
                d="M12,6 L12,3 M16.25,7.75 L18.4,5.6 M18,12 L21,12 M16.25,16.25 L18.4,18.4 M12,18 L12,21 M7.75,16.25 L5.6,18.4 M6,12 L3,12 M7.75,7.75 L5.6,5.6"
                id="Combined-Shape"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    from="0 12 12"
                    to="360 12 12"
                    dur="3s"
                    repeatCount="indefinite"
                />
            </path>
        </g>
    </svg>
)
export const LoaderIcon = forwardRef(Loader)
