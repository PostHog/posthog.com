import { Dialog, Transition } from '@headlessui/react'
import { IconX } from '@posthog/icons'
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

    const classes = cn('relative min-h-full h-screen w-[600px] max-w-full md:max-w-[90%]', className)

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
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity before:absolute before:left-0 before:top-0 before:w-full before:h-screen before:bg-tan/75" />
                </Transition.Child>

                <div className="fixed inset-0 z-10">
                    <div className="fixed top-0 right-0 max-w-full flex min-h-full items-stretch justify-end">
                        <Transition.Child
                            as={Fragment}
                            enter={cn('ease-out duration-[0s]', animateOpen && 'duration-300')}
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave={cn('ease-in-out duration-400')}
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Panel className={classes}>
                                <div
                                    className="group absolute top-4 right-4 bg-accent dark:bg-accent-dark rounded-full p-1 border-light dark:border-dark cursor-pointer z-50 border-transparent  hover:border-light dark:hover:border-dark "
                                    onClick={onClose}
                                >
                                    <IconX className="text-black w-6 h-6 relative group-hover:top-[-1px] group-hover:scale-[1.05] group-active:top-[0px] group-active:scale-[.99]" />
                                </div>
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
