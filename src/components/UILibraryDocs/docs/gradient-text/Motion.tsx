import React from 'react'
import { GradientText } from 'components/UI/GradientText'
export default function Motion(): JSX.Element {
    return (
        <div className="space-y-5">
            <h2 className="!m-0 !text-3xl">
                Turn product data into{' '}
                <GradientText palette="fresh" duration={12}>
                    your next idea
                </GradientText>
                .
            </h2>
        </div>
    )
}
