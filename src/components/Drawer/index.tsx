import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { cn } from '../../utils'
import { XIcon } from '@heroicons/react/outline'

interface DrawerProps {
    children: React.ReactNode
    className?: string
    isOpen: boolean
    onClose: () => void
}

export const Drawer = (props: DrawerProps): React.ReactElement => {
    const { children, className, isOpen, onClose } = props

    const classes = cn('relative p-4 min-h-full w-[600px] max-w-[90%] bg-white', className)

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[9999999]" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="fixed top-0 right-0 flex min-h-full items-stretch justify-end">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="ease-in duration-200"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Panel className={classes}>
                                <XIcon className="text-black absolute top-4 right-4 w-8 h-8" onClick={onClose} />
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
