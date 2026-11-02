import React from 'react'
import { DOCS_WORDMARK } from './docs'

type CustomerOgProps = {
    title: string
    logo?: string
    image?: string
}

export const CustomerOg = ({ title, logo, image }: CustomerOgProps) => (
    <div
        style={{
            width: 1200,
            height: 630,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#eeefe9',
            color: 'black',
            fontFamily: 'MatterVF',
        }}
    >
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                paddingTop: 53,
                paddingRight: 63,
                paddingBottom: 53,
                paddingLeft: 63,
                borderBottom: '2px dashed rgba(169, 169, 169, 0.5)',
            }}
        >
            <img src={DOCS_WORDMARK} width={251} height={48} />
            <div style={{ fontSize: 48, marginLeft: 40, marginRight: 40 }}>❤️</div>
            {logo ? <img src={logo} style={{ maxWidth: 300 }} /> : null}
        </div>
        {image ? (
            <img src={image} style={{ position: 'absolute', right: 0, bottom: 0, width: 450, maxWidth: 450 }} />
        ) : null}
        <div style={{ marginTop: 53, marginLeft: 63, maxWidth: 750, zIndex: 1 }}>
            <div style={{ fontSize: 72, fontWeight: 700 }}>{title}</div>
        </div>
    </div>
)
