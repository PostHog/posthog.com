import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import * as Portal from '@radix-ui/react-portal'
import { IconX } from '@posthog/icons'

interface SidePanelProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
  width?: string
  showCloseButton?: boolean
}

export default function SidePanel({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  width = 'w-96',
  showCloseButton = true
}: SidePanelProps) {
  return (
    <Portal.Root>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay - transparent but captures clicks */}
            <div className="fixed inset-0 z-40" onClick={onClose} />

            {/* Side panel */}
            <motion.div
              data-scheme="primary"
              initial={{ translateX: '100%' }}
              animate={{
                translateX: 0,
              }}
              exit={{
                translateX: '100%',
              }}
              transition={{ duration: 0.3, type: 'tween' }}
              className={`fixed top-[calc(37px+1rem)] right-4 h-[calc(100vh-2rem-37px)] ${width} bg-primary border border-primary rounded shadow-xl z-50 text-primary ${className}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-full flex flex-col">
                {title && (
                  <div className="flex items-center justify-between px-4 py-2 border-b border-primary">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    {showCloseButton && (
                      <button
                        onClick={onClose}
                        className="text-sm text-secondary hover:text-primary"
                      >
                        <IconX className="size-4" />
                      </button>
                    )}
                  </div>
                )}

                <div className="flex-1 overflow-hidden">
                  {children}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Portal.Root>
  )
} 