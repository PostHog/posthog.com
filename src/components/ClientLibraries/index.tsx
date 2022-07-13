import React from 'react'

import DeployOption from 'components/DeployOption'

export const ClientLibraries = () => {
    return (
        <div className="w-full grid grid-cols-2 bg-gray-accent-light rounded p-4">
            <DeployOption title="JavaScript" icon="js" />
            <DeployOption title="Android" icon="android" />
            <DeployOption title="iOS" icon="ios" />
            <DeployOption title="Flutter" icon="flutter" />
            <DeployOption title="React Native" icon="react" />
        </div>
    )
}

export default ClientLibraries
