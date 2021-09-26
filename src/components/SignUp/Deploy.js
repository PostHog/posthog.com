import Sprites from 'components/Header/Sprites'
import { heading, section } from 'components/Home/classes'
import Logo from 'components/Logo'
import React from 'react'

export default function Deploy({ children, title = '' }) {
    return (
        <>
            <Sprites />
            <section className={section('px-4')}>
                <div className={section()}>
                    <Logo className="mx-auto" />
                    <h1 className={heading('md', 'primary', 'mt-16')}>{title}</h1>
                </div>
                <div className="grid md:grid-cols-2 max-w-screen-xl mx-auto md:divide-x-1 divide-dashed divide-gray-accent-light">
                    {children}
                </div>
            </section>
        </>
    )
}
