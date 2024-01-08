import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import React, { Fragment } from 'react'
import { cn } from '../../utils'

interface DrawerProps {
    children: React.ReactNode
    className?: string
    isOpen: boolean
    onClose: () => void
    removeScroll?: boolean
    animateOpen?: boolean
}

export const Drawer = (props: DrawerProps): React.ReactElement => {
    const { children, className, isOpen, onClose, animateOpen = true } = props

    const classes = cn('shadow relative min-h-full h-screen w-[600px] max-w-full md:max-w-[90%]', className)

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[9999999]" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter={cn('ease-out duration-[0s]', animateOpen && 'duration-300')}
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave={cn('ease-in duration-200')}
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10">
                    <div className="fixed top-0 right-0 max-w-full flex min-h-full items-stretch justify-end">
                        <Transition.Child
                            as={Fragment}
                            enter={cn('ease-out duration-[0s]', animateOpen && 'duration-300')}
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave={cn('ease-in duration-200')}
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Panel className={classes}>
                                <XIcon
                                    className="text-black absolute top-4 right-4 w-8 h-8 cursor z-50"
                                    onClick={onClose}
                                />
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
