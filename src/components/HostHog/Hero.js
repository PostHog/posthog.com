import React from 'react'
import { heading, section } from './classes'

export default function Hero() {
    return (
        <section className="flex flex-col justify-center items-center bg-black rounded-lg mx-10">
            <div className={section()}>
                <h2 className={heading('sm', 'white', 'my-6')}>Introducing</h2>
                <h1 className={heading('lg', 'white')}>HostHog</h1>
                <h2 className={heading('sm', 'white', 'my-6')}>
                    HostHogs are your chance to learn more about what we’re working on
                    <br />
                    and how we help teams build more successful products.
                </h2>
            </div>
        </section>
    )
}
