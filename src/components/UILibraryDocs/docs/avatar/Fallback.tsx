import React from 'react'
import { Avatar } from 'components/UI/Avatar'

export default function AvatarFallbacks(): JSX.Element {
    return (
        <div className="flex items-center gap-3">
            <Avatar.Root size="lg">
                <Avatar.Image src="/missing-avatar.png" alt="Max Hedgehog" />
                <Avatar.Fallback delay={300}>MH</Avatar.Fallback>
            </Avatar.Root>
            <Avatar.Root size="lg">
                <Avatar.Fallback>JJ</Avatar.Fallback>
            </Avatar.Root>
        </div>
    )
}
