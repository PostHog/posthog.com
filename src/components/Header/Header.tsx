import React from 'react'
import MainNav from '../MainNav'

export const Header = (): JSX.Element => {
    return (
        <header className="relative z-[9999] overflow-hidden">
            <MainNav />
        </header>
    )
}
