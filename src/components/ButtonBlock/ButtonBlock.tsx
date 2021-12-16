import { CallToAction } from 'components/CallToAction'
import React from 'react'
import './ButtonBlock.scss'

interface ButtonBlockProps {
    as?: 'button' | 'a'
    htmlType?: string // Valid only for button
    href?: string // Valid only for a
    onClick?: (event: React.MouseEvent) => void
    children: React.ReactNode
}

export const ButtonBlock = ({ as = 'button', htmlType, href, onClick, children }: ButtonBlockProps): JSX.Element => {
    return as === 'button' ? (
        <CallToAction htmlType={htmlType} onClick={onClick} className="buttonBlock-lg" type="primary" block>
            {children}
        </CallToAction>
    ) : (
        <CallToAction className="buttonBlock-lg" type="primary" block>
            <a href={href} onClick={onClick} style={{ display: 'block' }}>
                {children}
            </a>
        </CallToAction>
    )
}
