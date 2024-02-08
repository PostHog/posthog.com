import React, { Fragment, useState } from 'react'
import Link from 'components/Link'
import { Authentication, EditProfile } from 'components/Squeak'
import { useUser } from 'hooks/useUser'
import Modal from 'components/Modal'
import { CallToAction } from 'components/CallToAction'
import { Listbox, Transition } from '@headlessui/react'

import SidebarSection from 'components/PostLayout/SidebarSection'

import getAvatarURL from 'components/Squeak/util/getAvatar'
import { User } from '../../hooks/useUser'

export const Avatar = (props: { className?: string; src?: string }) => {
    return (
        <div className={`overflow-hidden rounded-full ${props.className}`}>
            {props.src ? (
                <img className="w-full h-full" alt="" src={props.src} />
            ) : (
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20.0782 41.0392H5.42978C4.03134 41.0392 3.1173 40.1642 3.09386 38.7736C3.07823 37.7814 3.07042 36.797 3.10948 35.8048C3.15636 34.6329 3.72668 33.7345 4.74228 33.1798C8.0782 31.3595 11.4299 29.5783 14.7659 27.7658C15.0081 27.633 15.1565 27.758 15.3362 27.8517C18.1878 29.3439 21.0942 29.4689 24.0626 28.2267C24.1485 28.1955 24.2423 28.1721 24.3126 28.1096C24.9298 27.5861 25.4845 27.7971 26.1251 28.1486C29.1173 29.7971 32.1331 31.4143 35.1487 33.0238C36.4534 33.7191 37.094 34.766 37.0706 36.2426C37.0549 37.0785 37.0706 37.9067 37.0706 38.7426C37.0628 40.1254 36.1409 41.0395 34.7659 41.0395H20.0783L20.0782 41.0392Z"
                        fill="#BFBFBC"
                    />
                    <path
                        d="M19.8359 27.0625C17.0859 26.9687 14.8047 25.6094 13.1251 23.1953C10.3751 19.2344 10.7032 13.6093 13.8516 10.0001C17.2735 6.08599 22.9452 6.10943 26.336 10.0469C29.9376 14.2345 29.711 20.8437 25.8126 24.6405C24.2188 26.1952 22.3126 27.0312 19.8362 27.0624L19.8359 27.0625Z"
                        fill="#BFBFBC"
                    />
                </svg>
            )}
        </div>
    )
}

export const Profile = ({ user, setEditModalOpen }: { user: User; setEditModalOpen: (open: boolean) => void }) => {
    const { profile, email } = user
    const { id } = profile
    const name = [profile.firstName, profile.lastName].filter(Boolean).join(' ')

    return (
        <div>
            <Link
                to={`/community/profiles/${id}`}
                className="flex items-center space-x-2 mt-2 mb-1 -mx-2 relative active:top-[1px] active:scale-[.99] hover:bg-gray-accent-light dark:hover:bg-gray-accent-dark rounded p-2"
            >
                <Avatar src={getAvatarURL(user?.profile)} className="w-[40px] h-[40px]" />
                <div>
                    {name && <p className="m-0 font-bold">{name}</p>}
                    {email && (
                        <p className="m-0 font-normal text-sm text-primary/60 dark:text-primary-dark/60">{email}</p>
                    )}
                </div>
            </Link>

            <CallToAction
                onClick={() => setEditModalOpen(true)}
                width="full"
                size="sm"
                type="secondary"
                className="mt-2"
            >
                Edit profile
            </CallToAction>
        </div>
    )
}

export default function Sidebar() {
    const { user, logout } = useUser()
    const [editModalOpen, setEditModalOpen] = useState(false)
    const topicSubscriptions = user?.profile?.topicSubscriptions

    return (
        <>
            <Modal setOpen={setEditModalOpen} open={editModalOpen}>
                <div
                    onClick={() => setEditModalOpen(false)}
                    className="flex flex-start justify-center absolute w-full p-4"
                >
                    <div
                        className="max-w-xl bg-white dark:bg-black rounded-md relative w-full p-5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <EditProfile onSubmit={() => setEditModalOpen(false)} />
                    </div>
                </div>
            </Modal>
            <SidebarSection>
                <div className="mb-2 flex items-baseline justify-between">
                    <h4 className="m-0">My profile</h4>
                    {user?.profile && (
                        <button onClick={logout} className="text-red font-bold text-sm">
                            Logout
                        </button>
                    )}
                </div>
                {user?.profile ? <Profile setEditModalOpen={setEditModalOpen} user={user} /> :
                    <Authentication showBanner={false} showProfile={false} />}
            </SidebarSection>

            {user?.profile && (
                <SidebarSection title="My discussions">
                    <Link to="/community/dashboard" className="text-sm">
                        Visit my discussions
                    </Link>
                </SidebarSection>
            )}

            {topicSubscriptions && topicSubscriptions?.length > 0 && (
                <SidebarSection title="Jump to subscribed topics">
                    <>
                        <ul className="list-none m-0 p-0">
                            {topicSubscriptions.map(({ label, slug }) => {
                                return (
                                    <li key={label} className="mt-1 pt-1 first:mt-0">
                                        <Link
                                            to={`/questions/topic/${slug}`}
                                            className="block text-sm p-1  rounded-sm hover:scale-[1.01] active:scale-[1] relative hover:top-[-.5px] top-[.5px] "
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </>
                </SidebarSection>
            )}
        </>
    )
}
