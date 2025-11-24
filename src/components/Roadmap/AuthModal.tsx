import React from 'react'
import { Authentication } from 'components/Squeak/components/Authentication'
import SideModal from 'components/Modal/SideModal'
import { User } from 'hooks/useUser'

export const AuthModal = ({
    authModalOpen,
    setAuthModalOpen,
    onAuth,
    title = 'Sign in to vote',
}: {
    authModalOpen: boolean
    setAuthModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    onAuth: (user: User) => void
    title?: string
}) => {
    return (
        <SideModal title={title} open={authModalOpen} setOpen={setAuthModalOpen}>
            <h4 className="mb-4">Sign into PostHog.com</h4>
            <div className="bg-border dark:bg-border-dark p-4 mb-2">
                <p className="text-sm mb-2">
                    <strong>Notezzz: PostHog.com authentication is separate from your PostHog app.</strong>
                </p>

                <p className="text-sm mb-0">
                    We suggest signing up with your personal email. Soon you'll be able to link your PostHog app
                    account.
                </p>
            </div>

            <Authentication initialView="sign-in" onAuth={onAuth} showBanner={false} showProfile={false} />
        </SideModal>
    )
}
