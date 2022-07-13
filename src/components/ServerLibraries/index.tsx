import React from 'react'

import DeployOption from 'components/DeployOption'

export const ServerLibraries = () => {
    return (
        <div className="w-full grid grid-cols-2 bg-gray-accent-light rounded p-4">
            <DeployOption title="Node.js" icon="nodejs" />
            <DeployOption title="Python" icon="python" />
            <DeployOption title="PHP" icon="php" />
            <DeployOption title="Ruby" icon="ruby" />
            <DeployOption title="Golang" icon="golang" />
            <DeployOption title="Elixir" icon="elixir" />
            <DeployOption title="Nim" icon="nim" />
        </div>
    )
}

export default ServerLibraries
