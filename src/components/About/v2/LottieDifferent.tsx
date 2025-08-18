import React from 'react'
import Link from 'components/Link'
import { DotLottiePlayer } from '@dotlottie/react-player'
import { IconMusicEighthNote } from 'components/OSIcons'

export const LottieDifferent = () => {
    return (
        <div className="float-right w-72 mt-8">
            <div className="relative">
                <div className="absolute inset-4 bg-accent rounded-full size-56 mx-auto" />
                <DotLottiePlayer
                    src="/lotties/rainbow.lottie"
                    autoplay
                    className="size-64 mx-auto relative top-[5px] right-[-5px]"
                />
            </div>
            <figcaption className="text-primary text-center text-[15px] -mt-2 text-balance">
                We try to treat you how <em>we'd want to be treated</em>
            </figcaption>
        </div>
    )
}
