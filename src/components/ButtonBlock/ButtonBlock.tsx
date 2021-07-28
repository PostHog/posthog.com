import React from 'react'
import Button, { ButtonProps } from 'antd/lib/button'
import './ButtonBlock.scss'

interface ButtonBlockProps {
    htmlType?: ButtonProps['htmlType']
    onClick?: (event: React.MouseEvent) => void
    children: React.ReactNode
}

export const ButtonBlock = ({ htmlType, onClick, children }: ButtonBlockProps): JSX.Element => {
    return (
        <Button htmlType={htmlType} onClick={onClick} className="buttonBlock-lg" type="primary" block>
            {children}
        </Button>
    )
}
