import React from 'react'
import MainNav from '../MainNav'

export const Header = (): JSX.Element => {
    return (
        <header className="relative z-[9999] p-5">
            <MainNav />
        </header>
    )
}
