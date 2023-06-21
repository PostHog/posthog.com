import React from 'react'
import { Main } from '../MainNav'

export const Header = (): JSX.Element => {
    return (
        <header className="relative z-[9999] reasonable:sticky reasonable:top-0 bg-gradient-to-b from-primary-dark/100 via-primary-dark/100 to-primary-dark/50 dark:from-dark/100 dark:via-dark/100 dark:to-dark/50 backdrop-blur">
            <Main />
        </header>
    )
}
