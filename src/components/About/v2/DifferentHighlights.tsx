import React from 'react'
import Link from 'components/Link'
import { DotLottiePlayer } from '@dotlottie/react-player'
import { IconBold, IconMusicEighthNote } from 'components/OSIcons'
import NoHatingAllowed from 'components/NoHatingAllowed'
import { HomepageCards } from 'components/NoHatingAllowed/data'

export const DifferentHighlights = () => {
    return (
        <div className="bg-red/10 rounded text-base p-4">
            <strong>Warning:</strong> If you like the way most companies treat you, you might not like us.{' '}
            <Link to="/vibe-check" state={{ newWindow: true }}>
                See 15 reasons why PostHog might be <em>wrong</em> for you.
            </Link>
        </div>
    )
}
