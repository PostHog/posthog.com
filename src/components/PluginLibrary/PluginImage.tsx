import React from 'react'
import { Card } from 'antd'
import { CodeOutlined } from '@ant-design/icons'

export const PluginImage = ({ imageSrc }: { imageSrc?: string }) => {
    return (
        <Card
            style={{
                width: 60,
                height: 60,
                marginBottom: 24,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 'auto',
                marginRight: 'auto',
                boxShadow: '0px 80px 80px rgba(0, 0, 0, 0.075), 0px 10px 10px rgba(0, 0, 0, 0.035) !important',
            }}
            bodyStyle={{ padding: 4 }}
        >
            <span style={{ display: 'none' }}>{imageSrc}</span>
            {imageSrc ? (
                <img src={imageSrc} style={{ maxWidth: '100%', maxHeight: '90%', marginBottom: 0 }} alt="" />
            ) : (
                <CodeOutlined style={{ fontSize: 32 }} />
            )}
        </Card>
    )
}
