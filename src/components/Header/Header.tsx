import React from 'react'
import './style.scss'
import MainNav from '../MainNav'
import Sprites from './Sprites'

export const Header = (): JSX.Element => {
    return (
        <>
            <Sprites />
            <header className="relative z-[9999] p-5">
                <MainNav />
            </header>
        </>
    )
}
