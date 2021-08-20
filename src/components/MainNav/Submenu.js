import React, { useState } from 'react'
import AnimateHeight from 'react-animate-height'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { usePopper } from 'react-popper'
import SubmenuItem from './SubmenuItem'

export default function Submenu({ referenceElement, menu, open }) {
    const breakpoints = useBreakpoint()
    const height = !breakpoints.md || open ? 'auto' : 0
    const [popperElement, setPopperElement] = useState(null)
    const [arrowElement, setArrowElement] = useState(null)
    const { styles } = usePopper(referenceElement, popperElement, {
        modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    })
    return (
        <AnimateHeight height={height}>
            <div
                ref={setPopperElement}
                style={!breakpoints.md ? styles.popper : {}}
                className={`z-10 lg:pt-[30px] mx-auto w-full max-w-screen-xl border-transparent  visible lg:group-focus:visible lg:group-hover:visible lg:invisible opacity-100 lg:group-focus:opacity-100 lg:group-hover:opacity-100 lg:opacity-0  transition-all text-white`}
            >
                <div className="hidden lg:block" ref={setArrowElement} style={{ ...styles.arrow, marginTop: -13 }}>
                    <svg
                        className="text-[#371a51]"
                        width="33"
                        height="14"
                        viewBox="0 0 33 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M32.4472 12.9001L17.6664 0.417127C17.0073 -0.139042 15.719 -0.139042 15.0613 0.417127L0.280435 12.9001C-0.0476837 13.1779 -0.0902867 13.4501 0.165378 13.6655C0.419636 13.8816 0.923876 14 1.58296 14H31.145C31.8041 14 32.3069 13.8816 32.5626 13.6655C32.8155 13.4501 32.7771 13.1772 32.4476 12.9001H32.4472Z"
                            fill="currentColor"
                        />
                    </svg>
                </div>
                <div className="main-menu-submenu-container mx-auto bg-opacity-90 lg:bg-[#371a51] text-[14px] lg:p-12 p-0 rounded">
                    <h1 className="hidden lg:block text-4xl m-0 font-bold">{menu.title}</h1>
                    <p className="hidden lg:block my-3 text-">{menu.description}</p>
                    {menu.items.map((item, index) => (
                        <SubmenuItem item={item} key={index} />
                    ))}
                </div>
            </div>
        </AnimateHeight>
    )
}
