import React from 'react'
import { Main } from '../MainNav'

export const Header = (): JSX.Element => {
    return (
        <>
            <header className="relative z-[999999] reasonable:sticky reasonable:top-0 bg-gradient-to-b from-primary-dark/100 via-primary-dark/100 to-primary-dark/50 dark:from-dark/100 dark:via-dark/100 dark:to-dark/50 backdrop-blur">
                <Main />
            </header>
            {/* viewport debugging
            <div className="bg-light dark:bg-dark border-t border-l rounded-tl border-light dark:border-dark px-3 py-1 fixed bottom-0 right-0 z-50">
                <strong className="sm:hidden">xs?</strong>
                <strong className="hidden sm:inline md:hidden">sm</strong>
                <strong className="hidden md:inline mdlg:hidden">md</strong>
                <strong className="hidden mdlg:inline lg:hidden">mdlg</strong>
                <strong className="hidden lg:inline xl:hidden">lg</strong>
                <strong className="hidden xl:inline 2xl:hidden">xl</strong>
                <strong className="hidden 2xl:inline 3xl:hidden">2xl</strong>
                <strong className="hidden 3xl:inline 4xl:hidden">3xl</strong>
                <strong className="hidden 4xl:inline 5xl:hidden">3xl</strong>
            </div>
    */}
        </>
    )
}
