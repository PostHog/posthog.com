import CloudinaryImage from 'components/CloudinaryImage'
import Tooltip from 'components/RadixUI/Tooltip'
import React, { useEffect, useState } from 'react'
import MediaPlayer from 'components/MediaPlayer'
import { useApp } from '../../context/App'
import { motion } from 'framer-motion'

export default function Cher() {
    const { addWindow } = useApp()
    const [ready, setReady] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setReady(true)
        }, 1000)
    }, [])

    return (
        ready && (
            <motion.button
                initial={{ opacity: 0, translateX: 0, translateY: 0, rotate: 10 }}
                animate={{ opacity: 1, translateX: '33%', translateY: '-50%', rotate: 10 }}
                onClick={() =>
                    addWindow(
                        <MediaPlayer newWindow location={{ pathname: `cher` }} key={`cher`} videoId="nZXRV4MezEw" />
                    )
                }
                whileHover={{ translateY: '-52%', translateX: '35%' }}
                whileTap={{ scale: 0.98 }}
                className="absolute top-0 right-0 -z-[1]"
            >
                {/* Comic speech bubble */}
                <div className="absolute -left-[98px] top-6 bg-primary border-2 border-accent rounded-lg px-2.5 py-1.5 text-xs font-semibold text-primary shadow-lg before:content-[''] before:absolute before:right-[-8px] before:top-3 before:w-0 before:h-0 before:border-l-[8px] before:border-l-accent before:border-t-[6px] before:border-t-transparent before:border-b-[6px] before:border-b-transparent">
                    Looking for <span className="italic">Cher</span>?
                </div>
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/cher_hog_5cdafbe899.png"
                    className="w-[120px]"
                />
            </motion.button>
        )
    )
}
