import React from 'react'
import { Sticker } from 'components/UI/Sticker'
import { StickerTombstone, StickerBulb } from 'components/Stickers/Stickers'

export default function Inline(): JSX.Element {
    return (
        <div className="space-y-6">
            <h2 className="m-0 text-3xl">
                The <Sticker sticker={StickerTombstone} tilt={-8} popIn /> old way
            </h2>
            <h2 className="m-0 text-3xl">
                <Sticker sticker={StickerBulb} size="lg" tilt={8} /> Build something people want
            </h2>
            <p className="m-0">
                <Sticker sticker={StickerBulb} size="sm" /> Find the answer in your product data.
            </p>
        </div>
    )
}
