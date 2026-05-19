import React from 'react'
import QASwarmIconImage from 'images/qa-swarm/icon.png'

export default function QASwarmIcon({ className = '' }: { className?: string }): JSX.Element {
    return <img src={QASwarmIconImage} alt="" aria-hidden="true" className={`${className} object-contain`} />
}
