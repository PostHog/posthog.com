import React from 'react'

export default function AnimatedBurger({ onClick, className, active }) {
    return (
        <button className={className} onClick={onClick}>
            <div className="w-5 h-5 flex items-center">
                <span
                    className={`absolute block h-0.5 w-5 dark:bg-white bg-almost-black transform transition duration-150 ease-in-out ${
                        active ? ' rotate-45' : '-translate-y-1.5'
                    }`}
                />
                <span
                    className={`absolute block h-0.5 w-5 dark:bg-white bg-almost-black transform transition duration-150 ease-in-out ${
                        active ? 'opacity-0' : ''
                    }`}
                />
                <span
                    className={`absolute block h-0.5 w-5 dark:bg-white bg-almost-black transform  transition duration-150 ease-in-out  ${
                        active ? ' -rotate-45' : 'translate-y-1.5'
                    }`}
                />
            </div>
        </button>
    )
}
