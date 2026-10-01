import React from 'react'
import SmallTeam from 'components/SmallTeam'

export const SupportSmallTeamLink = ({ children = 'support folks' }: { children?: React.ReactNode }) => (
    <SmallTeam slug="support" noMiniCrest>
        {children}
    </SmallTeam>
)

export default SupportSmallTeamLink
