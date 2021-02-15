import React from 'react'
import { Link } from 'gatsby'
import whiteLogo from '../../images/posthog-logo-white.svg'

function Header() {
    return (
        <div className="py-6 bg-purple-gradient">
            <div className="w-11/12 mx-auto flex justify-between items-center">
                <Link id="logo" to="/" className="block">
                    <img alt="logo" src={whiteLogo} />
                </Link>

                <ul className="flex justify-between items-center mb-0">
                    <li className="leading-none">
                        <Link to="/product-features" className="text-white hover:text-white opacity-80 hover:opacity-100 px-4 py-2 font-semibold tracking-wider">Product</Link>
                    </li>
                    <li className="leading-none">
                        <Link to="/docs" className="text-white hover:text-white opacity-80 hover:opacity-100 px-4 py-2 font-semibold tracking-wider">Docs</Link>
                    </li>
                    <li className="leading-none">
                        <Link to="https://github.com/posthog/posthog" className="text-white hover:text-white opacity-80 hover:opacity-100 px-4 py-2 font-semibold tracking-wider">Community</Link>
                    </li>
                    <li className="leading-none">
                        <Link to="/handbook/company/store" className="text-white hover:text-white opacity-80 hover:opacity-100 px-4 py-2 font-semibold tracking-wider">Company</Link>
                    </li>
                    <li className="leading-none">
                        <Link to="/pricing" className="text-white hover:text-white opacity-80 hover:opacity-100 px-4 py-2 font-semibold tracking-wider">Pricing</Link>
                    </li>
                </ul>

                <ul className="flex justify-between items-center mb-0">
                    <li className="leading-none">
                        <a href="" className="px-4 py-2 bg-primary rounded font-semibold tracking-widest text-white hover:text-white uppercase">Get started</a>
                    </li>
                    <li className="leading-none">
                        <a href="" className="text-white hover:text-white px-4 py-2 font-semibold tracking-widest uppercase">Login</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header
