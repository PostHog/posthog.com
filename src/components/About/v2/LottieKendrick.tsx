import React from 'react'
import Link from 'components/Link'
import { DotLottiePlayer } from '@dotlottie/react-player'
import { IconMusicEighthNote } from 'components/OSIcons'

export const LottieKendrick = () => {
    return (
        <div className="float-right w-72 mt-8">
            <div className="relative">
                <div className="absolute inset-4 bg-accent rounded-full size-56 mx-auto" />
                <DotLottiePlayer
                    src="/lotties/kendrick.lottie"
                    autoplay
                    className="size-64 mx-auto relative top-[5px] right-[-5px]"
                />
            </div>
            <figcaption className="text-primary text-center text-[15px] -mt-2">
                There are other dev tool companies, <br />
                but <em>they not like us</em> <IconMusicEighthNote className="inline-block size-4" />
            </figcaption>
        </div>
    )
}
