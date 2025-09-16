import CloudinaryImage from 'components/CloudinaryImage'
import Tooltip from 'components/RadixUI/Tooltip'
import React, { useEffect, useState } from 'react'
import MediaPlayer from 'components/MediaPlayer'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import { motion } from 'framer-motion'
import { createPortal } from 'react-dom'

export default function Cher({ active }: { active: boolean }) {
    const { addWindow } = useApp()
    const { appWindow } = useWindow()

    return active
        ? createPortal(
              <motion.button
                  initial={{ opacity: 0, translateX: 0, rotate: 5 }}
                  animate={{ opacity: 1, translateX: '33%', rotate: 5 }}
                  onClick={() =>
                      addWindow(
                          <MediaPlayer newWindow location={{ pathname: `cher` }} key={`cher`} videoId="nZXRV4MezEw" />
                      )
                  }
                  whileHover={{ translateY: '-1%', translateX: '34%' }}
                  whileTap={{ scale: 0.96 }}
                  className="absolute top-[-5px] right-0"
              >
                  {/* Comic speech bubble */}
                  <div className="absolute -left-[38px] top-2 bg-primary border-2 border-accent rounded-lg px-2.5 py-1.5 text-xs font-semibold text-primary shadow-lg before:content-[''] before:absolute before:right-[-8px] before:top-3 before:w-0 before:h-0 before:border-l-[8px] before:border-l-accent before:border-t-[6px] before:border-t-transparent before:border-b-[6px] before:border-b-transparent">
                      <span className="italic">Cher</span>?
                  </div>
                  <CloudinaryImage
                      src="https://res.cloudinary.com/dmukukwp6/image/upload/cher_hog_5cdafbe899.png"
                      className="w-[80px]"
                  />
              </motion.button>,
              appWindow?.ref?.current || document.body
          )
        : null
}
